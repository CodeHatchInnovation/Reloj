const screens=document.querySelectorAll(".screen");
let currentScreen="home";
let startY=0;

// ===== RELOJ =====
function updateTime(){
  const now=new Date();
  document.getElementById("time").innerText=
    now.toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'});
  document.getElementById("date").innerText=
    now.toLocaleDateString();
}
setInterval(updateTime,1000);
updateTime();

// ===== NAVEGACIÓN =====
function showScreen(id){
  screens.forEach(s=>s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  currentScreen=id;
}

watch.addEventListener("touchstart",e=>{
  startY=e.touches[0].clientY;
});

watch.addEventListener("touchend",e=>{
  let diff=startY-e.changedTouches[0].clientY;
  if(diff>50 && currentScreen==="home") showScreen("menu");
  if(diff<-50 && currentScreen==="menu") showScreen("home");
});

watch.addEventListener("dblclick",()=>{
  if(currentScreen==="home") showScreen("menu");
  else if(currentScreen==="menu") showScreen("home");
});

// ===== APPS =====
function openApp(name){
  const container=document.getElementById("appContainer");
  container.innerHTML="<button class='back-btn' onclick='showScreen(\"menu\")'>⬅</button>";
  showScreen("appContainer");

  if(name==="heart"){
    container.innerHTML+=`
      <div class="heart">❤️</div>
      <div id="bpm" style="margin-top:15px;font-size:22px;"></div>
    `;
    setInterval(()=>{
      document.getElementById("bpm").innerText=
        Math.floor(Math.random()*30+60)+" BPM";
    },2000);
  }

  if(name==="weather"){
    container.innerHTML+=`
      <div class="sun">☀️</div>
      <div style="margin-top:15px;">26°C - Soleado</div>
    `;
  }

  if(name==="music"){
    container.innerHTML+=`
      <div>🎵 Blinding Lights</div>
      <div class="progress-bar">
        <div class="progress" id="musicBar"></div>
      </div>
    `;
    let progress=0;
    setInterval(()=>{
      progress+=5;
      if(progress>100) progress=0;
      document.getElementById("musicBar").style.width=progress+"%";
    },1000);
  }

  if(name==="stopwatch"){
    container.innerHTML+=`
      <div class="timer-display" id="sw">00:00</div>
      <button onclick="startSW()">Start</button>
      <button onclick="resetSW()">Reset</button>
    `;
  }

  if(name==="timer"){
    container.innerHTML+=`
      <div class="timer-display" id="tm">10</div>
      <button onclick="startTimer()">Start</button>
    `;
  }

  if(name==="battery"){
    navigator.getBattery?.().then(b=>{
      container.innerHTML+=`🔋 ${Math.round(b.level*100)}%`;
    });
  }
}

// ===== CRONÓMETRO =====
let swInterval,seconds=0;
function startSW(){
  clearInterval(swInterval);
  swInterval=setInterval(()=>{
    seconds++;
    let m=Math.floor(seconds/60);
    let s=seconds%60;
    document.getElementById("sw").innerText=
      `${m.toString().padStart(2,"0")}:${s.toString().padStart(2,"0")}`;
  },1000);
}
function resetSW(){
  clearInterval(swInterval);
  seconds=0;
  document.getElementById("sw").innerText="00:00";
}

// ===== TIMER =====
function startTimer(){
  let t=10;
  const el=document.getElementById("tm");
  const interval=setInterval(()=>{
    t--;
    el.innerText=t;
    if(t<=0){
      clearInterval(interval);
      el.innerText="⏰";
      if(navigator.vibrate) navigator.vibrate([200,100,200]);
    }
  },1000);
}

// ===== MODO =====
let dark=true;
function toggleMode(){
  dark=!dark;
  const root=document.documentElement;
  if(dark){
    root.style.setProperty('--bg','#000');
    root.style.setProperty('--text','#fff');
  }else{
    root.style.setProperty('--bg','#f1f5f9');
    root.style.setProperty('--text','#000');
  }
}
