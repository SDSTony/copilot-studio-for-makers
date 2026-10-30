# 모듈 4. OneDrive의 문서를 Knowledge로 연결하기

## 학습 목표

- 본인 OneDrive에 실습용 폴더를 만듭니다.
- 본인 OneDrive의 교육용 문서를 지식 소스로 연결합니다.
- 교육용 문서에 근거한 규정 답변을 확인합니다.
- 같은 질문으로 지식 연결 전·후의 답변과 근거를 비교합니다.

## 1. 개인 OneDrive에 실습 폴더 만들기

1. 본인 회사·교육 계정으로 OneDrive for Business를 엽니다.
2. **내 파일**에 `GHCP-Travel-Lab` 폴더를 만듭니다.
3. 그 안에 `knowledge`, `data`, `reports` 폴더를 만듭니다. 이미 있는 폴더는 그대로 사용합니다.
4. 폴더를 공개 공유하거나 다른 학습자에게 편집 권한을 주지 않습니다.

만들 폴더 경로는 다음과 같습니다.

- `GHCP-Travel-Lab\knowledge`
- `GHCP-Travel-Lab\data`
- `GHCP-Travel-Lab\reports`

`data`와 `reports` 폴더는 이후 실습에서 사용하므로 미리 만들어 둡니다.

## 2. Word 문서 다운로드와 업로드

[모듈 3](module03-create-agent-and-instructions.md)의 에이전트를 사용합니다. 아래 Word 문서를 각각 내려받습니다.

- {download}`교육용 국내 출장 규정 <assets/domestic-travel-policy.docx>`
- {download}`교육용 경비 기준 <assets/expense-rules.docx>`
- {download}`교육용 출장 준비 가이드 <assets/travel-checklist.docx>`

```{important}
모든 내용은 가상 교육용 정책입니다. 실제 회사 규정으로 사용하지 않습니다. 이 모듈에서는 로컬 파일을 Knowledge에 직접 업로드하지 않고, 먼저 본인 OneDrive에 저장한 뒤 OneDrive for Business 소스로 연결합니다.
```

1. 본인 OneDrive의 `GHCP-Travel-Lab\knowledge` 폴더를 엽니다.
2. 다운로드한 `.docx` 파일 3개를 업로드합니다.
3. OneDrive에서 각 파일을 열어 제목과 내용을 확인합니다.
4. 교육용 국내 출장 규정에 **숙박 한도 1인 1박당 130,000원, 세금 포함**이 있는지 확인합니다.
5. 다른 자료나 Excel을 이 폴더에 넣지 않습니다.

## 3. 지식 연결 전 Preview에서 먼저 테스트하기

1. **출장 준비 도우미 → Build → Knowledge**를 엽니다.
2. 기본 항목으로 **모든 웹사이트 검색**이 추가되어 있다면 삭제하고 저장합니다.
3. **Knowledge에 연결된 지식 소스가 없는 상태**인지 확인합니다. OneDrive에 문서를 업로드한 것만으로 에이전트에 지식이 연결되지는 않습니다.
4. 기존 Instructions는 유지하고 **Preview**에서 새 대화를 시작한 뒤 다음 질문을 보냅니다.

```text
교육용 규정에서 국내 출장 숙박비 한도와 계획 등록 전에 필요한 정보를 알려주세요.
답변의 근거 문서도 알려주세요.
```

**결과 확인**

- 교육용 규정이 연결되지 않았음을 안내하는지 확인합니다.
- 숙박비 한도나 근거 문서 이름을 임의로 만드는지 확인합니다.
- 필요한 정보를 일반적으로 안내하는 것과 실제 교육용 문서를 근거로 답하는 것을 구분합니다.

지식이 없어도 필요한 정보를 일부 안내할 수 있습니다. 특정 답변이 나와야 한다고 가정하지 말고, 현재 답변에 교육용 문서 근거가 있는지 살펴봅니다.

## 4. OneDrive for Business 지식 소스 추가

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

## 5. 지식 연결 후 같은 질문으로 다시 테스트하기

문서 처리가 완료되면 Preview에서 **새 대화**를 열고, 3절에서 사용한 질문을 그대로 다시 보냅니다. Instructions와 모델은 바꾸지 않습니다.

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

연결 전·후를 비교하여 **숙박비 한도가 구체적으로 확인되는지**, **실제 교육용 문서가 근거로 제시되는지** 살펴봅니다. 연결 전에도 같은 금액을 답했다면, 금액 일치만이 아니라 문서 근거를 확인합니다.

문서를 수정한 뒤에는 동기화·인덱싱에 시간이 조금 걸릴 수 있어 답변에 즉시 반영되지 않을 수 있습니다. 처리 상태를 확인하고 잠시 기다린 뒤 새 대화에서 다시 질문합니다.

## 완료 체크리스트

- [ ] 본인 OneDrive에 `GHCP-Travel-Lab`과 `knowledge`, `data`, `reports` 하위 폴더를 준비했습니다.
- [ ] 세 Word 문서를 본인 OneDrive에 저장했습니다.
- [ ] 기본 Knowledge에 모든 웹사이트 검색이 있으면 삭제하고, 지식 소스가 없는 상태에서 먼저 질문했습니다.
- [ ] Knowledge는 모두 본인 OneDrive 소스입니다.
- [ ] 지식 연결 후 같은 질문으로 숙박 한도와 문서 근거의 차이를 확인했습니다.

## 참고 자료

- [GHCP 에이전트의 지식 소스 연결](https://learn.microsoft.com/microsoft-copilot-studio/agents-experience/knowledge-add-existing-copilot)
- [OneDrive 파일과 폴더 연결의 공통 설명](https://learn.microsoft.com/microsoft-copilot-studio/knowledge-add-unstructured-data#add-onedrive-files-and-folders) — Standard 화면 설명과 GHCP 화면의 메뉴 차이에 유의하세요.

[이전: 첫 에이전트와 Instructions](module03-create-agent-and-instructions.md) · [다음: 사전 검토 Skill](module05-1-instruction-skill.md)
