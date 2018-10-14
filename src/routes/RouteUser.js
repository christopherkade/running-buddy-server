import { Types } from "koa-smart";
import Route from "./Route";
const User = require("../models/index").User;

export default class RouteUser extends Route {
  constructor(params) {
    super({ ...params });
  }

  @Route.Get({})
  async hello(ctx) {
    this.sendOk(ctx, "Hello world");
  }

  @Route.Post({
    bodyType: Types.object().keys({
      username: Types.string().required(),
      email: Types.string().required(),
      password: Types.string().required()
    })
  })
  async Register(ctx) {
    try {
      const body = this.body(ctx);
      await User.create({
        username: body.username,
        email: body.email,
        password: body.password,
        total_session: 0
      });
      console.log(User);
      this.sendOk(ctx, "User registered");
    } catch (err) {
      console.log(err);
    }
  }

  @Route.Post({
    bodyType: Types.object().keys({
      email: Types.string().required(),
      password: Types.string().required()
    })
  })
  async Login(ctx) {
    try {
      await User.findOne({ where: { email: this.body(ctx).email } });
      console.log(User);
      this.sendOk(ctx, "User logged");
    } catch (err) {
      console.log(err);
    }
  }
}
