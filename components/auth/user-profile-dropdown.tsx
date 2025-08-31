'use client';

import { useState } from 'react';
import { User, Settings, LogOut, MessageCircle, ChevronDown } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { useSupabaseKakaoAuth } from '@/hooks/use-supabase-kakao-auth';
import Link from 'next/link';
import Image from 'next/image';

interface UserProfileDropdownProps {
  className?: string;
}

export function UserProfileDropdown({ className = '' }: UserProfileDropdownProps) {
  const { 
    user, 
    isAuthenticated, 
    isLoading, 
    displayName, 
    profileImage, 
    email,
    signOut,
    isKakaoUser
  } = useSupabaseKakaoAuth();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      await signOut();
    } finally {
      setIsSigningOut(false);
    }
  };

  if (!isAuthenticated || !user) {
    return null;
  }

  const userInitials = displayName
    .split(' ')
    .map((name: string) => name[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={`h-10 px-2 py-1 ${className}`}
          disabled={isLoading}
        >
          <div className="flex items-center space-x-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={profileImage} alt={displayName} />
              <AvatarFallback className="text-sm font-medium">
                {userInitials}
              </AvatarFallback>
            </Avatar>
            <div className="hidden sm:flex flex-col items-start">
              <span className="text-sm font-medium leading-none">
                {displayName}
              </span>
              {isKakaoUser && (
                <div className="h-4 px-1 text-xs mt-1 bg-[#FEE500] text-[#3C1E1E] rounded flex items-center space-x-1">
                  <Image 
                    src="/images/KAKAO/kakao_sync_login/simple/ko/kakao_login_small.png" 
                    alt="카카오" 
                    width={8} 
                    height={8} 
                    className="rounded-sm"
                  />
                  <span>카카오</span>
                </div>
              )}
            </div>
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </div>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-64" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-2">
              <Avatar className="h-10 w-10">
                <AvatarImage src={profileImage} alt={displayName} />
                <AvatarFallback>{userInitials}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium leading-none truncate">
                  {displayName}
                </p>
                {email && (
                  <p className="text-xs leading-none text-muted-foreground mt-1 truncate">
                    {email}
                  </p>
                )}
                {isKakaoUser && (
                  <div className="flex items-center mt-1">
                    <div className="h-4 px-1 text-xs bg-[#FEE500] text-[#3C1E1E] rounded flex items-center space-x-1">
                      <Image 
                        src="/images/KAKAO/kakao_sync_login/simple/ko/kakao_login_small.png" 
                        alt="카카오" 
                        width={8} 
                        height={8} 
                        className="rounded-sm"
                      />
                      <span>카카오 연동됨</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href="/dashboard" className="cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            <span>내 대시보드</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href="/profile" className="cursor-pointer">
            <Settings className="mr-2 h-4 w-4" />
            <span>프로필 설정</span>
          </Link>
        </DropdownMenuItem>

        {isKakaoUser && (
          <DropdownMenuItem asChild>
            <button
              className="w-full cursor-pointer"
              onClick={() => {
                if (window.Kakao?.Channel) {
                  window.Kakao.Channel.chat({
                    channelPublicId: '_gsxkxdG'
                  });
                }
              }}
            >
              <Image 
                src="/images/KAKAO/kakao_sync_login/simple/ko/kakao_login_small.png" 
                alt="카카오" 
                width={16} 
                height={16} 
                className="mr-2 rounded-sm"
              />
              <span>카카오톡 상담</span>
            </button>
          </DropdownMenuItem>
        )}

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="cursor-pointer text-red-600 focus:text-red-600"
          onClick={handleSignOut}
          disabled={isSigningOut}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>{isSigningOut ? '로그아웃 중...' : '로그아웃'}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserProfileDropdown;