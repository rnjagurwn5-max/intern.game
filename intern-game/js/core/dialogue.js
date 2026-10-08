/* =========================================================
 * 대화 엔진
 *   say(lines, 끝나면 실행할 함수) 로 대사 묶음(세그먼트)을 재생합니다.
 *   advance() 다음 줄 / back() 이전 줄
 *   mode: 'idle' | 'talk'(대사 진행) | 'choose'(선택지) | 'banner'
 * ========================================================= */
const D = {
  mode: 'idle',
  seg: [], idx: -1, cb: null,
  prevSeg: null,              // 직전에 끝난 세그먼트 (선택지에서 뒤로가기용)
  typing: false, full: '', timer: null, autoTimer: null,
  runId: 0,                   // 처음으로/재시작 시 증가 → 예약된 타이머 무효화
};

function setSpeaker(who){
  const c = CAST[who], tag = $('tag'), tx = $('text'), sc = $('scene');
  if(!c) { console.warn('CAST 에 없는 화자:', who); return; }
  if(c.name){
    tag.hidden = false; tag.textContent = c.name; tag.className = 'tag' + (c.tag ? ' ' + c.tag : '');
    tx.classList.remove('sys'); tx.classList.toggle('yell', !!c.yell); tx.classList.toggle('cheer', !!c.cheer);
    sc.classList.remove('dim'); showImg(c.img);
  } else {
    tag.hidden = true; tx.classList.remove('yell', 'cheer'); tx.classList.add('sys'); sc.classList.add('dim');
  }
}

function typeLine(text){
  clearInterval(D.timer); D.full = text; D.typing = true; $('next').classList.remove('on');
  const chars = Array.from(text), el = $('text'); let i = 0;
  if(reduceMotion){ finishTyping(); return; }
  el.textContent = '';
  D.timer = setInterval(() => { i++; el.textContent = chars.slice(0, i).join(''); if(i >= chars.length) finishTyping(); }, CONFIG.typingSpeed);
}
function finishTyping(){
  clearInterval(D.timer); $('text').textContent = D.full; D.typing = false;
  if(D.mode === 'talk') $('next').classList.add('on');
}

function say(lines, cb){
  D.mode = 'talk'; $('dialog').hidden = false;
  D.seg = lines; D.idx = -1; D.cb = cb; advance();
}
function showLine(i){
  clearTimeout(D.autoTimer); D.idx = i;
  const line = D.seg[i]; setSpeaker(line.who); typeLine(line.t);
  if(line.auto){
    const id = D.runId;
    D.autoTimer = setTimeout(() => {
      if(id === D.runId && D.mode === 'talk' && D.seg[D.idx] === line){ finishTyping(); advance(); }
    }, line.auto);
  }
  updateBackButton();
}
function advance(){
  if(D.mode !== 'talk') return;
  if(D.typing){ finishTyping(); return; }
  if(D.idx >= D.seg.length - 1){
    const done = D.cb; D.prevSeg = { lines: D.seg, cb: D.cb }; D.cb = null;
    D.mode = 'idle'; $('next').classList.remove('on'); clearTimeout(D.autoTimer);
    done && done(); return;
  }
  showLine(D.idx + 1);
}
function back(){
  if(D.mode === 'talk'){
    let i = D.idx - 1; while(i > 0 && D.seg[i].auto) i--;   // 자동 리액션 줄은 건너뜀
    if(i >= 0 && !D.seg[i].auto) showLine(i);
    return;
  }
  if(D.mode === 'choose' && D.prevSeg){                       // 선택지 → 질문 직전 대사로
    $('choices').hidden = true; D.mode = 'talk';
    D.seg = D.prevSeg.lines; D.cb = D.prevSeg.cb; showLine(D.seg.length - 1);
  }
}
function updateBackButton(){
  const canTalk = D.mode === 'talk' && D.idx > 0 && !D.seg.slice(0, D.idx).every(l => l.auto);
  const canChoose = D.mode === 'choose' && !!D.prevSeg;
  $('backBtn').disabled = !(canTalk || canChoose);
}
/* 진행 중인 대사·타이머를 모두 멈춤 */
function stopDialogue(){
  D.runId++; clearTimeout(D.autoTimer); clearInterval(D.timer);
  D.mode = 'idle'; D.prevSeg = null; D.cb = null;
}
