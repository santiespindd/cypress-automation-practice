class SignUpDetailsPage{
    elements= {
        detailsPageTitle: ()=>  cy.get(':nth-child(1) > b'),
        mrTitleRadioButton: () => cy.get('#id_gender1'),
        mrsTitleRadioButton: () => cy.get('#id_gender2'),
        passwordInput: ()=>  cy.get('[data-qa="password"]'),
        dayOfBirthOption: ()=> cy.get('[data-qa="days"]'),
        monthOfBirthOption: ()=> cy.get('[data-qa="months"]'),
        yearOfBirthOption: ()=> cy.get('[data-qa="years"]'),
        recieveOffersCheckbox: () =>  cy.get('#optin') ,
        newsletterCheckbox: ()=> cy.get('#newsletter'), 
        nameInput: ()=> cy.get('[data-qa="first_name"]'), 
        lastnameInput: ()=> cy.get('[data-qa="last_name"]'), 
        companyInput: ()=> cy.get('[data-qa="company"]'), 
        addressInput:()=>  cy.get('[data-qa="address"]'), 
        address2Input: ()=> cy.get('[data-qa="address2"]'), 
        countryOption: ()=>  cy.get('[data-qa="country"]'), 
        stateInput: ()=> cy.get('[data-qa="state"]'),
        cityInput: ()=> cy.get('[data-qa="city"]'), 
        zipcodeInput: ()=> cy.get('[data-qa="zipcode"]'),  
        mobileNumberInput: ()=> cy.get('[data-qa="mobile_number"]'),
        createAccountBtn: ()=>  cy.get('[data-qa="create-account"]'),
    
    }

    selectMrTitle(){
        
        this.elements.mrTitleRadioButton().click();
    }
    selectMrsTitle(){
        
        this.elements.mrsTitleRadioButton().click();
    }
    enterPassword(password){
        this.elements.passwordInput().clear();
        this.elements.passwordInput().type(password);
    }
    enterDayOfBirth(day){
       
        this.elements.dayOfBirthOption().select(day);
    }
    enterMonthOfBirth(month){
       
        this.elements.monthOfBirthOption().select(month);
    }
    enterYearOfBirth(year){
       
        this.elements.yearOfBirthOption().select(year);
    }
    recieveOffersCheckboxClick(){
      
        this.elements.recieveOffersCheckbox().click();
    }
    newsletterCheckboxClick(){
        this.elements.newsletterCheckbox().click();
    }

    enterName(name){
        this.elements.nameInput().clear();
        this.elements.nameInput().type(name);
    }
    enterLastName(lastname){
        this.elements.lastnameInput().clear();
        this.elements.lastnameInput().type(lastname);
    }
    enterCompany(company){
        this.elements.companyInput().clear();
        this.elements.companyInput().type(company);
    }
    enterAdress(adress){
        this.elements.addressInput().clear();
        this.elements.addressInput().type(adress);
    }
    enterAdress2(adress2){
        this.elements.address2Input().clear();
        this.elements.address2Input().type(adress2);
    }
    enterCountry(country){
       
        this.elements.countryOption().select(country);
    }
    enterState(state){
        this.elements.stateInput().clear();
        this.elements.stateInput().type(state);
    }
    enterCity(city){
        this.elements.cityInput().clear();
        this.elements.cityInput().type(city);
    }
    enterZipCode(zipCode){
        this.elements.zipcodeInput().clear();
        this.elements.zipcodeInput().type(zipCode);
    }

    enterMobileNumber(number){
        this.elements.mobileNumberInput().clear();
        this.elements.mobileNumberInput().type(number);
    }

    clickSubmit(){
        this.elements.createAccountBtn().click();
    }
    
}

export default  SignUpDetailsPage;