// Página interactiva: corazones, partículas y textos tipeados
const consoleEl = document.getElementById('console');
const openBtn = document.getElementById('openBtn');
const photoBtn = document.getElementById('photoBtn');
const overlay = document.getElementById('overlay');
const contentEl = document.getElementById('content');
const finalHeart = document.getElementById('finalHeart');
const finalText = document.getElementById('finalText');
const secondOverlay = document.getElementById('secondOverlay');
const secondContent = document.getElementById('secondContent');
const backSecondOverlayBtn = document.getElementById('backSecondOverlay');
const closeSecondOverlayBtn = document.getElementById('closeSecondOverlay');
const heartMessage = document.getElementById('heartMessage');
const musicPlayBtn = document.getElementById('musicPlayBtn');
const musicPauseBtn = document.getElementById('musicPauseBtn');
const insidePhotoBtn = document.getElementById('insidePhotoBtn');

let secretClicks = 0;
const isMobile = window.matchMedia('(max-width: 520px)').matches;
const bgMusic = document.getElementById('bgMusic');
let typingGeneration = 0;
let secondOverlayTimer = null;

function stopTyping(){
  typingGeneration++;
}

function playMusic(){
  if (!bgMusic) return;
  bgMusic.volume = 0.08;
  const playPromise = bgMusic.play();
  if (playPromise && typeof playPromise.catch === 'function') {
    playPromise.catch(() => {});
  }
}

function pauseMusic(){
  if (!bgMusic) return;
  bgMusic.pause();
}

// --- consola estilo "inicialización" ---
const bootLines = [
  '> Inicializando sorpresa...',
  '> Cargando recuerdos...',
  '> Listo. ❤️'
];
function typeToConsole(lines, cb){
  let i=0;
  function next(){
    if(i>=lines.length) return cb && cb();
    const line = document.createElement('div');
    consoleEl.appendChild(line);
    let j=0;
    function step(){
      if(j<=lines[i].length){
        line.textContent = lines[i].slice(0,j);
        j++;
        setTimeout(step, 28 + Math.random()*40);
      } else {
        i++;
        setTimeout(next,350);
      }
    }
    step();
  }
  next();
}

// --- efecto de corazones flotando ---
function spawnHeart(){
  const el = document.createElement('div');
  el.className = 'heart';
  el.textContent = Math.random()>.5? '💗':'💖';
  const size = isMobile ? 8 + Math.random()*10 : 10 + Math.random()*20;
  el.style.fontSize = size + 'px';
  el.style.left = (Math.random()*100) + '%';
  el.style.animationDuration = (isMobile ? 10 + Math.random()*6 : 6 + Math.random()*8)+'s';
  el.style.opacity = 0.85 + Math.random()*0.15;
  el.style.color = Math.random()>0.5? '#ff9fb1' : '#ff5a7a';
  document.body.appendChild(el);
  setTimeout(()=> el.remove(), isMobile ? 16000 : 16000);
}

function spawnParticle(){
  const el = document.createElement('div');
  el.className = 'particle';
  const size = isMobile ? 2 + Math.random()*3 : 4 + Math.random()*6;
  el.style.width = size+'px'; el.style.height = size+'px';
  el.style.left = (Math.random()*100) + '%';
  el.style.animationDuration = (isMobile ? 6 + Math.random()*4 : 4 + Math.random()*6)+'s';
  el.style.opacity = 0.8;
  el.style.background = 'radial-gradient(circle,#fff 0%, rgba(255,255,255,0.05) 60%)';
  document.body.appendChild(el);
  setTimeout(()=> el.remove(), isMobile ? 12000 : 11000);
}

// spawn loops
setInterval(spawnHeart, isMobile ? 1400 : 800);
setInterval(spawnParticle, isMobile ? 1000 : 600);

// --- texto largo que aparece al abrir ---
const longText = `Hoy es 11.

Sé que este 11 no es como lo imaginábamos ni como lo esperábamos. 
Tal vez los planes cambiaron y las cosas no salieron como alguna vez soñamos,
pero eso no cambia lo importante que es este día para mí.

Aun así, quería que supieras que pienso en vos y que deseo de corazón que, a pesar de todo,
encuentres momentos para sonreír. Estas fechas nos va a recordar lo que esperábamos vivir,
pero también nos enseña a valorar lo que todavía tenemos y lo que sentimos.

Ojalá el próximo 11 nos encuentre de la manera en que tanto imaginamos. Mientras tanto, 
solo quería dejarte esta pequeña nota para decirte que este día sigue siendo especial y que deseo que,
de alguna forma, tengas un lindo momento.


Simplemente quiero dedicarte un ratito
de lo que más me gusta hacer.

Porque cada línea de esta página
la escribi pensando en vos.

Gracias por todos los momentos,
por las risas,
por los abrazos,
y por seguir estando.

Te extraño muchísimo. ❤️`;

