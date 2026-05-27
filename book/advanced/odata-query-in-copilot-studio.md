# OData 쿼리 활용하기

## OData 쿼리란?

**OData(Open Data Protocol)** 는 REST API에서 데이터를 조회할 때 필터링, 정렬, 컬럼 선택 등을 URL 쿼리 파라미터로 표현하는 표준 프로토콜입니다.

Copilot Studio에서 **Excel 커넥터**나 **Dataverse 커넥터**를 사용할 때 조건에 맞는 행을 가져오거나 특정 컬럼만 반환받고 싶을 때 OData 쿼리를 활용하면 매우 유용합니다. 예를 들어, Excel 테이블에서 특정 사람의 데이터만 필터링해 가져오거나, 필요한 컬럼만 골라서 반환받을 수 있습니다.

이 문서에서는 실무에서 가장 자주 쓰이는 **`$filter`** 와 **`$select`** 두 가지 쿼리를 소개합니다.

---

## $filter 쿼리

`$filter`는 **조건에 부합하는 행(row)만 반환**하도록 하는 쿼리입니다. SQL의 `WHERE` 절과 동일한 역할을 합니다.

### 비교 연산자

| 연산자 | 의미 | 예시 |
|---|---|---|
| `eq` | 같다 (Equal) | `id eq 3` |
| `ne` | 같지 않다 (Not equal) | `status ne '완료'` |
| `gt` | 크다 (Greater than) | `score gt 80` |
| `ge` | 크거나 같다 (Greater than or equal to) | `score ge 80` |
| `lt` | 작다 (Less than) | `age lt 30` |
| `le` | 작거나 같다 (Less than or equal to) | `age le 30` |

### 작성 규칙

- **숫자**: 따옴표 없이 그대로 작성합니다.
  ```
  id eq 3
  ```
- **문자열(영문 및 한글)**: 값을 **단일 따옴표 `' '`** 로 감쌉니다.
  ```
  성함 eq '홍길동'
  ```
  ```
  department eq 'Engineering'
  ```

### 논리 연산자 조합

`and` / `or`를 사용해 여러 조건을 연결할 수 있습니다.

```
성함 eq '홍길동' and 소속 eq '영업팀'
```

```
score gt 80 or grade eq 'A'
```

### 사용 위치 (Excel 커넥터)

Excel 커넥터의 **"테이블의 행 나열(List rows present in a table)"** 액션에서 **Filter Query** 필드에 입력합니다.

```{tip}
Copilot Studio 토픽 내 변수 값을 필터 조건으로 쓸 때는 Power Automate 플로우를 통해 변수를 전달하거나, HTTP 액션의 URI 파라미터에 동적으로 삽입합니다.
```

---

## $select 쿼리

`$select`는 **반환받을 컬럼(column)을 지정**하는 쿼리입니다. 전체 컬럼이 아닌 필요한 컬럼만 가져오므로 응답 속도와 처리 효율이 향상됩니다.

### 작성 규칙

- 원하는 컬럼명을 **쉼표(`,`)로 구분**하여 나열합니다.
- 한글 컬럼명과 영문 컬럼명 모두 **따옴표 없이** 작성합니다.

```
Name, 소속, 성함
```

```
id, score, grade
```

### 사용 위치 (Excel 커넥터)

Excel 커넥터의 **"테이블의 행 나열"** 액션에서 **Select Query** 필드에 입력합니다.

---

## $filter + $select 조합 사용

두 쿼리를 함께 사용하면 **조건에 맞는 행에서 필요한 컬럼만** 정확히 추출할 수 있습니다.

**예시 시나리오**: 이름이 '홍길동'인 사람의 `소속`과 `연락처`만 가져오기

- **Filter Query**: `성함 eq '홍길동'`
- **Select Query**: `성함, 소속, 연락처`

```{note}
Excel 온라인(비즈니스) 커넥터의 경우 `$filter`와 `$select` 모두 OData 표준 문법을 따르지만, 커넥터 버전이나 테이블 구성에 따라 일부 연산자가 지원되지 않을 수 있습니다. 쿼리가 작동하지 않을 때는 Power Automate에서 단계별로 테스트해보는 것을 권장합니다.
```

---

## 참고문헌

- [$filter - OData query options overview - Microsoft Learn](https://learn.microsoft.com/en-us/odata/concepts/queryoptions-overview#filter)
- [$select - OData query options overview - Microsoft Learn](https://learn.microsoft.com/en-us/odata/concepts/queryoptions-overview#select)

