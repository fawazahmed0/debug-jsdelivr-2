const fs = require('fs')
const path = require('path')

async function test(){
let max = 1000
let obj = {}
    for(let i=0;i<=max;i++){

        for(let j=0;j<=max;j++){
            obj['data'] = getRandomInt(Number.MAX_SAFE_INTEGER)

            let dirPath = path.join(__dirname,'data', `${i}`)
            fs.mkdirSync(dirPath, {
                recursive: true
              });

      fs.writeFileSync(path.join(dirPath,`${j}.json`), JSON.stringify(obj, null, 4))

        }



    }



}



test()



function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }