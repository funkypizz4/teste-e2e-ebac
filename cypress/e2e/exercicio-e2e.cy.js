/// <reference types="cypress" />
import produtosPage from "../support/page_objects/produtos.page";
import carrinhoPage from "../support/page_objects/carrinho.page";
import checkoutPage from "../support/page_objects/checkout.page";

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
  /*  Como cliente 
      Quero acessar a Loja EBAC 
      Para fazer um pedido de 4 produtos 
      Fazendo a escolha dos produtos
      Adicionando ao carrinho
      Preenchendo todas opções no checkout
      E validando minha compra ao final */

      it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {
        /*
            Usando fixture que contém os dados dos 4 produtos que serão adicionados no carrinho.
            Os dados da fixture são atribuídos na variável dadosProdutos.
            O laço percorre cada elemento de dadosProdutos e executa as verificações
            A espera de 1 segundo foi adicionada pois estava havendo um carregamento que estava atrapalhando a seleção de opções
        */
        cy.fixture('produtos').then((dadosProdutos) => {
            dadosProdutos.forEach((produto) => {
                produtosPage.visitarUrl();
                produtosPage.buscarProduto(produto.nomeProduto);
                cy.get('.product_title').should('contain',produto.nomeProduto);
                cy.wait(1000);
                produtosPage.addProdutoCarrinho(produto.tamanho, produto.cor, produto.quantidade);
                cy.get('.woocommerce-message').should('contain', produto.nomeProduto);
            });
          });
        /*
            Acessando e validando o carrinho.
            Usando novamente a fixture de produtos para validar que as características e quantidade foram inseridas corretamente no carrinho.
            A variável item foi criada para ajudar a percorrer cada linha do carrinho com um produto único
            Se todas as verificações passarem, avança para o checkout clicando num botão
        */
        carrinhoPage.visitarUrl();
        let item = 1;
        cy.fixture('produtos').then((dadosProdutos) => {
            dadosProdutos.forEach((produto) => {
                cy.get(`:nth-child(${item}) > .product-name > a`).should('contain', produto.nomeProduto);
                cy.get(`:nth-child(${item}) > .product-name > a`).should('contain', produto.tamanho);
                cy.get(`:nth-child(${item}) > .product-name > a`).should('contain', produto.cor);
                cy.get(`:nth-child(${item}) > .product-quantity > .quantity > .input-text`).invoke('val').then((quantidade) => {
                    expect(quantidade).to.equal(produto.quantidade.toString());
                });
                item++;
            });
        carrinhoPage.irParaCheckout();
        });
        /*
            Acessando a página de checkout e usando fixture de produtos novamente para verificar os dados do pedido.
            
            Uma nova varíavel, itemCheckout, foi criada para percorrer a lista de itens no checkout,
            pois utilizar a mesma variável estava causando problemas. Mesmo quando eu tentava resetar para 1
            
            Se tudo correto, prossegue com o preenchimento dos dados de entrega e finalização do pedido.
        */
        let itemCheckout = 1;
        cy.fixture('produtos').then((dadosProdutos) => {
            dadosProdutos.forEach((produto) => {
                cy.get(`tbody > :nth-child(${itemCheckout}) > .product-name`).should('contain', produto.nomeProduto);
                cy.get(`tbody > :nth-child(${itemCheckout}) > .product-name`).should('contain', produto.tamanho);
                cy.get(`tbody > :nth-child(${itemCheckout}) > .product-name`).should('contain', produto.cor);
                cy.get(`tbody > :nth-child(${itemCheckout}) > .product-name`).should('contain', produto.quantidade);
                itemCheckout++;
            });
        });
        checkoutPage.preencherCheckout();
        cy.wait(5000); // Esperando o checkout demorado
        cy.get('.page-title').should('contain', 'Pedido recebido');
        cy.get('.woocommerce-notice').should('contain', 'Obrigado. Seu pedido foi recebido.');
      });
    });