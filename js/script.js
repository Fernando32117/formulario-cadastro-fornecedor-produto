$(document).ready(function () {
    let productCount = 1;
    let fileCount = 0;
    let files = {};

    // Função de validação
    function validarFormulario() {
        let formValido = true;
        let camposObrigatorios = [
            '#razaoSocial',
            '#cnpj',
            '#nomeFantasia',
            '#inscricaoEstadual',
            '#cep',
            '#inscricaoMunicipal',
            '#endereco',
            '#numero',
            '#bairro',
            '#municipio',
            '#estado',
            '#nomeContato',
            '#telefone',
            '#email'
        ];

        camposObrigatorios.forEach(function (campo) {
            if ($(campo).val().trim() === '') {
                $(campo).addClass('is-invalid'); // Adiciona uma classe para destacar o campo
                formValido = false;
            } else {
                $(campo).removeClass('is-invalid'); // Remove a classe caso o campo esteja preenchido
            }
        });

        // Validação dos produtos
        $('.product-row').each(function (index, element) {
            let dado1 = $(element).find(`#dado1_${index + 1}`).val();
            let dado2 = $(element).find(`#dado2_${index + 1}`).val();
            let dado3 = $(element).find(`#dado3_${index + 1}`).val();
            let dado4 = $(element).find(`#dado4_${index + 1}`).val();

            if (!dado1 || !dado2 || !dado3 || !dado4) {
                $(element).find('input, select').addClass('is-invalid');
                formValido = false;
            } else {
                $(element).find('input, select').removeClass('is-invalid');
            }
        });

        return formValido;
    }

    $(document).ready(function () {
        $('#cep').on('blur', function () {
            let cep = $(this).val().replace(/\D/g, ''); // Remove caracteres não numéricos
            if (cep) {
                let validacep = /^[0-9]{8}$/; // Regex para validar o CEP
                if (validacep.test(cep)) {
                    // Chamada à API ViaCEP
                    $.getJSON(`https://viacep.com.br/ws/${cep}/json/`, function (dados) {
                        if (!("erro" in dados)) {
                            // Preencher os campos com os valores retornados
                            $('#endereco').val(dados.logradouro);
                            $('#bairro').val(dados.bairro);
                            $('#municipio').val(dados.localidade);
                            $('#estado').val(dados.uf);
                        } else {
                            alert("CEP não encontrado.");
                        }
                    }).fail(function () {
                        alert("Erro ao consultar o CEP.");
                    });
                } else {
                    alert("Formato de CEP inválido.");
                }
            }
        });
    });
    

    // Evento de salvamento
    $('#save-button').click(function (e) {
        e.preventDefault();

        if (validarFormulario()) {
            let formData = {};

            // Exibir os dados no modal ou salvar
            displayModalData(formData);
            $('#formModal').modal('show');
        } else {
            alert('Por favor, preencha todos os campos obrigatórios.');
        }
    });



    // Adicionar novo produto
    $('#add-button').click(function (e) {
        e.preventDefault();
        productCount++;
        let newProductHtml = `
            <div class="product-row mb-3">
        <div class="row align-items-center">
            <div class="col-1 text-center">
                <button class="remove-button btn btn-danger"><img src="img/lixeira.png" alt="" style="width: 24px; height: 24px;"></button>
            </div>
            <div class="col-1">
                <div class="round-div">
                    <img src="img/caixa.png" alt="">
                </div>
            </div>
            <div class="col-10">
                <form class="form">
                    <div class="form-row">
                        <div class="form-group col-md-12">
                            <label for="dado1_${productCount}">Produto${productCount}<span class="text-danger">*</span></label>
                            <input type="text" class="form-control" id="dado1_${productCount}">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-3">
                            <label for="dado2_${productCount}">UND. Medida<span class="text-danger">*</span></label>
                            <select class="form-control" id="dado2_${productCount}">
                                <option selected></option>
                                <option value="1">UN</option>
                                <option value="2">KG</option>
                                <option value="3">M</option>
                            </select>
                        </div>
                        <div class="form-group col-md-3">
                            <label for="dado3_${productCount}">QDTDE. em Estoque<span class="text-danger">*</span></label>
                            <input type="number" class="form-control" id="dado3_${productCount}">
                        </div>
                        <div class="form-group col-md-3">
                            <label for="dado4_${productCount}">Valor Unitário<span class="text-danger">*</span></label>
                            <input type="number" class="form-control" id="dado4_${productCount}">
                        </div>
                        <div class="form-group col-md-3">
                            <label for="dado5_${productCount}">Valor Total</label>
                            <input type="number" disabled class="form-control" id="dado5_${productCount}">
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>`;
        $('#products-container').append(newProductHtml);
    });


    // Remover produto
    $(document).on('click', '.remove-button', function () {
        if ($('.product-row').length > 1) {
            $(this).closest('.product-row').remove();
        }
    });


    // Adicionar novo arquivo
    $('#add-file-button').click(function (e) {
        e.preventDefault();
        fileCount++;
        let newFileHtml = `
        <div class="row file-row align-items-center mb-3" id="file-row-${fileCount}">
            <div class="col-1 text-center"> 
                <button class="remove-file-button btn btn-danger"><img src="img/lixeira.png" alt="" style="width: 24px; height: 24px;"></button>
            </div>
            <div class="col-1 text-center">
                <i class="file-eye-icon btn btn-info">&#128065;</i>
            </div>
            <div class="col-6">
                <input type="file" class="form-control-file file-input" id="file_${fileCount}" data-file-id="${fileCount}">
            </div>
        </div>`;
        $('#files-container').append(newFileHtml);
    });

    // Manipulação de arquivos
    $(document).on('change', '.file-input', function () {
        let fileId = $(this).data('file-id');
        let file = this.files[0];
        files[fileId] = file;
    });

    // Visualizar arquivo
    $(document).on('click', '.file-eye-icon', function () {
        let fileId = $(this).closest('.file-row').find('.file-input').data('file-id');
        let file = files[fileId];
        if (file) {
            let url = URL.createObjectURL(file);
            window.open(url);
        } else {
            alert('Nenhum arquivo selecionado.');
        }
    });

    // Remover arquivo
    $(document).on('click', '.remove-file-button', function () {
        let fileId = $(this).closest('.file-row').find('.file-input').data('file-id');
        delete files[fileId];
        $(this).closest('.file-row').remove();
    });

    // Calcular Valor Total
    $(document).on('input', '[id^="dado3_"], [id^="dado4_"]', function () {
        let $row = $(this).closest('.product-row');
        let quantity = parseFloat($row.find('input[id^="dado3_"]').val()) || 0;
        let unitPrice = parseFloat($row.find('input[id^="dado4_"]').val()) || 0;
        let totalPrice = quantity * unitPrice;
        $row.find('input[id^="dado5_"]').val(totalPrice.toFixed(2));
    });



    // Salvar formulário
    $('#save-button').click(function (e) {
        e.preventDefault();
        let formData = {
            razaoSocial: $('#razaoSocial').val(),
            cnpj: $('#cnpj').val(),
            nomeFantasia: $('#nomeFantasia').val(),
            inscricaoEstadual: $('#inscricaoEstadual').val(),
            cep: $('#cep').val(),
            inscricaoMunicipal: $('#inscricaoMunicipal').val(),
            endereco: $('#endereco').val(),
            numero: $('#numero').val(),
            complemento: $('#complemento').val(),
            bairro: $('#bairro').val(),
            municipio: $('#municipio').val(),
            estado: $('#estado').val(),
            nomeContato: $('#nomeContato').val(),
            telefone: $('#telefone').val(),
            email: $('#email').val(),
            produtos: [],
            arquivos: []
        };

        $('.product-row').each(function (index, element) {
            let produto = {
                dado1: $(element).find(`#dado1_${index + 1}`).val(),
                dado2: $(element).find(`#dado2_${index + 1}`).val(),
                dado3: $(element).find(`#dado3_${index + 1}`).val(),
                dado4: $(element).find(`#dado4_${index + 1}`).val(),
                dado5: $(element).find(`#dado5_${index + 1}`).val()
            };
            formData.produtos.push(produto);
        });

        $.each(files, function (key, file) {
            formData.arquivos.push({
                nome: file.name,
                tamanho: file.size,
                tipo: file.type
            });
        });

        displayModalData(formData);
        $('#formModal').modal('show');
    });

    // Evento de confirmação do salvamento
    $('#confirm-save-button').click(function () {
        if (validarFormulario()) {
            // Prossiga com o salvamento dos dados
            let formData = {
                razaoSocial: $('#razaoSocial').val(),
                cnpj: $('#cnpj').val(),
                nomeFantasia: $('#nomeFantasia').val(),
                cep: $('#cep').val(),
                endereco: $('#endereco').val(),
                numero: $('#numero').val(),
                complemento: $('#complemento').val(),
                bairro: $('#bairro').val(),
                municipio: $('#municipio').val(),
                estado: $('#estado').val(),
                nomeContato: $('#nomeContato').val(),
                telefone: $('#telefone').val(),
                email: $('#email').val(),
                produtos: [],
                arquivos: []
            };

            $('.product-row').each(function (index, element) {
                let produto = {
                    dado1: $(element).find(`#dado1_${index + 1}`).val(),
                    dado2: $(element).find(`#dado2_${index + 1} option:selected`).text(),
                    dado3: $(element).find(`#dado3_${index + 1}`).val(),
                    dado4: $(element).find(`#dado4_${index + 1}`).val()
                };
                formData.produtos.push(produto);
            });

            $.each(files, function (key, file) {
                formData.arquivos.push({
                    nome: file.name,
                    tamanho: file.size,
                    tipo: file.type
                });
            });

            sessionStorage.setItem('formData', JSON.stringify(formData));
            $('#formModal').modal('hide');
            console.log('JSON salvo no session storage:', formData);
            alert('Formulário salvo com sucesso! O JSON está listado na console do navegador.');
        } else {
            alert('Por favor, preencha todos os campos obrigatórios.');
        }
    });


    function displayModalData(formData) {
        $('#modal-general').html(`
            Razão Social: ${formData.razaoSocial}<br>
            CNPJ: ${formData.cnpj}<br>
            Nome Fantasia: ${formData.nomeFantasia}<br>
            Inscrição Estadual: ${formData.inscricaoEstadual}<br>
            CEP: ${formData.cep}<br>
            Inscrição Municipal: ${formData.inscricaoMunicipal}<br>
            Endereço: ${formData.endereco}<br>
            Número: ${formData.numero}<br>
            Complemento: ${formData.complemento}<br>
            Bairro: ${formData.bairro}<br>
            Município: ${formData.municipio}<br>
            Estado: ${formData.estado}<br>
            Nome da Pessoa de Contato: ${formData.nomeContato}<br>
            Telefone: ${formData.telefone}<br>
            E-mail: ${formData.email}
        `);

        $('#modal-products').empty();
        formData.produtos.forEach((produto, index) => {
            $('#modal-products').append(`
                <li>
                    Produto ${index + 1}: ${produto.dado1}<br>
                    UND. Medida: ${produto.dado2}<br> <!-- Exibe o texto selecionado -->
                    QDTDE. em Estoque: ${produto.dado3}<br>
                    Valor Unitário: ${produto.dado4}<br>
                    Valor Total: ${produto.dado5}
                </li>
            `);
        });

        $('#modal-files').empty();
        formData.arquivos.forEach((arquivo, index) => {
            $('#modal-files').append(`
                <li>
                    Anexo ${index + 1}: Nome - ${arquivo.nome}, Tamanho - ${arquivo.tamanho} bytes, Tipo - ${arquivo.tipo}
                </li>
            `);
        });
    }

});
