const CATS = [
  { id: 'installation', label: 'Installation' },
  { id: 'web-based', label: 'Web Based' },
  { id: 'graphics', label: 'Graphics' },
];

const DEFAULT_PROJECTS = [
  {
    id: 'though-their-voices-are-so-soft',
    title: 'Though their voices are so soft',
    year: '2025 Jan / sculpture + Projection',
    cat: 'installation',
    media: [
      { src: 'MNST8042.jpg', type: 'image' },
      { src: 'MNST8045.jpg', type: 'image' },
      { src: 'TTVASS_vid_1080.mp4', type: 'video' }
    ],
    desc: '<strong>Though Their Voices Are So Soft (2024, Mixed media, Variable installation, 35 × 30 × 20 in.)</strong><br><br>Though Their Voices Are So Soft grants plants the rights traditionally reserved for humans — to speak, to protest, to be heard. The Flower Robot, activated by the viewer, moves and emits a siren; the Fern-shaped Robot shakes a leaf inscribed with "RIGHT TO SPEAK." Quiet gestures, but insistent ones. The work asks who has historically held the authority to act and speak — and what we have refused to listen to.'
  },
  {
    id: 'goodnightbaby',
    title: 'Good Night, Baby. Do You Still Remember?',
    year: '2025 Jan',
    cat: 'installation',
    media: [
      { src: 'goodnight05.jpg', type: 'image' },
      { src: 'goodnight04.jpg', type: 'image' },
      { src: 'goodnight02.jpg', type: 'image' },
      { src: 'goodnight_1080.mp4', type: 'video' },
      { src: 'MNST8851.jpg', type: 'image' },
      { src: 'goodnight01_수정.jpg', type: 'image' }
    ],
    desc: `<strong>Good Night, Baby. Do You Still Remember? (Mixed media, Variable installation, 2025)</strong><br><br>Two cell-like sculptures, each housing a projector, cast personal video footage from the artist's own archive onto the surrounding space. One references the structure of a nerve cell; the other takes the shape of a speech bubble. The work began from a recurring experience: people from the distant past reappearing in dreams — old classmates, brief friendships, connections that had quietly faded. The piece holds space for what returns without being called back, and whether forgetting is ever really complete.`
  },
  {
    id: 'remapping-body',
    title: 'Remapping body',
    year: '2026 Jan',
    cat: 'web-based',
    media: [
      { src: 'remappingbodysequencefinal_1080.mp4', type: 'video' },
      { src: 'remappingbodyscreen_1080.mp4', type: 'video' },
      { src: 'Screenshot.png', type: 'image' }
    ],
    desc: '<strong>Remapping Body (p5.js, 2025)</strong><br><br>An interactive tool built in p5.js that imposes a computational grid onto the human figure. The body — a continuous, organic form — is divided into adjustable tiles (5–20 rows and columns), each swappable and recolorable via RGB sliders. Clicking individual tiles cycles through poses, producing bodies with multiplied limbs and disjointed silhouettes. The project began from a curiosity about re-sorting something inherently fluid: what remains when the body is treated as rearrangeable data, and what new forms emerge from its misalignment.'
  },
  {
    id: 'diagnosis-0-1',
    title: 'Diagnosis 0:1',
    year: '2025',
    cat: 'web-based',
    media: [
      { src: 'diagnosis_25mb.mp4', type: 'video' },
      { src: '01_.png', type: 'image' },
      { src: '02_.png', type: 'image' },
      { src: '03_.jpg', type: 'image' }
    ],
    desc: `<strong>Diagnosis 0:1 (p5.js, 2026)</strong><br><br>A time-based digital work built in p5.js. Circles repeatedly collide with rectangular boxes, breaking them into smaller fragments with each impact. When one sequence ends, its final state becomes the starting point for the next.<br><br>The work draws from Yi Sang’s poem and the idea of periodic boundary conditions, but approaches them through motion rather than direct illustration. Through repeated collision, overlap, and division, the piece creates a system that keeps changing without fully resolving.`
  },
  {
    id: 'take-it-to-go',
    title: 'Take It To Go!',
    year: '2025',
    cat: 'graphics',
    media: [
      { src: 'DS1_final_aftereffects_1080.mp4', type: 'video' },
      { src: 'takeittogo-04.jpg', type: 'image' },
      { src: 'takeittogo-03.jpg', type: 'image' },
      { src: 'takeittogo-02.jpg', type: 'image' },
      { src: 'takeittogo-01.jpg', type: 'image' }
    ],
    desc: `<strong>Take It To Go (Print / Campaign Design, 2025)</strong><br><br>A set of delivery package tags built around the social-media moment of Asian food. Each tag names a dish's origin and pairs it with one piece of music, literature, and visual art from its home country; a QR code leads to a landing page with expanded context and resource access. The tags are designed to be cut and kept as bookmarks — a way to extend their presence beyond the meal itself. The project uses the familiarity of takeout as an entry point for something less immediate: the history and aesthetic tradition behind what's being consumed, with the hope that a small object, handed over with an order, might stick around long enough to make that distance feel crossable.`
  },
  {
    id: 'the-piece-of-wild-things',
    title: 'The Piece of Wild Things',
    year: '2025',
    cat: 'graphics',
    media: [
      { src: 'wildthings_1080.mp4', type: 'video' },
      { src: 'XRshared-01.jpg', type: 'image' },
      { src: 'XRshared-02.jpg', type: 'image' }
    ],
    desc: `<strong>The Piece of Wild Things (AR Book, 2026)</strong><br><br>A visual annotation of Wendell Berry's poem "The Peace of Wild Things," with personal narratives written as footnotes throughout the printed book. Each page triggers an augmented reality layer when scanned: the first generates a branching structure that appears differently with every reading, while the rest unfold AR elements anchored to the text. Built using Mind AR for image tracking and A-Frame for 3D rendering. The project uses the footnote format — typically reserved for citations — to hold personal stories instead, positioning them where references would go but containing my own writing about growth and connection.`
  }
];

