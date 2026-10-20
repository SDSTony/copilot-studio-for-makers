# 모듈 4. OneDrive의 문서를 Knowledge로 연결하기

## 학습 목표

- 본인 OneDrive의 교육용 문서를 지식 소스로 연결합니다.
- 근거 있는 규정 답변과 문서에 없는 내용의 처리를 검증합니다.
- OneDrive 연결과 로컬 파일 업로드를 구분합니다.

## 사전 준비와 다운로드

[모듈 3](lab02-create-agent-and-instructions.md)의 에이전트와 개인 OneDrive 폴더가 필요합니다. 아래 Word 문서를 각각 내려받습니다.

- {download}`교육용 국내 출장 규정 <assets/domestic-travel-policy.docx>`
- {download}`교육용 경비 기준 <assets/expense-rules.docx>`
- {download}`교육용 출장 준비 가이드 <assets/travel-checklist.docx>`

```{important}
모든 내용은 가상 교육용 정책입니다. 실제 회사 규정으로 사용하지 않습니다. 이 모듈에서는 로컬 파일을 Knowledge에 직접 업로드하지 않고, 먼저 본인 OneDrive에 저장한 뒤 OneDrive for Business 소스로 연결합니다.
```

## 1. Word 문서를 개인 OneDrive에 업로드

1. OneDrive의 `GHCP-Travel-Lab\knowledge`를 엽니다.
2. 다운로드한 `.docx` 파일 3개를 업로드합니다.
3. OneDrive에서 각 파일을 열어 제목과 내용을 확인합니다.
4. 교육용 국내 출장 규정에 **숙박 한도 1인 1박당 130,000원, 세금 포함**이 있는지 확인합니다.
5. 다른 자료나 Excel을 이 폴더에 넣지 않습니다. 보호·암호가 설정된 실제 회사 문서를 대신 사용하지 않습니다.

## 2. OneDrive for Business 지식 소스 추가

```{warning}
아래는 GHCP Build 화면 기준입니다. OneDrive 선택 창의 이름이나 버튼은 릴리스에 따라 다를 수 있습니다. OneDrive 소스가 제공되지 않거나 데이터 정책에 의해 차단되면 담당자에게 확인하고 이 모듈을 중단합니다. 로컬 업로드나 공용 SharePoint로 바꾸어 완료한 것으로 처리하지 않습니다.
```

1. **출장 준비 도우미 → Build → Knowledge**를 선택합니다.
2. **Add knowledge**에서 **OneDrive for Business**를 선택합니다. 로컬 드래그 앤 드롭 영역을 사용하지 않습니다.
3. 연결 또는 로그인을 요구하면 실습 폴더를 만든 **본인 교육 계정**으로 인증합니다.
4. 파일 선택 창에서 본인의 `GHCP-Travel-Lab\knowledge`를 찾아 위 문서 3개를 선택합니다. 파일 선택 대신 폴더 선택이 제공되는 경우에도 이 지식 전용 폴더만 선택합니다.
5. 선택을 확인하고 소스의 이름과 설명을 설정합니다. 개별 파일로 추가할 수 있다면 아래 설명을 각각 사용합니다.

| 파일 | 설명 예제 |
|---|---|
| `domestic-travel-policy.docx` | 국내 1인 출장의 숙박 한도와 사전 계획·등록 절차를 안내하는 가상 교육용 규정. 승인이나 해외 출장 기준은 제공하지 않는다. |
| `expense-rules.docx` | KRW 예상 경비 계산, 교통비와 기타 비용의 확인 기준, 규정에 없는 항목의 처리 방법. |
| `travel-checklist.docx` | 고객사 방문 등 국내 출장의 준비 사항과 중복 계획·등록 결과 확인 체크리스트. |

