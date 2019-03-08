const { flags } = require('@oclif/command')
const Config = require('@oclif/config')
const Command = require('../../lib/CommandLog')
const stdIn = require('../../lib/stdin')
const Scripts = require('../../lib/Scripts')
const capcon = require('capture-console')



class ScriptsCommand extends Command {
  async run() {
    const { flags, args } = this.parse(ScriptsCommand)
    // let str = await stdIn()
    let out = null

    if(args.scriptName===null){
      return this.log(`You have to specify one of your scripts to run ( ${Object.keys(Scripts.get()).join(' | ')} )`)
    }

    let script=Scripts.get()[args.scriptName]

    let plugin = new Config.Plugin({
      root:__dirname,
      type: 'core',
      ignoreManifest: true,
      errorOnManifestCreate: true
    })
    await plugin.load()
    function findCommand(name){
      return plugin.commands.find(command=>command.id===name)
    }

    function getCommandFlags(command){
      let flagArray=[]
      command.flags.forEach(flag=>{
        if(flag.type==='boolean'){
          flagArray.push(`-${flag.char}`)
        }else{
          flagArray.push(`-${flag.char}="${flag.value}"`)
        }
      })
      return flagArray
    }

    function getCommandArgs(command){
      return command.args.map(arg=>`${arg.value}`)
    }


    if(flags['show-cli-equivalent']){
        let outCommands=[]
        script.commands.forEach(command => {
          let outCommand = ["bs",command.command]
          command.flags.forEach(flag=>{
            if(flag.type==='boolean'){
              outCommand.push(`-${flag.char}`)
            }else{
              outCommand.push(`-${flag.char}=${flag.value}`)
            }
          })

          command.args.forEach(arg=>{
            outCommand.push(`"${arg.value}"`)
          })
          outCommands.push(outCommand.join(' '))
        });
        return this.log(`\n${args.scriptName} :: ${outCommands.join(' | ')}\n`)
    }

    let str=await stdIn()
    stdIn.data=str.string

    for(let idx=0; idx<script.commands.length; idx++){
      let commandDef=script.commands[idx]
      let command = findCommand(commandDef.command)
      let argArr=[...getCommandFlags(commandDef), ...getCommandArgs(commandDef)]

      capcon.startIntercept(process.stdout,function(data){
        if(stdIn.data===null){
          stdIn.data=data
        }else{
          stdIn.data+=data
        }
      })
      await command.load().run(argArr)
      capcon.stopIntercept(process.stdout)
      let str=await stdIn()
      stdIn.data=str.string
    }

    this.log(stdIn.data)

  }
}

ScriptsCommand.args = [
  {
    name: 'scriptName',
    description: 'The script you want to apply',
    default: null
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

ScriptsCommand.flags = {
  'show-cli-equivalent':flags.boolean({
    char: 's',
    description: 'Show what this script would look like on bash',
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

ScriptsCommand.aliases = []

ScriptsCommand.description = `Apply a script to bash output`

module.exports = ScriptsCommand
