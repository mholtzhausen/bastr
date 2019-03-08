const { flags } = require('@oclif/command')
const Config = require('@oclif/config')
const Command = require('../../lib/CommandLog')
const stdIn = require('../../lib/stdin')
const path = require('path')
const inq = require('inquirer')
const Scripts = require('../../lib/Scripts')

let commands = {}

async function getArguments(commandName) {
  let args = commands[commandName].args
  let outArgs = []
  for (let idx = 0; idx < args.length; idx++) {
    let arg = args[idx]
    let response = await inq.prompt({
      type: 'input',
      name: arg.name,
      message: `[${commandName}.${arg.name}] :: ${arg.description} :`
    })
    outArgs.push(Object.assign({}, arg, { value: response[arg.name] }))
  }
  return outArgs
}

async function getFlags(commandName) {
  let command = commands[commandName]
  // console.log(command)
  let flags = command.flags
  let flagNames = Object.keys(flags)
  let outFlags = []

  // get list of flags to set
  if (flagNames.length > 0) {
    outFlags = (await inq.prompt({
      type: 'checkbox',
      name: 'selectedFlags',
      message: `Select the flags you want to set:`,
      choices: flagNames
    })).selectedFlags.map(flagName => flags[flagName])
  }

  for (let idx = 0; idx < outFlags.length; idx++) {
    let flag = outFlags[idx]
    let value = true
    if (flag.type !== 'boolean') {
      value = (await inq.prompt({
        type: 'input',
        name: 'value',
        message: `Set Flag: ${flag.description}`
      })).value
    }
    flag.value = value
  }

  return outFlags
}

async function addCommand() {
  let command = await inq.prompt({
    name: 'commandName',
    message: 'Select a command to add',
    choices: Object.keys(commands),
    type: 'rawlist'
  })

  let flags = await getFlags(command.commandName)
  let args = await getArguments(command.commandName)
  return { command: command.commandName, args, flags }
}

async function getNewScriptName() {
  let currentScripts = Object.keys(Scripts.get())

  let { name } = await inq.prompt({
    type: 'input',
    name: 'name',
    message: 'What do you want to call your new script: '
  })

  console.log({ currentScripts, name })

  if (currentScripts.indexOf(name) >= 0) {
    console.log('That script name is already taken. Please select another name')
    return await getNewScriptName()
  }

  let { description } = await inq.prompt({
    type: 'input',
    name: 'description',
    message: 'What is the purpose of your new script: '
  })

  console.log({ name, description })

  return { name, description }
}

async function getCommands() {
  let done = false
  let commands = []
  while (!done) {
    let command = await addCommand()
    commands.push(command)

    let { anotherStep } = await inq.prompt({
      type: 'confirm',
      message: 'Do you want to add another step?',
      name: 'anotherStep',
      default: true
    })

    done = !anotherStep
  }
  return commands
}

class ScriptsAddCommand extends Command {
  async run() {
    const { flags, args } = this.parse(ScriptsAddCommand)
    let root = path.resolve(__dirname)

    // get command list
    let plugin = new Config.Plugin({
      root,
      type: 'core',
      ignoreManifest: true,
      errorOnManifestCreate: true
    })
    await plugin.load()
    commands = plugin.manifest.commands

    // load recipes
    let newScript = await getNewScriptName()
    newScript.commands = await getCommands()

    Scripts.set(Object.assign({},Scripts.get(),{[newScript.name]:newScript}))

    this.log(newScript)
  }
}

ScriptsAddCommand.args = [
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

ScriptsAddCommand.flags = {
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

ScriptsAddCommand.aliases = []

ScriptsAddCommand.description = `Add a new Script`

module.exports = ScriptsAddCommand
