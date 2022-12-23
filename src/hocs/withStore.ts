import { Block } from "../utils/block";
import store, { StoreEvents } from "../utils/store";
import { isEqual, PlainObject } from "../utils/helpers";

export interface PropsWithStore {
  store: typeof store;
}

export function withStore<Type>(mapStateToProps: (state: any, props?:Type) => PlainObject) {
  return function wrap(Component: typeof Block<any>) {
    type Props = typeof Component extends Block<infer P> ? P : any;
    let currentState: PlainObject = {};

    return class withStoreClass extends Component {
      constructor(props: Props & PropsWithStore) {
        const state = store.getState();
        currentState = mapStateToProps(state);

        super({ ...props, ...currentState });

        store.on(StoreEvents.Updated, this.onStoreUpdated);
      }

      protected componentWillUnmount() {
        store.off(StoreEvents.Updated, this.onStoreUpdated);
      }

      public onStoreUpdated = () => {
        const state = store.getState();
        const propsFromState = mapStateToProps(state);

        if (isEqual(currentState, propsFromState)) {
          return;
        }

        currentState = propsFromState;

        this.setProps({ ...propsFromState });
      };
    };
  };
}
