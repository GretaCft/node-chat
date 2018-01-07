let expect = require('expect');

let{generateMessage} = require('./message');

describe('generateMessage', () => {
    it('debe generar el mensaje correcto', () =>  {

        let from = 'Alma';
        let text = 'Bobería';
        let message = generateMessage(from, text);

        expect(message.createAt).toBeA('number');
        expect(message).toInclude({from, text});

    });
});