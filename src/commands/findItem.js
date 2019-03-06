const { flags } = require('@oclif/command')
const Command = require('../lib/CommandLog')

const stdIn = require('../lib/stdin')

class FindItemCommand extends Command {
  async run() {
    const { flags, args } = this.parse(FindItemCommand)
    let str = await stdIn()

    if (str.isArray) {
      let newArr = str.json.filter(item => {
        // this.log(`looking for ${args.searchTerm} in ${item}`)
        return item.indexOf(args.term) >= 0
      })
      this.log(newArr)
    }
  }
}

FindItemCommand.args = [
  { name: 'term', required: true, description: 'The term to search for' }
]

FindItemCommand.description = `Get an Item from an array, or a character from a string`
module.exports = FindItemCommand
