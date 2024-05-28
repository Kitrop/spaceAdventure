import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TelegrafModule } from "nestjs-telegraf";
import {session} from 'telegraf'
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot(),
    TelegrafModule.forRoot({
    token: process.env.TOKEN,
    middlewares: [session()],
    }
  )],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
