const appMode = +process.argv[2];
const validAppMode = [1, 2, 3, 4, 5, 6];

if (!validAppMode.includes(appMode)) {
  console.log('Invalid app mode!');
  console.log(`Valid values: ${validAppMode.join(', ')}.`);
  process.exit(1);
}

const app = require(`./appModes/mode${appMode}`);

app();
