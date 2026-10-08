/* 캐릭터 이미지 레이어 — data/characters.js 의 PORTRAITS 로 <img> 를 만들고 하나만 보이게 전환 */
const portraitEls = {};

function buildPortraits(){
  const box = $('portraits');
  Object.entries(PORTRAITS).forEach(([key, p]) => {
    const img = document.createElement('img');
    img.className = 'portrait' + (p.fx ? ' fx-' + p.fx : '');
    img.src = p.src; img.alt = p.alt + ' 캐릭터';
    img.style.objectPosition = p.focus || '50% 30%';
    box.appendChild(img); portraitEls[key] = img;
  });
}
function showImg(key){
  Object.entries(portraitEls).forEach(([k, el]) => el.classList.toggle('on', k === key));
}
