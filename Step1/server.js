console.log('Hello World')
//console.log(global)

const os = require('os')
const path = require('path')

// Here is the whole Path is Displayed
console.log(__filename)
// Here only the filename is Displayed
console.log(path.basename(__filename))


// console.log(os.type)
// console.log(os.homedir)
// console.log(os.version)
// console.log(__dirname)
// console.log(__filename)
// console.log(path.dirname(__filename))
// console.log(path.basename(__filename))
// console.log(path.extname(__filename))

// Path is a great Object that keeps different parts of the Extension -> an Object
console.log(path.parse(__filename))
