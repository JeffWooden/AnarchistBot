const Discord = require("discord.js")
const client = new Discord.Client()
const config = require("./config.json")
require("dotenv").config();

client.once("ready", () => {
    console.log("Ready !")
})

client.login(process.env.TOKEN)