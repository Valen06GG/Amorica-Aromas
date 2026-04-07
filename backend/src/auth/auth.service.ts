import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private configService: ConfigService
    ) {}

    async login (username: string, password: string) {
        const USER = this.configService.get<string>("ADMIN_USERNAME");
        const PASS = this.configService.get<string>("ADMIN_PASSWORD");

        if (username !== USER || password !== PASS) {
            throw new UnauthorizedException("Credenciales inválidas");
        }

        const payload = { username };

        return {
            access_token: this.jwtService.sign(payload),
        }
    }
}