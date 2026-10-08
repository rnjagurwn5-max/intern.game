/* SCM 용어 도감 (오른쪽 서랍) */
function renderDex(){
  const ul = $('dexList'); ul.innerHTML = '';
  TERMS.forEach((t, i) => {
    const got = S.terms.has(t.id), li = document.createElement('li');
    li.className = 'card' + (got ? '' : ' locked') + (S.freshTerms.has(t.id) ? ' fresh' : '');
    const no = 'No.' + String(i + 1).padStart(3, '0');
    if(got){
      li.innerHTML = '<div class="top"><span class="nm"></span><span class="no">' + no + '</span></div>' +
        '<div class="en"></div><p class="d"></p><div class="tip"><b>실무 꿀팁</b><span></span></div>';
      li.querySelector('.nm').textContent = t.name; li.querySelector('.en').textContent = t.en;
      li.querySelector('.d').textContent = t.def; li.querySelector('.tip span').textContent = t.tip;
    } else {
      li.innerHTML = '<div class="top"><span class="nm">? ? ?</span><span class="no">' + no + '</span></div>' +
        '<p>STAGE ' + t.stage + '에서 정답을 맞히면 등록됩니다.</p>';
    }
    ul.appendChild(li);
  });
}
function openDex(on){
  $('drawer').classList.toggle('on', on); $('scrim').classList.toggle('on', on);
  if(on){ const n = $('dexBtn').querySelector('.new'); n && n.remove(); }
  else { S.freshTerms.clear(); renderDex(); }
}
