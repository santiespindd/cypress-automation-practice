/// <reference types="Cypress" />

describe('Automation Exercise' , ()=>{

    before(()=>{

        cy.visit('https://automationexercise.com/');

        cy.fixture('credentials').then( function (testdata){
            this.testdata = testdata;
        })

    })


    it('Test Case 1: Register User', function() {
        

        cy.log('Should have a title')

              cy.title().should('eq', 'Automation Exercise');

        cy.log('Navigate to sign up page');

              cy.get('.shop-menu > .nav > :nth-child(4) > a').click()

        cy.log('Verify New User Signup! is visible')
              
              cy.get('.signup-form > h2').should('have.text' , 'New User Signup!')
        
        cy.log('Enter Name and Email and Submit')

              cy.get('[data-qa="signup-name"]').type(this.testdata.name)
              cy.get('[data-qa="signup-email"]').type(this.testdata.email)
              cy.get('[data-qa="signup-button"]').click()
        
            
         cy.log('Fill details: Title, Name, Email, Password, Date of birth');

              cy.get(':nth-child(1) > b').should('have.text', 'Enter Account Information')
              cy.get('#id_gender1').click()
              cy.get('[data-qa="password"]').type(this.testdata.password)
              cy.get('[data-qa="days"]').select(20)
              cy.get('[data-qa="months"]').select(11)
              cy.get('[data-qa="years"]').select('1993')

              cy.get('#optin').click()
              cy.get('#newsletter').click()

        cy.log('Fill details: First name, Last name, Company, Address, Address2, Country, State, City, Zipcode, Mobile Number')

                  cy.get('[data-qa="first_name"]').type('Santiago')
                  
                  cy.get('[data-qa="last_name"]').type('Tester')

                  cy.get('[data-qa="company"]').type('Automation Company')

                  cy.get('[data-qa="address"]').type('Pje Tester 1234')

                  cy.get('[data-qa="address2"]').type('Pje Automation 1234')
                  
                  cy.get('[data-qa="country"]').select('Canada')

                  cy.get('[data-qa="state"]').type('TestingTown')

                  cy.get('[data-qa="city"]').type('Automation City')

                  cy.get('[data-qa="zipcode"]').type('3000')

                  cy.get('[data-qa="mobile_number"]').type('123456789')

                  cy.get('[data-qa="create-account"]').click()

       cy.log('Verify that ACCOUNT CREATED! is visible')
                  cy.get('b').should('have.text', 'Account Created!')
                  cy.get('[data-qa="continue-button"]').click()

               
                  cy.get(':nth-child(10) > a').should('include.text', 'Logged in as ' + this.testdata.name)
       
      cy.log('Deleted account')
                  cy.get('.shop-menu > .nav > :nth-child(5) > a').click()
                  cy.get('b').should('have.text', 'Account Deleted!')
                  cy.get('[data-qa="continue-button"]').click()



              

    });
    
   
 

})