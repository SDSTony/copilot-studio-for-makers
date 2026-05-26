# 이미지 및 PDF 파일을 안정적으로 처리하는 에이전트 구축

## 파일 전달의 핵심: PowerFx 수식과 JSON 스키마 맞추기

Copilot Studio에서 사용자가 첨부한 파일을 Agent Flow(Power Automate)나 커넥터에 전달할 때는 **특정 JSON 구조**를 반드시 따라야 합니다.

### 핵심 수식

파일을 Power Automate 흐름이나 커넥터에 전달할 때 사용하는 PowerFx 수식은 다음과 같습니다:

```
{ contentBytes: Topic.userReceipt.Content, name: Topic.userReceipt.Name }
```

- `contentBytes` — 파일의 바이너리 데이터 (Base64)
- `name` — 파일 이름

> 💡 여기서 `Topic.userReceipt`는 Question 노드 또는 변수 설정으로 수집한 파일 변수입니다. 실습에서는 `Topic.LoopValue1`처럼 루프 내 변수로 대체하여 사용합니다.

---

### 파일을 수집하는 3가지 방법

**① Question 노드 활용**

- 토픽에 **Question 노드** 추가
- **Identify** 에서 `File` 선택
- Question properties 패널 → Entity recognition 카테고리 → **Include file metadata** 활성화

**② System.Activity.Attachments 변수 활용**

- 사용자가 대화 중 파일을 첨부하면 `System.Activity.Attachments`에 자동 저장됨
- `First(System.Activity.Attachments)` 로 첫 번째 파일 접근
- **Set variable value** 노드로 별도 변수에 복사하여 사용 권장

```
First(System.Activity.Attachments).Content   → contentBytes에 사용
First(System.Activity.Attachments).Name      → name에 사용
```

> ⚠️ `System.Activity.Attachments`는 Activity가 발생할 때마다 초기화됩니다. 토픽 내에서 파일을 계속 사용하려면 반드시 별도 변수에 저장해야 합니다.

**③ 두 방법 조합 (권장)**

- `First(System.Activity.Attachments)`로 파일이 이미 첨부되어 있는지 먼저 확인
- 없으면 Condition → Question 노드로 파일 요청
- 예: "이 파일과 함께 이메일 보내줘 `my.file`" → 자동 처리 / 파일 없이 요청 → 파일 업로드 요청

---

### 여러 파일 처리: 루프 + JSON 수식

여러 파일이 첨부된 경우 `System.Activity.Attachments`는 테이블 형태로 복수의 레코드를 담습니다. 이 경우 **루프(목록을 통해 루프)** 노드를 사용하여 각 파일을 순서대로 처리합니다.

루프 내에서 각 파일을 Agent Flow에 전달할 때의 수식:

```
{ contentBytes: Topic.LoopValue1.Content, name: Topic.LoopValue1.Name }
```

---

### 커넥터에 파일 전달 시 주의사항

일부 커넥터는 파일 입력을 래핑해야 합니다. 예를 들어 **Send an email (V2)** 커넥터의 Attachments 입력은 `contentBytes`와 `name` 키를 가진 레코드 테이블 형식입니다. 동일한 PowerFx 수식을 사용합니다.

**도구(Tool)로 등록된 Flow에 파일 전달 시**:

```
If(
    IsEmpty(System.Activity.Attachments),
    [],
    [{ contentBytes: First(System.Activity.Attachments).Content, name: First(System.Activity.Attachments).Name }]
)
```

> ⚠️ 도구 페이지에서 파일 입력은 **Custom value(수식)** 방식으로만 작동합니다. **Dynamically fill with AI** 옵션으로는 작동하지 않습니다.

---

## 실습: 파일 형태로 입력된 이력서 분석

### 학습 목표

- 하드 코딩 방법을 통해 결정론적으로 에이전트에게 파일을 전달하는 과정을 살펴본다.

### 시나리오

첨부 파일 개수만큼 Agent Flow를 실행시키고, 적절한 값을 Agent Flow에게 전달하는 결정론적인 프로세스를 구현해본다.

---

### 실습 단계

**1단계: Copilot Studio에서 새로운 에이전트를 만든다. 이름은 `파일 분석 에이전트`로 설정한다.**

**2단계: 도구 추가를 눌러 새로운 에이전트 흐름을 추가한다.**

**3단계: '에이전트가 흐름을 호출할 때' 트리거 입력 값에 파일 입력값을 추가한다. 아래와 같이 설정한다.**

- **입력 이름**: `file`
- **설명**: `resume file`

```{image} imgs/lab04-01-agent-flow-file-input.png
:alt: Agent Flow 파일 입력 설정
:align: center
```

**4단계: 프롬프트 실행 작업을 하나 추가하고, 새 사용자 지정 프롬프트를 클릭한다.**

**5단계: 아래와 같이 프롬프트의 구성요소를 설정한다.**

