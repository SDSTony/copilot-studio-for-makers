# 모듈 5-2. 파일 기반 Skill로 출장 PPT 템플릿 채우기

## 학습 목표

- 지침, PPTX 템플릿, 작성 가이드를 포함한 Skill ZIP을 업로드합니다.
- 새 디자인의 PPT를 만드는 대신 제공된 템플릿의 내용을 채웁니다.
- PPT 생성 Skill 추가 전·후의 결과를 비교합니다.
- 생성한 PPT의 구성, 디자인과 내용을 확인합니다.

## 사전 준비와 다운로드

[모듈 5-1](module05-1-instruction-skill.md)의 사전 검토 Skill과 OneDrive Knowledge가 필요합니다.

- {download}`PPT 출장 계획서 Skill 패키지 <assets/trip-plan-report.zip>`

위 Skill 패키지 파일을 다운로드 합니다.

```{important}
PPTX 템플릿은 Knowledge가 아니라 Skill의 출력 양식입니다. 규정은 계속 본인 OneDrive 문서에서 찾습니다. Skill ZIP은 Skills에 업로드하며, 템플릿을 지식 폴더에 추가하지 않습니다.
```

## 1. PPT Skill 없이 먼저 요청하기

[모듈 5-1](module05-1-instruction-skill.md)의 Instructions, OneDrive Knowledge, `trip-precheck` Skill은 유지합니다. 아직 PPT 생성용 `trip-plan-report` Skill과 템플릿은 추가하지 않습니다.

Preview에서 **새 대화**를 열고 다음 요청을 보냅니다.

```text
2026-11-10부터 2026-11-12까지 부산에 혼자 고객사 방문 출장을 갑니다.
교통은 KTX 일반석 왕복 120000원, 숙박은 세금 포함 1박당 150000원으로 2박,
기타 비용은 0원입니다.
교육용 규정으로 사전 검토한 뒤 발표용 PPT 출장 계획서를 만들어 주세요.
```

**관찰할 점:** 실제 PPT 파일을 만드는지, 어떤 구성과 디자인을 사용하는지 살펴봅니다. 파일을 만들지 못하면 어떤 안내를 하는지 확인합니다. Skill 없이도 PPT를 만들 수 있으므로 반드시 실패해야 하는 테스트는 아닙니다. 아직 제공된 템플릿을 사용한 결과는 아닙니다.

## 2. 템플릿과 패키지 살펴보기

1. 다운로드한 ZIP을 PC의 별도 폴더에 압축 해제하고, `assets` 안의 `trip-plan-template.pptx`를 PowerPoint에서 열어 3장 구성과 입력 영역을 확인합니다. 업로드할 원본 ZIP은 그대로 보관합니다.
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

## 3. Skill 업로드

1. **Build → Skills → Add skill → Upload a skill**을 선택합니다.
2. **ZIP 압축 파일인 `trip-plan-report.zip`을 그대로 선택하여 업로드합니다.** 압축을 해제한 폴더가 아니라 원본 ZIP 파일을 올립니다.

## 4. Skill 추가 후 템플릿으로 PPT 만들기

Preview에서 **새 대화**를 열고 아래와 같이 대화창에 입력합니다.

```text
2026-11-10부터 2026-11-12까지 부산에 혼자 고객사 방문 출장을 갑니다.
교통은 KTX 일반석 왕복 120000원, 숙박은 세금 포함 1박당 150000원으로 2박,
기타 비용은 0원입니다.
교육용 규정으로 사전 검토한 뒤 등록된 PPT 템플릿을 채워 출장 계획서를 만들어 주세요.
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

Skill 추가 전 결과와 비교하여, 이번에는 **등록된 템플릿의 3장 구성과 디자인을 유지하면서 출장 내용이 채워졌는지** 확인합니다.

## 완료 체크리스트

- [ ] PPT 생성 Skill 추가 전에 발표용 PPT 요청을 실행하고 결과를 확인했습니다.
- [ ] 패키지에 포함된 원본 템플릿의 3장 구성과 입력 영역을 살펴봤습니다.
- [ ] `trip-plan-report.zip` 원본 ZIP 압축 파일을 Skills에 업로드했습니다.
- [ ] 템플릿을 채운 3장짜리 PPTX를 다운로드하고 열었습니다.
- [ ] Skill 추가 전 결과와 비교하여 등록된 템플릿의 구성과 디자인이 적용되었는지 확인했습니다.

## 참고 자료

- [Skill 파일·ZIP 업로드](https://learn.microsoft.com/microsoft-copilot-studio/agents-experience/skills-add-existing)
- [에이전트 생성 파일](https://learn.microsoft.com/microsoft-copilot-studio/agents-experience/created-files-overview)
- [Microsoft Copilot 하네스 대화에 파일 첨부](https://learn.microsoft.com/microsoft-copilot-studio/agents-experience/attachments-overview)

[이전: 사전 검토 Skill](module05-1-instruction-skill.md) · [다음: Excel 행 추가와 Outlook 관련 MCP](module06-query-trip-plans.md)
