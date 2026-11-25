const photos = [
  { file: 'photos/portada.jpg', title: "Portada - Magdalena de Cao" },
  { file: 'photos/foto1.jpg', title: "Foto 1" },
  { file: 'photos/foto2.jpg', title: "Foto 2" },
  // ... agrega hasta foto20
];

let currentIndex = 0;

const photoElement = document.getElementById('photo');
const titleElement = document.getElementById('photo-title');
const contextBtn = document.getElementById('context-btn');
const paramsBtn = document.getElementById('params-btn');
const modal = document.getElementById('modal');
const modalText = document.getElementById('modal-text');
const closeModalBtn = document.getElementById('close-modal');
const music = document.getElementById('background-music');

let contextoData = {};
let parametrosData = {};

function loadJSON(path, callback) {
  fetch(path).then(response => response.json()).then(data => callback(data));
}

// Carga datos contexto y parámetros técnicos
loadJSON('data/contexto.json', data => {
  contextoData = data;
});

loadJSON('data/parametros.json', data => {
  parametrosData = data;
});

// Carga foto actual
function loadPhoto(index) {
  if(index < 0) index = photos.length -1;
  if(index >= photos.length) index = 0;
  currentIndex = index;
  
  photoElement.style.opacity = 0;
  setTimeout(() => {
    photoElement.src = photos[currentIndex].file;
    titleElement.textContent = photos[currentIndex].title;
    photoElement.style.opacity = 1;
  }, 500);
}

// Mostrar modal con información
function showModal(type) {
  let content = '';
  if(type === 'context') {
    content = contextoData[currentIndex] || "No hay información de contexto.";
  } else {
    content = parametrosData[currentIndex] || "No hay parámetros técnicos disponibles.";
  }
  modalText.textContent = content;
  modal.classList.remove('hidden');
}

// Navegación con rueda del mouse
window.addEventListener('wheel', e => {
  if(e.deltaY > 0) {
    loadPhoto(currentIndex + 1);
  } else {
    loadPhoto(currentIndex - 1);
  }
});

// Botones
contextBtn.addEventListener('click', () => showModal('context'));
paramsBtn.addEventListener('click', () => showModal('params'));
closeModalBtn.addEventListener('click', () => modal.classList.add('hidden'));

// Música
function loadMusic() {
  music.src = 'audio/musica.mp3';
  music.volume = 0.3;
  music.play().catch(() => {
    // Puede fallar si no hubo interacción del usuario todavía
  });
}

// Iniciar
loadPhoto(0);
loadMusic();

