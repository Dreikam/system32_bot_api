import type { Request, Response, NextFunction } from 'express';
import { TokensService } from '@Services/db/Tokens';
import { generateToken } from '@Utils/Tokens';
import boom from '@hapi/boom';

const services = new TokensService();

export class TokensController {
  async getToken(req: Request, res: Response, next: NextFunction) {
    try {
      const getToken = await services.getToken(req.params.id);

      return res.json({
        data: getToken,
      });
    } catch (error) {
      console.log(error);
      return next(boom.internal('Hubo un error obteniendo los datos'));
    }
  }

  async getAllTokens(req: Request, res: Response, next: NextFunction) {
    try {
      const tokens = await services.getAllTokens();

      return res.json({
        data: tokens,
      });
    } catch (error) {
      console.log(error);
      return next(boom.internal('Hubo un error obteniendo los datos'));
    }
  }

  async createToken(req: Request, res: Response, next: NextFunction) {
    try {
      const token = generateToken();

      const createToken = await services.createToken(token);

      return res.json({
        message: 'Token creado con exito',
        data: createToken,
      });
    } catch (error) {
      console.log(error);
      return next(boom.internal('Hubo un error creando el token'));
    }
  }

  async updateToken(req: Request, res: Response, next: NextFunction) {
    try {
      const updateToken = await services.updateToken(req.params.id, req.body);

      return res.json({
        message: 'Token actualizado con exito',
        data: updateToken,
      });
    } catch (error) {
      console.log(error);
      return next(boom.internal('Hubo un error actualizando el token'));
    }
  }

  async deleteToken(req: Request, res: Response, next: NextFunction) {
    try {
      const deleteToken = await services.deleteToken(req.params.id);

      return res.json({
        message: 'Token eliminado con exito',
        data: deleteToken,
      });
    } catch (error) {
      console.log(error);
      return next(boom.internal('Hubo un error borrando el token'));
    }
  }
}
