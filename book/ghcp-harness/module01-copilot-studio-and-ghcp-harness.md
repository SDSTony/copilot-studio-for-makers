# 모듈 1. Copilot Studio와 GHCP 하네스 에이전트 소개

## 학습 목표

- Copilot Studio에서 에이전트와 Workflow가 맡는 역할을 구분합니다.
- Standard 하네스와 GHCP 하네스의 작성 방식 차이를 이해합니다.
- 이번 과정의 에이전트 구성과 개인별 데이터 흐름을 이해합니다.

```{warning}
GHCP 하네스 관련 기능은 환경과 릴리스 시점에 따라 화면이나 제공 범위가 다를 수 있습니다. 이 과정은 GHCP 하네스 화면을 기준으로 하며, 기존 기본 과정의 Classic UI 전환 안내를 적용하지 않습니다. 메뉴가 없다면 다른 하네스로 대체하지 말고 교육 담당자에게 환경과 권한을 확인하세요.
```

## 1. Copilot Studio와 하네스 이해하기

Copilot Studio는 지식에 답변하고 도구를 사용하여 업무를 수행하는 에이전트와, 정해진 순서로 작업을 자동화하는 Workflow를 만드는 서비스입니다.

**하네스(Harness)**는 요청을 해석하고 에이전트의 구성 요소를 사용하여 작업을 수행하는 기반입니다. GHCP는 GitHub Copilot의 약칭이지만, 이 과정은 VS Code의 GitHub Copilot을 사용하는 개발 과정이 아닙니다. Copilot Studio 안의 **GitHub Copilot 하네스**를 사용합니다.

| 구분 | Standard 하네스 | GHCP 하네스 |
|---|---|---|
| 작성 방식 | 토픽, 트리거, 명시적인 대화 흐름과 생성형 오케스트레이션을 활용 | Instructions와 구성 요소를 중심으로 요청 해석과 다단계 작업을 구성 |
| 절차 표현 | 토픽의 질문·조건·작업 노드 등 | 요청별 Skill과 Tool 선택, 필요한 경우 결정적인 Workflow 호출 |
| 이번 과정에서의 사용 | 개념 비교만 수행 | 모든 실습 에이전트와 Workflow에 사용 |

Standard 하네스도 생성형 기능을 지원하므로 단순히 "규칙 기반 대 AI 기반"으로 구분하지 않습니다. 하네스별 작성 모델과 제공 기능의 차이에 주목합니다. 서로 다른 하네스의 에이전트를 그대로 변환하는 과정도 아닙니다.

## 2. 출장 준비 도우미의 구성 살펴보기

| 구성 요소 | 이번 실습에서 담당할 일 |
|---|---|
| Instructions | 역할, 지원 범위, 근거 없는 승인 금지, 등록 전 확인 |
| Knowledge | 개인 OneDrive의 출장 규정·경비 기준·준비 가이드 |
| Skill: `trip-precheck` | 일정과 비용 확인, 계산, 정책 검토, 체크리스트 작성 |
| Skill: `trip-plan-report` | 패키지에 포함된 PPTX 템플릿의 3장을 채워 출장 계획서 생성 |
| Tool: 출장 계획 등록 | Excel 커넥터의 행 추가 작업으로 개인 출장 목록에 등록 |
| Outlook 관련 MCP | Work IQ (Preview)의 메일 조회 도구로 본인에게 온 방문 안내 확인 |
| Workflow Tool: 출장 PPT 전달 | 본인에게 PPT 첨부 이메일 발송 후 같은 파일을 개인 OneDrive에 저장 |

Knowledge는 **규정의 근거**, Excel은 **현재 기록**, Skill은 **수행 방법**, Workflow는 **정해진 처리 순서**입니다. 같은 파일이라는 이유로 모두 Knowledge에 넣지 않습니다.

```{important}
에이전트는 출장 승인, 호텔 예약, 결제, 경비 지급을 수행하지 않습니다. PPT 생성, Excel 등록, 이메일 첨부 발송, OneDrive 저장은 각각 별개의 결과입니다. Outlook 메일은 Tool로 읽는 데이터이며 Knowledge가 아닙니다.
```

## 3. 네 개의 탭 살펴보기

1. 강사의 데모 에이전트 또는 GHCP 하네스 에이전트 화면을 엽니다. 모듈 2에서 실습용 솔루션을 준비하고, 개인 에이전트 생성은 모듈 3에서 진행합니다.
2. **Build**에서 Instructions, Knowledge, Skills, Tools 구성 위치를 확인합니다.
3. **Preview**에서 대화를 테스트하고 출처와 도구 실행 정보를 관찰합니다.
4. **Evaluate**에서 반복 실행할 테스트 세트를 관리하는 위치를 확인합니다.
5. **Monitor**에서 게시 후 운영 세션, 결과, 피드백, 사용량을 확인하는 위치를 봅니다. 아직 사용하지 않은 에이전트의 빈 화면은 정상입니다.

## 4. 최종 모습 데모

완성된 강사 데모 에이전트에 다음 메시지를 보냅니다.

```text
2026-11-10부터 2026-11-12까지 부산에 혼자 고객사 방문 출장을 갑니다.
왕복 교통비는 120000원, 세금 포함 숙박비는 1박당 150000원,
숙박은 2박이고 기타 비용은 0원입니다.
교육용 출장 규정에 맞는지 검토하고 등록된 PPT 템플릿으로 출장 계획서를 만들어 주세요.
아직 목록 등록, 이메일 발송 또는 OneDrive 저장은 하지 마세요.
```

**관찰할 결과**

- 제공된 정책의 1박당 숙박 한도 130,000원을 찾습니다.
- 예상 총액 420,000원, 숙박 한도 초과 총액 40,000원을 구분합니다.
- 계획서는 초안이며 승인·등록·메일 발송이 아님을 알립니다.
- 제공된 PPTX 템플릿을 사용한 3장짜리 파일을 내려받을 수 있습니다.

이 숫자는 실제 회사 정책이 아니라 과정에서 제공하는 **가상 교육용 정책**의 값입니다.

## 완료 체크리스트

- [ ] Knowledge와 Excel Tool의 차이를 설명할 수 있습니다.
- [ ] Instructions, Skill, Workflow의 역할을 구분할 수 있습니다.
- [ ] Build → Preview → Evaluate → 게시 → Monitor 흐름을 이해합니다.
- [ ] 개인별 OneDrive와 본인 이메일 외의 공용 저장소를 만들지 않습니다.

## 참고 자료

- [GHCP 하네스 에이전트 개요](https://learn.microsoft.com/microsoft-copilot-studio/agents-experience/overview)
- [Copilot Studio의 하네스](https://learn.microsoft.com/microsoft-copilot-studio/harnesses-overview)
- [GHCP Workflow 개요](https://learn.microsoft.com/microsoft-copilot-studio/workflows-experience/flows-overview)

[이전: 과정 안내](course-overview.md) · [다음: 실습용 솔루션 만들기](lab02-create-solution.md)
