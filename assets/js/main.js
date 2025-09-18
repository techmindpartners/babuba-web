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
    this.setupHeaderScroll();
    this.setupMobileMenu();
    this.setupActiveNavigation();
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

  // Header scroll effects
  setupHeaderScroll() {
    const header = document.getElementById('main-header');
    if (!header) return;

    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateHeader = () => {
      const scrollY = window.scrollY;
      
      if (scrollY > 100) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      
      lastScrollY = scrollY;
      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(updateHeader);
        ticking = true;
      }
    };

    window.addEventListener('scroll', requestTick);
  }

  // Mobile menu functionality
  setupMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (!mobileMenuBtn || !mobileMenu) return;

    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
      mobileMenu.classList.toggle('show');
      
      // Toggle icon
      const icon = mobileMenuBtn.querySelector('i');
      if (mobileMenu.classList.contains('hidden')) {
        icon.className = 'ph-duotone ph-list text-2xl';
      } else {
        icon.className = 'ph-duotone ph-x text-2xl';
      }
    });

    // Close mobile menu when clicking on a link
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileMenu.classList.remove('show');
        const icon = mobileMenuBtn.querySelector('i');
        icon.className = 'ph-duotone ph-list text-2xl';
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.add('hidden');
        mobileMenu.classList.remove('show');
        const icon = mobileMenuBtn.querySelector('i');
        icon.className = 'ph-duotone ph-list text-2xl';
      }
    });
  }

  // Active navigation tracking using Intersection Observer (HTML Best Practice)
  setupActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    
    if (sections.length === 0 || navLinks.length === 0) return;

    // Create a map of section IDs to their corresponding nav links
    const sectionToNavMap = new Map();
    sections.forEach(section => {
      const sectionId = section.getAttribute('id');
      const correspondingLinks = Array.from(navLinks).filter(link => 
        link.getAttribute('href') === `#${sectionId}`
      );
      sectionToNavMap.set(sectionId, correspondingLinks);
    });

    // Intersection Observer options
    const observerOptions = {
      root: null, // viewport
      rootMargin: '-20% 0px -60% 0px', // Trigger when section is 20% from top
      threshold: 0.1 // Trigger when 10% of section is visible
    };

    // Callback function for intersection observer
    const observerCallback = (entries) => {
      // Find the section with the highest intersection ratio
      let mostVisibleSection = null;
      let highestRatio = 0;

      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > highestRatio) {
          highestRatio = entry.intersectionRatio;
          mostVisibleSection = entry.target;
        }
      });

      // If we found a visible section, update active states
      if (mostVisibleSection) {
        const activeSectionId = mostVisibleSection.getAttribute('id');
        
        // Remove active class from all nav links
        navLinks.forEach(link => {
          link.classList.remove('active');
        });

        // Add active class to corresponding nav links
        const activeLinks = sectionToNavMap.get(activeSectionId);
        if (activeLinks) {
          activeLinks.forEach(link => {
            link.classList.add('active');
          });
        }
      }
    };

    // Create and start the observer
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // Observe all sections
    sections.forEach(section => {
      observer.observe(section);
    });

    // Fallback: If no section is intersecting, check scroll position
    const fallbackCheck = () => {
      const scrollY = window.scrollY;
      const headerHeight = 100;
      
      let currentSection = null;
      sections.forEach(section => {
        const sectionTop = section.offsetTop - headerHeight;
        if (scrollY >= sectionTop) {
          currentSection = section;
        }
      });

      // If we have a current section and no active links, activate it
      if (currentSection) {
        const hasActiveLinks = Array.from(navLinks).some(link => link.classList.contains('active'));
        if (!hasActiveLinks) {
          const sectionId = currentSection.getAttribute('id');
          const activeLinks = sectionToNavMap.get(sectionId);
          if (activeLinks) {
            activeLinks.forEach(link => {
              link.classList.add('active');
            });
          }
        }
      }
    };

    // Run fallback check on scroll
    let ticking = false;
    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(fallbackCheck);
        ticking = true;
      }
    };

    window.addEventListener('scroll', requestTick);
    
    // Initial check
    fallbackCheck();
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