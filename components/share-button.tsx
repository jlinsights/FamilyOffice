'use client';

import {
  AtSign,
  Check,
  Facebook,
  Link as LinkIcon,
  Linkedin,
  MessageCircle,
  Share2,
  Twitter,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { KakaoSyncService } from '@/lib/kakao/kakao-sync-service';
import { useToast } from '@/hooks/use-toast';

interface ShareButtonProps {
  title: string;
  description?: string;
  url?: string;
  image?: string;
  className?: string;
}

export function ShareButton({
  title,
  description = '',
  url,
  image,
  className,
}: ShareButtonProps) {
  const { toast } = useToast();
  const [currentUrl, setCurrentUrl] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(url || window.location.href);
    }
  }, [url]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      toast({
        title: '링크 복사 완료',
        description: '클립보드에 링크가 복사되었습니다.',
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: '복사 실패',
        description: '링크 복사에 실패했습니다.',
        variant: 'destructive',
      });
    }
  };

  const shareToLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`,
      '_blank'
    );
  };

  const shareToFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
      '_blank'
    );
  };

  const shareToX = () => {
    window.open(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(title)}`,
      '_blank'
    );
  };

  const shareToThreads = () => {
    // Threads web intent (unofficial but works on some devices/browsers)
    window.open(
      `https://www.threads.net/intent/post?text=${encodeURIComponent(title + ' ' + currentUrl)}`,
      '_blank'
    );
  };

  const shareToKakao = () => {
    const success = KakaoSyncService.shareToKakao({
      title,
      description,
      imageUrl: image || '',
      linkUrl: currentUrl,
    });

    if (!success) {
      // Fallback if SDK fails or not loaded
      toast({
        title: '카카오톡 공유 실패',
        description:
          '카카오톡 공유 기능을 사용할 수 없습니다. 링크 복사를 이용해주세요.',
        variant: 'destructive',
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={`rounded-full border-white/20 text-white hover:bg-white/10 bg-transparent ${className}`}
        >
          <Share2 className="mr-2 h-4 w-4" />
          공유하기
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>공유하기</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={handleCopyLink} className="cursor-pointer">
          {copied ? (
            <Check className="mr-2 h-4 w-4" />
          ) : (
            <LinkIcon className="mr-2 h-4 w-4" />
          )}
          링크 복사
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={shareToKakao}
          className="cursor-pointer text-yellow-900 focus:text-yellow-900 focus:bg-yellow-100 dark:text-yellow-500 dark:focus:text-yellow-400 dark:focus:bg-yellow-900/20"
        >
          <MessageCircle className="mr-2 h-4 w-4 fill-current" />
          카카오톡
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={shareToLinkedIn}
          className="cursor-pointer text-blue-700 focus:text-blue-700 focus:bg-blue-50 dark:text-blue-400 dark:focus:text-blue-300 dark:focus:bg-blue-900/20"
        >
          <Linkedin className="mr-2 h-4 w-4 fill-current" />
          LinkedIn
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={shareToFacebook}
          className="cursor-pointer text-blue-600 focus:text-blue-600 focus:bg-blue-50 dark:text-blue-400 dark:focus:text-blue-300 dark:focus:bg-blue-900/20"
        >
          <Facebook className="mr-2 h-4 w-4 fill-current" />
          Facebook
        </DropdownMenuItem>

        <DropdownMenuItem onClick={shareToX} className="cursor-pointer">
          <Twitter className="mr-2 h-4 w-4 fill-current" />X (Twitter)
        </DropdownMenuItem>

        <DropdownMenuItem onClick={shareToThreads} className="cursor-pointer">
          <AtSign className="mr-2 h-4 w-4" />
          Threads
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
