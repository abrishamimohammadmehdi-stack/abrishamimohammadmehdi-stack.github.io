(() => {
 'use strict';
 const reduced = matchMedia('(prefers-reduced-motion: reduce)');
 const mobile = matchMedia('(max-width: 900px)');
 const targets = [...document.querySelectorAll('main section, .capability, .career-item, .education-item, .training-item, .contact-link')].filter(el => !el.classList.contains('hero'));
 if (!mobile.matches || reduced.matches || !('IntersectionObserver' in window)) return;
 const io = new IntersectionObserver(entries => {
  for (const e of entries) if(e.isIntersecting){ e.target.classList.add('mobile-entered');io.unobserve(e.target); }
 },{threshold:0.03,rootMargin:'0px 0px -5% 0px'});
 for (const el of targets) {
  if(el.getBoundingClientRect().top < innerHeight*.85) continue;
  el.classList.add('mobile-motion-ready'); io.observe(el);
 }
 // Never leave content invisible if the browser throttles intersection events.
 setTimeout(()=>{for(const el of targets) el.classList.add('mobile-entered')},7000);
})();
