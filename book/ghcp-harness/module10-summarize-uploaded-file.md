# 모듈 10. OneDrive에 업로드한 파일을 요약하여 Teams로 받기

## 학습 목표

- OneDrive의 새 파일 업로드로 시작하는 Workflow를 만듭니다.
- **추출** 노드로 파일 내용을 텍스트로 변환하고 **에이전트** 노드로 요약합니다.
- 요약 결과를 Teams의 **자신에게 메시지 게시**로 받습니다.

## 완성할 흐름

```text
파일이 만들어진 경우
→ 추출
→ 에이전트
→ 자신에게 메시지 게시
```

[모듈 7](module07-register-trip-with-workflow.md)과 달리 이번에는 **파일 업로드가 시작점**입니다. 기존 출장 준비 도우미의 도구로 추가하지 않고 별도 Workflow로 만듭니다.

## 1. OneDrive 폴더와 테스트 파일 준비

1. 본인 회사 계정으로 OneDrive를 엽니다.
2. OneDrive의 내 파일에서 새 폴더를 만들고 이름을 **GHCP-Workflow-Lab**으로 지정합니다.
3. 아래 교육용 Word 파일을 PC에 다운로드합니다. **아직 폴더에 업로드하지 않습니다.**

**테스트 파일:** {download}`교육용 국내 출장 규정 <assets/domestic-travel-policy.docx>`

이번 실습에서는 본인 OneDrive와 Teams 연결을 사용합니다. 제공된 교육용 문서로 테스트합니다.

## 2. 파일 업로드 트리거 만들기

1. Copilot Studio의 워크플로 화면에서 새 Workflow를 만듭니다.
2. 이름을 **파일 요약 후 전송 워크플로**로 지정합니다.
3. 시작 노드에 **OneDrive for Business > 파일이 만들어진 경우**를 선택합니다.
4. 다음과 같이 설정합니다.

   | 항목 | 설정 |
   |---|---|
   | 연결 | 본인 OneDrive for Business 연결 |
   | 트리거 유형 | 커넥터 |
   | 폴더 | `/GHCP-Workflow-Lab` 선택 |

## 3. 추출 노드로 파일 내용 읽기

1. 시작 노드 뒤의 **+ 아이콘**을 클릭하고 **추출**을 추가합니다.
2. **구성**에서 다음과 같이 설정합니다.

   | 항목 | 설정 |
   |---|---|
   | 연결 | 본인 연결 |
   | 문서 | 트리거의 동적 콘텐츠 **파일 콘텐츠** |
   | 결과 이름 | `output` |
   | 결과 형식 | **텍스트** |

**파일 콘텐츠**는 글자로 직접 입력하지 않고 동적 콘텐츠에서 선택합니다. 추출 결과인 `output`을 다음 에이전트 노드에 전달합니다.

## 4. 에이전트 노드로 요약하기

1. **추출** 노드 뒤의 **+ 아이콘**을 클릭하고 **에이전트**를 추가합니다.
2. **구성**에서 다음과 같이 설정합니다.

   | 항목 | 설정 |
   |---|---|
   | 연결 | 본인 연결 |
   | 에이전트 | **이 워크플로의 새 에이전트** |

3. **안내**에 추출 노드의 동적 콘텐츠 **Output**을 삽입하고, 뒤에 아래 문장을 입력합니다.

   ```text
   해당 내용을 3문장 이내로 요약해서 알려주세요
   ```

**안내**는 **[추출 노드의 Output 토큰] + 요약 요청 문장**으로 구성합니다. `Output`이라는 글자 대신 실제 동적 콘텐츠를 선택합니다.

## 5. Teams로 자신에게 메시지 게시하기

1. **에이전트** 노드 뒤의 **+ 아이콘**을 클릭하고 **Microsoft Teams > 자신에게 메시지 게시**를 추가합니다.
2. **구성**에서 다음과 같이 설정합니다.

   | 항목 | 설정 |
   |---|---|
   | 연결 | 본인 Microsoft Teams 연결 |
   | 본문 > 콘텐츠 형식 | `text` |
   | 본문 > 내용 | 에이전트 노드의 동적 콘텐츠 **Agent Response** |

## 6. 게시하고 파일 업로드로 테스트하기

1. 워크플로를 게시합니다.
2. OneDrive의 **GHCP-Workflow-Lab** 폴더에 PC로 다운로드한 Word 파일을 새로 업로드합니다.
3. Workflow의 **활동**에서 다음 순서로 실행되는지 확인합니다.

   ```text
   파일이 만들어진 경우 → 추출 → 에이전트 → 자신에게 메시지 게시
   ```

4. Teams에서 자신에게 도착한 메시지를 확인합니다.
5. 요약이 **3문장 이내**인지, 원문 내용을 요약했는지 확인합니다.

업로드 감지와 실행에는 시간이 걸릴 수 있습니다.

실습을 마치면 Workflow를 비활성화하여 이후 파일 업로드로 자동 실행되지 않도록 합니다.

## 완료 체크리스트

- [ ] OneDrive에 GHCP-Workflow-Lab 폴더를 만들고 파일 생성 트리거에 연결했습니다.
- [ ] 추출 노드의 문서에 파일 콘텐츠를 연결하고 결과를 텍스트로 설정했습니다.
- [ ] 에이전트의 안내에 추출 노드의 Output과 3문장 이내 요약 요청을 넣었습니다.
- [ ] 자신에게 메시지 게시의 콘텐츠 형식을 text로 설정하고 내용에 Agent Response를 연결했습니다.
- [ ] 워크플로를 게시한 뒤 파일을 업로드하고 Teams에서 3문장 이내의 요약을 확인했습니다.
- [ ] 실습 종료 후 Workflow를 비활성화했습니다.

## 참고 자료

- [GHCP Workflow 개요](https://learn.microsoft.com/microsoft-copilot-studio/workflows-experience/flows-overview)
- [Workflow의 Agent 노드](https://learn.microsoft.com/microsoft-copilot-studio/workflows-experience/agent-node-workflow)
- [Workflow 테스트와 게시](https://learn.microsoft.com/microsoft-copilot-studio/workflows-experience/flow-designer)
- [OneDrive for Business의 파일 생성 트리거](https://learn.microsoft.com/connectors/onedriveforbusiness/#when-a-file-is-created)

[이전: 모듈 9. 게시와 모니터](module09-publish-and-monitor.md) | [과정 안내](course-overview.md)
