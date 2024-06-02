console.log("note is loaded...")
//but if user want to export another file they have to use EXPORT MODULES..
var age=24;

var ageNumber = function(a,b){
    return a+b;
}

module.exports={
    age,
    ageNumber
}