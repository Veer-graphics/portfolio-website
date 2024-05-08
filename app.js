document.addEventListener('DOMContentLoaded', () => {
    const preloaderAnimation = lottie.loadAnimation(
        {
            container: document.querySelector('.preloader-content'),
            renderer: 'svg',
            loop: false,
            autoplay: true, 
            path: 'lottie-animations/preloader-animation.json'
        }
    );

    preloaderAnimation.addEventListener('complete', () => {
        const preloader = document.querySelector('.preloader');
        preloader.style.transition = 'opacity 2s ease';
        preloader.style.opacity = 0;

        setTimeout(() => {
            preloader.style.opacity = 0;
        }, 8000)

        setTimeout(() => {
            preloader.style.display = 'none';
        }, 800)
    })
})

// CURSOR HOVER
document.addEventListener('mousemove', (e) => {
    const cursor = document.querySelector('.cursor-dot');
    cursor.style.left = (e.clientX - 10) + 'px';
    cursor.style.top = (e.clientY - 10) + 'px';
})

// banner scroll

// Function to handle scroll event
// Function to handle scroll event for the first banner container
function handleScrollBannerOne() {
    const bannerContainer = document.querySelector('.banner-one');
    const rect = bannerContainer.getBoundingClientRect();
    if (
      rect.top >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    ) {
      bannerContainer.classList.add('scrolling');
    } else {
      bannerContainer.classList.remove('scrolling');
    }
  }
  
  // Function to handle scroll event for the second banner container
  function handleScrollBannerTwo() {
    const bannerContainer = document.querySelector('.banner-two');
    const rect = bannerContainer.getBoundingClientRect();
    if (
      rect.top >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    ) {
      bannerContainer.classList.add('scrolling');
    } else {
      bannerContainer.classList.remove('scrolling');
    }
  }
  
  // Attach scroll event listener for the first banner container
  window.addEventListener('scroll', handleScrollBannerOne);
  
  // Attach scroll event listener for the second banner container
  window.addEventListener('scroll', handleScrollBannerTwo);
  
  // Initial check when the page loads for the first banner container
  window.addEventListener('load', handleScrollBannerOne);
  
  // Initial check when the page loads for the second banner container
  window.addEventListener('load', handleScrollBannerTwo);
  

// download cv
const downloadBtn = document.querySelector('.download-btn');

downloadBtn.addEventListener('click', () => {
  var fileUrl = 'about/cv-vera-best.pdf';
  window.location.href= fileUrl;
})

// blur dots on mouse move
document.addEventListener('DOMContentLoaded', () => {
  const aboutSection = document.querySelector('.section_about-me');
  const blurDot = document.querySelector('.blurred-bg-dot');

  aboutSection.addEventListener('mousemove', (event) => {
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    const dotX = mouseX - 10;
    const dotY = mouseY - 10;

    blurDot.style.left = dotX + "px";
    blurDot.style.top = dotY + "px";
  })
})

// get testimonials
function testimonialHoverDots() {
  const testimonialSection = document.querySelector('.section_testimonial');
  const dot1 = testimonialSection.querySelector('.testimonial-dot-one');
  const dot2 = testimonialSection.querySelector('.testimonial-dot-two');

  testimonialSection.addEventListener('mousemove', (event) => {
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    const dot1X = mouseX - 10;
    const dot1Y = mouseY - 10;
    const dot2X = mouseX + 10;
    const dot2Y = mouseY + 10;

    dot1.style.left = dot1X + "px";
    dot1.style.top = dot1Y + "px";
    dot2.style.left = dot2X + "px";
    dot2.style.top = dot2Y + "px";
  })
}

function fetchData(category = 'all') {
  fetch('data.json')
  .then(response => response.json())
  .then(data => {
    showTestimonials(data.testimonials);
    showProjects(data.projects, category);
  }) .catch(error => console.error(error, 'fetch error'))
}



