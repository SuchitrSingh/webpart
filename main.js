
  const pages = document.querySelectorAll(".page");
  let currentPageIndex = 0;
  let isScrolling = false;

  function scrollToPage(index) {
    if (index < 0 || index >= pages.length || isScrolling) return;

    isScrolling = true;

    const target = pages[index];
    const start = window.scrollY;
    const end = target.offsetTop;
    const distance = end - start;
    const duration = 700;
    let startTime = null;

    function animateScroll(currentTime) {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = easeInOutQuad(progress);

      window.scrollTo(0, start + distance * ease);

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      } else {
        isScrolling = false;
        currentPageIndex = index;
      }
    }

    requestAnimationFrame(animateScroll);
  }

  function easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  }


  window.addEventListener("wheel", (e) => {
    if (isScrolling) return;
    if (e.deltaY > 0) {
      scrollToPage(currentPageIndex + 1);
    } else {
      scrollToPage(currentPageIndex - 1);
    }
  });