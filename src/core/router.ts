import Route from "./route";
//import Block from "./block";

export default class Router {
    public routes: Array<Route>;
    public history: History;
    private _currentRoute: Nullable<Route>;
    private readonly _rootQuery: string;
    private static __instance: Router;


    constructor(rootQuery: string) {
        if (Router.__instance) {
            return Router.__instance;
        }

        this.routes = [];
        this.history = window.history;
        this._currentRoute = null;
        this._rootQuery = rootQuery;

        Router.__instance = this;
    }

    use(pathname: string, block: any) {
        const route = new Route(pathname, block, {rootQuery: this._rootQuery});
        this.routes.push(route);

        return this;
    }

    start() {
        window.addEventListener('popstate', (event) => {
            this._onRoute((<any> event.target)?.location.pathname);
        });

        this._onRoute(window.location.pathname);
    }

    _onRoute(pathname: string) {
        const route = this.getRoute(pathname);
        if (this._currentRoute) {
            this._currentRoute.leave();
        }

        this._currentRoute = route;
        route?.render();
    }

    go(pathname: string) {
        this.history.pushState({}, '', pathname);
        this._onRoute(pathname);
    }

    back() {
        this.history.back();
    }

    forward() {
        this.history.forward();
    }

    getRoute(pathname: string): Nullable<Route> {
        const route = this.routes.find(route => route.match(pathname));
        return route || null;
    }
}
