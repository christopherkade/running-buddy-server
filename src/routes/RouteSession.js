import { Types } from "koa-smart";
import Route from "./Route";
const session = require("../models/index").Session;

export default class RouteSession extends Route {
  constructor(params) {
    super({ ...params });
  }

  // @Route.Post({
  //   bodyType: Types.object().keys({
  //     title: Types.string().required(),
  //     description: Types.string().required(),

  //   })
  // })
}
