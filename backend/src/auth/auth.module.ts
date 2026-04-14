import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { config as dotenvConfig } from "dotenv"

dotenvConfig({path: ".env"});

const JWT = process.env.JWT_SECRET;

@Module({
    imports: [
      JwtModule.register({
        secret: JWT,
        signOptions: { expiresIn: '1d' },
      }),
    ],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [JwtModule]
})
export class AuthModule {}