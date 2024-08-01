$(document).ready(function () {
    let productCount = 1;
    let fileCount = 0;
    let files = {};

    // Adicionar novo produto
    $('#add-button').click(function (e) {
        e.preventDefault();
        productCount++;

        let newProductHtml = `
        <div class="row product-row align-items-center mb-3">
            <div class="col-1 text-center">
                <button class="remove-button btn btn-danger">remover</button>
            </div>
            <div class="col-11">
                <span class="titulo-produto">Produto ${productCount}</span>                        
                <form class="form-row">
                    <div class="form-row">                                
                        <div class="mt-4">
                            <div class="round-div col-1">
                                <i class=""><img src="caixa.png" alt="" style="width: 50px; height: 50px; padding: 5px; margin-top: 2px;"></i>                               
                            </div>
                        </div>
                        <div class="form-group col-md-7">
                            <label for="dado1_${productCount}"><span class="text-danger">*</span></label>
                            <input type="text" class="form-control" id="dado1_1${productCount}">
                        </div>
                        <div class="form-group col-md-3">
                            <label for="dado2_${productCount}">UND. Medida<span class="text-danger">*</span></label>
                            <select class="form-control col-md-12" id="dado2_${productCount}">
                                        <option selected></option>
                                        <option value="1" for="un">UN</option>
                                        <option value="2" for="kg">KG</option>
                                        <option value="3" for="m">M</option>
                                    </select>
                        </div>
                        <div class="form-group col-md-3">
                            <label for="dado3_${productCount}">QDTDE. em Estoque<span class="text-danger">*</span></label>
                            <input type="number" class="form-control quantity-input" id="dado3_${productCount}">
                        </div>
                        <div class="form-group col-md-3">
                            <label for="dado4_${productCount}">Valor Unitário<span class="text-danger">*</span></label>
                            <input type="number" class="form-control unit-price-input" id="dado4_${productCount}">
                        </div>
                        <div class="form-group col-md-3">
                            <label for="dado5_${productCount}">Valor Total<span class="text-danger">*</span></label>
                            <input type="number" class="form-control total-price-input" id="dado5_${productCount}" disabled>
                        </div>
                    </div>
                </form>
            </div>
        </div>`;
        $('#products-container').append(newProductHtml);
    });

    // Remover produto
    $(document).on('click', '.remove-button', function () {
        $(this).closest('.product-row').remove();
    });

    // Adicionar novo arquivo
    $('#add-file-button').click(function (e) {
        e.preventDefault();
        fileCount++;
        let newFileHtml = `
        <div class="row file-row align-items-center mb-3" id="file-row-${fileCount}">
            <div class="col-1 text-center"> 
                <button class="remove-file-button btn btn-danger">remover</button>
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
    $(document).on('input', '.quantity-input, .unit-price-input', function () {
        let $row = $(this).closest('.product-row');
        let quantity = parseFloat($row.find('.quantity-input').val()) || 0;
        let unitPrice = parseFloat($row.find('.unit-price-input').val()) || 0;
        let totalPrice = quantity * unitPrice;
        $row.find('.total-price-input').val(totalPrice.toFixed(2));
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

    // Confirmar salvamento do formulário
    $('#confirm-save-button').click(function () {
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

        sessionStorage.setItem('formData', JSON.stringify(formData));
        $('#formModal').modal('hide');
        console.log('JSON salvo no session storage:', formData);
        alert('Formulário salvo com sucesso! O JSON está listado na console do navegador.');
    });

    function displayModalData(formData) {
        $('#modal-general').html(`Razão Social: ${formData.razaoSocial}<br>CNPJ: ${formData.cnpj}<br>Nome Fantasia: ${formData.nomeFantasia}<br>Inscrição Estadual: ${formData.inscricaoEstadual}<br>CEP: ${formData.cep}<br>Inscrição Municipal: ${formData.inscricaoMunicipal}<br>Endereço: ${formData.endereco}<br>Número: ${formData.numero}<br>Complemento: ${formData.complemento}<br>Bairro: ${formData.bairro}<br>Município: ${formData.municipio}<br>Estado: ${formData.estado}<br>Nome da Pessoa de Contato: ${formData.nomeContato}<br>Telefone: ${formData.telefone}<br>E-mail: ${formData.email}`);

        $('#modal-products').empty();
        formData.produtos.forEach((produto, index) => {
            $('#modal-products').append(`<li>Produto ${index + 1}: ${produto.dado1}, <li>UND. Medida do Produto ${index + 1}: ${produto.dado2}, <li>QDTDE. em Estoque do Produto ${index + 1}: ${produto.dado5}, <li>Valor Unitário do Produto ${index + 1}: ${produto.dado5}, <li>Valor Total do Produto ${index + 1}: ${produto.totalPrice}</li>`);
        });

        $('#modal-files').empty();
        formData.arquivos.forEach((arquivo, index) => {
            $('#modal-files').append(`<li>Anexo ${index + 1}: Nome - ${arquivo.nome}, Tamanho - ${arquivo.tamanho} bytes, Tipo - ${arquivo.tipo}</li>`);
        });
    }
});
