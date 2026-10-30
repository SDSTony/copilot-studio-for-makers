# 모듈 6. Excel 등록 Tool과 Outlook 메일 조회 MCP 연결

## 학습 목표

- Excel에 출장 요약 한 행을 추가하는 커넥터 Tool을 연결합니다.
- Mail MCP 서버를 추가하여 본인의 Outlook 방문 안내 메일을 조회합니다.

## 준비

- 모듈 3~5에서 만든 **출장 준비 도우미**, Instructions, OneDrive Knowledge와 두 Skill을 유지합니다.
- MCP 사용 가능 여부는 회사 정책에 따라 달라질 수 있습니다.

### Excel 파일 다운로드

{download}`출장 계획 Excel 다운로드 — trip-plans.xlsx <assets/trip-plans.xlsx>`

1. 위 링크를 눌러 파일을 내려받습니다.
2. 모듈 4에서 만든 본인 OneDrive의 `GHCP-Travel-Lab\data` 폴더에 파일을 업로드합니다.
3. Excel에서 열어 시트와 **표 이름이 모두 `TripPlans`**인지 확인합니다.

이번 파일은 아래 **6개 열**만 사용합니다. 날짜는 `YYYY-MM-DD` 텍스트, 총액은 원 단위 숫자입니다.

| PlanId | Destination | StartDate | EstimatedTotal | ReviewResult | Status |
|---|---|---|---:|---|---|
| SAMPLE-001 | 광주 | 2026-12-03 | 287000 | 한도 초과 | 준비 중 |
| SAMPLE-002 | 전주 | 2026-12-08 | 73000 | 한도 이내 | 완료 |

## 1. Excel Tool 추가 전 테스트

1. **Preview**의 새 대화에서 다음 **Excel 테스트 프롬프트**를 입력합니다.

   ```text
   부산에 2026-11-10부터 2026-11-12까지 혼자 고객사 방문 출장을 갑니다.
   KTX 일반석 왕복 120000원, 세금 포함 숙박 1박 150000원으로 2박,
   기타 비용은 없습니다. 먼저 사전 검토하고,
   PlanId LAB-003으로 Excel에 등록해 주세요.
   ```

2. 등록 Tool이 아직 없으므로 **연결이 필요하다고 안내하고 실제 행은 늘지 않아야 합니다.** Excel도 직접 확인합니다.

## 2. Excel 행 추가 Tool 연결

1. **Build > Tools > Add a tool > Connectors**를 엽니다.
2. **Excel Online (Business) > 테이블에 행 추가**를 선택하고 본인 계정으로 연결합니다.
3. 파일과 표를 다음과 같이 **사용자 지정**으로 설정합니다.

   | 입력 | 설정 |
   |---|---|
   | 위치 | OneDrive for Business |
   | 문서 라이브러리 | OneDrive (또는 문서) |
   | 파일 | `GHCP-Travel-Lab\data\trip-plans.xlsx` |
   | 테이블 | `TripPlans` |

4. 각 6개 열을 다음과 같이 매핑합니다.

   | 열 | 유형 | AI 채우기 개선 또는 값 |
   |---|---|---|
   | PlanId | AI로 채우기 | 사용자가 요청한 출장 계획 식별자 |
   | Destination | AI로 채우기 | 사전 검토에서 확인한 출장 목적지 |
   | StartDate | AI로 채우기 | 확인한 출장 시작일. `YYYY-MM-DD` 형식 |
   | EstimatedTotal | AI로 채우기 | 사전 검토에서 계산한 예상 총액. 원 단위 숫자 |
   | ReviewResult | AI로 채우기 | 사전 검토 결과 요약 |
   | Status | 사용자 지정 | `준비 중` |

5. 설정을 저장하여 Tool을 추가합니다.

열이 보이지 않으면 Excel에서 표 이름을 확인하고 저장한 뒤 파일·표를 다시 선택합니다. 화면에서 사용자 지정이나 열 매핑을 설정할 수 없으면 담당자에게 확인합니다.

## 3. 같은 프롬프트로 Excel 재시험

1. **새 Preview 대화**에서 1절의 **Excel 테스트 프롬프트를 그대로** 입력합니다.

   ```text
   부산에 2026-11-10부터 2026-11-12까지 혼자 고객사 방문 출장을 갑니다.
   KTX 일반석 왕복 120000원, 세금 포함 숙박 1박 150000원으로 2박,
   기타 비용은 없습니다. 먼저 사전 검토하고,
   PlanId LAB-003으로 Excel에 등록해 주세요.
   ```

2. 등록 전 요약이 아래와 같은지 확인합니다. 아직 Excel 행은 늘지 않아야 합니다.

   | PlanId | Destination | StartDate | EstimatedTotal | ReviewResult | Status |
   |---|---|---|---:|---|---|
   | LAB-003 | 부산 | 2026-11-10 | 420000 | 한도 초과 | 준비 중 |

3. 등록할 내용을 확인하고 Excel 등록에 동의합니다.
4. Activity trace에서 **테이블에 행 추가** 호출과 결과를 확인합니다.
5. Excel을 다시 열어 시작 대비 **한 행 증가**, 6개 값 일치를 확인합니다.

Tool이 추가되었다는 이유만으로 모든 답변이 달라질 필요는 없습니다. 이번 비교의 핵심은 **말로 요약하는 것과 실제 Excel에 기록하는 것의 차이**입니다.

## 4. Outlook MCP 추가 전 테스트

### 가상 방문 안내 메일 준비

