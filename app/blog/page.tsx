import { redirect } from 'next/navigation';

export default function BlogPage() {
  // /blog를 /insights로 영구 리다이렉트
  redirect('/insights');
}