# 프롬프트 도구로 JSON 및 문서 출력물 작성

## 프롬프트 도구(Prompt Tool)란?

Copilot Studio의 프롬프트 도구를 활용하면 AI 모델을 직접 호출하여 구조화된 출력물을 생성할 수 있습니다. 기본 출력 형식인 **텍스트** 외에도 **JSON**과 **문서(Document)** 두 가지 추가 출력 형식을 지원합니다.

```{image} imgs/prompt-output-types.png
:alt: 프롬프트 출력 형식 선택 - 텍스트 / JSON / 문서
:align: center
```

## Part 1. JSON 출력

### JSON 출력이란?

기본값인 텍스트 출력은 단순한 응답에 적합하지만, 응답에 **여러 개별 요소**가 있다면 텍스트만으로는 한계가 있습니다. JSON 출력을 사용하면 프롬프트 응답을 **구조화된 JSON 형태**로 받아 에이전트, 클라우드 흐름, 앱에서 각 필드를 개별적으로 처리할 수 있습니다.

### 주요 활용 사례

- 프로젝트 일정, 제품 정보 등 **구조화된 콘텐츠** 표시
- 인보이스, 구매 주문서, 배송 서류 등에서 **데이터 추출**
- 이메일, Dataverse 데이터 등에서 **객체 속성 식별**
- 텍스트에서 여러 **카테고리나 감정(Sentiment) 분류**

### JSON 출력 설정 방법

1. 프롬프트 편집기 우측 상단에서 **출력: JSON** 선택
2. JSON 형식 편집 아이콘(설정)을 클릭하여 포맷 확인 및 수정

### JSON 포맷 모드

| 모드 | 설명 |
|---|---|
| **Auto detected (자동 감지)** | 테스트할 때마다 모델이 응답 형식을 자동으로 감지 및 갱신. 프롬프트 개발 초기 단계에 유용 |
| **Custom (사용자 정의)** | JSON 예시를 직접 수정하면 Custom 모드로 전환. 저장 시 고정되며 런타임에도 동일 포맷 유지 |

> ⚠️ **저장 시 포맷 고정**: 프롬프트를 저장하면 마지막으로 감지된 Auto 포맷 또는 Custom 포맷이 고정됩니다. 에이전트나 흐름에서 사용할 때는 저장된 포맷이 일관되게 적용됩니다.

### 제한 사항

- JSON 스키마는 직접 수정 불가
- 필드 키 없는 JSON 배열 미지원: `["abc", "def"]` ❌ → `[{"Field1": "abc"}]` ✅
- 오류 발생 시 프롬프트 지침에 `Don't include JSON markdown in your answer` 추가 시도

---

## Part 2. 문서(Document) 출력

### 문서 출력이란?

문서 출력(Document, Preview)은 프롬프트 응답을 **Microsoft Word(.docx) 파일**로 생성하는 기능입니다. 사전에 업로드한 Word 레이아웃 템플릿의 플레이스홀더를 AI가 채워 완성된 문서를 반환합니다.

### 주요 활용 사례

- 인보이스, 제안서(RFP), 계약서 등 **비즈니스 문서 자동 생성**
- 다양한 소스에서 정보를 수집하여 **보고서 또는 문서 작성**
- 에이전트 채팅 세션에서 사용자에게 **특정 문서로 답변 제공**

### 문서 출력 설정 방법

1. 프롬프트 편집기 우측 상단에서 **Document (preview)** 선택
2. **Document settings** 클릭 후 Word 레이아웃 파일 업로드

### 템플릿 작성 규칙

| 규칙 | 예시 |
|---|---|
| 교체할 필드는 이중 중괄호로 표시 | `{{FirstName}}` |
| 테이블 내 필드는 `테이블명.컬럼명` 형식 | `{{items.quantity}}` |
| 필드명에 공백 사용 불가 | `{{First Name}}` ❌ |

> ⚠️ 레이아웃 파일은 최대 **20MB**, `.docx` 형식만 지원합니다. 비밀번호 보호된 파일은 사용 불가합니다.

### 토픽에서 문서 출력 사용 시 주의사항

클라우드 흐름/에이전트 흐름과 달리, **토픽 내에서는 `Document Output Content Bytes`가 노드 출력으로 직접 제공되지 않습니다.** 사용자가 생성된 문서를 다운로드할 수 있게 하려면 아래 방식을 사용합니다:

1. **클라우드 흐름**을 중간 단계로 사용하여 문서 생성 및 OneDrive/SharePoint에 저장
2. **공유 링크(Sharing Link)** 생성 후 URL을 토픽 변수로 반환
3. 토픽의 메시지 노드에서 다운로드 링크를 사용자에게 전달

```
Your document is ready. [Download it here]({varDocumentURL})
```

### 제한 사항

- Solutions로 환경 이동 시 Word 템플릿은 함께 이동되지 않음 → 대상 환경에서 재업로드 필요
- 저장 후 문서 생성 실패 시 Word 레이아웃을 Document settings에서 재업로드
- 텍스트 서식(굵게, 색상, 제목 등) 지정 미지원
- Word 문서(.docx) 형식만 지원

---

## 실습: JSON 및 문서 출력물 작성

### 실습 목표
### 실습 단계
### 실습 결과 확인

---

## 참고문헌

- [Process prompt responses as JSON output - Microsoft Copilot Studio](https://learn.microsoft.com/en-us/microsoft-copilot-studio/process-responses-json-output)
- [Generate a document output from a prompt - Microsoft Copilot Studio](https://learn.microsoft.com/en-us/microsoft-copilot-studio/generate-document-output-prompt)



