# 실습 7. 파일 발송·저장 Workflow를 만들고 에이전트에 추가하기

## 학습 목표

- 파일 입력·메일 발송·파일 저장·결과 응답의 네 단계 Workflow를 만듭니다.
- 파일 입력의 `name`과 `contentBytes`를 메일 첨부와 OneDrive 저장에 연결합니다.
- Workflow를 게시하고 **출장 준비 도우미**의 Tool로 추가합니다.
- 추가 전·후 같은 요청으로 실제 메일 발송과 파일 저장의 차이를 확인합니다.

## 완성할 흐름

```text
When an agent calls the workflow
→ 메일 보내기
→ 파일 만들기
→ Respond to the agent
```

**업무 작업은 메일 발송과 파일 저장 두 개**입니다. Excel 등록은 실습 6의 별도 Tool이며 이 Workflow에 넣지 않습니다.

| 노드 | 하는 일 |
|---|---|
| When an agent calls the workflow | 에이전트에서 파일 1개를 받음 |
| 메일 보내기 | 본인에게 같은 파일을 첨부해 발송 |
| 파일 만들기 | 발송 성공 후 본인 OneDrive에 같은 파일 저장 |
| Respond to the agent | 두 작업이 성공하면 `output`에 `완료` 반환 |

화면의 캔버스 노드에는 **When an agent calls the flow**, 오른쪽 설정에는 **When an agent calls the workflow**로 표시될 수 있습니다. 현재 화면에서 에이전트가 호출하는 트리거를 선택합니다.

## 준비

- [모듈 2](lab02-create-solution.md)에서 지정한 교육 환경과 본인 솔루션을 사용합니다.
- 본인의 Outlook과 OneDrive for Business 연결, 본인 이메일 주소를 준비합니다.
- OneDrive에 `GHCP-Travel-Lab\reports` 폴더가 있어야 합니다.
- [실습 5-2](lab04b-file-based-skill.md)의 Skill을 유지합니다. 아래에서는 **하나의 프롬프트**로 PPT 생성부터 Workflow 발송·저장까지 요청합니다.
- 기존에 같은 발송·저장 Tool이 연결되어 있다면 본인 실습 에이전트에서 연결을 해제한 뒤 비교합니다. 다른 설정은 유지합니다.

```{warning}
실행하면 실제 메일과 파일이 생깁니다. 수신자는 본인, 저장 폴더는 본인 reports로 고정합니다. 이 간단한 교육용 흐름에는 확인용 Boolean, 파일 검사 분기, 중복 방지, 실패 복구를 구현하지 않습니다. 사용자 확인은 에이전트 Instructions와 Tool 설명으로 유도하며 보안 통제를 대신하지 않습니다. 본인 교육용 파일로만 한 번씩 실행합니다.
```

## 1. Workflow 추가 전 Preview 테스트

**Preview**의 새 대화에서 아래 **통합 테스트 프롬프트**를 한 번에 입력합니다. 실습 5-2의 PPT 생성 요청과 Workflow 사용 요청을 합친 것입니다.

```text
2026-11-10부터 2026-11-12까지 부산에 혼자 고객사 방문 출장을 갑니다.
교통은 KTX 일반석 왕복 120000원, 숙박은 세금 포함 1박당 150000원으로 2박,
기타 비용은 0원입니다.
교육용 규정으로 사전 검토한 뒤 등록된 PPT 템플릿을 채워 출장 계획서를 만들어 주세요.
기존 3장 구성과 디자인을 유지하고, 모르는 방문 시간과 장소는 미확인으로 표시해 주세요.
PPT를 만든 다음 "파일 메일 발송 및 원드라이브 저장" Workflow를 사용해 주세요.
방금 생성한 실제 PPT 파일을 내 이메일에 첨부해 보내고, 발송 성공 후 같은 파일을
내 OneDrive의 GHCP-Travel-Lab reports 폴더에 저장해 주세요.
이번에 생성할 출장 계획서 PPT의 본인 이메일 발송과 OneDrive 저장에 동의합니다.
발송·저장을 위해 PPT를 다시 생성하거나 내용을 바꾸지 말고, Excel에는 아무것도 추가하지 마세요.
Workflow가 연결되어 있지 않거나 실제 파일을 전달할 수 없다면,
PPT 생성 결과와 실행할 수 없는 작업을 구분해 알려 주세요. 발송·저장했다고 말하지 마세요.
```

