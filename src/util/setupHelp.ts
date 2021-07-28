import { WebpackStarterAnswer } from '../cli';

export default function setupHelp({ name }: WebpackStarterAnswer): void {
  console.log(`\nThe webpack-app is setup in the folder "${name}".`);
  console.log(`To start developing run the following commands\n`);
  console.log(`cd ${name}`);
  console.log(`npm run dev`);
}
