import {expect, use} from "chai";
import sinonChai from 'sinon-chai';
import Router from "../router";
import Route from "../route";
import Block from "../block";
import {createSandbox} from "sinon";

describe('Router', () => {
    use(sinonChai);
    let router: Router;
    const sandbox = createSandbox();
    class Component extends Block<any> {
        public override getContent(): HTMLElement | undefined {
            return undefined;
        }
    }

    beforeEach(() => {
        router = new Router('body');
        router
            .use('/1', Component)
            .use('/2', Component);

    });

    afterEach(() => {
        sandbox.restore();
    });

    it('должен корректно задавать history.state при переходе на указанную страницу', () => {
        sandbox.stub(router, 'getRoute').callsFake(() => null);
        router.go('/1', {a: 'test'});

        expect(window.history.state).deep.equal({a: 'test'});
    });

    it('должен менять history.length при переходе на конкретную страницу', () => {
        sandbox.stub(router, 'getRoute').callsFake(() => null);
        router.go('/1');
        expect(window.history.length).to.equal(3);
        router.go('/2');
        expect(window.history.length).to.equal(4);
    });

    it('не должен менять history.length при переходе вперёд/назад', () => {
        sandbox.stub(router, 'getRoute').callsFake(() => null);
        router.go('/1');
        router.back();
        router.forward();
        expect(window.history.length).to.equal(5);
    });

    describe('Route', () => {
        it('не должен меняться history.length при попытке перейти на ту же страницу, на которой находится', () => {
            const navigate = sandbox.spy(Route.prototype, 'navigate');
            router.go('/1');
            router.go('/1');
            expect(navigate.calledOnce).to.be.true;
        });

        it('должен возвращаться роут если он был ранее зарегистрирован', () => {
            expect(router.getRoute('/1')).is.instanceof(Route);
        });

        it('должен возвращаться null при запросе роута, который не был зарегистрирован', () => {
            expect(router.getRoute('/3')).is.equal(null);
        });
    });
});
