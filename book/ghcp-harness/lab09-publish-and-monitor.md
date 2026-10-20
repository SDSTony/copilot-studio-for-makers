# 실습 9. 본인 전용으로 게시하고 실제 사용을 Monitor에서 확인

## 목표와 준비

**출장 준비 도우미**를 인증된 채널에서 **제작자 본인만** 사용하고 게시 채널의 실제 사용을 Monitor에서 확인합니다. Preview/Evaluate/게시 채널의 사용과 과금을 구분합니다.

- [실습 6](lab05-query-trip-plans.md)의 실제 Excel·메일 조회 확인과 [실습 7](lab06-register-trip-with-workflow.md)의 실제 PPT 발송·저장 및 동일성 확인.
- [실습 8](lab08-evaluate-and-improve.md)의 지식 기반 질문 2개 평가 및 원래 구성 복원.
- 본인 Microsoft 365 업무/교육 계정, 본인 OneDrive for Business/Excel/Outlook/Work IQ 연결.
- Knowledge는 `GHCP-Travel-Lab\knowledge`의 `domestic-travel-policy.docx`, `expense-rules.docx`, `travel-checklist.docx` **개별 Word 문서 3개**.
- Excel 직접 Tool의 고정 파일 `GHCP-Travel-Lab\data\trip-plans.xlsx`, 시트/표 `TripPlans`, 6개 열과 고정 Status=`준비 중`.
- 게시된 **파일 메일 발송 및 원드라이브 저장** Workflow: 실제 File Content 입력, 에이전트의 사용자 확인, 본인 고정 수신자와 reports 폴더, 메일 보내기 → 파일 만들기 → `output=완료` 성공 경로.

```{warning}
인증됨은 본인 전용 권한과 다릅니다. 본인만 접근하도록 제한할 수 없으면 게시하지 말고 Preview까지만 완료하세요. 조직 카탈로그 등록, Everyone/전체 조직·그룹 공유, 공동 제작자 초대, 링크 배포, 새 Teams 팀 생성은 하지 않습니다. 공개 사이트/익명 웹으로 우회하지 않습니다. Work IQ와 파일 기능은 preview/테넌트별 제공 차이가 있으므로 이 교육 실습을 운영 준비 완료라고 주장하지 않습니다.
```

## 1. 게시 전 차단 항목 확인

1. Build에서 이름 **출장 준비 도우미**, 지침과 Knowledge를 확인합니다. 공개 웹/SharePoint 팀 사이트나 Excel을 규정 Knowledge로 추가하지 않습니다.
2. 임시 평가 지침, 오류 주입, 진단용 임시 Tool을 제거했는지 확인합니다. 실제 File Content 매핑을 복원했는지도 확인합니다.
3. Work IQ는 공식 통합 MCP `https://workiq.svc.cloud.microsoft/mcp`와 본인 인증이며 읽기 전용 정책인지 확인합니다. 관리자 활성화/동의·spending policy·Copilot Credits 조건이 유효해야 합니다.
4. Excel Tool은 파일/표/Status 고정, PlanId는 학습자가 명시한 값입니다. workflow에 Excel 등록/중복 검사나 임의 수신자/폴더 입력이 없어야 합니다.
5. Workflow의 실제 첨부 내용 매핑, 동일 PPT 저장, 메일 실패 시 저장 건너뜀, 성공한 경우에만 `완료` 응답을 확인합니다. 실패·부분 성공은 Activity와 실제 서비스를 확인하여 안내하고 자동 재발송하지 않습니다.
6. 공유/접근 관리에서 명시적 사용자 목록이 **본인만**인지 확인합니다. 연결도 타인에게 공유하지 않습니다.
7. 다음 중 하나라도 미검증이면 차단 사유를 기록합니다.
   - 확인 전/취소에서 행·메일·reports 파일 증가 0.
   - Excel 행 추가와 PPT 발송·저장의 **별도 확인**.
   - 파일 누락/이름·URL만 제공할 때 발송·저장 0.
   - 실제 PPT 열림, 원본/첨부/저장본 동일 SHA256.
   - 실패/부분 성공 실행을 검증했는지, 아니면 토의만 했는지 구분.
   - 지식 평가 2개 모두 핵심 내용이 정확하며 평가 중 실제 쓰기 0.
