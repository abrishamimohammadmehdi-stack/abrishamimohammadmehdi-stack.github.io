(() => {
  "use strict";


  const reduceMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;


  const finePointer =
    window.matchMedia(
      "(pointer: fine)"
    ).matches;


  const $ =
    selector =>
      document.querySelector(selector);



  /* ======================================================
     ELEMENTS
  ====================================================== */

  const intro =
    $(".intro");

  const introBrand =
    $(".intro__brand");

  const introRule =
    $(".intro__rule span");

  const introCaption =
    $(".intro__caption");


  const header =
    $(".header");


  const hero =
    $(".hero");

  const heroTop =
    $(".hero__top");

  const first =
    $(".hero__first > span");

  const photo =
    $(".hero__photo");

  const photoReveal =
    $(".hero__photo-reveal");

  const image =
    $(".hero__image");

  const middle =
    $(".hero__middle");

  const last =
    $(".hero__last > span");

  const footer =
    $(".hero__footer");

  const progress =
    $(".hero__progress span");



  /* ======================================================
     WEB ANIMATION HELPER
  ====================================================== */

  const play = (
    element,
    keyframes,
    options
  ) => {

    if (!element) {
      return Promise.resolve();
    }


    return element
      .animate(
        keyframes,
        options
      )
      .finished
      .catch(() => {});

  };



  /* ======================================================
     REDUCED MOTION
  ====================================================== */

  if (reduceMotion) {

    document.body.classList.remove(
      "is-loading"
    );


    if (intro) {
      intro.style.display = "none";
    }


    return;

  }



  /* ======================================================
     INTRO
  ====================================================== */

  async function introSequence() {

    await play(

      introBrand,

      [
        {
          transform:
            "translateY(115%)"
        },
        {
          transform:
            "translateY(0)"
        }
      ],

      {
        duration: 560,
        easing:
          "cubic-bezier(.16,1,.3,1)",
        fill: "forwards"
      }

    );


    play(

      introCaption,

      [
        {
          opacity: 0,
          transform:
            "translateY(5px)"
        },
        {
          opacity: 1,
          transform:
            "translateY(0)"
        }
      ],

      {
        duration: 450,
        fill: "forwards"
      }

    );


    await play(

      introRule,

      [
        {
          transform:
            "scaleX(0)"
        },
        {
          transform:
            "scaleX(1)"
        }
      ],

      {
        duration: 380,
        easing:
          "cubic-bezier(.16,1,.3,1)",
        fill: "forwards"
      }

    );


    await new Promise(
      resolve =>
        setTimeout(resolve, 120)
    );


    await play(

      intro,

      [
        {
          clipPath:
            "inset(0 0 0 0)"
        },
        {
          clipPath:
            "inset(0 0 100% 0)"
        }
      ],

      {
        duration: 680,
        easing:
          "cubic-bezier(.76,0,.24,1)",
        fill: "forwards"
      }

    );


    intro.style.display = "none";


    document.body.classList.remove(
      "is-loading"
    );


    heroEntrance();

  }



  /* ======================================================
     HERO ENTRANCE
  ====================================================== */

  function heroEntrance() {

    play(

      header,

      [
        {
          opacity: 0,
          transform:
            "translateY(-12px)"
        },
        {
          opacity: 1,
          transform:
            "translateY(0)"
        }
      ],

      {
        duration: 650,
        easing:
          "cubic-bezier(.16,1,.3,1)",
        fill: "forwards"
      }

    );


    play(

      heroTop,

      [
        {
          opacity: 0
        },
        {
          opacity: 1
        }
      ],

      {
        duration: 650,
        delay: 100,
        fill: "forwards"
      }

    );


    play(

      first,

      [
        {
          transform:
            "translateY(115%)"
        },
        {
          transform:
            "translateY(0)"
        }
      ],

      {
        duration: 900,
        delay: 100,
        easing:
          "cubic-bezier(.16,1,.3,1)",
        fill: "forwards"
      }

    );


    play(

      photoReveal,

      [
        {
          clipPath:
            "inset(0 100% 0 0)"
        },
        {
          clipPath:
            "inset(0 0% 0 0)"
        }
      ],

      {
        duration: 1050,
        delay: 270,
        easing:
          "cubic-bezier(.16,1,.3,1)",
        fill: "forwards"
      }

    );


    play(

      image,

      [
        {
          transform:
            "scale(1.09)"
        },
        {
          transform:
            "scale(1.025)"
        }
      ],

      {
        duration: 1450,
        delay: 270,
        easing:
          "cubic-bezier(.16,1,.3,1)",
        fill: "forwards"
      }

    );


    play(

      middle,

      [
        {
          opacity: 0,
          transform:
            "translateX(-40px)"
        },
        {
          opacity: 1,
          transform:
            "translateX(0)"
        }
      ],

      {
        duration: 800,
        delay: 620,
        easing:
          "cubic-bezier(.16,1,.3,1)",
        fill: "forwards"
      }

    );


    play(

      last,

      [
        {
          transform:
            "translateY(115%)"
        },
        {
          transform:
            "translateY(0)"
        }
      ],

      {
        duration: 950,
        delay: 710,
        easing:
          "cubic-bezier(.16,1,.3,1)",
        fill: "forwards"
      }

    );


    play(

      footer,

      [
        {
          opacity: 0,
          transform:
            "translateY(18px)"
        },
        {
          opacity: 1,
          transform:
            "translateY(0)"
        }
      ],

      {
        duration: 720,
        delay: 980,
        easing:
          "cubic-bezier(.16,1,.3,1)",
        fill: "forwards"
      }

    );

  }



  /* ======================================================
     IMAGE PARALLAX
  ====================================================== */

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

        targetX =
          event.clientX /
          window.innerWidth -
          .5;


        targetY =
          event.clientY /
          window.innerHeight -
          .5;

      },

      {
        passive: true
      }

    );


    function parallax() {

      currentX +=
        (
          targetX -
          currentX
        ) * .045;


      currentY +=
        (
          targetY -
          currentY
        ) * .045;


      if (
        window.scrollY <
        window.innerHeight
      ) {

        image.style.transform =
          `scale(1.025)
           translate3d(
             ${currentX * -10}px,
             ${currentY * -8}px,
             0
           )`;

      }


      requestAnimationFrame(
        parallax
      );

    }


    parallax();

  }



  /* ======================================================
     HERO SCROLL STORY
  ====================================================== */

  let ticking = false;


  function heroScroll() {

    if (!hero) {

      ticking = false;

      return;

    }


    const heroHeight =
      hero.offsetHeight;


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
       MOHAMMAD moves left.
    */

    if (first) {

      first.style.transform =
        `translate3d(
          ${value * -90}px,
          ${value * -24}px,
          0
        )`;


      first.style.opacity =
        1 - value * .72;

    }


    /*
       MEHDI moves left/down slightly.
    */

    if (middle) {

      middle.style.transform =
        `translate3d(
          ${value * -55}px,
          ${value * 15}px,
          0
        )`;


      middle.style.opacity =
        1 - value * .9;

    }


    /*
       ABRISHAMI separates to right.
    */

    if (last) {

      last.style.transform =
        `translate3d(
          ${value * 115}px,
          ${value * -45}px,
          0
        )`;


      last.style.opacity =
        1 - value * .72;

    }


    /*
       Photograph becomes slightly larger
       as About approaches.
    */

    if (photo) {

      const scale =
        1 + value * .12;


      const mobile =
        window.innerWidth <= 900;


      if (mobile) {

        photo.style.transform =
          `translate(-50%, -50%)
           scale(${scale})`;

      } else {

        photo.style.transform =
          `translate(-43%, -48%)
           scale(${scale})`;

      }

    }


    /*
       Footer disappears before transition.
    */

    if (footer) {

      footer.style.opacity =
        Math.max(
          0,
          1 - value * 1.55
        );


      footer.style.transform =
        `translateY(
          ${value * 22}px
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


  window.addEventListener(

    "scroll",

    () => {

      if (ticking) {
        return;
      }


      requestAnimationFrame(
        heroScroll
      );


      ticking = true;

    },

    {
      passive: true
    }

  );



  /* ======================================================
     START
  ====================================================== */

  if (
    document.readyState ===
    "complete"
  ) {

    introSequence();

  } else {

    window.addEventListener(

      "load",

      introSequence,

      {
        once: true
      }

    );

  }

})();