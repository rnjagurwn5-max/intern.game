/* 상단 HUD: 멘탈 HP, XP·직급, 도감 개수, 스테이지 진행 칸 */
function renderHud(){
  const hp = Math.max(0, S.hp), pct = hp / CONFIG.maxHp * 100;
  $('hpTxt').textContent = hp + ' / ' + CONFIG.maxHp;
  const f = $('hpFill'); f.style.width = pct + '%'; f.className = pct <= 30 ? 'low' : pct <= 60 ? 'mid' : '';

  $('xpTxt').textContent = S.xp + ' XP';
  $('xpFill').style.width = Math.min(100, S.xp / maxXp() * 100) + '%';
  const lv = rankIndex();
  $('rankTxt').textContent = 'Lv.' + (lv + 1) + ' ' + CONFIG.ranks[lv];

  const n = S.terms.size + '/' + TERMS.length;
  $('dexCount').textContent = n; $('dexCount2').textContent = n;

  const p = $('pips'); p.innerHTML = '<span>STAGE</span>';
  STAGES.forEach((_, i) => {
    const s = document.createElement('span');
    s.className = 'p' + (i < S.stage ? ' done' : i === S.stage ? ' cur' : '');
    p.appendChild(s);
  });
  const lbl = document.createElement('span'); lbl.style.fontVariantNumeric = 'tabular-nums';
  lbl.textContent = S.stage < 0 ? '—' : Math.min(S.stage + 1, STAGES.length) + ' / ' + STAGES.length;
  p.appendChild(lbl);
}
function setLocation(place, time){
  $('loc').hidden = false; $('locPlace').textContent = place; $('locTime').textContent = time;
}
