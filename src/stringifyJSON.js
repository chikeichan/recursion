// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:
var stringifyJSON = function(obj) {
  // your code goes here
  var answer = [];

  if (obj === null) {
  	answer += 'null';
  } else if (typeof obj === 'number') {
  	answer += obj.toString();
  } else if (typeof obj === 'boolean') {
  	answer += obj ? 'true' : 'false';
  } else if (typeof obj === 'string') {
  	answer += '"';
  	answer += obj;
  	answer += '"';
  } else if (Array.isArray(obj)){
  	answer += '[';
  	_.each(obj, function(x,i){
  		answer += stringifyJSON(x);
  		answer += i!==obj.length-1 ? ',': '';
  	});
  	answer += ']';
  } else if (typeof obj === 'object'){
  	var lastKeys = Object.keys(obj)[[Object.keys(obj).length-1]];
  	answer += '{';
  	_.each(obj, function(x,i){
  		if (typeof x !== 'function' && typeof x !== 'undefined') {
  			answer += stringifyJSON(i);
  			answer += ':';
  			answer += stringifyJSON(x);
  			answer += i!==lastKeys ? ',' : '';
  		}
  	});
  	answer += '}';
  } else if (typeof obj === 'function') {
  	answer+= '';
  }

  return answer;
};
