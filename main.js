// ========================================
// Configuration
// ========================================
const CONFIG = {
    // URL du webhook Apps Script (à remplacer par votre URL)
    webhookURL: 'https://script.google.com/macros/s/AKfycbweSyYdpdb0kFgPWrt7E6Yjn9hOXS4rtkFHt35jVB23aOBuMDzXkd6z5KvdJaDs-Oz2aA/exec',
    
    // Messages de confirmation
    messages: {
        success: '✅ Merci ! Votre demande a bien été envoyée. Nous vous recontacterons sous 24h pour étudier votre éligibilité.',
        error: '❌ Une erreur est survenue. Veuillez réessayer ou nous contacter directement.',
        validation: '⚠️ Veuillez remplir tous les champs obligatoires correctement.'
    }
};

// ========================================
// Gestion du Formulaire
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form-eligibilite');
    const submitBtn = form.querySelector('.btn-submit');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoader = submitBtn.querySelector('.btn-loader');
    const formMessage = document.getElementById('form-message');

    // Gestion de la soumission du formulaire
    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Validation côté client
        if (!form.checkValidity()) {
            showMessage(CONFIG.messages.validation, 'error');
            return;
        }

        // Désactiver le bouton et afficher le loader
        submitBtn.disabled = true;
        btnText.style.display = 'none';
        btnLoader.style.display = 'block';
        formMessage.style.display = 'none';

        // Collecter les données du formulaire
        const formData = {
            typeLogement: form.typeLogement.value,
            typeResidence: form.typeResidence.value,
            anciennete: form.anciennete.value,
            chauffageActuel: form.chauffageActuel.value,
            nbPersonnes: form.nbPersonnes.value,
            revenu: form.revenu.value,
            codePostal: form.codePostal.value,
            nom: form.nom.value,
            telephone: form.telephone.value,
            email: form.email.value,
            rgpdConsent: form.rgpd.checked,
            timestamp: new Date().toISOString(),
            source: window.location.href,
            userAgent: navigator.userAgent
        };

        try {
            // Envoyer les données au webhook
            const response = await fetch(CONFIG.webhookURL, {
                method: 'POST',
                mode: 'no-cors', // Important pour Apps Script
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            // Note: avec mode 'no-cors', response sera opaque
            // On considère que c'est un succès si pas d'erreur
            showMessage(CONFIG.messages.success, 'success');
            form.reset();

            // Scroll vers le message
            formMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

            // Optionnel: rediriger après 3 secondes
            // setTimeout(() => {
            //     window.location.href = '/merci.html';
            // }, 3000);

        } catch (error) {
            console.error('Erreur lors de l\'envoi:', error);
            showMessage(CONFIG.messages.error, 'error');
        } finally {
            // Réactiver le bouton
            submitBtn.disabled = false;
            btnText.style.display = 'block';
            btnLoader.style.display = 'none';
        }
    });

    // Fonction pour afficher les messages
    function showMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = 'form-message ' + type;
        formMessage.style.display = 'block';
    }

    // Validation en temps réel des champs
    const codePostalInput = document.getElementById('code-postal');
    codePostalInput.addEventListener('input', function(e) {
        this.value = this.value.replace(/[^0-9]/g, '').slice(0, 5);
    });

    const telephoneInput = document.getElementById('telephone');
    telephoneInput.addEventListener('input', function(e) {
        this.value = this.value.replace(/[^0-9]/g, '').slice(0, 10);
    });
});

// ========================================
// Gestion de la FAQ (Accordéon)
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Fermer les autres items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });

            // Toggle l'item actuel
            item.classList.toggle('active');
        });
    });
});

// ========================================
// Smooth Scroll pour les Ancres
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Ignorer les liens vides ou "#"
            if (href === '#' || !href) return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// ========================================
// Détection de la Région (Île-de-France)
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    const codePostalInput = document.getElementById('code-postal');
    
    codePostalInput.addEventListener('blur', function() {
        const cp = this.value;
        
        // Départements Île-de-France: 75, 77, 78, 91, 92, 93, 94, 95
        const isIDF = /^(75|77|78|91|92|93|94|95)/.test(cp);
        
        // Optionnel: afficher un message informatif
        if (isIDF && cp.length === 5) {
            console.log('Code postal Île-de-France détecté');
            // Vous pouvez ajouter une logique supplémentaire ici
        }
    });
});

