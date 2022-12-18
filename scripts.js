const tabsbox = document.querySelector(".tabs-box");
const arrowicons = document.querySelectorAll(".icons i");
const alltabs = document.querySelectorAll(".tab");

let isdragging = false;

const handleIcons = () => {
  let scrollval = Math.round(tabsbox.scrollLeft);
  let maxscrollablewidth = tabsbox.scrollWidth - tabsbox.clientWidth;
  //console.log(maxscrollablewidth, scrollval);
  arrowicons[0].parentElement.style.display = scrollval > 0 ? "flex" : "none";
  arrowicons[1].parentElement.style.display =
    maxscrollablewidth > scrollval ? "flex" : "none";
};

arrowicons.forEach((icons) => {
  icons.addEventListener("click", () => {
    //console.log(icons.id);
    //if clicked icon is left reduce 350 from tabsbox scrollleft else add
    tabsbox.scrollLeft += icons.id === "left" ? -350 : 350;

    //calling handleIcons after 50 miliseconds
    setTimeout(() => handleIcons(), 50);
  });
});

alltabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    //removing active class from the previous tab & adding to current clicked tab
    tabsbox.querySelector(".active").classList.remove("active");
    tab.classList.add("active");
  });
});

const dragging = (e) => {
  if (!isdragging) return;
  tabsbox.classList.add("dragging");
  tabsbox.scrollLeft -= e.movementX;
  handleIcons();
};

const dragStop = () => {
  isdragging = false;
  tabsbox.classList.remove("dragging");
};

tabsbox.addEventListener("mousedown", () => (isdragging = true));
tabsbox.addEventListener("mousemove", dragging);
tabsbox.addEventListener("mouseup", dragStop);
