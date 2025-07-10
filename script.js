document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile Navigation (Hamburger Menu)
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');
        hamburger.classList.toggle('toggle');
    });

    // 2. Fade-in animations on scroll
    const faders = document.querySelectorAll('.fade-in');
    const appearOptions = {
        threshold: 0.2, // Trigger when 20% of the element is visible
        rootMargin: "0px 0px -50px 0px" // Start animation a bit before it's fully in view
    };

    const appearOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            }
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Stop observing once it's visible
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // 3. Active navigation link highlighting on scroll
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
    
    // 4. Download Modal Logic
    const modal = document.getElementById('downloadModal');
    const downloadButtons = document.querySelectorAll('.download-btn');
    const closeButton = document.querySelector('.close-button');
    const downloadForm = document.getElementById('downloadForm');
    const langInput = document.getElementById('langInput');
    const formMessage = document.getElementById('formMessage');

    const fileMap = {
        'pt': './guides/guia_investidor_pt.pdf',
        'en': './guides/investor_guide_en.pdf',
        'fr': './guides/guide_investisseur_fr.pdf'
    };

    downloadButtons.forEach(button => {
        button.addEventListener('click', () => {
            const lang = button.getAttribute('data-lang');
            langInput.value = lang; 
            formMessage.textContent = ''; 
            modal.style.display = 'flex';
        });
    });

    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });

    downloadForm.addEventListener('submit', (event) => {
        event.preventDefault(); 
        
        const email = document.getElementById('emailInput').value;
        const lang = langInput.value;
        
        console.log(`Email captured: ${email}, Language: ${lang}`);
        
        formMessage.textContent = 'Obrigado! O seu download irá começar em breve.';
        formMessage.style.color = 'green';
        
        setTimeout(() => {
            const link = document.createElement('a');
            link.href = fileMap[lang]; 
            link.download = fileMap[lang].split('/').pop();
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            modal.style.display = 'none';
            downloadForm.reset();
        }, 1500);
    });

});