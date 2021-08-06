import config from "../fixtures/config.json"
import pet from "../fixtures/petPayload.json"
import  putPet from "../fixtures/putPet.json"

it('dvTest', () => {
    pet.name = "Katya";
    pet.id = "1488"
    pet.tags[0].name  = "firstTag"
    pet.tags[1].name  = "secondTag"
    pet.status = "unavailable"
    cy.request('POST', `${config.baseURL}/pet`, pet).then((response) => {
        // let textResp = JSON.stringify(response.body)
      // console.log(textResp)
        // cy.log(textResp)
        expect(response.body).to.have.property('name', 'Katya') 
        expect(response.body).to.have.property('status', 'unavailable');
        expect(response.body.tags[0].name).to.equal('firstTag') 
        expect(response.body.tags[1].name).to.equal('secondTag') 
         expect(response.status).to.equal(200); 
         expect(response.body.id).to.not.be.oneOf([null, ""]);
           let petid = response.body.id
           cy.wait(2000)
           cy.request(`${config.baseURL}/pet/${petid}`).then((response) => {
            expect(response.body).to.have.property('name', 'Katya')
            expect(response.body).to.have.property('status', 'unavailable');
            expect(response.body.tags[0].name).to.equal('firstTag') 
            expect(response.body.tags[1].name).to.equal('secondTag') 
            expect(response.status).to.equal(200); 
            expect(response.body).property('id').to.not.be.oneOf([null, ""]);
            cy.request('PUT',`${config.baseURL}/pet`, putPet).then((response) => { 
                expect(response.body.name).to.equal('Dima') // true
                expect(response.body.status).to.equal('available');
                expect(response.status).to.equal(200); 
                expect(response.body.id).to.not.be.oneOf([null, ""]);
                cy.wait(2000)
            cy.request(`${config.baseURL}/pet/${petid}`).then((response) => {
              expect(response.body.name).to.equal('Katya') // true
              expect(response.body.status).to.equal('unavailable');
              expect(response.body.tags[0].name).to.equal('firstTag') 
              expect(response.body.tags[1].name).to.equal('secondTag') 
              expect(response.status).to.equal(200);
              expect(response.body.id).to.not.be.oneOf([null, ""]);
              cy.request('DELETE',`${config.baseURL}/pet/${petid}`).then((response) => {
                expect(response.status).to.equal(200);
                cy.wait(2000)
                cy.request(`${config.baseURL}/pet/${petid}`).then((response) => {
                  expect(response.status).to.equal(200);
                  
                })
              })
                })
              })
            })
          })
        })