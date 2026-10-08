/* 연출: 결재 도장, 떠오르는 숫자, 화면 흔들림, 용어 획득 토스트 */
function stamp(ok){
  const s = $('stamp'); s.className = 'stamp ' + (ok ? 'ok' : 'no');
  s.innerHTML = (ok ? '승인' : '반려') + '<small>' + (ok ? 'APPROVED' : 'REJECTED') + '</small>';
  replayClass(s, 'go');
}
function floatText(text, cls){
  const f = document.createElement('div'); f.className = 'float ' + cls; f.textContent = text;
  $('scene').appendChild(f); setTimeout(() => f.remove(), 1500);
}
function hitEffect(){ replayClass($('scene'), 'shake'); replayClass($('flash'), 'go'); }

const toastQueue = []; let toastBusy = false;
function toastTerms(ids){
  ids.forEach(id => { const t = TERMS.find(x => x.id === id); t && toastQueue.push(t); });
  if(!toastBusy) nextToast();
}
function nextToast(){
  const t = toastQueue.shift(); if(!t){ toastBusy = false; return; }
  toastBusy = true;
  $('toastName').textContent = t.name + '  ·  ' + t.en; $('toastDef').textContent = t.def;
  $('toast').classList.add('on');
  if(!$('dexBtn').querySelector('.new')) $('dexBtn').insertAdjacentHTML('beforeend', '<span class="new"></span>');
  setTimeout(() => { $('toast').classList.remove('on'); setTimeout(nextToast, 450); }, 2600);
}
