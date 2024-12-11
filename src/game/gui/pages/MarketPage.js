import m from 'mithril';
import { playClick } from '../../utils/mithril';
import { hideGui } from '../../utils/mithril';

export function MarketPage() {
  return {
    oninit: function (vnode) {
      hideGui();

      if (window.game) {
        window.game.destroy(true, false);
      }
      vnode.state.products = [
        { id: 1, name: 'Product A', price: 20, available: 0, imageUrl: '/assets/images/equipment/landmine.png' },
        { id: 2, name: 'Product B', price: 30, available: 30, imageUrl: '/assets/images/equipment/scanner_device.png' },
        { id: 2, name: 'Product B', price: 30, available: 30, imageUrl: '/assets/images/equipment/scanner_device.png' },
        { id: 2, name: 'Product B', price: 30, available: 30, imageUrl: '/assets/images/equipment/scanner_device.png' },
        { id: 2, name: 'Product B', price: 30, available: 30, imageUrl: '/assets/images/equipment/scanner_device.png' },
        { id: 2, name: 'Product B', price: 30, available: 30, imageUrl: '/assets/images/equipment/scanner_device.png' },
        { id: 2, name: 'Product B', price: 30, available: 30, imageUrl: '/assets/images/equipment/scanner_device.png' },
        // Add more products as needed
      ];
    },

    view: function (vnode) {
      return m('.marketplace', [
        m('.market-connect-wallet', 'Connect wallet'),
        m('.container', [
          m('.title', 'Marketplace'),
          m('.products', [vnode.state.products.map((product) => m(ProductTile, { product }))]),
        ]),
      ]);
    },
  };
}

function ProductTile() {
  return {
    view: function (vnode) {
      const { product } = vnode.attrs;

      return m('.product-tile', [
        m('img', { src: product.imageUrl, alt: product.name }),
        m('.product-info', [
          m('.name', product.name),
          m('.price', `Price: $${product.price}`),
          m('.available', `Available: ${product.available}`),
          m('.quantity-control', { class: 'full-width' }, [
            m(
              'button.decrement',
              {
                onclick: () => {
                  product.selectedQuantity = Math.max((product.selectedQuantity || 0) - 1, 0);
                  m.redraw();
                },
                disabled: (product.selectedQuantity || 0) <= 0,
              },
              '-'
            ),
            m('input.styled-input', {
              type: 'number',
              min: 1,
              max: product.available,
              value: product.selectedQuantity || 0,
              oninput: (e) => {
                const value = parseInt(e.target.value, 10);
                if (!isNaN(value)) {
                  product.selectedQuantity = Math.min(Math.max(value, 0), product.available);
                }
              },
            }),
            m(
              'button.increment',
              {
                onclick: () => {
                  product.selectedQuantity = Math.min((product.selectedQuantity || 0) + 1, product.available);
                  m.redraw();
                },
                disabled: (product.selectedQuantity || 0) >= product.available,
              },
              '+'
            ),
          ]),
          m(
            'button.buy-button',
            {
              onclick: () => buyProduct(product),
              disabled: (product.selectedQuantity || 0) <= 0, // Disable if quantity is 0
            },
            'Buy'
          ),
        ]),
      ]);
    },
  };
}

function buyProduct(product) {
  console.log('Buying', product);
  // Implement the buy logic here
  playClick();
}
