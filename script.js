let currentSlider = document.querySelector(".slider");
const leftBtn = document.querySelector(".left");
const rightBtn = document.querySelector(".right");
const length = currentSlider.children.length;
const btnContainer = document.querySelector(".optBtnContainer");

//オプションボタンの追加
for(let i = 0; i < length; i++){
 const optBtn = document.createElement("button");
 optBtn.textContent = "O";
 optBtn.dataset.ref = i;
 btnContainer.append(optBtn);
}
const btns = btnContainer.querySelectorAll("button");
let anime;

//オートスライド
const sliderFn = () => {
 anime?.cancel();
 anime = currentSlider.animate([
  {transform: "translateX(0)"},
  {transform: "translateX(-100%)"},
 ],{
  duration: 1000,
  fill: "forwards"
 });
 currentSlider.append(currentSlider.children[0]);
 //これだけで順転できる。
 //slider.append(slider.children[0]);
};
let id = setInterval(sliderFn, 2000);

//左ボタン
leftBtn.addEventListener("click", () => {
 anime?.cancel();
 clearInterval(id);
 anime = currentSlider.animate([
  {transform: "translateX(-200%)"},
  {transform: "translateX(-100%)"}
 ],{
  duration: 1000,
  fill: "forwards"
 });
 currentSlider.prepend(currentSlider.children[length - 1]);
 id = setInterval(sliderFn, 2000);
});

//右ボタン
rightBtn.addEventListener("click", () => {
 anime?.cancel();
 clearInterval(id);
 anime = currentSlider.animate([
  {transform: "translateX(0%)"},
  {transform: "translateX(-100%)"}
 ],{
  duration: 1000,
  fill: "forwards"
 });
 currentSlider.append(currentSlider.children[0]);
 id = setInterval(sliderFn, 2000);
});

//オプションボタンを押したときのcb
const jump = (start, end) => {
 anime = currentSlider.animate([
  { transform: `translateX(${start}` },
  { transform: `translateX(${end})` },
 ],{
  duration: 1000,
  fill: "forwards"
 });
};

//オプションボタンのイベント
btns.forEach((btn, ref) => {
  btn.addEventListener("click", (e) => {
    anime?.cancel();
    clearInterval(id);
    const targetIndex = e.currentTarget.dataset.ref;
    currentSlider = document.querySelector(".slider");
    let children = Array.from(currentSlider.children);
    const targetElement = children.find((elem) => elem.dataset.ref === targetIndex);
    const position = children.indexOf(targetElement);
   
    if(position === 0) {
      jump(`${0}%`, `-${100}%`);
      currentSlider.prepend(currentSlider.children[length - 1]);
      id = setInterval(sliderFn, 2000);
    }else if( position > 1){
      const difference = (position + 1) * -100;
      jump(0, difference);
      for(let i = 1; i < position; i++){
        currentSlider.append(currentSlider.children[0]);
      }
      id = setInterval(sliderFn, 2000);
    } else {
      id = setInterval(sliderFn, 2000);
    }
  });
});