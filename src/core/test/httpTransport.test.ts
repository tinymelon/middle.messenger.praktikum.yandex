import {expect, use} from "chai";
import sinonChai from 'sinon-chai';
import {createSandbox, SinonStub} from "sinon";
import HttpTransport from "../httpTransport";

describe('HTTP Transport', () => {
    use(sinonChai);
    const sandbox = createSandbox();
    let http: HttpTransport;
    let request: SinonStub<any>;

    beforeEach(() => {
        http = new HttpTransport('');
        request = sandbox.stub(http, 'request' as keyof typeof http).callsFake(() => Promise.resolve());
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('должен корректно кодировать символы для запроса', () => {
        const stringify = sandbox.spy(http, 'queryStringify');
        http.queryStringify({
            a: '1=2&1',
            b: 'x&2',
            c: 'Й',
            d: {}
        });

        expect(stringify).returned('?a=1%3D2%261&b=x%262&c=%D0%99&d=%5Bobject%20Object%5D');
    });

    it('должен корректно преобразовывать строковые параметры для GET-запроса и вызывать его', () => {
        http.get('', {data: {a: '1', b: 'string'}});

        expect(request).calledWithMatch('?a=1&b=string', {method: 'GET'});
    });

    it('должен корректно преобразовывать числовой параметр для GET-запроса и вызывать его', () => {
        http.get('', {data: {a: 1, b: 'string'}});

        expect(request).calledWithMatch('?a=1&b=string', {method: 'GET'});
    });

    it('должен делать POST-запрос', () => {
        http.post('/post', {data: {a: 1, b: 'string'}});

        expect(request).calledWithMatch('/post', {method: 'POST', data: {a: 1, b: 'string'}});
    });

    it('должен делать PUT-запрос', () => {
        http.put('/put', {data: {a: 1, b: 'string'}});

        expect(request).calledWithMatch('/put', {method: 'PUT', data: {a: 1, b: 'string'}});
    });

    it('должен делать DELETE-запрос', () => {
        http.delete('/delete', {data: {a: 1, b: 'string'}});

        expect(request).calledWithMatch('/delete', {method: 'DELETE', data: {a: 1, b: 'string'}});
    });
});
