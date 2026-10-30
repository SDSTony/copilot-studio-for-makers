# 모듈 7. 파일 발송·저장 Workflow를 만들고 에이전트에 추가하기

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

**업무 작업은 메일 발송과 파일 저장 두 개**입니다.

| 노드 | 하는 일 |
|---|---|
| When an agent calls the workflow | 에이전트에서 파일 1개를 받음 |
| 메일 보내기 | 본인에게 같은 파일을 첨부해 발송 |
| 파일 만들기 | 발송 성공 후 본인 OneDrive에 같은 파일 저장 |
| Respond to the agent | 두 작업이 성공하면 `output`에 `완료` 반환 |

## 준비

- 모듈 4에서 만든 본인 OneDrive의 `GHCP-Travel-Lab\reports` 폴더를 사용합니다.
- [모듈 5-2](module05-2-file-based-skill.md)의 Skill을 유지합니다. 아래에서는 **하나의 프롬프트**로 PPT 생성부터 Workflow 발송·저장까지 요청합니다.

```{warning}
실행하면 실제 메일과 파일이 생깁니다. 수신자는 본인, 저장 폴더는 본인 reports로 고정합니다. 이 간단한 교육용 흐름에는 확인용 Boolean, 파일 검사 분기, 중복 방지, 실패 복구를 구현하지 않습니다. 사용자 확인은 에이전트 Instructions로 유도하며 보안 통제를 대신하지 않습니다. 본인 교육용 파일로만 한 번씩 실행합니다.
```

## 1. Workflow 추가 전 Preview 테스트

**Preview**의 새 대화에서 아래 **통합 테스트 프롬프트**를 한 번에 입력합니다. 모듈 5-2의 PPT 생성 요청과 Workflow 사용 요청을 합친 것입니다.

```text
2026-11-10부터 2026-11-12까지 부산에 혼자 고객사 방문 출장을 갑니다.
교통은 KTX 일반석 왕복 120000원, 숙박은 세금 포함 1박당 150000원으로 2박,
기타 비용은 0원입니다.
교육용 규정으로 사전 검토한 뒤 등록된 PPT 템플릿을 채워 출장 계획서를 만들어 주세요.
만들어진 PPT를 메일로 보내고 원드라이브에 저장해 주세요.
```

Workflow가 아직 없으므로 **PPT는 생성하되 발송·저장 도구 연결이 필요하다고 안내**해야 합니다. 실제 보낸편지함과 reports에 변화가 없는지 확인합니다.

## 2. 빈 Workflow 만들고 파일 입력 추가

1. **출장 준비 도우미**의 에이전트 화면에서 **도구 > 추가 > 워크플로**를 선택하여 새 Workflow를 만듭니다.
2. 이름을 **이메일 보내고 원드라이브에 저장하기**로 지정합니다.
3. 시작 노드의 트리거를 **When an agent calls the workflow**로 설정합니다.
4. **Add an input**에서 **File** 형식의 입력을 추가하고 이름을 **File Content**로 지정합니다.

이후 노드에서는 이 파일 입력의 다음 값을 사용합니다.

| 동적 콘텐츠 | 의미 |
|---|---|
| `name` | 파일 이름 |
| `contentBytes` | 실제 파일 내용 |

## 3. 메일 보내기 노드 추가

1. 시작 노드 뒤의 **+ 아이콘**을 클릭합니다.
2. **Office 365 Outlook > Send an email (V2)**를 추가합니다.
3. **Configure**에서 본인 연결을 선택합니다.
4. 다음 값을 설정합니다.

   | 항목 | 설정 |
   |---|---|
   | Connection | 본인 Outlook 연결 |
   | To | **본인 이메일 주소를 고정 입력** |
   | Subject | `[GHCP 실습] 출장 계획서` |
   | Body | `교육용 출장 계획서를 첨부합니다. 승인 문서가 아닙니다.` |

5. **고급 매개 변수**에서 **첨부 파일**을 표시합니다.
6. 첨부 항목을 **1개** 추가하고 다음과 같이 매핑합니다.

   | 첨부 파일 항목 | 선택할 동적 콘텐츠 |
   |---|---|
   | 이름 | 트리거 **File Content**의 `name` |
   | 콘텐츠 | 같은 파일의 `contentBytes` |

**이름과 콘텐츠 모두 트리거 파일에서 가져옵니다.** **콘텐츠**에 파일 이름, 링크 또는 메일 본문을 넣지 않습니다. 스크린샷의 계정이나 수신자를 따라 입력하지 말고 본인 계정으로 바꿉니다.

## 4. OneDrive 파일 만들기 노드 추가

1. **메일 보내기** 노드 뒤의 **+ 아이콘**을 클릭하고 **OneDrive for Business > 파일 만들기**를 추가합니다.
2. 본인 OneDrive 연결을 선택합니다.
3. 다음 값을 설정합니다.

   | 항목 | 설정 |
   |---|---|
   | Connection | 본인 OneDrive for Business 연결 |
   | 폴더 경로 | `/GHCP-Travel-Lab/reports` 선택 |
   | 파일 이름 | 트리거 **File Content**의 `name` |
   | 파일 콘텐츠 | 같은 파일의 `contentBytes` |

메일 첨부와 **동일한 트리거 파일의 이름·내용**을 연결하는 것이 핵심입니다.

## 5. 결과 응답 설정하고 게시

