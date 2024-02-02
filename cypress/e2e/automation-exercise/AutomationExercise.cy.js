/// <reference types="Cypress" />
import HomePage from "../../support/pageobjects/homePage";
import LoginPage from "../../support/pageobjects/loginPage";
import SignUpDetailsPage from "../../support/pageobjects/signUpDetailsPage";
import SignUpPage from "../../support/pageobjects/signUpPage";


describe('Automation Exercise' , ()=>{

    beforeEach(() => {

      cy.visit('https://automationexercise.com/');

      cy.fixture('credentials').then( function (testdata){
            this.testdata = testdata;
        })

      cy.log('Should have a title')

            cy.title().should('eq', 'Automation Exercise');
      
            

    });
    
    

    it.only('Test Case 1: Register User', function() {

      
        const signUpObj = new SignUpPage();
        const homeObj = new HomePage();
        const detailsPageObj = new SignUpDetailsPage();

        homeObj.toLoginSignUpPage();
        
        cy.log('Verify New User Signup! is visible');
              
              signUpObj.elements.signUpTitle().should('have.text' , 'New User Signup!');
        
        cy.log('Enter Name and Email and Submit')

              signUpObj.enterName(this.testdata.name);
              signUpObj.enterEmail(this.testdata.email);
              signUpObj.clickSubmit();
        
            
         cy.log('Fill details: Title, Name, Email, Password, Date of birth');

              detailsPageObj.elements.detailsPageTitle().should('have.text', 'Enter Account Information')
              detailsPageObj.selectMrTitle()
              detailsPageObj.enterPassword(this.testdata.password);
              detailsPageObj.enterDayOfBirth(20);
              detailsPageObj.enterMonthOfBirth(11);
              detailsPageObj.enterYearOfBirth('1993');
              
              detailsPageObj.recieveOffersCheckboxClick();
              detailsPageObj.newsletterCheckboxClick();
             

        cy.log('Fill details: First name, Last name, Company, Address, Address2, Country, State, City, Zipcode, Mobile Number')

                  detailsPageObj.enterName('Santiago')
                  
                  detailsPageObj.enterLastName('Tester')

                  detailsPageObj.enterCompany('Automation Company')

                  detailsPageObj.enterAdress('Pje Tester 1234')

                  detailsPageObj.enterAdress2('Pje Automation 1234')
                  
                  detailsPageObj.enterCountry('Canada');

                  detailsPageObj.enterState('TestingTown')

                  detailsPageObj.enterCity('Automation City')

                  detailsPageObj.enterZipCode('3000')

                  detailsPageObj.enterMobileNumber('123456789')

                  detailsPageObj.clickSubmit();

       cy.log('Verify that ACCOUNT CREATED! is visible')
                  homeObj.elements.alertText().should('have.text', 'Account Created!')
                  homeObj.clickOnContinue();

               
                  homeObj.elements.loggedUser().should('include.text', 'Logged in as ' + this.testdata.name)
       
      



              

    });
    
   it.only('Test Case 2: Login User with correct email and password', function() {

      const loginObj = new LoginPage();
      const homeObj = new HomePage();

      homeObj.toLoginSignUpPage()
      loginObj.elements.loginTitle().should('contain','Login to your account');
      loginObj.enterUserEmail(this.testdata.email);
      loginObj.enterPassword(this.testdata.password);
      loginObj.clickSubmit();

      homeObj.elements.loggedUser().should('include.text', 'Logged in as ' + this.testdata.name);

   });
   
   it('Test Case 3: Login User with incorrect email and password', function() {
      cy.get('.login-form > h2').should('contain.text','Login to your account');

      cy.get('[data-qa="login-email"]').type(this.testdata.incorrect_mail);
      cy.get('[data-qa="login-password"]').type(this.testdata.password);
      
      cy.get('[data-qa="login-button"]').click();

      cy.get('.login-form').should('contain.text','Your email or password is incorrect!');
   });

   it('Test Case 4: Logout User', function() {

      cy.get('.login-form > h2').should('contain','Login to your account');
      cy.get('[data-qa="login-email"]').type(this.testdata.email);
      cy.get('[data-qa="login-password"]').type(this.testdata.password);
      
      cy.get('[data-qa="login-button"]').click();
      cy.get(':nth-child(10) > a').should('include.text', 'Logged in as ' + this.testdata.name);

      cy.get('.shop-menu > .nav > :nth-child(4) > a').click();

      /*I verify button name and url*/
      cy.get('.shop-menu > .nav > :nth-child(4) > a').should('contain.text','Signup / Login')
      cy.url().should('include', '/login');
      
   });

   it('Test Case 5: Register User with existing email', function() {
      cy.log('Verify New User Signup! is visible')
              
      cy.get('.signup-form > h2').should('have.text' , 'New User Signup!')

      cy.log('Enter Name and Email and Submit')

      cy.get('[data-qa="signup-name"]').type(this.testdata.name)
      cy.get('[data-qa="signup-email"]').type(this.testdata.email)
      cy.get('[data-qa="signup-button"]').click()

      cy.get('.signup-form').should('contain.text','Email Address already exist!');

   });

   it('Test Case 0: Delete Account', function() {

      cy.get('.login-form > h2').should('contain','Login to your account');
      cy.get('[data-qa="login-email"]').type(this.testdata.email);
      cy.get('[data-qa="login-password"]').type(this.testdata.password);
      
      cy.get('[data-qa="login-button"]').click();
      cy.get(':nth-child(10) > a').should('include.text', 'Logged in as ' + this.testdata.name);


      cy.log('Deleted account')
                  cy.get('.shop-menu > .nav > :nth-child(5) > a').click();
                  cy.get('b').should('have.text', 'Account Deleted!');
                  cy.get('[data-qa="continue-button"]').click();
      
   });

   it('Test Case 6: Contact Us Form', () => {
      cy.get('.shop-menu > .nav > :nth-child(8) > a').click();
      cy.get('div.contact-form > .title').should('include.text','Get In Touch');
      cy.get('[data-qa="name"]').type('Carlos');
      cy.get('[data-qa="email"]').type('carlitos_tevez@gmail.com');
      cy.get('[data-qa="subject"]').type('Acerca de la página');
      cy.get('[data-qa="message"]').type('Hola muy linda página, saludos');
      cy.get(':nth-child(6) > .form-control').selectFile('cypress/fixtures/contact-us-test.txt');
      cy.get('[data-qa="submit-button"]').click();
      cy.get('.status').should('include.text','Success! Your details have been submitted successfully.');
      cy.get('span').click()
      cy.title().should('eq', 'Automation Exercise');


   });

   it('Test Case 7: Verify Test Cases Page', () => {

      cy.get('.shop-menu > .nav > :nth-child(5)').click();
       cy.url().should('include', '/test_cases');
      cy.get('b').should('have.text','Test Cases');

      for(let i=1 ; i<27 ; i++){
         cy.get('#form > .container > .panel-group').should('include.text','Test Case '+i);
      }
      

   });

   it('Test Case 8: Verify All Products and product detail page', () => {

       
      let price1;
      cy.get('.shop-menu > .nav > :nth-child(2) > a').click();
      cy.url().should('include', '/products');
      cy.title().should('eq', 'Automation Exercise - All Products');
      cy.get('.title').should('include.text','All Products');
      cy.get('.features_items').should('be.not.empty');
      cy.get('.features_items').should('be.visible');
      cy.get(':nth-child(3) > .product-image-wrapper > .single-products > .productinfo > h2').invoke('text').then((valor) =>{
         price1 = valor;
      }
      )
      cy.get(':nth-child(3) > .product-image-wrapper > .choose > .nav > li > a').click();
      cy.url().should('include', '/product_details/');
      cy.get('.product-information > h2').should('be.visible'); //titulo
      cy.get('.product-information > :nth-child(3)').should('be.visible') //categoria
      cy.get('.product-information > :nth-child(3)').should('be.visible') //precio
      cy.get('.product-information > :nth-child(6)').should('be.visible') //availability
      cy.get('.product-information > :nth-child(7)').should('be.visible') //condition
      cy.get('.product-information > :nth-child(8)').should('be.visible') //brand


   });

   it('Test Case 9: Search Product', () => {
      const searchProducts = ['Winter Top', 'Men Tshirt', 'Blue Cotton Indie Mickey Dress', 'Sleeves Printed Top - White', 'Grunt Blue Slim Fit Jeans', 'Rust Red Linen Saree']
      
      cy.get('.shop-menu > .nav > :nth-child(2) > a').click();
      cy.url().should('include', '/products');
      cy.title().should('eq', 'Automation Exercise - All Products');
      cy.get('.title').should('include.text','All Products');

      searchProducts.forEach(  (searchProduct) => {
         {
            cy.log(searchProduct)
            cy.get('#search_product').type(searchProduct);
            cy.get('#submit_search').click();
      
            cy.get('.features_items').should('be.not.empty');
            cy.get('.features_items').should('be.visible');
      
            cy.get('.features_items').should('be.not.empty');
            cy.get('.title').should('include.text','Searched Products');
            cy.get('.productinfo p')
            .each(($elemento) => {
                  cy.wrap($elemento).invoke('text').should('match', new RegExp(searchProduct, 'i'));
            });
            cy.get('#search_product').clear();
         }
      } )
     
    
   });

   it('Test Case 10: Verify Subscription in home page', () => {
      cy.get('#footer').scrollIntoView();
      cy.get('#susbscribe_email').type('santiago@test.com')
      cy.get('#subscribe').click();
      cy.get('#footer').should('contain.text','You have been successfully subscribed!');

   });
   
   it('Test Case 11: Verify Subscription in Cart page', () => {
      cy.get('.shop-menu > .nav > :nth-child(3) > a').click();
      cy.get('#susbscribe_email').type('santiago@test.com')
      cy.get('#subscribe').click();
      cy.get('#footer').should('contain.text','You have been successfully subscribed!');
   });
   
   it('Test Case 12: Add Products in Cart', () => {

      let precioProducto1;
      let precioProducto2;

      cy.get('.shop-menu > .nav > :nth-child(2) > a').click();
      cy.url().should('include', '/products');
      cy.title().should('eq', 'Automation Exercise - All Products');

      cy.get(':nth-child(3) > .product-image-wrapper > .single-products > .productinfo > .btn').click();
      cy.get(':nth-child(3) > .product-image-wrapper > .single-products > .productinfo > h2').invoke('text').then((valor) =>{
         precioProducto1= valor.replace(/[^0-9]+/g, "");
      });
      cy.get('.modal-footer > .btn').click();
      
      cy.get(':nth-child(4) > .product-image-wrapper > .single-products > .productinfo > .btn').click();
      cy.get(':nth-child(4) > .product-image-wrapper > .single-products > .productinfo > h2').invoke('text').then((valor) =>{
         precioProducto2= valor.replace(/[^0-9]+/g, "");
      });

      cy.get('.modal-footer > .btn').click();

      cy.get('.shop-menu > .nav > :nth-child(3) > a').click();


      cy.get('#product-1 > .cart_price > p').invoke('text').then((valor)=>{
         expect(valor.replace(/[^0-9]+/g, "")).to.be.equal(precioProducto1);
      });

      cy.get('#product-2 > .cart_price > p').invoke('text').then((valor)=>{
         expect(valor.replace(/[^0-9]+/g, "")).to.be.equal(precioProducto2);
      });

      cy.get('#product-1 > .cart_quantity > .disabled').invoke('text').should('eq','1');
      cy.get('#product-2 > .cart_quantity > .disabled').invoke('text').should('eq','1');

      cy.get('#product-1 > .cart_total > .cart_total_price').invoke('text').then((valor)=>{
         expect(valor.replace(/[^0-9]+/g, "")).to.be.equal(precioProducto1);
      });
      cy.get('#product-2 > .cart_total > .cart_total_price').invoke('text').then((valor)=>{
         expect(valor.replace(/[^0-9]+/g, "")).to.be.equal(precioProducto2);
      });

   });
   
   it('Test Case 13: Verify Product quantity in Cart', () => {
      const cantidad='4';
      cy.get('.shop-menu > .nav > :nth-child(2) > a').click();
      cy.url().should('include', '/products');
      cy.title().should('eq', 'Automation Exercise - All Products');
      cy.get('.title').should('include.text','All Products');

      cy.get(':nth-child(3) > .product-image-wrapper > .choose > .nav > li > a').click()
      cy.get('#quantity').clear();
      cy.get('#quantity').type(cantidad);
      cy.get(':nth-child(5) > .btn').click();
      cy.get('.modal-footer > .btn').click();
      cy.get('.shop-menu > .nav > :nth-child(3) > a').click();
      cy.get('.disabled').invoke('text').then((value)=>{
            expect(value).to.be.equal(cantidad);
      })
      
   });

})