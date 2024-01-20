describe("Api Testing practice", () => {
  it("Validate API 1: Get All Products List", () => {
    cy.request("https://automationexercise.com/api/productsList").then(
      (response) => {
        expect(response.status).to.eq(200); // Validar que la respuesta tenga el código 200

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
          expect(product.price).to.not.be.undefined;
        });
      }
    );
  });
});
