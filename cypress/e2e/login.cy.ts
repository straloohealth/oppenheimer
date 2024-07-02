const email = 'teste@straloo.com.br';
const code = '1234';

export function login() {
  cy.getCookie('accessToken').then((cookie) => {
    if (cookie) {
      return;
    }

    cy.session(
      'login',
      () => {
        cy.visit('/login');
        cy.get('input[name="email"]').type(email);
        cy.get('button[type="submit"]').click();

        cy.get('input[name="code"]').type(code);
        cy.get('button[type="submit"]').click();
        cy.url().should('include', '/');
      },
      {
        cacheAcrossSpecs: true
      }
    );
  });
}

describe('when in login page', () => {
  it('should be able to login', () => {
    cy.visit('/login');
    cy.get('input[name="email-wrong"]').type(email);
    cy.screenshot('login-page-email');
    cy.get('button[type="submit"]').click();

    cy.get('input[name="code"]').type(code);
    cy.screenshot('login-page-code');

    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/');
  });
});
