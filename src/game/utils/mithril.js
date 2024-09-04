export function showGui(noPointerEvents) {
  const guiRoot = document.getElementById('mithril-gui');
  guiRoot.classList.toggle('mithril-gui-show', true);
  if (noPointerEvents) {
    guiRoot.classList.toggle('no-pointer-events', true);
  }
  return guiRoot;
}

export function hideGui() {
  const guiRoot = document.getElementById('mithril-gui');
  guiRoot.classList.toggle('mithril-gui-show', false);
  guiRoot.classList.toggle('no-pointer-events', false);
  m.mount(guiRoot, null);
}

export function playClick() {
  const audio = document.getElementById('button-click-sound');
  audio.play();
}
