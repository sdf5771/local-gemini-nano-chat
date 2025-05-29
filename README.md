# 🤖 Local Gemini Nano Chat

Chrome의 내장 Prompt API를 활용하여 완전히 로컬에서 작동하는 Gemini Nano 채팅 인터페이스입니다. 서버 없이 브라우저에서 직접 AI와 대화할 수 있습니다.

## ✨ 주요 특징

- 🔒 **완전한 프라이버시**: 모든 대화가 로컬에서 처리되어 외부 서버로 데이터가 전송되지 않음
- ⚡ **실시간 스트리밍**: 응답이 실시간으로 스트리밍되어 자연스러운 대화 경험
- 🎨 **모던 UI/UX**: React와 TypeScript로 구현된 직관적이고 반응형 채팅 인터페이스
- 📱 **반응형 디자인**: 데스크톱과 모바일 모든 환경에서 최적화된 사용자 경험
- 🚀 **빠른 개발 환경**: Vite를 활용한 고속 개발 서버와 HMR 지원
- 🔧 **TypeScript 지원**: 타입 안전성과 개발자 경험 향상

## 🛠️ 기술 스택

- **Frontend**: React 19, TypeScript
- **AI Engine**: Chrome Prompt API (Gemini Nano)
- **Styling**: CSS Modules / Tailwind CSS
- **State Management**: Zustand
- **Build Tool**: Vite

## 📋 요구사항

- Chrome 123+ 브라우저
- `chrome://flags/#prompt-api-for-gemini-nano` 플래그 활성화
- 최소 2GB 여유 디스크 공간 (모델 다운로드용)

## 🚀 시작하기

```bash
# 저장소 클론
git clone https://github.com/username/local-gemini-nano-chat.git

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build
```

## 💡 사용법

1. Chrome 브라우저에서 애플리케이션 실행
2. 최초 실행 시 Gemini Nano 모델 자동 다운로드
3. 채팅창에 메시지 입력하여 AI와 대화 시작
4. 모든 대화 내용은 로컬에서만 처리됨

## 📄 라이선스

GNU GENERAL PUBLIC LICENSE

---

**⚠️ 주의**: 이 프로젝트는 Chrome의 실험적 기능을 사용합니다. 안정적인 사용을 위해 최신 버전의 Chrome을 권장합니다.