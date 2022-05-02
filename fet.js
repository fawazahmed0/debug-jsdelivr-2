const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
let issueURL = 'https://github.com/jsdelivr/jsdelivr/issues/18393'
async function test(){
  let max = 1000
        for(let i=0;i<=max;i++){
    
            for(let j=0;j<=max;j++){
                let url = `https://cdn.jsdelivr.net/gh/fawazahmed0/debug-jsdelivr-2@1/data/${i}/${j}.json`
          let res = await fetch(url)
          if(!res.ok){
          await sendMessage(process.env.userdata.trim(),process.env.passdata.trim(),'fawazahmed0@hotmail.com', 'JSDelivr URL Failed', `Failed url ${url}\n Refer ${issueURL}`);
         
          await sendMessage(process.env.userdata.trim(),process.env.passdata.trim(),'dakulovgr@gmail.com', 'JSDelivr URL Failed', `Failed url ${url}\n Refer ${issueURL}`);
       
          await sendMessage(process.env.userdata.trim(),process.env.passdata.trim(),'martin@kolarik.sk', 'JSDelivr URL Failed', `Failed url ${url}\n Refer ${issueURL}`);
       
         
          fs.appendFileSync(path.join(__dirname, "failedurl.txt"), url+'\n')
          console.log('error url ',url)
          }

            }
    
    
    
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
