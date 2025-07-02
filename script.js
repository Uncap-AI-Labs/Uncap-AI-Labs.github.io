// script.js
// This file contains interactive JavaScript functionality for the Uncap Tutor website.

// Main DOMContentLoaded event
document.addEventListener("DOMContentLoaded", () => {
  console.log("Uncap Tutor website loaded!");

  // Initialize modal functionality
  initializeModals();

  // Initialize download button functionality
  initializeDownloadButtons();
});

// Modal functionality
function initializeModals() {
  // Get modal elements
  const privacyModal = document.getElementById("privacy-modal");
  const termsModal = document.getElementById("terms-modal");
  const privacyBtn = document.getElementById("privacy-btn");
  const termsBtn = document.getElementById("terms-btn");
  const privacyClose = document.getElementById("privacy-close");
  const termsClose = document.getElementById("terms-close");

  // Function to open modal with animation
  function openModal(modal) {
    modal.classList.remove("hidden");
    // Trigger reflow to ensure the hidden class is removed before adding opacity
    modal.offsetHeight;
    modal.classList.remove("opacity-0");
    modal.classList.add("opacity-100");
    document.body.style.overflow = "hidden"; // Prevent background scrolling
  }

  // Function to close modal with animation
  function closeModal(modal) {
    modal.classList.remove("opacity-100");
    modal.classList.add("opacity-0");
    setTimeout(() => {
      modal.classList.add("hidden");
      document.body.style.overflow = ""; // Restore scrolling
    }, 300); // Match the transition duration
  }

  // Event listeners for opening modals
  privacyBtn.addEventListener("click", () => {
    openModal(privacyModal);
  });

  termsBtn.addEventListener("click", () => {
    openModal(termsModal);
  });

  // Event listeners for closing modals
  privacyClose.addEventListener("click", () => {
    closeModal(privacyModal);
  });

  termsClose.addEventListener("click", () => {
    closeModal(termsModal);
  });

  // Close modal when clicking on backdrop
  privacyModal.addEventListener("click", (e) => {
    if (e.target === privacyModal) {
      closeModal(privacyModal);
    }
  });

  termsModal.addEventListener("click", (e) => {
    if (e.target === termsModal) {
      closeModal(termsModal);
    }
  });

  // Close modal on Escape key press
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (!privacyModal.classList.contains("hidden")) {
        closeModal(privacyModal);
      }
      if (!termsModal.classList.contains("hidden")) {
        closeModal(termsModal);
      }
    }
  });
}

// Download button functionality
function initializeDownloadButtons() {
  // Get all download buttons
  const downloadButtons = document.querySelectorAll(".download-button");

  downloadButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();

      // Add click animation
      button.style.transform = "translateY(-1px) scale(0.98)";
      setTimeout(() => {
        button.style.transform = "";
      }, 150);

      // Determine which store
      const isAppStore = button.classList.contains("app-store-btn");
      const isGooglePlay = button.classList.contains("google-play-btn");

      if (isAppStore) {
        showDownloadMessage(
          "App Store",
          "The Uncap Tutor app will be available on the App Store soon! Stay tuned for updates."
        );
      } else if (isGooglePlay) {
        showDownloadMessage(
          "Google Play",
          "The Uncap Tutor app will be available on Google Play soon! Stay tuned for updates."
        );
      }
    });
  });
}

// Show download message with styled alert
function showDownloadMessage(store, message) {
  // Create a custom modal-like notification
  const notification = document.createElement("div");
  notification.className =
    "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 opacity-0 transition-opacity duration-300";

  notification.innerHTML = `
    <div class="bg-gradient-to-br from-purple-900 to-indigo-900 p-8 rounded-2xl max-w-md mx-4 text-white text-center transform scale-90 transition-transform duration-300">
      <div class="mb-4">
        <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
          <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
          </svg>
        </div>
        <h3 class="text-xl font-bold mb-2">Coming to ${store}!</h3>
        <p class="text-gray-300">${message}</p>
      </div>
      <button class="bg-white text-purple-900 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-200" onclick="this.closest('.fixed').remove()">
        Got it!
      </button>
    </div>
  `;

  document.body.appendChild(notification);

  // Trigger animation
  setTimeout(() => {
    notification.classList.remove("opacity-0");
    notification.querySelector("div").classList.remove("scale-90");
  }, 10);

  // Auto-remove after 5 seconds
  setTimeout(() => {
    notification.classList.add("opacity-0");
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 300);
  }, 5000);

  // Click outside to close
  notification.addEventListener("click", (e) => {
    if (e.target === notification) {
      notification.remove();
    }
  });
}

// Smooth scrolling for any internal links (if added in the future)
function smoothScroll(target) {
  document.querySelector(target).scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}