> ⚠️ 에러 메시지가 풍부하지 않아 정확한 원인은 파악하기 어렵지만, '올해 연도'를 PowerFx 변수로 넣으면 시스템 에러가 발생하는 것이 종종 확인되었다. 그래서 이번 프롬프트에서는 올해 연도 변수 대신 **2026으로 하드 코딩** 하였다.

- **프롬프트 제목**: `파일 이력서에서 데이터 추출`
- **모델**: `GPT-5 chat`
- **지침**:

```
/문서 입력 에서 지원자 성함, 총 경력 기간, 주요 역량을 추출해서 아래와 같은 포맷으로 반환해주세요.
민감한 정보는 처리하지 마세요.
총 경력 기간을 계산할 때는 지원자가 처음 일을 시작했을 때 부터 2026년 까지의 기간을 계산해주세요.

{
  성함: 홍철수
  총 경력 기간: 5
  주요 역량: Power Apps를 활용한 프로젝트, ALM 전략 수립 경험, Power BI 대시보드 구축 경험
}
```

- **변수**: `문서 입력` — 이미지 또는 문서

```{image} imgs/lab04-02-prompt-variable-settings.png
:alt: 프롬프트 변수 설정
:align: center
```

**6단계: 문서 입력 변수에 `홍영미_이력서.pdf`를 첨부한다. 출력은 JSON으로 변경한 뒤 테스트를 눌러 결과물이 잘 나오는지 확인한다. 테스트 후에 저장을 클릭한다.**

```{image} imgs/lab04-03-prompt-test-result.png
:alt: 프롬프트 테스트 결과
:align: center
```

**7단계: 프롬프트 실행 작업의 "문서 입력" 란에는 앞서 트리거에서 제공하는 변수 중 `file contentBytes`를 선택하여 추가한다.**

```{image} imgs/lab04-04-file-contentbytes-selection.png
:alt: file contentBytes 변수 선택
:align: center
```

**8단계: "테이블에 행 추가" 작업을 추가한 뒤 아래와 같이 설정한다.**

- **위치**: `OneDrive for Business`
- **문서 라이브러리**: `문서` (또는 OneDrive)
- **파일**: `2026 코파일럿 에이전트 교육 심화/지원자 정리.xlsx` (폴더 아이콘을 클릭하여 탐색하여 추가)
- **테이블**: `resume_table`
- **성함**: 프롬프트 실행의 성함 변수
- **총 경력 기간**: 프롬프트 실행의 총 경력 기간 변수
- **주요 역량**: 프롬프트 실행의 주요 역량 변수

```{image} imgs/lab04-05-table-row-add-settings.png
:alt: 테이블에 행 추가 설정
:align: center
```

**9단계: Respond to the agent에서 출력 변수에 텍스트 타입을 추가한 뒤 아래와 같이 설정한다.**

- **출력 이름**: `output`
- **값**: `추가 완료 하였습니다.`

```{image} imgs/lab04-06-output-variable.png
:alt: output 변수 설정
:align: center
```

**10단계: 초안 저장 후 게시한다. 그리고 개요로 이동하여 흐름 이름을 `파일에서 추출 후 행 추가`로 변경한다.**

**11단계: 파일 분석 에이전트로 이동하여 새로운 토픽을 추가한다. 토픽명은 `파일 업로드 되면 바로 실행`으로 설정한다. 그리고 트리거 변경 버튼을 클릭한다.**

```{image} imgs/lab04-07-topic-trigger-change.png
:alt: 트리거 변경 버튼 클릭
:align: center
```

**12단계: 활동 발생 트리거를 클릭한다.**

```{image} imgs/lab04-08-activity-trigger.png
:alt: 활동 발생 트리거 선택
:align: center
```

**13단계: 활동 발생의 '편집' 메뉴를 클릭한 뒤 조건을 아래 스크린샷처럼 설정한다.**

> 💡 `System.Activity.Attachments` 변수에는 특정 Activity가 발생한 맥락 상에서 사용자가 입력한 첨부 파일이 저장된다. 예를 들어 사용자가 메시지를 에이전트에게 입력했을 때 첨부 파일이 같이 있다면 `System.Activity.Attachments`에 저장된다. 이 변수에 값이 있을 때 토픽이 트리거 되도록 설정한다.

```{image} imgs/lab04-09-activity-condition.png
:alt: 활동 발생 조건 설정 - System.Activity.Attachments
:align: center
```

> ⚠️ `System.Activity.Attachments` 변수는 Activity가 발생할 때마다 초기화된다. 따라서 해당 파일을 토픽 내에서 영구적으로 사용하기 위해서는 **별도의 변수에 해당 값을 저장**해두는 것이 좋다.

**14단계: 노드 추가 버튼을 클릭한 뒤 변수 관리 > 변수 값 설정을 클릭한다.**

