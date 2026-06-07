---
title: "Project Steampack"
description: "소녀전선2 모작 3D 턴제 SRPG. 내일배움캠프 최우수 (23팀 중 1위). 4인 팀 리더."
tech: ["Unity", "C#", "DOTween", "UGS"]
priority: 1
thumbnail: "/portfolio/steampack-1.png"
pubDate: 2024-11-01
draft: false
award: "/portfolio/steampack-award.png"
period: "2024.11 ~ 2025.01"
team: "4인 팀 리더 · 내일배움캠프 최우수 (23팀 중 1위)"
featuredBullets:
  - title: "Query Object 스탯 체인"
    description: "버프·디버프를 조건 분기 없이 조합하고 시간 기반으로 자동 만료. Modifier 추가·제거만으로 스택 처리."
  - title: "업적 O(1) 디스패치"
    description: "이벤트 하나로 관련 업적만 직접 접근. 전체 순회 없이 복수 업적 동시 처리."
bullets:
  - "버프·디버프를 조건 분기 없이 조합·자동 만료하는 Query Object 기반 스탯 시스템 설계"
  - "업적 이벤트를 2D 매트릭스로 인덱싱해 전체 순회 없이 O(1) 디스패치"
  - "패시브 스킬을 커맨드 흐름에 자율 삽입하는 구조로 상위 로직 수정 없이 확장 가능하게 설계"
  - "ScriptableObject 팩토리 조합으로 40개 이상 UI 클래스 애니메이션 코드 완전 제거"
  - "26명 유저 테스트 → 피드백 반영해 오토/배속 기능 추가, 애니메이션 싱크 이슈 해결"
---

## 한줄 소개

소녀전선2 모작 3D 턴제 SRPG.  
4인 팀 리더, 내일배움캠프 최우수 (23팀 중 1위), 약 2개월.

---

## 어필 포인트

### 스탯/버프 — Query Object 패턴 체인 계산

`LinkedList<CombatStatModifier>` 체인에 Query 객체를 흘려 버프/디버프 계산.  
Modifier 추가·제거만으로 조합 가능, 시간 기반 자동 만료. 조건 분기 없이 버프 스택 처리.

### 업적 — 2D 매트릭스 O(1) 디스패치

`AchievementEvent(ActionType, TargetType)` 2D 매트릭스 인덱싱으로 관련 업적만 O(1) 접근.  
전체 순회 없이 이벤트 하나로 복수 업적 처리. `DefaultKey(-1)`로 타겟 무관 업적 동시 처리.

### 패시브 스킬 — 커맨드 흐름 자율 인젝션

커맨드 실행 전/후 `ExecuteCommandEvent` 발행 → 각 패시브가 `commandPushList`에 자율 삽입.  
상위 로직 무수정으로 패시브 추가 가능. 새 패시브는 구현체만 추가.

### UI 애니메이션 — 인스펙터에서 코드 없이 조합

`BehaviorFactory : ScriptableObject` — 인스펙터에서 이벤트(OnOpen/Close/Click 등)별 팩토리 리스트 조합.  
40개 이상 UI 클래스가 애니메이션 코드 없이 동작.

### 26명 유저 테스트 → 오토/배속 구현

유저 테스트로 적 턴 대기 피로도 이슈 11건 확인. 오토 전투 + 배속 기능 추가.  
명령 실행 중 배속 적용 시 애니메이션 싱크 문제 고려 — 명령 완료 후 적용으로 설계.

---

## 기술 스택

| 분류 | 내용 |
|------|------|
| 엔진 | Unity 2022, URP |
| 언어 | C# |
| 라이브러리 | DOTween, UGS (Unity Gaming Services) |
| 데이터 | Google Sheets → JSON → ScriptableObject |
| 기간 | 2024.11 ~ 2025.01 (약 2개월) |
| 팀 | 4인 / 리더 |
