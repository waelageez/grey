// ═══════════════════════════════════════════
//  Grey Agency — Cinematic Wormhole Hero
//  Exact scene from 3d/tunnel.html, adapted for homepage
// ═══════════════════════════════════════════

(function () {
    // ── Hide UI elements during the cinematic flight ──────────────────────────
    const logoReveal = document.getElementById('logo-reveal');
    const mainNav    = document.getElementById('main-nav');
    if (logoReveal) { logoReveal.style.visibility = 'hidden'; logoReveal.style.opacity = '0'; }
    // Keep the main menu visible at all times — including during the tunnel intro
    if (mainNav)    { mainNav.style.opacity = '1'; mainNav.style.pointerEvents = 'auto'; }

    // ── 1. SCENE SETUP ──────────────────────────────────────────────────────
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#000000');
    scene.fog = new THREE.Fog('#000000', 40, 180);

    const camera = new THREE.PerspectiveCamera(65, innerWidth / innerHeight, 0.1, 4000);
    camera.position.set(0, 0, 90);

    // Mount onto the existing canvas element in the hero section
    const canvas = document.getElementById('hero-3d-canvas');
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(innerWidth, innerHeight);
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.outputEncoding = THREE.sRGBEncoding;

    // Make canvas visible (CSS starts it at opacity:0)
    canvas.classList.add('hero-3d-ready');

    // Lights attached to camera for consistent GLB specular
    const amb = new THREE.AmbientLight(0x6666aa, 1.5);
    scene.add(amb);
    const dL1 = new THREE.DirectionalLight(0xffffff, 3); dL1.position.set(80, 150, 80);
    const dL2 = new THREE.DirectionalLight(0x4488ff, 3); dL2.position.set(-80, -150, -80);
    camera.add(dL1); camera.add(dL2);
    scene.add(camera);

    // Post-processing (bloom)
    const composer = new THREE.EffectComposer(renderer);
    composer.addPass(new THREE.RenderPass(scene, camera));
    const bloom = new THREE.UnrealBloomPass(new THREE.Vector2(innerWidth, innerHeight), 1.8, 0.5, 0.35);
    composer.addPass(bloom);

    // ── 2. TRACK CONFIG ──────────────────────────────────────────────────────
    const R = 7;
    const segLen = 8;
    const numSeg = 75;
    const tLen = numSeg * segLen;   // 600
    const spaceLen = 800;
    const loopLen = tLen + spaceLen; // 1400
    const wormholeSpawns = [];

    // ── 3. RING TUNNEL BUILDER ───────────────────────────────────────────────
    const ringCoreMat = new THREE.MeshBasicMaterial({ color: 0xffffff });

    const glowColors = [0x22ccff, 0x3399ff, 0x5566ff, 0x7744ee, 0x5566ff];
    const glowMats = glowColors.map(c => new THREE.MeshBasicMaterial({
        color: c, transparent: true, opacity: 0.35,
        blending: THREE.AdditiveBlending, depthWrite: false
    }));

    const coreGeo = new THREE.TorusGeometry(R, 0.1, 8, 80);
    const glowGeo = new THREE.TorusGeometry(R, 0.45, 8, 80);

    const lineMat = new THREE.MeshBasicMaterial({
        color: 0x1133aa, transparent: true, opacity: 0.15,
        blending: THREE.AdditiveBlending, depthWrite: false
    });
    const lineGeo = new THREE.CylinderGeometry(0.03, 0.03, segLen, 4);
    lineGeo.rotateX(Math.PI / 2);

    function createTunnel(offsetZ) {
        const g = new THREE.Group();
        wormholeSpawns.push(new THREE.Vector3(0, 0, offsetZ + 35));
        for (let i = 0; i <= numSeg; i++) {
            const z = offsetZ - i * segLen;
            const ci = i % glowColors.length;
            const core = new THREE.Mesh(coreGeo, ringCoreMat);
            core.position.z = z;
            g.add(core);
            const glow = new THREE.Mesh(glowGeo, glowMats[ci]);
            glow.position.z = z;
            g.add(glow);
            if (i < numSeg) {
                const angles = [0, Math.PI/2, Math.PI, Math.PI*1.5];
                angles.forEach(a => {
                    const rail = new THREE.Mesh(lineGeo, lineMat);
                    rail.position.set(Math.cos(a)*R, Math.sin(a)*R, z - segLen/2);
                    g.add(rail);
                });
            }
        }
        scene.add(g);
        return g;
    }

    createTunnel(0);
    createTunnel(-loopLen);

    // ── 4. STARFIELD ─────────────────────────────────────────────────────────
    function makeStars(count, spread, size, color, zRange) {
        const geo = new THREE.BufferGeometry();
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count * 3; i += 3) {
            pos[i]   = (Math.random() - .5) * spread;
            pos[i+1] = (Math.random() - .5) * spread;
            pos[i+2] = -Math.random() * zRange;
        }
        geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
        return new THREE.Points(geo, new THREE.PointsMaterial({
            size, color, transparent: true, opacity: .9, fog: false,
            blending: THREE.AdditiveBlending, depthWrite: false
        }));
    }
    for (let off = -loopLen; off <= loopLen; off += loopLen) {
        const s = makeStars(3000, 3000, 1.5, 0xaabbff, loopLen);
        s.position.z = off; scene.add(s);
    }
    for (let off = -loopLen; off <= loopLen; off += loopLen) {
        const s = makeStars(400, 2000, 3.5, 0xffffff, loopLen);
        s.position.z = off; scene.add(s);
    }
    for (let off = -loopLen; off <= loopLen; off += loopLen) {
        const s = makeStars(200, 2500, 2.0, 0xffaa66, loopLen);
        s.position.z = off; scene.add(s);
    }

    // ── 5. DUST PARTICLES ────────────────────────────────────────────────────
    const dustCount = 600;
    const dustGeo = new THREE.BufferGeometry();
    const dustPos = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i++) {
        const a = Math.random() * Math.PI * 2;
        const r = 1.5 + Math.random() * (R - 2.5);
        dustPos[i*3]   = Math.cos(a) * r;
        dustPos[i*3+1] = Math.sin(a) * r;
        dustPos[i*3+2] = -Math.random() * tLen;
    }
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
    const dustMat = new THREE.PointsMaterial({
        size: .6, color: 0x6688ff, transparent: true, opacity: .4,
        blending: THREE.AdditiveBlending, depthWrite: false
    });
    const dust1 = new THREE.Points(dustGeo, dustMat);
    scene.add(dust1);
    const dust2 = dust1.clone();
    dust2.position.z = -loopLen;
    scene.add(dust2);

    // ── 6. WORMHOLE (GLB + GLOW + ACCRETION DISK) ────────────────────────────
    const gltfLoader = new THREE.GLTFLoader();
    const loadedModels = [];
    const accretionDisks = [];

    wormholeSpawns.forEach(sp => {
        const ph = new THREE.Mesh(
            new THREE.SphereGeometry(25, 16, 16),
            new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true })
        );
        ph.position.copy(sp); scene.add(ph);
    });

    gltfLoader.load('3d/blackhole_speareffect.glb', gltf => {
        scene.children.filter(c => c.material && c.material.wireframe && c.material.color.r === 1)
            .forEach(c => scene.remove(c));

        wormholeSpawns.forEach(sp => {
            const grp = new THREE.Group();
            const mdl = gltf.scene.clone();
            const box = new THREE.Box3().setFromObject(mdl);
            const center = box.getCenter(new THREE.Vector3());
            const sz = box.getSize(new THREE.Vector3());
            const pivot = new THREE.Group();
            mdl.position.sub(center);
            pivot.add(mdl);
            pivot.scale.setScalar(55 / Math.max(sz.x, sz.y, sz.z || 1));
            pivot.rotation.x = 0.4;
            pivot.rotation.z = 0.25;
            grp.add(pivot);
            grp.position.copy(sp);

            mdl.traverse(ch => {
                if (ch.isMesh) ch.material = new THREE.MeshBasicMaterial({
                    color: 0x4488ff, transparent: true, opacity: .9,
                    blending: THREE.AdditiveBlending, depthWrite: false
                });
            });

            const iGeo = new THREE.SphereGeometry(28, 32, 32);
            const iMat = new THREE.ShaderMaterial({
                uniforms: { time: { value: 0 } },
                vertexShader: `varying vec3 vN; varying vec3 vV;
                    void main(){ vN=normalize(normalMatrix*normal);
                    vec4 mv=modelViewMatrix*vec4(position,1.); vV=normalize(-mv.xyz);
                    gl_Position=projectionMatrix*mv; }`,
                fragmentShader: `uniform float time; varying vec3 vN; varying vec3 vV;
                    void main(){ float f=pow(1.-abs(dot(vN,vV)),2.5);
                    float p=.8+.2*sin(time*1.5);
                    vec3 c=mix(vec3(.2,.5,1.),vec3(.9,.95,1.),f)*p*2.5;
                    gl_FragColor=vec4(c,f*.7); }`,
                transparent: true, blending: THREE.AdditiveBlending,
                depthWrite: false, side: THREE.FrontSide, fog: false
            });
            const iGlow = new THREE.Mesh(iGeo, iMat);
            iGlow.position.copy(sp); scene.add(iGlow);

            const dCount = 800;
            const dGeo = new THREE.BufferGeometry();
            const dPos = new Float32Array(dCount * 3);
            const dCol = new Float32Array(dCount * 3);
            const dData = [];
            for (let i = 0; i < dCount; i++) {
                const ang = Math.random() * Math.PI * 2;
                const rad = 22 + Math.random() * 25;
                const spd = (.3 + Math.random() * .4) * (rad < 30 ? 1.5 : 1);
                dPos[i*3] = Math.cos(ang) * rad;
                dPos[i*3+1] = (Math.random()-.5) * 1.5;
                dPos[i*3+2] = Math.sin(ang) * rad;
                const t = (rad - 22) / 25;
                dCol[i*3]   = 1.0 - t * .6;
                dCol[i*3+1] = .4 + t * .3;
                dCol[i*3+2] = .15 + t * .85;
                dData.push({ angle: ang, radius: rad, speed: spd });
            }
            dGeo.setAttribute('position', new THREE.BufferAttribute(dPos, 3));
            dGeo.setAttribute('color', new THREE.BufferAttribute(dCol, 3));
            const dMat = new THREE.PointsMaterial({
                size: 1.8, vertexColors: true, transparent: true, opacity: .7,
                blending: THREE.AdditiveBlending, depthWrite: false, fog: false
            });
            const disk = new THREE.Points(dGeo, dMat);
            disk.position.copy(sp);
            disk.rotation.x = Math.PI * .42;
            scene.add(disk);
            accretionDisks.push({ mesh: disk, data: dData });

            grp.userData = { innerGlow: iGlow, pivot };
            scene.add(grp);
            loadedModels.push(grp);
        });
    }, undefined, err => {
        console.error('GLB error:', err);
    });

    // ── 7. ANIMATION STATE ───────────────────────────────────────────────────
    let vel = 0.08, targetVel = 0.08;
    let loopCount = 0, logoRevealed = false, finalSeq = false, finalT = 0;
    let text1Fired = false, text2Fired = false;

    function fireText(ids, gap) {
        ids.forEach((id, i) => {
            setTimeout(() => {
                const el = document.getElementById(id);
                if (!el) return;
                el.classList.remove('active');
                void el.offsetWidth;
                el.classList.add('active');
            }, i * gap);
        });
    }

    // ── 8. RENDER LOOP ───────────────────────────────────────────────────────
    function animate() {
        requestAnimationFrame(animate);
        const t = performance.now() * .001;

        camera.position.z -= vel;

        if (!text1Fired && loopCount === 0 && camera.position.z < -tLen - 20) {
            text1Fired = true;
            fireText(['t-bg1','t-a1','t-a2','t-b1'], 200);
        }
        if (!text2Fired && loopCount === 1 && camera.position.z < -tLen - 20) {
            text2Fired = true;
            fireText(['t-bg2','t-a3','t-b2'], 200);
        }

        loadedModels.forEach(g => {
            if (g.userData.pivot) g.userData.pivot.rotation.y -= .007;
            if (g.userData.innerGlow) g.userData.innerGlow.material.uniforms.time.value = t;
        });

        accretionDisks.forEach(({ mesh, data }) => {
            const p = mesh.geometry.attributes.position.array;
            data.forEach((d, i) => {
                d.angle += d.speed * .015;
                p[i*3]   = Math.cos(d.angle) * d.radius;
                p[i*3+2] = Math.sin(d.angle) * d.radius;
            });
            mesh.geometry.attributes.position.needsUpdate = true;
        });

        if (!finalSeq) {
            const z = camera.position.z;
            if (z > 60)                           targetVel = 0.4;
            else if (z > 35)                      targetVel = 6;
            else if (z > -tLen)                   targetVel = 2.8;
            else if (z > -(tLen + spaceLen - 60)) targetVel = 5;
            else                                  targetVel = 7;
        }
        vel += (targetVel - vel) * .025;

        const inTunnel = camera.position.z > -tLen && camera.position.z < 0;
        if (inTunnel && !finalSeq) {
            // Random jitter only during the pre-reveal wormhole flight
            if (vel > 1.5) {
                camera.position.x += (Math.random()-.5) * vel * .012;
                camera.position.y += (Math.random()-.5) * vel * .012;
            }
            camera.position.y += (0 - camera.position.y) * .04;
        } else if (!finalSeq) {
            camera.position.x += (0 - camera.position.x) * .03;
            camera.position.y += (0 - camera.position.y) * .03;
        }

        // Pre-reveal loop counter
        if (camera.position.z <= -loopLen && !finalSeq) {
            loopCount++;
            camera.position.z += loopLen;
        }

        if (loopCount >= 2 && camera.position.z < -(tLen + 200) && !logoRevealed) {
            finalSeq = true; logoRevealed = true; finalT = 0;
            // Slow down for the assembly moment, then ramp back to cruise
            targetVel = 0.3;
            setTimeout(() => { targetVel = 1.5; }, 2600);

            // Hide GLB models and accretion disks
            loadedModels.forEach(g => {
                g.visible = false;
                if (g.userData.innerGlow) g.userData.innerGlow.visible = false;
            });
            accretionDisks.forEach(d => d.mesh.visible = false);
            // Recursively hide all Mesh geometry (tunnel rings live inside Groups,
            // so .children.forEach misses them — .traverse visits the full tree).
            scene.traverse(c => { if (c.isMesh) c.visible = false; });

            // EMERGENCE REVEAL — make container visible, then animate pieces in
            if (logoReveal) {
                logoReveal.style.visibility = 'visible';
                logoReveal.style.opacity = '1';
            }
            const logoAssembly = document.getElementById('logo-assembly-container');
            if (logoAssembly) logoAssembly.classList.add('show');

            setTimeout(() => document.getElementById('bgWord').classList.add('show'), 1100);
            setTimeout(() => document.getElementById('revLine').classList.add('show'), 2700);
            setTimeout(() => document.getElementById('ph1').classList.add('show'), 2950);
            setTimeout(() => document.getElementById('ph2').classList.add('show'), 3200);
            setTimeout(() => { if(logoAssembly) logoAssembly.classList.add('idle'); }, 3500);

            // Reveal CTAs and nav right after phrases appear
            setTimeout(() => {
                const revCta = document.getElementById('revCta');
                if (revCta) revCta.classList.add('show');
                if (mainNav) {
                    mainNav.style.transition = 'opacity 1.5s ease';
                    mainNav.style.opacity = '1';
                    mainNav.style.pointerEvents = 'auto';
                }
            }, 3700);
        }

        if (finalSeq) {
            vel = Math.max(vel, 0);
            finalT++;

            // Seamless infinite loop — wraps by exactly loopLen so the star
            // field tiles invisibly and the flight continues forever.
            if (camera.position.z <= -loopLen) camera.position.z += loopLen;

            // Gentle X/Y sine drift for parallax depth
            const d = finalT * 0.00014;
            camera.position.x += (Math.sin(d) * 1.2 - camera.position.x) * 0.004;
            camera.position.y += (Math.cos(d * 0.6) * 0.6 - camera.position.y) * 0.004;

            // Fog gradually lifts so more stars become visible.
            if (scene.fog.far < 900) scene.fog.far += 0.18;
        }

        composer.render();
    }

    window.addEventListener('resize', () => {
        camera.aspect = innerWidth / innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(innerWidth, innerHeight);
        composer.setSize(innerWidth, innerHeight);
    });

    animate();
})();
