class OrderPanel {
  constructor(store, detailView) {
    this.store = store;
    this.detailView = detailView;
    this.panel = document.getElementById('order-panel');
    this.list = document.getElementById('order-list');
  }

  toggle() {
    if (this.panel.classList.contains('open')) {
      this.close();
      return;
    }
    this.open();
  }

  open() {
    this.render();
    this.panel.classList.add('open');
  }

  close() {
    this.panel.classList.remove('open');
  }

  render() {
    this.list.innerHTML = '';
    const project = this.currentProject();
    if (!project || !Array.isArray(project.media) || project.media.length === 0) {
      this.list.appendChild(this.createEmptyState());
      return;
    }

    project.media.forEach((media, index) => {
      this.list.appendChild(this.createRow(media, index, project.media.length));
    });
  }

  createEmptyState() {
    const empty = document.createElement('div');
    empty.className = 'order-empty';
    empty.textContent = 'No media in this project.';
    return empty;
  }

  createRow(media, index, total) {
    const row = document.createElement('div');
    row.className = 'order-row';

    const title = document.createElement('div');
    title.className = 'order-title';
    title.textContent = this.mediaLabel(media, index);

    const type = document.createElement('div');
    type.className = 'order-cat';
    type.textContent = media.type || 'media';

    const text = document.createElement('div');
    text.className = 'order-text';
    text.appendChild(title);
    text.appendChild(type);

    const controls = document.createElement('div');
    controls.className = 'order-controls';
    controls.appendChild(this.createMoveButton('↑', index, -1, index === 0));
    controls.appendChild(this.createMoveButton('↓', index, 1, index === total - 1));

    row.appendChild(text);
    row.appendChild(controls);
    return row;
  }

  mediaLabel(media, index) {
    const src = media.src || '';
    const clean = src.split('/').pop().split('?')[0] || `Media ${index + 1}`;
    return `${index + 1}. ${clean}`;
  }

  createMoveButton(label, index, offset, disabled) {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = label;
    button.disabled = disabled;
    button.onclick = () => this.move(index, offset);
    return button;
  }

  move(index, offset) {
    const project = this.currentProject();
    if (!project || !this.store.moveMedia(project.id, index, offset)) return;
    this.render();
    this.refreshDetail();
  }

  save() {
    if (this.store.save()) {
      this.refreshDetail();
      alert('Current media order saved for this browser.');
    }
  }

  resetDefault() {
    const project = this.currentProject();
    if (project && this.store.resetMediaDefaultOrder(project.id)) {
      this.render();
      this.refreshDetail();
      alert('Default media order restored for this browser.');
    }
  }

  currentProject() {
    return this.store.findById(this.detailView.currentId);
  }

  refreshDetail() {
    if (this.detailView.currentId) {
      this.detailView.open(this.detailView.currentId);
    }
  }
}
