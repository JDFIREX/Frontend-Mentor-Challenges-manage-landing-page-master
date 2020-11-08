"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var header_humb = document.querySelector('.header_humb');
var openNav = false;
var humbScr = "images/icon-hamburger.svg";
var closeScr = "images/icon-close.svg";
var Opacity = [0, 1];
var nav = document.querySelector(".nav");
var nav_p = document.querySelectorAll(".nav_p");

function header_humb_animation(header_humb, s, o, c) {
  header_humb.style.pointerEvents = "none";
  header_humb.style.opacity = o[0];
  setTimeout(function () {
    header_humb.src = s;

    if (c == "close") {
      header_humb.style.position = "fixed";

      if (window.innerWidth > 600) {
        header_humb.style.top = "2.2rem";

        if (c == "close") {
          header_humb.style.transform = "translateX(calc(100vw - 17.5vw))";
        }
      } else {
        header_humb.style.top = "3rem";
        header_humb.style.right = "5vw";
        header_humb.style.transform = "translateX(calc(100vw - 13vw))";
      }
    } else {
      header_humb.style.position = "relative";
      header_humb.style.top = "-.4vw";
      header_humb.style.transform = "translateX(0)";
    }

    setTimeout(function () {
      header_humb.style.opacity = o[1];
      setTimeout(function () {
        header_humb.style.pointerEvents = "all";
      }, 100);
    }, 100);
  }, 300);
}

function navAnimationOpen(nav, nav_p) {
  nav.style.top = "8rem";
  setTimeout(function () {
    nav.style.opacity = "1";
    setTimeout(function () {
      nav_p.forEach(function (i) {
        return i.style.transform = "translateX(0%)";
      });
      nav.style.boxShadow = "6px 110px 128px 160px rgba(0,0,0,0.62)";
      setTimeout(function () {
        nav_p.forEach(function (i) {
          return i.style.opacity = "1";
        });
      }, 150);
    }, 200);
  }, 300);
}

function navAnimationClose(nav, nav_p) {
  nav_p.forEach(function (i) {
    return i.style.opacity = "0";
  });
  setTimeout(function () {
    nav_p.forEach(function (i) {
      return i.style.transform = "translateX(300%)";
    });
    nav.style.boxShadow = "none";
    setTimeout(function () {
      nav.style.opacity = "0";
      setTimeout(function () {
        nav.style.top = "-100rem";
      }, 50);
    }, 100);
  }, 150);
}

function header_humb_change_promise() {
  var header_humb_change = new Promise(function (resolve) {
    resolve(openNav);

    if (openNav == false) {
      openNav = true;
      header_humb_animation(header_humb, closeScr, Opacity, "close");
    } else {
      openNav = false;
      header_humb_animation(header_humb, humbScr, Opacity, "open");
    }
  });
  header_humb_change.then(function (c) {
    if (c == false) {
      c = true;
      navAnimationOpen(nav, nav_p);
    } else {
      c = false;
      navAnimationClose(nav, nav_p);
    }
  });
}

header_humb.addEventListener("click", function (e) {
  header_humb_change_promise();
});
window.addEventListener("keydown", function (e) {
  if (e.key == "Escape" && openNav) {
    header_humb_change_promise();
  }
}); //  slider 

var comments_list = document.querySelector(".comments_list");
var comments_item = document.querySelectorAll(".comments_item");

var commentsPerson = function commentsPerson(ID, Profile, Name, FullName, p) {
  _classCallCheck(this, commentsPerson);

  this.ID = ID;
  this.Profile = Profile;
  this.Name = Name;
  this.FullName = FullName;
  this.p = p;
};

