import { InjectBot, Start, Update } from "nestjs-telegraf";
import { Injectable } from "@nestjs/common";
import { Context, Telegraf } from "telegraf";

@Update()
@Injectable()
export class AppUpdate {
  constructor(@InjectBot() private readonly bot: Telegraf<Context>) {
  }

  @Start()
  async start(ctx: Context) {
    await ctx.reply("hi")
  }
}