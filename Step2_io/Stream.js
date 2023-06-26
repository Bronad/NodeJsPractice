const fs = require('fs');

// The Streams are created here. the Reader takes the encoding of the Data. 
const rs = fs.createReadStream('./Step2_io/files/data1.txt',{encoding: 'utf-8'});
// The Writer just takes the Flie to drop it into. Which is automaticlly created here.
const ws = fs.createWriteStream('./Step2_io/files/newdata1.txt');

// This is a Listener that does something on the Stream getting data -> 'data' is the Keyword for that.
// dataChunk is the Data that is Stored in there. 
//
// rs.on('data', (dataChunk) => {
//     ws.write(dataChunk);
// })

// Does the Same as the Upper thing. Pipes Stream a to Stream b
rs.pipe(ws);