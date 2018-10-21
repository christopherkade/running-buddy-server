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
      await User.create({
        username: this.body(ctx).username,
        email: this.body(ctx).email,
        password: this.body(ctx).password,
        total_session: 0
      });
      this.sendOk(ctx);
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

  @Route.Get({
    path: "/:email"
  })
  async get(ctx) {
    try {
      const user = await User.findOne({ where: { email: ctx.params.email } });

      if (!user) ctx.throw(404, "User not found.");
      ctx.body = user;
      this.send(ctx);
    } catch (err) {
      ctx.status = err.status || 500;
      ctx.body = err.message;
      ctx.app.emit("error", err, ctx);
    }
  }

  @Route.Post({
    path: "/:email",
    bodyType: Types.object().keys({
      username: Types.string().required(),
      email: Types.string().required(),
      password: Types.string().required()
    })
  })
  async post(ctx) {
    try {
      const user = await User.findOne({ where: { email: ctx.params.email } });

      if (!user) ctx.throw(404, "User not found");
      await user.update({
        username: this.body(ctx).username,
        email: this.body(ctx).email,
        password: this.body(ctx).password
      });
      this.send(ctx);
    } catch (err) {
      ctx.status = err.status || 500;
      ctx.body = err.message;
      ctx.app.emit("error", err, ctx);
    }
  }
}
