# 지침(Instructions) 및 지식(Knowledge) 모범 사례

## 에이전트의 구조 이해하기

지침을 잘 작성하기 위해서는 먼저 에이전트가 어떻게 작동하는지 구조를 이해해야 합니다.

```{image} imgs/agent-structure.png
:alt: 에이전트 구조도 (Input → Agent → Output, Tool calls)
:align: center
```

<p style="text-align: center; font-size: 0.85em; color: gray;">출처: <a href="https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ai-agents/">Microsoft Azure Cloud Adoption Framework - AI Agents</a></p>

에이전트는 **Input**(시스템 이벤트, 사용자 메시지, 에이전트 메시지)을 받아, 내부적으로 **Generative AI 모델 + 지침(Instructions) + 도구(Tools)** 를 결합하여 작동합니다. 에이전트가 실제로 작업을 수행하기 위해서는 **Tool calls**(Retrieval, Actions, Memory)을 통해 외부 시스템과 연결되어야 하며, 최종적으로 **Output**(에이전트 메시지, 도구 결과)을 생성합니다.

> ⚠️ **핵심 원칙**: 에이전트는 **실제로 보유한 도구와 지식**을 기반으로만 작동할 수 있습니다. 지침에 아무리 훌륭한 내용을 써도, 그에 해당하는 도구나 지식 소스가 없으면 에이전트는 그것을 수행할 수 없습니다.

---

## ⚠️ 지침에 쓰기 전에 먼저 확인할 것

AI 어시스턴트 도구를 활용해 에이전트 지침을 자동 생성하면 편리하지만, 한 가지 주의할 점이 있습니다. **AI가 에이전트가 실제로 할 수 없는 기능까지 지침에 포함시키는 경우**가 종종 발생합니다.

예를 들어 "사용자의 캘린더를 확인하여 회의를 예약하라"는 지침이 생성되었다면, 에이전트에 실제로 캘린더 접근 도구가 연결되어 있지 않은 한 이 지침은 아무런 효과가 없습니다.

**지침 작성 전 체크리스트:**
- 이 지침에서 언급하는 도구가 에이전트에 실제로 추가되어 있는가?
- 이 지침에서 언급하는 지식 소스가 실제로 구성되어 있는가?
- 에이전트가 실제로 접근할 수 없는 시스템을 언급하고 있지는 않은가?

> 💡 **기억하세요**: 지침은 에이전트가 이미 가진 능력을 **어떻게 활용할지** 안내하는 것이지, 새로운 능력을 **부여하는** 것이 아닙니다. 기능이 필요하다면 먼저 도구를 추가하세요.

---

## Part 1. Instructions 모범 사례

> 💡 **지침(Instructions)의 올바른 역할**
>
> 지침은 **오케스트레이션 용도**로 사용하는 것이 일반적으로 권장됩니다. 즉, 어느 상황에서 어떤 도구(Tool), 토픽(Topic), 또는 지식 소스(Knowledge)를 호출할지 안내하는 역할입니다.
>
> 실제 비즈니스 로직이나 전처리 작업(예: 데이터 변환, 필터링, 조건 분기 등)은 지침에 직접 서술하기보다는, **별도의 도구(Tool)로 구현한 뒤 그 도구로 향하도록 지침에서 안내**하는 방식이 권장됩니다.
>
> | 지침에 적합한 내용 | 도구로 구현해야 할 내용 |
> |---|---|
> | 어떤 상황에 어떤 도구/토픽을 쓸지 | 데이터 조회, 변환, 필터링 로직 |
> | 응답 형식 및 톤 가이드 | 외부 시스템 연동, API 호출 |
> | 제약 조건 및 가드레일 | 복잡한 조건 분기 처리 |
>
> 지침을 오케스트레이션 허브로 간결하게 유지할수록 에이전트의 동작이 예측 가능하고 유지보수하기 쉬워집니다.

