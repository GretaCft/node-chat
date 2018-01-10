let expect = require('expect');

let{generateMessage, generateLocationmessage} = require('./message');

describe('generateMessage', () => {
    it('debe generar el mensaje correcto', () =>  {

        let from = 'Alma';
        let text = 'Bobería';
        let message = generateMessage(from, text);

        expect(message.createAt).toBeA('number');
        expect(message).toInclude({from, text});

    });
});
describe('generateLocationMessage', () => {
    it('debe generar locación correcta', () =>  {

        let from = 'User2';
        let latitude = 12;
        let longitude = 35;
        let url = 'https://www.google.com/maps?q=12, 35';
        let message = generateLocationmessage(from, latitude, longitude);

        expect(message.createAt).toBeA('number');
        expect(message).toInclude({from, url});

    });
});