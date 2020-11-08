"use strict";

var Header = document.querySelector('.header');
window.addEventListener("load", function (e) {
  var hideHeader = new Promise(function (resolve) {
    Header.querySelector(".header_logo").style.transform = "translate(-100vw,0px)";
    Header.querySelectorAll(".nav_p").forEach(function (p) {
      return p.style.transform = "translate(-100vw,0px)";
    });
    Header.querySelector(".header_btn").style.transform = "translate(-100vw,0px)";
  });
  headerAnimation(e);
});

function headerAnimation(e) {}