// 창 사이즈별 js파일 가져오기
const checkDevice = ()=>{
  const device = window.innerWidth<=768 ? "mobile" : "pc";
  const script = document.createElement("script");
  script.src = `script/${device}.js`;
  document.body.appendChild(script);
}

window.addEventListener("load",()=>{
  checkDevice();
  gsap.registerPlugin(ScrollTrigger);
});
// window.addEventListener("resize",checkDevice);
