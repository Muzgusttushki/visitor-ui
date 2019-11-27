const fs = require('fs');
const old = fs.readdirSync('node_modules_');

fs.readdirSync('node_modules').forEach((resolve) => {
  if(!(old.indexOf(resolve) >= 0))
    console.log(resolve)
});
