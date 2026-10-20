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

마지막에는 별도의 자동 실행 Workflow를 만들어, 본인 OneDrive의 incoming 폴더에 새로 업로드한 문서를 요약하여 본인 이메일로 받습니다.

```{important}
실습 범위는 사전 검토와 계획 등록입니다. 에이전트가 출장을 승인하거나 실제 예약·결제를 수행하지 않습니다. 규정에 없는 내용이나 확인되지 않은 정보를 임의로 만들지 않도록 구성합니다.
```

---

## 개인별 실습 환경과 자료

공용 SharePoint 사이트나 Teams 팀을 만들지 않고, 각자의 교육 계정과 OneDrive for Business를 사용합니다. 모든 지식 소스는 개인 OneDrive의 교육용 문서로 연결하며, 공용 저장소나 공개 웹사이트를 지식 소스로 추가하지 않습니다.

| 구분 | 교육용 자료 | 연결 및 사용 방식 |
|---|---|---|
| Knowledge | 출장 규정, 경비 기준, 출장 준비 가이드 | 제공된 문서를 각자의 OneDrive에 업로드한 뒤, OneDrive for Business 지식 소스로 연결 |
| 등록 데이터 | 샘플 출장 계획이 들어 있는 Excel | 개인 OneDrive에 저장하고 Excel Online (Business)의 행 추가 Tool로 등록 |
| 파일 기반 Skill | Skill 지침, 3장짜리 PPTX 출장 계획서 템플릿, 작성 가이드 | 제공된 ZIP 패키지를 Skills에 업로드 |
| 메일 조회 | 본인에게 보낸 교육용 출장 방문 안내 메일 | Work IQ (Preview) MCP의 메일 조회 기능 사용. Knowledge가 아닌 Tool 데이터 |
| 파일 전달 | Skill로 생성한 실제 PPTX | Workflow에서 본인 Outlook으로 첨부 발송 후 개인 OneDrive의 reports 폴더에 동일한 파일 저장 |
| 업로드 문서 요약 | 제공된 교육용 국내 출장 규정 Word 파일 | 별도 incoming 폴더의 새 파일 업로드 감지 → Workflow 전용 Agent 요약 → 본인 Outlook으로 요약 발송 |

출장 기록 Excel은 현재 상태를 조회하고 변경하는 데이터이므로 Knowledge로 연결하지 않습니다. Skill에 포함된 템플릿과 작성 가이드도 지식 소스가 아니라 보고서 생성에 사용하는 Skill 리소스입니다.

```{note}
개인용 Microsoft 계정이 아니라 OneDrive for Business와 Outlook이 제공되는 회사·교육 계정을 기준으로 합니다. GHCP 하네스 사용, 에이전트와 Workflow 생성, 커넥터 연결, 게시에 필요한 권한과 Copilot Credits를 사전에 확인해야 합니다. Work IQ (Preview) MCP는 조직의 활성화·인증·사용 정책 및 별도 지출 정책 확인이 필요할 수 있습니다. 조직의 데이터 정책에 따라 연결이 제한될 수 있습니다.
```

각자 제공된 자료의 복사본을 사용하며, OneDrive 전체가 아닌 실습에 필요한 문서나 폴더만 지식 소스로 선택합니다. 지식 소스 처리가 완료된 뒤 Preview에서 문서에 근거한 답변을 확인합니다.

---

## 과정 구성

모듈 1에서 개념과 완성 모습을 살펴보고, 모듈 2에서 실습용 솔루션을 만든 뒤 모듈 3부터 동일한 에이전트를 단계적으로 확장합니다. 각 가이드에는 설정 절차, 테스트 프롬프트 또는 설정 확인 예시, 기대 결과와 완료 체크리스트가 있습니다. 솔루션은 새 환경이 아니라 담당자가 지정한 기존 교육 환경에 만듭니다.

