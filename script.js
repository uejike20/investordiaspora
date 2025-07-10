document.addEventListener('DOMContentLoaded', () => {

    // Mobile Navigation (Hamburger Menu)
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');
        hamburger.classList.toggle('toggle');
    });

    // Active navigation link highlighting on scroll
    const sections = document.querySelectorAll('main section[id]');
    const navLi = document.querySelectorAll('.nav-links li a');

    const highlightOptions = {
      rootMargin: '-20% 0px -70% 0px'
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLi.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === entry.target.id) {
              link.classList.add('active');
            }
          });
        }
      });
    }, highlightOptions);

    sections.forEach(section => {
      sectionObserver.observe(section);
    });
    
});