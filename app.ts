import * as fs from 'fs';
import * as path from 'path';
import { Application } from 'egg';
import { registerRoute } from './lib/register';
import { loadDir } from './lib/util';

export default (app: Application) => {
  const config = app.config.controller;

  if (config.autoLoad) {
    [].concat(config.ctrlDir)
      .map(dir => path.isAbsolute(dir) ? dir : path.join(app.baseDir, dir))
      .forEach(dir => fs.existsSync(dir) && loadDir(dir).forEach(file => require(file)));
  }

  app.beforeStart(() => {
    registerRoute(app);
  });
};
