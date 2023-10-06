import Block from "../core/block";
import { StoreEvents } from "../core/store";
import { AppState } from "../type";
import isEqual from "./isEqual";

export function connect(mapStateToProps: (state: AppState) => Partial<AppState>) {
    return function<P extends object>(Component: typeof Block<P>) {
        return class extends Component{
            private readonly onChangeStoreCallback: () => void;
            constructor(props: P) {
                const store = window.store;
                // сохраняем начальное состояние
                let state = mapStateToProps(store.getState());
                super({...props, ...state});
                this.onChangeStoreCallback = () => {
                    console.log(1);
                    // при обновлении получаем новое состояние
                    const newState = mapStateToProps(store.getState());

                    // если что-то из используемых данных поменялось, обновляем компонент
                    if (!isEqual(state, newState)) {
                        this.setProps({...newState});
                    }

                    // не забываем сохранить новое состояние
                    state = newState;
                }
                // подписываемся на событие
                store.on(StoreEvents.Updated, this.onChangeStoreCallback);
            }


            componentWillUnmount() {
                super.componentWillUnmount();
                window.store.off(StoreEvents.Updated, this.onChangeStoreCallback);
            }
        }
    }
}
