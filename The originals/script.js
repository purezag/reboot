// Cada drone com profundidade
const drones = [
  { el: document.querySelector('.img-drone1'), depth: 30 },
  { el: document.querySelector('.img-drone2'), depth: 50 },
  { el: document.querySelector('.img-drone3'), depth: 70 }
];

// Posições alvo (mouse)
let targetX = 0, targetY = 0;
// Posições atuais
let currentX = 0, currentY = 0;
// Fricção (quanto menor, mais lento e suave)
const friction = 0.05;

window.addEventListener('mousemove', (e) => {
  // Normaliza (-0.5 até 0.5)
  const x = e.clientX / window.innerWidth - 0.5;
  const y = e.clientY / window.innerHeight - 0.5;

  targetX = -x;
  targetY = -y;
});

function animate() {
  // Aproxima a posição atual da posição alvo
  currentX += (targetX - currentX) * friction;
  currentY += (targetY - currentY) * friction;

  // Aplica em cada drone com profundidade diferente
  drones.forEach(drone => {
    const moveX = currentX * drone.depth;
    const moveY = currentY * drone.depth;
    drone.el.style.transform = `translate(${moveX}px, ${moveY}px)`;
  });

  requestAnimationFrame(animate);
}

animate();

