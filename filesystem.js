var fs=require('fs')
var os=require('os')
var user=os.userInfo();
console.log(user);
console.log(user.username);

fs.appendFile('greeting.txt','HI ' + user.username + '!\n',()=>{
    console.log("your file is created")
});