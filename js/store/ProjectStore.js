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
      return this.cloneDefaults();
    }
    return this.mergeSavedProjects(savedProjects);
  }

  cloneDefaults() {
    return this.defaultProjects.map(project => ({
      ...project,
      media: (project.media || []).map(media => ({ ...media }))
    }));
  }

  mergeSavedProjects(savedProjects) {
    const defaultById = new Map(this.defaultProjects.map(project => [project.id, project]));
    const seen = new Set();
    const merged = savedProjects
      .filter(project => project && project.id && !seen.has(project.id))
      .map(project => {
        seen.add(project.id);
        const defaultProject = defaultById.get(project.id);
        return defaultProject ? { ...defaultProject, ...project } : project;
      });

    this.defaultProjects.forEach(project => {
      if (!seen.has(project.id)) {
        merged.push({ ...project, media: (project.media || []).map(media => ({ ...media })) });
      }
    });

    return merged;
  }

  save() {
    try {
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

  moveMedia(projectId, index, offset) {
    const project = this.findById(projectId);
    if (!project || !Array.isArray(project.media)) return false;
    const from = index;
    const to = from + offset;
    if (from < 0 || to < 0 || to >= project.media.length) return false;
    const moved = project.media.splice(from, 1)[0];
    project.media.splice(to, 0, moved);
    return true;
  }

  resetMediaDefaultOrder(projectId) {
    const project = this.findById(projectId);
    const defaultProject = this.findDefaultById(projectId);
    if (!project || !defaultProject) return false;
    project.media = (defaultProject.media || []).map(media => ({ ...media }));
    return this.save();
  }
}
