import { login } from './login.cy';

describe('when viewing a patient', () => {
  beforeEach(() => {
    login();
  });
  const patient = {
    id: '662d50498c97ba55612801cb',
    name: 'John Doe',
    firstName: 'John',
    phone: '+5511968427903',
    cpf: '46546717220',
    personalInfo: {
      birthDate: '1980-05-26T00:00:00',
      sex: 'MALE'
    }
  };

  it('should be able to view a patient', () => {
    login();
    cy.visit(`/patient/${patient.id}`);
    cy.contains(patient.firstName).should('exist');
    cy.screenshot('patient-profile');
  });
  it('should be able to search for a patient', () => {
    cy.visit(`/`);
    cy.get('input[id="patient-input-box"]').type(patient.name.substring(0, 3));
    cy.screenshot('search-patient');
    cy.contains(patient.firstName).click();
    cy.url().should('include', `/patient/${patient.id}`);
  });
});