class ProjectStore {
  constructor(defaultProjects) {
    this.defaultProjects = defaultProjects;
    this.projectOrder = new Map(defaultProjects.map((project, index) => [project.id, index]));
    this.projects = this.loadProjects();
    this.save();
  }

  loadProjects() {
    const savedProjects = JSON.parse(localStorage.getItem('pf_projects') || 'null');
    if (!Array.isArray(savedProjects) || savedProjects.length === 0) {
      return this.sortProjects(this.defaultProjects);
    }
    return this.sortProjects(savedProjects);
  }

  sortProjects(projects) {
    return [...projects].sort((a, b) => {
      const ai = this.projectOrder.has(a.id) ? this.projectOrder.get(a.id) : Number.MAX_SAFE_INTEGER;
      const bi = this.projectOrder.has(b.id) ? this.projectOrder.get(b.id) : Number.MAX_SAFE_INTEGER;
      return ai - bi;
    });
  }

  save() {
    try {
      this.projects = this.sortProjects(this.projects);
      localStorage.setItem('pf_projects', JSON.stringify(this.projects));
      return true;
    } catch (err) {
      alert('This file is too large to save in the browser. Use a videos/ path or a smaller image.');
      return false;
    }
  }

  all() {
    return this.projects;
  }

  byCategory(categoryId) {
    return this.projects.filter(project => project.cat === categoryId);
  }

  findById(projectId) {
    return this.projects.find(project => project.id === projectId);
  }

  findDefaultById(projectId) {
    return this.defaultProjects.find(project => project.id === projectId);
  }

  add(project) {
    this.projects.push(project);
    this.save();
  }

  delete(projectId) {
    this.projects = this.projects.filter(project => project.id !== projectId);
    this.save();
  }
}

class AdminController {
  constructor(password) {
    this.password = password;
    this.enabled = false;
  }

  check() {
    if (this.enabled) return;
    const pw = prompt('Password:');
    if (pw === this.password) {
      this.enable();
    }
  }

  enable() {
    this.enabled = true;
    document.body.classList.add('admin');
    document.getElementById('site-bio').readOnly = false;
    document.getElementById('about-bio').readOnly = false;
    document.getElementById('about-name').setAttribute('contenteditable', 'true');
    document.getElementById('d-year').setAttribute('contenteditable', 'true');
    document.getElementById('d-desc').setAttribute('contenteditable', 'true');
  }

  canEdit() {
    return this.enabled;
  }
}

class AboutController {
  init() {
    const savedBio = localStorage.getItem('pf_bio');
    if (savedBio) {
      document.getElementById('site-bio').value = savedBio;
      document.getElementById('about-bio').value = savedBio;
    }

    document.getElementById('site-bio').readOnly = true;
    document.getElementById('about-bio').readOnly = true;
    document.getElementById('about-name').setAttribute('contenteditable', 'false');

    document.getElementById('about-bio').addEventListener('input', event => {
      localStorage.setItem('pf_bio', event.target.value);
      document.getElementById('site-bio').value = event.target.value;
    });

    document.getElementById('site-bio').addEventListener('input', event => {
      localStorage.setItem('pf_bio', event.target.value);
    });
  }
}

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

class MediaManager {
  constructor(store, adminController) {
    this.store = store;
    this.adminController = adminController;
    this.currentProjectId = null;
    this.mediaList = document.getElementById('d-media');
    this.urlInput = document.getElementById('media-url');
    this.lightbox = document.getElementById('lightbox');
    this.lightboxMedia = document.getElementById('lightbox-media');
  }

