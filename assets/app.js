/* =========================================================
   BR Desk Carsegur — runtime compartilhado
   Sem dependências, sem backend.
   ========================================================= */
(function () {
    'use strict';

    /* ---------------------------------------------------------
       Ícones (traçados no estilo Lucide, embutidos)
       --------------------------------------------------------- */
    var ICONS = {
        home: '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>',
        headset: '<path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"/>',
        locate: '<line x1="2" x2="5" y1="12" y2="12"/><line x1="19" x2="22" y1="12" y2="12"/><line x1="12" x2="12" y1="2" y2="5"/><line x1="12" x2="12" y1="19" y2="22"/><circle cx="12" cy="12" r="7"/><circle cx="12" cy="12" r="3"/>',
        fileText: '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/>',
        fileCheck: '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="m9 15 2 2 4-4"/>',
        calendarCheck: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/><path d="m9 16 2 2 4-4"/>',
        smartphone: '<rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/>',
        chevronRight: '<path d="m9 18 6-6-6-6"/>',
        chevronDown: '<path d="m6 9 6 6 6-6"/>',
        arrowRight: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
        copy: '<rect x="8" y="8" width="14" height="14" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>',
        download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/><path d="M12 15V3"/>',
        check: '<path d="M20 6 9 17l-5-5"/>',
        checkCircle: '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
        trash: '<path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M10 11v6"/><path d="M14 11v6"/>',
        plus: '<path d="M5 12h14"/><path d="M12 5v14"/>',
        eye: '<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>',
        eyeOff: '<path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c6.4 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.53 13.53 0 0 0 2 12s3.6 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><path d="m2 2 20 20"/>',
        menu: '<path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/>',
        car: '<path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/>',
        user: '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
        mapPin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
        navigation: '<path d="m3 11 19-9-9 19-2-8-8-2Z"/>',
        flag: '<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><path d="M4 22v-7"/>',
        gauge: '<path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/>',
        clipboard: '<rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/>',
        alert: '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
        shield: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>',
        key: '<circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6"/><path d="m15.5 7.5 3 3L22 7l-3-3"/>',
        package: '<path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>',
        clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
        inbox: '<path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>',
        route: '<circle cx="6" cy="19" r="3"/><circle cx="18" cy="5" r="3"/><path d="M12 19h4.5a3.5 3.5 0 0 0 0-7h-8a3.5 3.5 0 0 1 0-7H12"/>',
        chat: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
        send: '<path d="M22 2 11 13"/><path d="M22 2 15 22 11 13 2 9 22 2z"/>',
        external: '<path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h6"/>',
        x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>'
    };

    function icon(name) {
        return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ' +
            'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (ICONS[name] || '') + '</svg>';
    }

    function hydrateIcons(root) {
        var nodes = (root || document).querySelectorAll('[data-icon]');
        for (var i = 0; i < nodes.length; i++) {
            nodes[i].innerHTML = icon(nodes[i].getAttribute('data-icon'));
        }
    }

    /* ---------------------------------------------------------
       Navegação (fonte única, injetada em todas as páginas)
       --------------------------------------------------------- */
    var NAV = [
        {
            label: 'Atendimento',
            items: [
                { key: 'home', href: 'index.html', icon: 'home', text: 'Início' },
                {
                    key: 'assistencia',
                    href: 'Assistencia24horas/assistencia24horas.html',
                    icon: 'headset',
                    text: 'Assistência 24 horas'
                }
            ]
        },
        {
            label: 'Rastreamento',
            items: [
                {
                    key: 'rastreamento',
                    href: 'Rastreio/rastreio.html',
                    icon: 'locate',
                    text: 'Visão geral',
                    children: [
                        { key: 'termo', href: 'TermoRastreador/termoRastreador.html', icon: 'fileText', text: 'Termo de Recebimento' },
                        { key: 'agendamento', href: 'TermoRastreador/agendamento.html', icon: 'calendarCheck', text: 'Agendar Instalação' },
                        { key: 'orientacoes', href: 'TermoRastreador/orientacaoRastreador.html', icon: 'smartphone', text: 'Orientações Pós-Instalação' }
                    ]
                }
            ]
        }
    ];

    function navItemHTML(item, base, active) {
        var cls = 'nav__item' + (item.key === active ? ' is-active' : '');
        var aria = item.key === active ? ' aria-current="page"' : '';
        return '<a class="' + cls + '" href="' + base + item.href + '"' + aria + '>' +
            icon(item.icon) + '<span>' + item.text + '</span></a>';
    }

    function buildSidebar(base, active) {
        var html = '<div class="sidebar__brand">' +
            '<a href="' + base + 'index.html"><img src="' + base + 'Images/logo.png" alt="Carsegur Proteção Veicular"></a>' +
            '</div><nav class="sidebar__nav" aria-label="Navegação principal">';

        for (var g = 0; g < NAV.length; g++) {
            html += '<div class="nav__label">' + NAV[g].label + '</div>';
            for (var i = 0; i < NAV[g].items.length; i++) {
                var item = NAV[g].items[i];
                html += navItemHTML(item, base, active);
                if (item.children) {
                    html += '<div class="nav__sub">';
                    for (var c = 0; c < item.children.length; c++) {
                        html += navItemHTML(item.children[c], base, active);
                    }
                    html += '</div>';
                }
            }
        }

        html += '</nav><div class="sidebar__foot">© CARSEGUR | 2025<br>Todos os direitos reservados<br>' +
            'Developed by <a href="https://site.cosmmus.com/" target="_blank" rel="noopener">Cosmmus Business</a></div>';
        return html;
    }

    function mountChrome() {
        var base = document.body.getAttribute('data-base') || '';
        var active = document.body.getAttribute('data-page') || '';

        var sidebar = document.querySelector('.sidebar');
        if (sidebar) sidebar.innerHTML = buildSidebar(base, active);

        var topbar = document.querySelector('.topbar');
        if (topbar) {
            topbar.innerHTML = '<button class="burger" type="button" aria-label="Abrir menu">' + icon('menu') + '</button>' +
                '<a href="' + base + 'index.html"><img src="' + base + 'Images/logo.png" alt="Carsegur"></a>';
            topbar.querySelector('.burger').addEventListener('click', function () {
                document.body.classList.toggle('nav-open');
            });
        }

        var scrim = document.querySelector('.scrim');
        if (scrim) {
            scrim.addEventListener('click', function () {
                document.body.classList.remove('nav-open');
            });
        }

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') document.body.classList.remove('nav-open');
        });
    }

    /* ---------------------------------------------------------
       Toasts
       --------------------------------------------------------- */
    function toast(message, type) {
        var wrap = document.querySelector('.toasts');
        if (!wrap) {
            wrap = document.createElement('div');
            wrap.className = 'toasts';
            document.body.appendChild(wrap);
        }

        var el = document.createElement('div');
        el.className = 'toast toast--' + (type || 'success');
        el.setAttribute('role', 'status');
        el.innerHTML = icon(type === 'warn' ? 'alert' : 'checkCircle') + '<span></span>';
        el.querySelector('span').textContent = message;
        wrap.appendChild(el);

        setTimeout(function () {
            el.classList.add('is-out');
            setTimeout(function () {
                if (el.parentNode) el.parentNode.removeChild(el);
            }, 180);
        }, 2600);
    }

    /* ---------------------------------------------------------
       Estado de sucesso temporário em botões
       --------------------------------------------------------- */
    function flash(btn, label, iconName) {
        if (!btn || btn.dataset.flashing === '1') return;
        var original = btn.innerHTML;
        btn.dataset.flashing = '1';
        btn.classList.add('is-success');
        btn.innerHTML = icon(iconName || 'check') + '<span>' + label + '</span>';

        setTimeout(function () {
            btn.classList.remove('is-success');
            btn.innerHTML = original;
            delete btn.dataset.flashing;
        }, 2000);
    }

    /* ---------------------------------------------------------
       Copiar texto
       --------------------------------------------------------- */
    function legacyCopy(text) {
        var ta = document.createElement('textarea');
        ta.value = text;
        ta.setAttribute('readonly', '');
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        var ok = false;
        try {
            ok = document.execCommand('copy');
        } catch (e) {
            ok = false;
        }
        document.body.removeChild(ta);
        return ok;
    }

    function copyFrom(sourceEl, btn) {
        var text = sourceEl ? (sourceEl.innerText || '').trim() : '';
        if (!text) {
            toast('Gere o texto antes de copiar.', 'warn');
            return;
        }

        function done() {
            flash(btn, 'Texto copiado', 'check');
            toast('Texto copiado para a área de transferência', 'success');
        }

        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(done, function () {
                if (legacyCopy(text)) done();
                else toast('Não foi possível copiar automaticamente.', 'warn');
            });
        } else if (legacyCopy(text)) {
            done();
        } else {
            toast('Não foi possível copiar automaticamente.', 'warn');
        }
    }

    /* ---------------------------------------------------------
       Máscaras
       --------------------------------------------------------- */
    function maskPhone(value) {
        var d = String(value).replace(/\D/g, '').slice(0, 11);
        if (d.length <= 2) return d.length ? '(' + d : '';
        if (d.length <= 6) return '(' + d.slice(0, 2) + ') ' + d.slice(2);
        if (d.length <= 10) return '(' + d.slice(0, 2) + ') ' + d.slice(2, 6) + '-' + d.slice(6);
        return '(' + d.slice(0, 2) + ') ' + d.slice(2, 7) + '-' + d.slice(7);
    }

    function maskCpfCnpj(value) {
        var d = String(value).replace(/\D/g, '').slice(0, 14);
        if (d.length <= 11) {
            return d
                .replace(/^(\d{3})(\d)/, '$1.$2')
                .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
                .replace(/\.(\d{3})(\d{1,2})$/, '.$1-$2');
        }
        return d
            .replace(/^(\d{2})(\d)/, '$1.$2')
            .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
            .replace(/\.(\d{3})(\d)/, '.$1/$2')
            .replace(/(\d{4})(\d{1,2})$/, '$1-$2');
    }

    function maskPlate(value) {
        return String(value).toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 7);
    }

    var MASKS = { telefone: maskPhone, cpfcnpj: maskCpfCnpj, placa: maskPlate };

    function bindMasks(root) {
        var nodes = (root || document).querySelectorAll('[data-mask]');
        for (var i = 0; i < nodes.length; i++) {
            (function (el) {
                var fn = MASKS[el.getAttribute('data-mask')];
                if (!fn || el.dataset.masked === '1') return;
                el.dataset.masked = '1';
                el.addEventListener('input', function () {
                    el.value = fn(el.value);
                });
            })(nodes[i]);
        }
    }

    /* ---------------------------------------------------------
       Mostrar/ocultar senha
       --------------------------------------------------------- */
    function bindPasswordToggles(root) {
        var nodes = (root || document).querySelectorAll('[data-toggle-password]');
        for (var i = 0; i < nodes.length; i++) {
            (function (btn) {
                var input = document.getElementById(btn.getAttribute('data-toggle-password'));
                if (!input) return;
                btn.innerHTML = icon('eye');
                btn.setAttribute('aria-label', 'Mostrar senha');
                btn.addEventListener('click', function () {
                    var show = input.type === 'password';
                    input.type = show ? 'text' : 'password';
                    btn.innerHTML = icon(show ? 'eyeOff' : 'eye');
                    btn.setAttribute('aria-label', show ? 'Ocultar senha' : 'Mostrar senha');
                });
            })(nodes[i]);
        }
    }

    /* ---------------------------------------------------------
       Seções recolhíveis
       --------------------------------------------------------- */
    function bindSections(root) {
        var heads = (root || document).querySelectorAll('.section__head');
        for (var i = 0; i < heads.length; i++) {
            (function (head) {
                var section = head.closest('.section');
                head.setAttribute('aria-expanded', section.classList.contains('is-collapsed') ? 'false' : 'true');
                head.addEventListener('click', function () {
                    var collapsed = section.classList.toggle('is-collapsed');
                    head.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
                });
            })(heads[i]);
        }
    }

    /* ---------------------------------------------------------
       Preview
       --------------------------------------------------------- */
    function previewBody() {
        return document.getElementById('previewBody');
    }

    function setPreview(html, opts) {
        var body = previewBody();
        if (!body) return;

        opts = opts || {};
        body.innerHTML = html;

        var deps = document.querySelectorAll('[data-needs-preview]');
        for (var i = 0; i < deps.length; i++) deps[i].disabled = false;

        if (opts.silent !== true) toast(opts.message || 'Texto gerado com sucesso', 'success');
    }

    function emptyPreview(title, desc) {
        return '<div class="empty">' +
            '<div class="empty__icon">' + icon('inbox') + '</div>' +
            '<div class="empty__title">' + title + '</div>' +
            '<div class="empty__desc">' + desc + '</div>' +
            '</div>';
    }

    /* ---------------------------------------------------------
       Exportação em PDF (html2pdf)
       O elemento é clonado numa largura fixa de A4 (794px @96dpi)
       para que o documento não herde a escala reduzida da tela.
       --------------------------------------------------------- */
    function exportPDF(sourceEl, filename, btn) {
        if (!sourceEl) {
            toast('Gere o documento antes de baixar o PDF.', 'warn');
            return;
        }
        if (typeof window.html2pdf !== 'function') {
            toast('Biblioteca de PDF indisponível. Recarregue a página.', 'warn');
            return;
        }

        var holder = document.createElement('div');
        holder.style.cssText = 'position:fixed;left:-10000px;top:0;width:794px;background:#fff;';

        var clone = sourceEl.cloneNode(true);
        clone.style.width = '794px';
        clone.style.boxShadow = 'none';
        clone.style.borderRadius = '0';
        clone.style.border = '0';
        clone.style.padding = '58px 64px 64px';
        clone.style.fontSize = '13px';

        holder.appendChild(clone);
        document.body.appendChild(holder);

        function cleanup() {
            if (holder.parentNode) holder.parentNode.removeChild(holder);
        }

        window.html2pdf()
            .set({
                margin: 0,
                filename: filename,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2, useCORS: true, backgroundColor: '#FFFFFF' },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
            })
            .from(clone)
            .save()
            .then(function () {
                cleanup();
                flash(btn, 'PDF gerado', 'check');
                toast('PDF preparado para download', 'success');
            })
            .catch(function () {
                cleanup();
                toast('Não foi possível gerar o PDF.', 'warn');
            });
    }

    /* ---------------------------------------------------------
       Enter gera o texto; Shift+Enter continua normal em textarea
       --------------------------------------------------------- */
    function bindEnterToGenerate(form, handler) {
        if (!form) return;
        form.addEventListener('keydown', function (e) {
            if (e.key !== 'Enter') return;
            var tag = (e.target.tagName || '').toLowerCase();
            if (tag === 'textarea' || tag === 'button') return;
            e.preventDefault();
            handler();
        });
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            handler();
        });
    }

    function focusFirstField() {
        var first = document.querySelector('.section__body .input, .section__body .select');
        if (first && window.innerWidth > 1040) first.focus();
    }

    /* ---------------------------------------------------------
       Datas
       --------------------------------------------------------- */
    function formatDate(value) {
        if (!value) return '';
        var p = String(value).split('-');
        if (p.length !== 3) return value;
        return p[2].slice(0, 2) + '/' + p[1] + '/' + p[0];
    }

    function formatDateTime(value) {
        if (!value) return '';
        var parts = String(value).split('T');
        if (parts.length !== 2) return value;
        var hm = parts[1].split(':');
        return formatDate(parts[0]) + ' - Horário: ' + hm[0] + 'h:' + (hm[1] || '00');
    }

    function escapeHTML(value) {
        return String(value == null ? '' : value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    }

    /* ---------------------------------------------------------
       Boot
       --------------------------------------------------------- */
    function init() {
        mountChrome();
        hydrateIcons();
        bindMasks();
        bindPasswordToggles();
        bindSections();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    /* ---------------------------------------------------------
       API pública
       --------------------------------------------------------- */
    window.Desk = {
        icon: icon,
        hydrateIcons: hydrateIcons,
        toast: toast,
        flash: flash,
        copyFrom: copyFrom,
        bindMasks: bindMasks,
        bindSections: bindSections,
        bindEnterToGenerate: bindEnterToGenerate,
        focusFirstField: focusFirstField,
        setPreview: setPreview,
        emptyPreview: emptyPreview,
        exportPDF: exportPDF,
        formatDate: formatDate,
        formatDateTime: formatDateTime,
        escapeHTML: escapeHTML,
        val: function (id) {
            var el = document.getElementById(id);
            return el ? el.value.trim() : '';
        },
        radio: function (name) {
            var el = document.querySelector('input[name="' + name + '"]:checked');
            return el ? el.value : '';
        }
    };
})();
