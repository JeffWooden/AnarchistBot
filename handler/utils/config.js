const fs = require("fs")
module.exports = {
    name: "get_config",
    get_config(id){
        file = "./handler/configs/" + id + ".json"
        if(!fs.existsSync(file)){
            fs.copyFileSync("config.json", file)
        }
        return JSON.parse(fs.readFileSync(file, 'utf-8'))
    }
    
}