const elem = document.querySelector('.open-popup');
const popup = document.querySelector('.popup');

elem.addEventListener('click',()=>{
    popup.style.display = 'block';
});

const btn = document.querySelector(".popup-box>button");
btn.addEventListener("click",()=>{
    popup.style.display = 'none';
});