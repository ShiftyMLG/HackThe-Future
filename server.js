/*server.js*/

const exp = require('express');
const app = exp();
const parse = require('body-parser');
app.use(parse.json());

var items = new Array(52).fill(0);
let chars = ["a", "b", "c","d","e","f", "g", "h","i","j","k", "l", "m","n","o","p", "q", "r","s","t","u", "v", "w","x","y","z"
, "A", "B","C","D","E", "F", "G","H","I","J", "K", "L","M","N", "O","P", "Q", "R","S","T","U", "V", "W","X","Y","Z"]

function alphabetPosition(text) {
  for (var i = 0; i < chars.length; i++) {
    if(chars[i] === text){
      return i;
    }
  }
  return -1;
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