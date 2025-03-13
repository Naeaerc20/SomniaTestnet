const inquirer = require('inquirer');
const figlet = require('figlet');
const { spawn } = require('child_process');
const colors = require('colors');
const clear = require('console-clear');

process.on('SIGINT', () => {
  console.log('\nExiting...'.green);
  process.exit(0);
});

async function pause() {
  await inquirer.prompt([
    {
      type: 'input',
      name: 'continue',
      message: 'Press ENTER to return to the main menu...',
    },
  ]);
}

function runScript(scriptPath) {
  return new Promise((resolve) => {
    const child = spawn('node', [scriptPath], { stdio: 'inherit' });
    child.on('close', () => {
      resolve();
    });
  });
}

async function mainMenu() {
  clear();
  const title = figlet.textSync('SomniaTestnet', { horizontalLayout: 'full' });
  console.log(title.green);
  console.log('Script created by Naeaex'.green);
  console.log('Follow me on X - x.com/naeaexeth - Github - github.com/Naeaerc20'.green);
  console.log();

  const { option } = await inquirer.prompt([
    {
      type: 'list',
      name: 'option',
      message: 'Select an option:',
      choices: [
        { name: '1. Claim Faucet', value: 'claimFaucet' },
        { name: '2. Execute Swaps', value: 'executeSwaps' },
        { name: '3. Deploy Contract', value: 'deployContract' },
        { name: '4. Use Specific App', value: 'specificApp' },
        { name: '0. Exit', value: 'exit' }
      ],
    },
  ]);

  switch (option) {
    case 'claimFaucet':
      const { faucetChoice } = await inquirer.prompt([
        {
          type: 'list',
          name: 'faucetChoice',
          message: 'Select Faucet:',
          choices: [
            { name: '1. Official Faucet', value: 'officialFaucet' }
          ],
        },
      ]);
      if (faucetChoice === 'officialFaucet') {
        console.log('Launching Official Faucet...'.green);
        await runScript('actions/faucets/official_faucet/claim.js');
      }
      await pause();
      break;
    case 'executeSwaps':
      console.log('Execute Swaps - coming soon...'.green);
      await pause();
      break;
    case 'deployContract':
      console.log('Deploy Contract - coming soon...'.green);
      await pause();
      break;
    case 'specificApp':
      console.log('Use Specific App - coming soon...'.green);
      await pause();
      break;
    case 'exit':
      console.log('Exiting...'.green);
      process.exit(0);
    default:
      break;
  }

  mainMenu();
}

mainMenu();
