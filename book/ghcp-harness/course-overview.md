# 과정 안내

**GHCP 하네스 과정**은 GitHub Copilot(GHCP) 하네스 기반의 Copilot Studio 에이전트를 구축하는 방법을 다루는 튜토리얼입니다.

---

## 교육 대상자

- Copilot Studio를 완전히 처음 접하는 분
- Standard 하네스를 사용하다가 GHCP 하네스를 사용해 보고자 하는 분

Copilot Studio 사전 사용 경험 없이도 참여할 수 있으며, Standard 하네스 사용 경험이 있는 분도 GHCP 하네스를 활용한 에이전트 구축 방법을 학습할 수 있습니다.

---

## 학습 목표

이 과정에서는 다음 내용을 학습하는 것을 목표로 합니다.

- GHCP 하네스 에이전트의 개념과 활용 시나리오 이해
- 에이전트 구축에 필요한 개발 환경과 작업 흐름 준비
- Instructions, Knowledge, Skills, Tools, Workflow를 활용한 GHCP 하네스 에이전트 설계 및 구현
- 구축한 에이전트의 동작 검증과 개선

---

## 실습 시나리오: 출장 준비 및 경비 사전 검토 에이전트

하나의 에이전트에 기능을 단계적으로 추가하여 출장 규정 안내, 일정과 예상 비용의 사전 검토, PPT 템플릿 채우기, Excel 행 추가, Outlook 관련 MCP를 통한 방문 안내 조회, PPT 이메일 첨부 발송과 OneDrive 저장까지 완성합니다.

예를 들어 다음 요청을 처리하는 에이전트를 만듭니다.

> 다음 달 부산에 2박 3일 출장을 가려고 해요. 고객사 방문이 목적이고, 교통비는 12만 원, 숙박비는 1박당 15만 원으로 예상합니다. 출장 규정에 맞는지 검토하고 출장 계획서를 만들어 주세요.

에이전트는 필요한 정보를 확인하고 교육용 출장 규정에 근거해 예상 비용을 검토합니다. 이후 등록된 PPTX 템플릿을 채워 계획서를 만들고, 사용자 확인을 거쳐 Excel Tool로 출장 목록에 행을 추가합니다. Outlook 관련 MCP로 본인의 방문 안내 메일을 읽어 계획을 보완하고, 별도 확인 후 Workflow로 실제 PPT를 본인에게 이메일 첨부 발송한 다음 같은 파일을 개인 OneDrive에 저장합니다.

마지막에는 별도의 자동 실행 Workflow를 만들어, 본인 OneDrive의 `GHCP-Workflow-Lab` 폴더에 새로 업로드한 문서를 추출·요약하여 Teams 메시지로 받습니다.

아래는 이번 실습에서 만들 에이전트의 구성 예시입니다. Instructions, Skills, Tools, Knowledge를 연결한 모습을 확인할 수 있습니다.

![출장 준비 도우미의 Instructions, Skills, Tools, Knowledge 구성 예시](imgs/travel-agent-structure.png)

---

## 과정 구성

모듈 1에서 개념과 완성 모습을 살펴보고, 모듈 2에서 실습용 솔루션을 만든 뒤 모듈 3부터 동일한 에이전트를 단계적으로 확장합니다. 각 가이드에는 설정 절차, 테스트 프롬프트 또는 설정 확인 예시, 기대 결과와 완료 체크리스트가 있습니다. 회사에서 안내한 Power Platform 환경에서 구축합니다.

| 모듈 | 주제 | 주요 내용 |
|---|---|---|
| 1 | [Copilot Studio 소개와 GHCP 하네스 에이전트 소개](module01-copilot-studio-and-ghcp-harness.md) | 하네스 개념, Standard와의 차이, 구성 요소와 Build·Preview·Evaluate·Monitor 소개 |
| 2 | [실습용 솔루션 만들기와 초기 설정](module02-create-solution.md) | 회사 정책에 따른 환경 선택, 개인별 비관리형 솔루션·새 게시자 생성 |
| 3 | [첫 에이전트 만들기와 Instructions 작성](module03-create-agent-and-instructions.md) | 솔루션·언어 설정, 에이전트 생성, Instructions 작성 전·후 Preview 비교 |
| 4 | [OneDrive의 문서를 Knowledge로 연결하기](module04-onedrive-knowledge.md) | OneDrive 폴더 준비, 지식 연결 전·후 같은 질문으로 답변·문서 근거 비교 |
| 5-1 | [Instructions 기반 Skill 만들기](module05-1-instruction-skill.md) | 사전 검토 Skill 추가 전·후 Preview 비교, 비용 계산·규정 검토 절차 확인 |
| 5-2 | [파일 기반 Skill로 출장 PPT 템플릿 채우기](module05-2-file-based-skill.md) | PPT Skill 추가 전 생성 요청, 패키지 업로드 후 템플릿을 채운 PPT와 비교 |
| 6 | [Excel 행 추가 Tool과 Outlook 관련 MCP](module06-query-trip-plans.md) | 6열 Excel 다운로드·행 추가, 메일 조회, 각 도구 추가 전·후 Preview 비교 |
| 7 | [파일 발송·저장 Workflow를 만들고 에이전트에 추가하기](module07-register-trip-with-workflow.md) | 파일 입력 → 메일 발송 → OneDrive 저장 → 응답 구성, 게시 후 에이전트 Tool로 추가·비교 |
| 8 | [Evaluate에서 지식 기반 질문 2개로 평가하기](module08-evaluate-and-improve.md) | 화면에서 질문 2개 입력, 테스트 세트로 묶어 일괄 평가·결과 확인 |
| 9 | [에이전트 게시와 모니터로 사용 현황 살펴보기](module09-publish-and-monitor.md) | 게시 채널에서 대화, 하루 정도 뒤 모니터의 사용 지표·세션 확인 |
| 10 | [OneDrive 업로드 파일을 요약하여 Teams로 받기](module10-summarize-uploaded-file.md) | 파일 생성 트리거 → 추출 → 에이전트 요약 → 자신에게 메시지 게시 |

---

## 실습 자료 다운로드

| 자료 | 용도 |
|---|---|
| {download}`교육용 국내 출장 규정 <assets/domestic-travel-policy.docx>` | OneDrive Knowledge |
| {download}`교육용 경비 기준 <assets/expense-rules.docx>` | OneDrive Knowledge |
| {download}`교육용 출장 준비 가이드 <assets/travel-checklist.docx>` | OneDrive Knowledge |
| {download}`출장 계획 Excel <assets/trip-plans.xlsx>` | 개인 OneDrive의 조회·등록 데이터, 테이블 이름 TripPlans |
| {download}`PPT 출장 계획서 Skill <assets/trip-plan-report.zip>` | Skills에 업로드할 패키지 |
| {download}`출장 PPT 템플릿 <assets/trip-plan-report/assets/trip-plan-template.pptx>` | 3장짜리 원본 템플릿 확인 |

---

## 참고 자료

- [GHCP 하네스 에이전트의 지식 소스 연결](https://learn.microsoft.com/microsoft-copilot-studio/agents-experience/knowledge-add-existing-copilot)
- [Excel Online (Business) 커넥터](https://learn.microsoft.com/en-us/connectors/excelonlinebusiness/)
