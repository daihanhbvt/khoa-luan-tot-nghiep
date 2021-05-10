import * as Consts from '../common/consts';

import { HttpStatus, Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { Problem, Requester } from '../common';

import { Request } from 'express';

@Injectable()
export class AuthorizationMiddleware implements NestMiddleware {
  async use(req: Request, res: any, next: () => void) {
    // if (!req.headers.authorization || !req.headers.site_id) {
    //     throw Problem.HttpException(Problem.UnAuthorized(Consts.MSG_AUTH_FAILED));
    // }
    req.body.site_id = req.headers.site_id;
    // req.body.auth_user = req.body.auth_user;
    // this.LastUpdatedBy = req.body.auth_user?.id;
    // this.SiteId = req.body.site_id;

    const headers = { headers: { authorization: req.headers.authorization, site_id: req.headers.site_id } };
    const response: any = await Requester.post(`${process.env.AUTH_API}/user/me`, { site_id: req.headers.site_id }, headers);
    if (![HttpStatus.OK, HttpStatus.CREATED, HttpStatus.ACCEPTED].includes(response.status)) {
        throw Problem.HttpException({
            status: response?.status,
            message: response?.detail?.response?.data?.message,
        });
    } else {
        req.body.auth_user = response?.data.id;
        // req.body.site_id = response?.data?.site_id;
    }

    next();
  }
}
