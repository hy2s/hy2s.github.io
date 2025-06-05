gsap.registerPlugin(ScrollTrigger);

// ************ header ***********
// const tl = gsap.timeline();
// tl.from(".slogan > h2",{
//   opacity: 0,
//   y: -30,
//   duration: 1
// })
// .from(".slogan > h1",{
//   opacity: 0,
//   y: -30,
//   duration: 1
// }, "-=0.5")
// .from(".slogan > p",{
//   opacity: 0,
//   y: -30,
//   duration: 1
// }, "-=0.5");
gsap.from(".slogan > h2, .slogan > h1, .slogan > p",{
  opacity: 0,
  y: -30,
  duration: 1,
  stagger: 0.5
});

// ************ about me ***********
gsap.from("#aboutme",{
  opacity: 0,
  y: 100,
  // duration: 1,
  scrollTrigger:{
    trigger: "#aboutme",
    start: "top 70%",
    end: "top 20%",
    scrub: true,
    // markers: true
  }
});


// ************ laster ***********
const $ul = document.querySelector("#laster>ul");
let total = $ul.scrollWidth - (window.innerWidth*0.7);
gsap.to($ul,{
  x: -(total),
  ease: "none",
  scrollTrigger:{
    trigger:"#laster",
    start: "top top",
    end: "+="+total,
    scrub: true,
    pin: true,
    markers: false
  }
});


// ************ laster ***********
gsap.from(".title",{
  scale: 0.5,
  opacity: 0,
  duration: 1,
  scrollTrigger:{
    trigger: "#contact",
    start: "top 50%",
    markers: false
  }
});