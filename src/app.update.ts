import { Ctx, InjectBot, Start, Update } from "nestjs-telegraf";
import { Injectable } from "@nestjs/common";
import { Context, Telegraf } from "telegraf";
import { SceneContext } from "telegraf/scenes";

@Update()
@Injectable()
export class AppUpdate {
  constructor(@InjectBot() private readonly bot: Telegraf<Context>) {
  }

  @Start()
  async start(@Ctx() ctx: SceneContext) {
    await ctx.scene.enter("")
  }
}