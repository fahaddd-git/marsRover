const assert = require('assert');
const Message = require('../message.js')
const Command = require('../command.js')


describe("Message class", function() {
  
  it("throws error if command type is NOT passed into constructor as the first parameter", function() {
    assert.throws(function() {
      new Message();
      },
      {
        message: 'Name required.'
      }
    );
  });
  it("constructor sets name", function() {
    let result = new Message("Potato");
    assert.notStrictEqual(result.name, undefined)
  })

  it("contains a commands array passed into the constructor as 2nd argument", function(){
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let test = new Message("x", commands);
    assert.strictEqual(test.commands, commands)
  })

});