---
title: "Unreal Engine C++ and Blueprint Workflow Guide"
author: "Gemini"
---

# Unreal Engine: C++ and Blueprint Workflow Guide

언리얼 엔진의 가장 큰 강점은 C++의 강력한 성능과 블루프린트 비주얼 스크립팅의 빠른 프로토타이핑 능력을 결합할 수 있다는 점입니다. 이 둘의 관계를 이해하고 올바른 워크플로우를 정립하는 것은 대규모 프로젝트의 생산성과 안정성을 위해 매우 중요합니다.

이 가이드에서는 C++과 블루프린트의 상호작용 방법을 넘어, **'무엇을 C++로 만들고, 무엇을 블루프린트로 구현할 것인가'** 에 대한 실용적인 전략과 모범 사례를 제시합니다.

## 1. C++과 블루프린트, 역할 분담 전략

성공적인 협업의 핵심은 각 언어의 강점을 이해하고 역할을 명확히 나누는 것입니다.

### C++로 구현해야 하는 것 (The Foundation)

- **핵심 게임플레이 프레임워크**: `GameMode`, `PlayerController`, `PlayerState`, `Character` 등 게임의 기본 구조와 규칙. 이들은 게임의 뼈대이며, 안정성과 성능이 가장 중요합니다.
- **성능이 중요한 로직**: 복잡한 수학 계산, 대규모 데이터 처리, 매 프레임 수만 번 호출될 수 있는 알고리즘 등. (예: 커스텀 물리 시뮬레이션, 대규모 AI 군집 로직)
- **데이터 구조 정의**: 게임에서 사용될 핵심 데이터 타입(struct, enum)과 데이터 에셋. C++로 정의된 구조는 메모리 관리가 효율적이고, 블루프린트에서 안정적으로 사용할 수 있습니다.
- **로우레벨 시스템 접근**: 엔진의 코어 기능, 파일 입출력, 외부 라이브러리 연동 등 블루프린트에서 직접 접근하기 어려운 기능들.

### 블루프린트로 구현해야 하는 것 (The Details & Iteration)

- **시각적 요소 및 이펙트**: 파티클 시스템(Niagara) 재생, 사운드 이펙트(MetaSound) 출력, UI 애니메이션 등 아티스트와 디자이너가 직접 보고 수정해야 하는 모든 것.
- **레벨 디자인 스크립팅**: 특정 레벨에서만 발생하는 이벤트. (예: 문 열기, 함정 발동, 시네마틱 시퀀스 트리거)
- **빠른 프로토타이핑**: 새로운 게임 메카닉의 아이디어를 빠르게 테스트하고 싶을 때. C++로 구현하기 전에 블루프린트로 먼저 만들어보고, 검증이 끝나면 C++로 옮기는 것이 효율적입니다.
- **데이터 조정**: C++로 만들어진 기반 클래스를 상속받아, 세부적인 변수(체력, 공격력, 속도 등)를 조정하고 컴포넌트를 조합하여 다양한 종류의 캐릭터나 아이템을 생성.

## 2. 상호작용의 핵심: U-매크로

C++로 만든 기능을 블루프린트에서 사용하거나, 그 반대를 가능하게 하는 것이 바로 `UPROPERTY`, `UFUNCTION` 같은 U-매크로입니다.

### C++ → 블루프린트: 기능 노출

C++ 프로그래머가 만든 기반을 디자이너가 블루프린트에서 쉽게 사용할 수 있도록 'API'를 제공하는 과정입니다.

**변수 노출 (`UPROPERTY`)**

- `UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Config")`: 블루프린트 에디터와 그래프 양쪽에서 모두 수정 가능한 변수를 만듭니다. 가장 일반적으로 사용됩니다.
- `UPROPERTY(VisibleAnywhere, BlueprintReadOnly, Category = "State")`: C++에서 계산된 결과값처럼, 블루프린트에서는 읽기만 가능하도록 하여 데이터의 안정성을 높입니다.

**함수 노출 (`UFUNCTION`)**

- `UFUNCTION(BlueprintCallable, Category = "Action")`: 블루프린트에서 실행 핀으로 호출할 수 있는 일반적인 함수입니다. (예: `Attack()`, `UseItem()`)
- `UFUNCTION(BlueprintPure, Category = "Getter")`: 입력 실행 핀이 없는 순수 함수로, 주로 상태를 변경하지 않는 정보 조회용 함수에 사용됩니다. (예: `IsAlive()`, `GetHealthPercent()`)

