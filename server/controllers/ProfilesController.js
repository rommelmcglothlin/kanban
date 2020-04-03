import BaseController from "../utils/BaseController";
import auth0Provider from "@bcwdev/auth0provider";
import { profilesService } from "../services/ProfilesService";

export class ProfilesController extends BaseController {
  constructor() {
    super("api/profile");
    this.router
      .use(auth0Provider.getAuthorizedUserInfo)
      .get("", this.getUserProfile)
      .put("", this.edit);
  }
  async getUserProfile(req, res, next) {
    try {
      req.body.email = req.userInfo.email;
      let profile = await profilesService.getProfile(req.userInfo);
      res.send(profile);
    } catch (error) {
      next(error);
    }
  }
  async edit(req, res, next) {
    try {
      req.body.email = req.userInfo.email;
      let profile = await profilesService.updateProfile(req.userInfo, req.body);
      res.send(profile);
    } catch (error) {
      next(error);
    }
  }
}
