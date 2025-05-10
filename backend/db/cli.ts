import { exec } from 'child_process';
import * as yargs from 'yargs';

yargs
  .command('create-migration [name]', '', {}, (args) => {
    exec(
      `npx ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:create ./src/migrations/${args.name}`,
      (error, stdout, stderr) => {
        if (error) {
          console.log(`error: ${error.message}`);
          return;
        }
        if (stderr) {
          console.log(`stderr: ${stderr}`);
          return;
        }
        console.log(`stdout: ${stdout}`);
      },
    );
  })
  .command('generate-migration [name]', '', {}, (args) => {
    exec(
      `npx ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:generate ./src/migrations/${args.name} -d ./db/cli.config`,
      (error, stdout, stderr) => {
        if (error) {
          console.log(`error: ${error.message}`);
          return;
        }
        if (stderr) {
          console.log(`stderr: ${stderr}`);
          return;
        }
        console.log(`stdout: ${stdout}`);
      },
    );
  })
  .command('run-migration', '', {}, () => {
    exec(
      `npx  ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:run -d ./db/cli.config`,
      (error, stdout, stderr) => {
        if (error) {
          console.log(`error: ${error.message}`);
          //return;
        }
        if (stderr) {
          console.log(`stderr: ${stderr}`);
          //return;
        }
        console.log(`stdout: ${stdout}`);
      },
    );
  })
  .command('revert-migration', '', {}, () => {
    exec(
      `npx ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:revert -d ./db/cli.config`,
      (error, stdout, stderr) => {
        if (error) {
          console.log(`error: ${error.message}`);
          return;
        }
        if (stderr) {
          console.log(`stderr: ${stderr}`);
          return;
        }
        console.log(`stdout: ${stdout}`);
      },
    );
  }).argv;
