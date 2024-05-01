import {login} from "./login.cy";

describe('when in create patient page', () => {
  beforeEach(() => {
    login()
    cy.visit('/patient');
  });
  it('should take a screenshot for analysis', () => {
    cy.screenshot('patient-creation-start');
  });
  it('should be able to create a basic valid patient', () => {
    const name = 'John Doe';
    const cpf = '86238961570';
    const phone = '11968427903';
    cy.get('input[id="name"]').type(name);
    cy.get('input[id="phone"]').type(phone);
    cy.get('input[id="cpf"]').type(cpf);

    cy.screenshot('patient-creation-before-submit');
    cy.get('button[type="submit"]').click();
  });

  it('should be able to create a valid patient with all fields and program set', () => {
    const name = 'John Doe';
    const cpf = '86238961570';
    const phone = '11968427903';
    const birthDate = '16111998';
    const sex = "MALE"
    const program = "knee-arthrosis"

    cy.get('input[id="name"]').type(name);
    cy.get('input[id="phone"]').type(phone);
    cy.get('input[id="cpf"]').type(cpf);
    cy.get('input[id="birthDate"]').type(birthDate);
    cy.get(`input[value="${sex}"]`).check();
    cy.get('div[id="program"]').click();
    cy.get(`li[data-value="${program}"]`).click();

    cy.screenshot('patient-creation-complete-before-submit');

    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/patient/662d50498c97ba55612801cb');

    cy.screenshot('patient-creation-complete-after-submit');
  });
});