var Anisha = new commentsPerson("1", "images/avatar-anisha.png", "Anisha", "Anisha Li", "“Manage has supercharged our team’s workflow. The ability to maintain visibility on larger milestones at all times keeps everyone motivated.”");
var Ali = new commentsPerson("2", "images/avatar-ali.png", "Ali", "Ali Bravo", "“We have been able to cancel so many other subscriptions since using Manage. There is no more cross-channel confusion and everyone is much more focused.”");
var Richard = new commentsPerson("3", "images/avatar-richard.png", "Richard", "Richard Watts", "“Manage allows us to provide structure and process. It keeps us organized  and focused. I can’t stop recommending them to everyone I talk to!”");
var Shanai = new commentsPerson("4", "images/avatar-shanai.png", "Shanai", "Shanai Gough", "“Their software allows us to track, manage and collaborate on our projects from anywhere. It keeps the whole team in-sync without being intrusive.”");
var list = [Shanai, Anisha, Ali, Richard, Shanai];

for (var i = 0; i < 5; i++) {
  addPerson(i);
}

function addPerson(i) {
  var comments_item_div = document.createElement("div");
  comments_item_div.classList.add("comments_item");
  comments_item_div.classList.add("background_vary_light_gray");
  comments_item_div.dataset.ID = list[i].ID;
  comments_item_div.innerHTML = "\n    <img class=\"comments_profil\" src=".concat(list[i].Profile, " alt=").concat(list[i].Name, " data-id=").concat(list[i].ID, ">\n    <h1 class=\"color_dark_blue\">").concat(list[i].FullName, "</h1>\n    <p class=\"color_dark_grayish_blue\">").concat(list[i].p, "</p>\n    ");
  return comments_list.appendChild(comments_item_div);
}

var isDown = false;
var lastX = 0;
var x = 0;
var side = "";
setPosition();
comments_list.addEventListener("mousedown", function (e) {
  lastX = e.x;
  lastX2 = e.x;
  isDown = true;
});
comments_list.addEventListener("mousemove", function (e) {
  if (isDown) {
    slider(e);
  }
});
comments_list.addEventListener("mouseup", function (e) {
  isDown = false;
});
comments_list.addEventListener("mouseleave", function (e) {
  isDown = false;
});
comments_list.addEventListener("touchstart", function (e) {
  lastX = e.targetTouches[0].screenX;
  lastX2 = e.targetTouches[0].screenX;
  isDown = true;
});
comments_list.addEventListener("touchmove", function (e) {
  if (isDown) {
    slider(e);
  }
});
comments_list.addEventListener("touchend", function (e) {
  isDown = false;
});
comments_list.addEventListener("touchcancel", function (e) {
  isDown = false;
});

function slider(e) {
  sliderMove(e);
  setPosition();
  var boxWidth = 0;
  var cords = comments_list.getBoundingClientRect();
  window.innerWidth > 600 ? boxWidth = 576 : boxWidth = window.innerWidth / 100 * 96;
  cords.left * -1 < boxWidth ? leftSideSlider(boxWidth) : cords.right < boxWidth + window.innerWidth ? rightSideSlider(boxWidth) : null;
}

function sliderMove(e) {
  if (e.targetTouches) {
    x += e.targetTouches[0].screenX - lastX;
    e.targetTouches[0].screenX < lastX ? side = "left" : e.targetTouches[0].screenX > lastX ? side = "right" : null;
    lastX = e.targetTouches[0].screenX;
  } else if (e.x) {
    x += e.x - lastX;
    e.x > lastX ? side = "left" : e.x < lastX ? side = "right" : null;
    lastX = e.x;
  }

  comments_list.style.left = "".concat(x) + "px";
}

function leftSideSlider(boxWidth) {
  comments_list.removeChild(comments_list.lastChild);
  comments_list.children[0].parentNode.insertBefore(addPerson(comments_list.lastChild.dataset.ID), comments_list.children[0]);
  x -= boxWidth;
  comments_list.style.left = "".concat(x) + "px";
}

function rightSideSlider(boxWidth) {
  comments_list.removeChild(comments_list.children[0]);
  comments_list.appendChild(addPerson(comments_list.children[0].dataset.ID));
  x += boxWidth;
  comments_list.style.left = "".concat(x) + "px";
}

