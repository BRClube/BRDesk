/* Orientações pós-instalação de rastreador */
(function () {
    'use strict';

    var D = window.Desk;

    var PLATAFORMAS = {
        redeloc: {
            nome: 'REDELOC',
            iphone: 'https://apps.apple.com/br/app/logica-monitoramento/id1354154680',
            android: 'https://play.google.com/store/apps/details?id=org.logica.rastreamento.app',
            site: 'https://www.redeloc.com.br/'
        },
        rastreieBrasil: {
            nome: 'RASTREIE BRASIL',
            iphone: 'https://apps.apple.com/br/app/rastreie-brasil/id1508025177',
            android: 'https://play.google.com/store/apps/details?id=org.logica.rastreiebrasil.app',
            site: 'https://rastreiebrasil2.rastreiebrasil.com.br/login/login'
        }
    };

    function marca(valor) {
        return '<mark>' + D.escapeHTML(valor) + '</mark>';
    }

    function linksDeDownload(plataforma, sistema) {
        var html = '';

        if (sistema === 'android' || sistema === 'indefinido') {
            html += 'Disponível para Android:<br>' + marca('*' + plataforma.android + '*') + '<br><br>';
        }
        if (sistema === 'iphone' || sistema === 'indefinido') {
            html += 'Disponível para IOS:<br>' + marca('*' + plataforma.iphone + '*') + '<br><br>';
        }

        return html;
    }

    function gerarTexto() {
        var plataforma = PLATAFORMAS[D.val('plataforma')];
        var sistema = D.val('sistema');
        var nome = D.val('nome');
        var login = D.val('login');
        var senha = D.val('senha');

        var html = '';
        html += 'Boa tarde, <strong>*' + marca(nome) + '*</strong>. <br><br>';
        html += 'O seu equipamento de rastreador já foi instalado, e nós gostaríamos de te orientar sobre o ' +
            'procedimento de monitoramento do seu veículo. É muito simples!<br><br>';
        html += '*1.* O primeiro passo é baixar, na loja de aplicativos do seu celular, o app <strong>' +
            marca(plataforma.nome) + '</strong>.<br><br>';
        html += linksDeDownload(plataforma, sistema);
        html += 'Acesse também pelo nosso site:<br>' + marca('*' + plataforma.site + '*') + '<br><br>';
        html += '*2.* Após baixar o app, você poderá entrar no monitoramento do veículo utilizando seu login e ' +
            'senha no primeiro acesso.<br><br>';
        html += 'LOGIN: *<strong>' + marca(login) + '</strong>*<br>';
        html += 'SENHA: *<strong>' + marca(senha) + '</strong>*<br><br>';
        html += 'Pronto!<br><br>';
        html += 'Seguindo as orientações acima você poderá usufruir das funcionalidades de rastreamento e ' +
            'monitoramento disponíveis.<br><br>';
        html += 'Lembrando que o equipamento está sendo emprestado para prestar o serviço, sendo necessário a ' +
            'devolução e ou autorização para a retirada ao final do contrato, caso não seja autorizado, será ' +
            'cobrado o valor do equipamento conforme assinado no contrato.<br><br>';
        html += 'Qualquer dúvida, chama a gente aqui.<br><br>';
        html += 'Muito obrigado!<br><br><strong>*Equipe Carsegur!*</strong>';

        D.setPreview('<div class="message">' + html + '</div>');
    }

    document.getElementById('btnGerar').addEventListener('click', gerarTexto);

    document.getElementById('btnCopiar').addEventListener('click', function () {
        D.copyFrom(document.querySelector('#previewBody .message'), this);
    });

    D.bindEnterToGenerate(document.getElementById('formOrientacoes'), gerarTexto);
    D.focusFirstField();
})();
