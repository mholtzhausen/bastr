const { flags } = require('@oclif/command')
const Command = require('../lib/CommandLog')
const stdIn = require('../lib/stdin')

class GetItemCommand extends Command {
  async run() {
    const { flags, args } = this.parse(GetItemCommand)
    let str = await stdIn()

    if (str.isArray) {
      if (args.index <= str.json.length && args.index >= 0) {
        this.log(str.json[args.index])
      }
    } else {
      if (args.index <= str.string.length && args.index >= 0) {
        this.log(str.string[args.index])
      }
    }
  }
}
GetItemCommand.args = [{ name: 'index', description:'Zero-based index for the array item to select', default: 0 }]
GetItemCommand.aliases = ['get','select']

GetItemCommand.description = `Get an Item from an array, or a character from a string`
module.exports = GetItemCommand