function setPosition() {
  var comments_slider_positions = document.querySelector(".comments_slider_positions");
  var m = comments_list.children[2].dataset.ID;
  m == 4 ? m = 0 : null;

  for (var _i = 0; _i < 4; _i++) {
    comments_slider_positions.children[_i].style.backgroundColor = "hsl(0, 0%, 98%)";
  }

  comments_slider_positions.children[m].style.backgroundColor = "hsl(12, 88%, 59%)";
} //  email check


var input_email = document.querySelector(".input_email");
var valid = true;
input_email.addEventListener("keydown", function (e) {
  return checkEmail(e);
});
input_email.addEventListener("change", function (e) {
  return checkEmail(e);
});

function checkEmail(e) {
  valid = false;
  showEmailError(0);
  var v = e.target.value + e.key; // include @

  v.includes("@") ? null : valid = true; // include more than one @;

  v = v.split("");
  v.filter(function (a) {
    return a == "@";
  }).length > 1 ? valid = true : null; // check if after @ include .

  if (!valid) {
    var _x = v.indexOf("@");

    var t = v.splice(_x + 1);
    t.includes(".") ? null : valid = true;
  }

  if (e.key == "Enter" && valid) {
    showEmailError(1);
  }
}

function submitEmail() {
  window.location.reload();
  alert("email Submit");
}

var submit = document.querySelector(".email_btn");
submit.addEventListener("click", function (e) {
  valid ? showEmailError(1) : submitEmail();
});
submit.addEventListener("touchstart", function (e) {
  valid ? showEmailError(1) : submitEmail();
});

function showEmailError(i) {
  var email_error = document.querySelector(".email_error");
  email_error.style.opacity = "".concat(i);
} // animation on computer


var headerBtn = document.querySelector(".header_btn");
var header = document.querySelector(".header");
var headerBtnCopys = [];
var headerBtnCoords = document.querySelector(".header_btn").getBoundingClientRect();
var headerBtnEnter = false;
var mainBtn = document.querySelector(".main_btn");
var body = document.querySelector(".body");
var mainBtnCopys = [];
var mainBtnCoords = document.querySelector(".main_btn").getBoundingClientRect();
var mainBtnEnter = false;
var comments_btn = document.querySelector(".comments_btn");
var comments_btnCopys = [];
var comments_btnCoords = document.querySelector(".comments_btn").getBoundingClientRect();
var comments_btnEnter = false;
var exist = false;
var windowLoad = new Promise(function (resolve) {
  return resolve(window);
});
windowLoad.then(function (resut) {
  if (window.innerWidth > 950) {
    exist = true;
    headerBtnCopy();
    mainBtnCopy();
    comments_btnCopy();
  }
});
window.addEventListener('resize', function (e) {
  return Animation(e);
});

function Animation() {
  if (!exist && window.innerWidth > 950) {
    exist = true;
    headerBtnCopy();
    mainBtnCopy();
    comments_btnCopy();
  }

  if (window.innerWidth > 950 && exist) {
    setBtnCopysPosition(headerBtnCopys, 0, "".concat(document.querySelector(".header_btn").getBoundingClientRect().top, "px"), "".concat(document.querySelector(".header_btn").getBoundingClientRect().left, "px"), "blur(0)", 0, "all 0s ease-in-out");
    setBtnCopysPosition(mainBtnCopys, 0, "".concat(document.querySelector(".main_btn").getBoundingClientRect().top, "px"), "".concat(document.querySelector(".main_btn").getBoundingClientRect().left, "px"), "blur(0)", 0, "all 0s ease-in-out");
    setBtnCopysPosition(comments_btnCopys, 0, "".concat(document.querySelector(".comments_btn").getBoundingClientRect().top, "px"), "".concat(document.querySelector(".comments_btn").getBoundingClientRect().left, "px"), "blur(0)", 0, "all 0s ease-in-out");
  } else if (window.innerWidth < 950) {
    exist = false;
    removeBtnCopys(header, ".headerCopy");
    removeBtnCopys(body, ".mainCopy");
    removeBtnCopys(body, ".comments_btnCopy");
  }
}

;

function removeBtnCopys(p, w) {
  var x = p.querySelectorAll(w);
  x.forEach(function (y) {
    p.removeChild(y);
  });
}

