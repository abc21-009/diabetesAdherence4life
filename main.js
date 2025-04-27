/**
 * DiabetesAdhere4Life - Main JavaScript
 * Responsible for handling interactions, navigation, and responsive features
 */

document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navList = document.querySelector('.nav-list');

  if (menuToggle && navList) {
    menuToggle.addEventListener('click', function() {
      navList.classList.toggle('active');
      menuToggle.setAttribute('aria-expanded',
        menuToggle.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'
      );
    });
  }

  // Mobile dropdown toggles
  const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', function(e) {
      // Only apply this on mobile view
      if (window.innerWidth <= 768) {
        e.preventDefault();
        const parent = this.closest('.dropdown');

        // Close all other dropdowns
        document.querySelectorAll('.dropdown').forEach(item => {
          if (item !== parent) {
            item.classList.remove('active');
          }
        });

        // Toggle current dropdown
        parent.classList.toggle('active');
      }
    });
  });

  // Close dropdowns when clicking outside
  document.addEventListener('click', function(e) {
    if (window.innerWidth <= 768) {
      const dropdowns = document.querySelectorAll('.dropdown.active');
      dropdowns.forEach(dropdown => {
        if (!dropdown.contains(e.target)) {
          dropdown.classList.remove('active');
        }
      });
    }
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');

      if (targetId !== '#') {
        e.preventDefault();

        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80, // Adjust for fixed header
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // Sticky header effect
  let lastScrollTop = 0;
  const header = document.querySelector('header');

  if (header) {
    window.addEventListener('scroll', function() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > 100) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }

      lastScrollTop = scrollTop;
    });
  }

  // Testimonial carousel (if implemented)
  const testimonialCarousel = document.querySelector('.testimonial-carousel');
  if (testimonialCarousel) {
    // Implement carousel functionality here
    // This would be expanded if a carousel component is added
  }

  // Form validation for newsletter
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const emailInput = this.querySelector('input[type="email"]');

      if (emailInput && emailInput.value.trim() !== '') {
        // Validate email format
        if (isValidEmail(emailInput.value)) {
          // Submit form or show success message
          showMessage('Thank you for subscribing!', 'success');
          this.reset();
        } else {
          showMessage('Please enter a valid email address', 'error');
        }
      } else {
        showMessage('Please enter your email address', 'error');
      }
    });
  }

  // Utility functions
  function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  function showMessage(message, type) {
    const messageContainer = document.createElement('div');
    messageContainer.className = `message message-${type}`;
    messageContainer.textContent = message;

    document.body.appendChild(messageContainer);

    // Remove after 3 seconds
    setTimeout(() => {
      messageContainer.remove();
    }, 3000);
  }

  // Accessibility enhancements
  document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
    toggle.setAttribute('aria-haspopup', 'true');
    toggle.setAttribute('aria-expanded', 'false');

    toggle.addEventListener('mouseenter', function() {
      if (window.innerWidth > 768) {
        this.setAttribute('aria-expanded', 'true');
      }
    });

    toggle.addEventListener('mouseleave', function() {
      if (window.innerWidth > 768) {
        this.setAttribute('aria-expanded', 'false');
      }
    });
  });
});
