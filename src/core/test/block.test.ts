// import {expect, use} from "chai";
// import sinonChai from 'sinon-chai';
// import {createSandbox, SinonStub} from "sinon";
// import Block from "../block";
// import {Store} from "../store";
// import {afterEach} from "mocha";
//
// describe.only('Block', () => {
//     use(sinonChai);
//     let block: Block<Record<string, any>>;
//     const sandbox = createSandbox();
//
//     afterEach(() => {
//         sandbox.restore();
//     });
//
//     beforeEach(() => {
//         block = new Block<Record<string, any>>();
//     });
//
//     class Component extends Block<Record<string, any>> {
//         constructor(private props: Record<string, any>) {
//             super({});
//         }
//
//         public override setProps(): void {}
//
//         public override get element(): boolean {
//             return true;
//         }
//
//         public override render() {
//
//         }
//     }
//
//     it('должен инициализироваться с указанными пропсами', () => {
//         block = new Block<Record<string, any>>({
//             prop1: 'string',
//             prop2: 1,
//             prop3: () => false
//         });
//
//         expect(block.props).deep.equal({
//             prop1: 'string',
//             prop2: 1,
//             prop3: () => false
//         });
//     });
//
//     it('должен обновлять пропсы', () => {
//         block.setProps({chatId: 123});
//
//         expect(block.props).deep.equal({chatId: 123});
//     });
// });
