module.exports = {
    /*
              __  ___  ___
        \  / /  \  |  |__ 
         \/  \__/  |  |___
    
    */
    name: "vote",
    description: "Lance un vote à l'issu duquel la communauté tranchera",
    syntax: "vote (mute|ban|config) <parameter> [second parameter] <reason>",
    execute(msg, args, config){
        msg.reply("Hello World !")
    }
}