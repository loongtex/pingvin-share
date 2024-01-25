import { Module } from "@nestjs/common";

import { ScheduleModule } from "@nestjs/schedule";
import { AuthModule } from "./auth/auth.module";

import { APP_GUARD } from "@nestjs/core";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { ConfigModule } from "./config/config.module";
import { EmailModule } from "./email/email.module";
import { FileModule } from "./file/file.module";
import { JobsModule } from "./jobs/jobs.module";
import { PrismaModule } from "./prisma/prisma.module";
import { ShareModule } from "./share/share.module";
import { UserModule } from "./user/user.module";
import { ClamScanModule } from "./clamscan/clamscan.module";
import { ReverseShareModule } from "./reverseShare/reverseShare.module";
import { AppController } from "./app.controller";
import { OAuthModule } from "./oauth/oauth.module";
import { CacheModule } from "@nestjs/cache-manager";

@Module({
  imports: [
    AuthModule,
    ShareModule,
    FileModule,
    EmailModule,
    PrismaModule,
    ConfigModule,
    JobsModule,
    UserModule,
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 100,
    }),
    ScheduleModule.forRoot(),
    ClamScanModule,
    ReverseShareModule,
    OAuthModule,
    CacheModule.register({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
