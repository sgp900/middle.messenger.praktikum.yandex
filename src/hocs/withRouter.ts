import { Block } from "../utils/block";
import Router from "../utils/router";

export interface PropsWithRouter {
  router: typeof Router;
}

export function withRouter(Component: typeof Block<any>) {
  type Props = typeof Component extends Block<infer P> ? P : any;

  return class WithRouter extends Component {
    constructor(props: Props & PropsWithRouter) {
      super({ ...props, router: Router });
    }
  };
}
