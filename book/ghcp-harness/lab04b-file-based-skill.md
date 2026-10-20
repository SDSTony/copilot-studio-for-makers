# 모듈 5-2. 파일 기반 Skill로 출장 PPT 템플릿 채우기

## 학습 목표

- 지침, PPTX 템플릿, 작성 가이드를 포함한 Skill ZIP을 업로드합니다.
- 새 디자인의 PPT를 만드는 대신 제공된 템플릿의 내용을 채웁니다.
- 생성한 PPT를 검증하고 다음 실습의 실제 파일 전달에 사용합니다.

## 사전 준비와 다운로드

[모듈 5-1](lab04a-instruction-skill.md)의 사전 검토 Skill과 OneDrive Knowledge가 필요합니다.

- {download}`PPT 출장 계획서 Skill 패키지 <assets/trip-plan-report.zip>`
- {download}`PowerPoint 템플릿 원본 <assets/trip-plan-report/assets/trip-plan-template.pptx>`
- {download}`Skill 정의 원본 <assets/trip-plan-report/SKILL.md>`
- {download}`작성 가이드 원본 <assets/trip-plan-report/references/report-writing-guide.md>`

```{important}
PPTX 템플릿은 Knowledge가 아니라 Skill의 출력 양식입니다. 규정은 계속 본인 OneDrive 문서에서 찾습니다. Skill ZIP은 Skills에 업로드하며, 템플릿을 지식 폴더에 추가하지 않습니다.
```

## 1. 템플릿과 패키지 살펴보기

1. 템플릿 원본을 PowerPoint에서 열고 3장 구성과 입력 영역을 확인합니다.
2. 각 슬라이드의 **PPTX-TRAVEL-REPORT-V1** 표식과 **교육용 초안 · 승인 문서 아님** 문구를 확인합니다.
3. `{{...}}`로 표시된 영역만 채우며 배경·색상·도형·글꼴·위치는 유지하는 것이 목표입니다.

| 슬라이드 | 입력할 내용 |
|---|---|
| 1. 출장 개요 | 목적지, 시작일·종료일, 출장 목적 |
| 2. 일정과 준비 사항 | 확인된 일정, 방문 정보, 준비 체크리스트 |
| 3. 예상 경비와 사전 검토 | 예상 총액, 숙박 한도 초과액, 비용 내역, 검토 결과, 별도 확인 사항, 근거 |

ZIP을 열어 다음 구조를 확인합니다. `SKILL.md`는 ZIP의 루트에 있습니다.

```text
trip-plan-report.zip
  SKILL.md
  assets
    trip-plan-template.pptx
  references
    report-writing-guide.md
```

## 2. Skill 업로드

1. **Build → Skills → Add skill → Upload a skill**을 선택합니다.
2. `trip-plan-report.zip`을 업로드합니다. PPTX만 올리지 않습니다.
3. 이름 **trip-plan-report**와 설명을 확인하고 저장합니다.
4. 이전 HTML 버전의 같은 Skill이 있다면 새 ZIP으로 교체합니다. 같은 이름의 두 Skill을 활성화한 채 두지 않습니다.
5. 업로드가 실패하면 ZIP 구조와 메타데이터, 기능 제공 범위를 확인합니다.

```{warning}
패키지 업로드와 생성 파일 기능이 있다는 사실만으로 PPTX 템플릿 편집이 보장되지는 않습니다. 교육 담당자는 이 패키지가 실제 환경에서 템플릿을 읽고 편집한 PPT를 반환하는지 먼저 시험해야 합니다. 새 디자인·HTML·텍스트만 반환되면 이 실습을 통과한 것이 아닙니다.
```

## 3. 정상 입력으로 PPT 만들기

Preview에서 새 대화를 열고 다음 테스트 프롬프트를 보냅니다.

```text
2026-11-10부터 2026-11-12까지 부산에 혼자 고객사 방문 출장을 갑니다.
교통은 KTX 일반석 왕복 120000원, 숙박은 세금 포함 1박당 150000원으로 2박,
기타 비용은 0원입니다.
교육용 규정으로 사전 검토한 뒤 등록된 PPT 템플릿을 채워 출장 계획서를 만들어 주세요.
기존 3장 구성과 디자인을 유지하고, 모르는 방문 시간과 장소는 미확인으로 표시해 주세요.
아직 Excel 등록, 이메일 발송 또는 OneDrive 저장은 하지 마세요.
```

1. Activity trace에서 사전 검토·PPT 생성 Skill과 근거 사용 정보를 확인합니다.
2. 생성 파일 카드에서 **trip-plan.pptx**를 내려받습니다.
3. 원본 템플릿과 결과를 각각 PowerPoint에서 열고 아래 완료 기준을 대조합니다.

