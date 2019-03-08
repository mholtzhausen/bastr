const fs = require('fs')
const path = require('path')
const REPLACE = process.env.REPLACE
const STORE_VERSION = 'zzBS_VERSIONzz'
const STORE_HELP = 'zzBS_HELPzz'

let readme = fs.readFileSync(path.resolve(__dirname, '../README.md')).toString()

// Store version bs usage
readme = readme.replace(/\$ bs \(-v\|--version\|version\)/g, STORE_VERSION)
readme = readme.replace(/\$ bs --help \[COMMAND\]/g, STORE_HELP)

// Fix all bs usages
readme = readme.replace(/\$ bs /g, '$ (someProcess) | bs ')

// Fix command documentation list
readme = readme.replace(/\* \[`bs /g, '* [`(someProcess) | bs ')
readme = readme.replace(/\(#bs-/g, '(#someprocess--bs-')

// Fix command documentation headings
readme = readme.replace(/## `bs /g, '### `(someProcess) | bs ')

// Script exceptions
readme = readme.replace(/\(someProcess\) \| bs script:/g, 'bs script:')


// ReStore version bs usage
readme = readme.replace(new RegExp(STORE_VERSION,'g'), '$ bs (-v|--version|version)')
readme = readme.replace(new RegExp(STORE_HELP,'g'), '$ bs --help [COMMAND]')

fs.writeFileSync(
  path.resolve(__dirname, `../README${REPLACE ? '' : '.test'}.md`),
  readme
)
