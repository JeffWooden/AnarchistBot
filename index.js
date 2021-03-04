const Discord = require("discord.js")
const bot = new Discord.Client()
const config = require("./config.json")
require("dotenv").config();

bot.once("ready", () => {
    console.log("Ready !")
})

bot.login(process.env.TOKEN)