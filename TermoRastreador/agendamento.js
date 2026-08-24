/* Protocolo de agendamento para instalação de rastreador */
(function () {
    'use strict';

    var D = window.Desk;

    var CAMPOS = [
        { rotulo: 'Nome completo', id: 'nome' },
        { rotulo: 'CPF/CNPJ', id: 'cpf' },
        { rotulo: 'Data de nascimento', id: 'dataNascimento', tipo: 'data' },
        { rotulo: 'E-mail', id: 'email' },
        { rotulo: 'Telefone', id: 'telefone' },
        { rotulo: 'Gênero', radio: 'genero' },
        { rotulo: 'Placa', id: 'placa' },
        { rotulo: 'Modelo', id: 'veiculo' },
        { rotulo: 'Cor', id: 'cor' },
        { rotulo: 'Ano', id: 'ano' },
        { rotulo: 'Renavam', id: 'renavam' },
        { rotulo: 'Chassi', id: 'chassi' },
        { rotulo: 'N.º do IMEI', id: 'imei' },
        { rotulo: 'Endereço', id: 'endereco' },
        { rotulo: 'Data', id: 'dataHora', tipo: 'dataHora' },
        { rotulo: 'Atendente', id: 'atendente' }
    ];

    function valorDe(campo) {
        if (campo.radio) return D.radio(campo.radio);
        var bruto = D.val(campo.id);
        if (campo.tipo === 'data') return D.formatDate(bruto);
        if (campo.tipo === 'dataHora') return D.formatDateTime(bruto);
        return bruto;
    }

    function gerarTexto() {
        var mensagem = '<span class="msg-head">*PROTOCOLO DE AGENDAMENTO PARA INSTALAÇÃO DE RASTREADOR*</span>';
        var documento = '';

        for (var i = 0; i < CAMPOS.length; i++) {
            var valor = D.escapeHTML(valorDe(CAMPOS[i]));
            mensagem += '<strong>*' + CAMPOS[i].rotulo + ':*</strong> ' + valor + '<br><br>';
            documento += '<p><strong>' + CAMPOS[i].rotulo + ':</strong> ' + valor + '</p>';
        }

        D.setPreview('<div class="message">' + mensagem + '</div>');

        var base = document.body.getAttribute('data-base') || '';
        document.getElementById('pdfDoc').innerHTML =
            '<div class="sheet" style="text-align:left">' +
            '<img class="sheet__logo" src="' + base + 'Images/logo.png" alt="Carsegur Proteção Veicular">' +
            '<div class="sheet__title">Protocolo de agendamento para instalação de rastreador</div>' +
            documento +
            '</div>';
    }

    document.getElementById('btnGerar').addEventListener('click', gerarTexto);

    document.getElementById('btnCopiar').addEventListener('click', function () {
        D.copyFrom(document.querySelector('#previewBody .message'), this);
    });

    document.getElementById('btnPDF').addEventListener('click', function () {
        D.exportPDF(document.querySelector('#pdfDoc .sheet'), 'agendamento_rastreador.pdf', this);
    });

    D.bindEnterToGenerate(document.getElementById('formAgendamento'), gerarTexto);
    D.focusFirstField();
})();
