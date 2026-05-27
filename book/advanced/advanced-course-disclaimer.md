# 심화 과정 안내

> 이 심화 과정은 [Microsoft Copilot Studio Guidance](https://learn.microsoft.com/en-us/microsoft-copilot-studio/guidance/overview)의 핵심 프레임워크(Plan → Implement → Adopt → Manage → Improve)을 기반으로 작성되었으며, 그 중 Plan과 Implement 단계에 해당하는 내용을 다룹니다. 

> Plan 단계에서는 에이전트를 본격적으로 구축하기 전 목표와 KPI를 설정하고, 에이전트 설계 프레임워크를 활용하여 설계 방향을 정의하는 과정을 살펴봅니다. Implement 단계에서는 Copilot Studio를 활용하여 에이전트를 설계, 구축, 배포하는 방법에 대한 모범 사례와 실제 현장에서 자주 보이는 패턴들을 안내합니다.

---

## ⏰ 워크샵 시간표 (9:30 – 17:00)

> 개념 설명과 실습을 병행합니다.

| 시간 | 세션 | 내용 |
|---|---|---|
| 09:30 – 10:00 | **오리엔테이션** | 심화 과정 안내, 소프트웨어 개발 마인드셋 |
| 10:00 – 10:30 | **Plan: 프로젝트 목표와 KPI 설정** | KPI 정의, 성공 지표 수립 방법 |
| 10:30 – 11:00 | **Plan: 에이전트 설계 프레임워크** | Agent Design Canvas 9개 블록 이해 및 작성 실습 |
| 11:00 – 11:45 | **Instructions & Knowledge 모범 사례** | 지침 작성 원칙, RAG 이해, 지식 소스 구성 방법 |
| 11:45 – 12:30 | **고급 Topic Trigger & YAML 편집 / OData 쿼리** | 고급 트리거 소개, OData $filter / $select 실습 |
| 12:30 – 13:30 | *점심 (1시간)* | |
| 13:30 – 14:15 | **외부 API 호출 실습** | HTTP 노드로 TheMealDB API 호출 에이전트 구축 |
| 14:15 – 15:00 | **이미지 & PDF 처리 에이전트 구축** | 파일 전달 JSON 구조, 이력서 분석 에이전트 실습 |
| 15:00 – 15:45 | **프롬프트 도구로 JSON & 문서 출력물 작성** | JSON 출력 / Word 문서 출력 개념 및 실습 |
| 15:45 – 16:30 | **HILT 프로세스 / Agent Flow 모범 사례** | 승인 흐름 구축, Schema Mismatch, 이미지 전달 패턴 |
| 16:30 – 17:00 | **이메일 템플릿 에이전트 / Teams 배포 / Q&A** | Outlook HTML 활용 이메일 에이전트, Teams 배포 모범 사례, 질의응답 |

---

## ⚠️ 중요: Microsoft Learn을 Source of Truth로

> 📌 **Copilot Studio의 기능과 기술 스펙은 지속적으로 업데이트됩니다.**

Copilot Studio는 Microsoft의 빠른 제품 릴리즈 주기에 따라 기능이 추가·변경·개선되고 있습니다. 본 워크샵 문서는 업데이트 주기가 Microsoft Learn에 비해 빈번하지 않기 때문에, **항상 최신 공식 문서인 Microsoft Learn을 기본 참고 자료(Source of Truth)로 활용**해 주시기 바랍니다.

- 🔗 [Microsoft Copilot Studio 공식 문서](https://learn.microsoft.com/en-us/microsoft-copilot-studio/)
- 🔗 [Copilot Studio Guidance (모범 사례)](https://learn.microsoft.com/en-us/microsoft-copilot-studio/guidance/overview)

> 본 워크샵 문서에서 소개하는 UI 화면, 메뉴명, 옵션 등은 실제 제품과 다를 수 있습니다. 실제 제품은 빈번하게 업데이트가 되고 있습니다.

---

## 사전 안내: 심화 과정을 시작하기 전에

Copilot Studio는 에이전트 개발의 진입 장벽을 크게 낮춰준 도구입니다. 코드를 직접 작성하지 않아도 대화형 에이전트를 빠르게 만들 수 있다는 점은 분명한 강점입니다.

그러나 **현업의 다양한 시나리오를 안정적으로 처리하는 에이전트를 구축하려면**, 결국 **소프트웨어를 개발한다는 마음가짐으로 접근**할 수밖에 없습니다.

실제로 심화 과정을 진행하다 보면 전통적인 소프트웨어 개발에서 적용되는 개념들이 자연스럽게 등장합니다:

| 개념 | 에이전트 개발에서의 적용 예시 |
|---|---|
| **데이터 타입 및 스키마 설계** | Agent Flow 입출력 변수 타입 정의, JSON 구조 설계 |
| **인증 및 보안** | API Key, Bearer Token, RLS(행 수준 보안) 적용 |
| **오류 처리 (Error Handling)** | HTTP 응답 코드 분기, 예외 처리 흐름 구성 |
| **REST API 이해** | HTTP 메서드(GET/POST/PATCH), URL 파라미터, 요청/응답 구조 |
| **쿼리 언어** | OData $filter / $select, PowerFx 수식 작성 |
| **비동기 처리** | Human-in-the-Loop 비동기 승인 흐름 설계 |
| **모듈화 및 재사용** | 공통 토픽, 공유 도구, 재사용 가능한 Agent Flow 설계 |
| **테스트 및 검증** | 테스트 패널 활용, 엣지 케이스 확인 |

> ⚠️ **이 부분은 Copilot Studio의 light user 분들께 다소 낯설게 느껴질 수 있습니다.** 코드를 직접 작성하지는 않더라도, 위와 같은 개념들을 이해하고 있어야 안정적인 에이전트를 구축할 수 있습니다. 심화 과정은 이러한 개념들을 Copilot Studio의 맥락 안에서 실습을 통해 익혀나가는 것을 목표로 합니다.

---

> 💭 **미래에 대한 단상**
>
> 언젠가는 "Copilot Studio에서 자연어로 목적만 잘 설명하면, 위에서 언급된 모든 세부 기술적 구현을 AI가 자동으로 처리해주는" 날이 올 수도 있습니다. 추상화된 언어인 자연어가 Copilot Studio 상의 모든 세부 설정과 PowerFx 함수, expression 함수 등을 대체하는 시대가 완전히 열린다면, 지금과 같은 방식의 개발은 크게 달라질 것입니다.
>
> 다만, **2026년 현재 시점에서는** 아직 그 수준에 도달하지 않았습니다. 데이터 타입, 오류 처리, 인증, 쿼리 설계 등 위에서 언급한 세부 부분들은 여전히 **메이커가 직접 Copilot Studio 안에서 이해하고 설정해야 하는 영역**입니다. 이 점을 염두에 두고 심화 과정에 임해 주시기 바랍니다.