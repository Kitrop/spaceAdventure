import { Action, Ctx, Scene, SceneEnter } from "nestjs-telegraf";
import { PrismaService } from "../prisma.service";
import { SceneContext } from "telegraf/scenes";
import { planetsButtons } from "../buttons/planets.buttons";

@Scene("planet")
export class PlanetsScene {
  constructor(private readonly prismaService: PrismaService) {
  }

  @SceneEnter()
  async sceneEnter(@Ctx() ctx: SceneContext) {
    await ctx.reply("🌍Здесь вы можете осмотреть все планеты и выбрать на какую хотите отправиться. Выберите дальнейшие действия", planetsButtons());
  }

  @Action("myPlanets")
  async myPlanets(@Ctx() ctx: SceneContext) {
    const planets = await this.prismaService.baseOnPlanets.findMany({
      where: { baseId: 1 },
      include: {
        planet: true
      }
    });

    let msg = "";

    const planetList = planets.map((baseOnPlanet) => msg += baseOnPlanet.planet.name + "\n")
    console.log(msg);
  }

  @Action("allPlanets")
  async allPlanets(@Ctx() ctx: SceneContext) {
    const planets = await this.prismaService.baseOnPlanets.findMany({
      include: {
        planet: true
      }
    })

    let msg = "";
    const planetList = planets.map((baseOnPlanet) => msg += baseOnPlanet.planet.name + "\n")
    console.log(msg);
  }
}