// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
  // your code goes here
  var jsonArray = json.split(/([\[\],\'\"\{\}: \\])/);
  var newArray = [];
  var tempArray = [];
  var index = 0;
  var token;
  var answer;
  var escaped = false;

  //Construct an array deliminated by {}[],'"\:
  for (var i = 0; i < jsonArray.length; i++) {
    var temp = jsonArray[i];
    if (temp!='') {
      tempArray.push(temp);  
    }
  }

  //Construct an array with consideration for escapes
  for (var i = 0; i < tempArray.length; i++) {
    var temp = tempArray[i];

    if (!escaped && temp === '\\') {
      escaped = true;
    } else if (escaped) {
      if(temp === '"' || temp === "'") {
        newArray.push('\\'+temp);
      } else {
        newArray.push(temp);
      }
      escaped = false;
    } else {
      newArray.push(temp);
    }
  }

  var parseNext = function(){
    token = newArray[index];
    index++;
    var temp;
    
    if(token!==undefined) {

      if(token === '"' || token === "'" ) {
        temp = parseString();
      } else if (token.search(/[0-9]/) >= 0) {
        temp = +token;
      } else if (token === '[') {
        temp = parseArray();
      } else if (token === '{') {
        temp = parseObject();
      } else if (token === 'null') {
        temp = null;
      } else if (token === 'true') {
        temp = true;
      } else if (token === 'false') {
        temp = false;
      } else if (token === ' ') {
        temp = parseNext();
      } else {
        temp = token;
      }
    } else {
      temp = undefined;
    }
    token = temp;
    
    return temp;
  }

  var parseArray = function(){
    var temp = [];
    if (newArray[index] === ']') {
      index++;
      return temp;
    } else {
      while(parseNext() !== ']' && token !== undefined) {
        if(token !== ',') {          
          temp.push(token);          
        } 
      }
      if (token === undefined) {
          temp = undefined;
      }
    }

    return temp;
  }

  var parseObject = function(){
    var temp = {};
    var key;
    var value;

    if (parseNext() === '}') {
      index++;
      return temp;
    } else {
        while(token !== '}' && token !== undefined) {
            key = token;
            if(parseNext() === ':') {
            temp[key] = parseNext();
            }
        }
        if (token === undefined) {
          temp = undefined;
      }
    }

    return temp;
  }

  var parseString = function(){
    var temp = '';
    var escaped = false;

    while(newArray[index]!=='"' && newArray[index]!=='"' && index <= newArray.length){
        if(newArray[index]==='\\"' || newArray[index]==="\\'") {
          temp += newArray[index].charAt(1);
        } else {
          temp += newArray[index];
        }

        index++;
    }
    index++;
    token = temp;
    return temp;
  }

  
  answer = parseNext();

  if(answer === undefined){
    throw new SyntaxError;
  }

  return answer;
};
