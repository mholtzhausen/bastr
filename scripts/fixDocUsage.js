const fs = require('fs')
const path = require('path')
const REPLACE = process.env.REPLACE
let readme = fs.readFileSync(path.resolve(__dirname,'../README.md')).toString()

fs.writeFileSync(path.resolve(__dirname,`../README${REPLACE?'':'.test'}.md`),readme.replace(/  \$ bs /g,'  $ (someProcess) | bs '))

