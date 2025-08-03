---
In: UnrealEngine
title: "Unreal Engine Player Input and UI Guide"
author: "Gemini"
---

# Unreal Engine: Player Input and UI Guide

플레이어의 경험은 입력(Input)과 피드백(UI)이라는 두 가지 핵심 요소에 의해 완성됩니다. 플레이어가 버튼을 눌렀을 때 캐릭터가 즉각적으로 반응하고, 그 결과가 화면의 UI에 명확하게 표시될 때 비로소 직관적이고 몰입감 있는 게임플레이가 만들어집니다.

이 가이드에서는 언리얼 엔진 5의 **향상된 입력(Enhanced Input)** 시스템으로 입력을 처리하고, 그 결과를 **UMG(Unreal Motion Graphics)**를 통해 사용자에게 시각적으로 피드백하는 전체 과정을 통합적으로 설명합니다.

## 1부: 입력 처리 - 향상된 입력 (Enhanced Input)

향상된 입력 시스템은 플레이어의 물리적 입력을 게임의 논리적 동작과 분리하여 유연하고 확장 가능한 입력 체계를 제공합니다.

### 핵심 구성 요소

1.  **입력 액션 (Input Action - IA)**: `점프`, `이동`, `공격` 등 게임 내의 논리적인 동작 그 자체를 의미하는 애셋입니다.
2.  **입력 매핑 컨텍스트 (Input Mapping Context - IMC)**: 특정 키(예: `W` 키)를 특정 입력 액션(예: `IA_MoveForward`)에 연결하는 규칙의 집합입니다. 상황(예: 걸을 때, 운전할 때)에 따라 다른 IMC를 적용할 수 있습니다.
3.  **모디파이어 & 트리거 (Modifiers & Triggers)**: 입력의 원시 값을 가공하거나(`Modifier`, 예: 축 반전), 액션이 발생하는 조건을 정의(`Trigger`, 예: 짧게 누르기, 길게 누르기)합니다.

### C++ 구현 단계

#### 1. 헤더 파일(.h) 설정

캐릭터 헤더 파일에 필요한 입력 애셋 변수와 입력 처리 함수를 선언합니다.

```cpp
// MyCharacter.h
#pragma once

#include "CoreMinimal.h"
#include "GameFramework/Character.h"
#include "MyCharacter.generated.h"

class UInputMappingContext;
class UInputAction;
struct FInputActionValue;

UCLASS()
class AMyCharacter : public ACharacter
{
    GENERATED_BODY()

protected:
    // 입력 애셋
    UPROPERTY(EditDefaultsOnly, BlueprintReadOnly, Category = Input)
    TObjectPtr<UInputMappingContext> DefaultMappingContext;

    UPROPERTY(EditDefaultsOnly, BlueprintReadOnly, Category = Input)
    TObjectPtr<UInputAction> MoveAction;

    UPROPERTY(EditDefaultsOnly, BlueprintReadOnly, Category = Input)
    TObjectPtr<UInputAction> JumpAction;

    // 입력 처리 함수
    void Move(const FInputActionValue& Value);

public:
    virtual void SetupPlayerInputComponent(class UInputComponent* PlayerInputComponent) override;
    virtual void BeginPlay() override;
};
```

#### 2. 소스 파일(.cpp) 설정

`BeginPlay`에서 매핑 컨텍스트를 추가하고, `SetupPlayerInputComponent`에서 입력 액션과 함수를 바인딩합니다.

