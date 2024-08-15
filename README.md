# Desenvolvimento de um formulário para cadastro de fornecedores e produtos.

## Funcionalidades

- Cadastro de Fornecedores
  
    **Objetivo:** Permitir que os usuários registrem informações detalhadas sobre os fornecedores.

    **Detalhes Capturados:** Razão Social e Nome Fantasia: Identificação formal e comercial do fornecedor.CNPJ e Inscrições (Estadual e Municipal): Dados fiscais necessários para a operação legal.Endereço (CEP, Logradouro, Número, Complemento, Bairro, Município, Estado): Dados de localização do fornecedor. O CEP é utilizado para buscar o endereço completo automaticamente, os campos de endereço estão desativados para edição manual, sugerindo que serão preenchidos automaticamente.
    Contato: Informações de contato da pessoa responsável pelo relacionamento, como nome, telefone e e-mail.
- Cadastro de Produtos

    **Objetivo:** Associar produtos ao fornecedor registrado.

    **Detalhes Capturados:** Nome do Produto: Identificação do produto.Unidade de Medida: Define como o produto é medido (e.g., unidade, quilograma, metro).Quantidade em Estoque: A quantidade disponível desse produto.Valor Unitário: O preço de uma única unidade do produto.Valor Total: O valor total calculado automaticamente com base na quantidade e no valor unitário.

    **Funcionalidades:** Adicionar Produtos: Os usuários podem adicionar vários produtos para um mesmo fornecedor.Remover Produtos: Produtos podem ser removidos do cadastro antes do envio.Interatividade: O botão de adicionar produto permite a inclusão dinâmica de novos produtos no formulário.
- Anexar Documentos

    **Objetivo:** Permitir que documentos ou arquivos relacionados ao fornecedor ou aos produtos sejam anexados ao cadastro.
    
    **Funcionalidade:** A seção "Anexos" permite ao usuário incluir arquivos que podem ser necessários para completar o cadastro, como contratos, catálogos de produtos, certificados, etc.
- Validação e Submissão

    **Objetivo:** Garantir que todos os campos obrigatórios estão preenchidos corretamente antes de enviar os dados.

    **Validação:** O uso de asteriscos (*) e labels acessíveis indica que há validação no front-end para garantir que campos críticos sejam preenchidos.

    **Modal de Confirmação:** Antes de salvar os dados, um modal é exibido para o usuário revisar todas as informações inseridas. Isso permite confirmar os dados antes de finalizar o processo.
- Integração com o Fluig

    **Objetivo:** Integrar este formulário dentro de um ambiente Fluig, aproveitando as bibliotecas de estilo e scripts do Fluig para garantir que a interface e a funcionalidade estejam em conformidade com o padrão da plataforma.
    
    **Considerações Técnicas:** O formulário é construído para ser compatível com o Fluig, utilizando bibliotecas de estilo e scripts que são nativamente suportados pela plataforma.


## Stack utilizada

**Tecnologias:** Java Script, HTML, Bootstrap, CSS, Fluig
## Feedback

Se você tiver algum feedback, por favor nos deixe saber por meio de nando32117@gmail.com