8. 이번 Workflow에는 확인용 Boolean, 파일 검사 분기, 중복 방지, 실패 복구가 없음을 기록합니다. 에이전트의 확인 지침과 수동 파일 검증에 의존하는 본인 실습을 무인 운영용 통제로 설명하지 않습니다.

## 2. 본인용 인증 채널만 게시

1. 에이전트의 **Publish 옆 chevron > Publish agent**를 엽니다.
2. **Microsoft Copilot** 등 현재 제공되는 인증 채널을 선택합니다. 업무/교육 계정 로그인과 본인만 접근하는 권한을 확인합니다.
3. Microsoft Teams 개인 사용 채널이 제공된다면 **본인 설치/개인 채팅** 범위만 허용합니다. 팀/채널/그룹 채팅에 추가하거나 새 팀을 만들지 않습니다.
4. 화면은 배포 단계마다 다를 수 있습니다. 표준 하네스의 Channels 메뉴/특정 설치 버튼이 GHCP에 있다고 가정하지 않습니다. 본인용 열기/설치와 접근 제한을 검증할 수 없으면 중단합니다.
5. 데이터 정책/인증 경고를 확인합니다. 막힌 채널/커넥터를 우회하거나 **No authentication**으로 바꾸지 않습니다.
6. **Publish**를 선택하고 성공 완료를 기다립니다. 진행 중/실패 상태를 Live로 기록하지 않습니다.
7. 성공 후 공유/조직 카탈로그 옵션은 선택하지 않습니다. **본인용 열기/설치** 옵션으로만 접속하고 로그인 계정을 다시 확인합니다.

## 3. 게시 채널에서 부작용 없는 실제 사용

게시 확인을 위해 Excel 행이나 메일을 다시 만들 필요는 없습니다. **선택적 저장 계획 조회 Tool에 의존하지 않는** 다음 두 질문을 새 대화로 보냅니다.

```text
내 OneDrive 규정 문서를 근거로 국내 숙박 한도와 교통비 증빙 조건을 알려 줘.
Excel 추가·메일 발송·보고서 저장은 하지 마.
```

```text
부산 2026-11-10~2026-11-12, 교통 120000원,
숙박 1박 150000원으로 2박, 기타 0원을 검토만 해 줘.
파일 생성·행 추가·메일 발송·저장은 하지 마.
```

1. 첫 답변은 **세금 포함 1인 1박 130000원**, 일반석/대중교통·영수증과 Word 근거여야 합니다.
2. 두 번째는 **총액 420000원 / 숙박 한도 260000원 / 초과 40000원 / 숙박 한도 초과**이며 전체 승인으로 표현하지 않아야 합니다.
3. 로그인 계정, 채널, 실행 시각/시간대, 답변과 도구 사용을 본인 메모에 기록합니다.
4. 실제 Excel 행·메일·reports 파일 증가가 모두 **0**인지 확인합니다.
5. 채널에서 File 바인딩/첨부 UX가 Preview와 같은지는 별도 제공 조건입니다. Preview 통과만으로 게시 채널에서도 된다고 주장하지 않습니다. 채널의 실제 파일 전달 사전 검증 없이는 발송·저장 테스트를 하지 않습니다.
6. 다른 학생에게 링크를 주거나 대신 테스트하게 하지 않습니다.

## 4. Monitor에서 production 사용 확인

1. 같은 에이전트의 **Monitor** 탭을 엽니다. 날짜 필터를 게시 채널 사용일로 맞추고 시간대를 확인합니다.
2. **Overview**의 Total sessions/users, Average duration, Success/Fail rate를 확인합니다. 본인 몇 건의 실습을 전체 서비스 품질로 일반화하지 않습니다.
3. **Sessions**에서 채널과 실행 시각으로 방금 게시 사용 세션을 찾습니다. 열어 메시지·응답·Knowledge 근거·Tool 호출을 확인합니다. Preview/Evaluate 세션과 구분합니다.
4. Reactions가 제공되면 본인 피드백을 확인하고 **Total estimated credits used**도 기록합니다. Monitor 값은 처리된 이벤트 기준이며 Preview/Evaluate의 즉시 추정치와 시점이 다를 수 있습니다.
5. 실패/거부 세션은 transcript와 연결 상태를 확인합니다. 모델의 “성공” 문구가 실제 행/메일/파일 증거를 대신하지 않습니다.