### 1. 지식 소스와 도구에 기반하여 지침 작성하기 (Ground instructions in knowledge sources and tools)

지침 작성 전에 에이전트에 필요한 도구와 지식 소스를 **먼저** 구성해야 합니다. 예를 들어, FAQ 웹사이트를 검색하라는 지침을 넣으려면, 해당 웹사이트가 지식 소스로 먼저 등록되어 있어야 합니다.

**일반 설정 체크리스트 (General Setup):**
- 지침 작성 전에 에이전트에 필요한 도구와 지식 소스 먼저 구성
- 결정론적 오케스트레이션을 위해 도구와 지식 소스를 토픽에 반드시 연결
- 도구와 지식 소스에는 정확하고 구체적인 이름과 설명 사용
- 복잡한 지침일수록 모델의 일반 지식은 ON 상태 유지가 유리

---

### 2. 적절한 도구와 지식을 탐지할 수 있도록 안내하기 (Help the agent determine the appropriate tools and knowledge to call)

에이전트는 도구/지식 소스의 **이름과 설명**을 기반으로 어떤 것을 호출할지 결정합니다. 따라서 도구 및 지식 소스 이름과 설명을 정확하고 구체적으로 작성하는 것이 중요합니다.

지침에는 도구/지식 소스의 목록을 나열할 필요가 없습니다. 대신, **어떤 도구나 지식을 언제 써야 하는지 애매한 경우**에만 힌트를 줍니다:

```
Use the FAQ documents only if the question is not relevant to Hours, Appointments, or Billing.
Only use the ticket creation topic for creating tickets.
For other requests related to fixing issues, use the troubleshooting topic.
```

---

### 3. 올바른 지식 소스 선택을 돕기 (Help the agent choose the right knowledge sources)

지식 소스가 많을 때는, 상황별로 검색했으면 하는 지식에 대해 명시적으로 지침에 넣어줍니다:

```
Search the employee onboarding document for questions about new hire processes.
Search only within country-specific folders relevant to the employee's country.
```

> 💡 지식이 많을 때는, 상황별 검색 지식을 명시적으로 지침에 넣거나, 토픽을 통해 세분화할 수도 있습니다.

---

### 4. 도구 실행 순서 안내하기 (Help the agent choose the right sequence of tools)

도구들이 실행되었으면 하는 순서가 있다면, **1, 2, 3 순서 리스트 형태로 지침을 작성**합니다:

```
1. When the user has provided details of their preferred laptop, create a purchase order using /Purchase Order.
2. After creating the order, notify the user with the order confirmation number.
3. If the order creation fails, escalate to the IT support team.
```

도구 이름을 지침에서 언급할 때는 `/`를 사용하여 **정확한 도구 이름**을 지정합니다. 이름이 조금이라도 다르면 결과에 부정적인 영향을 미칠 수 있습니다.

---

### 5. 도구별 입력 파라미터에 적절한 값이 전달될 수 있도록 안내하기 (Help the agent fill inputs for tools)

트리거를 통해 전달되는 값(명령 + 변수)을 상황에 맞게 적절히 편집하고, 대화 내역을 활용해 도구 입력 파라미터를 채우도록 지침을 작성합니다:

```
Use the email address from the contact field of the lead when helping the user to draft an email to follow-up on a lead.
```

> 💡 지침은 검색 쿼리에 영향을 미칠 수는 있지만, 검색 알고리즘 자체에 영향을 미칠 수는 없습니다.

---

### 6. 응답 생성 안내하기 (Help the agent generate a response)

응답 생성에 관한 지침은 두 가지로 나뉩니다:

**① 가드레일 (해서는 안 되는 것):**
```
Only respond to messages that are relevant to Contoso corporation and ordering coffee.
Otherwise, tell the user you can't help with their inquiry.
```

**② 형식 지정 (어떻게 응답할지):**
```
Always give responses about order status in a table format.
```

---

### 7. 대화 흐름과 관련된 지침 (Conversation-based instructions)

