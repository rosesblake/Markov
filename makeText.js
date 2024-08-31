/** Command-line tool to generate Markov text. */

const fs = require('fs');
const axios = require('axios');
const { MarkovMachine } = require('./markov');

async function makeText(type, path) {
  let data;

  if (type === 'file') {
    try {
      data = fs.readFileSync(path, 'utf8');
    } catch (err) {
      console.error(`Cannot read file: ${path}: ${err}`);
      process.exit(1);
    }
  } else if (type === 'url') {
    try {
      let resp = await axios.get(path);
      data = resp.data;
    } catch (err) {
      console.error(`Cannot read URL: ${path}: ${err}`);
      process.exit(1);
    }
  } else {
    console.error(`Unknown type: ${type}`);
    process.exit(1);
  }

  let mm = new MarkovMachine(data);
  console.log(mm.makeText());
}

let [type, path] = process.argv.slice(2);
makeText(type, path);
