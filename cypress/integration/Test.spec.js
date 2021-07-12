import config from "../fixtures/config.json"
import pet from "../fixtures/petPayload.json"

it('dvTest', () => {
    pet.name = "Katya";
    pet.tags[0].name  = "firstTag"
    pet.tags[0].name  = "secondTag" //теги
    pet.status = "unavailable"
    cy.request('POST', `${config.baseURL}/pet`, pet).then((response) => {
        let textResp = JSON.stringify(response.body)
        console.log(textResp)
        cy.log(textResp)
        expect(response.body).to.have.property('name', 'Katya') // true 
        expect(response.body).to.have.property('status', 'unavailable') //проверки шо  я сделал
        //expect(response.body).to.have.property('tags[0].name', 'firstTag') //не получается
    })
    })