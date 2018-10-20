import { Types } from "koa-smart";
import Route from "./Route";
const User = require("../models/index").User;

export default class RouteUser extends Route {
  constructor(params) {
    super({ ...params });
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
      this.sendOk();
    } catch (err) {
      ctx.status = err.status || 500;
      ctx.body = err.message;
      ctx.app.emit("error", err, ctx);
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
      const user = await User.findOne({
        where: { email: this.body(ctx).email }
      });

      if (!user || !user.validPassword(this.body(ctx).password))
        ctx.throw(400, "Incorrect email or password.");
      ctx.body = [user.email, user.id];
      this.send(ctx);
    } catch (err) {
      ctx.status = err.status || 500;
      ctx.body = err.message;
      ctx.app.emit("error", err, ctx);
    }
  }
}