function comments_btnCopy() {
  comments_btnCopys = BtnCopy("comments_btn", "comments_btnCopy", body);
  setBtnCopysPosition(comments_btnCopys, 0, "".concat(document.querySelector(".comments_btn").getBoundingClientRect().top, "px"), "".concat(document.querySelector(".comments_btn").getBoundingClientRect().left, "px"), "blur(0)", 0, "all 0s ease-in-out");
}

function mainBtnCopy() {
  mainBtnCopys = BtnCopy("main_btn", "mainCopy", body);
  setBtnCopysPosition(mainBtnCopys, 0, "".concat(document.querySelector(".main_btn").getBoundingClientRect().top, "px"), "".concat(document.querySelector(".main_btn").getBoundingClientRect().left, "px"), "blur(0)", 0, "all 0s ease-in-out");
}

function headerBtnCopy() {
  headerBtnCopys = BtnCopy("header_btn_copy", "headerCopy", header);
  setBtnCopysPosition(headerBtnCopys, 0, "".concat(document.querySelector(".header_btn").getBoundingClientRect().top, "px"), "".concat(document.querySelector(".header_btn").getBoundingClientRect().left, "px"), "blur(0)", 0, "all 0s ease-in-out");
}

function BtnCopy(cl1, cl2, w) {
  var t1 = "";
  var t2 = "";
  var t3 = "";
  var t4 = "";

  for (var _i2 = 1; _i2 <= 4; _i2++) {
    var d = document.createElement("button");
    d.style.opacity = "0";
    d.classList.add("".concat(cl1));
    d.classList.add("".concat(cl2));
    d.style.position = "absolute";
    d.style.top = '0px';
    d.style.backgroundColor = "hsla(12, 84%, 63%, 0.822)";
    _i2 == 1 ? t1 = d : _i2 == 2 ? t2 = d : _i2 == 3 ? t3 = d : _i2 == 4 ? t4 = d : null;
    w.appendChild(d);
  }

  return [t1, t2, t3, t4];
}

headerBtn.addEventListener('mouseenter', function (e) {
  headerBtnEnter = true;
});
headerBtn.addEventListener('mousemove', function (e) {
  if (headerBtnEnter) {
    BtnHover(e, headerBtnCopys, document.querySelector(".header_btn").getBoundingClientRect());
  }
});
headerBtn.addEventListener('mouseleave', function (e) {
  headerBtnEnter = false;
  setBtnCopysPosition(headerBtnCopys, "all .3s ease-in-out", "".concat(document.querySelector(".header_btn").getBoundingClientRect().top, "px"), "".concat(document.querySelector(".header_btn").getBoundingClientRect().left, "px"), "blur(0)", 0, "all 0s ease-in-out");
});
mainBtn.addEventListener('mouseenter', function (e) {
  mainBtnEnter = true;
});
mainBtn.addEventListener('mousemove', function (e) {
  if (mainBtnEnter) {
    BtnHover(e, mainBtnCopys, document.querySelector(".main_btn").getBoundingClientRect());
  }
});
mainBtn.addEventListener('mouseleave', function (e) {
  mainBtnEnter = false;
  setBtnCopysPosition(mainBtnCopys, "all .3s ease-in-out", "".concat(document.querySelector(".main_btn").getBoundingClientRect().top, "px"), "".concat(document.querySelector(".main_btn").getBoundingClientRect().left, "px"), "blur(0)", 0, "all 0s ease-in-out");
});
comments_btn.addEventListener('mouseenter', function (e) {
  comments_btnEnter = true;
});
comments_btn.addEventListener('mousemove', function (e) {
  if (comments_btnEnter) {
    BtnHover(e, comments_btnCopys, document.querySelector(".comments_btn").getBoundingClientRect());
  }
});
comments_btn.addEventListener('mouseleave', function (e) {
  comments_btnEnter = false;
  setBtnCopysPosition(comments_btnCopys, "all .3s ease-in-out", "".concat(document.querySelector(".comments_btn").getBoundingClientRect().top, "px"), "".concat(document.querySelector(".comments_btn").getBoundingClientRect().left, "px"), "blur(0)", 0, "all 0s ease-in-out");
});