function typeText(targetEl, text, cb){
  const generation = ++typingGeneration;
  targetEl.textContent = '';
  const lines = text.split('\n');
  let li=0;
  function nextLine(){
    if(generation !== typingGeneration) return;
    if(li>=lines.length) return cb && cb();
    const line = lines[li];
    if(line.trim()===''){
      targetEl.appendChild(document.createElement('br'));
      li++; setTimeout(nextLine,120);
      return;
    }
    const span = document.createElement('div');
    span.className='typed-line';
    targetEl.appendChild(span);
    let k=0;
    function tick(){
      if(generation !== typingGeneration){
        return;
      }
      if(k<=line.length){
        span.textContent = line.slice(0,k);
        k++;
        setTimeout(tick, 22 + Math.random()*30);
      } else { li++; setTimeout(nextLine,220); }
    }
    tick();
  }
  nextLine();
}

function launchSurprise(){
  const colors = ['#ff9fb1', '#ffd5e0', '#ffe082', '#fff', '#ff5a7a'];
  const count = 24;
  for (let i = 0; i < count; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.left = `${window.innerWidth / 2 + (Math.random() - 0.5) * 220}px`;
    piece.style.top = `${window.innerHeight * 0.18 + (Math.random() - 0.5) * 80}px`;
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.width = `${4 + Math.random() * 8}px`;
    piece.style.height = `${8 + Math.random() * 10}px`;
    piece.style.setProperty('--drift-x', `${(Math.random() - 0.5) * 320}px`);
    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 1500);
  }
}

function openDetail(shouldType = true){
  openBtn.disabled = true;
  openBtn.style.transform = 'scale(.98)';
  setTimeout(()=> openBtn.style.display='none',180);
  playMusic();
  overlay.classList.remove('hidden');
  overlay.style.opacity = 0;
  overlay.animate([{opacity:0},{opacity:1}],{duration:420,fill:'forwards',easing:'ease'});
  launchSurprise();
  if (shouldType) {
    setTimeout(()=>{
      typeText(contentEl, longText);
    }, 380);
  }
}

function openSecondOverlay(){
  if (!secondOverlay || !secondContent) return;
  if (secondOverlayTimer) {
    clearTimeout(secondOverlayTimer);
    secondOverlayTimer = null;
  }
  stopTyping();
  secondOverlay.classList.remove('hidden');
  secondOverlay.style.display = 'flex';
  secondOverlay.style.opacity = 0;
  secondOverlay.animate([{opacity:0},{opacity:1}],{duration:320,fill:'forwards',easing:'ease'});
  secondContent.innerHTML = '';
  secondContent.style.display = 'block';
  const secondText = `Te extraño todos los días, todas las noches.
Te sueño, extraño todo de vos.
Todo porque sos mi todo.
No quiero ser tan intenso, pero así soy,
me sale así, y no quiero asustarte con mi intensidad,
aunque me da tranquilidad porque se que vos también sos muy intensa jajaja.

Espero que en algún momento haya una posibilidad
entre los dos, una forma de empezar de nuevo,
o de intentarlo otra vez.

Te amo mucho, muchísimo, montonazo.
Gracias Flaca. ❤️`;
  setTimeout(()=>{
    typeText(secondContent, secondText);
  }, 30);
}

function closeSecondOverlay(){
  if (!secondOverlay) return;
  if (secondOverlayTimer) {
    clearTimeout(secondOverlayTimer);
    secondOverlayTimer = null;
  }
  stopTyping();
  secondOverlay.classList.add('hidden');
  secondOverlay.style.display = 'none';
  openBtn.disabled = false;
  openBtn.style.display = '';
  openBtn.style.transform = '';
  contentEl.textContent = longText;
  contentEl.innerHTML = longText.replace(/\n/g, '<br>');
}

// abrir detalle
openBtn.addEventListener('click', openDetail);
photoBtn?.addEventListener('click', openDetail);

// final heart interactions + secret
finalHeart.addEventListener('click', ()=>{
  secretClicks++;
  finalHeart.animate([{transform:'scale(1)'},{transform:'scale(1.14)'},{transform:'scale(1)'}],{duration:260});
  openDetail(false);
  secondOverlayTimer = setTimeout(openSecondOverlay, 260);
});

backSecondOverlayBtn?.addEventListener('click', closeSecondOverlay);
closeSecondOverlayBtn?.addEventListener('click', closeSecondOverlay);
secondOverlay?.addEventListener('click', e => {
  if (e.target === secondOverlay) closeSecondOverlay();
});

musicPlayBtn?.addEventListener('click', playMusic);
musicPauseBtn?.addEventListener('click', pauseMusic);
insidePhotoBtn?.addEventListener('click', ()=>{
  finalText.textContent = 'Mi persona favorita, Mi flaca, Mi todo 💖';
  finalHeart.animate([{transform:'scale(1)'},{transform:'scale(1.12)'},{transform:'scale(1)'}],{duration:260});
});

// init
typeToConsole(bootLines, ()=>{/* listo */});

// keyboard: allow closing overlay with Escape
window.addEventListener('keydown', e=>{
  if(e.key==='Escape'){ overlay.classList.add('hidden'); secondOverlay?.classList.add('hidden'); }
});
