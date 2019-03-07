const getStdin = require('get-stdin')
const stripAnsi = require('strip-ansi')

const stdinFunc = async function() {
  let string
  if (stdinFunc.data !== null) {
    string = stdinFunc.data
    stdinFunc.data = null
  } else {
    string = await getStdin()
  }
  string = stripAnsi(string)
  let json = null

  try {
    json = JSON.parse(string)
  } catch (e) {}

  let stdin = {
    string,
    json,
    isArray: Array.isArray(json)
  }
  return stdin
}

stdinFunc.data = null

module.exports = stdinFunc
