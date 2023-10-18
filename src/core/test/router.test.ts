import {expect, use} from "chai";
import sinonChai from 'sinon-chai';
import Router from "../router";
import Route from "../route";
import Block from "../block";

describe.only('Router', () => {
    use(sinonChai);
    let router: Router;

    beforeEach(() => {
        router = new Router('#test');
    });

    class Component extends Block<any> {}

    it('должен корректно задавать history.state при переходе на указанную страницу', () => {
        router.go('/test', {a: 'test'});

        expect(window.history.state).deep.equal({a: 'test'});
    });

    it('должен корректно менять history.length при переходе на конкретную страницу', () => {
        router.go('/1');
        expect(window.history.length).to.equal(2);
        router.go('/2');
        expect(window.history.length).to.equal(3);
    });

    it('должен корректно менять history.length при переходе вперёд/назад', () => {
        router.go('/1');
        router.back();
        router.forward();
        expect(window.history.length).to.equal(2);
    });

    it('должен возвращать роут если он был ранее зарегистрирован', () => {
        const testPath = '/test';

        router
            .use(testPath, Component);

        expect(router.getRoute(testPath)).is.instanceof(Route);
    });

    it('должен возвращать null при запросе роута, который не был зарегистрирован', () => {
        router
            .use('/1', Component);

        expect(router.getRoute('/2')).is.equal(null);
    });
});
