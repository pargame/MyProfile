---
title: "Unreal Engine Reflection System Guide"
author: "Gemini"
---

# Unreal Engine: Reflection System Guide

언리얼 엔진의 리플렉션 시스템은 C++ 코드를 엔진의 다양한 시스템과 연결하는 강력한 접착제 역할을 합니다. 이 시스템 덕분에 프로그래머가 작성한 C++ 클래스, 변수, 함수를 엔진이 '이해'하고, 이를 바탕으로 블루프린트 통합, 에디터 상세 패널, 데이터 직렬화(Serialization), 네트워크 복제(Replication), 가비지 컬렉션(Garbage Collection)과 같은 핵심 기능들을 자동화할 수 있습니다.

리플렉션의 핵심은 `UCLASS`, `UPROPERTY`, `UFUNCTION` 같은 특정 매크로를 사용하는 것입니다. 코드를 컴파일할 때 언리얼 헤더 툴(Unreal Header Tool, UHT)이 이 매크로들을 먼저 파싱하여, 엔진이 런타임에 사용할 수 있는 메타데이터를 생성합니다.

## 1. `UCLASS` - 클래스를 엔진에 등록

`UCLASS()` 매크로는 C++ 클래스를 언리얼의 `UObject` 시스템에 등록합니다. 이 매크로가 선언된 클래스는 언리얼 엔진의 객체로 관리될 수 있습니다.

### 주요 지정자 (Specifiers)

- **`Blueprintable`**: 이 클래스를 부모로 하는 블루프린트 클래스를 생성할 수 있게 합니다. 캐릭터, 아이템 등 게임플레이 로직을 담는 대부분의 클래스에 사용됩니다.
- **`Abstract`**: 이 클래스는 직접 인스턴스화할 수 없으며, 오직 자식 클래스만 생성 가능함을 명시합니다. (예: `AController`)
- **`Config=Game`**: 이 클래스 내의 `Config` 지정자가 붙은 `UPROPERTY`들을 `DefaultGame.ini` 같은 설정 파일에 저장하고 로드할 수 있게 합니다.
- **`Within=OuterClassName`**: 이 클래스의 인스턴스가 `OuterClassName`의 인스턴스 내에서만 존재할 수 있도록 강제합니다. (예: `MovementComponent`는 `Actor` 내에서만 존재)
- **`Meta=(DisplayName = "My Class")`**: 에디터 UI 등에서 표시될 이름을 지정합니다.

```cpp
// AMyGameMode.h
UCLASS(Config=Game, Meta=(DisplayName="My Custom Game Mode"))
class AMyGameMode : public AGameModeBase
{
    GENERATED_BODY()
    // ...
};
```

## 2. `UPROPERTY` - 변수를 엔진에 노출

`UPROPERTY()` 매크로는 멤버 변수를 리플렉션 시스템에 등록하여, 다양한 엔진 기능의 대상으로 만듭니다.

### 주요 지정자 (Specifiers)

#### 에디터 노출 및 편집
- **`VisibleAnywhere`**: 모든 상세 패널에서 보이지만 편집은 불가능합니다. (런타임에 변하는 상태 표시에 유용)
- **`EditAnywhere`**: 모든 상세 패널에서 보이고 편집도 가능합니다. (가장 일반적으로 사용되는 설정값)
- **`EditDefaultsOnly`**: 블루프린트 클래스 기본값 창에서만 편집 가능하고, 레벨에 배치된 인스턴스에서는 수정할 수 없습니다.
- **`Category="CategoryName"`**: 변수를 상세 패널의 특정 카테고리로 묶어 가독성을 높입니다.

#### 블루프린트 접근
- **`BlueprintReadOnly`**: 블루프린트 그래프에서 변수 값을 읽을 수만 있습니다. (Get 노드만 생성)
- **`BlueprintReadWrite`**: 블루프린트 그래프에서 변수 값을 읽고 쓸 수 있습니다. (Get/Set 노드 모두 생성)

#### 데이터 관리
- **`Transient`**: 이 변수는 디스크에 저장되지 않습니다. 런타임에만 임시로 사용되는 값에 적합합니다.
- **`SaveGame`**: 이 변수를 저장/로드 시스템(`USaveGame` 객체)에 포함시켜 플레이어의 진행 상황을 저장할 수 있게 합니다.

#### 네트워크
- **`Replicated`**: 서버의 이 변수 값이 변경되면, 모든 클라이언트에게 자동으로 복제(전송)됩니다.
- **`ReplicatedUsing=OnRep_FunctionName`**: 변수가 클라이언트에 복제될 때마다, 지정된 `OnRep_` 함수가 클라이언트에서 자동으로 호출됩니다. (값 변경에 따른 시각적 효과 처리에 유용)

