describe("Api Testing practice", () => {
  it("Validate API 1: Get All Products List", () => {
    cy.request("https://automationexercise.com/api/productsList").then(
      (response) => {

        console.log(typeof(response.body))
        
        expect(response.status).to.eq(200);
         // Validar que la respuesta tenga el código 200
        const responseBody = JSON.parse(response.body); //Parsear a json
        expect(responseBody.responseCode).to.eq(200); //Validar que el codigo sea 200
        expect(responseBody.products).to.have.length.greaterThan(0); //Valido que haya productos
        expect(Array.isArray(responseBody.products)).to.be.true; //Valido que sea un array
        responseBody.products.forEach((product) => {
          //Valido que esten definidas todas las propiedades de los productos
          expect(product.brand).to.not.be.undefined;
          expect(product.category).to.not.be.undefined;
          expect(product.id).to.not.be.undefined;
          expect(product.name).to.not.be.undefined;
          expect(product.price).to.not.be.undefined
        });
      }
    );
  });

  it('API 2: POST To All Products List', () => {

    cy.request("POST","https://automationexercise.com/api/productsList",{

    "id": 99,
    "name": "Red Top",
    "price": "Rs. 1000",
    "brand": "Polo",
    "category": {
      "usertype": {
        "usertype": "Women"
      },
      "category": "Tops"
    }

    }
  ).then( (response)=>{
    
    console.log(typeof(response.body))
    expect(response.status).to.eq(200);
     expect(response.body.responseCode).to.eq(405); 
    expect(response.body.message).to.include('This request method is not supported')
  } );
    
  });

  it('API 3: Get All Brands List', () => {
    cy.request("https://automationexercise.com/api/brandsList").then(
      (response) => {
       
        expect(response.status).to.eq(200);
         // Validar que la respuesta tenga el código 200
        const responseBody = JSON.parse(response.body); //Parsear a json
        expect(responseBody.responseCode).to.eq(200); //Validar que el codigo sea 200
        expect(responseBody.brands).to.have.length.greaterThan(0); //Valido que haya marcas
        expect(Array.isArray(responseBody.brands)).to.be.true; //Valido que sea un array
        responseBody.brands.forEach((brand) => {
          //Valido que esten definidas todas las propiedades de las marcas
          expect(brand.id).to.not.be.undefined;
          expect(brand.brand).to.not.be.undefined;
          
    
        });
      }
    );
  });

  it('API 4: PUT To All Brands List', () => {
    cy.request("POST","https://automationexercise.com/api/brandsList",{

    "id": 99,
    "brand": "Topper"

    }
  ).then( (response)=>{
    
    console.log(response.body)
    expect(response.status).to.eq(200);
     expect(response.body.responseCode).to.eq(405); 
    expect(response.body.message).to.include('This request method is not supported')
  } );
  });

  it.only('API 5: POST To Search Product', () => {
    const productsToSearch = ["top", "tshirt", "jean","shoes"]

    productsToSearch.forEach((product)=>{
      cy.log(product)
      cy.request({
        method: 'POST',
        url: 'https://automationexercise.com/api/searchProduct',
        form: true,// Indica que mando un formulario HTML
        body: {
          search_product: product,
        }
      })
      .then((response)=>{
         const responseBody = JSON.parse(response.body);
          expect(responseBody.responseCode).to.eq(200);
          expect(responseBody).to.have.property('products')
          
          console.log(responseBody.products)
          if(responseBody.products.length > 0){
            responseBody.products.forEach((product) => {
              //Valido que esten definidas todas las propiedades de los productos
              expect(product.brand).to.not.be.undefined;
              expect(product.category).to.not.be.undefined;
              expect(product.id).to.not.be.undefined;
              expect(product.name).to.not.be.undefined;
              expect(product.price).to.not.be.undefined
            });
          }
      })
    });

    } )
   
});
