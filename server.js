var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;

var config = {
  host: 'db.imad.hasura-app.io',
  port: '5432',
  user: 'jeevan23',
  password: 'process.env.DB_PASSWORD',
  database: 'jeevan23',
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

app.get('/Leaderboard.html',function(req, res){
    res.sendFile(path.join(__dirname,'Leaderboard.html'));
});


var pool = new Pool(config);
app.post('/test-db',function(req,res){
    
    pool.query('INSERT INTO blog_posts(title,author,date,content,category) VALUES($1,$3,$5,$2,$4)');

});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/:articleName',function(req, res) {
    var articleName=req.params.articleName;
   res.send(createTemplate(articles[articleName]));
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
