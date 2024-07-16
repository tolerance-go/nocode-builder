import 'normalize.css';
import { AppManager } from './core/managers';
import { 全局界面通知系统 } from './globals';
import './index.css';

new AppManager(document, 全局界面通知系统).work();
