---
In: UnrealEngine
title: "언리얼 엔진: 주요 오브젝트 라이프사이클"
---

언리얼 엔진(Unreal Engine)은 다양한 종류의 오브젝트들이 정해진 규칙에 따라 생성되고, 초기화되며, 업데이트되고, 소멸되는 "라이프사이클"을 가집니다. 이 라이프사이클을 이해하는 것은 효율적인 게임 개발, 메모리 관리, 디버깅에 필수적입니다. 여기서는 주요 언리얼 오브젝트들의 라이프사이클을 개괄적으로 설명합니다.

### UObject 라이프사이클

`UObject`는 언리얼 엔진의 거의 모든 오브젝트의 기본 클래스이며, 리플렉션 시스템과 가비지 컬렉션의 기반을 형성합니다.

*   **생성 (Creation):**
    *   `UObjects`는 생성자가 호출되기 전에 초기화 시 자동으로 0으로 채워집니다.
    *   `PostInitProperties()`: 속성이 초기화된 후 호출됩니다.
    *   `PostLoad()`: 디스크에서 로드된 후 호출됩니다.
    *   `PostDuplicate()`: 복제된 후 호출됩니다.
*   **가비지 컬렉션 (Garbage Collection):**
    *   언리얼 엔진은 `UObject` 파생 클래스의 메모리를 관리하기 위해 가비지 컬렉션 시스템을 사용합니다.
    *   엔진은 `UObject`에 대한 참조를 추적하고, 더 이상 필요하지 않을 때 수집합니다.
    *   **`AddToRoot()`**: `UObject`에 `AddToRoot()`를 호출하면 해당 오브젝트와 그 자손들이 가비지 컬렉션에 의해 삭제되는 것을 방지하여 전역적인 라이프타임을 갖게 합니다.
*   **소멸 (Destruction):**
    *   `BeginDestroy()`: 오브젝트 소멸 과정에서 호출되며, 메모리를 해제하고 멀티스레드 리소스를 처리할 수 있도록 합니다.
    *   `IsReadyForFinishDestroy()`: 가비지 컬렉션 프로세스가 오브젝트가 영구적인 할당 해제 준비가 되었는지 확인하기 위해 호출합니다.
    *   `FinishDestroy()`: 메모리가 해제되기 전 마지막으로 호출되며, 내부 데이터 구조를 해제할 최종 기회를 제공합니다.
    *   `AActor` 또는 `UActorComponent`가 파괴될 때, 리플렉션 시스템에 보이는 모든 참조(예: `UPROPERTY` 포인터, `TArray`의 포인터)는 자동으로 Null로 설정되어 Dangling Pointer를 방지합니다.

### Actor 라이프사이클

`AActor`는 레벨에 배치되거나 스폰될 수 있는 `UObject`입니다. 그 라이프사이클은 인스턴스화, 초기화, 그리고 최종적인 소멸을 포함합니다.

*   **인스턴스화 (Instantiation):**
    *   **디스크에서 로드:** 레벨에 이미 있는 액터의 경우, 로드가 완료된 후 `PostLoad()`가 호출됩니다.
    *   **PIE (Play In Editor):** 액터는 새로운 `World`로 복제되며, `UObject::PostDuplicate()`가 호출됩니다.
    *   **스폰 (Spawning):** 액터가 동적으로 스폰될 때(예: `SpawnActor` 사용), `PostActorCreated()`가 호출됩니다.
    *   **지연 스폰 (Deferred Spawn):** 절차적 액터의 경우, `UWorld::SpawnActorDeferred()`는 블루프린트 생성 스크립트 전에 추가 설정을 허용하며, 이후 `AActor::FinishSpawning()`이 액터를 최종화합니다.
*   **초기화 (Initialization):**
    *   `AActor::PreInitializeComponents()`: 액터의 컴포넌트에서 `InitializeComponent`가 호출되기 전에 호출됩니다.
    *   `UActorComponent::InitializeComponent()`: 컴포넌트 생성에 대한 헬퍼 함수입니다.
    *   `AActor::PostInitializeComponents()`: 컴포넌트가 초기화된 후 호출됩니다.
    *   `AActor::BeginPlay()`: 레벨이 시작될 때 호출됩니다. (가장 일반적으로 사용되는 초기화 지점)