function showTestimonials(testimonials) {
  const testimonialContainer = document.querySelector('.testimonial-grid');

  testimonials.forEach(testimonial => {
    const testimonialElement = document.createElement('div');
    testimonialElement.classList.add('testimonial');
    testimonialElement.innerHTML = `
    <p class="review">${testimonial.review}</p>
    <div class="testimonial-footer">
      <p class="author-name">${testimonial.naam}</p>
      <p class="author-function">${testimonial.functie}</p>
    </div>
    `;
    testimonialContainer.appendChild(testimonialElement);
  })
}

function showProjects(projects, category) {
  const projectContainer = document.querySelector('.project-grid');
  projectContainer.innerHTML = '';


  projects.forEach(project => {
    const categories = project.categories;

    if(category === "all" || categories.includes(category)) {
      const projectElement = document.createElement('div');
    projectElement.classList.add('project-card');
    projectElement.setAttribute('id', project.id);

    projectElement.innerHTML = `
    <div class="project-header-img">
      <img src="${project.image}" alt ="${project.name}">
    </div>
    <div class="project-content">
      <h4 class="project-name">${project.name}</h4>
      <p class="project-card-description margin-bottom-small">${project.description}</p>
      <button class="primary-btn" id="${project.id}">Lees Meer</button>
    </div>
    `;

    projectElement.style.opacity = '0';
    
    projectElement.addEventListener('click', () => {
      showProjectDetails(project);
    })
    projectContainer.appendChild(projectElement);
    }
  })

  function showProjectDetails(project) {
    const overlay = document.querySelector('.overlay');

    overlay.innerHTML = `
    
    <div class="padding-global">
            <button class="overlay-close-btn margin-bottom-large" id="overlayCloseBtn"><i class="fa-solid fa-xmark"></i></button>
            <div class="container-medium">
                <div class="grid-2col gap-medium">
                    <div class="gridbox detail-img-container">
                        <div class="swiper mySwiper">
                            <div class="swiper-wrapper  margin-bottom-small">
                            </div>
                            <div class="swiper-pagination"></div>
                        </div>
                    </div>
                    <div class="gridbox overlay-content">
                        <ul class="category-list gap-small margin-bottom-small flex">
                        </ul>
                        <div class="overlay-text margin-bottom-large">
                            <h2 class="gradient-title margin-bottom-tiny">${project.name}</h2>
                        <p class="overlay-project-description">
                            ${project.detailDescription}
                        </p>
                        </div>
                        <ul class="flex gap-medium linkbtns">
                        ${project.desktopLink ? `<li><a class="linkBtn" href="${project.desktopLink}" target="_blank">${project.desktopBtn}</a></li>` : ''}
                        ${project.mobileLink ? `<li><a class="linkBtn" href="${project.mobileLink}" target="_blank">${project.mobileBtn}</a></li>` : ''}
                        ${project.frontendLink ? `<li><a class="linkBtn" href="${project.frontendLink}" target="_blank">${project.frontendBtn}</a></li>` : ''}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `;


    document.body.appendChild(overlay);
    overlay.style.display = "block";
    setTimeout(() => {
      overlay.style.opacity = 1;
    }, 10)


    const closeBtn = document.querySelector('.overlay-close-btn').addEventListener('click', () => {
      overlay.style.opacity = 0;
      setTimeout(() => {
        overlay.style.display = 'none';
      }, 500)
    });

    const swiperWrapper = overlay.querySelector('.swiper-wrapper');

    console.log('SwiperWrapper:',swiperWrapper);

    const categoryList = overlay.querySelector('.category-list');
    project.categories.forEach(category => {
      const li = document.createElement('li');
      li.classList.add('category-box');
      li.textContent = category;
      categoryList.appendChild(li);
    });

    const swiper = new Swiper('.mySwiper', {
      slidesPerView: 1,
      spaceBetween: 10,
      loop: true,
      autoplay: {
        delay: 5000,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },

    });

    project.slideImages.forEach(image => {
      const slide = document.createElement('div');
      slide.classList.add('swiper-slide');

      const img = document.createElement('img');
      img.src = image;
      img.classList.add('slide-img');

      slide.appendChild(img);
      swiperWrapper.appendChild(slide);
    })

    if (swiperWrapper) {
      project.slideImages.forEach(image => {
        const slide = document.createElement('div');
        slide.classList.add('swiper-slide');
        const img = document.createElement('img');
        img.src = image;
        img.classList.add('slide-img');
        slide.appendChild(img);
        swiperWrapper.appendChild(slide);
      });
    } else {
      console.error("Swiper wrapper element not found in the DOM.");
    }
  }
  const options = {
    root : null,
    rootMargin: '0px',
    treshold: 0.3 
  };

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        entry.target.style.animation = 'fadeIn 0.5s ease forwards';
        observer.unobserve(entry.target);
      }
    });

  }, options);

  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    observer.observe(card);
  });
}

