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
    this.setupAnimations();
    this.setupRTLSupport();
    this.setupMicroInteractions();
    this.setupParallaxEffects();
    this.updateCurrentYear();
  }

  // Language Management
  getCurrentLanguage() {
    const path = window.location.pathname;
    if (path.startsWith('/tr')) return 'tr';
    if (path.startsWith('/en')) return 'en';
    if (path.startsWith('/zh')) return 'zh';
    if (path.startsWith('/ar')) return 'ar';
    return 'tr'; // default to Turkish
  }

  setupLanguageSwitcher() {
    const langButtons = document.querySelectorAll('.lang-btn');
    
    langButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const lang = btn.dataset.lang;
        this.switchLanguage(lang);
      });
    });

    // Mark current language as active
    const currentLangBtn = document.querySelector(`[data-lang="${this.currentLanguage}"]`);
    if (currentLangBtn) {
      currentLangBtn.classList.add('active');
    }
  }

  switchLanguage(lang) {
    const currentPath = window.location.pathname;
    const newPath = currentPath.replace(/^\/[a-z]{2}/, `/${lang}`);
    
    // Update URL without page reload
    window.history.pushState({}, '', newPath);
    
    // Update active language button
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    document.querySelector(`[data-lang="${lang}"]`).classList.add('active');
    
    this.currentLanguage = lang;
    
    // Apply RTL for Arabic
    this.applyRTLSupport();
    
    // Update page content (in a real app, this would load translated content)
    this.updatePageContent(lang);
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

  // Advanced Animation on Scroll
  setupAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Add staggered animation delays
          setTimeout(() => {
            entry.target.classList.add('fade-in');
            
            // Add special animations for different elements
            if (entry.target.classList.contains('group')) {
              entry.target.classList.add('scale-in');
            }
          }, index * 100); // Stagger by 100ms
        }
      });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.group').forEach(el => {
      observer.observe(el);
    });

    // Setup staggered animations for grids
    this.setupStaggeredAnimations();
  }

  setupStaggeredAnimations() {
    const staggerObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const children = entry.target.children;
          Array.from(children).forEach((child, index) => {
            setTimeout(() => {
              child.style.opacity = '1';
              child.style.transform = 'translateY(0)';
            }, index * 150);
          });
        }
      });
    }, { threshold: 0.1 });

    // Apply staggered animation to grids
    document.querySelectorAll('.stagger-animation').forEach(grid => {
      staggerObserver.observe(grid);
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

  // Micro-interactions
  setupMicroInteractions() {
    // Add ripple effect to buttons
    document.querySelectorAll('a, button').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.createRipple(e);
      });
    });

    // Add hover effects to cards
    document.querySelectorAll('.group').forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px) scale(1.02)';
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
      });
    });

    // Add typing effect to hero title
    this.setupTypingEffect();
  }

  createRipple(e) {
    const button = e.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');

    button.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  }

  setupTypingEffect() {
    const heroTitle = document.querySelector('h1');
    if (heroTitle) {
      const text = heroTitle.textContent;
      heroTitle.textContent = '';
      heroTitle.style.borderRight = '2px solid #1977ff';
      
      let i = 0;
      const typeWriter = () => {
        if (i < text.length) {
          heroTitle.textContent += text.charAt(i);
          i++;
          setTimeout(typeWriter, 100);
        } else {
          // Remove cursor after typing is complete
          setTimeout(() => {
            heroTitle.style.borderRight = 'none';
          }, 1000);
        }
      };
      
      // Start typing effect after a short delay
      setTimeout(typeWriter, 500);
    }
  }

  // Parallax effects
  setupParallaxEffects() {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const parallaxElements = document.querySelectorAll('.animate-float');
      
      parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.2);
        element.style.transform = `translateY(${scrolled * speed}px)`;
      });
    });
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