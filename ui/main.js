
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
          
          for(var j=0;j<obj.length;j++){
              obj[j].heading.onclick=link(obj[j].heading);
          }
      }
      }
  };
  request.open('GET','http://jeevan23.imad.hasura-app.io/test-db',true);
  request.send(); 
}

function link(obj1){
    var request1=new XMLHttpRequest();
    request1.onreadystatechange=function(){
        if(request1.readyState==XMLHttpRequest.DONE){
            if(request1.status==200){
                var content1=JSON.parse(request1.responseText);
                var str='<ul>';
                str+=`<li>
                    
                        <span id="link_header">${content1.heading}</span>
                        <br><br>
                        <img src="/user.png"/> ${content1.author} <img src="/cal.png"/> ${content1.date}
                        <br><br>
                        ${content1.content}
                        <br><br>
                        
                        </li>`;
                str+='</ul>';
            }
        }
    };
    request1.open('GET','/http://jeevan23.imad.hasura-app.io/'+obj1,true);
    request1.send(obj1);
}

loadContents();