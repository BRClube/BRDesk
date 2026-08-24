/* Assistência 24h — protocolo de abertura */
(function () {
    'use strict';

    var D = window.Desk;

    function linha(rotulo, valor) {
        return '<strong>*' + rotulo + ':*</strong> ' + D.escapeHTML(valor) + '<br><br>';
    }

    function gerarTexto() {
        var linkOrigem = D.val('linkOrigem');
        var linkDestino = D.val('linkDestino');
        var chaveDocumento = D.radio('chaveDocumento');
        var facilAcesso = D.radio('facilAcesso');

        var html = '';
        html += linha('Protocolo', D.val('protocolo'));
        html += linha('Data', D.formatDateTime(D.val('dataHora')));
        html += linha('Placa', D.val('placa'));
        html += linha('Modelo', D.val('modelo'));
        html += linha('Cor', D.val('cor'));
        html += linha('Solicitante', D.val('solicitante'));
        html += linha('Telefone', D.val('telefone'));
        html += linha('Fator Gerador', D.val('fatorGerador'));
        html += linha('Observação do fator gerador', D.val('observacaoFatorGerador'));

        if (chaveDocumento) {
            html += linha('Chave e documento no local', chaveDocumento);
        }
        html += linha('Observação', D.val('obsChaveDocumento'));

        if (facilAcesso) {
            html += linha('Veículo de fácil acesso', facilAcesso);
        }
        html += linha('Observação', D.val('obsAcesso'));

        html += linha('Serviço', D.val('servico'));
        html += linha('Endereço de Origem', D.val('enderecoOrigem'));
        html += linha('Referência de Origem', D.val('referenciaOrigem'));
        if (linkOrigem) {
            html += linha('Link da Origem', linkOrigem);
        }
        html += linha('Destino', D.val('destino'));
        html += linha('Referência de Destino', D.val('referenciaDestino'));
        if (linkDestino) {
            html += linha('Link do Destino', linkDestino);
        }
        html += linha('Quilometragem (km)', D.val('km') + ' km');
        html += linha('Quilometragem total (km)', D.val('kmTotal') + ' km');
        html += linha('Atendente', D.val('atendente'));
        html += linha('Supervisor', D.val('supervisor'));
        html += '<strong>*RESPONSÁVEL PELO PAGAMENTO:*</strong> CARSEGUR PROTEÇÃO VEICULAR';

        D.setPreview('<div class="message">' + html + '</div>');
    }

    document.getElementById('btnGerar').addEventListener('click', gerarTexto);

    document.getElementById('btnCopiar').addEventListener('click', function () {
        D.copyFrom(document.querySelector('#previewBody .message'), this);
    });

    D.bindEnterToGenerate(document.getElementById('formAssistencia'), gerarTexto);
    D.focusFirstField();
})();
