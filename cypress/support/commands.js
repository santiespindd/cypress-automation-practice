Cypress.Commands.add('login', (email,password)=>{
      cy.fixture("login").then((login)=>{
        cy.get(login.loginLink).click();
        cy.get(login.emailInput).type(email);
        cy.get(login.passwordInput).type(password);
        cy.get(login.loginBtn).click();
    })
    })