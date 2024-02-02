class HomePage{
    elements = {
        toLoginSignUpPage : () => cy.get('.shop-menu > .nav > :nth-child(4) > a'),
        loggedUser: ()=> cy.get(':nth-child(10) > a'),
        logOutBtn: ()=> cy.get('.shop-menu > .nav > :nth-child(4) > a').click()
        
    }
}
export default HomePage;