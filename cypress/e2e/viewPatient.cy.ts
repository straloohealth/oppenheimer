// import CONSTANTS from '@/constants';
//
// describe('when viewing a patient', () => {
//   beforeEach(() => {
//     cy.fixture('geral.json').then((data) => {
//       cy.setCookie('refreshToken', data.jwt);
//       cy.setCookie('accessToken', data.jwt);
//     });
//   });
//   const patient = {
//     id: '123',
//     name: 'John Doe',
//     phone: '+5511999999999',
//     cpf: '86238961570',
//     personalInfo: {
//       birthDate: '1980-05-26T00:00:00',
//       sex: 'MALE'
//     }
//   };
//   it('should be able to view a patient', () => {
//     cy.visit(`/patient/${patient.id}`);
//     // Look for text, does not matter in which component and format
//     cy.contains(patient.name).should('exist');
//     cy.contains(patient.cpf.substring(0, 3)).should('exist');
//     cy.screenshot('patient-profile');
//   });
//   it('should be able to search for a patient', () => {
//     cy.intercept('POST', CONSTANTS.CORLEONE_URL + '/graphql', (req) => {
//       const query = req.body.variables.name;
//       expect(patient.name).to.contains(query);
//       req.reply({
//         statusCode: 200,
//         body: {
//           data: {
//             searchPatient: [
//               {
//                 id: patient.id,
//                 name: 'John Doe'
//               }
//             ]
//           }
//         }
//       });
//     }).as('searchUserQuery');
//
//     cy.visit('/');
//     cy.get('input[id="patient-input-box"]').type(patient.name.substring(0, 3));
//     cy.wait('@searchUserQuery');
//     cy.screenshot('search-patient');
//     cy.contains(patient.name).click();
//     cy.url().should('include', `/patient/${patient.id}`);
//   });
// });
