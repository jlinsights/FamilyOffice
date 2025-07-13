import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { PAST_SEMINARS, SEMINAR_CATEGORIES } from "@/constants/seminars";
import { 
  Calendar, 
  Clock, 
  Users, 
  Play, 
  Download,
  ExternalLink,
  Archive,
  Star
} from "lucide-react";

export function PastSeminarsSection() {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  const getCategoryInfo = (categoryKey: string) => {
    return SEMINAR_CATEGORIES.find(cat => cat.key === categoryKey);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 animate-fade-in">
            <Archive className="h-3 w-3 mr-1" />
            Past Seminars
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-slide-up">
            <span className="text-primary">지난 세미나</span> 아카이브
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '200ms' }}>
            놓치신 세미나는 영상과 자료를 통해 다시 확인하실 수 있습니다
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PAST_SEMINARS.map((seminar, index) => {
            const categoryInfo = getCategoryInfo(seminar.category);
            
            return (
              <Card key={seminar.id} className="group hover:shadow-lg transition-all duration-300 animate-slide-up" style={{ animationDelay: `${index * 200}ms` }}>
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-3">
                    {categoryInfo && (
                      <Badge variant="secondary" className={`${categoryInfo.bgColor} ${categoryInfo.color} border-0`}>
                        <categoryInfo.icon className="h-3 w-3 mr-1" />
                        {categoryInfo.name}
                      </Badge>
                    )}
                    <Badge variant="outline">완료</Badge>
                  </div>
                  <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                    {seminar.title}
                  </h3>
                  {seminar.subtitle && (
                    <p className="text-sm text-muted-foreground">{seminar.subtitle}</p>
                  )}
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {seminar.description}
                  </p>
                  
                  {/* Speaker Info */}
                  <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium text-sm">{seminar.speaker.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {seminar.speaker.title}, {seminar.speaker.company}
                      </div>
                    </div>
                  </div>
                  
                  {/* Event Details */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{formatDate(seminar.date)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{seminar.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{seminar.registeredCount}명 참석</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span>4.8/5.0 평점</span>
                    </div>
                  </div>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {seminar.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Available Resources */}
                  <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                    <div className="text-sm font-medium text-green-800 dark:text-green-200 mb-2">
                      이용 가능한 자료
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {seminar.videoUrl && (
                        <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200">
                          <Play className="h-3 w-3 mr-1" />
                          세미나 영상
                        </Badge>
                      )}
                      {seminar.presentationUrl && (
                        <Badge variant="secondary" className="text-xs bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-200">
                          <Download className="h-3 w-3 mr-1" />
                          발표 자료
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter className="pt-4">
                  <div className="w-full grid grid-cols-2 gap-2">
                    {seminar.videoUrl && (
                      <Button variant="default" size="sm" className="group">
                        <Play className="h-4 w-4 mr-2" />
                        영상 보기
                      </Button>
                    )}
                    {seminar.presentationUrl && (
                      <Button variant="outline" size="sm" className="group">
                        <Download className="h-4 w-4 mr-2" />
                        자료 다운로드
                      </Button>
                    )}
                    {!seminar.videoUrl && !seminar.presentationUrl && (
                      <Button variant="outline" size="sm" className="col-span-2">
                        자세히 보기
                      </Button>
                    )}
                  </div>
                </CardFooter>
              </Card>
            );
          })}
        </div>
        
        {/* View All Button */}
        <div className="text-center mt-12 animate-slide-up" style={{ animationDelay: '400ms' }}>
          <Button variant="outline" size="lg">
            <Archive className="h-5 w-5 mr-2" />
            전체 아카이브 보기
            <ExternalLink className="h-5 w-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}