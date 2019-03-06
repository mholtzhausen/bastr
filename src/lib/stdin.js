const getStdin = require('get-stdin')


module.exports = async function(){
  let string=await getStdin()
  let json=null;

  try{
    json=JSON.parse(string)
  }catch(e){}


  let stdin={
    string,
    json,
    isArray: Array.isArray(json)
  }
  return stdin
}
