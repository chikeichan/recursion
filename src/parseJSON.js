// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
  // your code goes here
  var jsonArray = json.split(/([\[\],\'\"\{\}: ])/);
  var newArray = []
  var index = 0;
  var token;
  var answer;


  //Construct an array deliminated by {}[],'":
  for (var i = 0; i < jsonArray.length; i++) {
    if (jsonArray[i]!='') {
      newArray.push(jsonArray[i]);
    }
  }

  console.log(newArray);

  var parseNext = function(){
    token = newArray[index];
    index++;
    var temp;
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

    //token = temp;

    return temp;
  }

  var parseArray = function(){
    var temp = [];
    if (newArray[index] === ']') {
      index++;
      return temp;
    } else {
      while(newArray[index] !== ']') {
        if(newArray[index] !== ',') {
          temp.push(parseNext());
        } else {
          index++;
        }
      }
    }

    return temp;
  }

  var parseObject = function(){
    var temp = {};
    var key;
    var value;

    if (newArray[index] === '}') {
      index++;
      return temp;
    } else {
        while(parseNext() !== '}' || token === ',') {
            //console.log(newArray[index]+index)
            //if(token===','){
            //  index++;
            //}
            key = token;
          if(newArray[index] !== ':') {
            //alert('Require :');
          } else {
            //console.log(newArray[index]+index)
            index++;
            temp[key] = parseNext();
            //console.log(newArray[index]+index)
          }
        }
    }

    return temp;
  }

  var parseString = function(){
    var temp = '';
    while(newArray[index]!=='"' && newArray[index]!=='"'){
        temp += newArray[index];
        index++;
    }
    index++;
    token = temp;
    return temp;
  }

  
    answer = parseNext();
  

  return answer;
};
