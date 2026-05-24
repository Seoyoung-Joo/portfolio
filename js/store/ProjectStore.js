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
