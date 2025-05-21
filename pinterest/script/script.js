// 요소 선택 (변수 선언)
const $menu = document.querySelectorAll("main > ul > li");
const $section = document.querySelector("section");

// 메뉴 클릭 시 이벤트
$menu.forEach((elem)=>{
  elem.addEventListener("click",()=>{
    // 다른 li에 on이라는 클래스가 추가되어 있으면 삭제
    const $on = document.querySelector('main > ul > li.on');
    if ( $on ){
      $on.classList.remove('on');
    }
    elem.classList.add("on");

    // 클릭한 메뉴 텍스트 가져오기
    const filter = elem.textContent.trim().toLowerCase();
    const $article = document.querySelectorAll("section > article");
    $article.forEach((article)=>{
      const text =  article.classList.contains("good") ? "good" :
                    article.classList.contains("bad") ? "bad" : "";
      if( filter === 'all' || filter === text ){
        article.style.display = "block";
      } else {
        article.style.display = "none";
      }
    });
  });
});

// imgList에서 정보를 읽어와서 요소 생성
// section에 추가
imgList.forEach((data)=>{
  // data값 이용하여 요소 생성
  const $article = document.createElement("article");
  $article.classList.add(data.type);
  const $div = document.createElement("div");
  const $img = document.createElement("img");
  $img.src = data.img;
  $img.alt = data.title;
  const $title = document.createElement("h2");
  $title.textContent = data.title;
  const $desc = document.createElement("p");
  $desc.textContent = data.desc;

  $article.appendChild($div);
  $div.appendChild($img);
  $div.appendChild($title);
  $div.appendChild($desc);
  $section.appendChild($article);
});
