document.addEventListener('DOMContentLoaded', () => {
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

    // Gestione copia IBAN
    const copyBtn = document.getElementById('copy-btn');
    const ibanText = document.getElementById('iban-text');
    
    if (copyBtn && ibanText) {
        copyBtn.addEventListener('click', () => {
            const iban = ibanText.textContent;
            
            // Copia l'IBAN nella clipboard
            navigator.clipboard.writeText(iban).then(() => {
                // Salva il testo originale
                const originalText = ibanText.textContent;
                
                // Nascondi il bottone
                copyBtn.style.display = 'none';
                
                // Mostra "copiato!" con lo stile del sito
                ibanText.textContent = 'Copiato!';
                ibanText.classList.add('copied');
                
                // Dopo 2 secondi, ripristina l'IBAN e mostra il bottone
                setTimeout(() => {
                    ibanText.textContent = originalText;
                    ibanText.classList.remove('copied');
                    copyBtn.style.display = '';
                }, 2000);
            }).catch(err => {
                console.error('Errore nella copia:', err);
            });
        });
    }
});
