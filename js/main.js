/* 시작점: 화면 준비 + 버튼·키보드 연결 */
buildPortraits();
renderHud(); renderDex(); renderBgmButton();
showImg('intern'); $('scene').classList.add('dim');

/* 대화 넘기기 */
$('dialog').addEventListener('click', advance);
$('scene').addEventListener('click', e => {
  if(e.target.closest('.choice, .overlay, .title-screen, button')) return;
  if(D.mode === 'talk') advance();
});

/* 버튼 */
$('startBtn').addEventListener('click', e => { e.stopPropagation(); playBgm(); startGame(0); });
$('retryBtn').addEventListener('click', e => { e.stopPropagation(); startGame(0); });
$('backBtn').addEventListener('click', e => { e.stopPropagation(); back(); });
$('homeBtn').addEventListener('click', goToTitle);
$('bgmBtn').addEventListener('click', toggleBgm);
$('dexBtn').addEventListener('click', () => openDex(true));
$('dexClose').addEventListener('click', () => openDex(false));
$('scrim').addEventListener('click', () => openDex(false));

/* 첫 재생이 막혔을 때 다음 클릭에서 다시 시도 */
document.addEventListener('pointerdown', () => {
  if(bgmOn && $('bgm').paused && $('titleScreen').hidden) playBgm();
});

/* 키보드: Space/Enter 다음, 1·2·3 선택, ←/Backspace 이전 대사, Esc 도감 닫기 */
document.addEventListener('keydown', e => {
  if(e.key === 'Escape'){ openDex(false); return; }
  if($('drawer').classList.contains('on')) return;
  if((e.key === ' ' || e.key === 'Enter') && D.mode === 'talk' && !e.target.closest('button')){ e.preventDefault(); advance(); }
  if(D.mode === 'choose' && /^[1-9]$/.test(e.key)) pick(+e.key - 1);
  if(e.key === 'Backspace' || e.key === 'ArrowLeft'){ e.preventDefault(); back(); }
});
