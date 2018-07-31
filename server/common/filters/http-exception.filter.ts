import { HttpException } from '@nestjs/core';
import { Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { MessageCodeError } from '../errors/error.module';

@Catch(MessageCodeError, HttpException, Error)
export class HttpExceptionFilter implements ExceptionFilter {
  public catch(err, response) {
    if (err instanceof MessageCodeError) {
      response.setHeader('x-message-code-error', err.messageCode);
      response.setHeader('x-message', err.errorMessage);
      response.setHeader('x-httpStatus-error', err.httpStatus);
        return response.status(err.httpStatus).json({ statusCode: err.httpStatus, message: err.errorMessage});
    } else {
        return response.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
}
}