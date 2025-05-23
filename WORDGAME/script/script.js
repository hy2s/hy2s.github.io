    // 변수 선언 (객체 가져오기)
    const $input = document.querySelector("#chat-input");
    const $btn = document.querySelector("#chat-btn");

    const $list = document.querySelector("#chat-wrap");
    const $start = document.querySelector("#start-wrap");
    const $view = document.querySelector("#game");

    const $startInput = document.querySelector("#start-input");
    const $startBtn = document.querySelector("#start-btn");

    const $score = document.querySelector(".score");
    let score = -1;

    const $popup = document.querySelector(".popup");
    const $popupBtn = document.querySelector(".popup-btn")
    const $popupTxt = document.querySelector(".popup-box > h2");

    
    
    const createClass = (keyword, side)=>{
      const elemChatDiv = document.createElement("div");
      const elemChat = document.createElement("p");
      elemChat.textContent = keyword;
      elemChatDiv.className = side;
      elemChatDiv.appendChild(elemChat);
      $list.appendChild(elemChatDiv);
      
      $list.scrollTop = $list.scrollHeight;
      
      return elemChatDiv;
    };
    
    // 입력값을 받아 말풍선을 추가하는 함수
    const createWord = (keyword) =>{
      side = "left";
      if ($list.lastChild.className === "left") {
        side = "right";
      } else {
        side = "left";
      }
      createClass(keyword, side);
      score++;
      $score.textContent = score;
    };
    
    /*
    시작 버튼을 누르면 입력값이 있는지 확인하고
    있으면 ul(#word-list)에 추가
    */
  const handleStartBtn = ()=>{
    const elem = document.querySelector("#start-input").value;
     // $p.textContent = elem.value;
    if ( elem !== '' ){
      score = -1;
      $score.textContent = score;
      createWord(elem);
      $view.style.display = 'block';
      $start.style.display = 'none';
      $input.focus();
      startTimer();
      } else {
        $popup.style.display = 'flex';
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
        $popup.style.display = 'flex';
        return;
      }
      // 이전 입력 낱말
      const last = $list.lastElementChild.textContent;
      const lastWord = last[last.length-1];
      const firstWord = keyword[0];

      // 맞게 입력되었는지 체크
      if( lastWord === firstWord ){
        // 끝말잇기 성공 시 화면에 출력
        createWord(keyword);
      } else {
        // 끝말잇기 실패
        $popupTxt.textContent = (`'${lastWord}'로 시작하는 단어를 입력하세요`);
        $popup.style.display = 'flex';
      }
      $input.value = '';
      $input.focus();
    };
    
    $btn.addEventListener("click",handleWordInput);
    
    // input에서 입력 후 Enter키 누르면 입력 버튼 클릭
    $input.addEventListener("keydown",(e)=>{
      if( e.key === 'Enter' ){
        $btn.click();
        handleWordInput();
      }
    });
    
    console.log( $score );
    
    
    
    // ************ 타이머 ***********
    let timerInterval;
    let timeLeft = 60; // 60초
    
    // 기존 스코어 업데이트용 클래스
    // 타이머 표시 엘리먼트
    const $timer = document.querySelector(".timer");
    // 결과창 스코어 표시용
    const $finalScore = document.querySelector("#final-score");
    const $resultScreen = document.querySelector("#result-wrap");
    
    const startTimer = () => {
      timeLeft = 60;
      $timer.textContent = "01:00";
      
      timerInterval = setInterval(() => {
        timeLeft--;
        
        // 시간 포맷
        const minutes = String(Math.floor(timeLeft / 60)).padStart(2, '0');
        const seconds = String(timeLeft % 60).padStart(2, '0');
        $timer.textContent = `${minutes}:${seconds}`;
        
        // 색상 변경
        if (timeLeft <= 10) {
          $timer.style.color = "red";
        }
        
        // 종료 처리
        if (timeLeft <= 0) {
          clearInterval(timerInterval);
          $view.style.display = "none";
          $resultScreen.style.display = "block";
          $finalScore.textContent = score;
        }
      }, 1000);
    };
    
    // **************** 팝업창 *****************

    $popupBtn.addEventListener("click",()=>{
      $popup.style.display = 'none';
    })
    document.addEventListener("keydown", (e) => {
      const isPopupVisible = getComputedStyle($popup).display === 'flex';
      if (isPopupVisible && e.key === 'Enter') {
        $popupBtn.click();
      }
    }); 