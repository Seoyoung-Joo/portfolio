class AddProjectModal {
  constructor(store, renderer) {
    this.store = store;
    this.renderer = renderer;
    this.modal = document.getElementById('add-bg');
    this.titleInput = document.getElementById('new-title');
    this.yearInput = document.getElementById('new-year');
    this.categoryInput = document.getElementById('new-cat');
  }

  open(categoryId) {
    this.categoryInput.value = categoryId;
    this.modal.classList.add('open');
    setTimeout(() => this.titleInput.focus(), 60);
  }

  close() {
    this.modal.classList.remove('open');
    this.titleInput.value = '';
    this.yearInput.value = '';
  }

  add() {
    const title = this.titleInput.value.trim();
    if (!title) {
      this.titleInput.focus();
      return;
    }

    this.store.add({
      id: Date.now().toString(),
      title,
      year: this.yearInput.value.trim() || new Date().getFullYear().toString(),
      cat: this.categoryInput.value,
      media: [],
      desc: ''
    });

    this.close();
    this.renderer.render();
  }
}
