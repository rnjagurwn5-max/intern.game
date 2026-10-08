/* =========================================================
 * 게임 흐름
 *   타이틀 → startGame → 프롤로그 → runStage(0..n) → ask ⇄ pick → 클리어 / 실패 엔딩
 * ========================================================= */
const pick1 = arr => arr[Math.floor(Math.random() * arr.length)];

function startGame(fromStage){
  stopDialogue(); resetState(); renderHud(); renderDex();
  $('titleScreen').hidden = true; $('overScreen').hidden = true; $('certWrap').hidden = true;
  showImg('intern');
  if(fromStage > 0){ runStage(fromStage); return; }
  say(PROLOGUE, () => runStage(0));
}

function goToTitle(){
  stopDialogue();
  $('choices').hidden = true; $('dialog').hidden = true; $('banner').classList.remove('on');
  $('overScreen').hidden = true; $('certWrap').hidden = true; $('loc').hidden = true;
  $('titleScreen').hidden = false;
  S.stage = -1; renderHud(); openDex(false);
}

/* 예약 실행: 처음으로/재시작하면 자동으로 취소됨 */
function later(ms, fn){ const id = D.runId; setTimeout(() => { if(id === D.runId) fn(); }, ms); }

function runStage(i){
  S.stage = i; S.tries = 0; S.disabled = []; renderHud();
  const st = STAGES[i];
  setLocation(st.place, st.time);
  $('dialog').hidden = true; D.mode = 'banner'; D.prevSeg = null;
  $('bK').textContent = 'STAGE ' + (i + 1); $('bT').textContent = st.title; $('bC').textContent = st.chapter;
  $('banner').classList.add('on');
  later(reduceMotion ? 900 : CONFIG.bannerMs, () => { $('banner').classList.remove('on'); say(st.intro, ask); });
}

function ask(){
  const st = STAGES[S.stage];
  D.mode = 'choose'; $('dialog').hidden = false; setSpeaker(st.q.who); typeLine(st.q.t);
  const box = $('choices'); box.innerHTML = '';
  st.choices.forEach((c, k) => {
    const b = document.createElement('button');
    b.type = 'button'; b.className = 'choice'; b.id = 'choice' + k; b.disabled = S.disabled.includes(k);
    b.innerHTML = '<span class="n">' + (k + 1) + '</span><span></span>'; b.lastChild.textContent = c.label;
    b.addEventListener('click', e => { e.stopPropagation(); pick(k); });
    box.appendChild(b);
  });
  box.hidden = false; updateBackButton();
}

function pick(k){
  const st = STAGES[S.stage], c = st.choices[k];
  if(D.mode !== 'choose' || !c || S.disabled.includes(k)) return;
  D.mode = 'idle'; $('choices').hidden = true; S.tries++;
  if(c.correct) onCorrect(c); else onWrong(c, k);
}

function onCorrect(c){
  const gain = xpForTry(S.tries);
  if(S.tries === 1) S.firstTry++;
  S.xp += gain; stamp(true); floatText('+' + gain + ' XP', 'xp');
  (c.terms || []).forEach(id => { if(!S.terms.has(id)){ S.terms.add(id); S.freshTerms.add(id); } });
  renderHud(); renderDex(); toastTerms(c.terms || []);

  const r = REACTIONS.correct;
  const lines = [{ who: r.who, t: pick1(r.lines), auto: r.autoMs }, ...c.fb];
  later(CONFIG.reactionDelayMs, () => say(lines, () => {
    if(S.stage < STAGES.length - 1) runStage(S.stage + 1); else endingClear();
  }));
}

function onWrong(c, k){
  S.wrong++; S.disabled.push(k); S.hp -= c.dmg;
  stamp(false); floatText('-' + c.dmg + ' HP', 'hp'); hitEffect(); renderHud();

  const lines = [{ who: REACTIONS.wrong.who, t: pick1(REACTIONS.wrong.lines) }, ...c.fb];
  if(S.hp > 0) lines.push({ who: REACTIONS.retry.who, t: pick1(REACTIONS.retry.lines) });
  later(CONFIG.reactionDelayMs, () => say(lines, () => { S.hp <= 0 ? endingFail() : ask(); }));
}

function endingClear(){
  setLocation(ENDING_CLEAR.place, ENDING_CLEAR.time);
  say(ENDING_CLEAR.lines, showCertificate);
}
function endingFail(){
  setLocation(ENDING_FAIL.place, ENDING_FAIL.time);
  say(ENDING_FAIL.lines, () => {
    showImg(ENDING_FAIL.finalImg); $('scene').classList.remove('dim');
    $('overScreen').hidden = false; $('dialog').hidden = true; D.mode = 'idle';
  });
}
