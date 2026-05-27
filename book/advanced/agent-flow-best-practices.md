# Agent Flow 모범 사례

## Agent Flow란?

Agent Flow는 Copilot Studio에서 Power Automate 기반의 자동화 흐름을 에이전트와 연동하는 기능입니다. 이 섹션에서는 실무에서 자주 만나는 문제 패턴과 해결 방법을 소개합니다.

---

## Schema Mismatch 오류

### Schema Mismatch란?

에이전트와 Agent Flow를 연결할 때 가장 자주 만나는 오류 중 하나가 **`FlowActionBadRequest`** 입니다. 이 오류의 대부분은 **Schema Mismatch(스키마 불일치)** 가 원인입니다.

**Schema**란 쉽게 말해 **"주고받기로 약속한 데이터의 형식과 목록"** 입니다.

예를 들어, 에이전트가 Agent Flow에 이름(텍스트)과 나이(숫자)를 보내기로 약속했는데, 실제 Agent Flow가 받을 준비가 된 것은 이름(텍스트)뿐이라면 — 이 약속이 어긋난 상태가 바로 Schema Mismatch입니다.

> **비유**: 택배를 보낼 때 송장에 "상품 2개"라고 적었는데 실제로 1개만 들어 있으면 수령인이 당황하는 것과 같습니다. 에이전트와 Agent Flow 사이에서도 이런 불일치가 생기면 오류가 발생합니다.

### 어디서 자주 발생하는가?

Schema Mismatch는 특정 상황에서만 발생하는 것이 아니라, **데이터를 주고받는 모든 연결 지점**에서 발생할 수 있습니다.

- **Agent Flow 내에서 커넥터끼리 연결할 때**: 예를 들어, 한 커넥터가 날짜를 텍스트 형식으로 출력했는데, 다음 커넥터는 날짜 형식으로 받기를 기대하는 경우
- **토픽 내에서 노드끼리 연결할 때**: Copilot Studio 토픽 안에서 변수나 출력값을 다음 노드에 전달할 때, 타입이 맞지 않으면 동일하게 오류가 발생합니다

즉, **"A가 내보내는 것"과 "B가 받기를 기대하는 것"의 형식이 다를 때** 언제든 발생할 수 있다고 이해하면 됩니다.

### 어떻게 해결하는가?

**가장 먼저 시도할 방법 — Agent Flow 노드 새로고침**

Agent Flow를 수정했다면, Copilot Studio의 토픽에서 해당 액션 노드를 반드시 새로고침해야 변경사항이 반영됩니다.

1. Copilot Studio에서 Agent Flow를 호출하는 토픽을 엽니다.
2. Agent Flow 액션 노드 오른쪽 상단의 **`...`(더 보기)** 버튼을 클릭합니다.
3. **Refresh(새로고침)** 를 선택합니다.
4. 입출력 파라미터가 최신 Agent Flow와 일치하는지 확인합니다.

```{warning}
Agent Flow의 입력/출력 파라미터를 변경했을 때 Copilot Studio에서 새로고침을 하지 않으면, 에이전트는 **이전 버전의 파라미터 구조**를 그대로 사용합니다. 이 경우 오류가 발생하거나 데이터가 제대로 전달되지 않습니다.
```

**해결 방법은 상황마다 다릅니다**

Schema Mismatch의 해결책은 어떤 타입끼리 충돌하느냐에 따라 매번 달라집니다. 정해진 하나의 답이 없기 때문에, **GitHub Copilot이나 ChatGPT 같은 AI 비서에게 질문**하는 것이 빠른 해결책을 찾는 데 효과적입니다.

이런 형식으로 질문하면 좋은 답변을 얻을 수 있습니다:

```
Power Automate에서 [A 타입]을 [B 타입]으로 변환하려면 어떻게 해야 하나요?
```

**실제 질문 예시:**

- `Power Automate에서 날짜(DateTime) 타입을 텍스트(String)로 변환하려면 어떻게 해야 하나요?`
- `Power Automate에서 숫자(Integer)를 텍스트로 변환하는 표현식은 무엇인가요?`
- `Power Automate에서 배열(Array)의 첫 번째 항목만 꺼내서 텍스트로 만들려면 어떻게 하나요?`
- `Copilot Studio 토픽에서 테이블(Table) 변수를 텍스트로 변환하는 방법이 있나요?`

구체적인 타입 이름과 현재 상황을 함께 알려줄수록 더 정확한 답변을 받을 수 있습니다.

---

## 참고문헌

- [Combining Agent Flows and Agents — Gotchas, Errors, and Patterns](https://microsoft.github.io/mcscatblog/posts/combining-agent-flows-and-agents-gotchas-errors-and-patterns/)