// ========================================
// Analytics (Google Analytics 4 - Optionnel)
// ========================================
// Décommenter et configurer si vous utilisez GA4
/*
function trackFormSubmission(formData) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'form_submission', {
            event_category: 'Formulaire',
            event_label: 'Vérification Éligibilité',
            value: 1
        });
    }
}

function trackFormError(error) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'form_error', {
            event_category: 'Formulaire',
            event_label: error.message || 'Erreur inconnue'
        });
    }
}
*/

// ========================================
// Détection de Bot (Honeypot - Optionnel)
// ========================================
// Ajoutez un champ caché dans votre HTML:
// <input type="text" name="honeypot" style="display:none" tabindex="-1" autocomplete="off">
// Puis vérifiez-le avant l'envoi:
/*
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form-eligibilite');
    const honeypot = document.createElement('input');
    honeypot.type = 'text';
    honeypot.name = 'website';
    honeypot.style.display = 'none';
    honeypot.tabIndex = -1;
    honeypot.autocomplete = 'off';
    form.appendChild(honeypot);

    form.addEventListener('submit', function(e) {
        if (honeypot.value !== '') {
            e.preventDefault();
            console.log('Bot détecté');
            return false;
        }
    });
});
*/

// ========================================
// Sauvegarde Locale (LocalStorage - Optionnel)
// ========================================
// Sauvegarder les données du formulaire en cas de rechargement accidentel
/*
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form-eligibilite');
    const inputs = form.querySelectorAll('input, select');

    // Restaurer les données sauvegardées
    inputs.forEach(input => {
        const savedValue = localStorage.getItem('form_' + input.name);
        if (savedValue && input.type !== 'checkbox') {
            input.value = savedValue;
        } else if (savedValue && input.type === 'checkbox') {
            input.checked = (savedValue === 'true');
        }
    });

    // Sauvegarder à chaque modification
    inputs.forEach(input => {
        input.addEventListener('change', function() {
            if (this.type === 'checkbox') {
                localStorage.setItem('form_' + this.name, this.checked);
            } else {
                localStorage.setItem('form_' + this.name, this.value);
            }
        });
    });

    // Nettoyer après soumission réussie
    form.addEventListener('submit', function() {
        setTimeout(() => {
            inputs.forEach(input => {
                localStorage.removeItem('form_' + input.name);
            });
        }, 2000);
    });
});
*/

// ========================================
// Animation au Scroll (Fade-in)
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    // Sélectionner les éléments à animer
    const animatedElements = document.querySelectorAll('.step, .guarantee-card, .faq-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// ========================================
// Validation Avancée du Code Postal
// ========================================
function validateCodePostal(cp) {
    // Vérifier le format (5 chiffres)
    if (!/^[0-9]{5}$/.test(cp)) {
        return {
            valid: false,
            message: 'Le code postal doit contenir 5 chiffres'
        };
    }

    // Vérifier les départements d'Outre-mer (codes différents)
    const domTom = ['97', '98'];
    const dept = cp.substring(0, 2);
    
    if (domTom.includes(dept)) {
        return {
            valid: true,
            region: 'Outre-mer',
            message: 'Conditions spécifiques pour l\'Outre-mer'
        };
    }

    // Déterminer la région
    const idf = ['75', '77', '78', '91', '92', '93', '94', '95'];
    const region = idf.includes(dept) ? 'Île-de-France' : 'Hors Île-de-France';

    return {
        valid: true,
        region: region,
        message: ''
    };
}

// ========================================
// Formatage du Téléphone
// ========================================
function formatPhoneNumber(phone) {
    // Retirer tous les caractères non-numériques
    const cleaned = phone.replace(/\D/g, '');
    
    // Formater en 06 12 34 56 78
    if (cleaned.length === 10) {
        return cleaned.replace(/(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1 $2 $3 $4 $5');
    }
    
    return phone;
}

// ========================================
// Détection du Type de Navigateur
// ========================================
function getBrowserInfo() {
    const ua = navigator.userAgent;
    let browser = 'Unknown';
    
    if (ua.includes('Firefox')) browser = 'Firefox';
    else if (ua.includes('Chrome')) browser = 'Chrome';
    else if (ua.includes('Safari')) browser = 'Safari';
    else if (ua.includes('Edge')) browser = 'Edge';
    
    return {
        browser: browser,
        mobile: /Mobile|Android|iPhone|iPad/.test(ua),
        userAgent: ua
    };
}

// ========================================
// Export pour Tests (si nécessaire)
// ========================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validateCodePostal,
        formatPhoneNumber,
        getBrowserInfo
    };
}
