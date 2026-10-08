# 인턴: "내가 무역 좀 하면 안되냐?"

외자구매·SCM 신입사원 온보딩용 대화형 퀴즈 게임입니다.
설치나 서버 없이 `index.html`을 더블클릭하면 브라우저에서 바로 실행됩니다.

## 폴더 구조

```
intern-game/
├─ index.html                 화면 뼈대 (HUD, 장면, 대사창, 도감, 오버레이)
├─ css/style.css              전체 디자인 (색은 맨 위 :root 변수에서 관리)
├─ assets/
│  ├─ images/                 캐릭터·표지 이미지
│  └─ audio/bgm.mp3           배경음악
├─ js/
│  ├─ data/                   ★ 내용 수정은 대부분 여기서
│  │  ├─ config.js            HP·XP·직급·등급·속도·정답/오답 리액션 문구
│  │  ├─ characters.js        이미지 목록(PORTRAITS)과 화자 목록(CAST)
│  │  ├─ terms.js             SCM 용어 도감
│  │  ├─ story.js             프롤로그, 클리어 엔딩, 실패(인사팀) 엔딩
│  │  └─ stages.js            스테이지 1~5 대사·선택지·해설
│  ├─ core/                   엔진 (평소엔 손댈 일 없음)
│  │  ├─ dom.js               공통 도우미
│  │  ├─ state.js             플레이어 상태(S)와 계산식
│  │  └─ dialogue.js          대사 재생, 타자 효과, 뒤로가기
│  ├─ ui/                     화면 부품
│  │  ├─ portraits.js         캐릭터 이미지 전환
│  │  ├─ hud.js               HP·XP·진행도·장소 표시
│  │  ├─ effects.js           결재 도장, 흔들림, 용어 획득 알림
│  │  ├─ glossary.js          SCM 도감 서랍
│  │  ├─ certificate.js       수료증 + 색종이
│  │  └─ audio.js             배경음악 ON/OFF
│  ├─ game.js                 게임 흐름 (스테이지 진행, 정답/오답 처리, 엔딩)
│  └─ main.js                 시작점 (버튼·키보드 연결)
└─ tools/build_single_file.py 배포용 단일 HTML 파일 만들기
```

`index.html` 맨 아래의 `<script>` 순서(데이터 → 코어 → UI → 게임 → main)는 바꾸지 마세요.

## 자주 하는 수정

**대사·선택지·해설 고치기** → `js/data/stages.js`
대사 한 줄은 `{who:'boss', t:'대사'}` 형태입니다. `who`는 `characters.js`의 CAST 키, 줄바꿈은 `\n`입니다.

**스테이지 추가** → `js/data/stages.js` 배열 끝에 객체 하나를 추가합니다.
진행 칸, 최대 XP, 수료증 문구는 스테이지 개수에 맞춰 자동으로 바뀝니다. 새 용어를 주려면 `terms.js`에도 같은 `id`로 추가하세요.

**캐릭터 추가 / 이미지 교체**
1. 이미지를 `assets/images/`에 넣습니다.
2. `characters.js`의 `PORTRAITS`에 경로를 등록합니다. 얼굴이 잘리면 `focus` 값(예: `'50% 20%'`)을 조정합니다.
3. 같은 파일 `CAST`에 화자를 추가하고 대사에서 `who`로 씁니다.

**정답·오답 리액션 문구** ("와아!", "너 몇살이야?!") → `js/data/config.js`의 `REACTIONS`

**실패 엔딩** ("살려는 드릴게", 재계약 실패) → `js/data/story.js`의 `ENDING_FAIL`

**난이도** (오답 HP 감소, XP, 등급 기준) → 선택지별 `dmg`는 `stages.js`, 나머지는 `config.js`

**배경음악 교체** → `assets/audio/bgm.mp3`를 같은 이름으로 덮어쓰기

**표지 교체** → `assets/images/title-poster.jpg`를 같은 이름으로 덮어쓰기

## 배포용 파일 하나로 만들기

폴더째 보내기 어려울 때:

```
python tools/build_single_file.py
```

`dist/인턴_내가무역좀하면안되냐.html`이 생성됩니다. 이미지와 음악이 모두 들어 있어 이 파일 하나만 보내면 됩니다.

## 조작

- 클릭 / Space / Enter: 다음 대사
- 1 · 2 · 3: 선택지
- ◀ 뒤로, ← , Backspace: 이전 대사 (선택지 화면에서는 질문 직전 대사로)
- ⌂ 처음으로: 표지 화면
- Esc: 도감 닫기
