---
In: UnrealEngine
title: "Unreal Engine Gameplay Framework Guide"
author: "Gemini"
---

# Unreal Engine: Gameplay Framework Guide

언리얼 엔진의 게임플레이 프레임워크는 강력하고 유연한 게임 구조를 만들기 위한 핵심 클래스들의 집합입니다. 이 프레임워크를 이해하는 것은 게임의 규칙을 정의하고, 플레이어의 상호작용을 처리하며, 멀티플레이어 환경을 구축하는 데 있어 필수적입니다. 

이 가이드에서는 게임의 두뇌 역할을 하는 `GameMode`부터 플레이어의 아바타인 `Pawn`까지, 핵심 클래스들의 역할과 상호작용을 체계적으로 설명합니다.

## 1. 게임의 총감독: `AGameModeBase`와 `AGameMode`

`GameMode`는 게임의 **규칙과 흐름을 정의**하는 서버 전용 클래스입니다. 싱글플레이어 게임에서는 로컬 서버 역할을 하며, 월드에 단 하나만 존재합니다.

### `AGameModeBase`의 핵심 역할

- **기본 클래스 설정**: 플레이어가 게임에 접속했을 때 사용할 기본 클래스들을 지정합니다.
    - `Default Pawn Class`: 플레이어가 조종할 기본 캐릭터
    - `Player Controller Class`: 플레이어의 입력을 처리할 컨트롤러
    - `Player State Class`: 플레이어의 점수, 이름 등 상태 정보
    - `GameState Class`: 게임 전체의 시간, 규칙 등 상태 정보
    - `HUD Class`: 화면에 표시될 UI
- **플레이어 관리**: 새로운 플레이어의 접속(Login)을 처리하고, 월드에 캐릭터(Pawn)를 스폰(Spawn)하는 책임을 가집니다.
- **게임 규칙 정의**: 승리/패배 조건, 레벨 전환 등 게임의 핵심 규칙을 구현하는 곳입니다.

### `AGameMode` vs `AGameModeBase`

`AGameMode`는 `AGameModeBase`를 상속받아 **전통적인 매치 기반 게임**을 위한 상태 머신(`Match State Machine`) 기능을 추가한 버전입니다.

- **`AGameModeBase`**: 더 가볍고 유연하며, 매치 개념이 없는 오픈월드나 싱글플레이어 게임, 또는 독자적인 규칙을 가진 게임에 적합합니다.
- **`AGameMode`**: 데스매치처럼 `WaitingToStart`(시작 대기), `InProgress`(진행 중), `WaitingPostMatch`(종료 후 대기) 등 명확한 상태 구분이 필요한 세션 기반 멀티플레이어 게임에 유용합니다.

> **결론**: 특별한 경우가 아니라면, 더 가볍고 현대적인 **`AGameModeBase`** 로 시작하는 것이 좋습니다.

## 2. 핵심 게임플레이 클래스: 4인방

`GameMode`는 아래 4가지 핵심 클래스를 조율하여 게임을 운영합니다. 이들의 역할 구분은 특히 멀티플레이어 환경에서 매우 중요합니다.

![Gameplay Framework Diagram](https://docs.unrealengine.com/5.6/Images/programming-and-scripting/gameplay-architecture/gameplay-framework-diagram/GameplayFramework.webp)

### ① `APlayerController`: 플레이어의 뇌

`PlayerController`는 플레이어의 의지를 대변하는 **서버 권위적** 클래스입니다. 키보드, 마우스 등 입력을 받아 해석하고, 자신이 조종하는 `Pawn`에게 명령을 내립니다.

- **역할**: 입력 처리, UI 관리, `Pawn` 빙의(Possession) 및 해제
- **복제**: 서버에만 완전한 인스턴스가 존재하며, 각 클라이언트는 오직 자신의 `PlayerController`에 대한 참조만 가집니다. 이는 치팅을 방지하는 핵심 구조입니다.

### ② `APawn` & `ACharacter`: 플레이어의 아바타

`Pawn`은 월드에 존재하는 플레이어의 물리적인 현신, 즉 **아바타**입니다. `PlayerController`로부터 명령을 받아 실제로 움직이고 상호작용합니다.

- **`APawn`**: 조종 가능한 모든 액터의 기본 클래스입니다. (자동차, 비행선 등)
- **`ACharacter`**: `Pawn`을 상속받아 이족보행 캐릭터에 필요한 기능(걷기, 점프 등)이 미리 구현된 클래스입니다. `CharacterMovementComponent`가 핵심입니다.
- **복제**: 서버에서 생성되어 모든 클라이언트에게 복제됩니다. 따라서 모든 플레이어의 눈에 보입니다.

### ③ `APlayerState`: 개별 플레이어의 상태 정보

`PlayerState`는 한 플레이어에 대한 **상태 정보**를 저장하고 모든 클라이언트와 동기화하는 역할을 합니다. 다른 플레이어가 알아야 할 나의 정보를 담습니다.

- **주요 정보**: `PlayerName`(이름), `Score`(점수), `Ping`(네트워크 지연), 소속 팀 등
- **복제**: 서버에서 관리되며 모든 클라이언트에게 복제됩니다. 점수판 UI는 모든 플레이어의 `PlayerState` 정보를 모아서 만듭니다.

### ④ `AGameStateBase`: 게임 전체의 상태 정보

`GameState`는 `PlayerState`와 유사하지만, 개인이 아닌 **게임 전체의 상태**를 저장하고 동기화합니다. 모든 플레이어가 현재 게임 상황을 알기 위해 필요한 정보를 담습니다.

- **주요 정보**: `MatchState`(매치 상태), 남은 경기 시간, 전체 플레이어 목록(`PlayerArray`), 게임 목표 등
- **복제**: 서버에서 관리되며 모든 클라이언트에게 복제됩니다. 화면 상단의 남은 시간 UI 등은 `GameState`의 정보를 사용합니다.

## 3. 전체 흐름 요약

1.  **게임 시작**: 월드가 로드되면, 설정된 `GameMode`가 생성됩니다.
2.  **플레이어 접속**: 플레이어가 게임에 접속하면, `GameMode`는 `Login` 프로세스를 실행합니다.
3.  **핵심 클래스 생성**: `GameMode`는 해당 플레이어를 위한 `PlayerController`, `PlayerState` 등의 클래스 인스턴스를 생성합니다.
4.  **Pawn 스폰 및 빙의**: `GameMode`는 `DefaultPawnClass`를 월드에 스폰하고, 생성된 `PlayerController`가 이 `Pawn`에 **빙의(Possess)** 하도록 명령합니다.
5.  **게임플레이 시작**:
    - `PlayerController`는 사용자의 입력을 받습니다.
    - `PlayerController`는 입력에 따라 `Pawn`(`Character`)을 움직이도록 명령합니다.
    - `Pawn`이 아이템을 줍거나 적을 처치하면, 서버의 `PlayerState`에 점수가 업데이트되고, 이 정보는 모든 클라이언트에게 복제됩니다.
    - `GameState`는 게임의 남은 시간을 계속 업데이트하고, 모든 클라이언트의 HUD에 이 정보가 표시됩니다.
6.  **게임 종료**: `GameMode`가 승리/패배 조건을 감지하면, 게임을 종료하고 다음 레벨로 이동하거나 결과를 표시합니다.

이처럼 언리얼 엔진의 게임플레이 프레임워크는 각 클래스가 명확한 책임을 가지고 유기적으로 협력하도록 설계되어, 복잡한 멀티플레이어 게임도 체계적으로 구현할 수 있게 해줍니다.
