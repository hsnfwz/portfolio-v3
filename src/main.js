// elements
const scrollers = document.querySelectorAll('.p_scroller');
const hover3ds = document.querySelectorAll('.p_hover_3d');
const rotateBorders = document.querySelectorAll('.p_rotate_border');

// accessibility: check if user wants less animation
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  console.log('animations enabled');
  addAnimation();
} else {
  console.log('animations disabled');
}

function addAnimation() {
  // add parallax animation
  window.addEventListener('scroll', event => {
    const targets = document.querySelectorAll('.p_parallax');
    targets.forEach(target => {
      let scrolled = window.scrollY;
      if (target.dataset.scrollDirection === 'horizontal') {
        let rateX = scrolled * target.dataset.scrollXSpeed;
        target.style.transform = `translateX(${rateX}px)`; 
      } else if (target.dataset.scrollDirection === 'vertical') {
        let rateY = scrolled * target.dataset.scrollYSpeed;
        target.style.transform = `translateY(${rateY}px)`; 
      } else if (target.dataset.scrollDirection === 'diagonal') {
        let rateX = scrolled * target.dataset.scrollXSpeed;
        let rateY = scrolled * target.dataset.scrollYSpeed;
        target.style.transform = `translate3d(${rateX}px, ${rateY}px, 0px)`; 
      }
    });
  });

  // add scroll x animation
  scrollers.forEach(scroller => {
    scroller.setAttribute('data-animated', true);
  
    const scrollerInner = scroller.querySelector('.p_scroller_inner');
    const scrollerContent = Array.from(scrollerInner.children);

    scrollerContent.forEach(item => {
      const duplicatedItem = item.cloneNode(true);
      duplicatedItem.setAttribute('aria-hidden', true); // screen reader friendly to avoid it reading duplicated content
      scrollerInner.appendChild(duplicatedItem);
    });
  });

  // add rotate borders
  rotateBorders.forEach(rotateBorder => {
    rotateBorder.setAttribute('data-animated', true);
  });

  hover3ds.forEach(hover3d => {
    // add shape rotate animation
    hover3d.setAttribute('data-animated', true);

    // add hover 3d animation
    hover3d.addEventListener('mousemove', (event) => {
      const intensity = 25; /* the higher the number the less intense */
      const bounds = hover3d.getBoundingClientRect();
      let xAxis = (bounds.width / 2 - (event.clientX - bounds.left)) / intensity;
      let yAxis = (bounds.height / 2 - (event.clientY - bounds.top)) / intensity;
      const hover3dInner = hover3d.querySelector('.p_hover_3d_inner');
      hover3dInner.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    });
  
    // cursor effect
    // hover3d.addEventListener('mousemove', (event) => {
    //   const bounds = hover3d.getBoundingClientRect();
    //   // TODO: cursor animation
    //   const cursor = document.querySelector('.p_cursor');
    //   console.log(cursor);
    //   cursor.style.position = 'fixed';
    //   cursor.style.left = `${((event.clientX - bounds.left))}px`;
    //   cursor.style.top = `${((event.clientY - bounds.top))}px`;
    //   cursor.style.backgroundColor = 'black';
    //   cursor.style.width = '64px';
    //   cursor.style.height = '64px';
    //   cursor.style.padding = '16px';
    //   cursor.style.borderRadius = '100%';
    //   cursor.style.transform = `translate(-50%, -50%)`;
    //   // cursor.style.transition = `all 1s ease`;
    // });

    // animate in
    hover3d.addEventListener('mouseenter', (event) => {
      const hover3dInner = hover3d.querySelector('.p_hover_3d_inner');
      hover3dInner.style.transition = `none`;
      Array.from(hover3dInner.children).forEach((child, index) => {
        child.style.transform = `translateZ(${(index+1)*50}px)`;
        child.style.transition = `none`;
      });

      const bounds = hover3d.getBoundingClientRect();
      // TODO: cursor animation
      const cursor = document.querySelector('.p_cursor');
      console.log(cursor);
      cursor.style.position = 'fixed';
      cursor.style.left = `${(bounds.width / 2 - (event.clientX - bounds.left))}px`;
      cursor.style.top = `${(bounds.height / 2 - (event.clientY - bounds.top))}px`;
      cursor.style.backgroundColor = 'black';
      cursor.style.width = '64px';
      cursor.style.height = '64px';
      cursor.style.padding = '16px';
      cursor.style.borderRadius = '100%';
      cursor.style.transform = `translate(-50%, -50%)`;
      // cursor.style.transition = `all 1s ease`;
    });
  
    // animate out
    hover3d.addEventListener('mouseleave', (event) => {
      const hover3dInner = hover3d.querySelector('.p_hover_3d_inner');
      hover3dInner.style.transform = `rotateY(0deg) rotateX(0deg)`;
      hover3dInner.style.transition = 'all 1s ease-out';
      Array.from(hover3dInner.children).forEach((child, index) => {
        child.style.transform = `translateZ(0px)`;
        child.style.transition = `all 1s ease-out`;
      });
    });
  });
}