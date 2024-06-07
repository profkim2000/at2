# 시험문제

## 주의사항
* 시험문제 외의 다른 코드는 수정하지 않는다. (DB 로그인 ID, pwd는 수정 가능)
* js 파일과 jsp 파일만 수정
* vite.config.js 파일 등 다른 파일은 수정하지 않는다.
* 파일명도 변경하지 않는다.

## 자료 처리

### 데이터베이스 새로 생성

- DB 이름: jjcvs
- database에 postgis 설치
- 사용자: scott / tiger

### 자료 다운로드
* 사용할 자료: 전주시 편의점 현황
* URL: https://www.data.go.kr/data/15113231/fileData.do
* CSV 파일로 다운로드받아 사용
* 컬럼명을 영문으로 수정
    * 상호명 >> name
    * 소재지도로명주소 >> addr_doro
    * 소재지지번주소 >> addr_jibun
    * 위도 >> lat
    * 경도 >> lon
    * 전화번호 >> tel
* csv파일에 DRM이 걸리면 반드시 풀어준다.

### QGIS에서 csv 파일 읽어들여 jjcvs db로 보내기

#### 레이어로 읽어들이기

* X필드: lon, Y필드: lat
* 인코딩: EUC-KR
* EPSG:4326 WGS84

#### DB로 보내기

* 테이블명: cvshop
* id, geom 포함.

<br>

## geoServer

* 작업공간: jjcvs
* 저장소: jjcvs
    * host: 172.30.0.7
    * port: 5432
* 레이어: cvshop (cvshop 테이블과 연결)

<br>

## openLayers 프로젝트 생성
* D:\webmap-교번 디렉토리 생성(예: D:\webmap-03 **시험 후 이 디렉토리는 삭제하지 않음.**)
* D:\webmap-교번 디렉토리에서 "npm create ol-app jjcvs" 로 프로젝트 생성

<br>

## 시험문제 복사
* github에서 다음 5개의 파일을 복사해 덮어쓴다.
    * index.html
    * main.js
    * style.css
    * vite.config.js
    * info.jsp 
    * 위 5개 파일 모두 파일명 변경 금지

<br>

## JSP 작업
* openLayers 작업이 완료되면 build 후 http://localhost:42888/jjcvs 에서 작업한 내용이 보이도록 tomcat에 저장

<br>

## 답안 작성
* github의 "답안.hwp" 파일을 다운로드 받아 각 칸을 채워(답안을 잘못 옮겨적지 않도록 copy & paste로) 
* D:\webmap-교번 폴더에 "교번.pdf" 로 저장(예: D:\webmap-03\\**03.pdf**)한 후 
* PC 전원 OFF. (따로 제출하지 않음)

## 채점 기준
* 채점 방법
    * 10문제 모두 정답을 적어놓은, 잘 동작하는 소스코드에 답을 1번부터 하나씩 복사해 넣어 원래 기능대로 잘 동작하는지 여부 확인. 동작하면 10점. 아니면 0점.

* 1문제당 10점, 총 100점
* 주의사항을 지키지 않고 임의로 환경, 소스코드 변경해 맞춘 문제는 0점 처리.
* 문항당 부분점수는 없음.
* 대소문자 가림
