---
title: "[Unreal] Enhanced Input 심층 분석: 아키텍처와 C++ 헤더의 원리"
date: 2025-08-03 18:00:00 +0900
categories: Unreal Engine
author: "Pargame"
---

> 이 포스트는 Gemini 2.5 Pro와 Pargame이 나눈 깊이 있는 대화를 바탕으로 정리한 기술 문서입니다.

단순히 C++과 블루프린트를 연결하는 방법을 넘어, 언리얼 엔진의 Enhanced Input System이 어떤 설계 사상으로 만들어졌는지 그 근본을 파헤쳐 봅니다. 이 글에서는 서브시스템 기반의 아키텍처부터 데이터 흐름, 그리고 C++ 헤더 파일에 `#include`와 전방 선언을 사용하는 이유까지, 시스템의 내부 동작 원리를 깊이 있게 분석합니다.

## 1. 아키텍처의 초석: 서브시스템 (Subsystem)

> Enhanced Input System을 이해하려면 먼저 '서브시스템'이라는 개념을 알아야 합니다. 서브시스템은 특정 기능을 독립적인 모듈로 캡슐화하여 코드의 응집도를 높이고 결합도를 낮추는 강력한 아키텍처입니다.

### `UGameInstance`와 `UGameInstanceSubsystem`

- **`UGameInstance`:** 게임이 시작될 때 단 하나 생성되어 게임이 끝날 때까지 유지되는 최상위 객체입니다. 레벨 전환과 관계없이 지속되어야 하는 데이터와 상태를 관리하는 컨테이너 역할을 합니다.
- **`UGameInstanceSubsystem`:** `UGameInstance`의 생명주기에 맞춰 자동으로 생성되고 관리되는 기능 관리자입니다. `UGameInstance`에 모든 기능을 구현할 경우 발생하는 '갓 오브젝트(God Object)' 문제를 방지하고, 각 기능을 독립적으로 개발하고 유지보수할 수 있도록 합니다.

### 서브시스템의 생명주기

> 서브시스템의 가장 큰 장점은 **자동으로 관리되는 생명주기**입니다.

1.  **발견 및 등록:** 엔진은 시작 시 `UGameInstanceSubsystem`을 상속하는 모든 클래스를 리플렉션 시스템을 통해 발견하고 내부 목록에 등록합니다.
2.  **생성:** `UGameInstance`가 생성될 때, 엔진은 등록된 목록의 모든 서브시스템 인스턴스를 함께 생성하여 `UGameInstance`에 종속시킵니다.
3.  **초기화 `Initialize()`:** 모든 서브시스템이 생성된 후, `Initialize()` 함수가 자동으로 호출됩니다. 이곳에서 다른 시스템의 참조를 얻거나, 데이터를 로딩하는 등 모든 **설정 로직**을 수행합니다. (액터의 `BeginPlay()`와 유사)
4.  **종료 `Deinitialize()`:** `UGameInstance`가 소멸될 때, `Deinitialize()` 함수가 자동으로 호출됩니다. 이곳에서 데이터를 저장하거나, 리소스를 정리하는 등 모든 **마무리 로직**을 수행합니다. (액터의 `EndPlay()`와 유사)

## 2. Enhanced Input의 계층 구조와 데이터 흐름

> Enhanced Input System은 명확한 계층 구조와 데이터 흐름을 통해 유연성과 확장성을 확보합니다. 입력이 발생해서 실제 행동으로 이어지기까지의 전체 과정을 이해하는 것이 중요합니다.

### ① 데이터 계층: 입력의 '정의'

> 가장 아래에는 입력이 '무엇'인지를 정의하는 데이터 애셋들이 있습니다.

- **`UInputAction` (IA):** '점프', '이동', '공격'과 같이 추상적인 **입력 행위 자체**를 정의하는 데이터 애셋입니다. 어떤 키에 매핑될지는 신경 쓰지 않고, 오직 이 액션이 어떤 타입의 값(Boolean, Vector2D 등)을 가지는지만 정의합니다.
- **`UInputMappingContext` (IMC):** **'규칙의 집합'**입니다. 특정 키(`W`, `Spacebar` 등)나 마우스 움직임을 어떤 `UInputAction`에 매핑할지를 결정합니다. 여기에 `Trigger`와 `Modifier`를 추가하여 "키를 꾹 눌렀을 때" 또는 "축 값을 반전시켜서"와 같은 구체적인 조건을 설정할 수 있습니다.

### ② 관리 및 처리 계층: 입력의 '해석'과 '발행'

> 데이터 계층에서 정의된 내용을 해석하고 처리하는 두뇌 역할을 합니다.

- **`ULocalPlayer`:** 로컬 머신에서 플레이하는 **각 플레이어를 대표하는 객체**입니다. 분할 화면 멀티플레이어의 경우 각 플레이어마다 별도의 `ULocalPlayer` 인스턴스가 존재하며, 플레이어별 설정과 서브시스템을 소유하고 관리하는 최상위 컨텍스트를 제공합니다.
- **`UEnhancedInputLocalPlayerSubsystem`:** **`ULocalPlayer`가 소유하고 관리하는 서브시스템**입니다. 이 서브시스템이 실질적인 입력 처리의 총괄자입니다. 활성화된 `IMC` 목록을 유지하고, 하드웨어로부터 들어온 원시 입력을 `IMC`의 규칙에 따라 해석하며, 조건이 충족되면 `IA`에 대한 이벤트를 **발행(Broadcast)**합니다.

