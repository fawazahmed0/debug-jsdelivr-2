const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

async function test(){
  let max = 1000
        for(let i=0;i<=max;i++){
    
            for(let j=0;j<=max;j++){
                let url = `https://cdn.jsdelivr.net/gh/fawazahmed0/debug-jsdelivr-2@1/data/${i}/${j}.json`
          let res = await fetch(url)
          if(!res.ok){
          fs.appendFileSync(path.join(__dirname, "failedurl.txt"), url+'\n')
          console.log('error url ',url)
          }

            }
    
    
    
        }
    
    
    
    }
    
    
    
    test()