// --- Configuración ---
const SCREENS = document.querySelectorAll('.page');
const SCREEN_EL = document.getElementById('screen');
const SLEEP_OVERLAY = document.getElementById('sleep-overlay');
let sleepTimer;

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    updateClock(); // Ejecutar inmediatamente
    setInterval(updateClock, 1000); // Actualizar cada segundo
    resetSleepTimer();
    startHeartRateSim();
});

// --- Lógica de Reloj y Fecha (Aquí está el cambio) ---
function updateClock() {
    const now = new Date();
    
    // 1. Hora
    const h = now.getHours().toString().padStart(2, '0');
    const m = now.getMinutes().toString().padStart(2, '0');
    document.getElementById('hours').textContent = h;
    document.getElementById('minutes').textContent = m;
    
    // 2. Fecha Automática (Formato: JUE 12/02)
    const dias = ['DOM', 'LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB'];
    
    const nombreDia = dias[now.getDay()]; // Obtiene el día (0-6)
    const numeroDia = now.getDate().toString().padStart(2, '0'); // Día del mes
    const numeroMes = (now.getMonth() + 1).toString().padStart(2, '0'); // Mes (0-11) + 1
    
    // Construimos la cadena final
    const fechaString = `${nombreDia} ${numeroDia}/${numeroMes}`;
    
    // Insertamos en el HTML
    document.querySelector('.date-display').textContent = fechaString;
}

// --- Navegación ---
function navigateTo(screenId) {
    // Ocultar todas
    SCREENS.forEach(s => s.classList.remove('active'));
    // Mostrar objetivo
    const target = document.getElementById(screenId);
    if(target) target.classList.add('active');
    
    // Gestionar botón atrás
    const backBtn = document.getElementById('back-btn');
    if (screenId === 'home-screen') {
        backBtn.classList.add('hidden');
    } else {
        backBtn.classList.remove('hidden');
        backBtn.onclick = () => navigateTo(screenId === 'menu-screen' ? 'home-screen' : 'menu-screen');
    }
}

// Interacciones
document.getElementById('home-screen').addEventListener('click', () => navigateTo('menu-screen'));

document.querySelectorAll('.app-item').forEach(item => {
    item.addEventListener('click', (e) => {
        e.stopPropagation();
        navigateTo(item.dataset.target);
    });
});

document.getElementById('side-button').addEventListener('click', () => {
    if (SLEEP_OVERLAY.classList.contains('active')) {
        wakeScreen();
    } else {
        navigateTo('home-screen');
    }
});

// Ajustes de Brillo
const slider = document.getElementById('brightness-slider');
if(slider){
    slider.addEventListener('input', (e) => {
        SCREEN_EL.style.setProperty('--screen-brightness', e.target.value / 100);
    });
}

// Simulaciones
function startHeartRateSim() {
    const bpmHome = document.getElementById('home-bpm');
    if(!bpmHome) return;
    setInterval(() => {
        bpmHome.textContent = Math.floor(Math.random() * (90 - 70) + 70);
    }, 2000);
}

// Sleep Mode
function resetSleepTimer() {
    clearTimeout(sleepTimer);
    if (!SLEEP_OVERLAY.classList.contains('active')) {
        sleepTimer = setTimeout(() => SLEEP_OVERLAY.classList.add('active'), 15000);
    }
}
function wakeScreen() {
    SLEEP_OVERLAY.classList.remove('active');
    resetSleepTimer();
}
SCREEN_EL.addEventListener('click', resetSleepTimer);
