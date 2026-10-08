/* 클리어 수료증 + 색종이 */
function showCertificate(){
  const d = new Date(), date = d.getFullYear() + '년 ' + (d.getMonth() + 1) + '월 ' + d.getDate() + '일';
  const hp = Math.max(0, S.hp), grade = gradeFor(S.xp + hp), lv = rankIndex();
  const row = (k, v) => '<tr><td>' + k + '</td><td>' + v + '</td></tr>';
  $('certWrap').innerHTML =
    '<div class="cert" role="dialog" aria-label="수료증">' +
      '<div class="grade">' + grade + '</div>' +
      '<div class="no">제 ' + d.getFullYear() + '-SCM-' + String(Math.floor(Math.random() * 900) + 100) + ' 호</div>' +
      '<h2>수료증</h2>' +
      '<dl><dt>성명</dt><dd>' + CONFIG.playerName + '</dd><dt>소속</dt><dd>' + CONFIG.team + '</dd>' +
      '<dt>과정</dt><dd>' + CONFIG.courseName + '</dd></dl>' +
      '<p>위 사람은 ' + STAGES.map(s => s.chapter).join(', ') + '에 이르는 ' + STAGES.length +
      '건의 실무 과제를 결재받아 본 과정을 수료하였기에 이 증서를 수여합니다.</p>' +
      '<table>' +
        row('최종 경험치', S.xp + ' XP · ' + CONFIG.ranks[lv]) +
        row('남은 멘탈', hp + ' / ' + CONFIG.maxHp) +
        row('한 번에 결재된 과제', S.firstTry + ' / ' + STAGES.length) +
        row('도감 등록 용어', S.terms.size + ' / ' + TERMS.length) +
      '</table>' +
      '<div class="sign"><span>' + date + '<br>' + CONFIG.team + '장</span><div class="seal">구매<br>팀장</div></div>' +
      '<div class="cert-actions"><button class="big-btn" id="againBtn" type="button">다시 하기</button>' +
      '<button class="ghost-btn" id="certDex" type="button">도감 보기</button></div>' +
    '</div>';
  $('certWrap').hidden = false; $('dialog').hidden = true;
  $('againBtn').onclick = () => startGame(0);
  $('certDex').onclick = () => openDex(true);
  confetti();
}
function confetti(){
  if(reduceMotion) return;
  const c = $('confetti'); c.hidden = false; const x = c.getContext('2d');
  const W = c.width = innerWidth, H = c.height = innerHeight;
  const cols = ['#ffb52e', '#d4283f', '#62b2ee', '#27b06e', '#f5efe0'];
  const P = Array.from({ length: 160 }, () => ({ x: Math.random() * W, y: -20 - Math.random() * H * .6,
    vx: (Math.random() - .5) * 2, vy: 2 + Math.random() * 3, r: Math.random() * 6.28, s: 5 + Math.random() * 6,
    c: cols[Math.random() * cols.length | 0] }));
  let f = 0;
  (function loop(){
    x.clearRect(0, 0, W, H);
    P.forEach(p => { p.x += p.vx; p.y += p.vy; p.r += .1; x.save(); x.translate(p.x, p.y); x.rotate(p.r);
      x.fillStyle = p.c; x.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2); x.restore(); });
    if(++f < 260) requestAnimationFrame(loop); else { x.clearRect(0, 0, W, H); c.hidden = true; }
  })();
}
