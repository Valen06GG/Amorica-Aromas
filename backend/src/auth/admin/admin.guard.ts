import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean {
    const request = context.switchToHttp().getRequest();

    const adminKey = request.headers['x-admin-key'];

    if (!adminKey || adminKey !== process.env.ADMIN_KEY) {
      throw new UnauthorizedException('No autorizado');
    }

    return true;
  }
}
