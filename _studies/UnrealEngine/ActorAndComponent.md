---
title: "언리얼 엔진: Actor와 Component 이해하기"
---

언리얼 엔진(Unreal Engine)에서 **Actor**와 **Component**는 게임 월드의 상호작용 요소를 구성하는 데 사용되는 가장 기본적인 빌딩 블록입니다. 이 둘은 상호 보완적인 관계를 가지며, Actor는 월드에 존재하는 엔티티이고, Component는 Actor에 부착되어 동작과 외형을 정의하는 모듈화된 기능 조각입니다.

### Actor (AActor)

`AActor`는 언리얼 엔진 월드에 배치되거나 스폰될 수 있는 오브젝트입니다. Actor는 게임 월드 내에서 독립적인 존재로 간주되며, 고유한 트랜스폼(위치, 회전, 스케일)을 가집니다. 이 트랜스폼은 일반적으로 Actor의 루트 씬 컴포넌트에 의해 관리됩니다.

**주요 특징:**

*   **월드 존재:** 레벨에 배치되거나 런타임에 동적으로 스폰될 수 있습니다.
*   **독립성:** 독립적인 엔티티로 이동, 복제, 파괴될 수 있습니다.
*   **트랜스폼:** 월드 내에서 위치, 회전, 스케일을 가집니다.
*   **예시:** 플레이어 캐릭터, 광원, 수집 가능한 아이템, 문 등.
*   **라이프사이클:** 자체적인 라이프사이클 메서드와 프레임당 로직을 위한 틱(Tick) 함수를 가집니다.

**주요 라이프사이클 함수:**

1.  **생성/스폰 (Creation/Spawning):**
    *   `PostLoad()`: 디스크에서 로드된 액터에 대해 호출됩니다. 커스텀 버전 관리 및 수정 동작을 구현하는 데 사용됩니다.
    *   `UWorld::SpawnActor()`: 게임 플레이 중 액터가 동적으로 생성될 때 호출됩니다.
    *   `AActor::PostActorCreated()`: 스폰된 액터 생성 후 호출됩니다.
    *   `AActor::OnConstruction()`: 액터의 생성 과정입니다. 블루프린트 액터의 컴포넌트가 생성되고 변수가 초기화됩니다. 에디터에서 액터를 배치하거나 이동할 때, 또는 런타임에 스폰될 때마다 실행됩니다.
    *   `AActor::PostActorConstruction()`: 액터의 생성 후 호출됩니다.
    *   `UWorld::OnActorSpawned`: 액터 스폰 프로세스가 완료될 때 `UWorld`에서 브로드캐스트됩니다.

2.  **초기화 (Initialization):**
    *   `AActor::PreInitializeComponents()`: 액터의 컴포넌트에서 `InitializeComponent`가 호출되기 전에 호출됩니다.
    *   `AActor::PostInitializeComponents()`: 액터의 컴포넌트가 초기화된 후 호출됩니다.
    *   `AActor::BeginPlay()`: 레벨이 시작되거나 액터가 런타임에 월드에 진입할 때 호출됩니다. 게임 플레이 관련 초기화에 중요한 지점입니다.

3.  **게임 플레이 중 (During Gameplay):**
    *   `Tick(float DeltaSeconds)`: 액터가 매 프레임마다 (활성화된 경우) 호출되어 프레임당 로직 및 업데이트를 수행합니다.

4.  **라이프사이클 종료 (End of Lifecycle):**
    *   `AActor::Destroy()`: 게임 플레이 중 액터를 월드에서 수동으로 제거하기 위해 호출됩니다. 액터는 `PendingKill`로 표시됩니다.
    *   `AActor::EndPlay(const EEndPlayReason::Type EndPlayReason)`: 액터의 수명이 끝날 때 호출됩니다. `Destroy`가 호출되거나, PIE가 끝나거나, 레벨 전환 중이거나, 액터를 포함하는 스트리밍 레벨이 언로드될 때 등입니다.
    *   가비지 컬렉션: 언리얼 엔진은 `UObject` 파생 클래스(Actor 및 Component 포함)의 메모리를 관리하기 위해 가비지 컬렉션 시스템을 사용하며, 더 이상 필요하지 않을 때 자동으로 수집합니다.

### Component (UActorComponent)

