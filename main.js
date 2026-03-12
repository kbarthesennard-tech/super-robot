// ========================================
// Gestion du Formulaire + Tracking (Google Ads + Meta)
// ========================================
const CONFIG = {
  webhookURL: "/.netlify/functions/lead",
  messages: {
    validation: "Merci de compléter tous les champs obligatoires.",
    success: "Merci ! Votre demande a bien été envoyée.",
    error: "Erreur lors de l’envoi. Merci de réessayer."
  }
};

// IDs tracking
const TRACKING = {
  googleAdsSendTo: 'AW-17995648365/wnVkCKbb34YcEO2a_4RD',
  metaPixelId: '333192019887577'
};

// Anti-doublon (double clic, refresh, etc.)
function trackLeadConversionsOnce() {
  if (window.__leadTracked) return;
  window.__leadTracked = true;

  // Google Ads conversion
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'conversion', {
      send_to: TRACKING.googleAdsSendTo
    });
  } else {
    console.warn('[Tracking] gtag introuvable (Google tag non chargé ?)');
  }

  // Meta Pixel Lead
  if (typeof window.fbq === 'function') {
    window.fbq('track', 'Lead');
  } else {
    console.warn('[Tracking] fbq introuvable (Meta Pixel non chargé ?)');
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('form-eligibilite');
  const submitBtn = form.querySelector('.btn-submit');
  const btnText = submitBtn.querySelector('.btn-text');
  const btnLoader = submitBtn.querySelector('.btn-loader');
  const formMessage = document.getElementById('form-message');

  // Gestion de la soumission du formulaire
  form.addEventListener('submit', async function (e) {
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
      // Envoyer les données au webhook (proxy Netlify)
const resp = await fetch(CONFIG.webhookURL, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData)
});

// La function Netlify renvoie du JSON
const result = await resp.json();

// ✅ On track uniquement si le proxy dit ok:true
if (!resp.ok || result.ok !== true) {
  throw new Error('Proxy not OK: ' + JSON.stringify(result));
}

trackLeadConversionsOnce();

      showMessage(CONFIG.messages.success, 'success');
      form.reset();

      // Scroll vers le message
      formMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

      // Optionnel: rediriger après 1-3 sec vers une page merci
      // setTimeout(() => window.location.href = '/merci.html', 1500);

    } catch (error) {
      console.error("Erreur lors de l'envoi:", error);
      showMessage(CONFIG.messages.error, 'error');

      // Si erreur => on NE track PAS (évite faux leads)
      window.__leadTracked = false;
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
  codePostalInput.addEventListener('input', function () {
    this.value = this.value.replace(/[^0-9]/g, '').slice(0, 5);
  });

  const telephoneInput = document.getElementById('telephone');
  telephoneInput.addEventListener('input', function () {
    this.value = this.value.replace(/[^0-9]/g, '').slice(0, 10);
  });
});
