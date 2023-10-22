import {expect, use} from "chai";
import sinonChai from 'sinon-chai';
import {createSandbox, SinonSpy} from "sinon";
import Block from "../block";
import {afterEach} from "mocha";

interface Props {
    propStr?: string,
    propNum?: number,
    text?: string,
    events?: Record<string, any>
}

describe('Block', () => {
    use(sinonChai);
    let block: Component;
    let render: SinonSpy
    const sandbox = createSandbox();

    class Component extends Block<Props> {
        public override render() {
            return '<div>{{text}}</div>';
        }
        public override componentDidMount() {}
        public override componentWillUnmount() {}
    }

    afterEach(() => {
        sandbox.restore();
    });

    beforeEach(() => {
        //block = new Component();
    });

    describe('при инициализации', () => {
        it('должен создаваться с указанными пропсами', () => {
            block = new Component({
                propStr: 'string',
                propNum: 1
            });

            expect(block.props).deep.equal({
                propStr: 'string',
                propNum: 1
            });
        });

        it('должен рендериться', () => {
            render = sandbox.spy(Component.prototype, 'render');
            block = new Component({});

            expect(render.calledOnce).to.be.true;
        });

        it('в шаблоне должны заменяться переменные на значения из пропсов', () => {
            const text = 'Test';
            block = new Component({text});
            const renderText = block.element?.textContent;

            expect(renderText).to.be.equal(text);
        });
    });

    describe('пропсы', () => {
        it('должны обновляться', () => {
            block = new Component({});
            block.setProps({propNum: 123});

            expect(block.props).deep.equal({propNum: 123});
        });

        it('должны вызывать рендер если изменилось существующее поле', () => {
            block = new Component({
                propNum: 1
            });
            render = sandbox.spy(Component.prototype, 'render');
            block.setProps({
                propNum: 2
            });

            expect(render.calledOnce).to.be.true;
        });

        it('должны вызывать рендер если добавилось поле', () => {
            block = new Component({
                propNum: 1
            });
            render = sandbox.spy(Component.prototype, 'render');
            block.setProps({
                propStr: '2'
            });

            expect(render.calledOnce).to.be.true;
        });

        it('не должны вызывать рендер если ничего не изменилось', () => {
            block = new Component({
                testNum: 1,
                testStr: 'string',
                testBool: false,
                method: () => null
            });
            render = sandbox.spy(Component.prototype, 'render');
            block.setProps({
                testNum: 1,
                testStr: 'string',
                testBool: false,
                method: () => null
            });

            expect(render.called).to.be.false;
        });
    });

    describe('жизненный цикл', () => {
        it('обновление если componentDidUpdate вернул true', () => {
            class UpdateComponent extends Component {
                componentDidUpdate() {
                    return true;
                }
            }
            block = new UpdateComponent({
                propNum: 1
            });
            render = sandbox.spy(UpdateComponent.prototype, 'render');
            block.setProps({
                propNum: 2
            });

            expect(render.calledOnce).to.be.true;
        });

        it('нет обновления если componentDidUpdate вернул false', () => {
            class UpdateComponent extends Component {
                componentDidUpdate() {
                    return false;
                }
            }
            block = new UpdateComponent({
                propNum: 1
            });
            render = sandbox.spy(UpdateComponent.prototype, 'render');
            block.setProps({
                propNum: 2
            });

            expect(render.called).to.be.false;
        });

        it('вызывается componentDidMount после рендера', () => {
            block = new Component({
                propNum: 1
            });
            const cdm = sandbox.spy(Component.prototype, 'componentDidMount');
            block.setProps({
                propNum: 2
            });

            expect(cdm.calledOnce).to.be.true;
        });

        it('вызывается componentWillUnmount при анмаунте', () => {
            block = new Component({});
            const cwu = sandbox.spy(Component.prototype, 'componentWillUnmount');
            block.unmountComponent();

            expect(cwu.calledOnce).to.be.true;
        });
    });
});
