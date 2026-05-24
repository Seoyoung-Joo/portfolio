class ProjectRenderer {
  constructor(store, categories, handlers) {
    this.store = store;
    this.categories = categories;
    this.handlers = handlers;
    this.container = document.getElementById('right-col');
  }

  render() {
    this.container.innerHTML = '';
    this.categories.forEach(category => {
      this.container.appendChild(this.createCategoryBox(category));
    });
  }

  createCategoryBox(category) {
    const box = document.createElement('div');
    box.className = 'cat-box';
    box.appendChild(this.createCategoryHeader(category));

    const projects = this.store.byCategory(category.id);
    if (projects.length === 0) {
      box.appendChild(this.createEmptyState());
    } else {
      projects.forEach(project => {
        box.appendChild(this.createProjectItem(project));
      });
    }

    return box;
  }

  createCategoryHeader(category) {
    const header = document.createElement('div');
    header.className = 'cat-box-header';

    const name = document.createElement('div');
    name.className = 'cat-name';
    name.textContent = category.label;

    const addButton = document.createElement('button');
    addButton.className = 'cat-add';
    addButton.textContent = '+';
    addButton.onclick = () => this.handlers.onAdd(category.id);

    header.appendChild(name);
    header.appendChild(addButton);
    return header;
  }

  createEmptyState() {
    const empty = document.createElement('div');
    empty.className = 'cat-empty';
    empty.textContent = '—';
    return empty;
  }

  createProjectItem(project) {
    const item = document.createElement('span');
    item.className = 'proj-item';
    item.onclick = () => this.handlers.onOpen(project.id);

    const title = document.createElement('span');
    title.className = 'proj-title';
    title.textContent = project.title;

    const deleteButton = document.createElement('button');
    deleteButton.className = 'proj-del';
    deleteButton.textContent = '×';
    deleteButton.onclick = event => {
      event.stopPropagation();
      this.store.delete(project.id);
      this.render();
    };

    item.appendChild(title);
    item.appendChild(deleteButton);
    return item;
  }
}
