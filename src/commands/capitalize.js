const { flags } = require('@oclif/command')
const Command = require('../lib/CommandLog')
const stdIn = require('../lib/stdin')

const stringFunction = (str, args, flags) => {
  let capitalize = flags.all
    ? flags.decapitalize
      ? str => str.toLowerCase()
      : str => str.toUpperCase()
    : flags.decapitalize
    ? str =>
        `${str
          .trim()
          .charAt(0)
          .toLowerCase()}${str.slice(1)}`
    : str =>
        `${str
          .trim()
          .charAt(0)
          .toUpperCase()}${str.slice(1)}`
  return capitalize(str)
}

const arrayFunction = (array, args, flags) => {
  return array.map(item => stringFunction(item, args, flags))
}

class CapitalizeCommand extends Command {
  async run() {
    const { flags, args } = this.parse(CapitalizeCommand)
    let str = await stdIn()
    let out = null

    if (str.isArray) {
      out = arrayFunction(str.json, args, flags)
    } else {
      out = stringFunction(str.string, args, flags)
    }

    if (out) this.log(out)
  }
}

CapitalizeCommand.args = [
  // {
  //	 name: 'file',							 // name of arg to show in help and reference with args[name]
  //	 required: false,						// make the arg required with `required: true`
  //	 description: 'output file', // help description
  //	 hidden: true,							 // hide this arg from help
  //	 parse: input => 'output',	 // instead of the user input, return a different value
  //	 default: 'world',					 // default value if no arg input
  //	 options: ['a', 'b'],				// only allow input to be from a discrete set
  // }
]

CapitalizeCommand.flags = {
  decapitalize: flags.boolean({
    char: 'd',
    description: 'De-Capitalize instead',
    default: false
  }),
  all: flags.boolean({
    char: 'a',
    description: 'Target all letters, not just first',
    default: false
  })
  // name: flags.string({
  //	 char: 'n',										// shorter flag version
  //	 description: 'name to print', // help description for flag
  //	 hidden: false,								// hide from help
  //	 multiple: false,							// allow setting this flag multiple times
  //	 env: 'MY_NAME',							 // default to value of environment variable
  //	 options: ['a', 'b'],					// only allow the value to be from a discrete set
  //	 parse: input => 'output',		 // instead of the user input, return a different value
  //	 default: 'world',						 // default value if flag not passed (can be a function that returns a string or undefined)
  //	 required: false,							// make flag required (this is not common and you should probably use an argument instead)
  //	 dependsOn: ['extra-flag'],		// this flag requires another flag
  //	 exclusive: ['extra-flag'],		// this flag cannot be specified alongside this other flag
  // }),
  // // flag with no value (-f, --force)
  // force: flags.boolean({
  //	 char: 'f',
  //	 default: true,								// default value if flag not passed (can be a function that returns a boolean)
  //	 // boolean flags may be reversed with `--no-` (in this case: `--no-force`).
  //	 // The flag will be set to false if reversed. This functionality
  //	 // is disabled by default, to enable it:
  //	 // allowNo: true
  // }),
}

CapitalizeCommand.aliases = ['cap']

CapitalizeCommand.description = `Capitalizes string or [string]`

module.exports = CapitalizeCommand
