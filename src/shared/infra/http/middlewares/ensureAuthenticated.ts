import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import auth from "@config/auth";
import appError from '@shared/errors/AppError';

/* Uma interface para o retorno da função verify que pode ser um objeto
ou uma string, nesse caso podemos forçar o retono no formato */
interface TokenPayload {
   iat: number;
   exp: number;
   sub: string;
}

export default function ensureAuthenticated(
   request: Request,
   response: Response,
   next: NextFunction): void {
   const authHeader = request.headers.authorization;

   if (!authHeader) {
      throw new appError('JWT token is missing');
   }
   /* desestruturação do array quando só preciso da segunda posição
   do array informo apenas ele após a virgula que é a segunda posição
   do array */
   const [, token] = authHeader.split(' ');

   try {
      const decoded = verify(token, auth.JWT.secret);
      // para forçar a tipagem de decoded usamos o as
      const { sub } = decoded as TokenPayload;

      // #override forçar tipagem com um esquema pra sobreescrever uma tipagem de uma biblioteca
      request.user = {
         id: sub,
      };

      return next();
   } catch {
      throw new appError('Invalid JWT token');
   }

}
