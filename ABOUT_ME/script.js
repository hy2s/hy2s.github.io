document.addEventListener("DOMContentLoaded", () => {
  let current = 1;
  let intervalID = null;

  const $imgs = document.querySelectorAll("#div-wrap > div");
  const imgWidth = $imgs[0].offsetWidth;
  const maxLength = $imgs.length;

  const $prevBtn = document.querySelector(".left-btn");
  const $nextBtn = document.querySelector(".right-btn");
  const $imgList = document.querySelector("#div-wrap");
  const $menuList = document.querySelectorAll("nav > ul > li");
  const $listBar = document.querySelectorAll("#list-wrap > .list-left div");
  const $playBtn = document.querySelector(".play");


  // 복제 슬라이드 추가
  const firstClone = $imgs[0].cloneNode(true);
  $imgList.appendChild(firstClone);
  const lastClone = $imgs[$imgs.length - 1].cloneNode(true);
  $imgList.insertBefore(lastClone, $imgList.firstChild);

  // 초기 위치
  gsap.set("#div-wrap", { x: -(imgWidth) * current });

  // 슬라이드 이동 함수
  const goToSlide = (index) => {
    current = index;
    if ( current !== 0 && current !== maxLength + 1 ){
      updateMenuClass();
    }
    gsap.to("#div-wrap", {
      x: -(imgWidth) * current,
      duration: 0.7,
      onComplete: () => {
        if (current === maxLength + 1) {
          current = 1;
          gsap.set("#div-wrap", { x: -(imgWidth) * current });
          updateMenuClass();
        } else if (current === 0) {
          current = maxLength;
          gsap.set("#div-wrap", { x: -(imgWidth) * current });
          updateMenuClass();
        }
      },
    });
  };

  // 다음 버튼 클릭
  $nextBtn.addEventListener("click", () => {
    goToSlide(current + 1);
  });

  // 이전 버튼 클릭
  $prevBtn.addEventListener("click", () => {
    goToSlide(current - 1);
  });

  // nav 클릭 시
  $menuList.forEach((li, index) => {
    li.addEventListener("click", () => {
      clearInterval(intervalID);
      intervalID = null;
      $playBtn.disabled = false;

      goToSlide(index + 1);
    });
  });

  // 메뉴 및 하단 동그라미 클래스 갱신
  const updateMenuClass = () => {
    $menuList.forEach((el) => el.classList.remove("nav-focus"));
    $listBar.forEach((el) => el.classList.remove("focus"));

    if ($menuList[current - 1]) $menuList[current - 1].classList.add("nav-focus");
    if ($listBar[current - 1]) $listBar[current - 1].classList.add("focus");
  };
  console.log("current", current);
console.log("target", $listBar[current - 1]);

$playBtn.addEventListener("click", () => {
  if (!intervalID) {
    // 자동 실행 시작
    intervalID = setInterval(() => {
      goToSlide(current + 1);
    }, 5000);
    $playBtn.textContent = "stop ■";
  } else {
    // 자동 실행 정지
    clearInterval(intervalID);
    intervalID = null;
    $playBtn.textContent = "auto play ▶";
  }
});

});