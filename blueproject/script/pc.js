// header 영역의 title이 오른쪽에서 왼쪽으로 이동
const $headerMsg = document.querySelectorAll("header .title li");
gsap.from($headerMsg, {
  x: 200,
  opacity: 0,
  duration: 1,
  stagger: 0.5
});

// header > arrow 하나씩 아래로 내려오는 모션
gsap.set(".arrow > p", { y:0 });
const tl = gsap.timeline({repeat: -1});
tl.to(".arrow > p", {
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

// h1태그는 scale이 변경, bounce.out 처리
gsap.from("header > h1",{
  scale: 0.7,
  opacity: 0,
  duration: 2,
  ease: "bounce.out"
});

// about 영역을 가로로 스크롤되게 처리
const $aboutWrap = document.querySelector("#about > .about-wrap");
const scrollWidth = $aboutWrap.scrollWidth - window.innerWidth;
const horizonScroll = gsap.to($aboutWrap, {
  x: -scrollWidth,
  duration: 1,
  scrollTrigger: {
    trigger: "#about",
    start: "top top",
    end: "+="+scrollWidth,
    pin: true,
    scrub: true,
  }
});

// about info에 있는 p태그들은 오른쪽에서 왼쪽으로 이동
const $aboutMsg = document.querySelectorAll("#about .info p");
$aboutMsg.forEach((msg)=>{
  gsap.from(msg,{
    x: 200,
    opacity: 0,
    duration: 1,
    scrollTrigger: {
      trigger: msg,
      containerAnimation: horizonScroll,  // 가로 스크롤일 경우 꼭 기재
      start: "left 90%",
      toggleActions: "play reverse play reverse"
    }
  })
});

// keyword 부분이 가로로 왔다갔다 실행
const $keywordList = document.querySelectorAll(".keyword>li");
$keywordList.forEach((elem,idx)=>{
  const posX = (idx === 1)? 50 : -50;
  gsap.fromTo(elem,{
    x: posX
  },{
    x: -posX,
    duration: 1,
    repeat: -1,
    yoyo: true,
    ease: "none"
  });
});

//project 이동 gsap 애니
const fromTop = (elem,posY)=>{
  gsap.from(elem,{
    y:200,
    opacity: 0,
    duration: 1,
    scrollTrigger:{
      trigger: elem,
      start: `top ${posY}%`,
      end: "top 40%",
      scrub: true
    }
  });
}
// project 안에 card item을 계단 형식으로 애니처리 됨
const $project = document.querySelectorAll("#projects>.nomal");
$project.forEach((article)=>{
  const $item = article.querySelectorAll(".item");
  $item.forEach((item,idx)=>{
    let posY = 90 - idx*15;
    fromTop(item,posY);
  });
});
//practice project 영역은 계단식 애니메이션 처리
const $practice = document.querySelectorAll("#projects>.practice .item");
$practice.forEach((item,idx)=>{
  let posY = 70 - idx*3;
  fromTop(item,posY);
});

//skills 에서 h2태그는 커진상태에서 작아지면서 안보이게
gsap.to("#skills>h2",{
  opacity: 0,
  scale: 0.5,
  duration: 2,
  scrollTrigger: {
    trigger: "#skills",
    start: "top 80%",
    toggleActions: "play reverse play reverse"
  }
});
//skills에서 li들은 작아진 상태에서 커지게 : stagger
const $shapes = document.querySelectorAll(".skill-item>li");
gsap.from($shapes,{
  opacity: 0,
  scale:0.2,
  duration: 0.5,
  stagger: 0.2,
  ease: "back.out",
  scrollTrigger:{
    trigger: "#skills",
    start: "top 50%",
    toggleActions: "play reverse play reverse"
  }
});


// footer 텍스트 커졌다가 작아지게
const $footer = document.querySelectorAll(".footer-wrap > *");
gsap.from($footer,{
  opacity: 0,
  scale: 1.3,
  duration: 1,
  stagger: 0.1,
  ease: "power2.out",
    scrollTrigger:{
    trigger: "footer",
    start: "top 20%"
  }
});


// home을 누르면 제일 위로 올라가기
const $home = document.querySelector("#logo");
$home.addEventListener("click",()=>{
  window.scrollTo({
    top: 0,
  });
})