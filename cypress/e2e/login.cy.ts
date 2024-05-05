export function login() {
  const email = 'teste@straloo.com.br';
  const code = '1234';

  cy.getCookie('token').then((cookie) => {
    if (!cookie) {
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
        cy.url().should('include', '/patient');
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
    cy.get('input[name="email"]').type('teste@straloo.com.br');
    cy.screenshot('login-page-email');
    cy.get('button[type="submit"]').click();

    const code = '1234';
    cy.get('input[name="code"]').type(code);
    cy.screenshot('login-page-code');

    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/patient');
  });
});
