/* Protocolo de agendamento de rastreador — instalação, desinstalação e manutenção */
(function () {
    'use strict';

    var D = window.Desk;

    var SERVICOS = {
        'Instalação': {
            crumb: 'Agendar Instalação',
            titulo: 'Agendar instalação de rastreador',
            protocolo: 'PROTOCOLO DE AGENDAMENTO PARA INSTALAÇÃO DE RASTREADOR',
            documento: 'Protocolo de agendamento para instalação de rastreador',
            endereco: 'Endereço da instalação',
            arquivo: 'agendamento_instalacao_rastreador.pdf',
            hint: 'Agendamento da instalação de um novo equipamento no veículo.',
            hintImei: 'IMEI do equipamento que será instalado.',
            motivo: '',
            motivoPlaceholder: ''
        },
        'Desinstalação': {
            crumb: 'Agendar Desinstalação',
            titulo: 'Agendar desinstalação de rastreador',
            protocolo: 'PROTOCOLO DE AGENDAMENTO PARA DESINSTALAÇÃO DE RASTREADOR',
            documento: 'Protocolo de agendamento para desinstalação de rastreador',
            endereco: 'Endereço da desinstalação',
            arquivo: 'agendamento_desinstalacao_rastreador.pdf',
            hint: 'Agendamento da retirada do equipamento instalado no veículo.',
            hintImei: 'IMEI do equipamento que será retirado do veículo.',
            motivo: 'Motivo da desinstalação',
            motivoPlaceholder: 'Ex.: cancelamento do plano, venda do veículo, troca de equipamento'
        },
        'Manutenção': {
            crumb: 'Agendar Manutenção',
            titulo: 'Agendar manutenção de rastreador',
            protocolo: 'PROTOCOLO DE AGENDAMENTO PARA MANUTENÇÃO DE RASTREADOR',
            documento: 'Protocolo de agendamento para manutenção de rastreador',
            endereco: 'Endereço da manutenção',
            arquivo: 'agendamento_manutencao_rastreador.pdf',
            hint: 'Agendamento de reparo ou revisão do equipamento já instalado.',
            hintImei: 'IMEI do equipamento que será verificado.',
            motivo: 'Defeito relatado / manutenção solicitada',
            motivoPlaceholder: 'Ex.: rastreador sem sinal, bateria, revisão preventiva'
        }
    };

    var PADRAO = 'Instalação';

    function servicoAtual() {
        return SERVICOS[D.radio('tipoServico')] ? D.radio('tipoServico') : PADRAO;
    }

    function campos(tipo) {
        var servico = SERVICOS[tipo];
        var lista = [
            { rotulo: 'Tipo de serviço', valor: tipo },
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
            { rotulo: servico.endereco, id: 'endereco' },
            { rotulo: 'Data', id: 'dataHora', tipo: 'dataHora' }
        ];

        if (servico.motivo) {
            lista.push({ rotulo: servico.motivo, id: 'motivo' });
        }

        lista.push(
            { rotulo: 'Protocolo do atendimento com o associado', id: 'protocoloAssociado' },
            { rotulo: 'Protocolo de contato com prestador', id: 'protocoloPrestador' },
            { rotulo: 'Atendente', id: 'atendente' }
        );
        return lista;
    }

    function valorDe(campo) {
        if (campo.valor !== undefined) return campo.valor;
        if (campo.radio) return D.radio(campo.radio);
        var bruto = D.val(campo.id);
        if (campo.tipo === 'data') return D.formatDate(bruto);
        if (campo.tipo === 'dataHora') return D.formatDateTime(bruto);
        return bruto;
    }

    function aplicarServico() {
        var tipo = servicoAtual();
        var servico = SERVICOS[tipo];

        document.title = 'BR Desk Carsegur | ' + servico.crumb + ' de Rastreador';
        document.getElementById('crumbServico').textContent = servico.crumb;
        document.getElementById('tituloPagina').textContent = servico.titulo;
        document.getElementById('hintServico').textContent = servico.hint;
        document.getElementById('hintImei').textContent = servico.hintImei;
        document.getElementById('labelEndereco').textContent = servico.endereco;

        var campoMotivo = document.getElementById('campoMotivo');
        var motivo = document.getElementById('motivo');

        if (servico.motivo) {
            document.getElementById('labelMotivo').textContent = servico.motivo;
            motivo.setAttribute('placeholder', servico.motivoPlaceholder);
            campoMotivo.hidden = false;
        } else {
            campoMotivo.hidden = true;
            motivo.value = '';
        }
    }

    function gerarTexto() {
        var tipo = servicoAtual();
        var servico = SERVICOS[tipo];
        var lista = campos(tipo);

        var mensagem = '<span class="msg-head">*' + servico.protocolo + '*</span>';
        var documento = '';

        for (var i = 0; i < lista.length; i++) {
            var valor = D.escapeHTML(valorDe(lista[i]));
            mensagem += '<strong>*' + lista[i].rotulo + ':*</strong> ' + valor + '<br><br>';
            documento += '<p><strong>' + lista[i].rotulo + ':</strong> ' + valor + '</p>';
        }

        D.setPreview('<div class="message">' + mensagem + '</div>');

        var base = document.body.getAttribute('data-base') || '';
        document.getElementById('pdfDoc').innerHTML =
            '<div class="sheet" style="text-align:left">' +
            '<img class="sheet__logo" src="' + base + 'Images/logo.png" alt="Carsegur Proteção Veicular">' +
            '<div class="sheet__title">' + servico.documento + '</div>' +
            documento +
            '</div>';
    }

    var radios = document.querySelectorAll('input[name="tipoServico"]');
    for (var i = 0; i < radios.length; i++) {
        radios[i].addEventListener('change', function () {
            /* o motivo é específico de cada serviço; troca de serviço zera o campo */
            document.getElementById('motivo').value = '';
            aplicarServico();
        });
    }

    document.getElementById('btnGerar').addEventListener('click', gerarTexto);

    document.getElementById('btnCopiar').addEventListener('click', function () {
        D.copyFrom(document.querySelector('#previewBody .message'), this);
    });

    document.getElementById('btnPDF').addEventListener('click', function () {
        D.exportPDF(document.querySelector('#pdfDoc .sheet'), SERVICOS[servicoAtual()].arquivo, this);
    });

    D.bindEnterToGenerate(document.getElementById('formAgendamento'), gerarTexto);
    aplicarServico();
    D.focusFirstField();
})();
