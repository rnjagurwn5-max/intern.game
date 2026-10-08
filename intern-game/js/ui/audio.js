/* 배경음악: 브라우저 정책상 첫 클릭(시작 버튼) 이후에만 재생됩니다. ON/OFF 는 브라우저에 기억 */
let bgmOn = true;
try { bgmOn = localStorage.getItem('intern-bgm') !== 'off'; } catch(e) {}

function renderBgmButton(){
  $('bgmState').textContent = bgmOn ? 'ON' : 'OFF';
  $('bgmBtn').classList.toggle('off', !bgmOn); $('bgmBtn').setAttribute('aria-pressed', bgmOn);
}
function playBgm(){
  const a = $('bgm'); a.volume = CONFIG.bgmVolume;
  if(bgmOn){ const p = a.play(); p && p.catch(() => {}); } else a.pause();
}
function toggleBgm(){
  bgmOn = !bgmOn;
  try { localStorage.setItem('intern-bgm', bgmOn ? 'on' : 'off'); } catch(e) {}
  renderBgmButton(); playBgm();
}