6. **Add / Save**로 추가를 완료합니다.
7. 처리 상태가 **Ready** 또는 사용 가능 상태가 될 때까지 기다립니다. 첫 연결은 인덱싱 준비 시간이 더 필요할 수 있습니다.
8. 등록된 소스가 OneDrive의 파일 또는 폴더를 가리키는지 확인합니다. 자동 추천된 공용 저장소나 웹사이트 소스는 추가하지 않습니다.

OneDrive 연결은 원본 저장소와 사용자의 접근 권한을 확인하는 경로입니다. 서비스는 지식 처리를 위해 콘텐츠를 인덱싱하므로 "실행 중 모든 데이터가 OneDrive에만 저장된다"는 의미는 아닙니다. 최신 동기화·권한 동작은 해당 환경의 공식 안내와 Preview에서 확인합니다.

## 3. 규정 질문 테스트

Preview에서 **새 대화**를 열고 다음 메시지를 보냅니다.

```text
교육용 규정에서 국내 출장 숙박비 한도와 계획 등록 전에 필요한 정보를 알려주세요.
답변의 근거 문서도 알려주세요.
```

**기대 결과**

- 1인 1박당 세금 포함 130,000원이라고 답합니다.
- 목적지, 날짜, 목적, 교통비, 숙박비·숙박일 수, 기타 비용 확인을 안내합니다.
- 관련 문서 이름 또는 출처를 표시합니다.
- 계획 등록은 승인과 다르다고 설명합니다.

출처를 열어 실제 OneDrive의 교육 문서 내용과 맞는지 확인합니다. Activity trace가 제공되면 조회한 지식 소스도 확인합니다.

## 4. 문서에 없는 기준 테스트

새 대화에서 다음 메시지를 보냅니다.

```text
일본 출장의 숙박비 한도와 국내 출장 식비 지급 한도를 알려주세요.
문서에 없으면 없다고 알려주세요.
```

**기대 결과:** 해외 출장은 범위 밖이며 식비 지급 한도는 문서에 없다고 답합니다. 숙박 규정을 식비에 적용하거나 실제 회사의 규정을 추측하지 않습니다.

## 문제 해결

| 증상 | 확인할 사항 |
|---|---|
| 파일이 선택 창에 없음 | 본인 계정, 폴더 경로, OneDrive 업로드 완료 여부 확인 |
| Ready인데 문서를 활용하지 않음 | 문서 보호·암호 여부, 설명, 질문의 구체성, 새 대화와 출처 확인 |
| 인증을 요구함 | 본인의 문서 접근 권한을 가진 교육 계정으로 연결 |
| 문서 수정이 즉시 답변에 반영되지 않음 | 동기화·인덱싱 상태 확인 후 새 대화에서 재시험. 즉시 반영을 가정하지 않음 |
| Knowledge가 차단됨 | 조직 데이터 정책과 지식 처리 용량을 담당자와 확인 |

## 완료 체크리스트

- [ ] 세 Word 문서를 본인 OneDrive에 저장했습니다.
- [ ] Knowledge는 모두 본인 OneDrive 소스입니다.
- [ ] 숙박 한도와 근거를 확인했습니다.
- [ ] 문서에 없는 식비·해외 기준을 만들어 답하지 않습니다.
- [ ] 출장 기록 Excel이나 Skill 패키지를 Knowledge에 넣지 않았습니다.

## 참고 자료

- [GHCP 에이전트의 지식 소스 연결](https://learn.microsoft.com/microsoft-copilot-studio/agents-experience/knowledge-add-existing-copilot)
- [OneDrive 파일과 폴더 연결의 공통 설명](https://learn.microsoft.com/microsoft-copilot-studio/knowledge-add-unstructured-data#add-onedrive-files-and-folders) — Standard 화면 설명과 GHCP 화면의 메뉴 차이에 유의하세요.

[이전: 첫 에이전트와 Instructions](lab02-create-agent-and-instructions.md) · [다음: 사전 검토 Skill](lab04a-instruction-skill.md)