```{important}
Monitor는 게시 전에도 열리지만 production 데이터는 **게시 후 실제 사용**이 있어야 생깁니다. 분석 세션 종료 후 반영까지 **최대 약 1시간** 걸릴 수 있습니다. 즉시 비어 있으면 날짜/시간대/채널을 확인하고 기다리세요. 재발송/재등록으로 Monitor 데이터를 만들지 않습니다.

공식 문서의 세션 목록 범위는 최근 **28일**, transcript 다운로드 범위는 최근 **29일**입니다. 데이터가 아직 없으면 “게시 사용 성공 / Monitor 반영 대기”로 기록합니다. 실제 Monitor 세션 확인 전에는 최종 관찰 완료라고 적지 않습니다.
```

## 5. 오류 처리와 실습 종료

| 관찰 | 조치 |
|---|---|
| 본인 전용 권한/채널 설치 불가 | 게시 차단. 익명/조직 공유로 대체하지 않음 |
| Tool 인증 만료/정책 차단 | 본인 연결 재인증 또는 관리자 확인. 다른 계정/공개 저장소로 우회 금지 |
| 파일 카드만 있고 실제 File 연결 없음 | 해당 채널의 발송·저장 차단. 실습 7의 실제 파일 매핑 재확인 |
| 메일 성공·저장 실패 | 부분 성공을 알리고 저장만 수동 복구. 전체 workflow 재호출 금지 |
| timeout/응답 유실 | 실행 기록·보낸편지함·저장 artifact를 확인한 후 판단 |
| Monitor가 비어 있음 | 날짜/시간대/production 채널/세션 종료·반영 지연 확인 |
| 지침/Tool 변경 후 게시 답변이 옛 버전 | 안전 시험 후 재게시. Save만으로 게시 버전은 바뀌지 않음 |

실습을 끝내면 정책에 따라 본인용 채널 접근/쓰기 Tool 연결을 정리합니다. 다음 실습에서는 같은 교육 계정의 OneDrive·Outlook 연결을 사용하므로 연결 자체를 삭제하지 않습니다. 기록이 필요하면 본인 저장소에만 보관하며 토큰/메일 원문/연결 비밀값을 공유하지 않습니다. 샘플 이외 실제 업무 자료를 넣지 않습니다.

## 완료 체크리스트

- [ ] 평가 구성과 임시 오류 주입을 정리하고 원래 도구를 복원했다.
- [ ] 본인 계정/연결/인증 및 본인만 접근하는 게시 범위를 확인했다.
- [ ] 게시 채널에서 정적 규정/계산 질문을 실행하고 실제 쓰기 0을 확인했다.
- [ ] production 세션을 Monitor에서 확인했거나 반영 대기/차단을 정확히 기록했다.
- [ ] 실제 파일 바인딩·크기·실패 검증의 테넌트 한계를 남겼다.

## 공식 자료

- [GHCP 게시 절차와 재게시](https://learn.microsoft.com/microsoft-copilot-studio/agents-experience/publication-publish-agent)
- [GHCP 채널](https://learn.microsoft.com/microsoft-copilot-studio/agents-experience/publication-channels-overview)
- [GHCP 공유/접근](https://learn.microsoft.com/microsoft-copilot-studio/agents-experience/authoring-share-agent)
- [GHCP Monitor: 지연·28/29일·과금](https://learn.microsoft.com/microsoft-copilot-studio/agents-experience/analytics-overview)
- [GHCP 세션 관찰](https://learn.microsoft.com/microsoft-copilot-studio/agents-experience/authoring-review-activity)
- [Work IQ 조건과 통합 MCP](https://learn.microsoft.com/microsoft-copilot-studio/use-work-iq)

[이전: 실습 8. 지식 기반 질문 평가](lab08-evaluate-and-improve.md) | [다음: 실습 10. 업로드 파일 요약 메일](lab10-summarize-uploaded-file.md)
