class LoginPage {

    elements = {
        loginTitle: ()=> cy.get('.login-form > h2'),
        emailInput: ()=> cy.get('[data-qa="login-email"]'),
        passwordInput: () => cy.get('[data-qa="login-password"]'),
        loginBtn: ()=> cy.get('[data-qa="login-button"]'),
        loggedUser: ()=> cy.get(':nth-child(10) > a')
    }

    enterUserEmail(email){
        this.elements.emailInput().clear();
        this.elements.emailInput().type(email);
    }
    enterPassword(password){
        this.elements.passwordInput().clear();
        this.elements.passwordInput().type(password);
    }
    clickSubmit(){
        this.elements.loginBtn().click();
    }
    
    

}
export default LoginPage;