class SignUpPage{

    elements={
        signUpTitle: () => cy.get('.signup-form > h2'),
        nameInput: ()=>cy.get('[data-qa="signup-name"]'),
        emailInput: ()=> cy.get('[data-qa="signup-email"]'),
        signUpBtn: ()=> cy.get('[data-qa="signup-button"]'),
        accountAlertText: ()=> cy.get('.signup-form')
    }

    enterName(name){
        this.elements.nameInput().clear()
        this.elements.nameInput().type(name);
    }
    enterEmail(email){
        this.elements.emailInput().clear()
        this.elements.emailInput().type(email);
    }

    clickSubmit(){
        this.elements.signUpBtn().click();
    }


}
export default SignUpPage;