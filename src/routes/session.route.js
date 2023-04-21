import passport from 'passport';
import { Router } from 'express';
import { getRoleByUser } from '../util/RoleValidator.js';
import { generateAuthToken } from '../util/jwt.js';

const sessionsRoute = Router();

sessionsRoute.get('/github', passport.authenticate('github', {scope: ['user:email']}), async(req, res) => {})

sessionsRoute.get('/githubcallback', passport.authenticate('github', {failureRedirect: '/login'}), async (req, res) => {
    const user = req.user;

    const accessToken = generateAuthToken({
      id: user._id,
      email: user.email,
      last_name: user.last_name,
      first_name: user.first_name,
      cid : user.cart?._id
    });

    res
      .cookie("authToken", accessToken, { httpOnly: true })
      .redirect("../../api/products/list");

    res.redirect('/')
})

sessionsRoute.get(
    "/current",
    passport.authenticate("current", { session: false }),
    async (req, res) => {
      res.send(req.user);
    }
  );

export default sessionsRoute;