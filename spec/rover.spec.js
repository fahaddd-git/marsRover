const assert = require('assert');
const Message = require('../message.js')
const Command = require('../command.js')
const Rover = require('../rover.js')

let rover = new Rover(98382);
let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
let message = new Message('Test message with two commands', commands);
let response = rover.receiveMessage(message);


describe("Rover class", function(){
  it("constructor sets position and default values for mode and generatorWatts", function(){
    let testRover = new Rover(1234)
    assert.strictEqual(testRover.position, 1234)
    assert.strictEqual(testRover.generatorWatts, 110)
    assert.strictEqual(testRover.mode, "NORMAL")


  })

  it("response returned by receiveMessage contains name of message", function(){
    assert.strictEqual(response.message, message.name)
  })

  it("response returned by receiveMessage includes two results if two commands are sent in the message", function(){
    assert.strictEqual(response.results.length, 2)
    
  })

  it("responds correctly to status check command", function(){
    let newMessage = new Message('Check status command', [new Command('STATUS_CHECK')])
    let newRover = new Rover(12344)
    let newResponse = newRover.receiveMessage(newMessage)   
    assert.strictEqual(newResponse.results[0].roverStatus.position, 12344)
    assert.strictEqual(newResponse.results[0].roverStatus.generatorWatts, 110)
    assert.strictEqual(newResponse.results[0].roverStatus.mode, "NORMAL")
    assert.strictEqual(newResponse.results[0].completed, true)
    
  })

 it("responds correctly to mode change command", function(){
   assert.strictEqual(response.results[0].completed, true)
   assert.strictEqual(rover.mode, "LOW_POWER")
 })

 it("responds with false completed value when attempting to move in LOW_POWER mode", function(){
    let newMessage = new Message("Can't move in LOW POWER mode", [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE', '3333')])
    let newRover = new Rover(12344)
    let newResponse = newRover.receiveMessage(newMessage)
   assert.strictEqual(newResponse.results[1].completed, false)
 })

 it("responds with position for move command", function(){
    let newCommand = [new Command('MOVE', '3333')]
    let newMessage = new Message("change position", newCommand)
    let newRover = new Rover(12344)
    let newResponse = newRover.receiveMessage(newMessage)
    assert.strictEqual(newResponse.results[0].completed, true)
    assert.strictEqual(newRover.position, "3333")
 })

 it("completed false and a message for an unknown command", function(){
   let newCommand = [new Command('POTATOES', '3333')]
    let newMessage = new Message("false command", newCommand)
    let newRover = new Rover(12344)
    let newResponse = newRover.receiveMessage(newMessage)
    assert.strictEqual(newResponse.results[0].completed, false)
    assert.strictEqual(newResponse.results[0].message, "invalid entry")
 })


});

