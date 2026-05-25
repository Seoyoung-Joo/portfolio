class PortfolioApp {
  constructor(data) {
    this.categories = data.categories;
    this.store = new ProjectStore(data.projects);
    this.admin = new AdminController('1234');
    this.about = new AboutController();
    this.media = new MediaManager(this.store, this.admin);
    this.detail = new ProjectDetailView(this.store, this.categories, this.media, this.admin);
    this.renderer = new ProjectRenderer(this.store, this.categories, {
      onOpen: projectId => this.detail.open(projectId),
      onAdd: categoryId => this.openAdd(categoryId)
    });
    this.addProjectModal = new AddProjectModal(this.store, this.renderer);
  }

  init() {
    this.about.init();
    this.detail.init();
    this.renderer.render();
    this.bindEvents();
    this.bindGlobalHandlers();
  }

  bindEvents() {
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        this.detail.close();
        this.addProjectModal.close();
      }
    });

    document.getElementById('add-bg').addEventListener('click', event => {
      if (event.target === event.currentTarget) this.addProjectModal.close();
    });
  }

  bindGlobalHandlers() {
    window.checkAdmin = () => this.admin.check();
    window.showWork = () => this.showWork();
    window.showAbout = () => this.showAbout();
    window.closeDetail = () => this.detail.close();
    window.handleUpload = event => this.media.handleUpload(event);
    window.addURL = () => this.media.addUrl();
    window.openLightbox = (src, type, event) => this.media.openLightbox(src, type, event);
    window.closeLightbox = () => this.media.closeLightbox();
    window.saveDesc = () => this.detail.saveDesc();
    window.toggleBold = () => this.detail.toggleBold();
    window.openAdd = categoryId => this.openAdd(categoryId);
    window.closeAdd = () => this.addProjectModal.close();
    window.addProject = () => this.addProjectModal.add();
    window.saveOrder = () => this.saveOrder();
  }

  showWork() {
    document.getElementById('work-content').classList.add('active');
    document.getElementById('about-content').classList.remove('active');
    document.getElementById('btn-work').classList.add('active');
    document.getElementById('btn-about').classList.remove('active');
  }

  showAbout() {
    document.getElementById('about-content').classList.add('active');
    document.getElementById('work-content').classList.remove('active');
    document.getElementById('btn-about').classList.add('active');
    document.getElementById('btn-work').classList.remove('active');
  }

  openAdd(categoryId) {
    if (!this.admin.canEdit()) return;
    this.addProjectModal.open(categoryId);
  }

  saveOrder() {
    if (!this.admin.canEdit()) return;
    const currentId = this.detail.currentId;
    if (this.store.lockDefaultOrder()) {
      this.renderer.render();
      if (currentId) this.detail.open(currentId);
      alert('Project and media order saved for this browser.');
    }
  }
}
