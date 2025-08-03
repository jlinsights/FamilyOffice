'use client';

import {
  Bell,
  Check,
  X,
  AlertTriangle,
  Info,
  CheckCircle,
  Clock,
  Trash2,
} from 'lucide-react';

import { useState, useEffect, useCallback } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

import { cn } from '@/lib/utils';

import { useWebSocket } from '@/hooks/use-real-time-data';

interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
  actionText?: string;
  category?: string;
  priority?: 'low' | 'medium' | 'high';
}

interface NotificationSystemProps {
  maxNotifications?: number;
  autoDismiss?: boolean;
  dismissDelay?: number;
}

export function NotificationSystem({
  maxNotifications = 50,
  autoDismiss = true,
  dismissDelay = 5000,
}: NotificationSystemProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  // WebSocket 연결
  const { isConnected } = useWebSocket({
    url: '/api/notifications',
    reconnectAttempts: 10,
    reconnectDelay: 2000,
    onMessage: data => {
      handleNewNotification(data);
    },
    onError: error => {
      console.error('Notification WebSocket error:', error);
    },
  });

  // 알림 해제
  const dismissNotification = useCallback((id: string) => {
    setNotifications(prev => {
      const updated = prev.filter(n => n.id !== id);
      setUnreadCount(updated.filter(n => !n.read).length);
      return updated;
    });
  }, []);

  // 새 알림 처리
  const handleNewNotification = useCallback(
    (data: any) => {
      const newNotification: Notification = {
        id: data.id || Date.now().toString(),
        type: data.type || 'info',
        title: data.title,
        message: data.message,
        timestamp: new Date(data.timestamp || Date.now()),
        read: false,
        actionUrl: data.actionUrl,
        actionText: data.actionText,
        category: data.category,
        priority: data.priority || 'medium',
      };

      setNotifications(prev => {
        const updated = [newNotification, ...prev].slice(0, maxNotifications);
        setUnreadCount(updated.filter(n => !n.read).length);
        return updated;
      });

      // 자동 해제 설정
      if (autoDismiss && newNotification.type !== 'error') {
        setTimeout(() => {
          dismissNotification(newNotification.id);
        }, dismissDelay);
      }
    },
    [autoDismiss, dismissDelay, maxNotifications, dismissNotification]
  );

  // 알림 읽음 처리
  const markAsRead = useCallback((id: string) => {
    setNotifications(prev => {
      const updated = prev.map(n => (n.id === id ? { ...n, read: true } : n));
      setUnreadCount(updated.filter(n => !n.read).length);
      return updated;
    });
  }, []);

  // 모든 알림 읽음 처리
  const markAllAsRead = useCallback(() => {
    setNotifications(prev => {
      const updated = prev.map(n => ({ ...n, read: true }));
      setUnreadCount(0);
      return updated;
    });
  }, []);

  // 모든 알림 삭제
  const clearAllNotifications = useCallback(() => {
    setNotifications([]);
    setUnreadCount(0);
  }, []);

  // 알림 타입별 아이콘
  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
      case 'error':
        return <AlertTriangle className="h-5 w-5 text-red-600" />;
      default:
        return <Info className="h-5 w-5 text-blue-600" />;
    }
  };

  // 알림 타입별 색상
  const getNotificationColor = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return 'border-green-200 bg-green-50';
      case 'warning':
        return 'border-yellow-200 bg-yellow-50';
      case 'error':
        return 'border-red-200 bg-red-50';
      default:
        return 'border-blue-200 bg-blue-50';
    }
  };

  // 시간 포맷팅
  const formatTime = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return '방금 전';
    if (minutes < 60) return `${minutes}분 전`;
    if (hours < 24) return `${hours}시간 전`;
    if (days < 7) return `${days}일 전`;
    return timestamp.toLocaleDateString();
  };

  return (
    <div className="relative">
      {/* 알림 버튼 */}
      <Button
        variant="ghost"
        size="sm"
        className="relative"
        onClick={() => setShowNotifications(!showNotifications)}
        aria-label="알림"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <Badge
            variant="destructive"
            className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
          >
            {unreadCount > 99 ? '99+' : unreadCount}
          </Badge>
        )}
      </Button>

      {/* 알림 패널 */}
      {showNotifications && (
        <div className="absolute right-0 top-12 w-96 bg-background border rounded-lg shadow-lg z-50">
          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">알림</h3>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={markAllAsRead}
                  disabled={unreadCount === 0}
                >
                  <Check className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAllNotifications}
                  disabled={notifications.length === 0}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowNotifications(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* 연결 상태 */}
            <div className="flex items-center gap-2 mt-2">
              <div
                className={cn(
                  'w-2 h-2 rounded-full',
                  isConnected ? 'bg-green-500' : 'bg-red-500'
                )}
              />
              <span className="text-xs text-muted-foreground">
                {isConnected ? '실시간 연결됨' : '연결 중...'}
              </span>
            </div>
          </div>

          {/* 알림 목록 */}
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-8 text-center">
                <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">새로운 알림이 없습니다</p>
              </div>
            ) : (
              <div className="space-y-1 p-2">
                {notifications.map(notification => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onDismiss={dismissNotification}
                    onMarkAsRead={markAsRead}
                    formatTime={formatTime}
                    getNotificationIcon={getNotificationIcon}
                    getNotificationColor={getNotificationColor}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

interface NotificationItemProps {
  notification: Notification;
  onDismiss: (id: string) => void;
  onMarkAsRead: (id: string) => void;
  formatTime: (timestamp: Date) => string;
  getNotificationIcon: (type: Notification['type']) => React.ReactNode;
  getNotificationColor: (type: Notification['type']) => string;
}

function NotificationItem({
  notification,
  onDismiss,
  onMarkAsRead,
  formatTime,
  getNotificationIcon,
  getNotificationColor,
}: NotificationItemProps) {
  return (
    <Card
      className={cn(
        'p-3 border-l-4 transition-all hover:shadow-md',
        getNotificationColor(notification.type),
        !notification.read && 'bg-muted/50'
      )}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">
          {getNotificationIcon(notification.type)}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h4 className="text-sm font-medium">{notification.title}</h4>
              <p className="text-sm text-muted-foreground mt-1">
                {notification.message}
              </p>

              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {formatTime(notification.timestamp)}
                </div>

                {notification.category && (
                  <Badge variant="outline" className="text-xs">
                    {notification.category}
                  </Badge>
                )}

                {notification.priority &&
                  notification.priority !== 'medium' && (
                    <Badge
                      variant={
                        notification.priority === 'high'
                          ? 'destructive'
                          : 'secondary'
                      }
                      className="text-xs"
                    >
                      {notification.priority === 'high' ? '높음' : '낮음'}
                    </Badge>
                  )}
              </div>

              {notification.actionUrl && notification.actionText && (
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2"
                  onClick={() => {
                    window.open(notification.actionUrl, '_blank');
                    onMarkAsRead(notification.id);
                  }}
                >
                  {notification.actionText}
                </Button>
              )}
            </div>

            <div className="flex items-center gap-1 ml-2">
              {!notification.read && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onMarkAsRead(notification.id)}
                  className="h-6 w-6 p-0"
                >
                  <Check className="h-3 w-3" />
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDismiss(notification.id)}
                className="h-6 w-6 p-0"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

// 토스트 알림 컴포넌트
interface ToastNotificationProps {
  notification: Notification;
  onDismiss: (id: string) => void;
}

export function ToastNotification({
  notification,
  onDismiss,
}: ToastNotificationProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(notification.id);
    }, 5000);

    return () => clearTimeout(timer);
  }, [notification.id, onDismiss]);

  return (
    <div
      className={cn(
        'fixed bottom-4 right-4 w-80 p-4 rounded-lg shadow-lg border-l-4 z-50',
        notification.type === 'success' && 'border-green-500 bg-green-50',
        notification.type === 'warning' && 'border-yellow-500 bg-yellow-50',
        notification.type === 'error' && 'border-red-500 bg-red-50',
        notification.type === 'info' && 'border-blue-500 bg-blue-50'
      )}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          {notification.type === 'success' && (
            <CheckCircle className="h-5 w-5 text-green-600" />
          )}
          {notification.type === 'warning' && (
            <AlertTriangle className="h-5 w-5 text-yellow-600" />
          )}
          {notification.type === 'error' && (
            <AlertTriangle className="h-5 w-5 text-red-600" />
          )}
          {notification.type === 'info' && (
            <Info className="h-5 w-5 text-blue-600" />
          )}
        </div>

        <div className="flex-1">
          <h4 className="text-sm font-medium">{notification.title}</h4>
          <p className="text-sm text-muted-foreground mt-1">
            {notification.message}
          </p>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDismiss(notification.id)}
          className="h-6 w-6 p-0"
        >
          <X className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
}
