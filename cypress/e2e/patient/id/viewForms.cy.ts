// describe('when viewing a patient forms', () => {
//   beforeEach(() => {
//     cy.fixture('geral.json').then((data) => {
//       cy.setCookie('refreshToken', data.jwt);
//       cy.setCookie('accessToken', data.jwt);
//     });
//     cy.visit(`/patient/123`);
//     cy.contains('Histórico').click();
//   });
//   it('should take a screenshoot for analysis', () => {
//     cy.screenshot('patient-history');
//   });
//   it('should show multiple forms', () => {
//     cy.get('.MuiAccordion-root').its('length').should('be.eq', 2);
//   });
//   it('should show forms responses', () => {
//     // Select the first MuiAccordion and click to open it
//     cy.get('.MuiAccordion-root').first().click();
//
//     // Check for the presence of the specified table contents
//     cy.contains('Pergunta').should('exist');
//     cy.contains('Resposta').should('exist');
//     cy.contains('Question 1').should('exist');
//     cy.contains('Answer 1').should('exist');
//   });
// });
