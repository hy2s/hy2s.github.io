    // 변수 선언
    let current = 1;
    let intervalID = null;
    const $imgs = document.querySelectorAll("#div-wrap > div");
    const imgWidth = $imgs[0].offsetWidth;
    const maxLength = $imgs.length;

    const $prevBtn = document.querySelector(".left-btn");
    const $nextBtn = document.querySelector(".right-btn");
    const $imgList = document.querySelector("#div-wrap");
    const $menuList = document.querySelectorAll("nav > li");
    const $playList = document.querySelectorAll(".play");
    
    console.log( $nextBtn );
    // 첫 번째 이미지를 복제해서 맨뒤에 추가
    const firstClone = $imgs[0].cloneNode(true);
    $imgList.appendChild(firstClone);
    
    // 3번 이미지를 복제해서 맨앞에 추가
    const lastClone = $imgs[$imgs.length-1].cloneNode(true);
    $imgList.insertBefore(lastClone, $imgList.firstChild);    

    // 초기 위치 설정
    gsap.set(".img-list", {x:-(imgWidth)*current});

    // 다음 버튼 클릭
    const clickNextBtn = ()=>{
      current++;
      gsap.to(".img-list",{
        x:-(imgWidth)*current,
        duration: 0.5,
        onComplete:()=>{
          // 마지막에 호출되는 함수
          if( current === (maxLength+1) ){
            current = 1;
            gsap.set(".img-list", {x:-(imgWidth)*current});
          }
          updateMenuClass();
        }
      });
    }

    $nextBtn.addEventListener("click",()=>{
      $playList[1].click();
      clickNextBtn();
    });

    // 이전 버튼 클릭
    $prevBtn.addEventListener("click",()=>{
      current--;
      gsap.to(".img-list",{
        x: -(imgWidth)*current,
        duration: 0.5,
        onComplete:()=>{
          if( current === 0 ){
            current = maxLength;
            gsap.set(".img-list",{x:-(imgWidth)*current});
          }
          updateMenuClass();
        }
      });
    });

    // menu-list에 마우스가 올라갔을 때 색 변경하는 클래스 추가
    const updateMenuClass = ()=>{
      // 이전에 부여된 active 클래스 삭제
      $menuList.forEach((elem)=>{
        elem.classList.remove("active");
      });
      // current 위치의 ul에 active 클래스를 부여
      $menuList[current-1].classList.add("active");
    };

    // ul > li 에 마우스가 올라갔을 때
    $menuList.forEach((elem)=>{
      // mouse enter
      // console.log( typeof elem.dataset.index );
      elem.addEventListener("mouseenter",()=>{
      $playList[1].click();
        current = Number(elem.dataset.index);
        gsap.to(".img-list",{
          x:-(imgWidth)*current,
          duration: 0.5
        });
        updateMenuClass();
      });
    });

    // 자동 실행 버튼을 클릭했을 때
    $playList[0].addEventListener("click",()=>{
      intervalID = setInterval(()=>{
        clickNextBtn();
      },1000);
      $playList[0].disabled = true;
    });

    // // 멈춤을 클릭했을 때
    // $playList[1].addEventListener("click",()=>{
    //   if( intervalID ){
    //     clearInterval(intervalID);
    //     intervalID = null;
    //     $playList[0].disabled = false;
    //   }
    // });