대화 시 제약 사항(Constraints), 답변 서식(Response format), 검색 시 지켜야 하는 방향(Guidance) 등의 내용들을 지침에 명시합니다.

**Constraints (제약 사항):**
```
Only respond to requests to provide information about educational, legal, wellness, wellbeing, 
health, dental care, and newborn benefits for employees and dependents.
```

**Response Format (응답 형식):**
```
Respond to inquiries by providing benefit types along with details, health plan comparisons 
available for employees and dependents in tabular format.
Add a column for available options. Include insurance provider details and provide a link for enrollment.
Answer in bold and underline fonts as necessary.
```

**Guidance (검색 가이드):**
```
Search only within specific country folders relevant to the employee's country.
```

---

#### ⚠️ Constraints와 데이터 보안: 지침만으로는 부족한 경우

Constraints를 활용하여 **현재 로그인한 사용자의 이메일을 기준으로 적절한 데이터만 보여주려는 시도**를 종종 볼 수 있습니다.

**예시 시나리오:** 직원별 교육 신청 횟수를 하나의 엑셀 파일에 관리하고, 에이전트가 이를 기반으로 답변하되:
- 일반 직원 → 본인 데이터만 조회
- 관리자 → 전체 데이터 조회

이것을 지침만으로 구현하려는 경우, 최근 AI 모델 성능이 향상되면서 어느 정도 동작할 수 있습니다. **그러나 지침은 기술적으로 100%를 보장할 수 없습니다.**

| 방법 | 보안 수준 | 권장 여부 |
|---|---|---|
| 지침(Instructions)만으로 접근 제어 | 낮음 ⚠️ | ❌ 비권장 |
| 규칙 기반 RLS 직접 구현 | 높음 | ✅ 권장 |
| Dataverse 등 RLS 지원 DB 활용 | 높음 | ✅ 강력 권장 |

비즈니스적으로 민감한 데이터(인사 정보, 급여, 교육 이력 등)의 경우, **행 수준 보안(Row-Level Security, RLS)을 직접 규칙 기반으로 구현**하거나, 애초에 **RLS 기능이 지원되는 Dataverse 같은 데이터베이스에 데이터를 저장하여 연결**하는 것이 보안적으로 권장됩니다.

---

### 8. 팔로우업 질문은 보유한 도구를 통해 작업 가능한 범위 내에서만 하도록 안내하기

에이전트가 팔로우업 질문을 제안할 때, **실제로 보유한 도구로만 작업 가능한 범위 내에서** 제안하도록 지침을 작성합니다.

예를 들어, 날씨 정보 조회 도구와 여행 정보 조회 도구만 보유한 에이전트라면:

```
Conclude all your responses with follow-up questions based on the current context and your available tools.
```

```{image} imgs/followup-instructions-example.png
:alt: 팔로우업 질문 지침 예시
:align: center
```

<p style="text-align: center; font-size: 0.85em; color: #666;">출처: <a href="https://learn.microsoft.com/en-us/microsoft-copilot-studio/guidance/generative-mode-guidance#use-follow-up-questions" target="_blank">Microsoft Learn — Use follow-up questions</a></p>

> 이처럼 보유한 도구 목록을 지침 내에 명시적으로 참조하면, 에이전트가 실제로 수행할 수 없는 제안을 하는 것을 방지할 수 있으며, 사용자에게도 에이전트가 어떤 작업을 도와줄 수 있는지 명확히 안내하여 사용자 경험(UX)을 개선할 수 있습니다.

---

### 9. 기본 Fallback 메시지 변경하기

지침(Instructions)으로는 에이전트의 **기본 Fallback 메시지를 변경할 수 없습니다.**

기본 Fallback 메시지는 다음과 같습니다:

> *"I'm sorry, I'm not sure how to help with that. Can you try rephrasing?"*

Fallback 메시지를 변경하려면 지침이 아닌 **Fallback 토픽**을 직접 수정해야 합니다:

