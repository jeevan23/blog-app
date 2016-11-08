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





var articles={
    

'articleone':
{
  title:'Article-one|Jeevan Deep',
  heading:'Article One',
  date:'oct 21,2016',
  content:`
                <p>
                    This is the content of my first article.This is the content of my first article.This is the content of my first article.This is the content of my first article.This is the content of my first article.This is the content of my first article.This is the content of my first article.
                </p>
                <p>
                    This is the content of my first article.This is the content of my first article.This is the content of my first article.This is the content of my first article.This is the content of my first article.This is the content of my first article.This is the content of my first article.
                </p>
                <p>
                    This is the content of my first article.This is the content of my first article.This is the content of my first article.This is the content of my first article.This is the content of my first article.This is the content of my first article.This is the content of my first article.
                </p>`
  
},
'articletwo':
{
   title:'Article-two|Jeevan Deep',
  heading:'Article Two',
  date:'oct 25,2016',
  content:`
                <p>
                    This is the content of my second article.
                </p>`
},
'article-three':
{
   title:'Article-three|Jeevan Deep',
  heading:'Article Three',
  date:'oct 28,2016',
  content:`
                <p>
                    This is the content of my third article.
                </p>`
}

};
function createTemplate(data)
{
    var title=data.title;
    var heading=data.heading;
    var content=data.content;
    var date=data.date;
    var htmlTemplate =`
    <html>
        <head>
            <title>
                ${title}
            </title>
            <link href="/ui/style.css" rel="stylesheet" />
           
        </head>
        <body>
           <div class="container">
                <div>
                    <a href="/">Home</a>
                </div>
                <hr/>
                <h3>
                    ${heading}
                </h3>
                <div>
                    ${date}
                </div>
                <div>
                    ${content}
                </div>
            </div>
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


app.get('/:articleName',function(req, res) {
     pool.query("SELECT * FROM blog_posts WHERE title = $1", [req.params.articleName], function (err, result) {
    if (err) {
        res.status(500).send(err.toString());
    } else {
        if (result.rows.length === 0) {
            res.status(404).send('Article not found');
        } else {
            res.send(JSON.stringify(result.rows));
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

