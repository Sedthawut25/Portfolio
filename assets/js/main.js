document.addEventListener('DOMContentLoaded', () => {
  const { animate, splitText, stagger } = anime;

  const { chars: chars1 } = splitText('.home__profession-1', { chars: true });
  const { chars: chars2 } = splitText('.home__profession-2', { chars: true });

  animate(chars1, {
    y: [
      { to: ['100%', '0%'] },
      { to: '-100%', delay: 4000, ease: 'in(3)' }
    ],
    duration: 900,
    ease: 'out(3)',
    delay: stagger(80),
    loop: true,
  });

  animate(chars2, {
    y: [
      { to: ['100%', '0%'] },
      { to: '-100%', delay: 4000, ease: 'in(3)' }
    ],
    duration: 900,
    ease: 'out(3)',
    delay: stagger(80),
    loop: true,
  });
});


/* Swiper Projects */
const swiperProjects = new Swiper('.projects__swiper', {
  loop: true,
  spaceBetween: 24,
  slidesPerView: 'auto',
  grabCursor: true,
  speed: 600,

  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },

  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  }

})


/* Work Tabs */
const tabs = document.querySelectorAll('[data-target]');
const tabContents = document.querySelectorAll('[data-content]');

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const targetSelector = tab.dataset.target;
    const targetContent = document.querySelector(targetSelector);

    tabContents.forEach((content) =>
      content.classList.remove('work-active')
    );
    tabs.forEach((t) =>
      t.classList.remove('work-active')
    );

    tab.classList.add('work-active');
    targetContent.classList.add('work-active');
  });
});

/*====== Services =====*/
const servicesButtons = document.querySelectorAll('.services__button')

servicesButtons.forEach(button => {
  //Add your height to services info
  const heightInfo = document.querySelector('.services__info')
  heightInfo.computedStyleMap.height = heightInfo.scrollHeight + 'px'

  button.addEventListener('click', () => {
    const servicesCards = document.querySelectorAll('.services__card'),
          currentCard = button.parentNode,
          currentInfo = currentCard.querySelector('.services__info'),
          isCardOpen = currentCard.classList.contains('services-open')

    //Close all other services info
    servicesCards.forEach(card => {
      card.classList.replace('services-open', 'services-close')

      const info = card.querySelector('.services__info')
            info.computedStyleMap.height = '0'
    })

    //Open only if not already open
    if(!isCardOpen){
      currentCard.classList.replace('services-close', 'services-open')
      currentInfo.computedStyleMap.height = currentInfo.scrollHeight + 'px'
    }
  })
})


/*Copy  */
const copyBtn = document.getElementById('contact-btn'),
      copyEmail = document.getElementById('contact-email').textContent

copyBtn.addEventListener('click', () => {
  //Use the clipboard API to copy text
  navigator.clipboard.writeText(copyEmail).then(() => {
    copyBtn.innerHTML = 'Email copied <i class="ri-check-line"></i>'

    //Restore the original text
    setTimeout(() => {
      copyBtn.innerHTML = 'Copy email <i class="ri-file-copy-line"></i>'
    }, 2000)
  })
})


/*Current Year of the Footer*/
const textYear = document.getElementById('footer-year'),
      currentYear = new Date().getFullYear()

//Each year it is update to the current year
textYear.textContent = currentYear


/*Scroll section Active Link*/
const section = document.querySelectorAll('section[id]')

const scrollActive = () => {
  // We get the position by scrolling down
  const scrollY = window.scrollY

  section.fontEach(section => {
    const id = section.id, 
          top = section.offsetTop -50,
          height = section.offsetHeight,
          link = document.querySelector('nav__menu a[href+=' + id + ']')
    
    if(!link) return

    link.classList.toggle('active-link', scrollY > top && scrollY <= top + height)
  })
}
window.addEventListener('scroll', scrollActive)

/*Cursor Custom*/
const cursor = document.querySelector('.cursor')
let mouseX = 0, mouseY = 0

const cursorMove = () => {
  cursor.style.left = `${mouseX}px`
  cursor.style.top =  `${mouseY}px`
  cursor.style.transform = 'translate(-50%, -50%)'

  //Update the cursor animation
  requestAnimationFrame(cursorMove)
}

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX
  mouseY = e.clientY
})
cursorMove()


/*Hide custom cursor*/
const a = document.querySelectorAll('a')

a.forEach(item => {
  item.addEventListener('mouseover', () => {
    cursor.classList.add('hide-cursor')
  })
  item.addEventListener('mouseleave', () => {
    cursor.classList.remove('hide-cursor')
  })
})


/*Scroll Reveal*/
const sr =  ScrollReveal({
  origin: 'top',
  distance: '60px',
  duration: 2000,
  delay: 300,
})
sr.reveal(`.home__image, .projects__container, .work__container,`)
sr.reveal(`.home__data`, {delay: 900, origin:'bottom'})
sr.reveal(`.home__info`, {delay: 1200, origin:'bottom'})
sr.reveal(`.home__social, .home__cv`, {delay: 1500})
sr.reveal(`.about__data`, {origin: 'left'})
sr.reveal(`.about__image`, {origin: 'right'})
sr.reveal(`.services__card`, {interval: 100})