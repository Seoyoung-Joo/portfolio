class OrderPanel {
  constructor(store, renderer, detailView, categories) {
    this.store = store;
    this.renderer = renderer;
    this.detailView = detailView;
    this.categories = categories;
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
    this.store.projects.forEach((project, index) => {
      this.list.appendChild(this.createRow(project, index));
    });
  }

  createRow(project, index) {
    const row = document.createElement('div');
    row.className = 'order-row';

    const title = document.createElement('div');
    title.className = 'order-title';
    title.textContent = project.title;

    const category = document.createElement('div');
    category.className = 'order-cat';
    category.textContent = this.categories.find(cat => cat.id === project.cat)?.label || project.cat;

    const text = document.createElement('div');
    text.className = 'order-text';
    text.appendChild(title);
    text.appendChild(category);

    const controls = document.createElement('div');
    controls.className = 'order-controls';
    controls.appendChild(this.createMoveButton('↑', project.id, -1, index === 0));
    controls.appendChild(this.createMoveButton('↓', project.id, 1, index === this.store.projects.length - 1));

    row.appendChild(text);
    row.appendChild(controls);
    return row;
  }

  createMoveButton(label, projectId, offset, disabled) {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = label;
    button.disabled = disabled;
    button.onclick = () => this.move(projectId, offset);
    return button;
  }

  move(projectId, offset) {
    if (!this.store.moveProject(projectId, offset)) return;
    this.renderer.render();
    this.render();
  }

  save() {
    if (this.store.save()) {
      this.renderer.render();
      this.refreshDetail();
      alert('Current order saved for this browser.');
    }
  }

  resetDefault() {
    if (this.store.resetDefaultOrder()) {
      this.renderer.render();
      this.render();
      this.refreshDetail();
      alert('Default order restored for this browser.');
    }
  }

  refreshDetail() {
    if (this.detailView.currentId) {
      this.detailView.open(this.detailView.currentId);
    }
  }
}
