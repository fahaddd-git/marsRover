
class Rover{
  constructor(position, mode='NORMAL', generatorWatts=110){
    this.position= position;
    this.mode=mode
    this.generatorWatts=generatorWatts
    
  }
  receiveMessage (inputMessage){
    let resultArr= []
    let resultObj = {};

    for (let i=0; i<inputMessage.commands.length;i++){
      if (inputMessage.commands[i].commandType === "STATUS_CHECK"){
        resultObj["completed"] = true
        resultObj["roverStatus"]= {position: this.position, mode: this.mode, generatorWatts: this.generatorWatts}
        resultArr.push(resultObj)

      } else if (inputMessage.commands[i].commandType==="MODE_CHANGE"){
        this.mode = inputMessage.commands[i].value
        resultObj["completed"] = true
        resultArr.push(resultObj)
        
     } else if (inputMessage.commands[i].commandType === 'MOVE') {
				if (this.mode === 'LOW_POWER') {
          resultObj["completed"] = false
          resultArr.push(resultObj)
				} else {
					this.position = inputMessage.commands[i].value;
				resultObj["completed"] = true
        resultArr.push(resultObj)
				}

      }  else {
        resultObj["completed"] = false
        resultObj["message"] = "invalid entry"
        resultArr.push(resultObj)
      }
      

    
    
  }
  return {message: inputMessage.name, results: resultArr}
}
}




module.exports = Rover