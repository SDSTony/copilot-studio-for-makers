# 토픽 내에서 외부 API 호출하도록 설계하기

```{warning}
**Copilot Studio는 빠르게 발전하는 제품입니다.** UI 업데이트가 잦아 본 가이드의 스크린샷·메뉴 명칭과 실제 화면이 일부 다를 수 있습니다. 또한 SaaS 제품의 특성상 새로운 기능이 순차적으로 출시되는 과도기에는 사용자·환경마다 화면 구성이 조금씩 다르게 보일 수 있습니다.
```

## 개요

> Copilot Studio 토픽에서 **HTTP 커넥터(또는 Power Automate 플로우)를 활용**하여 외부 REST API를 직접 호출하는 방법을 소개합니다. 이를 통해 에이전트가 외부 시스템의 데이터를 실시간으로 조회하거나 작업을 트리거할 수 있습니다.

---

## 방법 비교: HTTP 액션 vs Agent Flow

| 구분 | HTTP 액션 (토픽 내 직접 호출) | Agent Flow (Power Automate) |
|---|---|---|
| 복잡도 | 낮음 — 토픽 내에서 직접 구성 | 높음 — 별도 플로우 빌드 필요 |
| 유연성 | 단순 GET/POST 호출에 적합 | 복잡한 로직, 조건 분기에 적합 |
| 인증 지원 | API Key, Bearer Token 등 | 커넥터 인증 방식 다양하게 지원 |
| 권장 케이스 | 빠른 프로토타이핑, 단순 조회 | 복잡한 데이터 처리, 기업 시스템 연동 |

---

## 방법 1: 토픽 내 HTTP 액션으로 외부 API 호출

### HTTP 액션이란?

Copilot Studio 토픽의 노드 중 **"HTTP 요청 보내기(Send HTTP request)"** 액션을 사용하면 외부 REST API를 토픽 흐름 안에서 직접 호출할 수 있습니다.

### 지원되는 HTTP 메서드

- `GET` — 데이터 조회
- `POST` — 데이터 생성 또는 액션 트리거
- `PATCH` / `PUT` — 데이터 업데이트
- `DELETE` — 데이터 삭제

### 인증 방법

| 인증 방식 | 설명 |
|---|---|
| 없음 | 공개 API |
| API Key | 헤더 또는 쿼리 파라미터로 전달 |
| Bearer Token | Authorization 헤더에 토큰 입력 |
| Basic Auth | Base64 인코딩된 자격 증명 |

### 구성 단계

1. 토픽 편집기에서 **"+"** → **"액션 보내기"** → **"HTTP 요청 보내기"** 선택
2. **URL** 입력 (동적 변수 포함 가능)
3. **메서드** 선택 (GET / POST 등)
4. **헤더(Headers)** 설정 — 인증 토큰, Content-Type 등
5. **본문(Body)** 설정 — POST/PATCH 시 JSON 페이로드 입력
6. **응답 저장** — 결과를 변수에 저장하여 이후 노드에서 활용

### 응답 처리

```
응답 상태 코드: statusCode 변수로 확인
응답 본문: 변수에 저장 후 파싱하여 개별 필드 추출
```

> ⚠️ HTTP 액션은 **DLP(데이터 손실 방지) 정책**의 영향을 받습니다. HTTP 커넥터가 차단된 환경에서는 사용할 수 없으므로 사전에 관리자 확인이 필요합니다.

---

## 방법 2: Agent Flow(Power Automate)를 통한 외부 API 호출

복잡한 인증이나 데이터 변환이 필요한 경우, Power Automate 플로우를 Agent Flow로 등록하여 토픽에서 호출하는 방법이 더 적합합니다.

### 구성 단계

1. Power Automate에서 **솔루션 내** 인스턴트 플로우 생성
2. 트리거: **"Copilot Studio에서 호출"** 선택
3. HTTP 커넥터 또는 프리미엄 커넥터로 외부 API 호출
4. 응답 값을 출력 변수로 정의
5. Copilot Studio 토픽에서 해당 플로우를 액션으로 추가

---

## 실습: 외부 API를 호출하여 응답을 만들어 내는 에이전트 구축

> **실습 개요**: TheMealDB 공개 API를 활용하여, 사용자가 선택한 국가의 음식 목록을 HTTP 요청으로 조회하고 테이블 형태로 답변하는 에이전트를 구축합니다.

