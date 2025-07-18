import { Metadata } from 'next'
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Building, TrendingUp, Users, Award, Clock, Target } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: "Success Stories | Strategic Partnership Case Studies",
  description: "Real success stories of global companies entering Korea through our strategic partnerships. See how we've helped businesses achieve sustainable growth in the Korean market.",
  keywords: ["Korea market entry success", "strategic partnership case studies", "Korea business success stories"],
  openGraph: {
    title: "Success Stories | Strategic Partnership Case Studies",
    description: "Real success stories of global companies entering Korea through our strategic partnerships.",
    url: "/success-stories",
  },
}

const caseStudies = [
  {
    id: 1,
    title: "European Securities Recovery Service Entry",
    industry: "Financial Services",
    timeline: "6 months",
    results: "5+ institutional partnerships",
    challenge: "European financial services company seeking to enter the Korean market with complex regulatory requirements and no existing network.",
    solution: "Comprehensive market analysis, regulatory compliance strategy, and Family Office network introductions.",
    outcome: "Successfully established Korean operations with 5 institutional partnerships within 12 months.",
    icon: Building,
  },
  {
    id: 2,
    title: "Swiss Asset Management Platform Launch",
    industry: "Asset Management",
    timeline: "8 months",
    results: "₩50B+ AUM secured",
    challenge: "Swiss asset management firm needed to understand Korean ultra-high net worth market dynamics and regulatory landscape.",
    solution: "Local partnership facilitation, cultural bridge services, and premium client network access.",
    outcome: "Launched Korean operations with ₩50B+ AUM and established sustainable growth trajectory.",
    icon: TrendingUp,
  },
  {
    id: 3,
    title: "US FinTech Regulatory Navigation",
    industry: "FinTech",
    timeline: "4 months",
    results: "3 pilot programs launched",
    challenge: "US FinTech startup faced complex Korean financial regulations and needed technology partnerships.",
    solution: "Regulatory roadmap development, technology partner introductions, and pilot program design.",
    outcome: "Successfully navigated regulatory approval process and launched 3 pilot programs with major Korean banks.",
    icon: Target,
  }
]

export default function SuccessStoriesPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-center bg-gradient-to-br from-background via-muted/30 to-background overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5"></div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Badge className="mb-4 bg-background/80 backdrop-blur-sm animate-fade-in">
              Proven Results
            </Badge>
            <h1 className="font-bold text-5xl md:text-7xl lg:text-8xl leading-tight mb-6 text-primary whitespace-pre-line animate-slide-up">
              Success Stories{'\n'}
              <span className="text-foreground">Real Results, Real Growth</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-3xl mx-auto animate-slide-up leading-relaxed" style={{ animationDelay: '200ms' }}>
              Discover how global companies have successfully entered and thrived in the Korean market 
              through our strategic partnerships and expert guidance.
            </p>
          </div>
        </section>

        {/* Case Studies */}
        <section className="section bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4 animate-slide-up">
                Featured Case Studies
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto animate-slide-up leading-relaxed" style={{ animationDelay: '200ms' }}>
                Real partnerships, measurable results, and sustainable growth stories
              </p>
            </div>

            <div className="space-y-12">
              {caseStudies.map((study, index) => (
                <div key={study.id} className="card-modern overflow-hidden animate-slide-up" style={{ animationDelay: `${index * 200}ms` }}>
                  <div className="md:flex">
                    <div className="md:w-1/3 bg-muted/50 p-8 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                          <study.icon className="h-10 w-10 text-primary" />
                        </div>
                        <Badge variant="outline" className="mb-4">
                          {study.industry}
                        </Badge>
                        <div className="space-y-2 text-sm text-muted-foreground">
                          <div className="flex items-center justify-center gap-2">
                            <Clock className="h-4 w-4" />
                            {study.timeline}
                          </div>
                          <div className="flex items-center justify-center gap-2">
                            <Award className="h-4 w-4" />
                            {study.results}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="md:w-2/3 p-8">
                      <h3 className="text-2xl font-semibold text-foreground mb-6">
                        {study.title}
                      </h3>
                      
                      <div className="space-y-6">
                        <div>
                          <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                            Challenge
                          </h4>
                          <p className="text-muted-foreground">
                            {study.challenge}
                          </p>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                            Solution
                          </h4>
                          <p className="text-muted-foreground">
                            {study.solution}
                          </p>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            Results
                          </h4>
                          <p className="text-muted-foreground">
                            {study.outcome}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Key Metrics */}
        <section className="section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4 animate-slide-up">
                Partnership Performance Metrics
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto animate-slide-up leading-relaxed" style={{ animationDelay: '200ms' }}>
                Measurable results across all strategic partnerships
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center animate-slide-up" style={{ animationDelay: '100ms' }}>
                <div className="text-4xl font-bold text-primary mb-2">15+</div>
                <div className="text-muted-foreground">Successful Market Entries</div>
              </div>
              <div className="text-center animate-slide-up" style={{ animationDelay: '200ms' }}>
                <div className="text-4xl font-bold text-primary mb-2">₩500B+</div>
                <div className="text-muted-foreground">Assets Under Management</div>
              </div>
              <div className="text-center animate-slide-up" style={{ animationDelay: '300ms' }}>
                <div className="text-4xl font-bold text-primary mb-2">6-12</div>
                <div className="text-muted-foreground">Months Average Timeline</div>
              </div>
              <div className="text-center animate-slide-up" style={{ animationDelay: '400ms' }}>
                <div className="text-4xl font-bold text-primary mb-2">95%</div>
                <div className="text-muted-foreground">Partnership Success Rate</div>
              </div>
            </div>
          </div>
        </section>

        {/* Client Testimonials */}
        <section className="section bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4 animate-slide-up">
                What Our Partners Say
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto animate-slide-up leading-relaxed" style={{ animationDelay: '200ms' }}>
                Testimonials from successful strategic partnerships
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="card-modern p-8 animate-slide-up" style={{ animationDelay: '100ms' }}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <blockquote className="text-muted-foreground mb-4">
                      "FamilyOffices.vip's deep understanding of Korean business culture and regulatory environment 
                      was instrumental in our successful market entry. Their network opened doors we couldn't have 
                      accessed otherwise."
                    </blockquote>
                    <div>
                      <div className="font-semibold text-foreground">Managing Director</div>
                      <div className="text-sm text-muted-foreground">European Asset Management Firm</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card-modern p-8 animate-slide-up" style={{ animationDelay: '200ms' }}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <blockquote className="text-muted-foreground mb-4">
                      "The strategic partnership approach provided us with not just market entry, but sustainable 
                      growth strategies. We achieved our 12-month targets in just 8 months."
                    </blockquote>
                    <div>
                      <div className="font-semibold text-foreground">CEO</div>
                      <div className="text-sm text-muted-foreground">Swiss Financial Services Company</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section bg-primary text-primary-foreground">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 animate-slide-up">
              Ready to Write Your Success Story?
            </h2>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto animate-slide-up opacity-90 leading-relaxed" style={{ animationDelay: '200ms' }}>
              Join the growing number of successful companies who have entered the Korean market 
              through our strategic partnerships.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '400ms' }}>
              <Button size="lg" variant="secondary" className="bg-background text-foreground hover:bg-background/90 font-bold shadow-lg px-8 py-4 text-lg" asChild>
                <Link href="/contact">
                  Start Your Partnership Journey
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary font-bold shadow-lg px-8 py-4 text-lg" asChild>
                <Link href="/strategic-partnership">
                  Learn About Our Services
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}