[Outlook 웹 메일](https://outlook.office.com/mail/)을 열고 **Copilot Studio에 로그인한 것과 같은 회사 계정**으로 로그인합니다. **새 메일**을 선택하여 **본인에게** 아래 메일을 직접 한 번 보내고 받은편지함에서 확인합니다.

브라우저 주소창에 직접 입력할 URL: `https://outlook.office.com/mail/`

```text
제목: GHCP-Travel-Lab 부산 출장 방문 안내
본문:
가상 실습용 방문 안내입니다.
방문 일시: 2026-11-11 10:00~11:00 (한국 표준시)
방문 장소: 부산 해운대 테스트센터 3층 가상 회의실
준비물: 신분증, 노트북, 발표자료
출장 기간: 2026-11-10~2026-11-12
```

### 연결 전 Preview 테스트

1. Mail MCP가 아직 연결되지 않았는지 확인합니다.
2. **새 대화**에서 아래 **메일 테스트 프롬프트**를 입력합니다. 메일 본문이나 정답은 대화에 붙여 넣지 않습니다.

   ```text
   내 Outlook에서 내가 보낸 "GHCP-Travel-Lab 부산 출장 방문 안내" 메일을 찾아
   본문에 있는 방문 날짜·시각·장소·준비물을 알려 주세요.
   ```

3. **예상되는 응답은 메일에 접근할 도구가 필요하다는 안내이며, 방문 정보를 추측하지 않아야 합니다.** 실제 응답을 기록합니다.

## 5. Outlook 메일 조회 MCP 연결

1. **Build > Tools > Add a tool > MCP**를 엽니다.
2. **Mail MCP** 서버를 선택합니다.
3. **Connection > Create new connection**에서 본인 회사 계정으로 로그인합니다. **앞서 이메일을 수신한 계정**을 사용합니다.
4. **Add and Configure**를 선택합니다. 도구 권한 창에서 **Search messages** 및 **Search messages query parameters**만 허용하고, 나머지는 비활성화합니다.

## 6. 같은 프롬프트로 메일 조회 재시험

1. **새 Preview 대화**에서 아래 테스트 프롬프트를 입력합니다.

   ```text
   내 Outlook에서 내가 보낸 "GHCP-Travel-Lab 부산 출장 방문 안내" 메일을 찾아
   본문에 있는 방문 날짜·시각·장소·준비물을 알려 주세요.
   ```

2. Activity trace에서 **Mail MCP의 실제 검색·본문 조회** 결과를 확인합니다. 응답에서 읽었다고 말한 것만으로 성공으로 판단하지 않습니다.
3. Outlook에서 직접 확인한 본문과 다음 결과를 대조합니다.

   | 항목 | 기대 결과 |
   |---|---|
   | 방문 일시 | 2026-11-11 10:00~11:00 KST |
   | 장소 | 부산 해운대 테스트센터 3층 가상 회의실 |
   | 준비물 | 신분증, 노트북, 발표자료 |

| 비교 | MCP 추가 전 | MCP 추가 후 |
|---|---|---|
| 본인 Outlook 접근 | 연결 필요 안내 | 실제 메일 검색·본문 조회 |
| 방문 정보 | 추측하지 않음 | 본문에 있는 시각·장소·준비물 요약 |
| 확인 증거 | 접근 도구 없음 | MCP 실행 결과와 실제 메일 내용 일치 |

답변이 그럴듯해진 것보다 **연결된 도구로 실제 메일을 읽었는지**가 중요합니다.

## 문제 해결

| 증상 | 확인할 사항 |
|---|---|
| Excel 파일·열이 보이지 않음 | 본인 OneDrive 연결, 표 이름 `TripPlans`, 새 6열 파일인지 확인하고 파일·표 다시 선택 |
| 응답은 완료인데 행이 없음 | 실제 Tool 호출·오류 확인. 반영 지연이면 기다린 뒤 표 확인 |
| MCP 연결·메일 조회 실패 | 본인 계정과 받은편지함 확인 후 담당자에게 인증·정책 확인 요청 |

## 완료 체크리스트

- [ ] 다운로드한 6열 Excel을 본인 OneDrive에 올렸습니다.
- [ ] Excel Tool 추가 전·후에 같은 등록 프롬프트로 테스트했습니다.
- [ ] 다섯 열은 AI로 채우기, Status는 사용자 지정 `준비 중`으로 설정했습니다.
- [ ] 확인 전에는 행이 늘지 않고, 확인 후 한 행만 추가된 것을 확인했습니다.
- [ ] Mail MCP에 앞서 이메일을 수신한 회사 계정으로 연결했습니다.
- [ ] Search messages와 Search messages query parameters만 허용했습니다.
- [ ] Mail MCP 추가 전·후에 같은 메일 프롬프트로 비교했습니다.
- [ ] 실제 Mail MCP 조회 결과를 메일 본문의 방문 일시·장소·준비물과 대조했습니다.

## 참고 자료

- [GHCP Tool 추가](https://learn.microsoft.com/microsoft-copilot-studio/agents-experience/add-tools-custom-agent)
- [Excel Online (Business)](https://learn.microsoft.com/connectors/excelonlinebusiness/)
- [에이전트에 MCP 서버 연결](https://learn.microsoft.com/microsoft-copilot-studio/agent-extend-action-mcp)

[이전: 모듈 5-2. PPTX 템플릿을 채우는 파일 Skill](module05-2-file-based-skill.md) | [다음: 모듈 7. 같은 PPT를 메일로 보내고 OneDrive에 저장](module07-register-trip-with-workflow.md)