const style = document.createElement('style');
style.innerHTML = `
  @keyframes fadeIn {
    from {opacity : 0}
    to {opacity : 1}
  }
`;

document.head.appendChild(style);

function addTabButtonEventListeners() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  tabButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      const category = event.target.getAttribute('data-category');
      removeActiveClassFromButtons(tabButtons);
      button.classList.add('active-tab');
      fetchData(category);
    })
  })
}

function removeActiveClassFromButtons(buttons) {
  buttons.forEach(button => {
    button.classList.remove('active-tab');
  })
}

addTabButtonEventListeners();
fetchData();
testimonialHoverDots();

// email form function
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  checkForm();
})

function checkForm () {
  const emailvalue = document.getElementById('emailAddress').value;
  const emailField = document.querySelector('.email-field');
  const error = emailField.querySelector('.error');
  const errorMessage = error.querySelector('.errorMessage');
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

  if(emailvalue === "" || !emailvalue.match(emailPattern)) {
    emailField.classList.add('showError');

    if(emailvalue === "") {
      error.innerHTML = "Vul je email adres in."
    } else {
      error.innerHTML = "Vul een geldig email adres in."
    }
  } else {
    sendEmail();
  }
}

function sendEmail() {
  const contactMessage = document.getElementById('myMessage').value;
  const emailvalue = document.getElementById('emailAddress').value;

  const mailToLink = "mailto:d.v.best.12@gmail.com?subject=Contact met Vera&body=" + encodeURIComponent(contactMessage);

  window.location.href= mailToLink;
}

// all links
const contactBtn = document.getElementById('contactBtn');
contactBtn.addEventListener('click', () => {
  window.location.href = '#contact';
})

const projectBtn = document.getElementById('projectBtn');

projectBtn.addEventListener('click', () => {
  window.location.href = '#projects';
})

// footer form
const footerForm = document.querySelector('.footer-form');
const footerEmailField = document.querySelector('.footer-email-field');
const footerEmailValue = footerEmailField.querySelector('.footer-email-input').value;
const footerError = footerEmailField.querySelector('.footerError');
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

footerForm.addEventListener('submit', (e) => {
  e.preventDefault();
  checkFooterForm();
})

function checkFooterForm() {
  const footerEmailValue = footerEmailField.querySelector('.footer-email-input').value;

  if(footerEmailValue === "" || !footerEmailValue.match(emailRegex)) {
    footerEmailField.classList.add('showError');

    if(footerEmailValue === "") {
      footerError.innerHTML = 'Vul je email adres in'
    } else if(!footerEmailValue.match(emailRegex)){
      footerError.innerHTML = 'Vul een geldig email adres in'
    } else {

    }
  } else {
    openEmail();
  }
}

function openEmail() {
  const footerEmailValue = footerEmailField.querySelector('.footer-email-input').value;

  const subject = 'Contact met Vera';
  const mailToLink = 'mailto:d.v.best.12@gmail.com?subject=' + encodeURIComponent(subject);
  window.location.href = mailToLink;
}

// open mobile menu
const menuToggle = document.querySelector('.menuToggle');
const mobileMenuBody = document.querySelector('body');
const mobileLinks = document.querySelectorAll('.mobileLink');

menuToggle.addEventListener('click', () => {
  mobileMenuBody.classList.toggle('showMenu');
})

mobileLinks.forEach(mobileLink => {
  mobileLink.addEventListener('click', () => {
    mobileMenuBody.classList.remove('showMenu');
    console.log('hide menu');
  })
})

const heroContactBtn = document.getElementById('heroContactBtn');

heroContactBtn.addEventListener('click', () => {
  window.location.href='#contact';
})