### ③ 소비 및 실행 계층: 이벤트의 '구독'과 '실행'

> 발행된 이벤트를 받아 실제 행동으로 연결하는 최종 단계입니다.

- **`APlayerController`:** 플레이어의 의지를 대변하는 액터로, 입력 처리 로직의 중심점입니다.
- **`SetupPlayerInputComponent()`:** `APlayerController`가 폰에 빙의될 때 호출되는 핵심 함수입니다. 이 함수 안에서 입력 컴포넌트를 설정하고, 어떤 이벤트를 구독할지 결정하는 **'바인딩'** 작업이 이루어집니다.
- **`UEnhancedInputComponent`:** `APawn`이나 `APlayerController`에 추가되는 컴포넌트입니다. `SetupPlayerInputComponent()` 함수 내에서 이 컴포넌트에 접근하여 `BindAction()` 함수를 호출합니다.
- **`BindAction()`:** **'구독 신청'**을 하는 행위입니다. `UEnhancedInputComponent`의 이 함수를 통해 "`IA_Jump` 액션의 `Triggered` 이벤트가 발생하면, 특정 객체의 특정 함수를 호출해줘"라고 등록합니다. 예를 들어, `APlayerController`는 `GetPawn()`을 통해 현재 조종하는 캐릭터의 참조를 얻고, 그 캐릭터의 `Jump()` 함수를 `IA_Jump` 이벤트에 바인딩할 수 있습니다.

## 3. 아키텍처 심층 분석: 디자인 패턴

> 이러한 계층 구조는 검증된 디자인 패턴들을 기반으로 설계되었습니다.

- **옵저버 패턴 (Observer Pattern):** 시스템의 근간입니다. `Subsystem`이 '발행자(Publisher)'가 되어 이벤트를 브로드캐스트하면, `Component`가 '구독자(Observer)'로서 이벤트를 받아 약속된 함수를 실행합니다. 이 덕분에 입력 처리와 소비 로직이 분리되어 유연성이 극대화됩니다.
- **스트래티지 패턴 (Strategy Pattern):** `UInputTrigger`(Pressed, Held 등)와 `UInputModifier`(Swizzle, Dead Zone 등)가 바로 이 패턴의 예시입니다. '입력을 어떻게 평가하고 가공할 것인가'라는 '전략'을 캡슐화한 객체로, 새로운 입력 조건을 코드 변경 없이 데이터 애셋만으로 추가하고 교체할 수 있게 해줍니다.
- **데이터 지향 설계 (Data-Oriented Design):** `Input Action(IA)`, `Input Mapping Context(IMC)` 등은 모두 `UDataAsset`을 상속받는 데이터 애셋입니다. 코드(어떻게)와 데이터(무엇을)를 분리하여, 프로그래머가 아닌 기획자도 에디터에서 입력 로직을 안전하고 쉽게 수정할 수 있습니다.

## 4. 이벤트의 생명주기와 Trigger의 역할

> `IA_Jump` 블루프린트 노드를 보면 `Started`, `Triggered`, `Completed` 같은 핀들이 있습니다. 이는 `Trigger`와 어떻게 다를까요?

- **이벤트의 생명주기:** `Started`, `Triggered`, `Completed`, `Canceled`, `Ongoing` 등은 모든 입력 액션이 공통으로 가지는 **표준 이벤트 상태**입니다. `Subsystem`이 입력 상태를 분석하여 이 표준 이벤트를 브로드캐스트합니다.
- **`Trigger`의 역할:** `Pressed`, `Released`, `Held` 같은 `UInputTrigger` 객체는 데이터 애셋에 설정하는 **'조건문'**입니다. 이 조건이 충족되었을 때, 여러 표준 이벤트 중 **`Triggered` 이벤트가 발생**하게 됩니다. 즉, `Trigger`는 `Triggered` 이벤트의 발생 시점을 결정합니다.

## 5. C++과 블루프린트의 완벽한 협업

> 그렇다면 이 구조 안에서 C++과 블루프린트는 어떻게 역할을 나눠야 할까요?

#### 바인딩: C++ vs. 블루프린트

- **로직은 C++로:** `Move()`, `Jump()`와 같이 복잡하고 성능이 중요한 핵심 로직은 C++로 작성하고 `UFUNCTION(BlueprintCallable)`로 노출시킵니다.
- **연결은 블루프린트로:** 이 C++ 함수들을 실제 입력 이벤트에 연결하는 작업(`BindAction()`에 해당)은 블루프린트의 이벤트 노드를 사용하는 것이 훨씬 효율적입니다. 디자이너나 기획자가 코드를 건드리지 않고도 입력 방식을 쉽게 수정하고 테스트할 수 있기 때문입니다.

