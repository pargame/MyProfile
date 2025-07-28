---
title: "언리얼 엔진: 리플렉션 시스템 이해하기"
---

언리얼 엔진(Unreal Engine)의 리플렉션 시스템은 엔진이 런타임에 C++ 코드의 구조와 속성을 이해하고 조작할 수 있도록 하는 강력한 메커니즘입니다. 이를 통해 가비지 컬렉션, 시리얼라이제이션, 블루프린트 통합, 에디터 상세 패널 표시, 네트워크 복제 등 다양한 핵심 기능이 가능해집니다.

리플렉션 시스템은 주로 `UObject` 시스템과 함께 작동하며, C++ 클래스, 속성(변수), 함수에 특정 매크로(`UCLASS`, `UPROPERTY`, `UFUNCTION` 등)를 사용하여 엔진에 해당 요소들을 "리플렉션 가능"하도록 등록합니다. 이 매크로들은 컴파일 시 언리얼 헤더 툴(Unreal Header Tool, UHT)에 의해 파싱되어 필요한 메타데이터를 생성합니다.

### UClass

`UCLASS` 매크로는 C++ 클래스를 언리얼 엔진의 리플렉션 시스템에 등록하여 `UObject`의 기능을 사용할 수 있도록 합니다. `UCLASS`로 선언된 클래스는 가비지 컬렉션의 대상이 되며, 블루프린트에서 접근 가능하거나 에디터에서 인스턴스를 생성할 수 있게 됩니다.

**주요 인자 (Specifiers):**

`UCLASS` 매크로 뒤에 괄호 안에 쉼표로 구분하여 인자들을 지정할 수 있습니다.

*   **`Blueprintable`**: 이 클래스를 기반으로 블루프린트 클래스를 생성할 수 있도록 허용합니다.
*   **`NotBlueprintable`**: 이 클래스를 기반으로 블루프린트 클래스를 생성하는 것을 금지합니다.
*   **`Abstract`**: 이 클래스는 추상 클래스이며, 직접 인스턴스화될 수 없고 파생 클래스만 인스턴스화될 수 있습니다.
*   **`Config=CategoryName`**: 이 클래스의 `UPROPERTY` 중 `Config` 또는 `GlobalConfig`로 지정된 속성들이 `CategoryName.ini` 파일에서 로드/저장될 수 있도록 합니다.
*   **`DefaultToInstanced`**: 이 클래스의 인스턴스가 다른 `UObject`에 `UPROPERTY`로 포함될 때, 기본적으로 인스턴스화된 서브오브젝트로 처리되도록 합니다.
*   **`EditInlineNew`**: 에디터에서 이 클래스의 인스턴스를 생성하고 편집할 수 있도록 허용합니다. (주로 컴포넌트나 데이터 에셋에 사용)
*   **`HideCategories=(Category1, Category2)`**: 에디터의 상세 패널에서 지정된 카테고리를 숨깁니다.
*   **`ShowCategories=(Category1, Category2)`**: `HideCategories`와 함께 사용되어 특정 카테고리만 표시하고 나머지는 숨깁니다.
*   **`Meta=(key="value")`**: 추가적인 메타데이터를 키-값 쌍으로 지정합니다. 이는 UHT에 의해 처리되거나 에디터에서 특정 동작을 제어하는 데 사용될 수 있습니다.
    *   예: `Meta=(DisplayName="My Custom Class")`
*   **`Within=OuterClassName`**: 이 클래스의 인스턴스가 `OuterClassName`의 인스턴스 내에서만 생성될 수 있도록 제한합니다.

**예시:**

```cpp
UCLASS(Blueprintable, Config=Game, Meta=(ToolTip="This is a custom game class."))
class MYPROJECT_API AMyGameClass : public AActor
{
    GENERATED_BODY()

public:
    // ...
};
```

### UPROPERTY

`UPROPERTY` 매크로는 `UObject` 클래스 내의 멤버 변수를 언리얼 엔진의 리플렉션 시스템에 등록합니다. 이를 통해 변수가 시리얼라이제이션, 가비지 컬렉션, 블루프린트 접근, 에디터 편집 등 다양한 엔진 기능의 대상이 됩니다.

**주요 인자 (Specifiers):**

`UPROPERTY` 매크로 뒤에 괄호 안에 쉼표로 구분하여 인자들을 지정할 수 있습니다.

