---
title: "Rolice"
description: "Android 출시 목표 모바일 퍼즐. 백엔드 서비스 레이어 설계 — UPM 패키지 분리, Null Object, 서버 권위 이코노미."
tech: ["Unity", "C#", "Firebase", "AdMob", "DOTween"]
priority: 2
thumbnail: "/portfolio/rolice-1.png"
pubDate: 2026-01-01
draft: false
period: "2026.01 ~ 진행중"
team: "5인 팀"
featuredBullets:
  - title: "백엔드 서비스 레이어"
    description: "Firebase·AdMob를 게임 코드에서 완전히 분리. 서비스 미등록 시에도 NPE 없이 동작, 오프라인 에디터 테스트 지원."
  - title: "SO 데이터 테이블 추상화"
    description: "인스펙터에서 아이템 이펙트를 코드 없이 조합하는 데이터 테이블 구조. ID·타입 이중 인덱스로 직접 접근."
bullets:
  - "Firebase·AdMob를 게임 코드에서 완전히 분리하는 백엔드 서비스 레이어 설계"
  - "Null Object 패턴으로 서비스 미등록 시에도 NPE 없이 동작, 에디터 오프라인 시뮬레이션 지원"
  - "서버 권위 트랜잭션으로 이코노미 일관성 보장 — 읽기 로컬 캐시 / 쓰기 서버 원자 처리"
  - "패널 스택·레이어 분리 기반 UI 시스템 설계 — 상점·가방·스테이지 선택 등 화면 다수 구현"
  - "인스펙터에서 코드 없이 조합하는 DOTween 시퀀스 애니메이션 시스템 설계"
  - "레벨 에디터·배치 생성기·데이터 테이블 에디터 3종 제작 — 팀원이 코드 없이 스테이지·데이터 편집 가능"
---

## 한줄 소개

Android 출시 목표 모바일 퍼즐 게임.  
5인 팀, 백엔드 서비스 레이어 설계 및 클라이언트 전반 구현. 2026.01 ~ 진행중.

---

## 어필 포인트

### 백엔드 추상화 — UPM 패키지 + Null Object + 서버 권위 이코노미

Firebase, AdMob를 게임 코드에서 직접 호출하면 SDK 교체나 오프라인 테스트 시 전체 코드를 건드려야 한다.

`com.rolice.backend` UPM 로컬 패키지로 물리적 분리. `IBackend` 파사드 아래 `IAuthService`, `IEconomyService`, `ICloudSyncService`, `IHeartRegenService`, `IAdsService` 도메인별 인터페이스 분리.  
게임 코드는 `RcBackendServices.Economy.SpendAsync()` 한 줄 — Firebase 구체를 모름.

**Null Object Pattern** — `_backend = new NullBackend()`가 기본값. 모든 서비스의 무동작 구현체 내장, Register 없이도 NPE 없이 동작. `alwaysSucceed` 플래그로 에디터에서 구매·인증 성공 시뮬레이션.

**서버 권위 이코노미** — `SpendAsync`가 `RunTransactionAsync`로 잔액 검증·차감 원자 처리.  
읽기는 로컬 캐시(동기), 쓰기는 서버 → 성공 후 캐시 갱신.

---

## 기술 스택

| 분류 | 내용 |
|------|------|
| 엔진 | Unity (URP) |
| 언어 | C# |
| 백엔드 | Firebase Auth, Firestore, AdMob |
| 패키지 | com.rolice.backend (UPM 로컬 패키지) |
| 기간 | 2026.01 ~ 진행중 |
| 팀 | 5인 |
