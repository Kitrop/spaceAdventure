import { Markup } from "telegraf";
import { InlineKeyboardMarkup } from "telegraf/src/core/types/typegram";

export const planetsButtons = () => {
  return Markup.inlineKeyboard([
    {text: "🌑Мои планеты", callback_data: "myPlanets"},
    {text: "🌌Выбрать путь", callback_data: "allPlanets"},
  ])
}


export const backButtons = () => {
  return Markup.inlineKeyboard([
    {text: "Назад", callback_data: "back"}
  ])
}