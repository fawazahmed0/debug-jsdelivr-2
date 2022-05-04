const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
const util = require('util')
const exec = util.promisify(require('child_process').exec)
let issueURL = 'https://github.com/jsdelivr/jsdelivr/issues/18393'
let apiURL = 'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest'
async function test(){
    let curr = await fetch(`${apiURL}/currencies.json`).then(res=>res.json())


    for(let value of shuffleArr(Object.keys(curr))){
        await testURL(`${apiURL}/currencies/${value}.json`)
        await testURL(`${apiURL}/currencies/${value}.min.json`)
        for(let innervalue of shuffleArr(Object.keys(curr))){
            await testURL(`${apiURL}/currencies/${value}/${innervalue}.json`)
            await testURL(`${apiURL}/currencies/${value}/${innervalue}.min.json`)
        }
    }
    
    
    
    }

function shuffleArr(arr){
return arr.map(value => ({ value, sort: Math.random() }))
  .sort((a, b) => a.sort - b.sort)
  .map(({ value }) => value)
}

async function testURL(url){
    let res
    for (let k = 0; k <= 5; k++) {
        try {
            res = await fetch(url)
            if (res.ok || res.ok == false)
                break
            
        } catch (e) {
            await new Promise(r => setTimeout(r, 2000));
            console.error(e)
        }
    }



    if(res == undefined || !res.ok){
      let output = await exec(`curl -k -I ${url}`)
      output = JSON.stringify(output, null, 4)
    await sendMessage(process.env.userdata.trim(),process.env.passdata.trim(),'fawazahmed0@hotmail.com', 'JSDelivr URL Failed', `Failed url ${url}\n Refer ${issueURL} \n ${output} \n This is an automated notification email`);
    
    //await sendMessage(process.env.userdata.trim(),process.env.passdata.trim(),'dakulovgr@gmail.com', 'JSDelivr URL Failed', `Failed url ${url}\n Refer ${issueURL} \n This is an automated notification email`);
    
    //await sendMessage(process.env.userdata.trim(),process.env.passdata.trim(),'martin@kolarik.sk', 'JSDelivr URL Failed', `Failed url ${url}\n Refer ${issueURL} \n This is an automated notification email`);
    
    
    fs.appendFileSync(path.join(__dirname, "failedurl.txt"), url+'\n'+output+'\n')
    console.log('error url ',url)
    console.log('error response ',output)
    }
}

    
    async function sendMessage(userName, password, sendTo, subject, message) {
      const transporter = nodemailer.createTransport({
        host: "smtp.yandex.com",
        port: 465,
        secure: true, // upgrade later with STARTTLS
        auth: {
          user: userName,
          pass: password,
        },
      });
      
      let info = await transporter.sendMail({
          from: userName, // sender address
          to: sendTo, // list of receivers
          subject: subject, // Subject line
          text: message, // plain text body
         // html: "<b>Hello world?</b>", // html body
        });
      
        return info.messageId;
       
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      
      
      }
    
    test()
