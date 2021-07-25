import config from "../fixtures/config.json"
import pet from "../fixtures/petPayload.json"
import putPet from "../fixtures/putPet.json"

it('dvTest', () => {
    pet.name = "Katya";
    pet.id = "1488"
    pet.tags[0].name  = "firstTag"
    pet.tags[1].name  = "secondTag" //теги
    pet.status = "unavailable"
    cy.request('POST', `${config.baseURL}/pet`, pet).then((response) => {
        let textResp = JSON.stringify(response.body)
        console.log(textResp)
        cy.log(textResp)
        expect(response.body).to.have.property('name', 'Katya') // true 
        expect(response.body).to.have.property('status', 'unavailable');
        //expect(response.body).to.have.property(tags[0].name, 'firstTag')
        //expect(response.body).to.have.property('tags', 'secondTag')
        expect(response).property('status').to.equal(200);
        expect(response.body).property('id').to.not.be.oneOf([null, ""]);
           let petid = response.body.id
           //cy.wait(2000)
           cy.request(`${config.baseURL}/pet/${petid}`).then((response) => {
            expect(response.body).to.have.property('name', 'Katya') // true 
            expect(response.body).to.have.property('status', 'unavailable');
            //expect(response.body).to.have.property('tags', 'firstTag')
            expect(response).property('status').to.equal(200);
            expect(response.body).property('id').to.not.be.oneOf([null, ""]);
            cy.request('PUT',`${config.baseURL}/pet`, putPet).then((response) => {
                expect(response.body).to.have.property('name', 'Dima') // true 
                expect(response.body).to.have.property('status', 'available');
                expect(response).property('status').to.equal(200);
                expect(response.body).property('id').to.not.be.oneOf([null, ""]);
            cy.request(`${config.baseURL}/pet/${petid}`).then((response) => {
                // expect(response.body).to.have.property('name', 'Dima') // true 
                // expect(response.body).to.have.property('status', 'available');
                //expect(response.body).to.have.property('tags', 'firstTag')
                expect(response).property('status').to.equal(200);
                expect(response.body).property('id').to.not.be.oneOf([null, ""]);
              cy.request('DELETE',`${config.baseURL}/pet/${petid}`).then((response) => {
                expect(response).property('status').to.equal(200);
                cy.wait(2000)
                cy.request(`${config.baseURL}/pet/${petid}`).then((response) => {
                  expect(response).property('status').to.equal(200);
                  console.log(textResp)
                  cy.log(textResp)
                })
              })
                })
              })
            })
          })
        })