class SignUpPage{

    elements={
        signUpTitle: () => cy.get('.signup-form > h2'),
        nameInput: ()=>cy.get('[data-qa="signup-name"]'),
        emailInput: ()=> cy.get('[data-qa="signup-email"]'),
        signUpBtn: ()=> cy.get('[data-qa="signup-button"]')
    }

    enterName(name){
        this.nameInput().type(name);
    }
    enterEmail(email){
        this.emailInput().type(email);
    }

    clickSubmit(){
        this.signUpBtn().click();
    }


}
export default SignUpPage;