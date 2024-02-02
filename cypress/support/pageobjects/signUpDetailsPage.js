class SignUpDetailsPage{
    elements= {
        detailsPageTitle: ()=>  cy.get(':nth-child(1) > b'),
        mrTittleRadioButton: () => cy.get('#id_gender1'),
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
        addressInput: ()=> cy.get('[data-qa="address2"]'), 
        countryInput: ()=>  cy.get('[data-qa="country"]'), 
        stateInput: ()=> cy.get('[data-qa="state"]'),
        cityInput: ()=> cy.get('[data-qa="city"]'), 
        zipcodeInput: ()=> cy.get('[data-qa="zipcode"]'),  
        mobileNumberInput: ()=> cy.get('[data-qa="mobile_number"]'),
        createAccountBtn: ()=>  cy.get('[data-qa="create-account"]'),
        acountCreatedText: ()=> cy.get('b'),
        continueBtn: ()=> cy.get('[data-qa="continue-button"]')
        
    }

}

export default  SignUpDetailsPage;