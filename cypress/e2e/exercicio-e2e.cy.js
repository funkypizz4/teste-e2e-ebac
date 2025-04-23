/// <reference types="cypress" />
import produtosPage from "../support/page_objects/produtos.page";

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
  /*  Como cliente 
      Quero acessar a Loja EBAC 
      Para fazer um pedido de 4 produtos 
      Fazendo a escolha dos produtos
      Adicionando ao carrinho
      Preenchendo todas opções no checkout
      E validando minha compra ao final */

  it.skip('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {
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
  });
});