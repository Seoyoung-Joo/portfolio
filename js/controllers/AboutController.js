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
