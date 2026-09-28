/**
 * BERTUSEW RUNNING CLUB — FRONTEND ENGINE
 * Clean vanilla JS with fast interactions and modular event handlers.
 */

document.addEventListener('DOMContentLoaded', () => {

  // 1. Current Year in Footer
  const yearElement = document.getElementById('currentYear');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // 2. Sticky Header Effect
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });

  // 3. Mobile Navigation Drawer (iPhone / Touch Optimized)
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const drawerClose = document.getElementById('drawerClose');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileLinks = document.querySelectorAll('.mobile-link, .btn-full-mobile');

  function openDrawer() {
    mobileDrawer.classList.add('open');
    mobileDrawer.setAttribute('aria-hidden', 'false');
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    mobileDrawer.classList.remove('open');
    mobileDrawer.setAttribute('aria-hidden', 'true');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (hamburgerBtn) hamburgerBtn.addEventListener('click', openDrawer);
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // 4. Scroll Reveal Animations (IntersectionObserver)
  const revealElements = document.querySelectorAll('.reveal-fade');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealElements.forEach(el => observer.observe(el));
  } else {
    // Fallback for older browsers
    revealElements.forEach(el => el.classList.add('revealed'));
  }

  // 5. Back to Top Button
  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 600) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }, { passive: true });

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 6. Interactive Modal (Weekly Runs & Routes)
  const infoModal = document.getElementById('infoModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalTag = document.getElementById('modalTag');
  const modalTitle = document.getElementById('modalTitle');
  const modalDetails = document.getElementById('modalDetails');
  const modalActionBtn = document.getElementById('modalActionBtn');

  const runModalData = {
    'modal-friday': {
      tag: 'WEEKLY RUN SPECIFICATION',
      title: 'Friday Morning Group Run',
      details: 'Kick off your weekend on Addis tarmac. We congregate at [Meeting Point Placeholder: e.g., Meskel Square / Bole Park] at [6:00 AM]. Group warm-up drills run for 10 minutes before splitting into pace leaders for 5K and 8K routes.'
    },
    'modal-sunday': {
      tag: 'FLAGSHIP COMMUNITY EVENT',
      title: 'Sunday Open Community Run',
      details: 'Our largest gathering of the week. Runners of all fitness backgrounds converge at [Meeting Point Placeholder: e.g., Entoto Park Gate] at [6:30 AM]. Bag-drop options and hydration points are organized before tackling 5K, 10K, or 15K courses.'
    },
    'modal-special': {
      tag: 'SPECIAL EVENT SERIES',
      title: 'High-Altitude Hikes & Trail Outings',
      details: 'Off-road excursions across Entoto, Menagesha Suba Forest, and surrounding trails. Focus is on functional stamina, lung capacity, and outdoor camaraderie. Route notes and vehicle carpools are coordinated through our Telegram channel.'
    }
  };

  // Open run cards modal
  document.querySelectorAll('.open-details-btn').forEach(button => {
    button.addEventListener('click', () => {
      const targetId = button.getAttribute('data-target');
      const data = runModalData[targetId];
      if (data && infoModal) {
        modalTag.textContent = data.tag;
        modalTitle.textContent = data.title;
        modalDetails.textContent = data.details;
        modalActionBtn.textContent = 'JOIN THIS RUN';
        openModal();
      }
    });
  });

  // Open route library modal
  document.querySelectorAll('.route-modal-trigger').forEach(button => {
    button.addEventListener('click', () => {
      const rTitle = button.getAttribute('data-route-title');
      const rDist = button.getAttribute('data-route-dist');
      const rInfo = button.getAttribute('data-route-info');

      if (infoModal) {
        modalTag.textContent = `ROUTE BRIEF • ${rDist}`;
        modalTitle.textContent = rTitle;
        modalDetails.textContent = rInfo;
        modalActionBtn.textContent = 'RUN THIS WITH BERTUSEW';
        openModal();
      }
    });
  });

  function openModal() {
    infoModal.classList.add('active');
    infoModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    infoModal.classList.remove('active');
    infoModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (infoModal) {
    infoModal.addEventListener('click', (e) => {
      if (e.target === infoModal) closeModal();
    });
  }
  if (modalActionBtn) {
    modalActionBtn.addEventListener('click', closeModal);
  }

  // 7. Join Form Validation & Submission Handler
  const joinClubForm = document.getElementById('joinClubForm');
  const formSuccessMessage = document.getElementById('formSuccessMessage');

  if (joinClubForm) {
    joinClubForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;

      // Inputs
      const fullName = document.getElementById('fullName');
      const phoneNumber = document.getElementById('phoneNumber');
      const runningExp = document.getElementById('runningExperience');
      const preferredPace = document.getElementById('preferredPace');
      const mainGoal = document.getElementById('mainGoal');

      // Validation logic
      if (!fullName.value.trim()) {
        showError(fullName, true);
        isValid = false;
      } else {
        showError(fullName, false);
      }

      if (!phoneNumber.value.trim() || phoneNumber.value.trim().length < 8) {
        showError(phoneNumber, true);
        isValid = false;
      } else {
        showError(phoneNumber, false);
      }

      if (!runningExp.value) {
        showError(runningExp, true);
        isValid = false;
      } else {
        showError(runningExp, false);
      }

      if (!preferredPace.value) {
        showError(preferredPace, true);
        isValid = false;
      } else {
        showError(preferredPace, false);
      }

      if (!mainGoal.value) {
        showError(mainGoal, true);
        isValid = false;
      } else {
        showError(mainGoal, false);
      }

      if (isValid) {
        // Collect Member Payload
        const memberData = {
          name: fullName.value.trim(),
          phone: phoneNumber.value.trim(),
          telegram: document.getElementById('telegramUser').value.trim() || 'N/A',
          experience: runningExp.value,
          pace: preferredPace.value,
          goal: mainGoal.value,
          registeredAt: new Date().toISOString()
        };

        console.log('BERTUSEW RUNNER REGISTERED:', memberData);

        /* 
           BACKEND HOOK INTEGRATION:
           This is where you can send the data to Google Forms, a Telegram Bot,
           or Formspree via fetch(). Example:
           
           fetch('https://formspree.io/f/YOUR_ID', {
             method: 'POST',
             headers: { 'Content-Type': 'application/json' },
             body: JSON.stringify(memberData)
           });
        */

        // Visual frontend confirmation
        joinClubForm.style.display = 'none';
        formSuccessMessage.style.display = 'block';
        formSuccessMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }

  function showError(inputElement, hasError) {
    const parent = inputElement.closest('.input-group');
    if (!parent) return;
    if (hasError) {
      parent.classList.add('has-error');
    } else {
      parent.classList.remove('has-error');
    }
  }
});
