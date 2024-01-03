describe('Test Case 1: Register User' , ()=>{

    it('Navigate to Home Page',() => {
        cy.visit('https://automationexercise.com/');
    });
    
    it('Should have a title' , ()=>{
        cy.title().should('eq', 'Automation Exercise');
    })
    it('Navigate to sign up page', ()=>{
        cy.get('.shop-menu > .nav > :nth-child(4) > a').click()
    })

})