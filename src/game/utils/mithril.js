export function showGui(component, model) {
  const guiRoot = document.getElementById('mithril-gui');
  guiRoot.classList.toggle('mithril-gui-show', true);

  return guiRoot;
  /* does not work :/
  m.mount(guiRoot, {
    view: function () {
      return m(component, model);
    },
  });*/
}

export function hideGui() {
  const guiRoot = document.getElementById('mithril-gui');
  guiRoot.classList.toggle('mithril-gui-show', false);
  m.mount(guiRoot, null);
}

export function playClick() {
  const audio = document.getElementById('button-click-sound');
  audio.play();
}
