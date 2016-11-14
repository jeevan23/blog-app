
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
          
    
      }
      }
  };
  request.open('GET','http://jeevan23.imad.hasura-app.io/test-db',true);
  request.send(); 
}

function loadLoggedInUser (username) {
    var Logout = document.getElementById('Logout');
    Logout.innerHTML = `
        <a href="/ui/logout">Logout</a>
    `;
}

function loadLogin () {
    // Check if the user is already logged in
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                loadLoggedInUser();
            } 
        }
    };
    
    request.open('GET', '/check-login', true);
    request.send(null);
}
loadLogin();
loadContents();
