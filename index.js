// Gestione smooth scroll al click dell'indicatore
document.addEventListener('DOMContentLoaded', () => {
    const scrollIndicators = document.querySelectorAll('.scroll-indicator');
    
    scrollIndicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            const sections = document.querySelectorAll('section');
            const nextSection = sections[index + 1];
            
            if (nextSection) {
                nextSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Nascondi l'indicatore di scroll nell'ultima sezione
    const sections = document.querySelectorAll('section');
    const lastSection = sections[sections.length - 1];
    const lastIndicator = lastSection.querySelector('.scroll-indicator');
    
    if (lastIndicator) {
        lastIndicator.style.display = 'none';
    }

    // Aggiungi effetto fade-in alle sezioni durante lo scroll
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Prima sezione visibile subito
    if (sections[0]) {
        sections[0].style.opacity = '1';
        sections[0].style.transform = 'translateY(0)';
    }
});
