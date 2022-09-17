const express = require('express');
const app = express();
const port = 3000;

const db = require('./friends');

//index route
app.get('/', (req,res) => {
  res.send('Hello form Express!');
});

//friends route
app.get('/friends', (req,res) => {
  let htmlString = "";
  htmlString += `<ul>`;
  db.map(friend => {
    htmlString += `<li><a href="/friends/${friend.handle}">${friend.name}</a></li>`
  });
  htmlString += `</ul>`

  res.send(htmlString);
  
});

//individual friend route
app.get('/friends/:handle', (req,res) => {
  const { handle } = req.params;
  const friend = db.find(person => person.handle === handle);
  if(friend) {
    let htmlData = "";
    htmlData += `<h1>${friend.name}</h1>`;
    htmlData += `<h3>${friend.handle}</h3>`;
    htmlData += `<h3>${friend.skill}</h3>`;
    htmlData += `<a href="/friends"><button>Go back</button></a>`;
    res.send(htmlData);

  }else {
    res.send(`sorry, no friend is found with the handle ${handle}`)
  }
});




app.listen(port, () => {
  console.log(`YO JOE! coming in hot on http://localhost:${port}`);
});
