// test cases are described in fixtures.js
describe('stringifyJSON', function(){
  it('should match the result of calling JSON.stringify', function(){

    stringifiableObjects.forEach(function(test){
      var result = stringifyJSON(test);
      var expected = JSON.stringify(test);

       
      //FOR DEBUGGING
      /*
      console.log('Input    : '+test);
      console.log('Expected : '+expected);
      console.log('Actual   : '+result);
      console.log('---------------------');
      */

      expect(result).to.equal(expected);
    });

    unstringifiableValues.forEach(function(obj){
      var result = stringifyJSON(obj);
      var expected = JSON.stringify(obj);

       
      //FOR DEBUGGING
      /*
      console.log('Input    : '+obj);
      console.log('Expected : '+expected);
      console.log('Actual   : '+result);
      console.log('---------------------');
      */

      expect(result).to.equal(expected);
    });

  });
});
