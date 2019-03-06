const { flags } = require('@oclif/command')
const Command = require('../lib/CommandLog')

const stdIn = require('../lib/stdin')

class JoinCommand extends Command {
  async run() {
    const { flags } = this.parse(JoinCommand)
    let str = await stdIn()

    if (str.isArray) {
      this.log(str.json.join(flags.glue))
    } else {
      this.log(str.string)
    }
  }
}
JoinCommand.flags = {
  glue: flags.string({
    char: 'g',
    description: 'glue to use on join',
    default: ' '
  })
}

JoinCommand.description = `Join multiple array elements together`
module.exports = JoinCommand
