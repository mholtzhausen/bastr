const { flags } = require('@oclif/command')
const Command = require('../lib/CommandLog')
const stdIn = require('../lib/stdin')

const stringFunction = (str, args, flags) => {
  let regexModifier = `${flags.first ? '' : 'g'}${
    flags.casesensitive ? '' : 'i'
  }`
  let searchTerm = flags.regex
    ? new RegExp(args.searchTerm, regexModifier)
    : new RegExp(
        args.searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
        regexModifier
      )
  return str.replace(searchTerm, args.replaceTerm)
}

const arrayFunction = (array, args, flags) => {
  return array.map(item => stringFunction(item, args, flags))
}

class ReplaceCommand extends Command {
  async run() {
    const { flags, args } = this.parse(ReplaceCommand)
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

ReplaceCommand.args = [
  {
    name: 'searchTerm',
    required: true,
    description: 'The term to search for'
  },
  {
    name: 'replaceTerm',
    required: true,
    description: 'The term to replace searchTerm with'
  }
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

ReplaceCommand.flags = {
  regex: flags.boolean({
    char: 'r',
    description: 'use regular expression in search term'
  }),
  first: flags.boolean({
    char: 'f',
    description: 'only replace the first occurance',
    default: false
  }),
  casesensitive: flags.boolean({
    char: 'c',
    description: 'match only case sensitive occurances',
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

ReplaceCommand.description = `Replaces Values in strings or arrays`

module.exports = ReplaceCommand
