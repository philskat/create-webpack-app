import { exec } from 'child_process';
import * as fs from 'fs';
import { WebpackStarterAnswer } from './cli';
import setupHelp from './util/setupHelp';

export default function setupProject({
  name,
  template,
}: WebpackStarterAnswer): void {
  let templateUrl = '';

  switch (template) {
    case 'JavaScript':
      templateUrl = 'https://github.com/philskat/webpack-starter';
      break;

    case 'TypeScript':
      templateUrl = 'https://github.com/philskat/webpack-typescript-starter';
      break;

    default:
      templateUrl = 'https://github.com/philskat/webpack-starter';
  }

  console.log(`Cloning template from ${templateUrl}`);

  const git = exec(`git clone ${templateUrl} ${name}`);

  git.on('close', code => {
    if (code === 0) {
      console.log(`Successfully cloned to ${name}`);
      /* Delete unwanted directories */
      try {
        fs.rmdirSync(`${name}/.git`, {
          recursive: true,
        });

        fs.rmdirSync(`${name}/.github`, {
          recursive: true,
        });
      } catch (err) {
        console.log(err);
      }

      /* Modify package-json */
      const packageJson = fs.readFileSync(`${name}/package.json`);
      const packageJsonData = JSON.parse(packageJson.toString());

      packageJsonData.name = name;

      fs.writeFileSync(
        `${name}/package.json`,
        JSON.stringify(packageJsonData, null, 2)
      );

      console.log('Installing dependencies');

      const proc = exec(`cd ${name} && npm install`);

      proc.on('close', rc => {
        if (rc === 0) {
          setupHelp({ name, template });
        } else {
          console.log('Could not install dependencies');
        }
      });
    } else {
      console.log(`Directory ${name} already exists`);
    }
  });
}
