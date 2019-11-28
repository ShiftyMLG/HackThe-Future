/*server.js*/

const exp = require('express');
const app = exp();
const parse = require('body-parser');
app.use(parse.json());

var items = new Array(26).fill(0);

function alphabetPosition(text) {
  var result = "";
  for (var i = 0; i < text.length; i++) {
    var code = text.toUpperCase().charCodeAt(i)
    if (code > 64 && code < 91) result += (code - 64) + " ";
  }

  return result.slice(0, result.length - 1);
}

function get(char){
  let pos = alphabetPosition(char);
  items[pos] = items[pos]+1;
  return items[pos];
}

function solve(text){
  str="";
  for(let i = 0; i < text.length; i++){
    str+=get(text[i]);
  }
  return str;
}

app.post("/", function (req, res){
  let text = req.body.text;
  let value = solve(text);
  res.send({result: value})

});

app.listen(3000);