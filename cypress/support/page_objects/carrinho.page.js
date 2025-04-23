class CarrinhoPage {
    visitarUrl() {
        cy.visit('/carrinho');
    };

    irParaCheckout() {
        cy.get('.checkout-button').click();
    }
}

export default new CarrinhoPage()