#### 메타데이터 (Meta)
- **`Meta=(ClampMin="0.0", ClampMax="100.0")`**: 숫자 변수의 편집 범위를 제한합니다.
- **`Meta=(EditCondition="bSomeBoolean")`**: 특정 `bool` 변수가 `true`일 때만 이 속성을 편집할 수 있도록 활성화/비활성화합니다.
- **`Meta=(AllowedClasses="ParticleSystem,StaticMesh")`**: `TSoftObjectPtr` 같은 포인터 변수에 할당할 수 있는 클래스의 종류를 제한합니다.

```cpp
// AMyCharacter.h
UCLASS()
class AMyCharacter : public ACharacter
{
    GENERATED_BODY()

public:
    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category="Config", Meta=(ClampMin="1.0"))
    float WalkSpeed = 600.0f;

    UPROPERTY(VisibleInstanceOnly, BlueprintReadOnly, Category="State")
    bool bIsJumping = false;

    UPROPERTY(ReplicatedUsing=OnRep_Health, BlueprintReadOnly, Category="State", SaveGame)
    float Health = 100.0f;

    UFUNCTION()
    void OnRep_Health(); // Health가 복제될 때 호출될 함수
};
```

## 3. `UFUNCTION` - 함수를 엔진에 연결

`UFUNCTION()` 매크로는 멤버 함수를 리플렉션 시스템에 등록하여, 블루프린트, 네트워크, 델리게이트 등과 상호작용할 수 있게 합니다.

### 주요 지정자 (Specifiers)

#### 블루프린트 연동
- **`BlueprintCallable`**: 블루프린트에서 실행 핀으로 호출할 수 있는 함수로 만듭니다. 객체의 상태를 변경하는 대부분의 함수에 사용됩니다.
- **`BlueprintPure`**: 실행 핀이 없는 순수 함수로 만듭니다. 객체의 상태를 변경하지 않고 단순히 값을 계산하여 반환하는 함수에 적합합니다. (예: `GetHealthPercent()`)
- **`BlueprintImplementableEvent`**: C++에서는 선언만 하고, 실제 구현은 블루프린트에서 하도록 맡깁니다. C++ 코드는 이 함수를 호출할 수 있지만, 블루프린트에서 구현하지 않으면 아무 일도 일어나지 않습니다. (주로 시각적 효과 처리에 사용)
- **`BlueprintNativeEvent`**: `BlueprintImplementableEvent`와 유사하지만, C++에 기본 구현을 가질 수 있습니다. C++에서는 `_Implementation` 접미사가 붙은 함수에 기본 로직을 구현하며, 블루프린트에서 이를 재정의(Override)하거나 확장할 수 있습니다.

#### 네트워크 통신 (RPC - Remote Procedure Call)
- **`Server`**: 이 함수는 클라이언트에서 호출되지만, 실제 실행은 서버에서 이루어집니다. (클라이언트가 서버에 무언가를 요청할 때 사용)
- **`Client`**: 이 함수는 서버에서 호출되지만, 실제 실행은 해당 클라이언트에서만 이루어집니다. (서버가 특정 클라이언트에게 무언가를 지시할 때 사용)
- **`NetMulticast`**: 이 함수는 서버에서 호출되면, 서버 자신을 포함한 모든 클라이언트에서 실행됩니다. (모든 플레이어에게 동시에 보여야 하는 효과에 사용)
- **`Reliable` / `Unreliable`**: RPC 호출이 반드시 전송되어야 하는지(`Reliable`), 유실될 수 있는지(`Unreliable`)를 결정합니다. 중요한 이벤트는 `Reliable`, 빈번하지만 덜 중요한 데이터는 `Unreliable`을 사용합니다.

#### 에디터 기능
- **`CallInEditor`**: 에디터 상세 패널에 이 함수를 실행할 수 있는 버튼을 만듭니다. 디버깅이나 개발용 툴 제작에 매우 유용합니다.

```cpp
// AMyCharacter.h
UCLASS()
class AMyCharacter : public ACharacter
{
    GENERATED_BODY()

public:
    // 서버에서 실행될 공격 요청 함수
    UFUNCTION(Server, Reliable)
    void Server_RequestAttack();

    // 모든 클라이언트에게 죽음 이펙트를 보여줄 함수
    UFUNCTION(NetMulticast, Unreliable)
    void Multicast_PlayDeathFX();

    // 블루프린트에서 구현할 이벤트
    UFUNCTION(BlueprintImplementableEvent, Category="Events")
    void OnDamaged();

    // 에디터에서 상태를 리셋하는 디버그 함수
    UFUNCTION(CallInEditor, Category="Debug")
    void ResetState();
};
```

이처럼 리플렉션 시스템은 단순한 C++ 코드를 언리얼 엔진의 강력하고 다양한 기능들과 유기적으로 연결하는 핵심적인 다리 역할을 합니다. 이 시스템을 잘 이해하고 활용하는 것은 언리얼 엔진 개발의 깊이를 더하는 중요한 열쇠입니다.