function BtnHover(e, copys, coords) {
  var i = 1;
  copys.map(function (d) {
    d.style.transition = "all 0s ease-in-out";
    var widthLine = 0;
    var heightLine = 0;
    var topx = 0;
    var leftx = 0;
    var opacity = 0;
    var zIndex = 0;
    widthLine = coords.width / 2;
    heightLine = coords.height / 2;
    e.layerY > heightLine ? topx = coords.y - i * ((e.layerY - heightLine) / 7) + window.scrollY : e.layerY == heightLine ? topx = coords.y + window.scrollY : e.layerY < heightLine ? topx = coords.y + i * ((heightLine - e.layerY) / 6.8) + window.scrollY : null;
    e.layerX > widthLine ? leftx = coords.x - i * ((e.layerX - widthLine) / 10) : e.layerX == widthLine ? leftx = coords.x : e.layerX < widthLine ? leftx = coords.x + i * ((widthLine - e.layerX) / 10) : null;
    opacity = 1 - i * 0.22;
    zIndex = i * -1;
    d.style.top = "".concat(topx, "px");
    d.style.left = "".concat(leftx, "px");
    d.style.zIndex = "".concat(zIndex);
    d.style.filter = "blur(.2rem)";
    d.style.opacity = "".concat(opacity);
    i++;
  });
}

function setBtnCopysPosition(copys, t1, top, left, filtr, opacity, t2) {
  copys.forEach(function (d) {
    d.style.transition = "".concat(t1);
    setTimeout(function () {
      d.style.top = "".concat(top, " + ").concat(window.scrollY);
      d.style.left = "".concat(left);
      setTimeout(function () {
        d.style.filter = "".concat(filtr);
        d.style.opacity = "".concat(opacity);
        setTimeout(function () {
          d.style.transition = "".concat(t2);
        }, 300);
      }, 300);
    }, 200);
  });
} // main_intro animation 


var main_intro = document.querySelector(".main_intro");
var main_introCoords = 0;
var main_intro_hover = false;
var atan = 0;
var introLX = 0;
var introLY = 0;
main_intro.addEventListener('mousedown', function (e) {
  main_introCoords = document.querySelector(".main_intro").getBoundingClientRect();
  main_intro.style.touchAction = "none";
  main_intro_hover = true;
  introLX = e.pageX - main_introCoords.width / 2 - main_introCoords.left;
  introLY = e.pageY - main_introCoords.top - main_introCoords.height / 2;
});
main_intro.addEventListener("mousemove", function (e) {
  main_intro_hover ? main_introRotate(e) : null;
});
main_intro.addEventListener('mouseleave', function (e) {
  main_intro_hover = false;
});
main_intro.addEventListener('mouseup', function (e) {
  main_intro_hover = false;
});
main_intro.addEventListener('touchstart', function (e) {
  main_intro_hover = true;
});
main_intro.addEventListener("touchmove", function (e) {
  main_intro_hover ? main_introRotate(e) : null;
});
main_intro.addEventListener('touchcancel', function (e) {
  main_intro_hover = false;
});
main_intro.addEventListener('touchend', function (e) {
  main_intro_hover = false;
}); // main_introRotate();

function main_introRotate(e) {
  var atanPromise = new Promise(function (resolve) {
    resolve(atanC(e));
  });
  atanPromise.then(function (result) {
    atan += result;
    document.querySelector(".main_intro").style.transform = "rotate(".concat(atan / Math.PI * 180, "deg)");
  });
}

function atanC(e) {
  var pos = posC(e);
  return Math.atan2(pos[1], pos[0]) - Math.atan2(pos[3], pos[2]);
}

function posC(e) {
  var x = e.pageX - main_introCoords.width / 2 - main_introCoords.left;
  var y = e.pageY - main_introCoords.top - main_introCoords.height / 2;
  ;
  var r = [x, y, introLX, introLY];
  introLX = x;
  introLY = y;
  return r;
} // curtain remove