1. **Topics → System → Fallback** 토픽으로 이동
2. **Fallback** 토픽 내 **Message** 텍스트를 원하는 내용으로 편집

아래 다이어그램은 Generative Orchestration 흐름에서 Fallback System Topic이 발동되는 시점을 보여줍니다. Plan generation 단계에서 일치하는 토픽/도구/지식이 없을 때 Fallback이 트리거됩니다.

```{image} imgs/generative-orchestration-fallback.png
:alt: Generative Orchestration 흐름과 Fallback System Topic
:align: center
```

<p style="text-align: center; font-size: 0.85em; color: #666;">출처: <a href="https://aka.ms/CopilotStudioImplementationGuide" target="_blank">Copilot Studio Implementation Guide</a></p>

---

### 10. 지침으로 검색 검색(Search Retrieval) 로직을 변경할 수 없음

에이전트 지침(Instructions)은 **검색 검색 로직을 수정하거나 제어할 수 없습니다.** 문서를 어떤 순서로, 어떻게 검색할지를 지침으로 조정하려는 시도는 작동하지 않습니다.

> ❌ 문서 검색 방식을 지침으로 제어하려는 내용은 지침에서 제거하세요.

검색 동작을 바꾸려면 Knowledge Source 설정(예: 검색 필터, 인덱스 구성)을 직접 수정하거나, 도구(Tool) 단에서 쿼리 방식을 조정해야 합니다.

---

### Instructions 최종 체크리스트

**✅ 일반적인 설정 (General Setup)**
- 지침 작성 전에 에이전트에 필요한 도구와 지식 소스 먼저 구성
- 결정론적 오케스트레이션을 위해 도구와 지식 소스를 토픽에 반드시 연결
- 도구와 지식 소스에는 정확하고 구체적인 이름과 설명 사용
- 복잡한 지침일수록 모델의 일반 지식은 ON 상태 유지가 유리

**🧠 효과적인 지침 작성 (Writing Effective Instructions)**
- 대화 흐름과 관련된 지침에는 제약 조건, 응답 형식, 가이드 명확히 포함
- 에이전트가 접근할 수 없는 도구나 소스는 언급하지 않기
- 가독성을 위해 Markdown 적극 활용
- 특정 도구나 지식 소스를 언제, 어떻게 사용할지 명확히 지시
- 원치 않는 응답이나 행동을 막기 위한 가드레일 포함

**🗣️ 대화 흐름과 관련된 지침 작성 시 유의 사항 (Conversational Instructions)**
- 응답 형식 명시 (예: 표, 굵은 글씨, 밑줄 등)
- 맥락 기반 가이드 제공 (예: 국가별 폴더 안에서만 검색)
- 대화 내역을 활용해 도구 입력 파라미터를 채우도록 지침 작성

---

## Part 2. Knowledge 모범 사례

### RAG(검색 증강 생성)란?

Copilot Studio의 Knowledge 기능은 **RAG(Retrieval Augmented Generation)** 패턴을 기반으로 동작합니다. RAG는 AI 언어 모델의 추론 능력과 조직 내 신뢰할 수 있는 데이터 소스를 결합하여, 모델이 학습한 지식만이 아닌 **실제 기업 콘텐츠에 기반한 정확하고 맥락 있는 답변**을 생성합니다.

| 구분 | 설명 |
|---|---|
| ✅ **Without RAG** | AI는 학습된 지식만으로 답변 → 오래된 정보이거나 한계가 있을 수 있음 |
| ✅ **With RAG** | 답변 생성 전에 최신 및 정확도 높은 정보를 검색하여 활용 |
| ✅ **Why it matters** | 보다 신뢰할 수 있고, 문맥에 적합한 답변을 생성 |

---

### Copilot Studio의 RAG 아키텍처 (7단계 파이프라인)

```{image} imgs/rag-architecture.png
:alt: RAG Architecture in Copilot Studio
:align: center
```

