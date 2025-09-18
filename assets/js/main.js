// Babuba.com - Main JavaScript File
// Language switching and interactive features

class BabubaApp {
  constructor() {
    this.currentLanguage = this.getCurrentLanguage();
    this.init();
  }

  init() {
    this.setupLanguageSwitcher();
    this.setupPhaseTabs();
    this.setupScrollEffects();
    this.setupRTLSupport();
    this.updateCurrentYear();
  }

  // Language Management
  getCurrentLanguage() {
    const path = window.location.pathname;
    let lang = 'tr'; // default to Turkish
    
    if (path.startsWith('/tr')) lang = 'tr';
    else if (path.startsWith('/en')) lang = 'en';
    else if (path.startsWith('/zh')) lang = 'zh';
    else if (path.startsWith('/ar')) lang = 'ar';
    
    // Save to localStorage for persistence
    localStorage.setItem('babuba-language', lang);
    return lang;
  }

  setupLanguageSwitcher() {
    // Mark current language as active in language switcher
    this.updateLanguageSwitcher();
  }

  updateLanguageSwitcher() {
    const langLinks = document.querySelectorAll('header a[href^="/"]');
    
    langLinks.forEach(link => {
      // Remove active classes
      link.classList.remove('bg-primary', 'text-white', 'shadow-md');
      link.classList.add('text-gray-600', 'hover:text-primary', 'hover:bg-gray-100');
      
      // Check if this is the current language
      const href = link.getAttribute('href');
      if (href === `/${this.currentLanguage}/` || 
          (this.currentLanguage === 'tr' && href === '/tr/') ||
          (this.currentLanguage === 'en' && href === '/en/') ||
          (this.currentLanguage === 'zh' && href === '/zh/') ||
          (this.currentLanguage === 'ar' && href === '/ar/')) {
        link.classList.remove('text-gray-600', 'hover:text-primary', 'hover:bg-gray-100');
        link.classList.add('bg-primary', 'text-white', 'shadow-md');
      }
    });
  }

  switchLanguage(lang) {
    // Navigate to the language-specific page
    window.location.href = `/${lang}/`;
  }

  updatePageContent(lang) {
    // In a real application, you would load the appropriate language content here
    // For now, we'll just update the document direction and language attribute
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    
    // You could also trigger a content update here
    // this.loadTranslatedContent(lang);
  }

  // Phase Tabs Management
  setupPhaseTabs() {
    const phaseTabs = document.querySelectorAll('.phase-tab');
    
    phaseTabs.forEach((tab, index) => {
      tab.addEventListener('click', () => {
        // Remove active class from all tabs
        phaseTabs.forEach(t => {
          t.classList.remove('active');
          t.classList.remove('bg-primary', 'text-white');
          t.classList.add('bg-white', 'text-gray-600', 'border-2', 'border-gray-200');
        });

        // Add active class to clicked tab
        tab.classList.add('active');
        tab.classList.remove('bg-white', 'text-gray-600', 'border-2', 'border-gray-200');
        tab.classList.add('bg-primary', 'text-white');

        // Show/hide corresponding content
        if (index === 0) {
          // Show Phase 1 content
          const phase1Content = document.querySelector('.phase-content-1');
          const phase2Content = document.querySelector('.phase-content-2');
          
          if (phase1Content) phase1Content.classList.remove('hidden');
          if (phase2Content) phase2Content.classList.add('hidden');
        } else if (index === 1) {
          // Show Phase 2 content
          const phase1Content = document.querySelector('.phase-content-1');
          const phase2Content = document.querySelector('.phase-content-2');
          
          if (phase1Content) phase1Content.classList.add('hidden');
          if (phase2Content) phase2Content.classList.remove('hidden');
        }
      });
    });

    // Set first tab as active by default
    if (phaseTabs.length > 0) {
      phaseTabs[0].classList.add('active');
      phaseTabs[0].classList.remove('bg-white', 'text-gray-600', 'border-2', 'border-gray-200');
      phaseTabs[0].classList.add('bg-primary', 'text-white');
    }
  }

  // Scroll Effects
  setupScrollEffects() {
    const header = document.querySelector('header');
    
    if (header) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }


  // RTL Support for Arabic
  setupRTLSupport() {
    this.applyRTLSupport();
  }

  applyRTLSupport() {
    if (this.currentLanguage === 'ar') {
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = 'ar';
    } else {
      document.documentElement.dir = 'ltr';
    }
  }


  // Update current year in footer
  updateCurrentYear() {
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
      yearSpan.textContent = new Date().getFullYear();
    }
  }

  // Utility Methods
  showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
      position: 'fixed',
      top: '20px',
      right: '20px',
      padding: '1rem 2rem',
      borderRadius: '8px',
      color: 'white',
      fontWeight: '600',
      zIndex: '10000',
      transform: 'translateX(100%)',
      transition: 'transform 0.3s ease-in-out'
    });

    // Set background color based on type
    const colors = {
      info: '#1977ff',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444'
    };
    notification.style.backgroundColor = colors[type] || colors.info;

    // Add to page
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);

    // Remove after 3 seconds
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  }

  // Form handling (for future contact forms)
  setupFormHandling() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleFormSubmit(form);
      });
    });
  }

  handleFormSubmit(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Gönderiliyor...';
    submitBtn.disabled = true;

    // Simulate form submission
    setTimeout(() => {
      this.showNotification('Mesajınız başarıyla gönderildi!', 'success');
      form.reset();
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }, 2000);
  }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.babubaApp = new BabubaApp();
});

// Handle browser back/forward buttons
window.addEventListener('popstate', () => {
  if (window.babubaApp) {
    window.babubaApp.currentLanguage = window.babubaApp.getCurrentLanguage();
    window.babubaApp.applyRTLSupport();
  }
});

// Performance optimization: Lazy load images
document.addEventListener('DOMContentLoaded', () => {
  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));
});

// Add loading states for better UX
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});

// Service Worker registration for PWA capabilities (future enhancement)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // navigator.serviceWorker.register('/sw.js');
  });
}