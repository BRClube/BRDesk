/* Termo de recebimento e responsabilidade com equipamento de rastreamento */
(function () {
    'use strict';

    var D = window.Desk;
    var lista = document.getElementById('equipList');

    /* ---------------- Equipamentos dinâmicos ---------------- */
    function renumerar() {
        var linhas = lista.querySelectorAll('.equip__row');
        for (var i = 0; i < linhas.length; i++) {
            var n = i + 1;
            var input = linhas[i].querySelector('input');
            var label = linhas[i].querySelector('label');
            var remover = linhas[i].querySelector('.icon-btn');

            input.id = 'equipamento' + n;
            label.setAttribute('for', 'equipamento' + n);
            label.textContent = 'Equipamento ' + n;
            remover.setAttribute('aria-label', 'Remover equipamento ' + n);
            remover.hidden = linhas.length === 1;
        }
    }

    function adicionarEquipamento(focar) {
        var linha = document.createElement('div');
        linha.className = 'equip__row';
        linha.innerHTML =
            '<div class="field">' +
            '<label class="label"></label>' +
            '<input class="input" type="text" inputmode="numeric" placeholder="Número do IMEI">' +
            '</div>' +
            '<button class="icon-btn" type="button">' + D.icon('trash') + '</button>';

        linha.querySelector('.icon-btn').addEventListener('click', function () {
            linha.parentNode.removeChild(linha);
            renumerar();
        });

        lista.appendChild(linha);
        renumerar();

        if (focar) linha.querySelector('input').focus();
    }

    document.getElementById('btnAddEquip').addEventListener('click', function () {
        adicionarEquipamento(true);
    });

    adicionarEquipamento(false);

    /* ---------------- Geração do documento ---------------- */
    function gerarDocumento() {
        var inputs = lista.querySelectorAll('input');
        var equipamentos = '';
        for (var i = 0; i < inputs.length; i++) {
            equipamentos += 'Equipamento ' + (i + 1) + ': ' + D.escapeHTML(inputs[i].value.trim()) + '<br>';
        }

        var nome = D.escapeHTML(D.val('nome'));
        var cpf = D.escapeHTML(D.val('cpf'));
        var rg = D.escapeHTML(D.val('rg'));
        var cidade = D.escapeHTML(D.val('cidade'));
        var data = D.formatDate(D.val('data1'));

        var base = document.body.getAttribute('data-base') || '';

        var html =
            '<div class="sheet">' +
            '<img class="sheet__logo" src="' + base + 'Images/logo.png" alt="Carsegur Proteção Veicular">' +
            '<div class="sheet__title">Termo de recebimento e responsabilidade com equipamento de rastreamento</div>' +
            '<p>Por meio deste documento, eu, ' + nome + ', com cadastro no CPF de nº ' + cpf + ', RG ' + rg +
            ', técnico de instalação de rastreadores, declaro que recebi os equipamentos correspondentes aos ' +
            'seguintes códigos:</p>' +
            '<div class="sheet__list">' + equipamentos + '</div>' +
            '<p>Me responsabilizo pelo seu bom uso e, caso o material não seja utilizado, asseguro devolvê-lo na ' +
            'sede da CARSEGUR PROTEÇÃO VEICULAR. Ao preencher e assinar o presente termo, demonstro estar ciente ' +
            'das condições estabelecidas pela CARSEGUR. Declaro também estar ciente de que não há vínculo ' +
            'empregatício entre as partes, e que minha atuação se dará de forma independente, não caracterizando ' +
            'relação de emprego nos termos da legislação trabalhista vigente.</p>' +
            '<div class="sheet__date">' + cidade + ', ' + data + '</div>' +
            '<div class="sheet__sign"><hr><span>Assinatura do(a) prestador(a)</span></div>' +
            '</div>';

        D.setPreview(html, { message: 'Documento gerado com sucesso' });
    }

    document.getElementById('btnGerar').addEventListener('click', gerarDocumento);

    document.getElementById('btnCopiar').addEventListener('click', function () {
        D.copyFrom(document.querySelector('#previewBody .sheet'), this);
    });

    document.getElementById('btnPDF').addEventListener('click', function () {
        D.exportPDF(document.querySelector('#previewBody .sheet'), 'termo_recebimento_rastreadores.pdf', this);
    });

    D.bindEnterToGenerate(document.getElementById('formTermo'), gerarDocumento);
    D.focusFirstField();
})();
