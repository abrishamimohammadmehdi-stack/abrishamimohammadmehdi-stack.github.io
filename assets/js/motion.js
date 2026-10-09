(() => {
  "use strict";

  /* ======================================================
     ENVIRONMENT
  ====================================================== */

  const doc = document;
  const body = doc.body;

  const reducedMotionQuery =
    window.matchMedia("(prefers-reduced-motion: reduce)");

  const finePointerQuery =
    window.matchMedia("(pointer: fine)");

  const reduceMotion = reducedMotionQuery.matches;
  const finePointer = finePointerQuery.matches;

  const $ = selector => doc.querySelector(selector);

  const easeOut = "cubic-bezier(.16,1,.3,1)";
  const easeEditorial = "cubic-bezier(.76,0,.24,1)";


  /* ======================================================
     ELEMENTS
  ====================================================== */

  const intro = $(".intro");
  const introBrand = $(".intro__brand");
  const introRule = $(".intro__rule span");
  const introCaption = $(".intro__caption");

  const header = $(".header");

  const hero = $(".hero");
  const heroTop = $(".hero__top");

  const first = $(".hero__first > span");
  const photo = $(".hero__photo");
  const photoReveal = $(".hero__photo-reveal");
  const image = $(".hero__image");

  const middle = $(".hero__middle");
  const last = $(".hero__last > span");

  const footer = $(".hero__footer");
  const progress = $(".hero__progress span");


  /* ======================================================
     WEB ANIMATION HELPER
  ====================================================== */

  const play = (
    element,
    keyframes,
    options = {}
  ) => {

    if (
      !element ||
      typeof element.animate !== "function"
    ) {
      return Promise.resolve();
    }

    const animation =
      element.animate(
        keyframes,
        options
      );

    return animation.finished.catch(() => {});
  };


  const wait = duration =>
    new Promise(resolve => {
      window.setTimeout(resolve, duration);
    });


  /* ======================================================
     REDUCED MOTION
  ====================================================== */

  if (reduceMotion) {

    body.classList.remove("is-loading");

    if (intro) {
      intro.hidden = true;
      intro.style.display = "none";
    }

    if (header) {
      header.style.opacity = "1";
      header.style.transform = "none";
    }

    if (heroTop) {
      heroTop.style.opacity = "1";
    }

    if (first) {
      first.style.opacity = "1";
      first.style.transform = "none";
    }

    if (middle) {
      middle.style.opacity = "1";
      middle.style.transform = "none";
    }

    if (last) {
      last.style.opacity = "1";
      last.style.transform = "none";
    }

    if (photoReveal) {
      photoReveal.style.clipPath = "none";
    }

    if (image) {
      image.style.transform = "none";
    }

    if (footer) {
      footer.style.opacity = "1";
      footer.style.transform = "none";
    }

    return;
  }


  /* ======================================================
     HERO ENTRANCE
  ====================================================== */

  let heroHasEntered = false;


  function heroEntrance() {

    if (heroHasEntered) {
      return;
    }

    heroHasEntered = true;


    play(
      header,
      [
        {
          opacity: 0,
          transform: "translate3d(0,-12px,0)"
        },
        {
          opacity: 1,
          transform: "translate3d(0,0,0)"
        }
      ],
      {
        duration: 650,
        easing: easeOut,
        fill: "forwards"
      }
    );


    play(
      heroTop,
      [
        { opacity: 0 },
        { opacity: 1 }
      ],
      {
        duration: 650,
        delay: 100,
        easing: easeOut,
        fill: "forwards"
      }
    );


    play(
      first,
      [
        {
          transform: "translate3d(0,115%,0)"
        },
        {
          transform: "translate3d(0,0,0)"
        }
      ],
      {
        duration: 900,
        delay: 100,
        easing: easeOut,
        fill: "forwards"
      }
    );


    play(
      photoReveal,
      [
        {
          clipPath: "inset(0 100% 0 0)"
        },
        {
          clipPath: "inset(0 0 0 0)"
        }
      ],
      {
        duration: 1050,
        delay: 270,
        easing: easeOut,
        fill: "forwards"
      }
    );


    play(
      image,
      [
        {
          transform: "scale(1.09)"
        },
        {
          transform: "scale(1.025)"
        }
      ],
      {
        duration: 1450,
        delay: 270,
        easing: easeOut,
        fill: "forwards"
      }
    );


    play(
      middle,
      [
        {
          opacity: 0,
          transform: "translate3d(-40px,0,0)"
        },
        {
          opacity: 1,
          transform: "translate3d(0,0,0)"
        }
      ],
      {
        duration: 800,
        delay: 620,
        easing: easeOut,
        fill: "forwards"
      }
    );


    play(
      last,
      [
        {
          transform: "translate3d(0,115%,0)"
        },
        {
          transform: "translate3d(0,0,0)"
        }
      ],
      {
        duration: 950,
        delay: 710,
        easing: easeOut,
        fill: "forwards"
      }
    );


    play(
      footer,
      [
        {
          opacity: 0,
          transform: "translate3d(0,18px,0)"
        },
        {
          opacity: 1,
          transform: "translate3d(0,0,0)"
        }
      ],
      {
        duration: 720,
        delay: 980,
        easing: easeOut,
        fill: "forwards"
      }
    );
  }


  /* ======================================================
     INTRO
  ====================================================== */

  let introHasRun = false;


  async function introSequence() {

    if (introHasRun) {
      return;
    }

    introHasRun = true;


    if (!intro) {

      body.classList.remove("is-loading");

      heroEntrance();

      return;
    }


    await play(
      introBrand,
      [
        {
          transform: "translate3d(0,115%,0)"
        },
        {
          transform: "translate3d(0,0,0)"
        }
      ],
      {
        duration: 560,
        easing: easeOut,
        fill: "forwards"
      }
    );


    play(
      introCaption,
      [
        {
          opacity: 0,
          transform: "translate3d(0,5px,0)"
        },
        {
          opacity: 1,
          transform: "translate3d(0,0,0)"
        }
      ],
      {
        duration: 450,
        easing: easeOut,
        fill: "forwards"
      }
    );


    await play(
      introRule,
      [
        {
          transform: "scaleX(0)"
        },
        {
          transform: "scaleX(1)"
        }
      ],
      {
        duration: 380,
        easing: easeOut,
        fill: "forwards"
      }
    );


    await wait(120);


    await play(
      intro,
      [
        {
          clipPath: "inset(0 0 0 0)"
        },
        {
          clipPath: "inset(0 0 100% 0)"
        }
      ],
      {
        duration: 680,
        easing: easeEditorial,
        fill: "forwards"
      }
    );


    intro.hidden = true;
    intro.style.display = "none";

    body.classList.remove("is-loading");

    heroEntrance();
  }


  /* ======================================================
     IMAGE PARALLAX
  ====================================================== */

  let heroInView = true;


  if (
    "IntersectionObserver" in window &&
    hero
  ) {

    const heroVisibilityObserver =
      new IntersectionObserver(
        entries => {

          if (entries[0]) {
            heroInView = entries[0].isIntersecting;
          }

        },
        {
          rootMargin: "20% 0px 20% 0px",
          threshold: 0
        }
      );

    heroVisibilityObserver.observe(hero);
  }


  if (
    finePointer &&
    image
  ) {

    let targetX = 0;
    let targetY = 0;

    let currentX = 0;
    let currentY = 0;


    window.addEventListener(
      "mousemove",
      event => {

        if (!heroInView) {
          return;
        }

        targetX =
          event.clientX /
          window.innerWidth -
          0.5;

        targetY =
          event.clientY /
          window.innerHeight -
          0.5;

      },
      {
        passive: true
      }
    );


    const parallax = () => {

      if (heroInView) {

        currentX +=
          (targetX - currentX) * 0.045;

        currentY +=
          (targetY - currentY) * 0.045;


        if (
          window.scrollY <
          window.innerHeight * 1.1
        ) {

          image.style.transform =
            `scale(1.025)
             translate3d(
               ${currentX * -10}px,
               ${currentY * -8}px,
               0
             )`;

        }

      }

      requestAnimationFrame(parallax);
    };


    requestAnimationFrame(parallax);
  }


  /* ======================================================
     HERO SCROLL STORY
  ====================================================== */

  let ticking = false;
  let heroHeight = 0;


  const updateHeroMeasurements = () => {

    heroHeight =
      hero
        ? Math.max(
            hero.offsetHeight,
            1
          )
        : 1;

  };


  updateHeroMeasurements();


  function heroScroll() {

    if (!hero || !heroHasEntered) {

      ticking = false;

      return;
    }


    const value =
      Math.min(
        Math.max(
          window.scrollY /
          heroHeight,
          0
        ),
        1
      );


    /*
      MOHAMMAD:
      subtle separation to the left.
    */

    if (first && window.innerWidth > 900) {

      first.style.transform =
        `translate3d(
          ${value * -90}px,
          ${value * -24}px,
          0
        )`;

      first.style.opacity =
        String(
          Math.max(
            0,
            1 - value * 0.72
          )
        );
    }


    /*
      MEHDI:
      moves left and slightly down.
    */

    if (middle && window.innerWidth > 900) {

      middle.style.transform =
        `translate3d(
          ${value * -55}px,
          ${value * 15}px,
          0
        )`;

      middle.style.opacity =
        String(
          Math.max(
            0,
            1 - value * 0.9
          )
        );
    }


    /*
      ABRISHAMI:
      separates to the right.
    */

    if (last && window.innerWidth > 900) {

      last.style.transform =
        `translate3d(
          ${value * 115}px,
          ${value * -45}px,
          0
        )`;

      last.style.opacity =
        String(
          Math.max(
            0,
            1 - value * 0.72
          )
        );
    }


    /*
      Portrait:
      very subtle scale into the next section.
    */

    if (photo) {

      const scale =
        1 + value * 0.12;

      const mobile =
        window.innerWidth <= 900;


      photo.style.transform =
        mobile
          ? `translate3d(-50%,-50%,0)
             scale(${scale})`
          : `translate3d(-43%,-48%,0)
             scale(${scale})`;
    }


    /*
      Hero footer:
      disappears before section transition.
    */

    if (footer) {

      footer.style.opacity =
        String(
          Math.max(
            0,
            1 - value * 1.55
          )
        );

      footer.style.transform =
        `translate3d(
          0,
          ${value * 22}px,
          0
        )`;
    }


    /*
      Bottom progress.
    */

    if (progress) {

      progress.style.width =
        `${value * 100}%`;
    }


    ticking = false;
  }


  const requestHeroScroll = () => {

    if (
      ticking ||
      !heroInView
    ) {
      return;
    }

    ticking = true;

    requestAnimationFrame(heroScroll);
  };


  window.addEventListener(
    "scroll",
    requestHeroScroll,
    {
      passive: true
    }
  );


  window.addEventListener(
    "resize",
    () => {

      updateHeroMeasurements();
      requestHeroScroll();

    },
    {
      passive: true
    }
  );


  /* ======================================================
     PAGE VISIBILITY
  ====================================================== */

  doc.addEventListener(
    "visibilitychange",
    () => {

      if (
        !doc.hidden &&
        heroInView
      ) {
        requestHeroScroll();
      }

    }
  );


  /* ======================================================
     START
  ====================================================== */

  const start = () => {

    updateHeroMeasurements();

    introSequence();

    requestHeroScroll();
  };


  if (doc.readyState === "complete") {

    start();

  } else {

    window.addEventListener(
      "load",
      start,
      {
        once: true
      }
    );
  }

})();