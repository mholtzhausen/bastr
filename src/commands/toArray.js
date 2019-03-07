const { flags } = require('@oclif/command')
const Command = require('../lib/CommandLog')
const stdIn = require('../lib/stdin')

class ToArrayCommand extends Command {
  async run() {
    let str = await stdIn()
    if (!str.isArray) {
      this.log(str.string.split('\n'))
    }
  }
}

ToArrayCommand.aliases = ['lineSplit', 'line2array', 'lineArray']

ToArrayCommand.description = `Split string into array`
module.exports = ToArrayCommand
