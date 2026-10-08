(() => {
  "use strict";

  /* ======================================================
     ENVIRONMENT
  ====================================================== */

  const doc = document;
  const root = doc.documentElement;

  const reducedMotionQuery =
    window.matchMedia("(prefers-reduced-motion: reduce)");

  const finePointerQuery =
    window.matchMedia("(pointer: fine)");

  const reduceMotion =
    reducedMotionQuery.matches;

  const finePointer =
    finePointerQuery.matches;

  root.dataset.motion =
    reduceMotion ? "reduced" : "full";


  /* ======================================================
     CURSOR
  ====================================================== */

  const cursor =
    doc.querySelector(".cursor");

  const dot =
    doc.querySelector(".cursor__dot");

  const ring =
    doc.querySelector(".cursor__ring");

  const cursorText =
    doc.querySelector(".cursor__text");


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
          `translate3d(${mouseX}px, ${mouseY}px, 0)
           translate(-50%, -50%)`;

      },
      { passive: true }
    );


    const cursorLoop = () => {

      ringX += (mouseX - ringX) * 0.13;
      ringY += (mouseY - ringY) * 0.13;

      ring.style.transform =
        `translate3d(${ringX}px, ${ringY}px, 0)
         translate(-50%, -50%)`;

      requestAnimationFrame(cursorLoop);
    };


    cursorLoop();


    doc
      .querySelectorAll("a, button, [data-cursor]")
      .forEach(element => {

        element.addEventListener(
          "mouseenter",
          () => {

            const label =
              element.dataset.cursor ||
              (
                element.tagName === "A"
                  ? "OPEN"
                  : ""
              );

            if (cursorText) {
              cursorText.textContent = label;
            }

            cursor.classList.add("is-active");

          }
        );


        element.addEventListener(
          "mouseleave",
          () => {

            cursor.classList.remove("is-active");

            if (cursorText) {
              cursorText.textContent = "";
            }

          }
        );

      });

  }


  /* ======================================================
     MAGNETIC ELEMENTS
  ====================================================== */

  if (
    finePointer &&
    !reduceMotion
  ) {

    doc
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
                ${x * 0.14}px,
                ${y * 0.14}px,
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

  const revealElements =
    doc.querySelectorAll(
      ".reveal, .line-mask"
    );


  if (
    "IntersectionObserver" in window &&
    revealElements.length &&
    !reduceMotion
  ) {

    const revealObserver =
      new IntersectionObserver(

        entries => {

          entries.forEach(entry => {

            if (!entry.isIntersecting) {
              return;
            }

            entry.target
              .classList
              .add("is-visible");

            revealObserver
              .unobserve(entry.target);

          });

        },

        {
          threshold: 0.15,
          rootMargin: "0px 0px -6% 0px"
        }

      );


    revealElements.forEach(element => {
      revealObserver.observe(element);
    });

  } else {

    revealElements.forEach(element => {
      element.classList.add("is-visible");
    });

  }


  /* ======================================================
     EXPERIENCE SCROLL ENGINE
  ====================================================== */

  const careerItems =
    [...doc.querySelectorAll(".career-item")];

  const careerYear =
    doc.querySelector("#careerYear");

  const careerCurrent =
    doc.querySelector("#careerCurrent");

  const careerProgress =
    doc.querySelector("#careerProgress");


  let activeCareer = null;


  const setCareerItem = item => {

    if (
      !item ||
      item === activeCareer
    ) {
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
      item.dataset.year || "";

    const index =
      item.dataset.index || "";


    if (careerYear) {

      if (reduceMotion) {

        careerYear.textContent = year;

      } else {

        careerYear.classList.add(
          "is-changing"
        );

        window.setTimeout(
          () => {

            careerYear.textContent =
              year;

            careerYear.classList.remove(
              "is-changing"
            );

          },
          160
        );

      }

    }


    if (careerCurrent) {

      careerCurrent.textContent =
        index;

    }


    if (careerProgress) {

      const numericIndex =
        Number(index);

      const progress =
        Number.isFinite(numericIndex) &&
        careerItems.length
          ? numericIndex /
            careerItems.length
          : 0;

      careerProgress.style.transform =
        `scaleX(${Math.min(
          Math.max(progress, 0),
          1
        )})`;

    }

  };


  if (careerItems.length) {

    if (
      "IntersectionObserver" in window
    ) {

      const careerObserver =
        new IntersectionObserver(

          entries => {

            const visible =
              entries
                .filter(
                  entry =>
                    entry.isIntersecting
                )
                .sort(
                  (a, b) =>
                    b.intersectionRatio -
                    a.intersectionRatio
                );


            if (visible.length) {

              setCareerItem(
                visible[0].target
              );

            }

          },

          {
            rootMargin:
              "-25% 0px -35% 0px",

            threshold: [
              0,
              0.15,
              0.3,
              0.5,
              0.7
            ]
          }

        );


      careerItems.forEach(item => {
        careerObserver.observe(item);
      });

    }


    setCareerItem(careerItems[0]);

  }


  /* ======================================================
     EXPERIENCE SUBTLE PARALLAX
  ====================================================== */

  const experience =
    doc.querySelector(".experience");

  const experienceHeadline =
    doc.querySelector(
      ".experience__headline"
    );


  let scrollTicking = false;


  const updateExperienceMotion = () => {

    if (
      experience &&
      experienceHeadline &&
      !reduceMotion
    ) {

      const rect =
        experience
          .getBoundingClientRect();

      const viewport =
        window.innerHeight;

      const progress =
        Math.min(
          Math.max(
            (
              viewport -
              rect.top
            ) /
            (
              viewport +
              rect.height
            ),
            0
          ),
          1
        );


      experienceHeadline
        .style
        .transform =
          `translate3d(
            ${progress * -30}px,
            0,
            0
          )`;

    }

    scrollTicking = false;

  };


  if (!reduceMotion) {

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

  }


  /* ======================================================
     EXTERNAL LINKS SECURITY
  ====================================================== */

  doc
    .querySelectorAll(
      'a[target="_blank"]'
    )
    .forEach(link => {

      const rel =
        new Set(
          (
            link.getAttribute("rel") ||
            ""
          )
            .split(/\s+/)
            .filter(Boolean)
        );

      rel.add("noopener");
      rel.add("noreferrer");

      link.setAttribute(
        "rel",
        [...rel].join(" ")
      );

    });


  /* ======================================================
     INTERNAL NAVIGATION
  ====================================================== */

  doc.addEventListener(
    "click",
    event => {

      const link =
        event.target.closest(
          'a[href^="#"]'
        );

      if (!link) {
        return;
      }


      const href =
        link.getAttribute("href");


      if (
        !href ||
        href === "#"
      ) {
        return;
      }


      let target = null;


      try {

        target =
          doc.querySelector(href);

      } catch {

        return;

      }


      if (!target) {
        return;
      }


      event.preventDefault();


      target.scrollIntoView({
        behavior:
          reduceMotion
            ? "auto"
            : "smooth",

        block: "start"
      });


      if (
        window.history &&
        history.replaceState
      ) {

        history.replaceState(
          null,
          "",
          href
        );

      }

    }
  );


  /* ======================================================
     ACTIVE NAVIGATION SECTION
  ====================================================== */

  const navLinks =
    [
      ...doc.querySelectorAll(
        '.nav__links a[href^="#"]'
      )
    ];


  const navTargets =
    navLinks
      .map(link => {

        const href =
          link.getAttribute("href");

        if (
          !href ||
          href === "#"
        ) {
          return null;
        }


        let target = null;


        try {

          target =
            doc.querySelector(href);

        } catch {

          return null;

        }


        return target
          ? {
              link,
              target
            }
          : null;

      })
      .filter(Boolean);


  if (
    "IntersectionObserver" in window &&
    navTargets.length
  ) {

    const setActiveNavigation =
      activeTarget => {

        navTargets.forEach(
          ({
            link,
            target
          }) => {

            const active =
              target ===
              activeTarget;


            link.classList.toggle(
              "is-active",
              active
            );


            if (active) {

              link.setAttribute(
                "aria-current",
                "page"
              );

            } else {

              link.removeAttribute(
                "aria-current"
              );

            }

          }
        );

      };


    const navigationObserver =
      new IntersectionObserver(

        entries => {

          const visible =
            entries
              .filter(
                entry =>
                  entry.isIntersecting
              )
              .sort(
                (a, b) =>
                  b.intersectionRatio -
                  a.intersectionRatio
              );


          if (visible[0]) {

            setActiveNavigation(
              visible[0].target
            );

          }

        },

        {
          rootMargin:
            "-28% 0px -58% 0px",

          threshold: [
            0,
            0.15,
            0.35,
            0.6
          ]
        }

      );


    navTargets.forEach(
      ({ target }) => {

        navigationObserver
          .observe(target);

      }
    );

  }


  /* ======================================================
     MOTION PREFERENCE CHANGES
  ====================================================== */

  const handleMotionChange =
    event => {

      root.dataset.motion =
        event.matches
          ? "reduced"
          : "full";

    };


  if (
    typeof reducedMotionQuery
      .addEventListener ===
    "function"
  ) {

    reducedMotionQuery
      .addEventListener(
        "change",
        handleMotionChange
      );

  } else if (
    typeof reducedMotionQuery
      .addListener ===
    "function"
  ) {

    reducedMotionQuery
      .addListener(
        handleMotionChange
      );

  }


  /* ======================================================
     READY
  ====================================================== */

  root.classList.add("js-ready");

})();