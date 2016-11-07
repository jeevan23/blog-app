
window.onload=function(){
  var request=new XMLHttpRequest()  ;
  request.onreadystatechange=function(){
      if(request.readyState==XMLHttpRequest.DONE){
          if(request.status==200){
          var content=request.responseText;
          var obj=JSON.parse(content);
          var bodyContent=document.getElementById("includedContent");
          bodyContent.innerHTML=obj[0].heading<br>obj[0].author<br>obj[0].date<br>obj[0].content;
          
      }
      }
  };
  request.open('GET','http://jeevan23.imad.hasura-app.io/test-db',true);
  request.send(); 
};