window.addEventListener("load", function (e) {
  var curtain = new Promise(function (resolve) {
    if (document.readyState) {
      setMainAnimation();
      setHeaderAnimation();
      resolve(document.readyState);
    }
  });
  curtain.then(function (result) {
    setTimeout(function () {
      document.querySelector('.curtain').style.opacity = "0";
      document.querySelector('.curtain').style.zIndex = "-1000000000";
      resolve(document.querySelector('.curtain'));
    }, 500);
  });
}); // header animation

function setHeaderAnimation() {
  var header_logo = document.querySelector(".header_logo");
  var nav_p = document.querySelectorAll(".nav_p");
  var header_btn = document.querySelector('.header_btn');
  var hide = new Promise(function (resolve) {
    resolve(hideHeader(header_logo, nav_p, header_btn));
  });
  hide.then(function (result) {
    setTimeout(function () {
      showHeader(header_logo, nav_p, header_btn);
    }, 800);
  });
}

function hideHeader(header_logo, nav_p, header_btn) {
  header_logo.style.transform = "translateY(-50vw)";
  header_logo.style.transition = ".5s";
  nav_p.forEach(function (p) {
    p.style.transform = "translateY(-50vw)";
    p.style.transition = ".5s";
  });
  header_btn.style.transform = "translateY(-50vw)";
  header_btn.style.transition = ".5s";
}

function showHeader(header_logo, nav_p, header_btn) {
  header_logo.style.transform = "translateY(0vw)";
  setTimeout(function () {
    nav_p.forEach(function (p, b) {
      return setTimeout(function () {
        p.style.transform = "translateY(0vw)";
        setTimeout(function () {
          p.style.transition = "0s";
        }, 500);
      }, 50 * (b + 1));
    });
    setTimeout(function () {
      header_btn.style.transform = "translateY(0vw)";
      setTimeout(function () {
        header_btn.style.transition = "0s";
      }, 500);
    }, 500);
  }, 50);
  setTimeout(function () {
    header_logo.style.transition = "0s";
  }, 500);
} // main animation 


function setMainAnimation() {
  var main_left = document.querySelector(".main_left");
  var main_right = document.querySelector(".main_right");
  var MLH = document.querySelector(".MLH");
  var MLP = document.querySelector(".MLP");
  var MLB = document.querySelector(".main_btn");
  var MRI = document.querySelector(".main_intro");
  var main = new Promise(function (resolve) {
    resolve(hideMain(main_left, main_right, MLH, MLP, MLB, MRI));
  });
  main.then(function (result) {
    setTimeout(function () {
      showMain(main_left, main_right, MLH, MLP, MLB, MRI);
    }, 1800);
  });
}

function hideMain(main_left, main_right, MLH, MLP, MLB, MRI) {
  main_left.style.overflow = "hidden";
  main_right.style.overflow = "hidden";
  MLH.style.transform = "translateX(50vw)";
  MLP.style.transform = "translateX(50vw)";
  MLB.style.transform = "translateX(50vw)";
  MLH.style.transition = ".5s";
  MLP.style.transition = ".5s";
  MLB.style.transition = ".5s";
  MRI.style.transform = "rotate(500deg) translate(-50vw,0)";
  MRI.style.transition = ".5s";
}

function showMain(main_left, main_right, MLH, MLP, MLB, MRI) {
  // main_right.style.overflow = "hidden";
  setTimeout(function () {
    MLH.style.transform = "translateX(00vw)";
    setTimeout(function () {
      MLP.style.transform = "translateX(0vw)";
      setTimeout(function () {
        MLB.style.transform = "translateX(0vw)";
        setTimeout(function () {
          main_left.style.overflow = "visible";
        }, 400);
        setTimeout(function () {
          MLH.style.transition = "0s";
          MLP.style.transition = "0s";
          MLB.style.transition = "0s";
        }, 500);
      }, 20);
    }, 80);
  }, 0);
  MRI.style.transform = "rotate(500deg) translate(-50vw,0)";
  MRI.style.transition = ".5s";
}