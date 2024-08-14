export function mountComponentTo(component, attrs) {
  warpAO.mithril.mount(mithrilRoot(), {
    view: function () {
      return warpAO.mithril(component, attrs);
    },
  });
}

export function mithrilRoot() {
  return document.getElementById('mithril-gui');
}
