#!/usr/bin/env python3
"""
긴 파일명을 가진 파일들을 찾아서 삭제하는 스크립트
FamilyOffice 프로젝트의 ENAMETOOLONG 에러 해결용
"""

import os
import sys
from pathlib import Path

def cleanup_long_files():
    """긴 파일명의 파일들을 찾아서 삭제"""
    
    base_path = Path("/Users/jaehong/Developer/Projects/FamilyOffice/public/partner-data")
    
    if not base_path.exists():
        print(f"❌ 경로가 존재하지 않습니다: {base_path}")
        return
    
    print("🔍 긴 파일명을 가진 파일들을 찾고 있습니다...")
    
    deleted_count = 0
    
    # 모든 파일을 재귀적으로 검사
    for file_path in base_path.rglob("*"):
        if file_path.is_file():
            filename = file_path.name
            full_path_str = str(file_path)
            
            # 파일명이 100자 이상이거나 전체 경로가 200자 이상인 경우
            if len(filename) > 100 or len(full_path_str) > 200:
                print(f"❌ 삭제 예정: {file_path}")
                print(f"   파일명 길이: {len(filename)}자, 전체 경로 길이: {len(full_path_str)}자")
                
                try:
                    file_path.unlink()
                    print(f"✅ 삭제됨: {file_path}")
                    deleted_count += 1
                except Exception as e:
                    print(f"⚠️ 삭제 실패: {file_path} - {e}")
    
    # 특별히 알려진 문제 파일 삭제 시도
    problematic_file = base_path / "learn-investment/documents/증여 상속/1. 증여세 신고서식/증여세과세표준신고 및 자진납부계산서(기본세율 적용 증여재산 신고용)¸ 증여재산 및 평가명세서.hwp"
    
    if problematic_file.exists():
        print(f"\n🎯 알려진 문제 파일 삭제: {problematic_file}")
        try:
            problematic_file.unlink()
            print(f"✅ 삭제됨: {problematic_file}")
            deleted_count += 1
        except Exception as e:
            print(f"⚠️ 삭제 실패: {problematic_file} - {e}")
    
    # 빈 디렉토리 정리
    print("\n🧹 빈 디렉토리 정리 중...")
    try:
        for dir_path in base_path.rglob("*"):
            if dir_path.is_dir() and not any(dir_path.iterdir()):
                print(f"🗂️ 빈 디렉토리 삭제: {dir_path}")
                dir_path.rmdir()
    except Exception as e:
        print(f"⚠️ 디렉토리 정리 중 에러: {e}")
    
    print(f"\n✨ 정리 완료! 총 {deleted_count}개 파일 삭제됨")
    
    # Git 상태 확인을 위한 안내
    print("\n📋 다음 단계:")
    print("1. git status 로 변경사항 확인")
    print("2. git add . 로 변경사항 스테이징")
    print("3. git commit -m '문제 파일 삭제' 로 커밋")
    print("4. git push 로 푸시")
    print("5. vercel --prod 로 재배포")

if __name__ == "__main__":
    try:
        cleanup_long_files()
    except KeyboardInterrupt:
        print("\n⚠️ 사용자에 의해 중단됨")
        sys.exit(1)
    except Exception as e:
        print(f"❌ 예상치 못한 에러: {e}")
        sys.exit(1)