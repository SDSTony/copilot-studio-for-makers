# Lab 04 : 업무 맥락에 맞는 견적서 생성하는 에이전트

## 학습 목표

- 지식 (Knowledge)
- 원드라이브 (OneDrive) 커넥터 이해
- 아웃룩 (Outlook) 커넥터 이해

## 시나리오

- B2B 거래 특성상 이미 논의가 완료된 거래 건에 대해 기록을 남기기 위해 이메일로 물품 견적 등을 요청하는 경우가 있다.
- 실무자는 이메일 확인, 사내 단가표 검색, 견적서 템플릿 입력 등 반복적인 수작업을 진행한다.
- 이 과정에서 데이터 입력 오류가 발생할 수 있다.
- 본 실습에서는 에이전트가 이메일과 문서를 기반으로 자동 견적서를 생성하도록 한다.

## 지시사항


1. [Copilot Studio](https://copilotstudio.microsoft.com/)에서 **+ 빈 에이전트 만들기**를 클릭합니다. 다음 정보를 입력합니다:
   - **에이전트 이름:** 견적서 생성 에이전트
   - **스키마 이름:** quotationAgent

   ![1. 에이전트 이름 지정](./imgs/new-quotation-agent/Slide1.JPG)

2. 에이전트가 생성되면 **도구** 탭을 클릭하고, **도구 추가** 버튼을 클릭합니다. 하단의 **커넥터** 탭을 클릭하여 사용 가능한 커넥터 목록을 확인합니다. 목록에서 **Office 365 Outlook** 커넥터를 찾아 클릭합니다.

   ![2. Office 365 Outlook 커넥터 선택](./imgs/new-quotation-agent/Slide2.JPG)

3. Office 365 Outlook 커넥터가 표시되면, Office 365 Outlook에서 제공하는 여러 작업 중에서 **메일 받기(V3)** 를 클릭합니다. 이 작업은 에이전트가 사용자의 받은 편지함에서 이메일을 조회할 수 있게 해줍니다.

   ![3. 메일 받기(V3) 선택](./imgs/new-quotation-agent/Slide3.JPG)

4. "Get emails (V3)" 작업 설정 페이지가 표시됩니다. **연결** 필드에 연결이 안되어 있다면,  클릭하여 새 연결을 추가 합니다. 그리고 나서 우측 하단의 **추가 및 구성** 버튼을 클릭하여 작업을 에이전트에 추가합니다.

   ![4. 연결 확인 후 추가 및 구성](./imgs/new-quotation-agent/Slide4.JPG)

5. "메일 받기(V3)" 작업 설정 페이지가 표시됩니다. **세부 정보** 섹션에서 **설명** 필드를 찾아 다음과 같이 입력합니다:
   
   **설명:** `해당 작업을 사용해서 이메일을 가지고 와 주세요`

   이렇게 구체적인 설명을 작성하면 AI가 해당 작업을 선택할 때 더 정확하게 인식합니다.

   ![5. 작업 설명 입력](./imgs/new-quotation-agent/Slide5.JPG)

6. 아래로 스크롤하여 **추가 세부 정보** 섹션을 확인합니다. **사용할 자격 증명** 항목에서 **작성자가 제공한 자격 증명** 으로 설정 합니다. 이 설정을 활성화하면, 에이전트를 다른 사람이 쓰게 되더라도, 항상 현재 메이커의 메일 계정으로 이메일을 조회하게 됩니다. 일반적인 상황에서 자주 권장되지는 않겠지만, 이번 교육 시나리오에서는 활성화 하겠습니다. 추후 실습할 때 다시 연결해야 하는 번거로움을 줄이기 위해서입니다.

   ![6. 추가 세부 정보 및 자격 증명 설정 확인](./imgs/new-quotation-agent/Slide6.JPG)

7. **입력** 섹션에서 **+ 입력 추가** 버튼을 클릭합니다. "입력 추가" 대화가 표시되면, 다음 입력 매개변수들을 검색한 뒤 클릭해서 추가합니다:
   
   - **Top**, **Subject Filter**, **Fetch Only Unread Messages**

   ![7. 입력 추가 대화](./imgs/new-quotation-agent/Slide7.JPG)

8. 각 파라미터 들의 설정을 **사용자 지정** 으로 설정합니다. 그리고 다음과 같이 값을 설정합니다:

   - **Top**: 1 (결과로 내뱉을 이메일 개수를 1개로 설정하여 가장 최근 이메일만 가져옵니다)
   - **Subject Filter**: 견적서 (제목에 "견적서"가 포함된 이메일만 필터링합니다)
   - **Fetch Only Unread Messages**: False (읽은 메시지도 포함하여 조회합니다)

   ![8. 입력 매개변수 설정](./imgs/new-quotation-agent/Slide8.JPG)

9. 아래로 스크롤하여 **완료** 섹션을 확인합니다. 이 섹션에서는 "메일 받기" 작업 후 에이전트가 어떻게 응답할지 설정합니다. **특정 응답 보내기** 옵션을 사용하여 고정된 응답을 설정할 수 있습니다. 
   
   **특정 응답 보내기**로 설정하고 빈칸에 `이메일 불러오기 완료`를 입력한다. 그리고 우측 상단의 **저장** 버튼을 클릭하여 메일 받기 작업 설정을 완료합니다.

   ![9. 출력 섹션 설정 및 저장](./imgs/new-quotation-agent/Slide9.JPG)

10. 메일 받기 작업 설정이 완료되면, 다시 **도구** 탭으로 이동하여 **+ 도구 추가** 버튼을 클릭합니다. 

    ![10. 메일 받기 도구 추가 완료](./imgs/new-quotation-agent/Slide10.JPG)

11. 목록에서 **비즈니스용 OneDrive** 커넥터를 찾아 클릭합니다. 이 커넥터는 추후 OneDrive 상의 파일 복사를 위해 필요합니다.

    ![11. 비즈니스용 OneDrive 커넥터 선택](./imgs/new-quotation-agent/Slide11.JPG)

12. OneDrive 커넥터가 표시되면, 여러 작업들이 나타납니다. 이 중에서 **경로를 사용하여 파일 복사** 작업을 찾아 클릭합니다.

    ![12. OneDrive Copy file using path 작업 선택](./imgs/new-quotation-agent/Slide12.JPG)


13. **연결** 필드에 연결이 안되어 있다면,  클릭하여 새 연결을 추가 합니다. 그리고 나서 우측 하단의 **추가 및 구성** 버튼을 클릭하여 작업을 에이전트에 추가합니다.

    ![13. OneDrive 연결 확인 후 추가 및 구성](./imgs/new-quotation-agent/Slide13.JPG)

14. 작업 설정 페이지가 표시됩니다. 아래로 스크롤하여 **추가 세부 정보** 섹션을 확인하고, **사용할 자격 증명** 항목에서 **작성자가 제공한 자격 증명**으로 선택합니다.

    ![14. Copy file 작업 설명 및 자격 증명 설정](./imgs/new-quotation-agent/Slide14.JPG)

15. **입력** 섹션 다음 파라미터 설정을 진행합니다. 
   
    - **File Path**: 사용자 지정으로 선택한 뒤, 폴터 아이콘을 눌러 OneDrive에서 복사할 소스 파일의 경로를 입력합니다. 견적서 템플릿 파일의 경로를 지정할 수 있습니다. 


    ![15. File Path 및 Destination File Path 설정](./imgs/new-quotation-agent/Slide15.JPG)

16. "Lab04" 폴더에서 "템플릿/견적서_템플릿_예제.xlsx" 파일을 선택합니다. 이 파일이 소스가 되어 복사될 파일입니다.

    ![16. 소스 파일(견적서 템플릿) 선택](./imgs/new-quotation-agent/Slide16.JPG)

17. **Destination File Path** 필드는 "사용자 지정"으로 설정합니다.

    ![17. Destination File Path 동적값 설정](./imgs/new-quotation-agent/Slide17.JPG)

18. **Destination File Path** 필드에서 ... > 수식 으로 이동합니다. 그리고 화살표 아이콘을 클릭하여 화면을 확장해본다.

    ![18. Destination File Path 수식 입력](./imgs/new-quotation-agent/Slide18.JPG)

19. 아래 수식을 복사 붙여 넣는다. 수식 입력이 완료되면 초록색 체크 아이콘이 떠야 합니다. 그리고 삽입을 클릭합니다. 
```
Concatenate(
    "/Accounts/CJ/Labs/Lab04/견적서/견적서_",
    Text(
        DateAdd( Now(), 0, TimeUnit.Hours),
        "yyyymmddHHmmss"
    ),
    ".xlsx"
)
```

![19. 수식 입력 완료 및 설정](./imgs/new-quotation-agent/Slide19.JPG)

20. 완료 섹션에서 `특정 응답 보내기(아래에 지정)` 으로 설정하고 `견적서 복사 완료`를 입력한다. **저장** 버튼을 클릭하여 설정을 완료합니다.

    ![20. Copy file 작업 저장](./imgs/new-quotation-agent/Slide20.JPG)

21. **도구** 탭으로 이동하여 + 도구 추가를 클릭한다.

    ![21. 도구 목록에서 두 개의 도구 확인](./imgs/new-quotation-agent/Slide21.JPG)

22. **Excel Online(Business)** 커넥터를 찾아 클릭합니다. 이 도구는 엑셀을 조작할 때 사용됩니다.

    ![22. Excel Online(Business) 커넥터 선택](./imgs/new-quotation-agent/Slide22.JPG)

23. Excel Online(Business) 커넥터의 여러 작업 중 **"테이블에 행 추가"** (Add a row into a table) 작업을 찾아 클릭합니다. 이 작업은 물품 정보를 Excel 테이블에 추가할 수 있게 해줍니다.

    ![23. Excel 테이블에 행 추가 작업 선택](./imgs/new-quotation-agent/Slide23.JPG)

24. "Add a row into a table" 작업 설정 페이지가 표시됩니다. **연결** 필드에 현재 사용자의 계정이 자동으로 선택되어 있는지 확인합니다. 없으면 연결합니다. 우측 하단의 **추가 및 구성** 버튼을 클릭합니다.

    ![24. Excel 작업 연결 확인 후 추가 및 구성](./imgs/new-quotation-agent/Slide24.JPG)

25. 아래로 스크롤하여 **추가 세부 정보** 섹션을 확인하고, **사용할 자격 증명**에서 **작성자가 제공한 자격 증명** 으로 설정합니다.

    ![25. Excel 작업 상세 설정 및 자격 증명 확인](./imgs/new-quotation-agent/Slide25.JPG)

26. **입력** 섹션에서 Location과 Document Library를 사용자 지정으로 선택한 뒤, 아래와 같이 설정한다. 

    - **Location**: OneDrive for Business
    - **Document Library**: OneDrive (또는 문서)

    ![26. Excel Location, Document Library, File, Table 설정](./imgs/new-quotation-agent/Slide26.JPG)

27. **File** 필드에서 `견적서_템플릿_엑셀.xlsx` 파일을 찾아 선택합니다. 

    ![27. Excel 단가표 파일 선택](./imgs/new-quotation-agent/Slide27.JPG)

28. **Table** 도 **사용자 지정**으로 설정하고, 드롭다운 목록에서 "Quotation" 테이블을 선택합니다. 이는 각 아이템별 정보가 저장될 테이블입니다. 

    ![28. Excel Table 선택 및 설정](./imgs/new-quotation-agent/Slide28.JPG)

29. **File** 필드로 다시 이동하여 **AI로 채우기** 로 변경합니다. 그리고 "추가 세부사항"을 클릭하여 설명에 아래와 같이 입력합니다. 

```
이전 단계의 결과물(output)에서 Id 값을 파싱하여, 다음과 같은 패턴의 문자열을 추출하여 사용할 것 - 648ABCEDFW159WBEZJOI9301EFA
```

![29. Excel File 필드 추가 세부정보 입력](./imgs/new-quotation-agent/Slide29.JPG)

30. **저장** 버튼을 클릭하여 현재까지의 설정을 저장합니다. 아직 모든 필드를 완료하지 않았을 수 있지만, 진행 상황을 저장합니다.

    ![30. Excel 작업 설정 저장](./imgs/new-quotation-agent/Slide30.JPG)

31. **Row** 필드의 "+ 추가 세부사항" 을 클릭하여 아래 설명을 입력합니다. 

```
다음과 같은 형식이어야 합니다. 

{
  "개수": 2,
  "단가": "100,000",
  "품목명": "사과"
}

```

![31. Excel Row 매핑 설정](./imgs/new-quotation-agent/Slide31.JPG)

32. **완료** 섹션에서 "특정 응답 보내기(이래에 지정)" 옵션을 선택하고, 견적서 작성 완료 후 사용자에게 보낼 응답 메시지를 `견적서 품목 한 항목 추가 완료` 로 입력한다. **저장** 버튼을 클릭하여 설정을 완료합니다.

    ![32. Excel 작업 출력 및 응답 메시지 설정](./imgs/new-quotation-agent/Slide32.JPG)

33. **도구** 탭에서 `+ 도구 추가`를 클릭한다. 

    ![33. 추가된 도구 목록 확인](./imgs/new-quotation-agent/Slide33.JPG)

34. **Excel Online(Business)** 커넥터를 연결한 뒤, "**테이블에 있는 행 나열**" (List rows present in a table) 작업을 선택한다.

    ![34. List rows present in a table 작업 선택](./imgs/new-quotation-agent/Slide34.JPG)

35. **연결** 설정을 진행하고, **추가 및 구성** 을 클릭한다. 

    ![35. List rows 작업 설정 및 자격 증명](./imgs/new-quotation-agent/Slide35.JPG)

36. 추가 세부 정보로 이동하여 **사용할 자격 증명** 항목에서 **작성자가 제공한 자격 증명** 으로 설정합니다.

![36. List rows 입력 매개변수 설정](./imgs/new-quotation-agent/Slide36.JPG)

37. **입력** 섹션에서:
    - **Location**: OneDrive for Business
    - **Document Library**: OneDrive (또는 문서)
    - **File**: 품목 현황.xlsx 
    
    ![37. ItemPriceTable 선택](./imgs/new-quotation-agent/Slide37.JPG)

38. **Table** 드롭다운에서 "**ItemPriceTable**"을 선택합니다. 이 테이블은 사내 물품들의 단가 정보를 포함하고 있습니다.

    ![38. 에이전트 모델 선택 및 설정](./imgs/new-quotation-agent/Slide38.JPG)


39. 저장 합니다.

    ![39. 에이전트 테스트 시작 및 도구 실행](./imgs/new-quotation-agent/Slide39.JPG)

40. 개요 탭으로 이동하여 아래 지침을 추가합니다.
```
견적서 초안 작성을 요청하면 아래와 같이 진행합니다. 

1.  
/메일 받기(V3) 를 사용해서 견적서 요청 메일을 가지고 옵니다. 본문을 확인하여 견적이 필요한 품목과 품목별 개수를 파악합니다. 
2. /테이블에 있는 행 나열 을 활용하여 각 품목별 단가를 확인합니다. 메일에서 문의한 품목들의 단가들을 잘 확인합니다. 
3. /경로를 사용하여 파일 복사 를 사용해서 견적서 복사합니다. 
4. 견적 요청이 온 품목 개수 만큼 /테이블에 행 추가 를 진행합니다. 품목과, 단가, 그리고 개수를 잘 맵핑해서 전달합니다. 합계까지는 계산 안해도 됨, 엑셀에서 계산할 것임.
```

![40. 에이전트 도구 실행 진행 과정](./imgs/new-quotation-agent/Slide40.JPG)

41. 테스트 창에 `견적서 초안 작성` 이라고 입력하고 전송해봅니다.  

    ![41. 에이전트 테스트 결과 목록](./imgs/new-quotation-agent/Slide41.JPG)

42. 생성된 견적서 초안을 확인해봅니다. 
    ![42. 최종 생성된 견적서 확인](./imgs/new-quotation-agent/Slide42.JPG)

## 요약

이 실습을 통해 다음을 학습했습니다:

- **커넥터 통합**: Office 365 Outlook, OneDrive, Excel Online 등 여러 커넥터를 에이전트에 통합하는 방법
- **도구 구성**: 각 도구의 설정, 입력/출력 매개변수, 자격 증명 관리 방법
- **동적 워크플로우**: 이메일 데이터 → 파일 생성 → 데이터베이스 업데이트의 통합 워크플로우 구현

