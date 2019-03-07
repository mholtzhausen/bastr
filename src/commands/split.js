const { flags } = require('@oclif/command')
const Command = require('../lib/CommandLog')
const stdIn = require('../lib/stdin')

class SplitCommand extends Command {
  async run() {
    const { flags, args } = this.parse(SplitCommand)
    let str = await stdIn()
    let delim = flags.regex ? new RegExp(args.delimiter) : args.delimiter
    this.log(JSON.stringify(str.string.split(delim)))
  }
}
SplitCommand.args = [
  {
    name: 'delimiter',
    description: 'Delimiter to use as split point',
    default: ' ',
    required: true
  }
]

SplitCommand.flags = {
  regex: flags.boolean({
    char: 'r',
    description: 'Delimiter is regex',
    default: false
  })
}

SplitCommand.description = `Split string into array`
module.exports = SplitCommand
