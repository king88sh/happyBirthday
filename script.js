
        // Initialize 3D Cake Scene
        let scene, camera, renderer, cake, candles = [];
        
        function init3D() {
            const canvas = document.getElementById('birthday-3d');
            
            // Scene setup
            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
            renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
            renderer.setSize(300, 300);
            renderer.setClearColor(0x000000, 0);
            renderer.shadowMap.enabled = true;
            renderer.shadowMap.type = THREE.PCFSoftShadowMap;
            
            // Create cake group
            cake = new THREE.Group();
            
            // Cake base (bottom layer)
            const cakeBaseGeometry = new THREE.CylinderGeometry(1.2, 1.2, 0.4, 32);
            const cakeBaseMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
            const cakeBase = new THREE.Mesh(cakeBaseGeometry, cakeBaseMaterial);
            cakeBase.position.y = -0.5;
            cake.add(cakeBase);
            
            // Cake middle layer
            const cakeMiddleGeometry = new THREE.CylinderGeometry(1.0, 1.0, 0.3, 32);
            const cakeMiddleMaterial = new THREE.MeshPhongMaterial({ color: 0xffb3ba });
            const cakeMiddle = new THREE.Mesh(cakeMiddleGeometry, cakeMiddleMaterial);
            cakeMiddle.position.y = -0.15;
            cake.add(cakeMiddle);
            
            // Cake top layer
            const cakeTopGeometry = new THREE.CylinderGeometry(0.8, 0.8, 0.25, 32);
            const cakeTopMaterial = new THREE.MeshPhongMaterial({ color: 0xffd93d });
            const cakeTop = new THREE.Mesh(cakeTopGeometry, cakeTopMaterial);
            cakeTop.position.y = 0.125;
            cake.add(cakeTop);
            
            // Create candles
            for (let i = 0; i < 5; i++) {
                const candleGroup = new THREE.Group();
                
                // Candle stick
                const candleGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.3, 8);
                const candleMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
                const candleStick = new THREE.Mesh(candleGeometry, candleMaterial);
                candleStick.position.y = 0.4;
                
                // Flame
                const flameGeometry = new THREE.SphereGeometry(0.03, 8, 8);
                const flameMaterial = new THREE.MeshPhongMaterial({ 
                    color: 0xff4444,
                    emissive: 0xff2222,
                    emissiveIntensity: 0.3
                });
                const flame = new THREE.Mesh(flameGeometry, flameMaterial);
                flame.position.y = 0.57;
                flame.scale.y = 1.5;
                
                candleGroup.add(candleStick);
                candleGroup.add(flame);
                
                // Position candles in a circle
                const angle = (i / 5) * Math.PI * 2;
                candleGroup.position.x = Math.cos(angle) * 0.5;
                candleGroup.position.z = Math.sin(angle) * 0.5;
                
                candles.push(candleGroup);
                cake.add(candleGroup);
            }
            
            // Add decorative elements
            for (let i = 0; i < 8; i++) {
                const cherryGeometry = new THREE.SphereGeometry(0.05, 8, 8);
                const cherryMaterial = new THREE.MeshPhongMaterial({ color: 0xff6b6b });
                const cherry = new THREE.Mesh(cherryGeometry, cherryMaterial);
                
                const angle = (i / 8) * Math.PI * 2;
                cherry.position.x = Math.cos(angle) * 0.9;
                cherry.position.z = Math.sin(angle) * 0.9;
                cherry.position.y = -0.3;
                
                cake.add(cherry);
            }
            
            scene.add(cake);
            
            // Lighting
            const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
            scene.add(ambientLight);
            
            const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
            directionalLight.position.set(5, 5, 5);
            directionalLight.castShadow = true;
            scene.add(directionalLight);
            
            // Point light for candle glow
            const candleLight = new THREE.PointLight(0xff4444, 0.5, 3);
            candleLight.position.set(0, 0.6, 0);
            scene.add(candleLight);
            
            // Camera position
            camera.position.set(2, 1, 3);
            camera.lookAt(0, 0, 0);
            
            // Start animation
            animate3D();
        }
        
        function animate3D() {
            requestAnimationFrame(animate3D);
            
            // Rotate cake slowly
            if (cake) {
                cake.rotation.y += 0.005;
            }
            
            // Animate candle flames
            candles.forEach((candleGroup, index) => {
                const flame = candleGroup.children[1];
                if (flame) {
                    flame.scale.x = 1 + Math.sin(Date.now() * 0.01 + index) * 0.1;
                    flame.scale.z = 1 + Math.cos(Date.now() * 0.01 + index) * 0.1;
                }
            });
            
            renderer.render(scene, camera);
        }
        
        // Initialize 3D scene when page loads
        window.addEventListener('load', init3D);

        function celebrate() {
            // Create confetti effect
            for (let i = 0; i < 100; i++) {
                createConfetti();
            }
            
            // Show celebration message
            setTimeout(() => {
                alert("🎉 Happy Birthday to the most amazing person! 🎉");
            }, 500);
        }

        function createConfetti() {
            const confetti = document.createElement('div');
            const colors = ['#ffd93d', '#ffeb3b', '#ffffff', '#fff3a0', '#fff9c4'];
            
            confetti.style.position = 'fixed';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = '-10px';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.borderRadius = '50%';
            confetti.style.zIndex = '1000';
            confetti.style.pointerEvents = 'none';
            confetti.style.animation = 'confettiFall 3s linear forwards';
            
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                if (document.body.contains(confetti)) {
                    document.body.removeChild(confetti);
                }
            }, 3000);
        }

        // Add confetti animation
        const confettiStyle = document.createElement('style');
        confettiStyle.textContent = `
            @keyframes confettiFall {
                0% {
                    transform: translateY(-10px) rotate(0deg);
                    opacity: 1;
                }
                100% {
                    transform: translateY(100vh) rotate(720deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(confettiStyle);

        // Add mouse interaction sparkles
        document.addEventListener('mousemove', function(e) {
            if (Math.random() > 0.8) {
                createSparkle(e.pageX, e.pageY);
            }
        });

        function createSparkle(x, y) {
            const sparkle = document.createElement('div');
            sparkle.innerHTML = '✨';
            sparkle.style.position = 'fixed';
            sparkle.style.left = x + 'px';
            sparkle.style.top = y + 'px';
            sparkle.style.pointerEvents = 'none';
            sparkle.style.fontSize = '16px';
            sparkle.style.zIndex = '999';
            sparkle.style.animation = 'sparkleAnimation 1.5s ease-out forwards';
            
            document.body.appendChild(sparkle);
            
            setTimeout(() => {
                if (document.body.contains(sparkle)) {
                    document.body.removeChild(sparkle);
                }
            }, 1500);
        }

        // Add sparkle animation
        const sparkleStyle = document.createElement('style');
        sparkleStyle.textContent = `
            @keyframes sparkleAnimation {
                0% {
                    opacity: 1;
                    transform: scale(0) rotate(0deg);
                }
                50% {
                    opacity: 1;
                    transform: scale(1) rotate(180deg);
                }
                100% {
                    opacity: 0;
                    transform: scale(0) rotate(360deg) translateY(-30px);
                }
            }
        `;
        document.head.appendChild(sparkleStyle);
