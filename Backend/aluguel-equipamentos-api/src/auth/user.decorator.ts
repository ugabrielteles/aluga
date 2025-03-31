import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Usuario } from './entities/usuario.entity';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): Usuario => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);