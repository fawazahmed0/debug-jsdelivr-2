const fs = require('fs')
const path = require('path')

async function test(){
let max = 1000
let obj = {}
let arr = Array.from(Array(max+1).keys())
    for(let i of shuffleArr(arr)){

        for(let j of shuffleArr(arr)){
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

function shuffleArr(arr){
return arr.map(value => ({ value, sort: Math.random() }))
  .sort((a, b) => a.sort - b.sort)
  .map(({ value }) => value)
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
