const Command = require('../lib/CommandLog')
const stdIn = require('../lib/stdin')

class CapitalizeCommand extends Command {
  async run() {
    let capitalize = str=>`${str.trim().charAt(0).toUpperCase()}${str.slice(1)}`

    let str = await stdIn()
    if(str.isArray){
      this.log(JSON.stringify(str.json.map(capitalize)))
    }else{
      this.log(capitalize(str.string))
    }
  }
}

CapitalizeCommand.description = `Capitalize string or [string]`

module.exports = CapitalizeCommand
