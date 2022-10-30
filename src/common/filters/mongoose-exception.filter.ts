import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import * as MongooseError from "mongoose/lib/error";
import { Response } from "express";

@Catch(MongooseError)
export class MongoExceptionFilter implements ExceptionFilter {
  catch(exception: MongooseError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();
    let error: { statusCode: number; message: string };

    switch (exception.name) {
      case "CastError": {
        error = {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: "MongoError: Cast Error",
        };
        break;
      }
      case "DisconnectedError": {
        error = {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: "MongoError: Disconnected Error",
        };
        break;
      }
      case "DivergentArrayError": {
        error = {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: "MongoError: Divergent Array Error",
        };
        break;
      }
      case "DocumentNotFoundError": {
        error = {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: "MongoError: Document Not Found Error",
        };
        break;
      }
      case "MissingSchemaError": {
        error = {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: "MongoError: Missing Schema Error",
        };
        break;
      }
      case "MongooseError": {
        error = {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: "MongoError: Mongoose Error",
        };
        break;
      }
      case "MongooseServerSelectionError": {
        error = {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: "MongoError: Mongoose Server Selection Error",
        };
        break;
      }
      case "ObjectExpectedError": {
        error = {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: "MongoError: Object Expected Error",
        };
        break;
      }
      case "ObjectParameterError": {
        error = {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: "MongoError: Object Parameter Error",
        };
        break;
      }
      case "OverwriteModelError": {
        error = {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: "MongoError: Overwrite Model Error",
        };
        break;
      }
      case "ParallelSaveError": {
        error = {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: "MongoError: Parallel Save Error",
        };
        break;
      }
      case "ParallelValidateError": {
        error = {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: "MongoError: Parallel Validate Error",
        };
        break;
      }
      case "StrictModeError": {
        error = {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: "MongoError: Strict Mode Error",
        };
        break;
      }
      case "ValidationError": {
        error = {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: "MongoError: Validation Error",
        };
        break;
      }
      case "ValidatorError": {
        error = {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: "MongoError: Validator Error",
        };
        break;
      }
      case "VersionError": {
        error = {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: "MongoError: Version Error",
        };
        break;
      }
      default: {
        error = {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: "Internal Error",
        };
        break;
      }
    }
    response.status(error.statusCode).json(error);
  }
}