<p style="text-align: center; font-size: 0.85em; color: #666;">출처: <a href="https://learn.microsoft.com/en-us/microsoft-copilot-studio/guidance/retrieval-augmented-generation#rag-architecture-in-copilot-studio" target="_blank">RAG architecture in Copilot Studio - Microsoft Learn</a></p>

Copilot Studio의 RAG는 다음 **4단계 프로세스**로 동작합니다:

**1️⃣ 쿼리 재작성 (Query Rewriting)**

사용자의 질문을 그대로 검색에 사용하지 않고, 검색에 최적화된 쿼리로 변환합니다:
- 질문의 의미 명확화
- 최근 대화 맥락(최대 10턴) 반영
- 키워드 매칭 개선
- 검색 친화적 쿼리 생성

**2️⃣ 콘텐츠 검색 (Content Retrieval)**

> ⚠️ **커스터마이징 불가 영역**: Copilot Studio는 각 지식 소스(Knowledge Source)별로 **상위 3개의 관련 문서**를 검색하며, 이 동작은 제품 사양으로 고정되어 있어 변경할 수 없습니다.

설정된 모든 지식 소스에 대해 재작성된 쿼리를 실행하고 결과를 수집합니다. 각 지식 소스는 인증 방식, 인덱싱, 파일 형식 등에 따라 동작이 다릅니다.

**3️⃣ 요약 및 응답 생성 (Summarization & Response Generation)**

- 검색된 콘텐츠를 AI가 종합하여 응답 생성
- 지침(Instructions)에 따른 톤, 형식, 안전 설정 적용
- 출처 인용(Citations) 포함
- 사용자 맥락(언어, 부서, 지역 등) 기반 개인화

**4️⃣ 안전 및 거버넌스 검증 (Safety & Governance Validation)**

- 유해하거나 부적절한 응답 자동 필터링
- 그라운딩(Grounding) 검증 — 사실 기반 응답 여부 확인
- 고객 데이터는 언어 모델 학습에 사용되지 않음

> 💡 위 4단계는 Copilot Studio 런타임 내에서 자동으로 처리되며, 이 파이프라인의 동작 방식 자체는 제품 사양으로 고정되어 있습니다.

---

### RAG가 잘하는 것과 못하는 것

> 💡 **RAG는 사실 기반 Q&A에 최적화되어 있으며, 심층 문서 분석에는 적합하지 않습니다.**

| ✅ RAG가 적합한 사례 | ❌ RAG가 적합하지 않은 사례 |
|---|---|
| FAQ, 정책, 절차 문서 요약 | 두 개의 긴 문서를 상세 비교 |
| 지식베이스에서 사실 질문 답변 | 계약서의 정책 준수 여부 평가 |
| 파일이나 내부 시스템에서 특정 정보 검색 | 긴 비정형 문서에 대한 복잡한 추론 |

> 💡 대신, RAG는 데이터를 검색하고 요약하여 응답을 사실에 기반하도록 유지합니다. 심층 문서 분석이 필요하다면 별도의 아키텍처(예: 프롬프트 도구 + 커스텀 처리 로직)를 구현해야 합니다.

---

### 지원되는 지식 소스와 주요 특성

각 지식 소스는 고유한 특성과 제약이 있습니다. 아래 표를 참고하여 유스케이스에 맞는 소스를 선택하세요:

