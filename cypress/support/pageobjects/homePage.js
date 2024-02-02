class HomePage{
    elements = {
        toLoginSignUpPage : () => cy.get('.shop-menu > .nav > :nth-child(4) > a'),
        loggedUser: ()=> cy.get(':nth-child(10) > a'),
        logOutBtn: ()=> cy.get('.shop-menu > .nav > :nth-child(4) > a'),
        deleteAccountBtn: ()=> cy.get('.shop-menu > .nav > :nth-child(5) > a'),
        continueBtn: ()=> cy.get('[data-qa="continue-button"]'),
        alertText: ()=> cy.get('b'),
        
    }

    toLoginSignUpPage(){
        this.elements.toLoginSignUpPage().click();
    }
    clickOnContinue(){
        this.elements.continueBtn().click();
    }

}
export default HomePage;