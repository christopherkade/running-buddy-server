import Route from "./Route";

export default class RouteUser extends Route {
  constructor(params) {
    super({ ...params });
  }

  @Route.Get({})
  async hello(ctx) {
    this.sendOk(ctx, "Hello world");
  }
}