| 지식 소스 | 인증 | 주요 특성 및 제약 |
|---|---|---|
| **공개 웹사이트** (Bing) | 없음 | Bing 인덱싱 필요, 지역 제한 불가, 최대 2단계 서브페이지 |
| **SharePoint / OneDrive** | Microsoft Entra ID | 위임 인증 필요, 보안 트리밍 적용, Enhanced Search Results (의미 체계 검색을 통한 테넌트 그래프 접지) 기능이 활성화 되어 있다면 개별 파일 사이즈 최대 200 MB (M365 Copilot 라이선스가 최소 1개라도 있다면 기본 설정) |
| **업로드 파일** | 없음 | 파일 최대 512MB, 에이전트당 최대 500개, PDF 이미지/표 인식 지원 |
| **Dataverse 테이블** | Microsoft Entra ID | 최대 15개 테이블, 동의어/용어집으로 검색 개선 가능 |
| **Graph 커넥터** | Microsoft Entra ID | ServiceNow, Confluence 등 Enterprise 앱 연동 |
| **실시간 커넥터** | 로그인 사용자 | Salesforce, ServiceNow, Zendesk, Azure SQL 등 |
| **Azure AI Search** | 엔드포인트 설정 | 벡터 기반 시맨틱 검색, 보안 트리밍 없음 |
| **커스텀 데이터** | 없음 | API/흐름/HTTP 요청으로 직접 조회 후 결과 전달 |

> ⚠️ **SharePoint/OneDrive의 보안 트리밍**: 현재 로그인한 사용자가 읽기 권한을 가진 콘텐츠만 검색 결과에 포함됩니다. 이는 제품 기본 동작으로, 데이터 접근 제어를 지침으로 구현할 필요가 없습니다.

---

### 품질 높은 Knowledge 구성을 위한 모범 사례

**📁 콘텐츠 구조화**
- 문서는 명확하고 일관된 제목과 섹션 구조로 작성
- 하나의 문서에 너무 많은 주제를 혼합하지 않기
- FAQ 형식(Q&A)으로 작성하면 검색 정확도 향상

**🏷️ 지식 소스 이름과 설명**
- 각 지식 소스의 이름과 설명을 명확하고 구체적으로 작성
- 에이전트가 이름과 설명을 기반으로 어떤 소스를 호출할지 결정하므로, 모호한 이름은 검색 품질을 저하시킴

**🔐 접근 제어는 지식 소스 수준에서**
- 사용자 권한 기반 데이터 접근 제어는 Instructions로 구현하지 말고, **SharePoint 권한** 또는 **Dataverse RLS**처럼 데이터 소스 자체의 보안 기능을 활용
- Azure AI Search는 보안 트리밍이 없으므로 민감한 데이터에는 주의

**🗂️ 적절한 소스 분리**
- 성격이 다른 데이터는 별도의 지식 소스로 구성하여, 지침에서 상황별 소스를 명확히 지정할 수 있게 하기
- 예: 일반 FAQ용 SharePoint + 구조화 데이터용 Dataverse

---

### Knowledge 체크리스트

**✅ 기본 설정**
- 지식 소스 이름과 설명을 명확하고 구체적으로 작성
- 각 소스의 파일 형식·크기 제한 확인 후 적합한 소스 선택
- 문서는 명확한 구조(제목, 섹션)로 정리

**🔐 보안 및 거버넌스**
- 민감 데이터는 지침(Instructions)이 아닌 데이터 소스 자체의 접근 제어 활용
- SharePoint/OneDrive 활용 시 보안 트리밍 동작 이해 및 확인
- Azure AI Search 사용 시 보안 트리밍 없음 — 공개 데이터에만 적합

**🚫 RAG 한계 인식**
- 심층 문서 분석 시나리오에는 별도 아키텍처 필요
- 각 지식 소스당 상위 3개 문서 검색은 제품 고정 사양 (변경 불가)
- 검색 로직을 지침으로 제어하려는 시도는 작동하지 않음

---

## 참고문헌

- [Configure high-quality instructions for generative orchestration - Microsoft Copilot Studio](https://learn.microsoft.com/en-us/microsoft-copilot-studio/guidance/generative-mode-guidance)
- [Copilot Studio Implementation Guide](https://aka.ms/CopilotStudioImplementationGuide)
- [Retrieval-augmented generation in Microsoft Copilot Studio](https://learn.microsoft.com/en-us/microsoft-copilot-studio/guidance/retrieval-augmented-generation)
