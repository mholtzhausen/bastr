const { flags } = require('@oclif/command')
const Command = require('../lib/CommandLog')
const stdIn = require('../lib/stdin')

const stringFunction = (str, args, flags) => {
  return str
}
const arrayFunction = (array, args, flags) => {
  let indexes = args.indexes.split(',')
  let newArray = []
  let rstart = /^-/
  let rend = /-$/
  let rmid = /\d+-\d+/

  for (let idx = 0; idx < indexes.length; idx++) {
    let index = indexes[idx]
    if (rstart.test(index)) {
      if (rend.test(index))
        throw new Error('indexes can be either -#, # or #- but never -#-')
      let cIndex = parseInt(index.split('-')[1])
      if (cIndex >= 0 && cIndex < array.length) {
        newArray = [...newArray, ...array.slice(0, cIndex+1)]
      }
    } else if (rend.test(index)) {
      let cIndex = parseInt(index.split('-')[0])
      if (cIndex >= 0 && cIndex < array.length) {
        newArray = [...newArray, ...array.slice(cIndex, array.length)]
      }
    } else if (rmid.test(index)) {
      let [sIndex,eIndex] = index.split('-').map(d=>parseInt(d))
      if (sIndex >= 0 && sIndex < array.length && eIndex >= 0 && eIndex < array.length && sIndex<=eIndex) {
        newArray = [...newArray, ...array.slice(sIndex,eIndex+1)]
      }
    } else {
      let cIndex = parseInt(index)
      if (cIndex >= 0 && cIndex < array.length) {
        newArray.push(array[cIndex])
      }
    }
  }
  return newArray
}

class SelectCommand extends Command {
  async run() {
    const { flags, args } = this.parse(SelectCommand)
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

SelectCommand.args = [
  {
    name: 'indexes',
    require: true,
    description:
      "A list of indexes delimited by comma. Eg. '1,2,3' and '-3,5,6-'",
    required: true
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

SelectCommand.flags = {
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

SelectCommand.aliases = []

SelectCommand.description = `Selects array items by index list`

module.exports = SelectCommand