```cpp
// MyCharacter.cpp
#include "MyCharacter.h"
#include "EnhancedInputComponent.h"
#include "EnhancedInputSubsystems.h"
#include "Components/InputComponent.h"

void AMyCharacter::BeginPlay()
{
    Super::BeginPlay();
    if (APlayerController* PlayerController = Cast<APlayerController>(Controller))
    {
        if (UEnhancedInputLocalPlayerSubsystem* Subsystem = ULocalPlayer::GetSubsystem<UEnhancedInputLocalPlayerSubsystem>(PlayerController->GetLocalPlayer()))
        {
            Subsystem->AddMappingContext(DefaultMappingContext, 0);
        }
    }
}

void AMyCharacter::SetupPlayerInputComponent(UInputComponent* PlayerInputComponent)
{
    Super::SetupPlayerInputComponent(PlayerInputComponent);
    if (UEnhancedInputComponent* EnhancedInputComponent = Cast<UEnhancedInputComponent>(PlayerInputComponent))
    {
        EnhancedInputComponent->BindAction(MoveAction, ETriggerEvent::Triggered, this, &AMyCharacter::Move);
        EnhancedInputComponent->BindAction(JumpAction, ETriggerEvent::Started, this, &ACharacter::Jump);
    }
}

void AMyCharacter::Move(const FInputActionValue& Value)
{
    const FVector2D MovementVector = Value.Get<FVector2D>();
    const FRotator Rotation = Controller->GetControlRotation();
    const FVector ForwardDirection = FRotationMatrix(FRotator(0, Rotation.Yaw, 0)).GetUnitAxis(EAxis::X);
    const FVector RightDirection = FRotationMatrix(FRotator(0, Rotation.Yaw, 0)).GetUnitAxis(EAxis::Y);
    AddMovementInput(ForwardDirection, MovementVector.Y);
    AddMovementInput(RightDirection, MovementVector.X);
}
```

## 2부: 시각적 피드백 - UMG UI

플레이어의 행동 결과를 보여주는 가장 좋은 방법은 UI입니다. UMG는 게임 내 HUD, 메뉴 등 모든 UI를 제작하는 시스템입니다.

### 핵심 개념

1.  **위젯 블루프린트 (Widget Blueprint)**: UI의 시각적 레이아웃(디자이너)과 기능적 로직(그래프)을 모두 담고 있는 애셋입니다.
2.  **주요 위젯**: `Button`, `Text`, `Image`, `ProgressBar` 등 UI를 구성하는 기본 요소들입니다.
3.  **앵커 (Anchors)**: 다양한 화면 해상도에서 UI 요소의 위치를 일관되게 유지시켜주는 기준점입니다.

### C++과 UMG의 상호작용

효율적인 워크플로우는 C++에서 UI의 생성/소멸과 데이터 흐름을 제어하고, 위젯 블루프린트에서는 디자인과 세부적인 상호작용을 처리하는 것입니다.

#### 1. C++에서 위젯 생성 및 표시

일반적으로 `PlayerController`나 `Character`의 `BeginPlay` 시점에서 UI를 생성하고 화면에 추가합니다.

```cpp
// MyPlayerController.h
class UUserWidget;

UCLASS()
class AMyPlayerController : public APlayerController
{
    GENERATED_BODY()

protected:
    virtual void BeginPlay() override;

private:
    UPROPERTY(EditDefaultsOnly, Category = "UI")
    TSubclassOf<UUserWidget> HUDWidgetClass;

    UPROPERTY()
    TObjectPtr<UUserWidget> HUDWidgetInstance;
};

// MyPlayerController.cpp
#include "Blueprint/UserWidget.h"

void AMyPlayerController::BeginPlay()
{
    Super::BeginPlay();
    if (HUDWidgetClass)
    {
        HUDWidgetInstance = CreateWidget<UUserWidget>(this, HUDWidgetClass);
        if (HUDWidgetInstance)
        {
            HUDWidgetInstance->AddToViewport();
        }
    }
}
```

#### 2. C++ 데이터와 UI 바인딩 (가장 중요)

게임 데이터(예: 캐릭터 체력)를 UI에 실시간으로 반영하는 가장 효율적인 방법은 **프로퍼티 바인딩(Property Binding)**입니다.

**Step 1: C++에서 데이터 제공 함수 생성**

