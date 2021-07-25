import config from "../fixtures/config.json"
import pet from "../fixtures/petPayload.json"
import putPet from "../fixtures/putPet.json"


it('dvTest', () => {
cy.request(`${config.baseURL}/pet/1488`).then((response) => {
    expect(response.body).to.have.property('name', 'Dima') // true 
    expect(response.body).to.have.property('status', 'available');
    //expect(response.body).to.have.property('tags', 'firstTag')
    expect(response).property('status').to.equal(200);
    expect(response.body).property('id').to.not.be.oneOf([null, ""]);
})
})
