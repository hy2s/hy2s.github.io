(function(){

// header
gsap.from(".title > li", {
  delay: 1,
  y: -50,
  opacity: 0,
  duration: 1,
  stagger: 0.3
});

// header > arrow 하나씩 아래로 내려오는 모션
const tl3 = gsap.timeline({ repeat: -1 });
tl3.to(".arrow > p",{
  y: 10,
  opacity: 1,
  stagger: 0.2,
  duration: 0.4,
  ease: "power1.out"
})
.to(".arrow > p",{
  y: 20,
  opacity: 0,
  stagger: 0.2,
  duration: 0.4,
  ease: "power1.out"
});

// aboutme
const $aboutMsg = document.querySelectorAll(".about-wrap > .info p");
$aboutMsg.forEach((msg)=>{
  gsap.from(msg, {
    scale: 0.4,
    opacity: 0,
    duration: 1,
    scrollTrigger: {
      trigger: msg,
      start: "top 70%",
      toggleActions: "play reverse play reverse"
    }
  })}
);

// keyword 부분이 가로로 왔다갔다
const $keywordList = document.querySelectorAll(".keyword > li");
$keywordList.forEach((word,idx)=>{
  const posX = (idx === 1) ? 20: -20;
  gsap.fromTo(word,
    { x: posX },
    {
      x: -posX,
      duration: 1,
      // delay: idx*0.2,
      // repeatDelay: idx*0.3,
      repeat: -1,
      yoyo: true,
      ease: "none"
    }
  )
});

// const tl2 = gsap.timeline({repeat: -1, yoyo: true });
// tl2.to($keywordList,{
//   x: (i)=>(i===1 ? -30: 30),
//   duration: 0.5,
//   ease: "sine.inOut",
//   stagger: {
//     each: 0.2
//   }
// });


// project 영역의 .item 들은 아래에서 올라오면서 보이도록
const $projects = document.querySelectorAll("#projects > .project-wrap");
$projects.forEach((article)=>{
  const $item = article.querySelectorAll(".item");
  $item.forEach((item)=>{
    gsap.from(item,{
      y: 200,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: item,
        start: "top 80%",
        end: "top 40%",
        scrub: true
      }
    })
  })
});


// ***** skills *****
const $shapes = document.querySelectorAll(".skill-item > li");
gsap.from($shapes, {
  opacity: 0,
  scale: 0.2,
  duration: 0.1,
  stagger: 0.1,
  ease: "back.out",
  scrollTrigger: {
    trigger: "#skills",
    start: "top 50%",
    toggleActions: "play reverse play reverse"
  }
});

// ***** footer *****
gsap.fromTo("footer",{
  backgroundColor: "#2957E2"
},{
  backgroundColor:"#eeeeee",
  duration: 3,
  ease: "power2.out",
  scrollTrigger: {
    trigger: "footer",
    start: "top 80%",
    end: "bottom bottom",
    scrub: true,
    toggleActions: "play none none none"
  }
});


// ***** footer links *****
gsap.to(".links > li",{
  backgroundColor: (i)=>(i===0 ? "#2957E2":"#eeeeee"),
  color: (i)=>(i===0 ? "#eeeeee":"#2957E2" ),
  borderColor: (i)=>(i===0 ? "#eeeeee":"#2957E2" ),
  duration: 2,
  repeat: -1,
  yoyo: true,
  ease: "power1.inOut",
    scrollTrigger:{
    trigger: "footer",
    start: "top 50%",
    toggleActions: "play none none none"
  }
});

})();