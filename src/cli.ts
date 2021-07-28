#!/usr/bin/env node
import * as inquire from 'inquirer';
import * as validate from 'validate-npm-package-name';
import setupProject from './setupProject';

export interface WebpackStarterAnswer {
  name: string;
  template: 'JavaScript' | 'TypeScript';
}

inquire
  .prompt<WebpackStarterAnswer>([
    {
      type: 'input',
      message: 'Name of the app',
      name: 'name',
    },
    {
      type: 'list',
      message: 'Template to use',
      choices: ['JavaScript', 'TypeScript'],
      name: 'template',
    },
  ])
  .then(answer => {
    /* Check name */
    const val = validate(answer.name);

    if (val.validForNewPackages) {
      setupProject(answer);
    } else {
      console.log(`Package name ${answer.name} is not valid:\n${val.errors}`);
    }
  })
  .catch(err => {
    console.log(err);
  });
