
import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
  import { HttpAdapterHost } from '@nestjs/core';
import { EntityNotFoundError, QueryFailedError } from 'typeorm';
  
  @Catch(QueryFailedError, EntityNotFoundError)
  export class TypeOrmExceptionFilter implements ExceptionFilter {
    constructor(private readonly httpAdapterHost: HttpAdapterHost) {}
  
    catch(exception: QueryFailedError, host: ArgumentsHost): void {
      console.log(exception.driverError.message, 'expeio')
      // In certain situations `httpAdapter` might not be available in the
      // constructor method, thus we should resolve it here.
      const { httpAdapter } = this.httpAdapterHost;
  
      const ctx = host.switchToHttp();
  
      const httpStatus =
        exception instanceof HttpException
          ? exception.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR;
  
      const responseBody = {
        statusCode: httpStatus,
        timestamp: new Date().toISOString(),
        path: httpAdapter.getRequestUrl(ctx.getRequest()),
        message: exception.driverError.message || 'Internal server error',
      };
  
      httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
    }
  }
  