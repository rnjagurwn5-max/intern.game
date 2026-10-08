/* 공통 도우미 */
const $ = id => document.getElementById(id);
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* CSS 애니메이션을 처음부터 다시 재생 */
function replayClass(el, cls){ el.classList.remove(cls); void el.offsetWidth; el.classList.add(cls); }
