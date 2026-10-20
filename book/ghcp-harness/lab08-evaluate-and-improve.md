# 실습 8. Evaluate에서 지식 기반 질문 2개로 평가하기

## 학습 목표

- Evaluate 화면에서 테스트 케이스 2개를 직접 입력합니다.
- OneDrive Knowledge를 근거로 정확히 답하는지 평가합니다.
- 결과를 확인하고 필요한 내용을 개선한 뒤 다시 평가합니다.

## 준비

- **출장 준비 도우미**와 기존 Instructions를 사용합니다.
- 본인 OneDrive의 `domestic-travel-policy.docx`, `expense-rules.docx`, `travel-checklist.docx`가 Knowledge에 연결되어 검색 가능한 상태여야 합니다.
- Evaluate 사용 권한과 Copilot Credits를 확인합니다. 평가 실행도 사용량에 포함됩니다.

이번에는 파일 업로드 없이 **화면에서 수기로 입력**합니다. 아래 질문과 기대응답을 각각 복사해 붙여 넣으면 됩니다.

## 1. 답변만 평가하도록 준비

1. 현재 Tool과 Skill의 연결·입력 설정을 기록합니다.
2. 평가 중 실제 쓰기가 일어나지 않도록 **Excel 행 추가 Tool과 발송·저장 Workflow를 에이전트에서 임시 연결 해제**합니다. 원본 Workflow나 연결 자체를 삭제하지 않습니다.
3. 이번 평가는 문서 지식만 확인하므로 **Work IQ MCP와 PPT 생성 Skill도 임시 연결 해제**합니다. 기존 Instructions, OneDrive Knowledge와 `trip-precheck`는 유지합니다. 다른 외부 실행 도구가 있다면 함께 연결 해제합니다.

평가용 구성은 게시하지 않습니다. 평가가 끝나면 원래 구성을 복원합니다.

## 2. Evaluate에서 수기로 테스트 케이스 만들기

1. 에이전트의 **Evaluate > New evaluation**을 엽니다.
2. **More ways to start > Or, write some questions yourself**를 선택합니다.
3. **Add conversations > Write**에서 아래 첫 번째 질문과 기대응답을 입력합니다.
4. 두 번째 케이스도 **별도 대화**로 추가합니다. 한 대화에 두 질문을 이어 넣지 않습니다.

메뉴 이름이 다르면 현재 화면의 **직접 질문 작성** 경로를 사용합니다. 해당 기능이 제공되지 않으면 교육 담당자에게 확인합니다.

### 테스트 케이스 1. 국내 숙박비 한도

**User question**

```text
교육용 국내 출장 규정에서 숙박비는 세금을 포함해 1인 1박당 얼마까지인가요?
한도를 초과하면 어떻게 안내해야 하나요? 근거 문서도 알려 주세요.
```

**Expected agent response**

```text
숙박비 한도는 세금을 포함해 1인 1박당 130,000원이다.
한도를 초과하면 "한도 초과"로 표시하고 별도 검토가 필요함을 안내한다.
이는 출장 승인이 아니라 사전 검토 기준이다.
근거는 "교육용 국내 출장 규정"의 "숙박 기준"이다.
```

### 테스트 케이스 2. 교통비 기준

**User question**

```text
교육용 경비 기준에 교통비의 고정 금액 한도가 정해져 있나요?
어떤 교통수단과 금액 범위로 계획해야 하는지 근거 문서와 함께 알려 주세요.
```

**Expected agent response**

```text
이 자료에는 교통비의 고정 금액 한도가 없다. 임의의 상한 금액을 만들지 않는다.
대중교통 또는 일반석을 기준으로 계획하고, 출장 전체의 왕복 예상 금액을 입력한다.
실제 정산 시 증빙이 필요하다는 안내만 제공하며 실제 정산은 수행하지 않는다.
근거는 "교육용 경비 기준"의 "교통비"이다.
```

