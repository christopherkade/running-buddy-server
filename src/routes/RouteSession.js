import { Types } from "koa-smart";
import Route from "./Route";
import { __await } from "../../node_modules/tslib/tslib";
const Session = require("../models/index").Session;
const User = require("../models/index").User;
const UserSession = require("../models/index").UserSession;
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
      if (decoded == -1) ctx.throw(403, "Forbidden.");

      const session = await Session.create({
        ownerId: decoded.id,
        title: this.body(ctx).title,
        description: this.body(ctx).description,
        start: this.body(ctx).start,
        address: this.body(ctx).address,
        district: this.body(ctx).district
      });
      if (!session)
        ctx.throw(500, "An error occured while creating the session.");

      await session.addRunner([decoded.id]);
      const user = await User.findOne({ where: { id: decoded.id } });
      var user_total = user.total_session + 1;
      await user.update({ total_session: user_total });

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

      const session = await Session.findOne({
        where: { id: ctx.params.id },
        include: [{ model: User, as: "runner" }]
      });
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

      if (decoded.id == session.ownerId) {
        await UserSession.destroy({ where: { sessionId: ctx.params.id } });
        await session.destroy();
      } else ctx.throw(403, "You are not the owner of the session.");
      this.send(ctx);
    } catch (err) {
      ctx.status = err.status || 500;
      ctx.body = err.message;
      ctx.app.emit("error", err, ctx);
    }
  }

  @Route.Post({
    path: "join/:id"
  })
  async join(ctx) {
    try {
      const decoded = await verifyToken(ctx);
      if (decoded == -1) ctx.throw(403, "Forbidden.");

      const session = await Session.findOne({ where: { id: ctx.params.id } });
      if (!session) ctx.throw(404, "Session not found.");

      await session.addRunner([decoded.id]);
      const user = await User.findOne({ where: { id: decoded.id } });
      var user_total = user.total_session + 1;
      await user.update({ total_session: user_total });

      this.sendOk(ctx);
    } catch (err) {
      ctx.status = err.status || 500;
      ctx.body = err.message;
      ctx.app.emit("error", err, ctx);
    }
  }

  @Route.Get({
    path: "district/:district"
  })
  async allDistrict(ctx) {
    try {
      const decoded = await verifyToken(ctx);
      if (decoded == -1) ctx.throw(403, "Forbidden.");

      const sessions = await Session.findAll({
        where: { district: ctx.params.district },
        include: [{ model: User, as: "runner" }]
      });
      if (!sessions) ctx.throw(404, "No session found in this district.");

      ctx.body = sessions;
      this.sendOk(ctx);
    } catch (err) {
      ctx.status = err.status || 500;
      ctx.body = err.message;
      ctx.app.emit("error", err, ctx);
    }
  }

  @Route.Get({})
  async all(ctx) {
    try {
      const decoded = await verifyToken(ctx);
      if (decoded == -1) ctx.throw(403, "Forbidden.");

      const sessions = await Session.findAll({
        include: [{ model: User, as: "runner" }]
      });
      if (!sessions) ctx.throw(404, "No session found.");

      ctx.body = sessions;
      this.sendOk(ctx);
    } catch (err) {
      ctx.status = err.status || 500;
      ctx.body = err.message;
      ctx.app.emit("error", err, ctx);
    }
  }
}
