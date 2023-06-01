import { Block } from "./block";
import { Route } from "./route";

class Router {
  /* eslint-disable-next-line */
  private static __instance: Router;

  private routes: Route[] = [];

  private currentRoute: Route | null = null;

  private history = window.history;

  constructor(private readonly rootQuery: string) {
    if (Router.__instance) {
      /* eslint-disable-next-line */
      return Router.__instance;
    }

    this.routes = [];

    Router.__instance = this;
  }

  public use(
    pathname: string,
    block: typeof Block,
    param?: Record<string, string>
  ) {
    const route = new Route(pathname, block, this.rootQuery, param);
    this.routes.push(route);

    return this;
  }

  public start(initOnly: boolean = false) {
    window.onpopstate = (event: PopStateEvent) => {
      const target = event.currentTarget as Window;

      this._onRoute(target.location.pathname);
    };

    if (!initOnly) {
      this._onRoute(window.location.pathname);
    }
  }

  public reset() {
    this.routes = [];
    this.currentRoute = null;
  }

  private _onRoute(pathname: string) {
    const route = this.getRoute(pathname);

    if (!route) {
      return;
    }

    if (this.currentRoute && this.currentRoute !== route) {
      this.currentRoute.leave();
    }

    this.currentRoute = route;

    route.render();
  }

  public go(pathname: string) {
    this.history.pushState({}, "", pathname);

    this._onRoute(pathname);
  }

  public back() {
    this.history.back();
  }

  public forward() {
    this.history.forward();
  }

  private getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname));
  }
}

export default new Router(".app");
