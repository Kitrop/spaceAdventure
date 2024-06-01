import { Action, Ctx, On, Scene, SceneEnter } from "nestjs-telegraf";
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
    const planetList = planets.map((baseOnPlanet) => msg += `${baseOnPlanet.planet.id}. ` + baseOnPlanet.planet.name + "\n")
    console.log(msg);

    ctx.scene.enter("")
  } 
}

@Scene("enterPlanet")
export class EnterPlanet {

  constructor(private readonly prismaService: PrismaService) {}

  @SceneEnter()
  async sceneEnter(@Ctx() ctx: SceneContext) {
    await ctx.reply("Выберите нужную планету")
  }

  @Action("back")
  async back(@Ctx() ctx: SceneContext) {
    ctx.scene.enter("main")
  }

  @On("text")
  async peekPlanet(@Ctx() ctx: SceneContext) {
    // @ts-ignore
    const message = ctx.message.text

    const idPlanet = Number(message)
    
    if (isNaN(+message)) await ctx.reply("Введите число")
    else {
      const findPlanet = await this.prismaService.planets.findUnique({ where: { id: +message }})
      
      if (!findPlanet) await ctx.reply("Планета не найдена")
      else {
        await ctx.scene.enter("attackPlanet")
      }
    }
  }
}

@Scene("attackPlanet")
export class AttackPlanet {

  constructor(private readonly prismaService: PrismaService) {}

  @SceneEnter()
  async sceneEnter(@Ctx() ctx: SceneContext) {
    const freeShips = await this.prismaService.myShips.findMany({
      where: {
        telegram_id: ctx.from.id,
        whereId: 1
      },
      include: {
        ship: true
      }
    })
    
    let msg = ''
    freeShips.map(el => {
      msg += `${el.id}. ` + `${el.ship.name}`
    })

    console.log(msg )
  } 
}