*   **업데이트 (Update):**
    *   `AActor::Tick(float DeltaSeconds)`: 매 프레임마다 호출되어 액터의 로직을 업데이트합니다. `PrimaryActorTick.bCanEverTick`이 `true`로 설정되어야 합니다.
*   **라이프사이클 종료 (End of Lifecycle):**
    *   `AActor::Destroy()`: 게임 플레이 중 액터를 수동으로 제거하기 위해 호출됩니다.
    *   `AActor::EndPlay(const EEndPlayReason::Type EndPlayReason)`: 액터의 수명이 끝날 때 호출됩니다. `Destroy`가 호출되거나, PIE가 끝나거나, 레벨 전환 중이거나, 액터를 포함하는 스트리밍 레벨이 언로드될 때 등입니다.
    *   액터는 가비지 컬렉션에 의한 할당 해제를 위해 `RF_PendingKill`로 표시됩니다.
    *   `AActor::OnDestroyed()`: `Destroy`에 대한 레거시 응답입니다. 로직을 `EndPlay`로 옮기는 것이 권장됩니다.

### GameMode 라이프사이클

`AGameModeBase` (또는 `AGameMode`)는 게임의 규칙을 정의하며, 멀티플레이어 게임에서는 서버에서만 존재합니다.

*   `UGameEngine::LoadMap()`을 통해 레벨이 플레이를 위해 초기화될 때마다 `GameMode` 액터가 인스턴스화됩니다.
*   `GameMode`는 매치 또는 게임 플레이 흐름을 추적하는 상태 머신을 포함하며, `EnteringMap`, `WaitingToStart`, `InProgress`, `WaitingPostMatch`, `LeavingMap`과 같은 상태를 가집니다.
*   `HandleMatchHasStarted()`: `InProgress` 상태로 진입할 때 호출되며, 이후 모든 액터의 `BeginPlay()`를 호출합니다.
*   `GameMode`는 `Default Pawn Class`, `HUD Class`, `Player Controllers Class`, `Game State Class`, `Player State Class`와 같은 기본 클래스를 설정하는 역할을 합니다.
*   멀티플레이어 환경에서 `GameState`와 `PlayerState`를 관리합니다.

### PlayerController 라이프사이클

`APlayerController`는 인간 플레이어와 그들의 `Pawn` 사이의 인터페이스 역할을 합니다.

*   `PlayerController`는 제어하는 `Pawn`이 파괴되고 리스폰되어도 게임 내내 지속됩니다 (예: 데스매치). 이 때문에 플레이어의 점수와 같이 리스폰 간에 지속되어야 하는 플레이어별 데이터를 저장하는 데 적합합니다.
*   `OnPostLogin()`: 성공적인 로그인 후 호출되며, `PlayerController`에서 복제된 함수를 호출할 수 있는 첫 번째 안전한 지점입니다.
*   `PlayerController`는 액터이므로, 레벨 변경 시 파괴되고 다시 생성되어 플레이어에게 할당됩니다.
*   멀티플레이어에서 클라이언트는 다른 머신의 `PlayerController`를 볼 수 없으며, 서버만 볼 수 있습니다.

### World 라이프사이클

`UWorld` 오브젝트는 언리얼 엔진의 레벨 또는 맵을 나타냅니다.

*   레벨이 변경될 때 `World`가 생성되고 파괴됩니다.
*   `WorldSubsystems`는 `World`에 바인딩되며 그 라이프타임을 공유합니다.
*   `WorldSubsystems`의 초기화 순서는 일반적으로 `Initialize()` 다음에 `PostInitialize()`가 호출됩니다.

### GameState 라이프사이클

`AGameStateBase` (또는 `AGameState`)는 게임 실행 시간, 플레이어 접속 시간, 현재 매치 상태 등 모든 플레이어와 공유되어야 하는 게임 관련 정보를 저장하고 동기화합니다.

*   `GameState`는 클라이언트와 서버 모두에 존재합니다.
*   그 상태는 서버에 의해 관리된 다음 클라이언트에 복제됩니다.
*   `GameState`는 레벨 변경을 통해 지속될 수 있으므로, 스코어보드와 같은 영구적인 게임 데이터에 적합합니다.
*   지속적으로 변경되고 게임 종료에 기여하는 변수(예: 동기화된 게임 시계)는 종종 `GameState`에 속합니다.
