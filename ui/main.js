var img=document.getElementById("madi");

var marginLeft=0;

function moveRight(){
    marginLeft=marginLeft+7;
    img.style.marginLeft=marginLeft+"px";
}

img.onclick=function(){
    var interval=setInterval(moveRight,40);
};

var button=document.getElementById("counter");
button.onclick=function(){

var request=new XMLHttprequest();
request.onreadystatechange=function()
{
    if(request.readyState==XMLHttpRequest.DONE){
        if(request.status==200){
            var counter=request.responseText;
            var span=document.getElementById("count");
            span.innerHTML=count.toString();
        }
    }
};
request.open('GET','http://jeevan23.imad.hasura-app.io/counter',true);
request.send(null);
};