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
