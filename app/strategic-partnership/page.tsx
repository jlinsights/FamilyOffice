import { Metadata } from 'next'
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Globe, Users, TrendingUp, Shield, Building, Handshake, Target } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: "Strategic Partnership | Korea Market Entry Solutions",
  description: "Strategic partnerships for global companies entering Korea. Specialized in financial services, premium markets, and institutional investor relations.",
  keywords: ["Korea market entry", "strategic partnership", "financial services Korea", "Korea consulting"],
  openGraph: {
    title: "Strategic Partnership | Korea Market Entry Solutions",
    description: "Strategic partnerships for global companies entering Korea. Specialized in financial services, premium markets, and institutional investor relations.",
    url: "/strategic-partnership",
  },
}

export default function StrategicPartnershipPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-center bg-gradient-to-br from-background via-muted/30 to-background overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5"></div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Badge className="mb-4 bg-background/80 backdrop-blur-sm animate-fade-in">
              Global Partnership
            </Badge>
            <h1 className="font-bold text-5xl md:text-7xl lg:text-8xl leading-tight mb-6 text-primary whitespace-pre-line animate-slide-up">
              Strategic Partnerships for{'\n'}
              <span className="text-foreground">Korea Market Entry</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-3xl mx-auto animate-slide-up leading-relaxed" style={{ animationDelay: '200ms' }}>
              Your trusted partner for successful market entry into Korea. 
              Specialized expertise in financial services, premium markets, and institutional investor relations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '400ms' }}>
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-bold shadow-lg px-8 py-4 text-lg" asChild>
                <Link href="/contact">
                  Request Partnership Consultation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="font-bold shadow-lg px-8 py-4 text-lg" asChild>
                <Link href="#services">
                  Explore Services
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="section bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4 animate-slide-up">
                Comprehensive Market Entry Solutions
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto animate-slide-up leading-relaxed" style={{ animationDelay: '200ms' }}>
                Three pillars of our strategic partnership approach for your Korea market success
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Market Entry Excellence */}
              <div className="card-modern p-8 hover:shadow-lg transition-all duration-300 animate-slide-up" style={{ animationDelay: '100ms' }}>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Market Entry Excellence</h3>
                <p className="text-muted-foreground mb-6">
                  Strategic market entry planning and execution
                </p>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    Korea market entry strategy development
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    Regulatory environment analysis & compliance
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    Local partnership & network building
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    Cultural bridge & market intelligence
                  </li>
                </ul>
              </div>

              {/* Financial Services */}
              <div className="card-modern p-8 hover:shadow-lg transition-all duration-300 animate-slide-up" style={{ animationDelay: '200ms' }}>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                  <Building className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Financial Services Partnerships</h3>
                <p className="text-muted-foreground mb-6">
                  Specialized financial services market entry
                </p>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    Securities recovery services
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    Asset management service localization
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    Institutional investor relations
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    Family Office network connections
                  </li>
                </ul>
              </div>

              {/* Business Development */}
              <div className="card-modern p-8 hover:shadow-lg transition-all duration-300 animate-slide-up" style={{ animationDelay: '300ms' }}>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                  <Handshake className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Business Development Support</h3>
                <p className="text-muted-foreground mb-6">
                  Ongoing business development & relationship management
                </p>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    Customer discovery & relationship management
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    Cultural bridge & communication support
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    Continuous business development
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    Market expansion strategy
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Target Industries */}
        <section className="section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4 animate-slide-up">
                Target Industries & Solutions
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto animate-slide-up leading-relaxed" style={{ animationDelay: '200ms' }}>
                Specialized expertise across key industries for successful Korea market entry
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Financial Services */}
              <div className="card-modern p-8 animate-slide-up" style={{ animationDelay: '100ms' }}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">Financial Services</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Asset Management Companies</h4>
                    <p className="text-sm text-muted-foreground">
                      Korea institutional investor services, regulatory compliance, Family Office network connections
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Private Banking & Wealth Management</h4>
                    <p className="text-sm text-muted-foreground">
                      Ultra-HNW customer discovery, premium service localization, cross-border solutions
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">FinTech & RegTech</h4>
                    <p className="text-sm text-muted-foreground">
                      Korean financial ecosystem entry, technology partnerships, pilot program design
                    </p>
                  </div>
                </div>
              </div>

              {/* Premium Services */}
              <div className="card-modern p-8 animate-slide-up" style={{ animationDelay: '200ms' }}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">Premium Services</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Luxury Brands & Services</h4>
                    <p className="text-sm text-muted-foreground">
                      Korean luxury market analysis, HNW/UHNW customer access, brand positioning strategy
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Real Estate & Investment</h4>
                    <p className="text-sm text-muted-foreground">
                      Korean real estate opportunities, Family Office investment products, legal/tax structuring
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Professional Services</h4>
                    <p className="text-sm text-muted-foreground">
                      B2B service localization, corporate client development, partnership facilitation
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="section bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4 animate-slide-up">
                Why Choose FamilyOffices.vip as Your Strategic Partner
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto animate-slide-up leading-relaxed" style={{ animationDelay: '200ms' }}>
                Proven expertise and extensive network for your Korea market success
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center animate-slide-up" style={{ animationDelay: '100ms' }}>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Global Network</h3>
                <p className="text-muted-foreground">
                  60+ international experts across financial services and strategic consulting
                </p>
              </div>

              <div className="text-center animate-slide-up" style={{ animationDelay: '200ms' }}>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Korean Expertise</h3>
                <p className="text-muted-foreground">
                  Deep local knowledge of Korean business culture and regulatory environment
                </p>
              </div>

              <div className="text-center animate-slide-up" style={{ animationDelay: '300ms' }}>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Proven Track Record</h3>
                <p className="text-muted-foreground">
                  10+ years of successful M&A and strategic partnerships in Korea
                </p>
              </div>

              <div className="text-center animate-slide-up" style={{ animationDelay: '400ms' }}>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Results-Driven</h3>
                <p className="text-muted-foreground">
                  Focused on measurable outcomes and sustainable market presence
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section bg-primary text-primary-foreground">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 animate-slide-up">
              Ready to Enter the Korean Market?
            </h2>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto animate-slide-up opacity-90 leading-relaxed" style={{ animationDelay: '200ms' }}>
              Let's discuss how our strategic partnership can accelerate your Korea market entry and drive sustainable growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '400ms' }}>
              <Button size="lg" variant="secondary" className="bg-background text-foreground hover:bg-background/90 font-bold shadow-lg px-8 py-4 text-lg" asChild>
                <Link href="/contact">
                  Schedule Consultation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary font-bold shadow-lg px-8 py-4 text-lg" asChild>
                <Link href="/success-stories">
                  View Success Stories
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