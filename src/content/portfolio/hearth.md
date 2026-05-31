---
title: "Hearth"
description: "VRM 캐릭터가 사는 3D 방을 Windows 배경화면으로 — 데스크탑 펫 + AI 에이전트 플랫폼."
tech: ["Unity", "C#", "C++", "Windows API", "UniTask", "URP"]
priority: 3
thumbnail: "/portfolio/hearth-1.png"
pubDate: 2026-03-01
draft: false
team: "Solo"
featuredBullets:
  - title: "Windows API 직접 조작"
    description: "WorkerW HWND 임베딩으로 Unity 씬을 배경화면으로 구현. WM_NCHITTEST 클릭 스루 픽셀 단위 제어."
  - title: "ILLMProvider 추상화"
    description: "Gemini / Groq / 로컬 gguf 동일 인터페이스. Rate Limit Fallback 자동 전환."
bullets:
  - "Unity 씬을 Windows 배경화면에 직접 임베딩, 엔진 밖 창 프레임워크 구현"
  - "애니메이션·UI·카메라·조명 전 도메인 행동을 에디터에서 코드 수정 없이 튜닝하는 Data-Driven 아키텍처 설계"
  - "Gemini·Groq·로컬 모델을 단일 인터페이스로 통합하는 LLM 추상화 레이어 설계, Rate Limit 자동 Fallback"
  - "URP Render Graph 기반 커스텀 Renderer Feature로 스크린 스페이스 림 라이팅 직접 구현"
  - "C++ WebView2 네이티브 플러그인 제작, Unity↔네이티브 콜백 안전성 확보"
---

## 한줄 소개

VRM 캐릭터가 사는 3D 방을 Windows 배경화면으로 사용하는 데스크탑 펫 + AI 에이전트 플랫폼.  
Solo, 2개월, ~19,000 LOC, Steam 출시 예정.

---

## 어필 포인트

### 1. Windows API 직접 조작 — 엔진 밖

WorkerW HWND 임베딩으로 Unity 씬을 배경화면으로 구현. WM_NCHITTEST로 클릭 스루/수신 영역을 픽셀 단위 제어. user32.dll P/Invoke로 Windows↔Unity 좌표계 직접 변환.

> "Unity를 도구로만 쓰는 게 아니라 엔진 밖을 이해한다"는 증거.

### 2. Data-Driven Everything — SO 전 도메인 적용

VisualSequenceSO(펫 비주얼), UITkSequenceSO(UI 애니메이션), CameraSequenceSO(카메라 연출), LightingPresetSO(시간대별 렌더링) — 애니메이션·UI·카메라·조명 전 도메인을 ScriptableObject로 정의.  
BT는 `VisualPlayer.Play(SO)` 단일 호출 — 코드 수정 없이 에디터에서 행동 튜닝 가능.

### 3. ILLMProvider — Cloud/Local LLM 동일 인터페이스

`ILLMProvider` 하나로 Gemini(API), Groq(API), LLMUnity(로컬 gguf) 통합.  
`RequiresWarmup` + `WarmupAsync(CancellationToken)` 명시적 선언으로 로컬 모델 로딩 비용을 인터페이스 레벨에서 처리.  
GeminiProvider는 429/503 응답 시 Fallback 모델 자동 전환.

### 4. URP Custom Renderer Feature

`ScreenSpaceRimFeature : ScriptableRendererFeature` 직접 구현.  
RenderGraph API 기반 두 패스 — Stencil로 캐릭터/환경 분리, Depth texture 샘플링으로 스크린 스페이스 림 연산.  
MaterialPropertyBlock 캐싱으로 DrawCall 오버헤드 최소화.

### 5. C++ 네이티브 플러그인

HearthWebView.dll — C++로 WebView2 래핑, P/Invoke로 Unity 연동.  
GC Anchor 패턴 — C# delegate를 필드로 보관해 네이티브 콜백 포인터 무효화 방지.

### 6. 14 도메인 어셈블리 + Wire→Inject→Init 부트스트랩

14개 asmdef로 도메인 경계 강제. static EventBus로 크로스 도메인 결합 완전 제거.  
Wire(인스턴스 생성) → Inject(의존성 주입) → Init(부작용) 3단계 부트스트랩으로 초기화 순서 버그 원천 차단.

---

## 기술 스택

| 분류 | 내용 |
|------|------|
| 엔진 | Unity 6.3 LTS, URP |
| 언어 | C#, C++ |
| 비동기 | UniTask (전 구간) |
| VRM | UniVRM v0.131.0 런타임 로딩 |
| AI | ILLMProvider → Gemini / Groq / LLMUnity |
| 네이티브 | user32.dll, HearthWebView.dll (WebView2) |
| 어셈블리 | 14개 도메인 asmdef |
