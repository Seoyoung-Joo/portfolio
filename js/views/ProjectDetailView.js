class ProjectDetailView {
  constructor(store, categories, mediaManager, adminController) {
    this.store = store;
    this.categories = categories;
    this.mediaManager = mediaManager;
    this.adminController = adminController;
    this.currentId = null;
    this.overlay = document.getElementById('detail-overlay');
    this.category = document.getElementById('d-cat');
    this.title = document.getElementById('d-title');
    this.year = document.getElementById('d-year');
    this.description = document.getElementById('d-desc');
  }

  init() {
    this.year.setAttribute('contenteditable', 'false');
    this.year.addEventListener('input', () => this.saveYear());
    this.description.setAttribute('contenteditable', 'false');
  }

  open(projectId) {
    const project = this.store.findById(projectId);
    if (!project) return;

    this.currentId = projectId;
    this.mediaManager.setCurrentProject(projectId);

    const category = this.categories.find(cat => cat.id === project.cat)?.label || project.cat;
    this.category.textContent = category;
    this.title.textContent = project.title;
    this.year.textContent = project.year;

    const defaultProject = this.store.findDefaultById(project.id);
    const desc = localStorage.getItem(`pf_desc_${project.id}`) || project.desc || defaultProject?.desc || '';
    this.setDescContent(desc);
    this.mediaManager.render(project);

    this.overlay.classList.remove('closing');
    this.overlay.classList.add('open');
    this.overlay.scrollTop = 0;
  }

  close() {
    this.overlay.classList.add('closing');
    setTimeout(() => this.overlay.classList.remove('open', 'closing'), 300);
    this.currentId = null;
    this.mediaManager.setCurrentProject(null);
  }

  currentProject() {
    return this.store.findById(this.currentId);
  }

  saveDesc() {
    if (!this.adminController.canEdit()) return;
    const project = this.currentProject();
    if (!project) return;

    project.desc = this.description.innerHTML;
    localStorage.setItem(`pf_desc_${project.id}`, project.desc);
    this.store.save();
  }

  setDescContent(desc) {
    if (/<[a-z][\s\S]*>/i.test(desc)) {
      this.description.innerHTML = desc;
    } else {
      this.description.textContent = desc;
    }
  }

  toggleBold() {
    if (!this.adminController.canEdit()) return;
    this.description.focus();
    document.execCommand('bold');
    this.saveDesc();
  }

  saveYear() {
    if (!this.adminController.canEdit()) return;
    const project = this.currentProject();
    if (!project) return;

    project.year = this.year.textContent.trim();
    localStorage.setItem(`pf_year_${project.id}`, project.year);
    this.store.save();
  }
}
