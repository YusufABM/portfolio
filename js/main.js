"use strict";
import skillbar from "./skillbar.js";

document.addEventListener("DOMContentLoaded", () => {
  AOS.init({
    once: true,
  });
  skillbar();

  const nav = document.querySelector("#nav");
  const navBtn = document.querySelector("#nav-btn");
  const navBtnImg = document.querySelector("#nav-btn-img");
  const navLinks = document.querySelectorAll("#nav a");

  //Hamburger menu
  navBtn.onclick = () => {
    if (nav.classList.toggle("open")) {
      navBtnImg.src = "img/icons/close.svg";
    } else {
      navBtnImg.src = "img/icons/open.svg";
    }
  };

  // Close nav when a link is clicked
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      if (nav.classList.contains("open")) {
        nav.classList.remove("open");
        navBtnImg.src = "img/icons/open.svg";
      }
    });
  });

  function debounce(func, wait = 20, immediate = true) {
    let timeout;
    return function() {
      let context = this, args = arguments;
      let later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      let callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }

  window.addEventListener('scroll', debounce(() => {
    sections.forEach((sec) => {
      let top = window.scrollY;
      let offset = sec.offsetTop - 170;
      let height = sec.offsetHeight;
      let id = sec.getAttribute("id");

      if (top >= offset && top < offset + height) {
        navLinks.forEach((links) => {
          links.classList.remove("active");
          document
            .querySelector(`header nav a[href*="${id}"]`)
            .classList.add("active");
        });
      }
    });
  }));

  // Project details toggle functionality
  const projectLinks = document.querySelectorAll('.project-link');

  projectLinks.forEach(link => {
    link.addEventListener('click', function(event) {
      event.preventDefault();

      const projectBox = link.closest('.project-box'); // Find the parent .project-box
      if (!projectBox) return; // Add null check
      const details = projectBox.querySelector('.project-details');

      // Close any other open details sections
      document.querySelectorAll('.project-details.active').forEach(otherDetails => {
        if (otherDetails !== details) {
          otherDetails.classList.remove('active');
          otherDetails.closest('.project-box').classList.remove('no-hover');
        }
      });

      // Toggle the 'active' class on the clicked project's details
      details.classList.toggle('active');
      projectBox.classList.toggle('no-hover');

      // Smoothly scroll to the expanded details section
      if (details.classList.contains('active')) {
        setTimeout(() => {
          projectBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
      }
    });
  });

  // Close button functionality
  const closeButtons = document.querySelectorAll('.close-details-btn');
  closeButtons.forEach(button => {
    button.addEventListener('click', function(event) {
      const details = this.closest('.project-details');
      if (!details) return;
      const projectBox = details.closest('.project-box');

      details.classList.remove('active');
      projectBox.classList.remove('no-hover'); // Re-enable hover effects
    });
  });
});
