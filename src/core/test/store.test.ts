import {expect, use} from "chai";
import sinonChai from 'sinon-chai';
import {Store} from "../store";

describe('Store', () => {
    use(sinonChai);
    let store: Store<Record<string, any>>;

    beforeEach(() => {
        store = new Store({});
    });

    it('должен инициализироваться с указанными параметрами', () => {
        expect(store.getState()).deep.equal({});
    });

    it('должен обновлять store с указанными параметрами', () => {
        store.set({chatId: 123})

        expect(store.getState()).deep.equal({chatId: 123});
    });
});
