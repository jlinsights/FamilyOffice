'use client';

import React from 'react';

export default function TestButton() {
  const handleClick = () => {
    alert('클라이언트 기능이 작동합니다!');
  };

  return (
    <button 
      className="bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
      onClick={handleClick}
    >
      테스트 버튼
    </button>
  );
} 