`UActorComponent`는 Actor에 부착되어 동작을 확장할 수 있는 서브 오브젝트입니다. 컴포넌트는 모듈성과 재사용성을 촉진하여, 다양한 Actor에서 공통 기능(예: 이동, 인벤토리, 체력 관리, 시각적 표현, 사운드)을 공유할 수 있도록 합니다.

**주요 특징:**

*   **모듈성:** Actor에 기능을 추가하는 모듈식 방법입니다.
*   **재사용성:** 여러 Actor에서 동일한 컴포넌트를 재사용할 수 있습니다.
*   **Actor에 부착:** 컴포넌트는 직접 씬에 추가될 수 없으며, 반드시 Actor에 부착되어야 합니다.

**주요 컴포넌트 유형:**

1.  **Actor Components (`UActorComponent`):**
    *   모든 컴포넌트의 기본 클래스입니다. 추상적인 동작에 유용하며, 월드 내에서 물리적인 위치나 회전을 가지지 않습니다.
    *   예시: 인벤토리 컴포넌트, 체력 컴포넌트.

2.  **Scene Components (`USceneComponent`):**
    *   `UActorComponent`의 자식 클래스로, 트랜스폼(위치, 회전, 스케일)을 가집니다. 다른 씬 컴포넌트에 부착되어 계층 구조를 형성할 수 있습니다.
    *   물리적인 표현이 필요 없는 위치 기반 동작(예: 카메라, 스프링 암)에 사용됩니다.

3.  **Primitive Components (`UPrimitiveComponent`):**
    *   `USceneComponent`의 자식 클래스로, 기하학적 표현을 가집니다. 시각적 요소 렌더링, 충돌, 물리 오브젝트와의 오버랩에 사용됩니다.
    *   예시: 스태틱 메시, 스켈레탈 메시, 충돌 볼륨.

**주요 라이프사이클 함수:**

*   **생성 (Creation):** 컴포넌트는 일반적으로 Actor의 스폰 과정 중 Actor의 서브 오브젝트로 생성되거나, 플레이 중 수동으로 생성됩니다.
*   **`OnRegister()`:** 컴포넌트가 엔진에 등록될 때 호출됩니다. 에디터에서 Actor를 수정할 때(예: 이동하거나 속성을 변경할 때) 호출될 수 있습니다. 시각화 컴포넌트의 경우, 에디터에서 보여야 하는 초기화에 `OnRegister`를 사용할 수 있습니다.
*   **`InitializeComponent()`:** Actor의 초기화 단계에서 각 컴포넌트에 대해 호출됩니다.
*   **`BeginPlay()`:** 게임이 시작될 때 컴포넌트 자체의 `BeginPlay` 이벤트가 호출될 수 있습니다.
*   **`TickComponent()`:** Actor의 `Tick`과 유사하게, 컴포넌트도 프레임당 업데이트를 위한 `TickComponent` 함수를 가질 수 있습니다.
*   **`OnUnregister()`:** 컴포넌트가 등록 해제될 때 호출됩니다.
*   **소멸 (Destruction):** 컴포넌트는 일반적으로 소유 Actor가 파괴될 때 함께 파괴됩니다.

### 언제 무엇을 사용할 것인가?

*   **Actor:** 게임 월드에 독립적으로 존재해야 하고, 물리적인 존재(비록 공간의 한 점일지라도)를 가지며, 자체적인 라이프사이클 관리가 필요한 엔티티에 Actor를 사용합니다.
*   **Component:** Actor에 모듈화되고 재사용 가능한 기능과 데이터를 추가하는 데 Component를 사용합니다.
    *   기능이 물리적인 위치, 회전, 스케일을 필요로 한다면 `SceneComponent` 또는 `PrimitiveComponent`를 사용합니다.
    *   기능이 추상적이라면(예: 인벤토리, 체력, 시각적 표현이 없는 이동 로직) `ActorComponent`로 충분합니다.
    *   Actor가 에디터에 배치되거나 수정될 때 초기화가 필요하다면 `OnConstruction` (Actor용) 또는 `OnRegister` (Component용)을 고려합니다.
    *   게임 시작 시에만 발생해야 하는 게임 플레이 관련 초기화는 Actor와 Component 모두 `BeginPlay`가 적절한 위치입니다.
    *   모든 참조가 유효해야 하는 초기화의 경우, `PostInitializeComponents`가 종종 좋은 선택입니다.
