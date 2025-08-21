

           
        const mobileMenuButton = document.querySelector('.mobile-menu-button');
        const mobileMenuClose = document.querySelector('.mobile-menu-close');
        const mobileMenu = document.querySelector('.mobile-menu');
        
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.add('active');
        });
        
        mobileMenuClose.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
        });


       
       document.addEventListener('DOMContentLoaded', () => {
    console.log('DimendsCAASI website loaded!');

    const carousel = document.getElementById('ring-carousel');
    const ringInfo = document.getElementById('ring-info');
    
    
    const nameOverlay = document.createElement('div');
    nameOverlay.className = 'ring-name-overlay';
    carousel.appendChild(nameOverlay);
    
    const rings = [
        {
            name: "Vintage",
            price: "$3800",
            offer: "Limited edition vintage piece",
            code: "VINTAGE10",
            image: "./images/compress image10.webp"
        },
        {
            name: "Vintage Antique", 
            price: "$4500",
            offer: "Take 20% off for a limited time.",
            code: "LOVE20",
            image: "./images/compress ring11.webp"
        },
        {
            name: "Antique",
            price: "$5200",
            offer: "Free engraving on antique pieces",
            code: "ANTIQUE15",
            image: "./images/compress ring16.webp"
        }
    ];
    
    rings.forEach((ring, index) => {
        const ringElement = document.createElement('div');
        ringElement.className = 'ring-item absolute rounded-full overflow-hidden cursor-pointer';
        ringElement.dataset.index = index;
        ringElement.style.backgroundImage = `url('${ring.image}')`;
        ringElement.onclick = function() { 
            rotateToIndex(index);
            resetAutoScroll(); 
        };
        carousel.appendChild(ringElement);
    });
    
    
    let currentIndex = 1;
    positionRings(currentIndex);
    updateDisplay(currentIndex);
    
    // Auto-scroll variables
    let autoScrollInterval;
    const SCROLL_INTERVAL = 5000; 
    
    // Start auto-scroll
    startAutoScroll();
    
    function positionRings(centerIndex) {
        const ringItems = document.querySelectorAll('.ring-item');
        const container = carousel.getBoundingClientRect();
        const centerX = container.width / 2;
        const centerY = container.height / 2;
        const isMobile = window.innerWidth < 768;

        ringItems.forEach((item, index) => {
            if (index === centerIndex) {
              
                item.style.width = isMobile ? '70%' : '20%';
                item.style.height = isMobile ? '50%' : '60%';
                item.style.left = `${centerX}px`;
                item.style.top = isMobile ? `${centerY * 0.70}px` : `${centerY * 0.6}px`;
                item.style.transform = 'translate(-50%, -50%) scale(1.1)';
                item.style.opacity = '1';
                item.style.zIndex = '30';
                item.style.border = isMobile ? '1px solid rgba(255, 255, 255, 0.3)' : '2px solid rgba(255, 255, 255, 0.3)';
                item.classList.add('center-ring');
                
                // Position the overlay text
                nameOverlay.style.display = 'block';
                nameOverlay.textContent = rings[index].name.toUpperCase();
            } else {
                item.classList.remove('center-ring');
                const isRightItem = index === (centerIndex + 1) % ringItems.length;
                
                // Mobile side items adjustments
                item.style.width = isMobile ? '40%' : '16%';
                item.style.height = isMobile ? '28%' : '30%';
                item.style.left = isMobile 
                    ? `${container.width * (isRightItem ? 0.8 : 0.2)}px`
                    : `${container.width * (isRightItem ? 0.9 : 0.1)}px`;
                item.style.top = isMobile 
                    ? `${container.height * 0.60}px`
                    : `${container.height * 0.6}px`;
                item.style.transform = 'translate(-50%, -50%) scale(0.9)';
                item.style.opacity = '0.8';
                item.style.zIndex = '20';
                item.style.border = '1px solid rgba(255, 255, 255, 0.2)';
            }
        });
    }
    
    function rotateToIndex(targetIndex) {
        if (targetIndex === currentIndex) return;
        
       
        document.querySelectorAll('.ring-item').forEach(item => {
            item.style.transition = 'all 0.7s cubic-bezier(0.33, 1, 0.68, 1)';
        });
        
       
        nameOverlay.style.opacity = '0';
        
      
        positionRings(targetIndex);
        
       
        ringInfo.style.opacity = '0';
        
        setTimeout(() => {
            currentIndex = targetIndex;
            updateDisplay(targetIndex);
            ringInfo.style.opacity = '1';
            nameOverlay.style.opacity = '1';
        }, 300);
    }
    
    function updateDisplay(index) {
        const ring = rings[index];
        document.getElementById('ring-price').textContent = ring.price;
        document.getElementById('ring-offer').textContent = ring.offer;
        document.getElementById('ring-code').innerHTML = `Use Code: <span class="text-yellow-600">${ring.code}</span>`;
        document.getElementById('small-ring-name').textContent = ring.name.toUpperCase();
    }
    
    
    function startAutoScroll() {
        autoScrollInterval = setInterval(() => {
            const nextIndex = (currentIndex + 1) % rings.length;
            rotateToIndex(nextIndex);
        }, SCROLL_INTERVAL);
    }
    
    function resetAutoScroll() {
        clearInterval(autoScrollInterval);
        startAutoScroll();
    }
    
    
    carousel.addEventListener('mouseenter', () => {
        clearInterval(autoScrollInterval);
    });
    
    // Resume auto-scroll when mouse leaves
    carousel.addEventListener('mouseleave', () => {
        resetAutoScroll();
    });
    
    window.addEventListener('resize', function() {
        positionRings(currentIndex);
    });

  


            const sliderTrack = document.getElementById('sliderTrack');
            const items = Array.from(document.querySelectorAll('.diamond-item'));
            const dots = Array.from(document.querySelectorAll('.slider-dot'));
            const totalItems = items.length;
            let currentPositions = Array.from({length: totalItems}, (_, i) => i + 1);
            let currentCenter = 4;
            
            updateDots();
            
            items.forEach(item => {
                const index = parseInt(item.getAttribute('data-index'));
                
                if(index <= 3) {
                    item.addEventListener('click', slideRight);
                } else if(index >= 5) {
                    item.addEventListener('click', slideLeft);
                }
            });
            
            dots.forEach(dot => {
                dot.addEventListener('click', function() {
                    const targetPos = parseInt(this.getAttribute('data-pos'));
                    centerToPosition(targetPos);
                });
            });
            
            function slideRight() {
                const firstPos = currentPositions[0];
                currentPositions = [...currentPositions.slice(1), firstPos];
                currentCenter = currentCenter === 1 ? 7 : currentCenter - 1;
                updatePositions();
                updateDots();
            }
            
            function slideLeft() {
                const lastPos = currentPositions[currentPositions.length - 1];
                currentPositions = [lastPos, ...currentPositions.slice(0, -1)];
                currentCenter = currentCenter === 7 ? 1 : currentCenter + 1;
                updatePositions();
                updateDots();
            }
            
            function centerToPosition(pos) {
                const steps = pos - currentCenter;
                if(steps > 0) {
                    for(let i = 0; i < steps; i++) {
                        const lastPos = currentPositions[currentPositions.length - 1];
                        currentPositions = [lastPos, ...currentPositions.slice(0, -1)];
                    }
                } else if(steps < 0) {
                    for(let i = 0; i < -steps; i++) {
                        const firstPos = currentPositions[0];
                        currentPositions = [...currentPositions.slice(1), firstPos];
                    }
                }
                currentCenter = pos;
                updatePositions();
                updateDots();
            }
            
            function updatePositions() {
                items.forEach((item, index) => {
                    item.setAttribute('data-pos', currentPositions[index]);
                });
            }
            
            function updateDots() {
                dots.forEach(dot => {
                    dot.classList.toggle('active', 
                        parseInt(dot.getAttribute('data-pos')) === currentCenter);
                });
            }
        });




    
        


    

        
    