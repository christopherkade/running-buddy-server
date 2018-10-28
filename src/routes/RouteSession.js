import { Types } from "koa-smart";
import Route from "./Route";
import { __await } from "../../node_modules/tslib/tslib";
const session = require("../models/index").Session;
const jwt = require("jsonwebtoken");
const verifyToken = require("../middlewares/VerifyToken");

export default class RouteSession extends Route {
  constructor(params) {
    super({ ...params });
  }

  @Route.Post({
    bodyType: Types.object().keys({
      title: Types.string().required(),
      description: Types.string().required(),
      start: Types.date().required(),
      address: Types.string().required(),
      district: Types.number()
        .integer()
        .required()
    })
  })
  async Create(ctx) {
    try {
      const decoded = await verifyToken(ctx);
      if (decoded == -1 || decoded.email != ctx.params.email)
        ctx.throw(403, "Forbidden.");

      await Session.create({
        title: this.body(ctx).title,
        description: this.body(ctx).description,
        start: this.body(ctx).start,
        address: this.body(ctx).address,
        district: this.body(ctx).district
      });
      this.sendOk(ctx);
    } catch (err) {
      ctx.status = err.status || 500;
      ctx.body = err.message;
      ctx.app.emit("error", err, ctx);
    }
  }

  @Route.Get({
    path: "/:id"
  })
  async get(ctx) {
    try {
      const decoded = await verifyToken(ctx);
      if (decoded == -1) ctx.throw(403, "Forbidden.");

      const session = await Session.findOne({ where: { id: ctx.params.id } });
      if (!session) ctx.throw(404, "Session not found.");

      ctx.body = session;
      this.sendOk(ctx);
    } catch (err) {
      ctx.status = err.status || 500;
      ctx.body = err.message;
      ctx.app.emit("error", err, ctx);
    }
  }

  @Route.Post({
    path: "/:id"
  })
  async post(ctx) {
    try {
      const decoded = await verifyToken(ctx);
      if (decoded == -1) ctx.throw(403, "Forbidden.");

      const session = await Session.findOne({ where: { id: ctx.params.id } });
      if (!session) ctx.throw(404, "Session not found.");

      await session.update({
        title: this.body(ctx).title,
        description: this.body(ctx).description,
        start: this.body(ctx).start,
        address: this.body(ctx).address,
        district: this.body(ctx).district
      });
      this.sendOk(ctx);
    } catch (err) {
      ctx.status = err.status || 500;
      ctx.body = err.message;
      ctx.app.emit("error", err, ctx);
    }
  }

  @Route.Delete({
    path: "/:id"
  })
  async delete(ctx) {
    try {
      const decoded = await verifyToken(ctx);
      if (decoded == -1) ctx.throw(403, "Forbidden.");

      const session = await Session.findOne({ where: { id: ctx.params.id } });
      if (!session) ctx.throw(404, "Session not found.");

      await session.destroy();
      this.send(ctx);
    } catch (err) {
      ctx.status = err.status || 500;
      ctx.body = err.message;
      ctx.app.emit("error", err, ctx);
    }
  }
}
