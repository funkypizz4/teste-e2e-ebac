// documentação demonstrou que o faker suporta localização em PT_BR, ajudando a ter mais previsibilidade na questão de endereços
import { fakerPT_BR as faker } from '@faker-js/faker';

class checkoutPage {
    preencherCheckout() {
        const nome = faker.person.firstName();
        const sobrenome = faker.person.lastName();
        const empresa = faker.company.name();
        const pais = 'Brasil'; // Forçando o país sempre para Brasil para combinar com a localização do Faker em PT_BR
        const endereco1 = faker.location.streetAddress();
        const endereco2 = faker.location.secondaryAddress();
        const cidade = faker.location.city();
        const estado = faker.location.state();
        const cep = faker.location.zipCode();
        const telefone = faker.phone.number('(##) #####-####');
        const email = faker.internet.email(nome, sobrenome);
        const senha = faker.internet.password(10, false);    
        
        cy.get('#billing_first_name').type(nome);
        cy.get('#billing_last_name').type(sobrenome); 
        cy.get('#billing_company').type(empresa);
        cy.get('#select2-billing_country-container').type(`${pais}{enter}`);
        cy.get('#billing_address_1').type(endereco1);
        cy.get('#billing_address_2').type(endereco2);
        cy.get('#billing_city').type(cidade);
        cy.get('#select2-billing_state-container').type(`${estado}{enter}`);
        cy.get('#billing_postcode').type(cep);
        cy.get('#billing_phone').type(telefone);
        cy.get('#billing_email').type(email);
        cy.get('#createaccount').click();
        cy.get('#account_password').type(senha);
        cy.get('#order_comments').type("Teste de compra automatizada com Cypress. Aluno: João Paulo de Morais Padovan");
        cy.get('#payment_method_cod').click();
        cy.get('#terms').click();
        cy.get('#place_order').click();
    }
}

export default new checkoutPage();