### 실습 단계

**1단계: Copilot Studio로 이동하여 새 에이전트를 만든다.**

**2단계: 토픽으로 이동하여 새로운 토픽을 만들고, 토픽 이름은 `음식 관련 대화`로 설정한다.**

**3단계: 트리거의 "토픽이 수행하는 작업 설명" 란에 아래 내용을 입력한다.**

```
이 토픽은 다음과 같은 쿼리를 처리할 수 있습니다: 특정 국가의 음식 추천해줘
```

```{image} imgs/api-lab-01-trigger-setup.png
:alt: 트리거 설정
:align: center
```

**4단계: 하단에 "질문하기" 노드를 추가한다.**

```{image} imgs/api-lab-02-add-question-node.png
:alt: 질문하기 노드 추가
:align: center
```

**5단계: 아래와 같이 노드를 설정한다.**

- **질문**: 어떤 국가의 음식이 궁금하신가요?
- **식별**: 다중 선택 옵션
- **사용자에 대한 옵션**: `Canadian`, `Italian`
- **다른 이름으로 사용자 응답 저장 > 변수 이름**: `country`

```{image} imgs/api-lab-03-question-node-settings.png
:alt: 질문 노드 설정 - country 변수
:align: center
```

**6단계: 질문하기 노드 하단에 자동으로 추가되는 조건 노드들을 모두 삭제한다.**

```{image} imgs/api-lab-04-delete-condition-nodes.png
:alt: 조건 노드 삭제
:align: center
```

**7단계: 삭제한 위치에 "HTTP 요청 전송" 노드를 추가한다.**

```{image} imgs/api-lab-05-add-http-node.png
:alt: HTTP 요청 전송 노드 추가
:align: center
```

**8단계: URL에는 수식 메뉴로 이동하여 아래 PowerFx 수식을 입력한다.**

> 이번 예제에서는 [TheMealDB API](https://www.themealdb.com/api.php)를 사용한다.

```
Concatenate("https://www.themealdb.com/api/json/v1/1/filter.php?a=", Topic.country)
```

```{image} imgs/api-lab-06-powerfx-url.png
:alt: PowerFx URL 수식 입력
:align: center
```

**9단계: API 호출 방법에 따라 필요 시 메서드 수정 및 헤더/본문 키-값 쌍을 추가할 수 있다. 이번 예제에서는 수정할 필요 없다.**

```{image} imgs/api-lab-07-http-method-headers.png
:alt: HTTP 메서드 및 헤더 설정
:align: center
```

**10단계: 응답 데이터 형식은 `Any`로 설정하고, "다음 이름으로 응답 저장"에는 `result` 변수를 만들고 전역으로 사용 범위를 설정한다. 그리고 토픽을 저장한다.**

```{image} imgs/api-lab-08-response-variable-setup.png
:alt: 응답 변수 설정 - result (전역)
:align: center
```

**11단계: 개요로 이동하여 지침을 아래와 같이 설정한다.**

```
특정 국가의 음식을 잘 알려줘. /Global.result 에 있는 음식들을 테이블 형태로 가독성 좋게 잘 정리해서 답변할것.
```

> 💡 특정 국가의 음식을 잘 알려줘. `/Global.result` 에 있는 음식들을 테이블 형태로 가독성 좋게 잘 정리해서 답변할 것.

```{image} imgs/api-lab-09-instructions-setup.png
:alt: 지침 설정
:align: center
```

**12단계: 테스트 패널에 `특정 국가 음식 추천해줘`를 입력하고 `Canadian`을 선택한다.**

```{image} imgs/api-lab-10-test-input.png
:alt: 테스트 패널 입력
:align: center
```

### 실습 결과 확인

결과를 보면 [https://www.themealdb.com/api/json/v1/1/filter.php?a=Canadian](https://www.themealdb.com/api/json/v1/1/filter.php?a=Canadian) 페이지에 있는 음식 이름과 음식 이미지를 기반으로 답변이 나오는 것을 확인할 수 있다.

```{image} imgs/api-lab-11-result-1.png
:alt: 실습 결과 1
:align: center
```

```{image} imgs/api-lab-12-result-2.png
:alt: 실습 결과 2
:align: center
```

## 참고문헌

- [Make HTTP requests - Microsoft Copilot Studio](https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-http-node)
