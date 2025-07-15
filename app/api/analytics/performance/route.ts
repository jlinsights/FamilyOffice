import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// Performance metrics endpoint
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate the performance metric data
    if (!body.name || typeof body.value !== 'number') {
      return NextResponse.json(
        { error: 'Invalid performance metric data' },
        { status: 400 }
      )
    }

    const supabase = await createClient()
    
    // Store performance metric in database
    const { data, error } = await supabase
      .from('performance_metrics')
      .insert([
        {
          metric_name: body.name,
          metric_value: body.value,
          metric_type: body.type || 'custom',
          url: body.url,
          user_agent: request.headers.get('user-agent'),
          timestamp: new Date().toISOString(),
          metadata: body.context || {}
        }
      ])
      .select()
      .single()

    if (error) {
      console.error('Failed to store performance metric:', error)
      return NextResponse.json(
        { error: 'Failed to store metric' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Performance analytics error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Get performance analytics
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const metric = searchParams.get('metric')
    const timeframe = searchParams.get('timeframe') || '24h'
    
    const supabase = await createClient()
    
    // Calculate time range
    const now = new Date()
    const startTime = new Date()
    
    switch (timeframe) {
      case '1h':
        startTime.setHours(now.getHours() - 1)
        break
      case '24h':
        startTime.setDate(now.getDate() - 1)
        break
      case '7d':
        startTime.setDate(now.getDate() - 7)
        break
      case '30d':
        startTime.setDate(now.getDate() - 30)
        break
      default:
        startTime.setDate(now.getDate() - 1)
    }

    let query = supabase
      .from('performance_metrics')
      .select('*')
      .gte('timestamp', startTime.toISOString())
      .order('timestamp', { ascending: false })

    if (metric) {
      query = query.eq('metric_name', metric)
    }

    const { data, error } = await query

    if (error) {
      console.error('Failed to fetch performance metrics:', error)
      return NextResponse.json(
        { error: 'Failed to fetch metrics' },
        { status: 500 }
      )
    }

    // Calculate aggregated metrics
    const aggregated = data.reduce((acc: any, curr: any) => {
      const metricName = curr.metric_name
      if (!acc[metricName]) {
        acc[metricName] = {
          name: metricName,
          values: [],
          count: 0,
          sum: 0,
          min: Infinity,
          max: -Infinity,
          avg: 0
        }
      }
      
      acc[metricName].values.push({
        value: curr.metric_value,
        timestamp: curr.timestamp,
        url: curr.url
      })
      
      acc[metricName].count++
      acc[metricName].sum += curr.metric_value
      acc[metricName].min = Math.min(acc[metricName].min, curr.metric_value)
      acc[metricName].max = Math.max(acc[metricName].max, curr.metric_value)
      acc[metricName].avg = acc[metricName].sum / acc[metricName].count
      
      return acc
    }, {})

    return NextResponse.json({
      timeframe,
      metrics: Object.values(aggregated),
      totalRecords: data.length
    })
  } catch (error) {
    console.error('Performance analytics error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}