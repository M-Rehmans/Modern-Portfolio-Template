const header = document.querySelector('header');
const navLinks = document.querySelectorAll('header nav a');
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('header nav');
const sections = document.querySelectorAll('section');
const logoSpan = document.querySelector('.logo span');

window.onscroll = () => {
  sections.forEach(sec => {
    const top = window.scrollY;
    const offset = sec.offsetTop - 120;
    const height = sec.offsetHeight;
    const id = sec.getAttribute('id');

    if (top >= offset && top < offset + height) {
      navLinks.forEach(links => {
        links.classList.remove('active');
        document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
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
      logoSpan.style.color = 'var(--light)';
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
      logoSpan.style.color = 'var(--secondary)';
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
  // Trigger scroll logic manually so nav background and link color update correctly
  window.dispatchEvent(new Event('scroll'));
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



// Select all scrollable sections by a common class
const scrollableSections = document.querySelectorAll('.scrollable-section');

scrollableSections.forEach(section => {
  section.addEventListener('wheel', (event) => {
    const { scrollTop, scrollHeight, clientHeight } = section;
    const isScrollable = scrollHeight > clientHeight;
    const atTop = scrollTop === 0;
    const atBottom = scrollTop + clientHeight >= scrollHeight - 1; // pixel rounding

    if ((atTop && event.deltaY < 0) || (atBottom && event.deltaY > 0)) {
      // Allow page to scroll
    } else if (isScrollable) {
      // Prevent page from scrolling
      event.stopPropagation();
    }
  }, { passive: true }); // passive can stay true here since we don't call preventDefault
});



// Projects Management
document.addEventListener("DOMContentLoaded", function () {
  const btn = document.getElementById("toggleProjectsBtn");
  const container = document.querySelector(".projects-Container");

  if (!container || !btn) return;

  const monthMap = {
    jan: 0, january: 0,
    feb: 1, february: 1,
    mar: 2, march: 2,
    apr: 3, april: 3,
    may: 4,
    jun: 5, june: 5,
    jul: 6, july: 6,
    aug: 7, august: 7,
    sep: 8, september: 8,
    oct: 9, october: 9,
    nov: 10, november: 10,
    dec: 11, december: 11
  };

  function parseDateFromProject(project) {
    const dateText = project.querySelector(".project-date p:nth-child(2)")?.textContent.trim();
    if (!dateText) return new Date(0);

    const [year, monthStr, day] = dateText.split("-");
    const monthKey = monthStr.trim().toLowerCase();
    const month = monthMap[monthKey] ?? 0;
    return new Date(parseInt(year), month, parseInt(day));
  }

  // Get and sort projects by date DESC (newest first)
  const projects = Array.from(container.querySelectorAll(".project")).sort((a, b) => {
    const dateA = parseDateFromProject(a);
    const dateB = parseDateFromProject(b);
    return dateB - dateA; // Newest first
  });

  // Replace in container
  container.innerHTML = "";
  // projects.forEach(project => container.appendChild(project));
  projects.forEach((project, index) => {
    container.appendChild(project);

    // Add <hr> after each project except the last one
    if (index < projects.length - 1) {
      const hr = document.createElement("hr");
      container.appendChild(hr);
    }
  });



  // Hide button if projects <= 3
  if (projects.length <= 3) {
    btn.style.display = "none";
    projects.forEach(project => project.classList.add("visible"));
    return;
  }

  let showingAll = false;

  function updateView() {
    projects.forEach((project, index) => {
      project.classList.remove("visible");
      if (!showingAll && index < 3) {
        project.classList.add("visible");
      } else if (showingAll) {
        project.classList.add("visible");
      }
    });

    btn.textContent = showingAll ? "Show Less Projects" : "Show More Projects";
  }

  btn.addEventListener("click", () => {
    showingAll = !showingAll;
    updateView();
  });

  updateView();
});





function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);

    fetch("/", {
      method: "POST",
      body: data
    }).then(() => {
      form.reset();
      document.getElementById("dialog").style.display = "block";
    }).catch(error => {
      alert("Something went wrong!");
      console.error(error);
    });
  }

  function closeDialog() {
    document.getElementById("dialog").style.display = "none";
  }
