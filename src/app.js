import Store from './store';
import Template from './template';
import View from './view';
import Controller from './controller';

const store = new Store('todos');
const template = new Template();
const view = new View(template);
const controller = new Controller(store, view);

controller.setView('All');