import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { MongooseError } from "mongoose";
import { Response } from "express";

@Catch(MongooseError)
export class MongoExceptionFilter implements ExceptionFilter {
  catch(exception: MongooseError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    // const request = ctx.getRequest();

    let error: { statusCode: any; message?: string };

    console.log(exception.name);

    switch (exception.name) {
      case "DocumentNotFoundError": {
        error = {
          statusCode: HttpStatus.NOT_FOUND,
          message: "Not Found",
        };
        break;
      }
      // general Mongoose error
      case "MongooseError": {
        error = {
          statusCode: HttpStatus.NOT_FOUND,
          message: "Not Found",
        };
        break;
      }
      case "CastError": {
        error = {
          statusCode: HttpStatus.NOT_FOUND,
          message: "MongoDb Cast Error",
        };
        break;
      }
      // case 'DisconnectedError': { break; }
      // case 'DivergentArrayError': { break; }
      // case 'MissingSchemaError': { break; }
      // case 'ValidatorError': { break; }
      // case 'ValidationError': { break; }
      // case 'ObjectExpectedError': { break; }
      // case 'ObjectParameterError': { break; }
      // case 'OverwriteModelError': { break; }
      // case 'ParallelSaveError': { break; }
      // case 'StrictModeError': { break; }
      // case 'VersionError': { break; }
      default: {
        error = {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: "Internal Error",
        };
        break;
      }
    }
    console.log(error);
    // response.status(error.statusCode).send(error);
    response.status(error.statusCode).json(error);
  }
}