| 확인 항목 | 완료 기준 |
|---|---|
| 파일 | 확장자만 PPTX인 파일이 아닌, PowerPoint에서 복구 경고 없이 열리는 실제 PPTX |
| 템플릿 사용 | 3장 순서, 배경, 색상, 도형, 글꼴, 입력 상자 위치 유지 |
| 치환 | `{{DESTINATION}}`, `{{SCHEDULE}}` 등 미치환 영역 없음 |
| 계산 | 숙박 합계 300,000원, 예상 총액 420,000원, 숙박 초과 총액 40,000원 |
| 미확인 정보 | 방문 시간·장소를 임의로 만들지 않음 |
| 형식 | 글자 잘림·겹침·도형 밖 넘침 없음 |
| 경계 | 승인 문서 아님, Excel 등록·메일 발송·OneDrive 저장 없음 |

PPT를 내려받은 사실과 OneDrive에 저장한 사실은 다릅니다. 개인 OneDrive 저장과 본인 이메일 첨부 발송은 모듈 7에서 Workflow로 수행합니다.

## 4. 템플릿을 유지하며 내용 수정

같은 대화에서 다음 메시지를 보냅니다.

```text
출장 목적을 "고객사 요구사항 확인 및 제안 미팅"으로 수정해 주세요.
방문 시간과 장소는 아직 미확인으로 유지하고, PPT 템플릿의 디자인과 3장 구성은 바꾸지 마세요.
```

새로 받은 파일을 열어 목적만 반영되었는지, 기존 비용과 검토 결과가 변하지 않았는지 확인합니다. 최신 파일을 모듈 7에 전달할 대상으로 선택하고, 이전 버전과 혼동하지 않습니다.

## 5. 정보 부족과 긴 내용 테스트

새 대화에서 입력합니다.

```text
부산 고객사 방문용 출장 PPT 초안을 등록된 템플릿으로 만들어 주세요.
날짜와 비용은 아직 모르니 미확인으로 적어 주세요.
목적은 고객 요구사항 확인, 기존 시스템 현황 논의, 보안 요구사항 확인,
일정 조율, 후속 제안 범위 합의입니다. 상자 안에 들어가도록 간결하게 요약해 주세요.
등록과 이메일 발송은 하지 마세요.
```

**기대 결과:** 날짜·비용·총액은 미확인, 내용은 의미를 유지한 요약, 3장 구성과 템플릿 디자인 유지, 임의 정책·금액·실행 결과 없음입니다.

## 6. 다음 실습을 위한 파일 준비

1. 정상 입력으로 생성한 최신 PPT를 로컬에 보관합니다. ZIP이나 빈 템플릿이 아니라 채워진 결과물이어야 합니다.
2. 모듈 6에서 Outlook 관련 MCP로 방문 정보를 읽은 뒤, 필요하면 해당 정보를 반영한 PPT를 다시 생성합니다.
3. 모듈 7에서는 **방금 생성한 파일을 본인에게 첨부 발송하고 동일한 파일을 OneDrive에 저장**합니다.
   [실습 7의 통합 프롬프트](lab06-register-trip-with-workflow.md)에서는 PPT 생성과 Workflow 발송·저장을 하나의 요청으로 실행합니다.
4. 다운로드 카드의 파일명·링크만으로 Workflow가 바이너리에 접근한다고 가정하지 않습니다. 모듈 7의 파일 전달 사전 검증을 통과해야 합니다.

## 문제 해결

| 증상 | 조치 |
|---|---|
| ZIP 검증 실패 | 루트 SKILL.md, UTF-8, name·description, PPTX 포함 여부 확인 |
| 새로운 디자인을 만들어 줌 | 템플릿 실제 접근과 지침 확인. 템플릿 채우기 재시험 |
| PPT가 아닌 텍스트나 HTML 반환 | 실제 PPTX 요청과 생성 오류 확인. 대체 결과를 성공으로 처리하지 않음 |
| 글자가 넘침 | 작성 가이드의 줄 수에 맞게 요약. 원본 상자와 디자인 유지 후 다시 열어 확인 |
| 미확인 값이 0원으로 채워짐 | 모르는 값은 미확인, 확정 합계 금지 지침 확인 |
| 최신 파일을 구분하기 어려움 | 파일명·생성 시점 확인, 전달할 버전을 하나만 선택 |

## 완료 체크리스트

- [ ] PPTX 리소스를 포함한 Skill 패키지를 업로드했습니다.
- [ ] 템플릿을 채운 3장짜리 PPTX를 다운로드하고 열었습니다.
- [ ] 420,000원 총액과 40,000원 초과액, 미확인 정보를 확인했습니다.
- [ ] 디자인 유지, 미치환 영역, 글자 넘침을 확인했습니다.
- [ ] 전달할 실제 최신 PPT 파일을 보관했습니다.

## 참고 자료

- [Skill 파일·ZIP 업로드](https://learn.microsoft.com/microsoft-copilot-studio/agents-experience/skills-add-existing)
- [에이전트 생성 파일](https://learn.microsoft.com/microsoft-copilot-studio/agents-experience/created-files-overview)
- [GHCP 대화에 파일 첨부](https://learn.microsoft.com/microsoft-copilot-studio/agents-experience/attachments-overview)

[이전: 사전 검토 Skill](lab04a-instruction-skill.md) · [다음: Excel 행 추가와 Outlook 관련 MCP](lab05-query-trip-plans.md)
