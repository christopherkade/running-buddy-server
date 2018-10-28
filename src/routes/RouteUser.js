import { Types } from "koa-smart";
import Route from "./Route";
import { __await } from "../../node_modules/tslib/tslib";
const User = require("../models/index").User;
const jwt = require("jsonwebtoken");
const verifyToken = require("../middlewares/VerifyToken");

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
      const token = await jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: 86400 }
      );
      ctx.body = { token: token };
      this.send(ctx);
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
      const token = await jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: 86400 }
      );
      ctx.body = { token: token };
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
      const decoded = await verifyToken(ctx);
      if (decoded == -1 || decoded.email != ctx.params.email)
        ctx.throw(403, "Forbidden.");

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
      const decoded = await verifyToken(ctx);
      if (decoded == -1 || decoded.email != ctx.params.email)
        ctx.throw(403, "Forbidden.");

      const user = await User.findOne({ where: { email: ctx.params.email } });
      if (!user) ctx.throw(404, "User not found.");

      // const reqBody = this.body(ctx);
      // for (var value in reqBody) {
      //   if (reqBody[value] != "") {
      //     await user.update({ value: reqBody[value] });
      //     console.log(value, ":", reqBody[value], "\n");
      //   }
      // }
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

  @Route.Delete({
    path: "/:email"
  })
  async delete(ctx) {
    try {
      const decoded = await verifyToken(ctx);
      if (decoded == -1 || decoded.email != ctx.params.email)
        ctx.throw(403, "Forbidden.");

      const user = await User.findOne({ where: { email: ctx.params.email } });
      if (!user) ctx.throw(404, "User not found.");

      await user.destroy();
      this.send(ctx);
    } catch (err) {
      ctx.status = err.status || 500;
      ctx.body = err.message;
      ctx.app.emit("error", err, ctx);
    }
  }
}
