// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className){
  // your code here
  var answer = [];
  var getOneElementByClassName = function(domArray){
  	
  	for (var i=0 ; i<domArray.length ; i++){
  		
  		if(typeof domArray[i].classList !== 'undefined') {
  			
  			var tClassList = domArray[i].classList;
  			
  			if (tClassList.length === 0) {
  				var tName = domArray[i].classList[0];
  				var tChildNodes = domArray[i].childNodes; 
  				
  				if (tName === className) {
  					answer.push(domArray[i]);
  				}
  				
  				if (tChildNodes.length !== 0) {
  					getOneElementByClassName(tChildNodes);
  				}

  			} else {

  				for (var j = 0; j < tClassList.length; j++) {
  				
  					var tName = domArray[i].classList[j];
  					var tChildNodes = domArray[i].childNodes; 
  				
  					if (tName === className) {
	  					answer.push(domArray[i]);
  					}
  					
  					if (tChildNodes.length !== 0) {
  						getOneElementByClassName(tChildNodes);
  					}
  				}
  			}
  		}
  	}
  };

  getOneElementByClassName(document.childNodes);

  

  //console.log(document.childNodes[1].childNodes[2].childNodes[3].childNodes.length);

  


  return answer;
  

};
