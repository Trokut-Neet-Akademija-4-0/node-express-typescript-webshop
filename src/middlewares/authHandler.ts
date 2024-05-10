/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express'
import passport from 'passport'
import '../authentication/passportHandler'
import Kupac from '../entities/Kupac'

export default class AuthMiddleware {
  public static authenticateJWT(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    passport.authenticate('jwt', function (err: any, user: Kupac) {
      if (err) {
        console.log(err)
        return res.status(401).json({ status: 'error', code: 'unauthorized' })
      }
      if (!user) {
        return res.status(401).json({ status: 'error', code: 'unauthorized' })
      }
      return next()
    })(req, res, next)
  }
}
