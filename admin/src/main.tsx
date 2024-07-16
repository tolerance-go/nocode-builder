import 'normalize.css';
import { AppManager } from './core/managers';
import { 全局界面通知系统 } from './globals';
import './index.css';

[全局界面通知系统, new AppManager(document).requires(全局界面通知系统)].forEach(
  (actor) => actor.start(),
);
