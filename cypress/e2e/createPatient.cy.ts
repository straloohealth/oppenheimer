import { login } from './login.cy';

describe('when in create patient page', () => {
  beforeEach(() => {
    login();
    cy.visit('/patient');
  });
  it('should take a screenshot for analysis', () => {
    cy.screenshot('patient-creation-start');
  });
  it('should be able to create a basic valid patient', () => {
    const name = 'John Doe';
    const cpf = '86238961570';
    const phone = '11968427903';
    cy.get('input[data-test-id="name"]').type(name);
    cy.get('input[data-test-id="phone"]').type(phone);
    cy.get('input[data-test-id="cpf"]').type(cpf);

    cy.screenshot('patient-creation-before-submit');
    cy.get('button[type="submit"]').click();
  });
});
