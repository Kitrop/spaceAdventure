import { Module } from "@nestjs/common";
import { TelegrafModule } from "nestjs-telegraf";
import { session } from "telegraf";
import { ConfigModule } from "@nestjs/config";
import { MainScene } from "./scenes/main.scene";
import { PrismaService } from "./prisma.service";

@Module({
  imports: [
    ConfigModule.forRoot(),
    TelegrafModule.forRoot({
        token: process.env.TOKEN,
        middlewares: [session()]
      }
    )],
  controllers: [],
  providers: [MainScene, PrismaService]
})
export class AppModule {
}
