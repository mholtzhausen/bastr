const { flags } = require('@oclif/command')
const Command = require('../lib/CommandLog')

const stdIn = require('../lib/stdin')

class JoinCommand extends Command {
  async run() {
    const { flags, args } = this.parse(JoinCommand)
    let str = await stdIn()

    if (str.isArray) {
      this.log(str.json.join(args.glue))
    } else {
      this.log(str.string)
    }
  }
}

JoinCommand.args = [
  {
    name: 'glue',
    default: ' ',
    description: 'Glue to use for join'
  }
]

JoinCommand.flags = {}

JoinCommand.description = `Join multiple array elements together`
module.exports = JoinCommand
