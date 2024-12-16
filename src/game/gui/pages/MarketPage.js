import m from 'mithril';
import { playClick } from '../../utils/mithril';
import { hideGui } from '../../utils/mithril';
import { state } from '../state';
import { trimString } from '../../utils/utils';

export function MarketPage() {
  const { walletAddress } = state;
  let showModal = false; // State to control the visibility of the modal

  function toggleModal() {
    console.log('toggle');
    showModal = !showModal;
    m.redraw();
  }
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
        m('.market-connect-wallet', [
          m(
            '.market-connect-wallet-button',
            {
              onclick: () => {
                playClick();
                toggleModal();
              },
              disabled: walletAddress,
            },
            walletAddress ? 'Disconnect' : 'Connect'
          ),
          walletAddress && m('.market-connect-wallet-address', trimString(walletAddress, 3, 3, 3)),
        ]),
        showModal && m(Modal, { onClose: toggleModal }), // Show modal based on state

        m('.container', [
          m('.title', 'Marketplace'),
          m('.products', [vnode.state.products.map((product) => m(ProductTile, { product }))]),
        ]),
      ]);
    },
  };
}

function Modal() {
  return {
    view: function (vnode) {
      return m('.modal-background', [
        m('.modal', [
          m('.modal-content', [
            m(
              'button.modal-close',
              {
                onclick: () => {
                  console.log('closing');
                  vnode.attrs.onClose();
                },
              },
              '×'
            ),
            m('h1.modal-title', 'Connect Wallet'),
            m(
              'button.wallet-button',
              {
                onclick: async () => {
                  console.log('clicked');
                  await handleArconnect();
                },
              },
              'Arconnect'
            ),
            m('button.wallet-button', 'Metamask'),
          ]),
        ]),
      ]);
    },
  };
}

async function handleArconnect() {
  console.log(window.arweaveWallet);
  if (!window.arweaveWallet) return;
  try {
    console.log('connecting');
    await window.arweaveWallet.connect([
      'ACCESS_ADDRESS',
      'DISPATCH',
      'SIGN_TRANSACTION',
      'ACCESS_PUBLIC_KEY',
      'SIGNATURE',
    ]);
  } catch (e) {
    window.alert(
      `Problem with loading ArConnect.\nPlease refresh page and try again. Our best tech beavers are working on solving this problem.`
    );
  }
  state.walletAddress = await window.arweaveWallet.getActiveAddress();
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
              disabled: (product.selectedQuantity || 0) <= 0,
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
  playClick();
}
