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
var counter=0;
button.onclick=function(){
    
    counter=counter+1;
    document.getElementById("count").innerHTML=counter;
    
};