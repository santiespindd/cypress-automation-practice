// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


/*// Realiza una solicitud GET para obtener el token CSRF a través de las cookies
    cy.request({
      method: 'GET',
      url: 'https://automationexercise.com/login',
      followRedirect: true,
    }).then((response) => {
      // Extrae el token CSRF de las cookies
      const csrfToken = response.headers['set-cookie']
        .find(cookie => cookie.startsWith('csrftoken='))
        .split(';')[0]
        .split('=')[1];
    
      // Realiza una solicitud POST al endpoint de inicio de sesión con el token CSRF
      cy.request({
        method: 'POST',
        url: 'https://automationexercise.com/login',
        followRedirect: true,
        form: true,
        headers: {
          Referer: 'https://automationexercise.com/',
        },
        body: {
          email: credentials.email,
          password: credentials.password,
          csrfmiddlewaretoken: csrfToken, // Agrega el token CSRF
        },
      }).then((response) => {
        // Puedes realizar comprobaciones en la respuesta si es necesario
        expect(response.status).to.equal(200); // Verifica que el código de estado sea 302 (Found)
      });
    });

    cy.visit('https://automationexercise.com')*/