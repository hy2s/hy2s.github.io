    // 변수 선언 (객체 가져오기)
    const $input = document.querySelector("#word");
    const $btn = document.querySelector("#btn-input");
    const $p = document.querySelector("p");
    const $list = document.querySelector("#word-list");
    const $start = document.querySelector(".start");
    const $view = document.querySelector(".view");

    const $startBtn = document.querySelector("#btn-start");
    const $startInput = document.querySelector("#start-word");

    // p태그의 textContent를 변경하는 함수
    const changePcontent = (keyword) =>{
      const $p = document.querySelector("p");
      $p.textContent = `제시어 : ${keyword}`;
    }
    // 입력값을 받아 ul에 li를 추가하는 함수
    const createli = (keyword) =>{
      const elemLi = document.createElement("li");
      elemLi.textContent = keyword;
      $list.appendChild(elemLi);
    }

    /*
    시작 버튼을 누르면 입력값이 있는지 확인하고
    있으면 ul(#word-list)에 추가
    */
    const handleStartBtn = ()=>{
      const elem = document.querySelector("#start-word").value;
      // $p.textContent = elem.value;
      if ( elem !== '' ){
        createli(elem);
        $view.style.display = 'block';
        $start.style.display = 'none';
        $input.focus();
        changePcontent(elem);
      } else {
        alert ("낱말을 입력하세요");
        return;
      }
    }
    $startBtn.addEventListener("click",handleStartBtn);
    $startInput.addEventListener("keydown",(e)=>{
      if( e.key === 'Enter' ){
        $startBtn.click();
      }
    });


    // 맞는 낱말인지 체크하는 함수 선언
    const handleWordInput = ()=>{
      const keyword = $input.value.trim();
      if ( keyword === '' ){
        alert ( "낱말을 입력하세요" );
        return;
      }
      // 이전 입력 낱말
      const last = $list.lastElementChild.textContent;
      const lastWord = last[last.length-1];
      const firstWord = keyword[0];
      // 맞게 입력되었는지 체크
      if( lastWord === firstWord ){
        // 끝말잇기 성공 시 화면에 출력
        changePcontent(keyword);
        createli(keyword);
      } else {
        // 끝말잇기 실패
        alert(`'${lastWord}'로 시작하는 단어을 입력하세요`);
      }
      $input.value = '';
      $input.focus();
    };

    $btn.addEventListener("click",handleWordInput);
    // input에서 입력 후 Enter키 누르면 입력 버튼 클릭
    $input.addEventListener("keydown",(e)=>{
      if( e.key === 'Enter' ){
        $btn.click();
      }
    });