## 3. 평가 실행

1. **Review your test cases**에서 독립된 케이스가 **2개**인지, 질문과 기대응답이 올바르게 들어갔는지 확인합니다.
2. 테스트 세트 이름을 **출장 규정 지식 확인 v1**로 지정합니다.
3. Test method는 **General quality**를 선택합니다. User profile은 Knowledge에 접근할 수 있는 **본인 계정**인지 확인합니다.
4. 저장한 뒤 **Evaluate**를 한 번 실행하고 완료를 기다립니다.

## 4. 결과 확인과 재평가

**Recent results**에서 실행 결과를 열고 각 케이스의 실제 답변·평가 결과와 사용 가능한 근거 정보를 확인합니다. 화면에서 출처가 보이지 않으면 해당 질문을 Preview에서도 확인하되, 이것을 평가 실행 자체의 출처 확인으로 기록하지 않습니다.

| 케이스 | 사람이 확인할 내용 |
|---|---|
| 1 | 세금 포함·1인 1박·130,000원이 정확하고, 초과 시 별도 검토와 올바른 문서 근거를 안내하는가? |
| 2 | 고정 금액 한도를 만들지 않고, 대중교통/일반석·전체 왕복 예상 금액·올바른 문서 근거를 안내하는가? |

문장이 기대응답과 똑같을 필요는 없습니다. **핵심 내용이 맞는지** 확인합니다. 수업 완료 기준은 두 케이스 모두 내용이 정확하고 실제 행 추가·메일 발송·파일 저장이 없는 것입니다. 두 질문만으로 에이전트 전체 품질이나 도구 실행 성공이 검증되지는 않습니다.

답변이 틀리거나 근거가 없으면 다음 순서로 확인합니다.

1. OneDrive 원문과 Knowledge 연결·처리 상태를 확인합니다.
2. 근거 없이 금액을 추측했다면 Instructions의 규정 확인 원칙을 점검합니다.
3. 필요한 부분만 수정한 뒤 **같은 두 케이스로 재평가**하고 이전 답변과 비교합니다. 점수를 올리려고 기대응답을 잘못된 답변에 맞추지 않습니다.

## 5. 원래 구성 복원

1. 기록해 둔 Excel Tool, Workflow, Work IQ MCP, PPT 생성 Skill을 다시 연결합니다.
2. 본인 파일·표·수신자·폴더와 Workflow의 **File Content** 매핑을 확인합니다.
3. 새 Preview 대화에서 규정 질문을 한 번 확인합니다. 복원 확인만을 위해 메일 발송이나 Excel 등록을 반복하지 않습니다.
4. [실습 9](lab09-publish-and-monitor.md)로 진행합니다.

## 완료 체크리스트

- [ ] Evaluate에서 질문과 기대응답을 수기로 입력하여 독립 케이스 2개를 만들었습니다.
- [ ] 본인 Knowledge 접근 계정으로 평가를 실행했습니다.
- [ ] 실제 답변의 내용과 문서 근거를 확인했습니다.
- [ ] 필요하면 같은 두 질문으로 재평가했습니다.
- [ ] 실제 쓰기 없이 평가를 마치고 원래 구성을 복원했습니다.

## 참고 자료

- [GHCP 평가 테스트 세트 만들기](https://learn.microsoft.com/microsoft-copilot-studio/agents-experience/analytics-agent-evaluation-create)
- [평가 실행과 재실행](https://learn.microsoft.com/microsoft-copilot-studio/agents-experience/analytics-agent-evaluation-results)
- [평가 결과 확인](https://learn.microsoft.com/microsoft-copilot-studio/agents-experience/analytics-agent-evaluation-view)

[이전: 실습 7. Workflow 만들기와 연결](lab06-register-trip-with-workflow.md) | [다음: 실습 9. 게시와 Monitor](lab09-publish-and-monitor.md)
