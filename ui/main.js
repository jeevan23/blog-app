
window.onload=function(){
  var request=new XMLHttpRequest()  ;
  request.onreadystatechange=function(){
      if(request.readyState==XMLHttpRequest.DONE){
          if(request.status==200){
          var content=request.responseText;
          var obj=JSON.parse(content);
          var str='<ul>';
          for(var i=0;i<obj.length;i++){
              str+='<li id="head">'+obj[i].heading+'</li>'
                            +'<br>'+'<br>'+
                            '<li id="auth_dat">'+obj[i].author+" "+" "+obj[i].date+'</li>'
                            +'<br>'+'<br>'+
                            '<li id="cont">'+obj[i].content+'</li>'
                            +'<br>'+'<br>';
          }
          str+='</ul>';
          
          var head=document.querySelector("#head");
          head.style.color="Green";
          
          
          var bodyContent=document.getElementById("includedContent");
          bodyContent.innerHTML=str;
          
      }
      }
  };
  request.open('GET','http://jeevan23.imad.hasura-app.io/test-db',true);
  request.send(); 
};