*   **접근 지정자 (Access Specifiers):**
    *   **`VisibleAnywhere`**: 에디터의 상세 패널에서 어디서든 이 변수를 볼 수 있지만, 편집할 수는 없습니다.
    *   **`VisibleDefaultsOnly`**: 에디터의 상세 패널에서 이 변수를 기본값(Default)으로만 볼 수 있습니다.
    *   **`VisibleInstanceOnly`**: 에디터의 상세 패널에서 인스턴스에서만 이 변수를 볼 수 있습니다.
    *   **`EditAnywhere`**: 에디터의 상세 패널에서 어디서든 이 변수를 편집할 수 있습니다.
    *   **`EditDefaultsOnly`**: 에디터의 상세 패널에서 이 변수를 기본값(Default)으로만 편집할 수 있습니다.
    *   **`EditInstanceOnly`**: 에디터의 상세 패널에서 인스턴스에서만 이 변수를 편집할 수 있습니다.
*   **카테고리 (Category):**
    *   **`Category="CategoryName"`**: 에디터의 상세 패널에서 이 변수를 지정된 카테고리 아래에 표시합니다.
*   **시리얼라이제이션 (Serialization):**
    *   **`SaveGame`**: 이 변수가 세이브 게임 파일에 저장되고 로드될 수 있도록 합니다.
    *   **`Transient`**: 이 변수가 시리얼라이즈되지 않도록 합니다 (세이브 파일에 저장되지 않음). 런타임에만 유효한 데이터에 사용됩니다.
    *   **`Config`**: 이 변수가 `.ini` 파일에서 로드/저장될 수 있도록 합니다. (클래스에 `Config` 인자가 있어야 함)
*   **블루프린트 (Blueprint):**
    *   **`BlueprintReadOnly`**: 블루프린트에서 이 변수를 읽을 수만 있습니다.
    *   **`BlueprintReadWrite`**: 블루프린트에서 이 변수를 읽고 쓸 수 있습니다.
*   **네트워크 (Networking):**
    *   **`Replicated`**: 이 변수가 네트워크를 통해 클라이언트에 복제되도록 합니다.
    *   **`ReplicatedUsing=FunctionName`**: 이 변수가 복제될 때마다 지정된 함수가 호출되도록 합니다.
*   **가비지 컬렉션 (Garbage Collection):**
    *   **`AssetRegistrySearchable`**: 이 변수가 에셋 레지스트리에서 검색 가능하도록 합니다. (주로 `FSoftObjectPath`나 `TSoftObjectPtr`에 사용)
*   **UI/에디터 (UI/Editor):**
    *   **`DisplayName="Custom Name"`**: 에디터에서 이 변수의 표시 이름을 변경합니다.
    *   **`ToolTip="Help text"`**: 에디터에서 이 변수에 마우스를 올렸을 때 표시되는 툴팁을 설정합니다.
    *   **`Meta=(key="value")`**: 추가적인 메타데이터를 지정합니다.
        *   예: `Meta=(ClampMin="0.0", ClampMax="100.0")` (float/int 범위 제한)
        *   예: `Meta=(UIMin="0.0", UIMax="1.0")` (슬라이더 UI 범위 제한)
        *   예: `Meta=(EditCondition="bSomeBool")` (다른 bool 변수에 따라 편집 가능 여부 제어)
        *   예: `Meta=(MakeEditWidget)` (에디터에서 3D 위젯으로 변수 조작 가능)
        *   예: `Meta=(ArrayClamp="ArrayName")` (배열 인덱스 제한)
        *   예: `Meta=(AllowedClasses="Actor,Pawn")` (오브젝트 레퍼런스에 허용되는 클래스 제한)

**예시:**

```cpp
UCLASS()
class MYPROJECT_API AMyActor : public AActor
{
    GENERATED_BODY()

public:
    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Movement", Meta = (ClampMin = "0.0", ClampMax = "1000.0", ToolTip = "Speed of the actor."))
    float MovementSpeed;

    UPROPERTY(VisibleAnywhere, Category = "Components")
    class UStaticMeshComponent* MeshComponent;

    UPROPERTY(EditDefaultsOnly, SaveGame, Meta = (DisplayName = "Player Name"))
    FString PlayerName;

    UPROPERTY(ReplicatedUsing = OnRep_Health, BlueprintReadOnly)
    float Health;

private:
    UFUNCTION()
    void OnRep_Health();
};
```

### UFUNCTION

