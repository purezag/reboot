// Cada drone com profundidade
const drones = [
  { el: document.querySelector('.img-drone1'), depth: 30 },
  { el: document.querySelector('.img-drone2'), depth: 50 },
  { el: document.querySelector('.img-drone3'), depth: 70 },
  { el: document.querySelector('.img-drone4'), depth: 90 }
];

const circles = [
  { el: document.querySelector('.img-circle1'), depth: 10 },
  { el: document.querySelector('.img-circle2'), depth: 20 },
  { el: document.querySelector('.img-circle3'), depth: 30 },
  { el: document.querySelector('.img-circle4'), depth: 40 },
  { el: document.querySelector('.img-circle5'), depth: 50 },
  { el: document.querySelector('.img-circle6'), depth: 60 }
];

const tools = [
  { el: document.querySelector('.img-tool1'), depth: 10 },
  { el: document.querySelector('.img-tool2'), depth: 20 },
  { el: document.querySelector('.img-tool3'), depth: 30 },
  { el: document.querySelector('.img-tool4'), depth: 40 },
  { el: document.querySelector('.img-tool5'), depth: 50 },
  { el: document.querySelector('.img-tool6'), depth: 60 }
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
  circles.forEach(circle => {
    const moveX = currentX * circle.depth;
    const moveY = currentY * circle.depth;
    circle.el.style.transform = `translate(${moveX}px, ${moveY}px)`;
  });

  tools.forEach(tool => {
    const moveX = currentX * tool.depth;
    const moveY = currentY * tool.depth;
    tool.el.style.transform = `translate(${moveX}px, ${moveY}px)`;
  });

  requestAnimationFrame(animate);
}

animate();

// =============================






// ==================================

const sections = document.querySelectorAll("section");
        const hero = document.querySelector(".hero");
        const sec2 = document.querySelector(".section-2");
        const sec3 = document.querySelector(".section-3");

        function showSection(section) {
            sections.forEach(s => {
                s.classList.add("hidden");
                s.classList.remove("fade-in");
            });
            section.classList.remove("hidden");
            section.classList.add("fade-in");
        }

        // Inicial: hero
        window.addEventListener("load", () => {
            sections.forEach(s => s.classList.add("hidden"));
            showSection(hero);
        });

        // Navegações
        document.querySelector(".arrow-down button").addEventListener("click", () => showSection(sec2));
        document.querySelector(".page-info button").addEventListener("click", () => showSection(sec3));
        document.querySelector(".goback button").addEventListener("click", () => showSection(sec2));
        document.querySelector(".go-hero").addEventListener("click", (e) => {
            e.preventDefault();
            showSection(hero);
        });

        // ==============================

       const products = document.querySelectorAll('.product-info');
    let currentIndex = 0;
    let isAnimating = false;
    let autoSlide; // timer

    function showProduct(newIndex, direction) {
        if (isAnimating || newIndex === currentIndex) return;
        isAnimating = true;

        const currentProduct = products[currentIndex];
        const nextProduct = products[newIndex];

        // Remove ativo do atual
        currentProduct.classList.remove('active');
        currentProduct.classList.add(direction === 'next' ? 'slide-in-left' : 'slide-in-right');

        // Define posição inicial do próximo
        nextProduct.style.left = direction === 'next' ? '100%' : '-100%';
        nextProduct.classList.add('active');

        // Força reflow
        void nextProduct.offsetWidth;

        nextProduct.style.left = '0';

        setTimeout(() => {
            currentProduct.classList.remove('slide-in-left', 'slide-in-right');
            isAnimating = false;
        }, 500);

        currentIndex = newIndex;
    }

    function nextProduct() {
        const newIndex = (currentIndex + 1) % products.length;
        showProduct(newIndex, 'next');
        resetAutoSlide();
    }

    function prevProduct() {
        const newIndex = (currentIndex - 1 + products.length) % products.length;
        showProduct(newIndex, 'prev');
        resetAutoSlide();
    }

    // Botões
    document.querySelectorAll('.next').forEach(btn => {
        btn.addEventListener('click', nextProduct);
    });

    document.querySelectorAll('.prev').forEach(btn => {
        btn.addEventListener('click', prevProduct);
    });

    // Swipe (arrastar pro lado)
    let startX = 0;
    document.querySelector('.showroom').addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });

    document.querySelector('.showroom').addEventListener('touchend', (e) => {
        let endX = e.changedTouches[0].clientX;
        if (startX - endX > 50) {
            nextProduct();
        } else if (endX - startX > 50) {
            prevProduct();
        }
    });

    // --- Auto Slide ---
    function startAutoSlide() {
        autoSlide = setInterval(() => {
            const newIndex = (currentIndex + 1) % products.length;
            showProduct(newIndex, 'next');
        }, 4000); // troca a cada 4 segundos
    }

    function resetAutoSlide() {
        clearInterval(autoSlide);
        startAutoSlide();
    }

    // inicia
    startAutoSlide();

