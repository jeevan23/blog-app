
function loadContents(){
  var request=new XMLHttpRequest()  ;
  request.onreadystatechange=function(){
      if(request.readyState==XMLHttpRequest.DONE){
          if(request.status==200){
          var content=request.responseText;
          var obj=JSON.parse(content);
          var str='<ul>';
          for(var i=0;i<obj.length;i++)
          {
              str+=`<li>
              
                            <span id="link_header">${obj[i].heading}</span>
                            <br><br>
                            <img src="/user.png"/> ${obj[i].author} <img src="/cal.png"/> ${obj[i].date}
                            <br><br>
                            ${obj[i].content}
                            <br><br>
                            
                    </li>`;
          }
          str+='</ul>';
          
          
          
          var bodyContent=document.getElementById("includedContent");
          bodyContent.innerHTML=str;
          
    
      }
      }
  };
  request.open('GET','http://jeevan23.imad.hasura-app.io/test-db',true);
  request.send(); 
}


loadContents();