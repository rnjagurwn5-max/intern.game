/* =========================================================
 * 게임 진행 상태 — 플레이어 수치는 전부 이 객체 하나에 있습니다.
 * ========================================================= */
const S = {
  stage: -1,          // 현재 스테이지 인덱스 (-1 = 시작 전)
  hp: CONFIG.maxHp,
  xp: 0,
  terms: new Set(),   // 획득한 용어 id
  freshTerms: new Set(), // 도감에서 아직 확인 안 한 새 용어
  tries: 0,           // 현재 문제 시도 횟수
  disabled: [],       // 현재 문제에서 이미 틀린 선택지 번호
  firstTry: 0,        // 한 번에 맞힌 문제 수
  wrong: 0,           // 누적 오답 수
};

function resetState(){
  Object.assign(S, { stage:-1, hp:CONFIG.maxHp, xp:0, terms:new Set(), freshTerms:new Set(),
                     tries:0, disabled:[], firstTry:0, wrong:0 });
}
function rankIndex(){ return Math.min(CONFIG.ranks.length - 1, Math.floor(S.xp / CONFIG.xpPerRank)); }
function maxXp(){ return STAGES.length * CONFIG.xpByTry[0]; }
function xpForTry(n){ return CONFIG.xpByTry[Math.min(n, CONFIG.xpByTry.length) - 1]; }
function gradeFor(score){ return CONFIG.grades.find(g => score >= g.min).grade; }
