
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
              
                            <a href="/${obj[i].title}" id="link_header">${obj[i].heading}</a>
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
          link(obj);
          
      }
      }
  };
  request.open('GET','http://jeevan23.imad.hasura-app.io/test-db',true);
  request.send(); 
}

function link(obj1){
    for(var i=0;i<obj1.length;i++){
        obj1[i].heading.onclick=function(){
          var request1=new XMLHttpRequest();
          request1.onreadystatechange=function(){
              if(request.readyState==XMLHttpRequest.DONE){
                  if(request.status==200){
                      var content1=JSON.parse(request1.responseText);
                      var str='<ul>';
                      str+=`<li>
                                    <span id="link_header">${content1[i].heading}</span>
                                    <br><br>
                                    <img src="/user.png"/> ${content1[i].author} <img src="/cal.png"/> ${content1[i].date}
                                    <br><br>
                                    ${content1[i].content}
                                    <br><br>
                            </li>`;
                            
                        str+='</ul>';
                  }
              }
          };
        };
    }
}

loadContents();