import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

interface HttpExceptionResponse {
  message: string | string[];
  error?: string;
  statusCode?: number;
}

function isHttpExceptionResponse(obj: unknown): obj is HttpExceptionResponse {
  return typeof obj === 'object' && obj !== null && 'message' in obj;
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = 500;
    let message: unknown = 'Internal server error';
    let stack: string | undefined;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const responseMessage = exception.getResponse();
      if (isHttpExceptionResponse(responseMessage)) {
        message = responseMessage.message || message;
      } else {
        message = responseMessage;
      }
    } else if (exception instanceof Error) {
      stack = exception.stack;
      message = exception.message;
    }

    this.logger.error(
      `HTTP Status: ${status} Error Message: ${message}`,
      stack,
    );

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
    });
  }
}