생성된 PPT를 내려받아 실제로 열고 3장 구성, 총액 420,000원과 숙박 초과액 40,000원을 확인합니다. Workflow가 아직 없으므로 **PPT는 생성하되 발송·저장 도구 연결이 필요하다고 안내**해야 합니다. 실제 보낸편지함과 reports에 변화가 없는지 확인하고 응답을 기록합니다.

실행 전 reports에 같은 이름의 파일이 없는지 확인합니다. 이미 있다면 통합 프롬프트에 사용하지 않은 출력 파일명을 지정하는 문장을 추가하고, 추가 전·후 시험에 같은 요청을 사용합니다.

```{note}
위 상자 전체를 한 번 복사해 붙여 넣으면 됩니다. 프롬프트에 이번에 생성할 PPT의 발송·저장 동의를 포함했습니다. 에이전트가 실행 전에 대상 파일과 확인을 다시 요청하면 내용을 확인하고 답합니다.
```

## 2. 빈 Workflow 만들고 파일 입력 추가

1. [Copilot Studio](https://copilotstudio.microsoft.com/)에서 같은 교육 환경을 선택합니다.
2. **Workflows > New workflow**를 열고 이름을 **파일 메일 발송 및 원드라이브 저장**으로 지정합니다.
3. 솔루션 선택이 제공되면 본인 실습용 솔루션을 선택합니다. 선택·조회가 제공되지 않으면 담당자에게 확인하고 자동 포함되었다고 가정하지 않습니다.
4. 시작 노드를 선택하고 **Trigger type**을 **When an agent calls the workflow**로 설정합니다.
5. **Add an input**에서 **File** 형식의 입력을 추가하고 표시 이름을 **File Content**로 지정합니다.
6. 입력이 파일 형식인지 확인합니다. 텍스트 입력에 파일명이나 다운로드 링크를 넣는 방식으로 만들지 않습니다.

이 파일 입력에서 이후 노드에 연결할 동적 콘텐츠는 다음 두 값입니다.

| 동적 콘텐츠 | 의미 |
|---|---|
| `name` | 파일 이름. 예: `trip-plan-LAB-003-01.pptx` |
| `contentBytes` | 실제 파일 내용 |

토큰 이름은 현재 UI에 표시된 값을 선택합니다. 값을 직접 타이핑하거나 모델에게 파일 내용을 생성하게 하지 않습니다. 실제 파일의 두 동적 콘텐츠를 사용할 수 없다면 담당자에게 확인하고 중단합니다.

## 3. 메일 보내기 노드 추가

1. 시작 노드 뒤의 **+** 또는 왼쪽 **Add > Connector**를 선택합니다.
2. **Office 365 Outlook > Send an email (V2)**를 추가합니다.
3. 노드 이름을 **메일 보내기**로 바꾸고 **Configure**에서 본인 연결을 선택합니다.
4. 다음 값을 설정합니다.

   | 항목 | 설정 |
   |---|---|
   | Connection | 본인 Outlook 연결 |
   | To | **본인 이메일 주소를 고정 입력** |
   | Subject | `[GHCP 실습] 출장 계획서` |
   | Body | `교육용 출장 계획서를 첨부합니다. 승인 문서가 아닙니다.` |
   | Cc / Bcc | 비워 둠 |

5. **Advanced parameters**에서 **Attachments**를 표시합니다. 보이지 않으면 **Show all**을 선택합니다.
6. 첨부 항목을 **1개** 추가하고 다음과 같이 매핑합니다.

   | Attachments 항목 | 선택할 동적 콘텐츠 |
   |---|---|
   | Name | 트리거 **File Content**의 `name` |
   | Content | 같은 파일의 `contentBytes` |

**Name과 Content 모두 트리거 파일에서 가져옵니다.** `Content`에 파일 이름, 링크 또는 메일 본문을 넣지 않습니다. 스크린샷의 계정이나 수신자를 따라 입력하지 말고 본인 계정으로 바꿉니다.

## 4. OneDrive 파일 만들기 노드 추가

1. **메일 보내기** 뒤에 **Connector > OneDrive for Business > Create file**을 추가합니다.
2. 노드 이름을 **파일 만들기**로 바꾸고 본인 OneDrive 연결을 선택합니다.
3. 다음 값을 설정합니다.

   | 항목 | 설정 |
   |---|---|
   | Connection | 본인 OneDrive for Business 연결 |
   | Folder path | 선택기로 `GHCP-Travel-Lab\reports` 선택 |
   | File name | 트리거 **File Content**의 `name` |
   | File content | 같은 파일의 `contentBytes` |

Folder path는 커넥터 화면에서 `/GHCP-Travel-Lab/reports`처럼 보일 수 있습니다. 메일 첨부와 **동일한 트리거 파일의 이름·내용**을 연결하는 것이 핵심입니다.

메일과 저장 노드를 병렬로 연결하지 않습니다. **메일 보내기가 성공한 경우에만 파일 만들기**를 실행하도록 순서와 실행 조건을 확인합니다. 파일 내용 형식 오류가 나면 실제 토큰과 커넥터 입력 형식을 담당자와 확인하며, 임의의 base64 문자열이나 텍스트로 대신하지 않습니다.

## 5. 결과 응답 노드 추가하고 게시

1. **파일 만들기** 뒤에 **Respond to the agent**를 추가합니다.
2. **Add an output**에서 **Text** 출력을 추가합니다.
3. 이름을 **`output`**, 값을 **`완료`**로 설정합니다.
4. 응답은 **파일 만들기까지 성공한 경우에만** 실행되도록 확인합니다. 실패·시간 초과 경로에서도 `완료`를 반환하도록 설정하지 않습니다.
5. **Review**에서 오류를 확인하고 저장한 뒤 **Publish**합니다.

별도의 상태 변수 5개나 저장 링크 출력은 만들지 않습니다. `완료`는 두 노드가 성공 경로를 마쳤다는 응답이며, 실제 메일 도착과 저장 파일 확인은 아래에서 따로 진행합니다.

## 6. 에이전트에 Workflow를 Tool로 추가

1. **출장 준비 도우미**로 돌아와 **Build > Tools > Add a tool**을 엽니다.
2. Workflow 선택 목록에서 방금 게시한 **파일 메일 발송 및 원드라이브 저장**을 선택합니다. 카테고리 이름은 현재 화면을 따릅니다.
3. Tool 설명에 아래 내용을 입력합니다.

   ```text
   사용자가 확인한 실제 PPT 파일을 본인 이메일에 첨부 발송하고,
   발송 성공 후 같은 파일을 본인 OneDrive reports에 저장합니다.
   대상 파일을 확인하고 발송·저장에 동의한 경우에만 호출합니다.
   실제 파일이 없거나 사용자가 취소하면 호출하지 않습니다.
   Excel 등록은 하지 않습니다. 오류나 시간 초과 시 전체 작업을 자동 재실행하지 않습니다.
   ```

4. 입력 **File Content**에 현재 대화의 실제 파일을 연결합니다. 파일 참조·첨부 동적 콘텐츠를 지원하는 매핑을 사용하며, AI가 파일 내용 문자열을 작성하도록 두지 않습니다.
5. 저장하고 Tools 목록에 Workflow가 추가되었는지 확인합니다.

```{important}
다운로드 카드를 표시하는 기능과 실제 생성 파일을 Workflow에 전달하는 기능은 다릅니다. 먼저 현재 대화에서 방금 생성한 파일을 직접 연결하는 경로를 확인합니다. 직접 연결이 안 되면 내려받아 확인한 바로 그 PPT를 같은 대화에 다시 첨부하고, 실제 첨부 파일을 File Content에 연결할 수 있을 때만 진행합니다. 두 경로 모두 지원되지 않으면 중단하며, 파일명·링크·추출된 슬라이드 텍스트로 대신하지 않습니다.
```

## 7. 같은 프롬프트로 재시험하고 결과 비교

1. **새 Preview 대화**에서 **1절의 통합 테스트 프롬프트를 그대로 한 번에** 입력합니다.
2. Instructions, Skills, Knowledge와 다른 Tool은 변경하지 않습니다. 이번에는 **PPT 생성 → 같은 파일을 Workflow에 전달 → 메일 발송 → 저장**이 이어지는지 확인합니다. 에이전트가 파일이나 실행 확인을 추가로 요청하면 대상 파일을 확인한 뒤 답합니다. 파일 직접 전달이 지원되지 않아 재첨부하는 경우에는 6절의 조건을 따릅니다.
3. Activity trace에서 Workflow 호출을 확인하고, Workflow의 **Activity**에서 다음 실행 순서를 확인합니다.

   ```text
   File Content 입력 → 메일 보내기 성공 → 파일 만들기 성공 → output: 완료
   ```

4. 입력 파일의 `name`과 `contentBytes`가 메일 첨부·파일 저장에 연결되었는지 확인합니다. 파일 내용 전체나 인증 정보를 수업 화면에 노출하지 않습니다.
5. [Outlook 웹 메일](https://outlook.office.com/mail/)에서 본인에게 도착한 메일과 PPT 첨부를 확인합니다.
6. OneDrive의 `GHCP-Travel-Lab\reports`에서 같은 이름의 PPT를 확인합니다.
7. **이번 대화에서 생성한 원본**, 메일 첨부, OneDrive 저장본을 각각 열고 내용이 같은지 확인합니다. 아래 SHA256 검사로 실제 파일 바이트도 비교합니다. 추가 전 대화에서 별도로 생성한 PPT와 이번 원본의 해시가 같을 필요는 없습니다.
8. Excel 행 수는 그대로여야 합니다. 이번 시험으로 **메일 한 건·저장 파일 한 개**만 추가되었는지 확인합니다.

| 비교 | Workflow 추가 전 | Workflow 추가 후 |
|---|---|---|
| 파일 전달 요청 | 도구 연결 필요 안내 | 실제 파일을 Workflow 입력으로 전달 |
| 이메일 | 발송 없음 | 본인에게 PPT 첨부 메일 도착 |
| OneDrive | 저장 없음 | reports에 같은 PPT 저장 |
| 실행 증거 | Workflow 호출 없음 | 두 노드 성공, `output=완료`, 실제 메일·파일 확인 |

**실제 관찰 기록:** 추가 전 응답 / 추가 후 응답 / 실행 순서 / 메일·파일 확인 결과

### 같은 파일인지 확인하기

원본, 메일 첨부, OneDrive 저장본을 각각 본인 PC의 `original`, `mail`, `onedrive` 폴더에 보관합니다. 아래 파일명은 실제 이름으로 바꿉니다. 세 Hash 값이 같아야 같은 파일입니다.

```powershell
$paths = @(
    '.\original\trip-plan.pptx'
    '.\mail\trip-plan.pptx'
    '.\onedrive\trip-plan.pptx'
)
$paths | ForEach-Object { Get-FileHash -LiteralPath $_ -Algorithm SHA256 -ErrorAction Stop } |
    Format-Table Path, Hash -AutoSize
```

## 문제 해결

| 증상 | 확인 및 조치 |
|---|---|
| 에이전트에서 Workflow가 보이지 않음 | 같은 환경인지, 게시했는지, 접근 권한이 있는지 확인 |
| 파일 입력이나 동적 콘텐츠가 없음 | File 형식과 실제 파일 매핑 지원 여부 확인. 텍스트·URL로 대체하지 않음 |
| PPT가 열리지 않음 | Name은 `name`, Content와 File content는 같은 `contentBytes`인지 확인 |
| 메일은 왔는데 저장 실패 | **부분 성공**으로 기록. 전체 재실행으로 메일을 다시 보내지 말고 저장 오류 확인 |
| 실패했는데 응답이 `완료`임 | 성공 경로에만 Respond가 연결되어 있는지 확인 |
| 시간 초과 또는 응답 없음 | 결과 미확정으로 기록하고 Activity·보낸편지함·reports 확인 전 재실행 금지 |

실패는 성공 응답으로 바꾸지 않습니다. 메일이 성공하고 저장만 실패하면 검증한 원본을 OneDrive에서 수동 저장할 수 있으나, 이는 Workflow의 정상 완료가 아니라 별도 복구입니다.

## 완료 체크리스트

- [ ] File Content 입력 1개와 네 단계 Workflow를 만들었습니다.
- [ ] 메일 첨부와 파일 저장에 같은 `name`·`contentBytes`를 연결했습니다.
- [ ] 본인 수신자·reports 폴더를 고정하고 성공 경로에서만 `완료`를 반환합니다.
- [ ] Workflow를 게시하고 에이전트의 Tool로 추가했습니다.
- [ ] 추가 전·후 같은 통합 프롬프트를 한 번씩 사용하여 PPT 생성과 발송·저장을 비교했습니다.
- [ ] 실제 메일·저장 파일과 원본 동일성을 확인했습니다.

## 참고 자료

- [GHCP Workflow 개요](https://learn.microsoft.com/microsoft-copilot-studio/workflows-experience/flows-overview)
- [에이전트에 Tool 추가](https://learn.microsoft.com/microsoft-copilot-studio/agents-experience/add-tools-custom-agent)
- [Office 365 Outlook 커넥터](https://learn.microsoft.com/connectors/office365/)
- [OneDrive for Business 커넥터](https://learn.microsoft.com/connectors/onedriveforbusiness/)

[이전: 실습 6. Excel 등록과 Outlook MCP](lab05-query-trip-plans.md) | [다음: 실습 8. 지식 기반 질문 평가](lab08-evaluate-and-improve.md)