UI가 필요로 하는 데이터를 반환하는 `BlueprintPure` 함수를 `PlayerState`나 `Character` 같은 적절한 클래스에 만듭니다.

```cpp
// MyPlayerState.h
UCLASS()
class AMyPlayerState : public APlayerState
{
    GENERATED_BODY()

public:
    // 현재 체력 비율을 0과 1 사이의 값으로 반환
    UFUNCTION(BlueprintPure, Category = "Stats")
    float GetHealthPercent() const;

    // 실제 데이터는 PlayerState가 소유
    float CurrentHealth = 80.0f;
    float MaxHealth = 100.0f;
};

// MyPlayerState.cpp
float AMyPlayerState::GetHealthPercent() const
{
    return MaxHealth > 0.f ? CurrentHealth / MaxHealth : 0.f;
}
```

**Step 2: 위젯 블루프린트에서 바인딩**

1.  HUD 위젯 블루프린트를 열고 `ProgressBar`를 추가합니다.
2.  `ProgressBar`의 `Details` 패널에서 `Percent` 속성 옆의 `Bind` 드롭다운을 클릭하고 `Create Binding`을 선택합니다.
3.  새로 열린 그래프에서, `Get Owning Player State` 노드를 가져와 `MyPlayerState`로 캐스팅한 후, `Get Health Percent` 함수를 호출하여 그 결과를 `Return Value`에 연결합니다.

![Property Binding](https://docs.unrealengine.com/5.3/Images/interactive-experiences-in-unreal-engine/umg-ui-designer-for-unreal-engine/UMG_QuickStart_4_BoundResult.webp)

이제 C++ 코드에서 `CurrentHealth` 값만 변경하면, UI의 체력 바는 매 프레임 자동으로 `GetHealthPercent`를 호출하여 스스로 업데이트됩니다. 이는 이벤트 기반으로 수동 업데이트하는 것보다 훨씬 깔끔하고 효율적인 구조입니다.

## 3부: 입력과 UI의 연결

이제 입력과 UI를 연결해 봅시다. 예를 들어, `F` 키를 누르면 상호작용 UI가 뜨고, 다시 누르면 사라지는 기능을 구현해 보겠습니다.

1.  **입력 설정**: `IA_Interact`라는 입력 액션을 만들고, `IMC_Default`에 `F` 키를 `Trigger`가 `Pressed`일 때 매핑합니다.
2.  **C++ 코드 작성**: 캐릭터 클래스에 `IA_Interact`를 바인딩하고, UI의 보이기/숨기기 상태를 토글하는 함수를 작성합니다.

```cpp
// In MyCharacter.h
UPROPERTY(EditDefaultsOnly, Category = Input) TObjectPtr<UInputAction> InteractAction;
void Interact();

// In MyCharacter.cpp, SetupPlayerInputComponent
EnhancedInputComponent->BindAction(InteractAction, ETriggerEvent::Started, this, &AMyCharacter::Interact);

// In MyCharacter.cpp
void AMyCharacter::Interact()
{
    // 실제로는 인터페이스나 다른 방법을 통해 UI를 가져와야 함
    // if (MyHUD.IsValid())
    // {
    //     MyHUD->ToggleInteractPrompt();
    // }
    UE_LOG(LogTemp, Log, TEXT("Interact key pressed. Toggling UI prompt..."));
}
```
3.  **UMG 구현**: HUD 위젯 블루프린트에 상호작용 프롬프트(예: "[F] to Interact" 텍스트)를 추가하고, `ToggleInteractPrompt` 함수(커스텀 이벤트)를 만들어 이 위젯의 `Visibility`를 `Visible`과 `Collapsed` 사이에서 전환하는 로직을 구현합니다.

이처럼 입력, 게임 로직, UI 피드백을 명확히 분리하고 각각의 시스템을 통해 연결하면, 복잡한 상호작용도 체계적으로 관리하고 확장할 수 있습니다.
