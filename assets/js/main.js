(() => {
  "use strict";

  const reduceMotion =
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const finePointer =
    window.matchMedia("(pointer: fine)").matches;


  /* ======================================================
     CURSOR
  ====================================================== */

  const cursor =
    document.querySelector(".cursor");

  const dot =
    document.querySelector(".cursor__dot");

  const ring =
    document.querySelector(".cursor__ring");

  const cursorText =
    document.querySelector(".cursor__text");


  if (
    cursor &&
    dot &&
    ring &&
    finePointer &&
    !reduceMotion
  ) {

    let mouseX = 0;
    let mouseY = 0;

    let ringX = 0;
    let ringY = 0;


    window.addEventListener(
      "mousemove",
      event => {

        mouseX = event.clientX;
        mouseY = event.clientY;

        cursor.classList.add("is-visible");

        dot.style.transform =
          `translate3d(${mouseX}px,${mouseY}px,0)
           translate(-50%,-50%)`;

      },
      { passive: true }
    );


    function cursorLoop() {

      ringX += (mouseX - ringX) * .13;
      ringY += (mouseY - ringY) * .13;

      ring.style.transform =
        `translate3d(${ringX}px,${ringY}px,0)
         translate(-50%,-50%)`;

      requestAnimationFrame(cursorLoop);
    }

    cursorLoop();


    document
      .querySelectorAll("a,button,[data-cursor]")
      .forEach(element => {

        element.addEventListener(
          "mouseenter",
          () => {

            const label =
              element.dataset.cursor ||
              (element.tagName === "A" ? "OPEN" : "");

            cursorText.textContent = label;

            cursor.classList.add("is-active");
          }
        );


        element.addEventListener(
          "mouseleave",
          () => {

            cursor.classList.remove("is-active");

            cursorText.textContent = "";
          }
        );

      });

  }


  /* ======================================================
     MAGNETIC
  ====================================================== */

  if (finePointer && !reduceMotion) {

    document
      .querySelectorAll(".magnetic")
      .forEach(element => {

        element.addEventListener(
          "mousemove",
          event => {

            const rect =
              element.getBoundingClientRect();

            const x =
              event.clientX -
              rect.left -
              rect.width / 2;

            const y =
              event.clientY -
              rect.top -
              rect.height / 2;

            element.style.transform =
              `translate3d(
                ${x * .14}px,
                ${y * .14}px,
                0
              )`;
          }
        );


        element.addEventListener(
          "mouseleave",
          () => {
            element.style.transform = "";
          }
        );

      });

  }


  /* ======================================================
     GENERAL REVEALS
  ====================================================== */

  const revealObserver =
    new IntersectionObserver(

      entries => {

        entries.forEach(entry => {

          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("is-visible");

          revealObserver.unobserve(entry.target);

        });

      },

      {
        threshold: .15
      }

    );


  document
    .querySelectorAll(".reveal,.line-mask")
    .forEach(element => {
      revealObserver.observe(element);
    });


  /* ======================================================
     EXPERIENCE SCROLL ENGINE
  ====================================================== */

  const careerItems =
    [...document.querySelectorAll(".career-item")];

  const careerYear =
    document.querySelector("#careerYear");

  const careerCurrent =
    document.querySelector("#careerCurrent");

  const careerProgress =
    document.querySelector("#careerProgress");


  let activeCareer = null;


  function setCareerItem(item) {

    if (!item || item === activeCareer) {
      return;
    }

    activeCareer = item;


    careerItems.forEach(entry => {
      entry.classList.toggle(
        "is-active",
        entry === item
      );
    });


    const year =
      item.dataset.year;

    const index =
      item.dataset.index;


    if (careerYear) {

      careerYear.classList.add("is-changing");

      window.setTimeout(() => {

        careerYear.textContent = year;

        careerYear.classList.remove("is-changing");

      }, 160);

    }


    if (careerCurrent) {
      careerCurrent.textContent = index;
    }


    if (careerProgress) {

      const numericIndex =
        Number(index);

      const progress =
        numericIndex /
        careerItems.length;

      careerProgress.style.transform =
        `scaleX(${progress})`;

    }

  }


  if (careerItems.length) {

    const careerObserver =
      new IntersectionObserver(

        entries => {

          const visible =
            entries
              .filter(entry => entry.isIntersecting)
              .sort(
                (a,b) =>
                  b.intersectionRatio -
                  a.intersectionRatio
              );


          if (visible.length) {
            setCareerItem(visible[0].target);
          }

        },

        {
          rootMargin: "-25% 0px -35% 0px",
          threshold: [
            0,
            .15,
            .3,
            .5,
            .7
          ]
        }

      );


    careerItems.forEach(item => {
      careerObserver.observe(item);
    });


    setCareerItem(careerItems[0]);

  }


  /* ======================================================
     EXPERIENCE SUBTLE PARALLAX
  ====================================================== */

  const experience =
    document.querySelector(".experience");

  const experienceHeadline =
    document.querySelector(".experience__headline");


  let scrollTicking = false;


  function updateExperienceMotion() {

    if (
      experience &&
      experienceHeadline &&
      !reduceMotion
    ) {

      const rect =
        experience.getBoundingClientRect();

      const viewport =
        window.innerHeight;

      const progress =
        Math.min(
          Math.max(
            (viewport - rect.top) /
            (viewport + rect.height),
            0
          ),
          1
        );


      experienceHeadline.style.transform =
        `translate3d(
          ${progress * -30}px,
          0,
          0
        )`;

    }

    scrollTicking = false;
  }


  window.addEventListener(
    "scroll",
    () => {

      if (scrollTicking) {
        return;
      }

      scrollTicking = true;

      requestAnimationFrame(
        updateExperienceMotion
      );

    },
    { passive: true }
  );


  updateExperienceMotion();

})();