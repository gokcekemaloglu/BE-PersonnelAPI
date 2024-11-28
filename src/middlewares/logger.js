/* -------------------------------------- */
// Morgan
        
const morgan = require("morgan")
        
// app.use(morgan("tiny"))
// app.use(morgan("short"))
// app.use(morgan("dev"))
// app.use(morgan("common"))
// app.use(morgan("combined"))
// Custom Log: 
// app.use(morgan("TIME=':date[iso]' - - URL=':url' - Method=':method' - IP=':remote-addr' - Status=':status' - Sign=':user-agent' (:response-time[digits] ms) "))
/* -------------------------------------- */
// Write to file - Day by Day

const fs = require("node:fs")
const now = new Date()
// console.log(typeof now)
// console.log(now)
const today = now.toISOString().split("T")[0]
console.log(today)
module.exports = morgan("combined", {
    stream: fs.createWriteStream(`./logs/${today}.log`, {flags: "a+"})
}) // logs dosyasını kendimiz açıyoruz