| 모듈 | 주제 | 주요 내용 |
|---|---|---|
| 1 | [Copilot Studio 소개와 GHCP 하네스 에이전트 소개](module01-copilot-studio-and-ghcp-harness.md) | 하네스 개념, Standard와의 차이, 구성 요소와 Build·Preview·Evaluate·Monitor 소개 |
| 2 | [실습용 솔루션 만들기와 초기 설정](lab02-create-solution.md) | 교육 환경 선택, 개인별 비관리형 솔루션·게시자·선호 솔루션 설정 |
| 3 | [첫 에이전트 만들기와 Instructions 작성](lab02-create-agent-and-instructions.md) | 솔루션·언어 설정, 에이전트 생성, Instructions 작성 전·후 Preview 비교 |
| 4 | [OneDrive의 문서를 Knowledge로 연결하기](lab03-onedrive-knowledge.md) | 출장 규정·경비 기준·준비 가이드 연결, 근거 기반 답변 확인 |
| 5-1 | [Instructions 기반 Skill 만들기](lab04a-instruction-skill.md) | 사전 검토 Skill 추가 전·후 Preview 비교, 비용 계산·규정 검토 절차 확인 |
| 5-2 | [파일 기반 Skill로 출장 PPT 템플릿 채우기](lab04b-file-based-skill.md) | PPTX 템플릿을 포함한 Skill 패키지 업로드, 3장짜리 PPT 생성과 결과 확인 |
| 6 | [Excel 행 추가 Tool과 Outlook 관련 MCP](lab05-query-trip-plans.md) | 6열 Excel 다운로드·행 추가, 메일 조회, 각 도구 추가 전·후 Preview 비교 |
| 7 | [파일 발송·저장 Workflow를 만들고 에이전트에 추가하기](lab06-register-trip-with-workflow.md) | 파일 입력 → 메일 발송 → OneDrive 저장 → 응답 구성, 게시 후 에이전트 Tool로 추가·비교 |
| 8 | [Evaluate에서 지식 기반 질문 2개로 평가하기](lab08-evaluate-and-improve.md) | 화면에서 질문·기대응답 수기 입력, OneDrive 지식 기반 답변 평가·재평가 |
| 9 | [에이전트 게시와 Monitor로 운영 살펴보기](lab09-publish-and-monitor.md) | 허용된 채널에 게시, 실제 사용 후 세션·결과·사용량 확인 |
| 10 | [OneDrive 업로드 파일을 요약하여 이메일로 받기](lab10-summarize-uploaded-file.md) | 파일 생성 트리거 → Agent 요약 → 본인 이메일 발송, 실제 업로드로 검증 |

Preview는 에이전트 생성 후 각 실습에서 사용합니다. 모듈 8에서는 Evaluate 화면에 지식 기반 질문 2개를 직접 입력하여 평가합니다. 실제 Excel 등록, MCP 메일 조회, 이메일 첨부파일, OneDrive 저장 파일은 해당 실습에서 응답 평가와 별도로 확인합니다. Monitor 실습은 게시된 에이전트를 사용하고 운영 데이터가 반영된 뒤 진행합니다.

모듈 10은 채팅 호출과 다른 **파일 업로드 기반 자동 실행** 실습입니다. 교육 담당자는 OneDrive 생성 트리거, Agent의 Word 파일 콘텐츠 처리, 본인 Outlook 발송을 사전 확인합니다. 실습 후 해당 Workflow를 비활성화합니다.

```{important}
PPTX 템플릿 채우기는 기본 실습입니다. 교육 담당자는 템플릿 편집, Work IQ MCP 메일 조회, 생성된 PPT의 실제 파일 콘텐츠를 Workflow로 전달하는 경로를 실제 교육 환경에서 사전 검증해야 합니다. 파일 생성·첨부 기능만으로 바이너리 전달을 보장하지 않습니다. 해당 경로가 지원되지 않으면 제한을 알리고 모듈 7을 중단하며, 링크나 텍스트 파일로 대체하여 완료 처리하지 않습니다.
```

---

## 실습 자료 다운로드

**촬영용:** {download}`실습 구간 구분용 제목 슬라이드 10장 <assets/ghcp-harness-recording-titles.pptx>` — 실습 1·2의 소개와 환경 준비는 한 장으로 합치고, 나머지는 실습별 한 장입니다.

| 자료 | 용도 |
|---|---|
| {download}`교육용 국내 출장 규정 <assets/domestic-travel-policy.docx>` | OneDrive Knowledge |
| {download}`교육용 경비 기준 <assets/expense-rules.docx>` | OneDrive Knowledge |
| {download}`교육용 출장 준비 가이드 <assets/travel-checklist.docx>` | OneDrive Knowledge |
| {download}`출장 계획 Excel <assets/trip-plans.xlsx>` | 개인 OneDrive의 조회·등록 데이터, 테이블 이름 TripPlans |
| {download}`PPT 출장 계획서 Skill <assets/trip-plan-report.zip>` | Skills에 업로드할 패키지 |
| {download}`출장 PPT 템플릿 <assets/trip-plan-report/assets/trip-plan-template.pptx>` | 3장짜리 원본 템플릿 확인 |

학습자는 내려받은 자료로 실습하면 됩니다. 자료 유지보수자는 {download}`자료 관리 안내 <assets/README.md>`의 생성 도구를 사용해 원본과 다운로드 파일을 함께 갱신할 수 있습니다.

---

## 참고 자료

- [GHCP 하네스 에이전트의 지식 소스 연결](https://learn.microsoft.com/microsoft-copilot-studio/agents-experience/knowledge-add-existing-copilot)
- [Excel Online (Business) 커넥터](https://learn.microsoft.com/en-us/connectors/excelonlinebusiness/)
