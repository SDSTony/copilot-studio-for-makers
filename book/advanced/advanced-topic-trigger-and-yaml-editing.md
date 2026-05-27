# 고급 Topic Trigger 및 YAML 기반 토픽 편집

## YAML 코드 편집기란?

Copilot Studio의 모든 토픽은 내부적으로 **YAML** 형식으로 저장됩니다. UI 캔버스에서 노드를 추가하면 자동으로 YAML이 생성되며, 반대로 YAML을 직접 수정하면 캔버스에 반영됩니다.

코드 편집기에 접근하는 방법: 토픽 편집 화면 상단 툴바의 **`...` → Open code editor** 를 선택합니다.

### YAML 편집기를 활용하면 좋은 경우

- **토픽 복사·붙여넣기**: 비슷한 구조의 토픽을 여러 개 만들 때, YAML을 복사하여 빠르게 클론할 수 있습니다. (단, 클론 시 각 노드의 `id` 값은 반드시 고유하게 변경해야 합니다.)
- **개인 선호 편집 방식**: 복잡한 조건 분기나 반복 노드를 다룰 때, UI보다 YAML이 더 직관적으로 느껴지는 메이커도 있습니다.
- **고급 트리거 설정**: 일부 트리거는 현재 기준으로 **UI에서는 선택할 수 없고 YAML에서만 설정 가능** 합니다. (예: `OnKnowledgeRequested` 트리거)

```{warning}
YAML 편집은 신중하게 진행해야 합니다. 들여쓰기나 구문 오류가 발생하면 토픽이 오작동하거나 대화 흐름이 중단될 수 있습니다. 변경 전에는 반드시 토픽을 복사해 백업해두는 것을 권장합니다.
```

## 생성형 오케스트레이션과 고급 트리거

아래 소개하는 세 가지 트리거는 **생성형 오케스트레이션(Generative Orchestration)** 과 밀접하게 연동되는 특수 트리거입니다. 생성형 오케스트레이션이 활성화된 에이전트에서 지식 검색, AI 응답 생성, 플래닝 완료 각 시점에 개입하여 동작을 커스터마이즈할 수 있습니다.

### 1. On Knowledge Requested (`OnKnowledgeRequested`)

**지식 검색(Knowledge)이 호출되기 직전에 실행**되는 트리거입니다.

**주요 활용 포인트:**

| 시스템 변수 | 설명 |
|---|---|
| `System.KeywordSearchQuery` | 키워드 검색 엔진에 전달되는 쿼리 (읽기 전용) |
| `System.SearchQuery` | 시멘틱 검색 엔진에 전달되는 쿼리 (읽기 전용) |
| `System.SearchResults` | 검색 결과를 덮어쓸 수 있는 테이블 변수 |

- 키워드 검색과 시멘틱 검색에 실제로 **어떤 쿼리가 전달되는지 확인**하는 데 유용합니다.
- `System.SearchResults` 변수를 직접 설정하면, **자체 검색 엔진(예: Azure AI Search, 외부 API)**의 결과를 Copilot Studio 지식 검색 결과로 주입할 수 있습니다. 이를 통해 에이전트가 기본 지식 소스 대신 커스텀 검색 엔진의 결과를 기반으로 응답하도록 설계할 수 있습니다.

```{note}
커스텀 지식 소스 연동에 대한 자세한 내용은 [Custom Knowledge Sources](https://learn.microsoft.com/en-us/microsoft-copilot-studio/guidance/custom-knowledge-sources) 문서를 참고하세요.
```

YAML 설정 예시:
```yaml
kind: AdaptiveDialog
beginDialog:
  kind: OnKnowledgeRequested
```

### 2. AI Response Generated (`OnGeneratedResponse`)

**LLM이 응답을 생성한 직후, 사용자에게 메시지가 전달되기 전에 실행**되는 트리거입니다.

**주요 활용 포인트:**

- **응답 전처리**: AI가 생성한 답변을 그대로 내보내지 않고, 내용을 가공하거나 보강할 수 있습니다.
- **인용 링크(Citation) 변경**: 기본 인용 링크를 조직 내부 URL로 교체하거나 포맷을 변경할 수 있습니다. (예: `CitationsSnip` 변수 활용)
- **응답 전송 제어**: `System.ContinueResponse` 시스템 변수를 `false`로 설정하면 오케스트레이터가 자동으로 응답을 전송하지 않습니다. 이때 메이커가 직접 Message 노드로 커스텀 응답을 전송할 수 있습니다.

| 핵심 변수 | 설명 |
|---|---|
| `System.Response.FormattedText` | AI가 생성한 응답 텍스트 |
| `System.ContinueResponse` | `true` → 오케스트레이터가 자동 전송 / `false` → 메이커가 직접 전송 |

YAML 설정 예시:
```yaml
kind: AdaptiveDialog
beginDialog:
  kind: OnGeneratedResponse
```

### 3. On Plan Complete (`OnPlanComplete`)

**생성형 오케스트레이터가 플랜(Plan)을 수립하고 실행을 완료한 직후에 실행**되는 트리거입니다.

생성형 오케스트레이션에서 오케스트레이터는 사용자의 의도를 분석하여 어떤 도구·토픽·지식을 호출할지 "계획(Plan)"을 세우고 실행합니다. `OnPlanComplete`는 이 계획이 완료된 시점에 추가 로직을 삽입할 수 있게 해줍니다.

**주요 활용 예시:**

- **만족도 수집**: 에이전트가 특정 조건을 충족하는 답변을 완료했을 때, 만족도 설문 토픽으로 이동
- **후속 작업 트리거**: 플랜 완료 후 로그 기록, 알림 발송, 후속 액션 자동 실행

YAML 설정 예시:
```yaml
kind: AdaptiveDialog
beginDialog:
  kind: OnPlanComplete
```

## 언제 어떤 트리거를 선택하는가?

| 트리거 | YAML 값 | 실행 시점 | 주요 용도 |
|---|---|---|---|
| On Knowledge Requested | `OnKnowledgeRequested` | 지식 검색 직전 | 쿼리 확인, 커스텀 검색 결과 주입 |
| AI Response Generated | `OnGeneratedResponse` | AI 응답 생성 후, 전송 전 | 응답 전처리, 인용 변경, 전송 제어 |
| On Plan Complete | `OnPlanComplete` | 오케스트레이터 플랜 완료 후 | 만족도 수집, 후속 작업 |

---

## 참고문헌

- [Topics code editor - Microsoft Learn](https://learn.microsoft.com/en-us/microsoft-copilot-studio/guidance/topics-code-editor)
- [Generative orchestration: Custom triggers - Microsoft Learn](https://learn.microsoft.com/en-us/microsoft-copilot-studio/guidance/generative-orchestration#custom-triggers-in-generative-orchestration)
- [Custom knowledge sources - Microsoft Learn](https://learn.microsoft.com/en-us/microsoft-copilot-studio/guidance/custom-knowledge-sources)

