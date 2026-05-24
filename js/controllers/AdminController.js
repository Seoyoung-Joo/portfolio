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
