const header = document.querySelector('header');
const navLinks = document.querySelectorAll('header nav a');
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('header nav');
const sections = document.querySelectorAll('section');

window.onscroll = () => {
  sections.forEach(sec => {
    const top = window.scrollY;
    const offset = sec.offsetTop - 160;
    const height = sec.offsetHeight;
    const id = sec.getAttribute('id');

    if (top >= offset && top < offset + height) {
        navLinks.forEach(links => {
          links.classList.remove('active');
          document.querySelector('header nav a[href*=' + id +']').classList.add('active');
        });
    };

  });
}

// menu icon
menuIcon.addEventListener('click', () => {
  menuIcon.classList.toggle('fa-xmark');
  navbar.classList.toggle('active');
});



// Function to update link colors
const updateLinkColors = () => {
  if (header.classList.contains('active')) {
    // Header background is secondary
    navLinks.forEach(link => {
      link.style.color = 'var(--light)'; // Change color to light
    });

    // Keep active link color as primary
    const activeLink = document.querySelector('header nav a.active');
    if (activeLink) {
      activeLink.style.color = 'var(--primary)';
    }
  } else {
    // Header background is light
    navLinks.forEach(link => {
      link.style.color = 'var(--secondary)'; // Change color to secondary
    });

    // Keep active link color as primary
    const activeLink = document.querySelector('header nav a.active');
    if (activeLink) {
      activeLink.style.color = 'var(--primary)';
    }
  }
};

// Event listener for scroll effect and updating link colors
window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    header.classList.add('active');
  } else {
    header.classList.remove('active');
  }
  updateLinkColors();
});

// Event listener to handle link color change on click
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navLinks.forEach(link => link.classList.remove('active')); // Remove active class from all links

    // shift the toogle button into x and close the nav box after click on the page link 
    menuIcon.classList.remove('fa-xmark');
    navbar.classList.remove('active');


    link.classList.add('active'); // Add active class to the clicked link
    updateLinkColors(); // Update link colors
  });
});


// First section Typing effect
const typedTextSpan = document.querySelector(".typed-text");
const cursorSpan = document.querySelector(".cursor");

const textArray = ["Designer", "Developer", "SEO Expert"];
const typingDelay = 200;
const erasingDelay = 100;
const newTextDelay = 500; // Delay between current and next text
let textArrayIndex = 0;
let charIndex = 0;

function type() {
  if (charIndex < textArray[textArrayIndex].length) {
    if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
    typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingDelay);
  }
  else {
    cursorSpan.classList.remove("typing");
    setTimeout(erase, newTextDelay);
  }
}

function erase() {
  if (charIndex > 0) {
    if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
    typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, erasingDelay);
  }
  else {
    cursorSpan.classList.remove("typing");
    textArrayIndex++;
    if (textArrayIndex >= textArray.length) textArrayIndex = 0;
    setTimeout(type, typingDelay + 1100);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // On DOM Load initiate the effect
  if (textArray.length) setTimeout(type, newTextDelay + 250);
});

// First Section Typing Effect's code Completed

// Resume Section with scroll boxes
const resumeBtns = document.querySelectorAll('.resume-btn');

resumeBtns.forEach((btn, idx) => {
  btn.addEventListener('click', () => {
    // activating the Experience Box, Skiils box, about, and education
    const resumeDetails = document.querySelectorAll('.resume-detail')

    // activating the buttons
    resumeBtns.forEach(btn => {
      btn.classList.remove('active');
    });
    btn.classList.add('active');

    resumeDetails.forEach(detail => {
      detail.classList.remove('active');
    });
    resumeDetails[idx].classList.add('active');
  });
});



// 
const scrollableSections = document.querySelectorAll('.resume-list');

scrollableSections.forEach(section => {
    section.addEventListener('wheel', (event) => {
        const { scrollTop, scrollHeight, clientHeight } = section;
        const atTop = scrollTop === 0;
        const atBottom = scrollTop + clientHeight === scrollHeight;

        if ((atTop && event.deltaY < 0) || (atBottom && event.deltaY > 0)) {
            // Allow page scrolling
            event.preventDefault();
            section.blur();
        } else {
            // Prevent page scrolling
            event.stopPropagation();
        }
    });
});
