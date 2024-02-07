/// <reference types="Cypress" />

describe('Api Testing practice', () => {

  beforeEach(()=>{
    cy.fixture('credentials').as('user');
    cy.fixture('routes').as('route');

  })
  it('Get All Products List', function(){
    cy.request(this.route.productsList).then(
      (response) => {
        console.log(typeof response.body);

        expect(response.status).to.eq(200);
        
        const responseBody = JSON.parse(response.body); 
        expect(responseBody.responseCode).to.eq(200); 
        expect(responseBody.products).to.have.length.greaterThan(0); 
        expect(Array.isArray(responseBody.products)).to.be.true; 
        responseBody.products.forEach((product) => {
          //Valido que esten definidas todas las propiedades de los productos
          expect(product.brand).to.not.be.undefined;
          expect(product.category).to.not.be.undefined;
          expect(product.id).to.not.be.undefined;
          expect(product.name).to.not.be.undefined;
          expect(product.price).to.not.be.undefined;
        });
      }
    );
  });

  it('POST To All Products List', function(){
    cy.request('POST', this.route.productsList, {
      id: 99,
      name: 'Red Top',
      price: 'Rs. 1000',
      brand: 'Polo',
      category: {
        usertype: {
          usertype: 'Women',
        },
        category: 'Tops',
      },
    }).then((response) => {
      console.log(typeof response.body);
      expect(response.status).to.eq(200);
      expect(response.body.responseCode).to.eq(405);
      expect(response.body.message).to.include(
        'This request method is not supported'
      );
    });
  });

  it('Get All Brands List',function(){
    cy.request(this.route.brandsList).then(
      (response) => {
        expect(response.status).to.eq(200);
       
        const responseBody = JSON.parse(response.body); 
        expect(responseBody.responseCode).to.eq(200); 
        expect(responseBody.brands).to.have.length.greaterThan(0); 
        expect(Array.isArray(responseBody.brands)).to.be.true; 
        responseBody.brands.forEach((brand) => {
          //Valido que esten definidas todas las propiedades de las marcas
          expect(brand.id).to.not.be.undefined;
          expect(brand.brand).to.not.be.undefined;
        });
      }
    );
  });

  it('PUT To All Brands List', function() {
    cy.request('POST', this.route.brandsList, {
      id: 99,
      brand: 'Topper',
    }).then((response) => {
      console.log(response.body);
      expect(response.status).to.eq(200);
      expect(response.body.responseCode).to.eq(405);
      expect(response.body.message).to.include(
        'This request method is not supported'
      );
    });
  });

  it('POST To Search Product', function() {
    const productsToSearch = ['top', 'tshirt', 'jean', 'shoes'];

    productsToSearch.forEach((product) => {
      cy.log(product);
      cy.request({
        method: 'POST',
        url: this.route.searchProduct,
        form: true, // Indica que mando un formulario HTML
        body: {
          search_product: product,
        },
      }).then((response) => {
        const responseBody = JSON.parse(response.body);
        expect(responseBody.responseCode).to.eq(200);
        expect(responseBody).to.have.property('products');

        if (responseBody.products.length > 0) {
          responseBody.products.forEach((product) => {
            //Valido que esten definidas todas las propiedades de los productos
            expect(product.brand).to.not.be.undefined;
            expect(product.category).to.not.be.undefined;
            expect(product.id).to.not.be.undefined;
            expect(product.name).to.not.be.undefined;
            expect(product.price).to.not.be.undefined;
          });
        }
      });
    });
  });

  it('POST To Search Product without search_product parameter', function() {
    cy.request({
      method: 'POST',
      url: this.route.searchProduct,
      form: true, // Indica que mando un formulario HTML
    }).then((response) => {
      cy.log(response.body);
      const responseBody = JSON.parse(response.body);
      expect(responseBody.responseCode).to.eq(400);
      expect(responseBody.message).to.eq(
        'Bad request, search_product parameter is missing in POST request.'
      );
    });
  });

  it('POST To Verify Login with valid details', function(){
   cy.request({
      method: 'POST',
      url: this.route.verifyLogin,
      form: true,
      body: {
        email: this.user.registered_email,
        password: this.user.password
      },
    }).then((response) => {
      const responseBody = JSON.parse(response.body);
      expect(responseBody.responseCode).to.eq(200);
      expect(responseBody.message).to.eq('User exists!');
    });
    
  });

  it('POST To Verify Login without email parameter', function() {
    cy.request({
      method: 'POST',
      url: this.route.verifyLogin,
      form: true,
      body: {
       
        password: this.user.password
      },
    }).then((response) => {
      const responseBody = JSON.parse(response.body);
      expect(responseBody.responseCode).to.eq(400);
      expect(responseBody.message).to.eq('Bad request, email or password parameter is missing in POST request.');
    });
  });

  it('DELETE To Verify Login', function() {
    cy.request({
      method: 'DELETE',
      url:  this.route.verifyLogin,
    }).then((response) => {
      const responseBody = JSON.parse(response.body);
      expect(responseBody.responseCode).to.eq(405);
      expect(responseBody.message).to.eq('This request method is not supported.');
    });
  });

  it('POST To Verify Login with invalid details', function() {
    cy.request({
      method: 'POST',
      url:  this.route.verifyLogin,
      form: true,
      body: {
        email: this.user.incorrect_mail,
        password: this.user.password,
      },
    }).then((response) => {
      const responseBody = JSON.parse(response.body);
      expect(responseBody.responseCode).to.eq(404);
      expect(responseBody.message).to.eq('User not found!');
    });
  });

  it('POST To Create/Register User Account',function() {
    cy.request({
      method: 'POST' ,
      form: true,
      url:'https://automationexercise.com/api/createAccount',
      body:{
        "name": "NombreUsuarioSanti",
        "email": this.user.apiEmail,
        "password": this.user.apiPassword,
        "title": "Mr",
        "birth_date": 15,
        "birth_month": 7,
        "birth_year": 1990,
        "firstname": "Nombre",
        "lastname": "Apellido",
        "company": "NombreEmpresa",
        "address1": "DirecciónPrincipal",
        "address2": "DirecciónSecundaria",
        "country": "País",
        "zipcode": "CódigoPostal",
        "state": "Estado",
        "city": "Ciudad",
        "mobile_number": "1234567890"
      }
     } ).then((response) =>{

      const responseBody = JSON.parse(response.body);
      expect(responseBody.responseCode).to.eq(201);
      expect(responseBody.message).to.eq('User created!');

     })
  });

  

  it('PUT METHOD To Update User Account', function() {
    cy.request({
      method: 'PUT' ,
      form: true,
      url:this.route.updateAccount,
      body:{
        "name": "NombreUsuarioSantiEditado",
        "email": this.user.apiEmail,
        "password": this.user.apiPassword,
        "title": "Mr",
        "birth_date": 16,
        "birth_month": 8,
        "birth_year": 1993,
        "firstname": "Nombre",
        "lastname": "Apellido",
        "company": "NombreEmpresa",
        "address1": "DirecciónPrincipal",
        "address2": "DirecciónSecundaria",
        "country": "País",
        "zipcode": "CódigoPostal",
        "state": "Estado",
        "city": "Ciudad",
        "mobile_number": "1234567890"
      }
     } ).then((response) =>{

      const responseBody = JSON.parse(response.body);
      expect(responseBody.responseCode).to.eq(200);
      expect(responseBody.message).to.eq('User updated!');

     })
  });
  
  it('GET user account detail by email', function() {
    
    cy.request(
      {
        method: 'GET',
        url: this.route.getUserByEmail+this.user.apiEmail,
      }
    ).then((response) => {
       
    const responseBody = JSON.parse(response.body);
 
      console.log(responseBody.responseCode)
    expect(responseBody.responseCode).to.eq(200);
    expect(responseBody.user).to.not.be.empty //verifico que tragia un user
    const user = responseBody.user
    //verifico que traiga bien todos los datos definidos
    expect(user.id).to.not.be.undefined;
    expect(user.name).to.not.be.undefined;
    expect(user.email).to.not.be.undefined;
    expect(user.title).to.not.be.undefined;
    expect(user.birth_day).to.not.be.undefined;
    expect(user.birth_month).to.not.be.undefined;
    expect(user.birth_year).to.not.be.undefined;
    expect(user.first_name).to.not.be.undefined;
    expect(user.last_name).to.not.be.undefined;
    expect(user.company).to.not.be.undefined;
    expect(user.address1).to.not.be.undefined;
    expect(user.address2).to.not.be.undefined;
    expect(user.country).to.not.be.undefined;
    expect(user.state).to.not.be.undefined;
    expect(user.city).to.not.be.undefined;
    expect(user.zipcode).to.not.be.undefined;
    

          
  })
  });


  it('DELETE METHOD To Delete User Account',function() {
    cy.request({
      method: 'DELETE',  
      url: this.route.deleteAccount,
      form: true,
      body:{
        email: this.user.apiEmail,
        password: this.user.apiPassword,
       
      }

    }).then((response) => {
      
      const responseBody = JSON.parse(response.body)
      expect(response.status).to.eq(200);
      expect(responseBody.message).to.eq('Account deleted!');
      expect(responseBody.responseCode).to.eq(200);
     
    });

});

});
