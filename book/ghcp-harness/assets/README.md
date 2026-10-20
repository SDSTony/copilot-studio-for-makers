# 출장 실습 자료 관리

학습자는 실습 페이지의 다운로드 링크를 사용합니다. 이 폴더의 생성 도구를 실행할 필요는 없습니다.

## 제공 자료

- `domestic-travel-policy.docx`, `expense-rules.docx`, `travel-checklist.docx`: 각자의 OneDrive 지식 폴더에 업로드할 가상 교육 문서
- `trip-plans.xlsx`: 개인 OneDrive의 업무 기록용 Excel. 테이블 이름은 `TripPlans`, 열은 `PlanId`, `Destination`, `StartDate`, `EstimatedTotal`, `ReviewResult`, `Status` 6개
- `trip-plan-report.zip`: 지침·3장짜리 PPTX 템플릿·작성 가이드를 포함한 Skill 패키지
- `trip-plan-report\assets\trip-plan-template.pptx`: 원본 PPTX 템플릿
- `ghcp-harness-recording-titles.pptx`: 촬영 구간 구분용 16:9 제목 슬라이드 10장. 실습 1·2는 소개·환경 준비로 합치고 나머지는 각각 한 장으로 구성

실제 개인 정보나 출장 데이터를 포함하지 않습니다. 지식 문서 원본은 `knowledge` 폴더에, Skill 원본은 `trip-plan-report` 폴더에 있습니다.

## 자료 재생성

문서나 Skill 원본을 변경했다면 아래 PowerShell 명령으로 다운로드 파일을 갱신합니다. 저장소 루트에서 실행합니다. 다음 의존성은 자료 생성 전용이며 책 빌드에는 필요하지 않습니다.

```powershell
.\.venv\Scripts\python.exe -m pip install -r .\book\ghcp-harness\assets\requirements.txt
npm install --prefix .\book\ghcp-harness\assets
node .\book\ghcp-harness\assets\generate-documents.cjs
node .\book\ghcp-harness\assets\generate-presentation.cjs
.\.venv\Scripts\python.exe .\book\ghcp-harness\assets\generate-assets.py
.\.venv\Scripts\python.exe .\book\ghcp-harness\assets\validate-materials.py
.\.venv\Scripts\jupyter-book.exe build book
```

Word 문서는 docx-js로 생성합니다. Excel은 계산 모델이 아닌 등록 시점의 기록 테이블이므로 `EstimatedTotal`도 저장된 검토 값입니다. 계산식과 확인 기준은 Skill·Workflow 가이드에서 다룹니다.

Excel을 기존 12열 파일에서 바꿀 때는 새 다운로드 파일을 사용하고 Tool의 파일·표를 다시 선택하여 6열 입력을 확인합니다. 기존 학습자 기록을 덮어쓰지 말고 백업하거나 다른 파일명으로 보관합니다. 상세 비용은 대화와 Skill에서 검토하고 Excel에는 요약만 등록합니다.

PPT 템플릿은 PptxGenJS로 생성하고, `generate-assets.py`에서 `normalize-presentation.ps1`을 호출하여 데스크톱 PowerPoint로 다시 저장한 뒤 ZIP으로 패키징합니다. PptxGenJS 4.0.1의 notes master 순서 문제는 XML 순서만 바꾸면 PowerPoint에서 열리지 않으므로 네이티브 저장으로 보정합니다. **PPT 템플릿 재생성에는 Windows와 설치된 데스크톱 PowerPoint가 필요합니다.** 보정된 기존 템플릿을 유지하면서 ZIP만 다시 패키징하거나 책을 빌드할 때는 PowerPoint가 필요하지 않습니다. PPT 생성 후 패키지 생성 단계까지 실행해야 합니다.

보정 스크립트는 새 PowerShell 프로세스에만 `RemoteSigned` 실행 정책을 지정하며 컴퓨터나 사용자 정책을 변경하지 않습니다. 조직 정책으로 스크립트 실행이 제한되면 관리자에게 승인된 실행 방법을 확인합니다.

촬영용 제목 슬라이드는 아래 명령으로 별도 생성합니다. 이 작업도 Windows 데스크톱 PowerPoint가 필요합니다. 제목은 실습 가이드의 번호와 일치시키며, 슬라이드에서는 모두 **실습**이라는 용어를 사용합니다.

```powershell
node .\book\ghcp-harness\assets\generate-recording-titles.cjs
```

재생성 전에 열려 있는 PowerPoint 문서를 직접 저장하고 닫습니다. 보정 스크립트는 다른 문서가 열려 있으면 중단하며, 해당 문서를 자동으로 닫지 않습니다.

숙박 한도나 샘플 값을 바꾸면 관련 실습의 기대 결과와 모듈 8의 수기 평가 질문·기대응답도 함께 수정해야 합니다. 생성 도구는 기존 샘플 Excel을 초기화하므로 학습자의 실제 기록 파일을 대상으로 실행하지 않습니다.

## 검증 범위

검증 도구는 문서와 ZIP 구조, 원본·패키지 일치, Excel 스키마·샘플 수치, PPTX의 3장 구성·플레이스홀더·외부 리소스 부재를 검사합니다. 템플릿의 플레이스홀더는 의도된 입력 영역입니다. 생성 결과에는 플레이스홀더가 남으면 안 됩니다.

평가는 모듈 8의 질문·기대응답 2개를 Evaluate 화면에 직접 입력합니다. 별도 평가 파일은 제공하지 않습니다. 모듈 10은 기존 `domestic-travel-policy.docx`를 PC에 내려받아 별도 incoming 폴더에 새로 업로드하여 테스트합니다. PowerPoint에서 템플릿과 채워진 파일을 열어 디자인과 글자 넘침도 확인합니다. 실제 Copilot Studio 환경의 Skill 편집 결과, Work IQ MCP 인증·메일 조회, 생성 PPT의 Workflow 바이너리 전달, 이메일 첨부·OneDrive 저장 결과, Evaluate, 게시·Monitor, 파일 생성 감지·Agent의 Word 요약·메일 발송은 강사의 사전 리허설과 완료 체크리스트로 별도 검증해야 합니다. 생성 파일명이나 URL만으로 실제 파일 전달이 가능하다고 가정하지 않습니다.
