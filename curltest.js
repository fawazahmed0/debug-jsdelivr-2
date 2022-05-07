const nodemailer = require('nodemailer');
const util = require('util')
const exec = util.promisify(require('child_process').exec)
let issueURL = 'https://github.com/jsdelivr/jsdelivr/issues/18393'
async function test() {
  let max = 1000
  let arr = Array.from(Array(max + 1).keys())
  for (let i of shuffleArr(arr)) {

    for (let j of shuffleArr(arr)) {
      await testURL(`https://cdn.jsdelivr.net/gh/fawazahmed0/debug-jsdelivr-2@1/data/${i}/${j}.json`)
    }



  }



}

function shuffleArr(arr) {
  return arr.map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
}

async function testURL(url){

  try {
    await exec(`curl -f -v ${url}`)
  }catch(error){
    console.log('error url ',url)
    console.error(error)
    let output = util.inspect(error)
    await sendMessage(process.env.userdata.trim(),process.env.passdata.trim(),'fawazahmed0@hotmail.com', 'JSDelivr URL Failed', `Failed url ${url}\n Refer ${issueURL} \n ${output} \n This is an automated notification email`);
    await sendMessage(process.env.userdata.trim(),process.env.passdata.trim(),'martin@kolarik.sk', 'JSDelivr URL Failed', `Failed url ${url}\n Refer ${issueURL} \n ${output} \n This is an automated notification email`);
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
