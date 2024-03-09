// اختير اللصناديق
const ChoseeBox = document.querySelectorAll(".galearys .galeary ul li");
const Box = document.querySelectorAll(".galearys .galeary .box");
// عرض المزيد
const More = document.querySelector(".more");
let M = 0;
let N = 2;

// اختير اللصناديق
function Chosee() {
  ChoseeBox.forEach((element) => {
    element.addEventListener("click", () => {
      ChoseeBox.forEach((element) => {
        element.classList = "";
      });
      element.classList = "active";
      Box.forEach((ele) => {
        if (
          element.innerHTML != ele.dataset.type &&
          element.innerHTML != "all"
        ) {
          ele.style.display = "none";
          ele.classList.remove("show");
        } else {
          ele.style.display = "flex";
          ele.classList.add("show");
        }
      });
      // N = 2;
      // dddd();
    });
  });
}
Chosee();
// عرض المزيد
// function dddd() {
//   M = 0;
//   Box.forEach((element) => {
//     if (M <= N && element.classList[1] == "show") {
//       M += 1;
//       element.style.display = "flex";
//     } else {
//       element.style.display = "none";
//     }
//   });
// }
// dddd();
// More.onclick = (params) => {
//   N += 3;
//   dddd();
// };
