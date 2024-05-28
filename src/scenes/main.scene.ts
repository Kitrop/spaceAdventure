import { Action, Ctx, Scene, SceneEnter } from "nestjs-telegraf";
import { SceneContext } from "telegraf/scenes";
import { startButtons } from "../buttons/start.button";
import { PrismaService } from "../prisma.service";


@Scene("main")
export class MainScene {

  constructor(private readonly prismaService: PrismaService) {}

  @SceneEnter()
  async start(@Ctx() ctx: SceneContext) {
    await ctx.reply("Приветствую вас в космосе! 🚀 Здесь у вас есть уникальная возможность управлять космической базой," +
      " добывать ресурсы и сражаться за планеты у пришельцев. 🛸 Вы сможете создавать мощные космические корабли," +
      " улучшать их и расширять свои возможности во вселенной. Приготовьтесь к захватывающему космическому приключению! " +
      "🌌 Начните свое путешествие ", startButtons())
  }

  @Action("resources")
  async resource(@Ctx() ctx: SceneContext) {
    const data = await this.prismaService.base.findUnique({where: {telegram_id: ctx.from.id}})
    await ctx.reply(`Ваши ресурсы: титан - ${data.titan}\n золото - ${data.gold}\n медь - ${data.cooper}\n алюминий - ${data.aluminum}\n железо - ${data.iron}\n`)
  }

  @Action("planets")
  async planets(@Ctx() ctx: SceneContext) {
    await ctx.scene.enter("planets")
  }
}