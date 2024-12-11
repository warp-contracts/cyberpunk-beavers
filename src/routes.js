import m from 'mithril';
import { GamePage } from './game/gui/pages/GamePage';
import { MarketPage } from './game/gui/pages/MarketPage';

m.route(document.getElementById('app'), '/', {
  '/': GamePage,
  '/market': MarketPage,
});