  setCurrentProject(projectId) {
    this.currentProjectId = projectId;
  }

  currentProject() {
    return this.store.findById(this.currentProjectId);
  }

  render(project) {
    this.mediaList.innerHTML = '';
    (project.media || []).forEach((media, index) => {
      this.mediaList.appendChild(this.createMediaItem(project, media, index));
    });
  }

  createMediaItem(project, media, index) {
    const item = document.createElement('div');
    item.className = 'media-item';
    item.draggable = this.adminController.canEdit();
    item.dataset.index = index;

    this.bindDragEvents(item, project);

    const src = this.formatMediaSrc(media.src);
    item.innerHTML = media.type === 'video'
      ? `<div class="media-slot"><video controls preload="metadata" onclick="openLightbox('${src}','video', event)"><source src="${src}" type="video/mp4"></video></div>`
      : `<div class="media-slot"><img src="${src}" alt="" onclick="openLightbox('${src}','image', event)"></div>`;

    const removeButton = document.createElement('button');
    removeButton.className = 'media-rm';
    removeButton.textContent = '×';
    removeButton.onclick = () => this.remove(index);

    item.appendChild(removeButton);
    return item;
  }

  bindDragEvents(item, project) {
    item.addEventListener('dragstart', event => {
      event.dataTransfer.setData('text/plain', item.dataset.index);
      item.classList.add('dragging');
    });
    item.addEventListener('dragend', () => item.classList.remove('dragging'));
    item.addEventListener('dragover', event => event.preventDefault());
    item.addEventListener('drop', event => {
      event.preventDefault();
      this.reorder(project, Number(event.dataTransfer.getData('text/plain')), Number(item.dataset.index));
    });
  }

  reorder(project, from, to) {
    if (Number.isNaN(from) || Number.isNaN(to) || from === to) return;
    const moved = project.media.splice(from, 1)[0];
    project.media.splice(to, 0, moved);
    this.store.save();
    this.render(project);
  }

  remove(index) {
    const project = this.currentProject();
    if (!project) return;
    project.media.splice(index, 1);
    this.store.save();
    this.render(project);
  }

  handleUpload(event) {
    if (!this.adminController.canEdit()) return;
    const project = this.currentProject();
    if (!project) return;

    Array.from(event.target.files).forEach(file => {
      if (file.type.startsWith('video/')) {
        project.media.push({ src: URL.createObjectURL(file), type: 'video' });
        this.render(project);
        alert('Video preview added for now. For publishing, put the MP4 in a videos/ folder and add its path, like videos/work.mp4.');
        return;
      }

      if (file.type.startsWith('image/')) {
        this.resizeImageFile(file, 2400, 0.92).then(src => {
          project.media.push({ src, type: 'image' });
          this.render(project);
          this.store.save();
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = readerEvent => {
        project.media.push({ src: readerEvent.target.result, type: 'image' });
        this.render(project);
        this.store.save();
      };
      reader.readAsDataURL(file);
    });

    event.target.value = '';
  }

  resizeImageFile(file, maxSize, quality) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const scale = Math.min(1, maxSize / Math.max(img.width, img.height));
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        URL.revokeObjectURL(img.src);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.onerror = reject;
      img.src = URL.createObjectURL(file);
    });
  }

  addUrl() {
    if (!this.adminController.canEdit()) return;
    const url = this.urlInput.value.trim().replace(/^['"]|['"]$/g, '');
    if (!url) return;

    const project = this.currentProject();
    if (!project) return;

    project.media.push({
      src: url,
      type: /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(url) ? 'video' : 'image'
    });

    this.store.save();
    this.render(project);
    this.urlInput.value = '';
  }

  openLightbox(src, type, event) {
    if (event) event.stopPropagation();
    this.lightboxMedia.innerHTML = type === 'video'
      ? `<video src="${src}" controls autoplay></video>`
      : `<img src="${src}" alt="">`;
    this.lightbox.classList.add('open');
  }

  closeLightbox() {
    this.lightbox.classList.remove('open');
    this.lightboxMedia.innerHTML = '';
  }

  formatMediaSrc(src) {
    if (/^(https?:|data:|blob:)/i.test(src)) return src;
    return encodeURI(src);
  }
}

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

class PortfolioApp {
  constructor() {
    this.store = new ProjectStore(DEFAULT_PROJECTS);
    this.admin = new AdminController('1234');
    this.about = new AboutController();
    this.media = new MediaManager(this.store, this.admin);
    this.detail = new ProjectDetailView(this.store, CATS, this.media, this.admin);
    this.renderer = new ProjectRenderer(this.store, CATS, {
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
}

const app = new PortfolioApp();
app.init();
