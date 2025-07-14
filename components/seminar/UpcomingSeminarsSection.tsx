import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { UPCOMING_SEMINARS, SEMINAR_CATEGORIES } from "@/constants/seminars";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  DollarSign, 
  Video, 
  Building,
  ExternalLink,
  CheckCircle
} from "lucide-react";
import type { Seminar } from "@/types/seminar";

export function UpcomingSeminarsSection() {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    }).format(date);
  };

  const formatPrice = (price: number) => {
    if (price === 0) return "무료";
    return new Intl.NumberFormat('ko-KR').format(price) + "원";
  };

  const getCategoryInfo = (categoryKey: string) => {
    return SEMINAR_CATEGORIES.find(cat => cat.key === categoryKey);
  };

  const getLocationIcon = (type: string) => {
    switch (type) {
      case "online": return Video;
      case "offline": return Building;
      case "hybrid": return MapPin;
      default: return MapPin;
    }
  };

  const getStatusBadge = (seminar: Seminar) => {
    if (seminar.registeredCount >= seminar.capacity) {
      return <Badge variant="destructive">마감</Badge>;
    }
    if (seminar.registeredCount / seminar.capacity > 0.8) {
      return <Badge variant="secondary">마감 임박</Badge>;
    }
    return <Badge variant="default">접수 중</Badge>;
  };

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/20 dark:from-gray-900 dark:to-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 animate-fade-in dark:bg-primary/80 dark:text-white dark:border-primary/60">
            <Calendar className="h-3 w-3 mr-1" />
            Upcoming Seminars
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-slide-up text-gray-900 dark:text-white">
            <span className="text-primary dark:text-emerald-300">예정된 세미나</span> 프로그램
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-slide-up dark:text-gray-200" style={{ animationDelay: '200ms' }}>
            업계 최고 전문가들과 함께하는 프리미엄 교육 프로그램에 참여하세요
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {UPCOMING_SEMINARS.map((seminar, index) => {
            const categoryInfo = getCategoryInfo(seminar.category);
            const LocationIcon = getLocationIcon(seminar.location.type);
            
            return (
              <Card key={seminar.id} className="group hover:shadow-lg transition-all duration-300 animate-slide-up dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100" style={{ animationDelay: `${index * 150}ms` }}>
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-3">
                    {categoryInfo && (
                      <Badge variant="secondary" className={`${categoryInfo.bgColor} ${categoryInfo.color} border-0 dark:bg-primary/80 dark:text-white dark:border-primary/60`}>
                        <categoryInfo.icon className="h-3 w-3 mr-1" />
                        {categoryInfo.name}
                      </Badge>
                    )}
                    {getStatusBadge(seminar)}
                  </div>
                  <h3 className="text-xl font-semibold group-hover:text-primary transition-colors dark:text-white">
                    {seminar.title}
                  </h3>
                  {seminar.subtitle && (
                    <p className="text-sm text-muted-foreground dark:text-gray-300">{seminar.subtitle}</p>
                  )}
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground line-clamp-3 dark:text-gray-200">
                    {seminar.description}
                  </p>
                  
                  {/* Speaker Info */}
                  <div className="flex items-center gap-3 p-3 bg-muted/50 dark:bg-gray-900 border border-muted dark:border-gray-700 rounded-lg">
                    <div className="w-10 h-10 bg-primary/10 dark:bg-primary/30 rounded-full flex items-center justify-center">
                      <Users className="h-5 w-5 text-primary dark:text-primary" />
                    </div>
                    <div>
                      <div className="font-medium text-sm text-foreground dark:text-white">{seminar.speaker.name}</div>
                      <div className="text-xs text-muted-foreground dark:text-gray-300">
                        {seminar.speaker.title}, {seminar.speaker.company}
                      </div>
                    </div>
                  </div>
                  
                  {/* Event Details */}
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground dark:text-gray-300" />
                      <span className="text-foreground dark:text-white">{formatDate(seminar.date)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground dark:text-gray-300" />
                      <span className="text-foreground dark:text-white">{seminar.time} ({seminar.duration})</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <LocationIcon className="h-4 w-4 text-muted-foreground dark:text-gray-300" />
                      <span className="line-clamp-1 text-foreground dark:text-white">
                        {seminar.location.type === "online" ? "온라인 진행" : 
                         seminar.location.type === "hybrid" ? "하이브리드 (온/오프라인)" :
                         seminar.location.venue}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground dark:text-gray-300" />
                      <span className="text-foreground dark:text-white">{seminar.registeredCount}/{seminar.capacity}명 등록</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground dark:text-gray-300" />
                      <span className={seminar.price === 0 ? "text-green-600 dark:text-green-400 font-medium" : "text-foreground dark:text-white"}>
                        {formatPrice(seminar.price)}
                        {seminar.isPremium && <Badge variant="outline" className="ml-2 text-xs dark:bg-emerald-900 dark:text-emerald-200">Premium</Badge>}
                      </span>
                    </div>
                  </div>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {seminar.tags.slice(0, 3).map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="outline" className="text-xs dark:bg-gray-700 dark:text-gray-200">
                        {tag}
                      </Badge>
                    ))}
                    {seminar.tags.length > 3 && (
                      <Badge variant="outline" className="text-xs dark:bg-gray-700 dark:text-gray-200">
                        +{seminar.tags.length - 3}
                      </Badge>
                    )}
                  </div>
                </CardContent>
                
                <CardFooter className="pt-4">
                  <div className="w-full space-y-2">
                    <Button 
                      className="w-full group dark:bg-primary/80 dark:text-white dark:hover:bg-primary/90"
                      disabled={seminar.registeredCount >= seminar.capacity}
                    >
                      {seminar.registeredCount >= seminar.capacity ? (
                        <>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          마감되었습니다
                        </>
                      ) : (
                        <>
                          <Calendar className="h-4 w-4 mr-2" />
                          신청하기
                          <ExternalLink className="h-4 w-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
                        </>
                      )}
                    </Button>
                    <Button variant="outline" size="sm" className="w-full dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600 dark:hover:bg-gray-700">
                      자세히 보기
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            );
          })}
        </div>
        
        {/* View All Button */}
        <div className="text-center mt-12 animate-slide-up" style={{ animationDelay: '600ms' }}>
          <a
            href="https://seminar.familyoffices.vip"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none' }}
          >
            <Button variant="outline" size="lg" type="button" className="dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600 dark:hover:bg-gray-700">
              <Calendar className="h-5 w-5 mr-2" />
              전체 세미나 일정 보기
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}