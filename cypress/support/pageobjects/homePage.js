class HomePage{
    elements = {
        toLoginSignUpPage : () => cy.get('.shop-menu > .nav > :nth-child(4) > a'),
        loggedUser: ()=> cy.get(':nth-child(10) > a'),
        logOutBtn: ()=> cy.get('.shop-menu > .nav > :nth-child(4) > a'),
        continueBtn: ()=> cy.get('[data-qa="continue-button"]'),
        alertText: ()=> cy.get('b'),
        deleteBtn: ()=> cy.get('.shop-menu > .nav > :nth-child(5) > a')
        
    }

    toLoginSignUpPage(){
        this.elements.toLoginSignUpPage().click();
    }
    clickOnContinue(){
        this.elements.continueBtn().click();
    }
    logOut(){
        this.elements.toLoginSignUpPage().click();
    }
    deleteAccount(){
        this.elements.deleteBtn().click();
    }

}
export default HomePage;