```{image} imgs/lab04-10-variable-management.png
:alt: 변수 관리 - 변수 값 설정
:align: center
```

**15단계: 변수 선택을 클릭한 뒤 새로 만들기를 클릭한다.**

```{image} imgs/lab04-11-create-variable.png
:alt: 새 변수 만들기
:align: center
```

**16단계: Var1 변수가 추가된다. Var1 변수를 클릭한 뒤 변수 이름을 `attachedFiles`로 변경한다.**

```{image} imgs/lab04-12-rename-attachedfiles.png
:alt: 변수 이름을 attachedFiles로 변경
:align: center
```

**17단계: 받는 사람 값의 `…`을 클릭한 뒤 시스템으로 이동하여 `Activity.Attachments`를 클릭한다. 이렇게 하여 시스템 변수의 내용물을 `attachedFiles` 변수로 옮겨준다.**

```{image} imgs/lab04-13-activity-attachments.png
:alt: Activity.Attachments를 attachedFiles로 복사
:align: center
```

> 💡 `attachedFiles` 변수는 테이블 유형이므로 여러 개의 레코드가 존재한다. 따라서 각 레코드마다 처리하는 과정을 반복문으로 만들어야 한다.

**18단계: '목록을 통해 루프' 노드를 아래와 같이 추가한다.**

```{image} imgs/lab04-14-loop-node.png
:alt: 목록을 통해 루프 노드 추가
:align: center
```

**19단계: `attachedFiles` 변수를 루프할 항목으로 설정한다. 테이블 내 각 레코드를 `LoopValue1`에 저장하여 반복 처리하는 로직이 형성된다.**

```{image} imgs/lab04-15-loop-attachedfiles.png
:alt: attachedFiles 루프 설정 - LoopValue1
:align: center
```

**20단계: 루프 사이에 앞서 만든 `파일에서 추출 후 행 추가` 흐름을 추가한다.**

```{image} imgs/lab04-16-add-flow-in-loop.png
:alt: 루프 내 Agent Flow 추가
:align: center
```

**21단계: `file` 변수의 `…`을 클릭한 뒤 수식으로 이동하여 아래 식을 입력한다.**

> Power Automate의 파일 타입 변수는 아래와 같은 구조의 데이터를 입력받는다.

```
{ contentBytes: Topic.LoopValue1.Content, name: Topic.LoopValue1.Name }
```

```{image} imgs/lab04-17-formula-input.png
:alt: file 변수 수식 입력
:align: center
```

**22단계: 메시지 노드를 추가하여 입력란에 `Topic.output` 변수를 추가한다. 이를 통해 앞선 노드에서 나온 output 값을 대화 창에 전달할 수 있다.**

```{image} imgs/lab04-18-message-node-output.png
:alt: 메시지 노드에 Topic.output 변수 추가
:align: center
```

**23단계: 루프 바깥에 현재 토픽 종료 노드를 추가하여 토픽을 마무리한다. 그리고 우측 상단 '저장' 버튼을 클릭하여 저장한다.**

```{image} imgs/lab04-19-end-topic-node.png
:alt: 토픽 종료 노드 추가 및 저장
:align: center
```

**24단계: 테스트 패널에 이력서 파일을 2개 동시에 입력하고 전송한다.**

> 💡 파일 첨부 여부를 기반으로 작동하므로 '이력서 분석 해줘'와 같은 의도 메시지 없이 파일만 업로드해도 동작한다. 테스트 시 **토픽 간 추적을 활성화**하면 토픽 내 진행 현황을 확인할 수 있다.

```{image} imgs/lab04-20-test-panel.png
:alt: 테스트 패널 - 이력서 파일 2개 업로드
:align: center
```

> ⚠️ 초반에는 커넥터 연결 설정을 해줘야 하는 것 때문에 작업 수행이 잘 안될 수 있다. 한번 연결을 잡아준 뒤 다시 진행하면 정상 동작한다.

```{image} imgs/lab04-21-test-result.png
:alt: 실습 결과 확인
:align: center
```

### 완성된 토픽 전체 구조

```{image} imgs/lab04-22-completed-topic.png
:alt: 완성된 토픽 전체 구조
:align: center
```

### 실습 요약

- **활동 발생(Activity)** 트리거 유형을 사용하여 사용자의 대화 의도가 아닌 **특정 이벤트 발생 시 실행**되는 토픽을 구축해 보았다.
- 토픽 내에서 **반복문(루프)**을 구현해 보았다.
- 파일 전달을 **결정론적으로 하는 방법** (JSON 구조 직접 지정)을 체험해 보았다.

## 참고문헌

- [Pass files from agents to connectors - Microsoft Copilot Studio](https://learn.microsoft.com/en-us/microsoft-copilot-studio/guidance/pass-files-to-connectors#pass-a-user-file-to-a-power-automate-flow)
