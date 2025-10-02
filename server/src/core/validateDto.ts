import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";

export function validateDto(dtoClass: any) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dtoObj = plainToInstance(dtoClass, req.body);
    const errors = await validate(dtoObj);

    if (errors.length > 0) {
      const mensagens = errors
        .map((err) => Object.values(err.constraints || {}))
        .flat();
      return res.status(400).json({ erros: mensagens });
    }

    req.body = dtoObj;
    next();
  };
}