> C++에서 `BindAction()`을 하는 것과 블루프린트 노드를 사용하는 것의 성능 차이는, 중간에 **Thunk 함수**를 거치는 오버헤드로 인해 기술적으로 존재하지만, 입력 이벤트의 호출 빈도를 고려할 때 실질적으로는 **무시할 수 있는 수준**입니다. 따라서 개발 속도와 유연성의 이점을 우선하는 것이 합리적입니다.

#### C++ 코드 작성의 모범 사례

- **`Build.cs` 파일:** `"EnhancedInput"`와 같은 모듈을 `PublicDependencyModuleNames`에 추가하는 것은, 해당 모듈의 헤더와 라이브러리를 프로젝트에서 **사용하기 위한 필수 전제 조건**입니다. 이를 통해 컴파일러와 링커가 필요한 파일을 찾을 수 있게 됩니다.
- **`TObjectPtr` 사용:** `UObject`를 가리키는 포인터 멤버 변수를 선언할 때는, 가비지 컬렉션 시 자동으로 `nullptr`로 설정되어 허상 포인터(Dangling Pointer) 문제를 방지하는 `TObjectPtr`을 사용하는 것이 현대 언리얼 C++의 모범 사례입니다.

## 6. 헤더 관리: `#include` vs. 전방 선언 (실전 예시)
> 헤더 파일의 컴파일 시간을 최적화하려면 `#include`와 전방 선언을 올바르게 구분해야 합니다. 핵심 원칙은 **"해당 타입의 내부 구조(크기, 멤버)를 알아야 하는가?"** 입니다. 다음 예시를 통해 분석해 보겠습니다.

```cpp
// Copyright Epic Games, Inc. All Rights Reserved.

#pragma once

#include "CoreMinimal.h"
#include "GameFramework/Character.h"
#include "EnhancedInputComponent.h"
#include "EnhancedInputSubsystems.h" 
#include "InputActionValue.h"
#include "AdventureCharacter.generated.h"

class UInputMappingContext;
class UInputAction;
class UInputComponent;
```

### **`#include`가 필요한 경우 (내부 구조를 알아야 함):**

- **`"GameFramework/Character.h"`**: `AAdventureCharacter`가 `ACharacter`를 **상속**받기 때문에, 부모의 모든 구조를 알아야 합니다.
- **`"EnhancedInputComponent.h"`, `"EnhancedInputSubsystems.h"`**: `.cpp` 파일에서 `UEnhancedInputComponent`로 캐스팅하고 `BindAction` 같은 **멤버 함수를 호출**하거나, `GetSubsystem`으로 얻은 인스턴스를 **실제로 사용**해야 합니다.
- **`"InputActionValue.h"`**: `Move(const FInputActionValue& Value)` 함수의 본문에서 `Value.Get<FVector2D>()`처럼 **구조체의 멤버에 접근**해야 합니다. 컴파일러는 멤버에 접근하기 위해 구조체의 완전한 정의를 알아야 하므로, 참조(`&`)로 전달하더라도 `#include`가 필요합니다.
  - **심층 분석 (구조체 vs. 포인터)**: `FInputActionValue`가 포인터가 아닌 구조체(값 또는 `const` 참조)로 전달되는 이유는 **성능**과 **안전성** 때문입니다. 입력 값은 이벤트가 발생하는 순간에만 유효한 **임시 데이터**입니다. 이를 힙(Heap)에 메모리를 할당하는 포인터로 만들면 불필요한 오버헤드가 발생하고, 해제(delete) 관리의 복잡성이 생깁니다. 구조체를 스택(Stack)에 직접 생성하고 전달하는 방식은 매우 빠르고, 함수 호출 동안 데이터의 유효성을 보장하며, 메모리 누수 위험이 없습니다. 이는 입력 시스템처럼 매 프레임 호출될 수 있는 성능이 중요한 코드에서 매우 효율적인 설계입니다.

### **전방 선언으로 충분한 경우 (이름만 알면 됨):**

- **`class UInputMappingContext;`, `class UInputAction;`, `class UInputComponent;`**: 이 클래스들은 헤더 파일 내에서 **포인터**로만 참조됩니다.
    - `UInputMappingContext`, `UInputAction`: `TObjectPtr<...>` 형태의 **멤버 변수**로 선언될 가능성이 높습니다.
    - `UInputComponent`: `SetupPlayerInputComponent(UInputComponent* PlayerInputComponent)` 함수의 **파라미터**로 사용됩니다.
- 포인터 변수 자체의 크기는 타입과 무관하게 동일하므로, 컴파일러는 이 시점에서 "이러한 이름의 타입이 존재한다"는 사실만 알면 충분합니다. 따라서 컴파일 시간을 단축시키는 전방 선언이 효율적입니다.

> Enhanced Input System은 데이터(`IA`, `IMC`), 처리(`Subsystem`), 실행(`Component`) 계층을 명확히 분리한 구조입니다. 이 가이드에서 설명된 각 컴포넌트의 역할과 데이터 흐름을 이해하면, C++과 블루프린트를 활용하여 유지보수가 용이하고 확장 가능한 입력 시스템을 설계할 수 있습니다.
