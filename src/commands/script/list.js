const { flags } = require('@oclif/command')
const Command = require('../../lib/CommandLog')
const Scripts = require('../../lib/Scripts')


class ScriptsListCommand extends Command {
  async run() {
    const scripts=Scripts.get()
    const scriptNames=Object.keys(scripts)
    const { flags, args } = this.parse(ScriptsListCommand)
    this.log('Scripts')
    this.log('--------------')
    scriptNames.forEach(scriptName=>this.log(`  - ${scriptName}`))
    this.log('--------------')
    this.log('\n\n')

  }
}

ScriptsListCommand.args = [
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

ScriptsListCommand.flags = {
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

ScriptsListCommand.aliases = []

ScriptsListCommand.description = `List your Scripts`

module.exports = ScriptsListCommand