1. **파일 만들기** 뒤에 있는 **Respond to the agent** 노드를 선택합니다.
2. **Add an output**에서 **Text** 출력을 추가합니다.
3. 이름을 **`output`**, 값을 **`완료`**로 설정합니다.
4. 게시합니다.

## 6. 에이전트에 Workflow를 Tool로 추가

1. **출장 준비 도우미**로 돌아와 **Build > Tools > Add a tool**을 엽니다.
2. Workflow 선택 목록에서 방금 게시한 **이메일 보내고 원드라이브에 저장하기**를 선택합니다.
3. 입력 **File Content**를 **AI로 채우기**로 설정합니다.
4. 저장하고 Tools 목록에 Workflow가 추가되었는지 확인합니다.

## 7. 같은 프롬프트로 재시험하고 결과 비교

1. **새 Preview 대화**에서 아래 프롬프트를 입력합니다.

   ```text
   2026-11-10부터 2026-11-12까지 부산에 혼자 고객사 방문 출장을 갑니다.
   교통은 KTX 일반석 왕복 120000원, 숙박은 세금 포함 1박당 150000원으로 2박,
   기타 비용은 0원입니다.
   교육용 규정으로 사전 검토한 뒤 등록된 PPT 템플릿을 채워 출장 계획서를 만들어 주세요.
   만들어진 PPT를 메일로 보내고 원드라이브에 저장해 주세요.
   ```

2. **PPT 생성 → 같은 파일을 Workflow에 전달 → 메일 발송 → 저장**이 이어지는지 확인합니다. 에이전트가 파일이나 실행 확인을 추가로 요청하면 대상 파일을 확인한 뒤 답합니다.
3. Activity trace에서 Workflow 호출을 확인하고, Workflow의 **Activity**에서 다음 실행 순서를 확인합니다.

   ```text
   File Content 입력 → 메일 보내기 성공 → 파일 만들기 성공 → output: 완료
   ```

4. [Outlook 웹 메일](https://outlook.office.com/mail/)에서 본인에게 도착한 메일과 PPT 첨부를 확인합니다.
5. OneDrive의 `GHCP-Travel-Lab\reports`에서 같은 이름의 PPT를 확인합니다.
6. **이번 대화에서 생성한 원본**, 메일 첨부, OneDrive 저장본을 각각 열고 내용이 같은지 확인합니다.

| 비교 | Workflow 추가 전 | Workflow 추가 후 |
|---|---|---|
| 파일 전달 요청 | 도구 연결 필요 안내 | 실제 파일을 Workflow 입력으로 전달 |
| 이메일 | 발송 없음 | 본인에게 PPT 첨부 메일 도착 |
| OneDrive | 저장 없음 | reports에 같은 PPT 저장 |
| 실행 증거 | Workflow 호출 없음 | 두 노드 성공, `output=완료`, 실제 메일·파일 확인 |

## 문제 해결

| 증상 | 확인 및 조치 |
|---|---|
| 에이전트에서 Workflow가 보이지 않음 | 같은 환경인지, 게시했는지, 접근 권한이 있는지 확인 |
| 파일 입력이나 동적 콘텐츠가 없음 | File 형식과 실제 파일 매핑 지원 여부 확인. 텍스트·URL로 대체하지 않음 |
| PPT가 열리지 않음 | 이름은 `name`, 콘텐츠와 파일 콘텐츠는 같은 `contentBytes`인지 확인 |
| 메일은 왔는데 저장 실패 | **부분 성공**으로 기록. 전체 재실행으로 메일을 다시 보내지 말고 저장 오류 확인 |
| 실패했는데 응답이 `완료`임 | 성공 경로에만 Respond가 연결되어 있는지 확인 |
| 시간 초과 또는 응답 없음 | 결과 미확정으로 기록하고 Activity·보낸편지함·reports 확인 전 재실행 금지 |

## 완료 체크리스트

- [ ] File Content 입력 1개를 추가하고 메일 보내기·파일 만들기 노드를 연결했습니다.
- [ ] 메일 첨부와 파일 저장에 같은 `name`·`contentBytes`를 연결했습니다.
- [ ] 기존 Respond to the agent 노드의 `output` 값을 `완료`로 설정하고 게시했습니다.
- [ ] 에이전트에 Workflow를 추가하고 File Content를 AI로 채우기로 설정했습니다.
- [ ] 추가 전·후 같은 통합 프롬프트를 한 번씩 사용하여 PPT 생성과 발송·저장을 비교했습니다.
- [ ] 본인에게 도착한 메일 첨부와 reports 저장본을 열어 생성한 PPT와 내용이 같은지 확인했습니다.

## 참고 자료

- [GHCP Workflow 개요](https://learn.microsoft.com/microsoft-copilot-studio/workflows-experience/flows-overview)
- [에이전트에 Tool 추가](https://learn.microsoft.com/microsoft-copilot-studio/agents-experience/add-tools-custom-agent)
- [Office 365 Outlook 커넥터](https://learn.microsoft.com/connectors/office365/)
- [OneDrive for Business 커넥터](https://learn.microsoft.com/connectors/onedriveforbusiness/)

[이전: 모듈 6. Excel 등록과 Outlook MCP](module06-query-trip-plans.md) | [다음: 모듈 8. 지식 기반 질문 평가](module08-evaluate-and-improve.md)
