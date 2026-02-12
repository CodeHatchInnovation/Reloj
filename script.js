// ======= RELOJ =======
function updateTime(){
  const now = new Date();
  document.getElementById("time").innerText =
    now.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});
  document.getElementById("date").innerText =
    now.toLocaleDateString();
}
setInterval(updateTime,1000);
updateTime();

// ======= NAVEGACIÓN =======
function showScreen(id){
  document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function openMenu(){ showScreen("menu"); }
function goHome(){ showScreen("home"); }
function goMenu(){ showScreen("menu"); }
function openApp(id){ showScreen(id); }

// ======= RITMO CARDIACO DINÁMICO =======
setInterval(()=>{
  const bpm = Math.floor(Math.random()*30)+60;
  document.getElementById("heartRate").innerText=bpm;
  document.getElementById("heartAppRate").innerText=bpm+" BPM";
},2000);

// ======= PASOS SIMULADOS =======
let steps=3240;
setInterval(()=>{
  steps+=Math.floor(Math.random()*10);
  document.getElementById("stepsCount").innerText=steps;
  document.getElementById("stepsAppCount").innerText=steps;
},3000);

// ======= ACTIVIDAD RING =======
let progress=150;
setInterval(()=>{
  progress-=10;
  if(progress<=0) progress=377;
  document.getElementById("activityRing").style.strokeDashoffset=progress;
},2000);

// ======= MODO DIA/NOCHE =======
let dark=true;
function toggleMode(){
  dark=!dark;
  const root=document.documentElement;
  if(dark){
    root.style.setProperty('--bg','#000');
    root.style.setProperty('--text','#fff');
    root.style.setProperty('--accent','#00f2fe');
    document.getElementById("modeIcon").innerText="🌙";
  }else{
    root.style.setProperty('--bg','#f1f5f9');
    root.style.setProperty('--text','#000');
    root.style.setProperty('--accent','#2563eb');
    document.getElementById("modeIcon").innerText="☀️";
  }
}

// ======= NOTIFICACIÓN =======
function simulateNotification(){
  alert("Nueva notificación 📩");
  if(navigator.vibrate){
    navigator.vibrate(200);
  }
}