`UFUNCTION` 매크로는 `UObject` 클래스 내의 멤버 함수를 언리얼 엔진의 리플렉션 시스템에 등록합니다. 이를 통해 함수가 블루프린트에서 호출 가능하거나, 네트워크 복제, 타이머 시스템 등 다양한 엔진 기능의 대상이 됩니다.

**주요 인자 (Specifiers):**

`UFUNCTION` 매크로 뒤에 괄호 안에 쉼표로 구분하여 인자들을 지정할 수 있습니다.

*   **블루프린트 (Blueprint):**
    *   **`BlueprintCallable`**: 블루프린트에서 이 함수를 호출할 수 있습니다.
    *   **`BlueprintPure`**: 블루프린트에서 이 함수를 호출할 수 있으며, 실행 핀이 없고 항상 동일한 입력을 받으면 동일한 출력을 반환하는 순수 함수임을 나타냅니다. (상태를 변경하지 않음)
    *   **`BlueprintImplementableEvent`**: C++에서 선언하고 블루프린트에서 구현할 수 있는 이벤트 함수입니다. C++에서는 구현할 필요가 없습니다.
    *   **`BlueprintNativeEvent`**: C++에서 기본 구현을 제공하고 블루프린트에서 오버라이드할 수 있는 이벤트 함수입니다. C++ 구현은 `_Implementation` 접미사를 붙여야 합니다.
*   **네트워크 (Networking):**
    *   **`Server`**: 이 함수는 클라이언트에서 호출될 수 있지만, 실제 실행은 서버에서만 이루어집니다.
    *   **`Client`**: 이 함수는 서버에서 호출될 수 있지만, 실제 실행은 클라이언트에서만 이루어집니다.
    *   **`NetMulticast`**: 이 함수는 서버에서 호출되면 모든 클라이언트와 서버 자체에서 실행됩니다.
    *   **`Reliable`**: 네트워크 호출이 반드시 전달되도록 보장합니다. (대역폭 소모가 큼)
    *   **`Unreliable`**: 네트워크 호출이 전달되지 않을 수도 있습니다. (대역폭 효율적, 주로 빈번한 업데이트에 사용)
*   **에디터 (Editor):**
    *   **`CallInEditor`**: 에디터에서 이 함수를 호출할 수 있는 버튼을 상세 패널에 생성합니다. (디버깅이나 툴링에 유용)
*   **접근 지정자 (Access Specifiers):**
    *   **`Public`**: (기본값)
    *   **`Protected`**:
    *   **`Private`**:
*   **기타 (Misc):**
    *   **`Category="CategoryName"`**: 블루프린트 그래프에서 이 함수를 지정된 카테고리 아래에 표시합니다.
    *   **`DisplayName="Custom Name"`**: 블루프린트에서 이 함수의 표시 이름을 변경합니다.
    *   **`ToolTip="Help text"`**: 블루프린트에서 이 함수에 마우스를 올렸을 때 표시되는 툴팁을 설정합니다.
    *   **`Meta=(key="value")`**: 추가적인 메타데이터를 지정합니다.
        *   예: `Meta=(Keywords="move, walk")` (블루프린트 검색 키워드 추가)
        *   예: `Meta=(DeprecatedFunction, DeprecatedMessage="Use NewFunction instead.")` (함수가 더 이상 사용되지 않음을 표시)

**예시:**

```cpp
UCLASS()
class MYPROJECT_API AMyCharacter : public ACharacter
{
    GENERATED_BODY()

public:
    UFUNCTION(BlueprintCallable, Category = "Combat")
    void Attack();

    UFUNCTION(BlueprintPure, Category = "Utility")
    float GetHealthPercentage() const;

    UFUNCTION(BlueprintImplementableEvent, Category = "Events")
    void OnTakeDamage(float DamageAmount);

    UFUNCTION(BlueprintNativeEvent, Category = "Events")
    void OnDeath();
    void OnDeath_Implementation(); // C++ implementation for BlueprintNativeEvent

    UFUNCTION(Server, Reliable, WithValidation) // WithValidation은 Server/Client 함수에 추가적인 유효성 검사 함수를 생성
    void Server_Heal(float HealAmount);

    UFUNCTION(Client, Unreliable)
    void Client_ShowNotification(const FString& Message);

    UFUNCTION(CallInEditor, Category = "Debug")
    void DebugPrintCurrentState();
};
```

---

이 내용으로 `_studies/UnrealEngine/ReflectionSystem.md` 파일을 생성하겠습니다.
