/* =========================================================
 * 캐릭터 이미지(PORTRAITS)와 화자(CAST)
 *
 * PORTRAITS: 화면에 깔리는 이미지 한 장 = 항목 하나
 *   src   : 이미지 경로
 *   focus : 화면이 이미지를 자를 때 기준점 (CSS object-position, "가로% 세로%")
 *   fx    : 등장 효과 (없음 | 'rage' 흔들며 확대 | 'hop' 통통 튀기)
 *
 * CAST: 대사 한 줄의 who 값 = 항목 하나
 *   name  : 이름표 (null 이면 나레이션 — 이름표 없이 화면을 어둡게)
 *   img   : 위 PORTRAITS 의 키
 *   tag   : 이름표 색 ('' 파랑 | 'intern' 초록 | 'other' 보라)
 *   yell  : true 면 큰 글씨 / cheer : true 면 초록 글씨
 * ========================================================= */
const PORTRAITS = {
  intern: { src: 'assets/images/intern.jpg',       focus: '50% 22%', alt: '인턴' },
  angry:  { src: 'assets/images/intern-angry.jpg', focus: '50% 25%', alt: '화난 인턴', fx: 'rage' },
  happy:  { src: 'assets/images/intern-happy.jpg', focus: '50% 25%', alt: '기뻐하는 인턴', fx: 'hop' },
  boss:   { src: 'assets/images/boss.jpg',         focus: '45% 30%', alt: '한지윤 과장' },
  hr:     { src: 'assets/images/hr.jpg',           focus: '50% 30%', alt: '인사팀장' },
};

const CAST = {
  intern:   { name: '오인턴', img: 'intern', tag: 'intern' },
  angry:    { name: '오인턴', img: 'angry',  tag: 'intern', yell: true },
  happy:    { name: '오인턴', img: 'happy',  tag: 'intern', yell: true, cheer: true },
  boss:     { name: '한지윤 과장', img: 'boss', tag: '' },
  supplier: { name: '미국 원료 공급사 (통화 중)', img: 'boss', tag: 'other' },
  vendor:   { name: '협력사 영업팀장', img: 'boss', tag: 'other' },
  hr:       { name: '인사팀장', img: 'hr', tag: 'other' },
  hrYell:   { name: '인사팀장', img: 'hr', tag: 'other', yell: true },
  sys:      { name: null },
};
