const { flags } = require('@oclif/command')
const Command = require('../lib/CommandLog')
const stdIn = require('../lib/stdin')

class LineArrayCommand extends Command {
  async run() {
    let str = await stdIn()
    if (!str.isArray) {
      this.log(str.string.split('\n'))
    }
  }
}

LineArrayCommand.description = `Split string into array`
module.exports = LineArrayCommand
