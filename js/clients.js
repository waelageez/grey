/* Clients page: the logo wall, and one client's reels + designs (clients.html#client-id). */
(function () {
    const CLIENTS = window.CLIENTS || [];
    const $ = (id) => document.getElementById(id);
    const wall = $('cl-wall'), none = $('cl-none'), q = $('cl-q');
    const index = $('cl-index'), detail = $('cl-detail'), grid = $('cl-grid');
    const isAr = () => document.documentElement.getAttribute('dir') === 'rtl';
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const esc = (s) => String(s || '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

    const T = {
        en: { reel: 'reel', reels: 'reels', design: 'design', designs: 'designs', open: 'Open', ig: 'Instagram', fb: 'Facebook', tt: 'TikTok' },
        ar: { reel: 'ريل', reels: 'ريلز', design: 'تصميم', designs: 'تصاميم', open: 'افتح', ig: 'إنستغرام', fb: 'فيسبوك', tt: 'تيك توك' },
    };
    const t = () => T[isAr() ? 'ar' : 'en'];
    const name = (c) => (isAr() ? c.ar : c.en);
    const sector = (c) => [isAr() ? c.sectorAr : c.sectorEn, isAr() ? c.cityAr : c.cityEn].filter(Boolean).join(' · ');
    const count = (c) => {
        const L = t(), r = c.reels.length, d = c.designs.length, out = [];
        if (r) out.push(`${r} ${r === 1 ? L.reel : L.reels}`);
        if (d) out.push(`${d} ${d === 1 ? L.design : L.designs}`);
        return out.join(' · ');
    };
    const initials = (c) => c.en.replace(/^Dr\.?\s+/i, '').split(/\s+/).filter((w) => /^[A-Za-z]/.test(w)).slice(0, 2).map((w) => w[0]).join('').toUpperCase();
    // The logo plate: each logo in its own colours on a plate that suits it (paper for logos made
    // for white, their own colour for the rest). A client without a logo yet gets its name as a wordmark.
    function wordmark(c) {
        const n = name(c).split(' · ')[0];
        const m = n.match(/^(Dr\.?|د\.)\s*(.+)$/);
        const pre = m ? `<small>${esc(m[1])}</small>` : '';
        return `<span class="cl-plate is-mark is-word"><span class="wordmark" aria-hidden="true">${pre}<b>${esc(m ? m[2] : n)}</b></span></span>`;
    }
    function logoHtml(c) {
        if (!c.logo) return wordmark(c);
        const src = `assets/images/clients/${esc(c.logo)}`;
        if (c.logoType === 'mark') {
            const plate = c.plate ? ` style="background:${esc(c.plate)}"` : '';
            return `<span class="cl-plate is-mark"${plate}><img class="mark" src="${src}" alt="" decoding="async"></span>`;
        }
        return `<span class="cl-plate is-photo" style="--logo:url('${src}')"><img class="avatar" src="${src}" alt="" decoding="async"></span>`;
    }
    // Size each logo by area, not width: a wide wordmark and a tall emblem then carry the same weight.
    function balance(root) {
        root.querySelectorAll('.cl-plate.is-mark img.mark').forEach((img) => {
            const set = () => {
                const ar = img.naturalWidth / img.naturalHeight || 1, area = 0.38;
                const w = Math.min(0.84, Math.sqrt(area * ar)), h = Math.min(0.66, Math.sqrt(area / ar));
                const fit = Math.min(w / Math.sqrt(area * ar), h / Math.sqrt(area / ar));
                img.style.width = (Math.sqrt(area * ar) * fit * 100).toFixed(1) + '%';
            };
            if (img.complete && img.naturalWidth) set(); else img.addEventListener('load', set, { once: true });
        });
    }

    // A logo on a flat background: paint the plate that exact colour and drop the frame,
    // so the logo reads edge to edge instead of as a square inside a square.
    function flatten(root) {
        root.querySelectorAll('.cl-plate.is-photo img').forEach((img) => {
            const run = () => {
                try {
                    const n = 32, cv = document.createElement('canvas');
                    cv.width = cv.height = n;
                    const cx = cv.getContext('2d', { willReadFrequently: true });
                    cx.drawImage(img, 0, 0, n, n);
                    const d = cx.getImageData(0, 0, n, n).data, px = [];
                    for (let i = 0; i < n; i++) for (const [x, y] of [[i, 0], [i, 1], [i, n - 1], [i, n - 2], [0, i], [1, i], [n - 1, i], [n - 2, i]]) {
                        const o = (y * n + x) * 4; px.push([d[o], d[o + 1], d[o + 2]]);
                    }
                    const avg = [0, 1, 2].map((k) => px.reduce((s, p) => s + p[k], 0) / px.length);
                    const dev = Math.sqrt(px.reduce((s, p) => s + p.reduce((t, v, k) => t + (v - avg[k]) ** 2, 0), 0) / px.length);
                    if (dev < 14) {
                        const plate = img.parentElement;
                        plate.style.background = `rgb(${avg.map(Math.round).join(',')})`;
                        plate.classList.add('is-flat');
                    }
                } catch (e) { /* leave the blurred bed */ }
            };
            if (img.complete && img.naturalWidth) run(); else img.addEventListener('load', run, { once: true });
        });
    }

    /* ---------- Stats ---------- */
    const totals = { clients: CLIENTS.length, reels: 0, designs: 0 };
    CLIENTS.forEach((c) => { totals.reels += c.reels.length; totals.designs += c.designs.length; });
    document.querySelectorAll('[data-stat]').forEach((el) => {
        const target = totals[el.dataset.stat];
        if (reduced) { el.textContent = target; return; }
        let n = 0; const step = Math.max(1, Math.ceil(target / 30));
        (function tick() { n = Math.min(target, n + step); el.textContent = n; if (n < target) requestAnimationFrame(tick); })();
    });

    /* ---------- The wall ---------- */
    function renderWall() {
        const term = (q.value || '').trim().toLowerCase();
        const list = CLIENTS.filter((c) => !term || [c.en, c.ar, c.handle, c.sectorEn, c.sectorAr].join(' ').toLowerCase().includes(term));
        wall.innerHTML = list.map((c, i) => `
            <li><button type="button" class="cl-tile" data-id="${esc(c.id)}" style="transition-delay:${reduced ? 0 : Math.min(i, 12) * 0.04}s">
                ${logoHtml(c)}
                <span class="cl-info">
                    <span class="cl-name">${esc(name(c))}</span>
                    <span class="cl-sector">${esc(sector(c))}</span>
                    <span class="cl-count">${esc(count(c))}</span>
                </span>
            </button></li>`).join('');
        none.hidden = list.length > 0;
        flatten(wall);
        balance(wall);
        requestAnimationFrame(() => wall.querySelectorAll('.cl-tile').forEach((el) => el.classList.add('in')));
    }
    wall.addEventListener('click', (e) => {
        const tile = e.target.closest('.cl-tile');
        if (tile) location.hash = tile.dataset.id;
    });
    q.addEventListener('input', renderWall);

    /* ---------- One client ---------- */
    let current = null, tab = 'reels', lastScroll = 0;

    function embed(item, kind) {
        if (item.tt) {
            // TikTok's bare player: just the video, no caption card around it
            const q = 'controls=1&progress_bar=1&play_button=1&volume_control=1&fullscreen_button=1&timestamp=0&loop=0&autoplay=0&music_info=0&description=0&rel=0&native_context_menu=0&closed_caption=0';
            return `<div class="reel-skeleton"></div><iframe class="tt" src="https://www.tiktok.com/player/v1/${encodeURIComponent(item.tt)}?${q}" allow="encrypted-media; autoplay; fullscreen; picture-in-picture" allowfullscreen loading="lazy" title="TikTok"></iframe>`;
        }
        if (item.fb) {
            const src = `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(item.fb)}&show_text=false&width=340`;
            return `<div class="reel-skeleton"></div><iframe class="fb" src="${src}" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" allowfullscreen loading="lazy" title="Facebook"></iframe>`;
        }
        const path = kind === 'reels' ? 'reel' : 'p';
        return `<div class="reel-skeleton"></div><blockquote class="instagram-media" data-instgrm-version="14"
            data-instgrm-permalink="https://www.instagram.com/${path}/${encodeURIComponent(item.ig)}/?utm_source=ig_embed&amp;utm_campaign=loading"
            style="background:#000; border:0; margin:0; padding:0;"></blockquote>`;
    }
    function processInstagram() {
        if (window.instgrm && window.instgrm.Embeds) window.instgrm.Embeds.process();
        else setTimeout(processInstagram, 400);
    }

    function renderGrid() {
        const items = current[tab];
        const cls = tab === 'reels' ? 'is-reel' : 'is-design';
        grid.innerHTML = items.map((it, i) => `<div class="reel-card ${cls}" data-i="${i}" style="transition-delay:${reduced ? 0 : (i % 4) * 0.08}s"><div class="reel-clip"><div class="reel-skeleton"></div></div></div>`).join('');
        detail.querySelectorAll('.cl-tab').forEach((b) => b.setAttribute('aria-selected', String(b.dataset.tab === tab)));
        refreshTappable();
        checkCards();
    }

    // Embeds load when a card nears the screen, as on the reels page.
    function checkCards() {
        if (!current) return;
        const vh = innerHeight;
        let ig = false;
        grid.querySelectorAll('.reel-card').forEach((card) => {
            const r = card.getBoundingClientRect();
            if (r.top < vh - 30 && r.bottom > 0) card.classList.add('in');
            const clip = card.querySelector('.reel-clip');
            if (r.top < vh + 400 && r.bottom > -400 && !clip.dataset.loaded) {
                clip.dataset.loaded = '1';
                const item = current[tab][+card.dataset.i];
                clip.innerHTML = embed(item, tab);
                if (item.ig) ig = true;
                const frame = clip.querySelector('iframe');
                if (frame) frame.addEventListener('load', () => clip.classList.add('loaded'));
            }
        });
        if (ig) processInstagram();
    }
    setInterval(() => document.querySelectorAll('.reel-clip').forEach((c) => { if (c.querySelector('iframe')) c.classList.add('loaded'); }), 1200);
    addEventListener('scroll', checkCards, { passive: true });
    addEventListener('resize', checkCards);

    function renderHead() {
        const c = current, L = t();
        $('cl-logo').innerHTML = logoHtml(c);
        flatten($('cl-logo'));
        balance($('cl-logo'));
        $('cl-title').textContent = name(c);
        $('cl-meta').textContent = sector(c);
        const links = [];
        if (c.handle) links.push(`<a href="https://www.instagram.com/${esc(c.handle)}/" target="_blank" rel="noopener noreferrer"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>@${esc(c.handle)}</a>`);
        if (c.facebook) links.push(`<a href="https://www.facebook.com/${esc(c.facebook)}" target="_blank" rel="noopener noreferrer"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 8h3V4h-3c-2.8 0-4 1.8-4 4.3V10H7.5v4H10v6h4v-6h2.8l.7-4H14V8.6c0-.4.2-.6.6-.6z"/></svg>${L.fb}</a>`);
        $('cl-links').innerHTML = links.join('');
        detail.querySelectorAll('[data-n]').forEach((s) => { s.textContent = c[s.dataset.n].length; });
        detail.querySelectorAll('.cl-tab').forEach((b) => { b.hidden = c[b.dataset.tab].length === 0; });
        $('cl-tabs').hidden = !(c.reels.length && c.designs.length);
    }

    function route() {
        const id = decodeURIComponent(location.hash.slice(1));
        const c = CLIENTS.find((x) => x.id === id);
        if (c) {
            if (!current) lastScroll = scrollY;
            current = c;
            tab = c.reels.length ? 'reels' : 'designs';
            index.hidden = true;
            detail.hidden = false;
            renderHead();
            renderGrid();
            document.title = `${c.en} - Grey Agency`;
            scrollTo(0, 0);
        } else {
            const was = !!current;
            current = null;
            grid.innerHTML = '';   // stops any playing video
            detail.hidden = true;
            index.hidden = false;
            document.title = 'Clients - Grey Agency';
            if (was) scrollTo(0, lastScroll);
        }
    }
    addEventListener('hashchange', route);
    // Back returns to the wall where you left it; a client opened from a shared link goes to the top of the wall.
    let fromWall = false;
    wall.addEventListener('click', () => { fromWall = true; }, true);
    function toWall() {
        if (fromWall) { fromWall = false; history.back(); return; }
        history.pushState(null, '', location.pathname + location.search);
        route();
    }
    $('cl-back').addEventListener('click', toWall);
    $('cl-tabs').addEventListener('click', (e) => {
        const b = e.target.closest('.cl-tab');
        if (!b || b.dataset.tab === tab) return;
        tab = b.dataset.tab;
        renderGrid();
    });

    /* ---------- Phones: tap a card for a fullscreen view ---------- */
    const isMobile = () => matchMedia('(max-width: 768px)').matches;
    const modal = $('reel-modal'), modalClip = $('reel-modal-clip');
    function refreshTappable() { grid.querySelectorAll('.reel-card').forEach((c) => c.classList.toggle('reels-tappable', isMobile())); }
    addEventListener('resize', refreshTappable);
    grid.addEventListener('click', (e) => {
        const card = e.target.closest('.reel-card');
        if (!card || !isMobile() || !current) return;
        const item = current[tab][+card.dataset.i];
        modalClip.className = 'reel-clip ' + (tab === 'reels' ? 'is-reel' : 'is-design');
        modalClip.innerHTML = embed(item, tab);
        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        if (item.ig) processInstagram();
    });
    function closeModal() {
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        setTimeout(() => { modalClip.innerHTML = ''; }, 320);
    }
    $('reel-modal-back').addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', (e) => {
        if (e.key !== 'Escape') return;
        if (modal.classList.contains('open')) closeModal();
        else if (current) toWall();
    });

    /* ---------- Language switch: re-render names and counts ---------- */
    document.querySelectorAll('.lang-toggle').forEach((b) => b.addEventListener('click', () => setTimeout(() => {
        renderWall();
        if (current) renderHead();
    }, 30)));

    // main.js (loaded after this file) sets the language first; render once it has.
    addEventListener('DOMContentLoaded', () => { renderWall(); route(); });
})();
