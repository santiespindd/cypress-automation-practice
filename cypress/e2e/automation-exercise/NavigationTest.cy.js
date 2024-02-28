/// <reference types="Cypress" />
describe('Navigation tests ', () => { 

    beforeEach(()=>{
        cy.visit('/')
        cy.fixture('credentials').as('userdata');
        cy.title().should('eq', 'Automation Exercise');
    })  

    it('Contact Us Form', function(){
        cy.fixture('contact').then((contact)=>{

            cy.get(contact.toContactUs).click();
            cy.url().should('include', '/contact_us');
            cy.get(contact.pageTitle).should('include.text','Get In Touch');
            cy.get(contact.name).type(this.userdata.name);
            cy.get(contact.email).type(this.userdata.email);
            cy.get(contact.subject).type('Acerca de la página');
            cy.get(contact.message).type('Hola muy linda página, saludos');
            cy.get(contact.file).selectFile('cypress/support/text/contact-us-test.txt');
            cy.get(contact.submitBtn).click();
            cy.get(contact.successMessage).should('include.text','Success! Your details have been submitted successfully.');
            cy.get(contact.toHomeBtn).click()

        })
        cy.title().should('eq', 'Automation Exercise');
     });
     
     it('Verify Test Cases Page', function(){

        cy.fixture('test-cases').then((testPage)=>{
            cy.get(testPage.toTestCasePage).click();
            cy.url().should('include', '/test_cases');
            cy.get(testPage.pageTitle).should('have.text','Test Cases');


        })
      
     });

 })