```cpp
// AMyCharacter.h - C++ 프로그래머가 설계한 기반 클래스
UCLASS()
class AMyCharacter : public ACharacter
{
    GENERATED_BODY()

protected:
    UPROPERTY(EditDefaultsOnly, BlueprintReadOnly, Category = "Config")
    float MaxHealth = 100.0f;

    UPROPERTY(VisibleAnywhere, BlueprintReadOnly, Category = "State")
    float CurrentHealth;

public:
    UFUNCTION(BlueprintCallable, Category = "Action")
    void TakeDamage(float DamageAmount);

    UFUNCTION(BlueprintPure, Category = "State")
    float GetHealthPercent() const;
};
```

### 블루프린트 → C++: 이벤트 구현

C++에서 특정 이벤트가 발생했음을 알리면, 블루프린트에서 그에 대한 시각적/청각적 반응을 구현하도록 하는 방식입니다.

- **`UFUNCTION(BlueprintImplementableEvent)`**: C++에서는 선언만 하고, 구현은 전적으로 블루프린트에 맡깁니다. C++ 코드는 이 함수를 호출하기만 합니다. (예: `OnDeath` 이벤트가 호출되면 블루프린트에서 죽음 애니메이션과 파티클을 재생)

- **`UFUNCTION(BlueprintNativeEvent)`**: C++에 기본 구현을 제공하면서, 블루프린트에서 선택적으로 재정의(Override)할 수 있게 합니다. C++에서는 `_Implementation` 접미사가 붙은 함수에 기본 로직을 작성합니다. 이는 안정성을 확보하면서도 유연성을 제공하는 매우 강력한 기능입니다.

```cpp
// AMyCharacter.h
UCLASS()
class AMyCharacter : public ACharacter
{
    GENERATED_BODY()

public:
    // C++에서 호출, 구현은 블루프린트에서
    UFUNCTION(BlueprintImplementableEvent, Category = "Events")
    void OnHealthChanged(float NewHealth, float Delta);

    // C++에 기본 구현이 있고, 블루프린트에서 확장 가능
    UFUNCTION(BlueprintNativeEvent, Category = "Events")
    void OnDeath();
    virtual void OnDeath_Implementation();

    void TakeDamage(float DamageAmount)
    {
        CurrentHealth -= DamageAmount;
        OnHealthChanged(CurrentHealth, -DamageAmount); // 블루프린트 이벤트 호출

        if (CurrentHealth <= 0)
        {
            OnDeath(); // 블루프린트 또는 C++ 구현 호출
        }
    }
};

// AMyCharacter.cpp
void AMyCharacter::OnDeath_Implementation()
{
    // C++ 기본 구현: 액터를 파괴하고, 게임 모드에 알림
    UE_LOG(LogTemp, Log, TEXT("%s has died."), *GetName());
    Destroy();
}
```

## 3. 모범적인 워크플로우

1.  **설계 (Architecture)**: 프로그래머가 C++로 게임의 핵심 구조와 데이터 타입을 정의합니다.
2.  **기반 클래스 구현 (Base Classes)**: 프로그래머가 `AMyCharacter`, `AMyItem` 등 핵심 기능을 가진 C++ 기반 클래스를 만듭니다. 이때 `UPROPERTY`와 `UFUNCTION`을 사용해 블루프린트 API를 신중하게 설계합니다.
3.  **블루프린트 파생 (Derivation)**: 디자이너와 아티스트는 프로그래머가 만든 C++ 클래스를 부모로 하는 블루프린트 클래스(`BP_PlayerCharacter`, `BP_HealthPotion` 등)를 생성합니다.
4.  **데이터와 에셋 할당 (Data & Assets)**: 디자이너는 블루프린트 에디터에서 스켈레탈 메시, 스태틱 메시, 파티클, 사운드 등 필요한 에셋을 할당하고, `EditAnywhere`로 노출된 프로퍼티 값들을 조정합니다.
5.  **이벤트 구현 (Event Implementation)**: 디자이너는 `OnDeath`, `OnHealthChanged` 등 `BlueprintImplementableEvent`나 `BlueprintNativeEvent`로 선언된 이벤트에 대한 시각적/청각적 로직을 블루프린트 그래프에 구현합니다.
6.  **테스트 및 반복 (Iteration)**: 팀 전체가 게임을 테스트하며 빠르게 수정합니다. 로직 변경은 C++에서, 밸런싱이나 시각적 피드백 수정은 블루프린트에서 이루어지므로 각자의 작업이 분리되어 효율적입니다.

이러한 워크플로우는 프로그래머가 시스템의 안정성과 성능을 보장하고, 디자이너와 아티스트가 창의적인 작업을 자유롭게 수행할 수 있는 이상적인 환경을 제공합니다.