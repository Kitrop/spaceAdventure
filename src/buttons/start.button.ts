import { Markup } from "telegraf";
import { InlineKeyboardMarkup } from "telegraf/src/core/types/typegram";

export const startButtons = () => {
  return Markup.inlineKeyboard([
    {text: "🚀Мои корабли", callback_data: "myShips"},
    {text: "🪐Планеты", callback_data: "planets"},
    {text: "⚒️Крафты", callback_data: "crafts"},
    {text: "💎Ресурсы", callback_data: "resources"},
  ])
}

