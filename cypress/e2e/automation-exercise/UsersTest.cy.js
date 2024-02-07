/// <reference types="Cypress" />
describe('Register and Login tests', () => { 

    beforeEach(()=>{
        cy.visit('/')
        cy.fixture('credentials').as('userdata');
        cy.title().should('eq', 'Automation Exercise');
    })  

    it('Register User', function(){

            cy.fixture('register-user').then((newUser)=>{
                cy.get(newUser.registerLink).click();
                cy.get(newUser.nameInput).type(this.userdata.name);
                cy.get(newUser.emailInput).type(this.userdata.email);
                cy.get(newUser.signUpBtn).click();
                cy.get(newUser.mrTitleRadioButton).click();
                cy.get(newUser.passwordInput).type(this.userdata.password);
                cy.get(newUser.dayOfBirthOption).select('10');
                cy.get(newUser.monthOfBirthOption).select('10');
                cy.get(newUser.yearOfBirthOption).select('1993');
                cy.get(newUser.recieveOffersCheckbox).click();
                cy.get(newUser.newsletterCheckbox).click();
                cy.get(newUser.firstNameInput).type('Santiago');
                cy.get(newUser.lastnameInput).type('Espindd');
                cy.get(newUser.companyInput).type('Automation Company');
                cy.get(newUser.addressInput).type('Adress 1000');
                cy.get(newUser.address2Input).type('Adress 2000');
                cy.get(newUser.countryOption).select('Canada');
                cy.get(newUser.stateInput).type('Testing town');
                cy.get(newUser.cityInput).type('Montreal');
                cy.get(newUser.zipcodeInput).type('3000');
                cy.get(newUser.mobileNumberInput).type('235878997');
                cy.get(newUser.createAccountBtn).click();
            })
            cy.fixture('home').then((home)=>{
                cy.get(home.alertText).should('have.text', 'Account Created!');
                cy.get(home.continueBtn).click();
                cy.get(home.loggedUser).should('include.text', 'Logged in as ' + this.userdata.name);
            })
        
    });
    it('Register User with existing email', function() {
        cy.fixture('register-user').then((newUser)=>{
            cy.get(newUser.registerLink).click();
            cy.get(newUser.nameInput).type(this.userdata.name);
            cy.get(newUser.emailInput).type(this.userdata.registered_email);
            cy.get(newUser.signUpBtn).click();
            cy.get(newUser.accountAlertText).should('contain.text','Email Address already exist!');
         });
    });


    it('Login User with correct email and password', function() {
        cy.login(this.userdata.registered_email,this.userdata.password);
        cy.fixture('home').then((home)=>{
            cy.get(home.loggedUser).should('include.text', 'Logged in as ' + this.userdata.name);;
        })
    });

    it('Login User with incorrect email and password', function() {

        cy.login(this.userdata.incorrect_mail,this.userdata.password);
        cy.fixture('login').then((login)=>{
            cy.get(login.accountAlertText).should('contain.text','Your email or password is incorrect!');
        })
        
    });

    it('Logout User', function(){
        cy.login(this.userdata.registered_email,this.userdata.password);
        cy.fixture('home').then((home)=>{
            cy.get(home.logOutBtn).click();
            cy.get(home.loggedUser).should('not.exist') //Si no tengo iniciada una sesion, este web element no estara.
        })
    });

    it('Delete Account', function(){
        cy.login(this.userdata.email,this.userdata.password);
        cy.fixture('home').then((home)=>{

            cy.get(home.deleteBtn).click();
            cy.get(home.alertText).should('have.text', 'Account Deleted!');
        })
        
    });




 });