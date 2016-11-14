var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;

var config = {
                 user: 'jeevan23',
                 database: 'jeevan23',
                  host: 'db.imad.hasura-app.io',
                  port: '5432',
                  password: process.env.DB_PASSWORD
};

var app = express();

app.use(morgan('combined'));


function createTemplate(data)
{

    var htmlTemplate =`
<html>
    <head>
        
         <meta charset="UTF-8">
  
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css">
            <script src="https://cdnjs.cloudflare.com/ajax/libs/prefixfree/1.0.7/prefixfree.min.js"></script>
            <link href="/ui/style.css" rel="stylesheet" />
            <link href="http://weloveiconfonts.com/api/?family=brandico" rel="stylesheet" />
            
    </head>
    <body>
        <div class="header">
            
                <div class="right">
                    <ul>
                        <li><a href="#">SignIn</a></li>
                        <li class="dropdown"><a class="dropbtn">Topics</a>
                          <div class="dropdown-content">
                            <a href="#">Ethical Hacking</a>
                            <a href="#">Cyber Security</a>
                            <a href="#">Algorithms</a>
                            <a href="#">Web Development</a>
                            </div>
                        </li>
                        <li><a href="#">Contact</a></li>
                        <li><a  href="#">About Me</a></li>
                        <li><a  href="http://jeevan23.imad.hasura-app.io">Home</a></li>
                    </ul>
                </div>
                <div class="left">
                    GeekInstant
                </div>
        </div>
        
        <div id="includedContent" class="container">
            

             <span id="link_header">${data.heading}</span>
             <br><br>
             <img src="/user.png"/> ${data.author} <img src="/cal.png"/> ${data.date}
              <br><br>
            ${data.content}
            <br><br>
             <h4>Comments</h4>
              <div id="comment_form">
              
              </div>
              <div id="comments">
              
                <center>Loading comments...</center>
                
              </div>
        </div>
        
        <div class="footer">
                    <!-- Go to www.addthis.com/dashboard to customize your tools --> 
                    <div class="addthis_inline_share_toolbox"></div>
                                    <script>
                                              (function (w,i,d,g,e,t,s) {w[d] = w[d]||[];t= i.createElement(g);
                                                t.async=1;t.src=e;s=i.getElementsByTagName(g)[0];s.parentNode.insertBefore(t, s);
                                              })(window, document, '_gscq','script','//widgets.getsitecontrol.com/59309/script.js');
                                     </script>
            <br><br><br><br><br><br><br>
            <large class="size">Copyright &copy; 2016 GeekInstant.com,Inc.All rights reserved.</large>
        </div>
        
        
        
        <script type="text/javascript" src="/ui/Article.js"></script>
        
        <!-- Go to www.addthis.com/dashboard to customize your tools --> 
        <script type="text/javascript" src="//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-58181de50e8b802c"></script> 
    </body>
</html>

    `;
    return htmlTemplate;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});


var pool=new Pool(config);
app.get('/test-db',function(req,res){
   pool.query('SELECT * FROM blog_posts ',function(err,result){
       if (err){
       res.status(500).send(err.toString());
   } else{
       res.send(JSON.stringify(result.rows));
   }
   
   });
  
});

app.get('/check-login', function (req, res) {
   if (req.session && req.session.auth && req.session.auth.userId) {
       // Load the user object
       pool.query('SELECT * FROM "user" WHERE id = $1', [req.session.auth.userId], function (err, result) {
           if (err) {
              res.status(500).send(err.toString());
           } else {
              res.send(result.rows[0].username);    
           }
       });
   }
});

app.get('/ui/logout', function (req, res) {
   delete req.session.auth;
   res.send('<html><body><script>document.getElementById("Logout").innerHTML=<a href="/ui/signin">SignIn</a></script></body></html>');
});

app.get('/cal.png', function (req, res) {
  res.sendFile(path.join(__dirname,'cal.png'));
});



app.get('/user.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'user.png'));
});

app.get('/:articleName',function(req, res) {
     pool.query("SELECT * FROM blog_posts WHERE title = $1", [req.params.articleName], function (err, result) {
    if (err) {
        res.status(500).send(err.toString());
    } else {
        if (result.rows.length === 0) {
            res.status(404).send('Article not found');
        } else {
            var articleData = result.rows[0];
            res.send(createTemplate(articleData));
        }
    }
  });
});





app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});


app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});

