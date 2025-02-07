"use strict";
import form from "./form.js";
import skillbar from "./skillbar.js";

document.addEventListener("DOMContentLoaded", () => {
  AOS.init({
    once: true,
  });
  form();
  skillbar();

  const nav = document.querySelector("#nav");
  const navBtn = document.querySelector("#nav-btn");
  const navBtnImg = document.querySelector("#nav-btn-img");

  //Hamburger menu
  navBtn.onclick = () => {
    if (nav.classList.toggle("open")) {
      navBtnImg.src = "img/icons/close.svg";
    } else {
      navBtnImg.src = "img/icons/open.svg";
    }
  };

  window.addEventListener("scroll", function () {
    const header = document.querySelector("#header");
    const hero = document.querySelector("#home");
    let triggerHeight = hero.offsetHeight - 170;

    if (window.scrollY > triggerHeight) {
      header.classList.add("header-sticky");
      goToTop.classList.add("reveal");
    } else {
      header.classList.remove("header-sticky");
      goToTop.classList.remove("reveal");
    }
  });

  let sections = document.querySelectorAll("section");
  let navLinks = document.querySelectorAll("header nav a");

  window.onscroll = () => {
    sections.forEach((sec) => {
      let top = window.scrollY;
      let offset = sec.offsetTop - 170;
      let height = sec.offsetHeight;
      let id = sec.getAttribute("id");

      if (top >= offset && top < offset + height) {
        navLinks.forEach((links) => {
          links.classList.remove("active");
          document
            .querySelector("header nav a[href*=" + id + "]")
            .classList.add("active");
        });
      }
    });
  };
});

  // Project details toggle functionality
  const projectLinks = document.querySelectorAll('.project-link');

  projectLinks.forEach(link => {
    link.addEventListener('click', function(event) {
      event.preventDefault(); // Prevent the default link behavior

      const projectBox = link.closest('.project-box'); // Find the parent .project-box
      const details = projectBox.querySelector('.project-details');

      // Close any other open details sections
      document.querySelectorAll('.project-details.active').forEach(otherDetails => {
        if (otherDetails !== details) {
          otherDetails.classList.remove('active');
          otherDetails.closest('.project-box').classList.remove('no-hover'); // Re-enable hover for other boxes
        }
      });

      // Toggle the 'active' class on the clicked project's details
      details.classList.toggle('active');
      projectBox.classList.toggle('no-hover'); // Toggle the 'no-hover' class

      // Smoothly scroll to the expanded details section
      if (details.classList.contains('active')) {
        setTimeout(() => {
          projectBox.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100); // Small delay to let the element become visible
      }
    });
  });

  // Close button functionality
  const closeButtons = document.querySelectorAll('.close-details-btn');
  closeButtons.forEach(button => {
    button.addEventListener('click', function(event) {
      event.preventDefault(); // Prevent any default button behavior
      const details = this.closest('.project-details');
      const projectBox = details.closest('.project-box');

      details.classList.remove('active');
      projectBox.classList.remove('no-hover'); // Re-enable hover effects
    });
  });
