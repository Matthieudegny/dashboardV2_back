import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(UnauthorizedException)
export class SwaggerGuardFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // Vérifiez si la requête est pour Swagger
    if (request.url.includes('/api')) {
      // Si c'est le cas, autorisez l'accès en renvoyant une réponse 200 OK
      response.status(200).send();
    } else {
      // Sinon, laissez l'exception se propager normalement
      throw exception;
    }
  }
}
