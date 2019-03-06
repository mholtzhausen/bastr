const { Command } = require('@oclif/command')

class CommandLog extends Command {
  log(arg) {
    super.log.apply(
      {},
      Array.prototype.slice.call(arguments).map(arg=>typeof arg === 'object' ? JSON.stringify(arg, null, 2) : arg)
    )
  }
}

module.exports = CommandLog
