
window.onload=function(){
  var request=new XMLHttpRequest()  ;
  request.onreadystatechange=function(){
      if(request.readyState==XMLHttpRequest.DONE){
          if(request.status==200){
          var content=request.responseText;
          var obj=JSON.parse(content);
          var bodyContent=document.getElementById("includedContent");
          bodyContent.innerHTML=obj[0].heading;
          
      }
      }
  };
  request.open('GET','http://jeevan23.imad.hasura-app.io/test-db',true);
  request.send(); 
};