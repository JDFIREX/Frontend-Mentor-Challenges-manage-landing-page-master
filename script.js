const header_humb = document.querySelector('.header_humb');
let openNav = false;
const humbScr = "images/icon-hamburger.svg";
const closeScr = "images/icon-close.svg";
const Opacity = [0,1];
const nav  = document.querySelector(".nav")
const nav_p = document.querySelectorAll(".nav_p")

function header_humb_animation(header_humb,s,o,c){
    header_humb.style.pointerEvents = "none";
    header_humb.style.opacity = o[0];
    setTimeout(() => {
        header_humb.src = s;
        if(c == "close"){
            header_humb.style.position = "fixed";
            if(window.innerWidth > 600){
                header_humb.style.top = "2.2rem";
                if(c == "close"){
                    header_humb.style.transform  = `translateX(calc(100vw - 17.5vw))`
                }
            }else{
                header_humb.style.top = "3rem";
                header_humb.style.right = "5vw";
                header_humb.style.transform  = `translateX(calc(100vw - 13vw))`
            }  
        }else {
            header_humb.style.position = "relative";
            header_humb.style.top = "-.4vw";
            header_humb.style.transform  = `translateX(0)`
        }
        setTimeout(() => {
            header_humb.style.opacity = o[1];
            setTimeout(() => {
                header_humb.style.pointerEvents = "all";
            }, 100);
        }, 100);
    }, 300);
}
function navAnimationOpen(nav,nav_p){
    nav.style.top = "8rem";
        setTimeout(() => {
            nav.style.opacity = "1";
            setTimeout(() => {
                nav_p.forEach( i => i.style.transform = "translateX(0%)")
                nav.style.boxShadow = "6px 110px 128px 160px rgba(0,0,0,0.62)";
                setTimeout(() => {
                    nav_p.forEach( i => i.style.opacity = "1");
                }, 150);
            }, 200);
        }, 300);
}
function navAnimationClose(nav,nav_p){
    nav_p.forEach( i => i.style.opacity = "0");
        setTimeout(() => {
            nav_p.forEach( i => i.style.transform = "translateX(300%)")
            nav.style.boxShadow = "none";
            setTimeout(() => {
                nav.style.opacity = "0";
                setTimeout(() => {
                    nav.style.top = "-100rem";
                }, 50);
            }, 100);
        }, 150);
}

function header_humb_change_promise(){
    let header_humb_change = new Promise((resolve) => {
        resolve(openNav)
            if(openNav == false){
                openNav = true;
                header_humb_animation(header_humb,closeScr,Opacity,"close")
            }else{
                openNav = false;
                header_humb_animation(header_humb,humbScr,Opacity,"open")
            }
    });
    header_humb_change.then((c) => {
        if(c == false){
            c = true;
                navAnimationOpen(nav,nav_p);
        }else{
            c = false;
                navAnimationClose(nav,nav_p);
        } 
    })
}
header_humb.addEventListener("click", (e) => {
    header_humb_change_promise();
})
window.addEventListener("keydown",(e) => {
    if(e.key == "Escape" && openNav){
        header_humb_change_promise();
    }
})


//  slider 

const comments_list = document.querySelector(".comments_list");
let comments_item = document.querySelectorAll(".comments_item");

class commentsPerson{
    constructor(ID,Profile,Name,FullName,p){
        this.ID = ID;
        this.Profile = Profile;
        this.Name = Name;
        this.FullName = FullName;
        this.p = p;
    }
}

const Anisha = new commentsPerson("1","images/avatar-anisha.png","Anisha","Anisha Li","“Manage has supercharged our team’s workflow. The ability to maintain visibility on larger milestones at all times keeps everyone motivated.”")
const Ali = new commentsPerson("2","images/avatar-ali.png","Ali","Ali Bravo","“We have been able to cancel so many other subscriptions since using Manage. There is no more cross-channel confusion and everyone is much more focused.”")
const Richard = new commentsPerson("3","images/avatar-richard.png","Richard","Richard Watts","“Manage allows us to provide structure and process. It keeps us organized  and focused. I can’t stop recommending them to everyone I talk to!”") 
const Shanai =  new commentsPerson("4","images/avatar-shanai.png","Shanai","Shanai Gough","“Their software allows us to track, manage and collaborate on our projects from anywhere. It keeps the whole team in-sync without being intrusive.”")
let list = [Shanai,Anisha,Ali,Richard,Shanai]

for(let i = 0; i < 5; i++){
    addPerson(i)
}
function addPerson(i){
    let comments_item_div = document.createElement("div");
    comments_item_div.classList.add("comments_item");
    comments_item_div.classList.add("background_vary_light_gray");
    comments_item_div.dataset.ID = list[i].ID;
    comments_item_div.innerHTML = `
    <img class="comments_profil" src=${list[i].Profile} alt=${list[i].Name} data-id=${list[i].ID}>
    <h1 class="color_dark_blue">${list[i].FullName}</h1>
    <p class="color_dark_grayish_blue">${list[i].p}</p>
    `;
     return comments_list.appendChild(comments_item_div);
}


let isDown = false;
let lastX = 0;
let x = 0;
let side = "";

setPosition();

comments_list.addEventListener("mousedown", (e) => {
    lastX = e.x;
    lastX2 = e.x;
    isDown = true;
})
comments_list.addEventListener("mousemove", (e) =>{
    if(isDown){
        slider(e)
    }
})
comments_list.addEventListener("mouseup", (e)=>{
    isDown = false;
})
comments_list.addEventListener("mouseleave", (e) => {
    isDown = false;
})

comments_list.addEventListener("touchstart", (e) => {
    lastX = e.targetTouches[0].screenX;
    lastX2 = e.targetTouches[0].screenX;
    isDown = true;
})
comments_list.addEventListener("touchmove", (e) =>{
    if(isDown){
        slider(e)
    }
})
comments_list.addEventListener("touchend", (e)=>{
    isDown = false;
})
comments_list.addEventListener("touchcancel", (e) => {
    isDown = false;
})


function slider(e){
    sliderMove(e);
    setPosition()
    let boxWidth = 0;
    let cords = comments_list.getBoundingClientRect()
    window.innerWidth > 600 ? boxWidth = 576: boxWidth = (window.innerWidth / 100) * 96;
    (cords.left * - 1) < (boxWidth) ? leftSideSlider(boxWidth) : cords.right < ((boxWidth) + window.innerWidth) ? rightSideSlider(boxWidth) : null;
}
function sliderMove(e){
    if(e.targetTouches){
        x += e.targetTouches[0].screenX - lastX;
        e.targetTouches[0].screenX < lastX ? side = "left" : e.targetTouches[0].screenX > lastX ? side = "right": null ;
        lastX = e.targetTouches[0].screenX;
    }else if(e.x){
        x += e.x - lastX;
        e.x > lastX ? side = "left" : e.x < lastX ? side = "right": null ;
        lastX = e.x;
    }
    comments_list.style.left = `${x}` + "px";
}
function leftSideSlider(boxWidth){
    comments_list.removeChild(comments_list.lastChild)
    comments_list.children[0].parentNode.insertBefore(addPerson(comments_list.lastChild.dataset.ID),comments_list.children[0]);
    x -= boxWidth;
    comments_list.style.left = `${x}` + "px";
}
function rightSideSlider(boxWidth){
    comments_list.removeChild(comments_list.children[0])
    comments_list.appendChild(addPerson(comments_list.children[0].dataset.ID));
    x += boxWidth;
    comments_list.style.left = `${x}` + "px";
}

function setPosition(){
    let comments_slider_positions = document.querySelector(".comments_slider_positions");
    let m = comments_list.children[2].dataset.ID;
    m == 4 ? m = 0: null;
    for(let i = 0; i < 4; i++){
        comments_slider_positions.children[i].style.backgroundColor = "hsl(0, 0%, 98%)";
    }
    comments_slider_positions.children[m].style.backgroundColor = "hsl(12, 88%, 59%)";
}







//  email check

let input_email = document.querySelector(".input_email");
let valid  = true;
input_email.addEventListener("keydown" ,(e) => checkEmail(e))
input_email.addEventListener("change" ,(e) => checkEmail(e))

function checkEmail(e){
    valid = false;
    showEmailError(0)
    let v = e.target.value + e.key;
    // include @
    v.includes("@") ? null : valid = true;
    // include more than one @;
    v = v.split("");
    v.filter( a => a == "@").length > 1 ? valid = true : null
    // check if after @ include .
    if(!valid){
        let x = v.indexOf("@");
        let t = v.splice(x + 1);
        t.includes(".") ? null : valid = true;
    }
    if(e.key == "Enter" && valid){
        showEmailError(1)
    }
}
function submitEmail(){
    window.location.reload()
    alert("email Submit")
}

let submit = document.querySelector(".email_btn");

submit.addEventListener("click", (e) => {
    valid ? showEmailError(1) : submitEmail();
})
submit.addEventListener("touchstart", (e) => {
    valid ? showEmailError(1) : submitEmail();
})

function showEmailError(i){
    let email_error = document.querySelector(".email_error");
    email_error.style.opacity = `${i}`;
}


// animation on computer


let headerBtn = document.querySelector(".header_btn"); 
let header = document.querySelector(".header");
let headerBtnCopys = [];
let headerBtnCoords = document.querySelector(".header_btn").getBoundingClientRect();
let headerBtnEnter = false;

let mainBtn = document.querySelector(".main_btn"); 
let body = document.querySelector(".body")
let mainBtnCopys = [];
let mainBtnCoords = document.querySelector(".main_btn").getBoundingClientRect();
let mainBtnEnter = false;

let comments_btn = document.querySelector(".comments_btn"); 
let comments_btnCopys = [];
let comments_btnCoords = document.querySelector(".comments_btn").getBoundingClientRect();
let comments_btnEnter = false;



let exist = false;

let windowLoad = new Promise((resolve) =>{
    return resolve(window);
})
windowLoad.then(resut => {
    if(window.innerWidth > 950){
        exist = true;
        headerBtnCopy()
        mainBtnCopy()
        comments_btnCopy()
    }
})

window.addEventListener('resize', (e) => Animation(e))

function Animation(){
    if(!exist && window.innerWidth > 950){
        exist = true;
        headerBtnCopy()
        mainBtnCopy()
        comments_btnCopy()
    }
    if(window.innerWidth > 950 && exist){
        setBtnCopysPosition(headerBtnCopys,0,`${document.querySelector(".header_btn").getBoundingClientRect().top}px`,`${document.querySelector(".header_btn").getBoundingClientRect().left}px`,"blur(0)",0,"all 0s ease-in-out");
        setBtnCopysPosition(mainBtnCopys,0,`${document.querySelector(".main_btn").getBoundingClientRect().top}px`,`${document.querySelector(".main_btn").getBoundingClientRect().left}px`,"blur(0)",0,"all 0s ease-in-out")
        setBtnCopysPosition(comments_btnCopys,0,`${document.querySelector(".comments_btn").getBoundingClientRect().top}px`,`${document.querySelector(".comments_btn").getBoundingClientRect().left}px`,"blur(0)",0,"all 0s ease-in-out")
    }else if(window.innerWidth < 950){
        exist = false;
        removeBtnCopys(header,".headerCopy")
        removeBtnCopys(body,".mainCopy")
        removeBtnCopys(body,".comments_btnCopy")
    }
}; 
function removeBtnCopys(p,w){
    let x = p.querySelectorAll(w);
    x.forEach( y => {
        p.removeChild(y);
    })
}
function comments_btnCopy(){
    comments_btnCopys = BtnCopy("comments_btn","comments_btnCopy",body);
    setBtnCopysPosition(comments_btnCopys,0,`${document.querySelector(".comments_btn").getBoundingClientRect().top}px`,`${document.querySelector(".comments_btn").getBoundingClientRect().left}px`,"blur(0)",0,"all 0s ease-in-out")
}
function mainBtnCopy(){
    mainBtnCopys = BtnCopy("main_btn","mainCopy",body);
    setBtnCopysPosition(mainBtnCopys,0,`${document.querySelector(".main_btn").getBoundingClientRect().top}px`,`${document.querySelector(".main_btn").getBoundingClientRect().left}px`,"blur(0)",0,"all 0s ease-in-out")
}
function headerBtnCopy(){
    headerBtnCopys = BtnCopy("header_btn_copy","headerCopy",header);
    setBtnCopysPosition(headerBtnCopys,0,`${document.querySelector(".header_btn").getBoundingClientRect().top}px`,`${document.querySelector(".header_btn").getBoundingClientRect().left}px`,"blur(0)",0,"all 0s ease-in-out");
}
function BtnCopy(cl1,cl2,w){
    let t1 = "";
    let t2 = "";
    let t3 = "";
    let t4 = "";
    for(let i = 1; i <= 4; i++){
        let d = document.createElement("button");
        d.style.opacity = "0"
        d.classList.add(`${cl1}`);
        d.classList.add(`${cl2}`);
        d.style.position = "absolute";
        d.style.top = '0px';
        d.style.backgroundColor = "hsla(12, 84%, 63%, 0.822)";
        i == 1 ? t1 = d : i == 2 ? t2 = d: i == 3 ? t3 = d: i == 4 ? t4 = d: null;
        w.appendChild(d);
    }
    return [t1,t2,t3,t4];
}




headerBtn.addEventListener('mouseenter', (e) => {
    headerBtnEnter = true;
});
headerBtn.addEventListener('mousemove', (e) => {
    if(headerBtnEnter){
        BtnHover(e,headerBtnCopys,document.querySelector(".header_btn").getBoundingClientRect())
    }
});
headerBtn.addEventListener('mouseleave', (e) => {
    headerBtnEnter = false;
    setBtnCopysPosition(headerBtnCopys,"all .3s ease-in-out",`${document.querySelector(".header_btn").getBoundingClientRect().top}px`,`${document.querySelector(".header_btn").getBoundingClientRect().left}px`,"blur(0)",0,"all 0s ease-in-out");
});


mainBtn.addEventListener('mouseenter', (e) => {
    mainBtnEnter = true;
});
mainBtn.addEventListener('mousemove', (e) => {
    if(mainBtnEnter){
        BtnHover(e,mainBtnCopys,document.querySelector(".main_btn").getBoundingClientRect())
    }
});
mainBtn.addEventListener('mouseleave', (e) => {
    mainBtnEnter = false;
    setBtnCopysPosition(mainBtnCopys,"all .3s ease-in-out",`${document.querySelector(".main_btn").getBoundingClientRect().top}px`,`${document.querySelector(".main_btn").getBoundingClientRect().left}px`,"blur(0)",0,"all 0s ease-in-out")
});


comments_btn.addEventListener('mouseenter', (e) => {
    comments_btnEnter = true;
});
comments_btn.addEventListener('mousemove', (e) => {
    if(comments_btnEnter){
        BtnHover(e,comments_btnCopys,document.querySelector(".comments_btn").getBoundingClientRect())
    }
});
comments_btn.addEventListener('mouseleave', (e) => {
    comments_btnEnter = false;
    setBtnCopysPosition(comments_btnCopys,"all .3s ease-in-out",`${document.querySelector(".comments_btn").getBoundingClientRect().top}px`,`${document.querySelector(".comments_btn").getBoundingClientRect().left}px`,"blur(0)",0,"all 0s ease-in-out")
});


function BtnHover(e,copys,coords){
    let i = 1;
    copys.map( d => {
        d.style.transition = "all 0s ease-in-out"
        let widthLine = 0;
        let heightLine = 0;
        let topx = 0;
        let leftx = 0;
        let opacity = 0;
        let zIndex = 0;
        widthLine = coords.width / 2;
        heightLine = coords.height / 2;

        e.layerY > heightLine ? topx = coords.y - (i * ((e.layerY - heightLine) / 7)) + window.scrollY : e.layerY == heightLine ?
        topx = coords.y + window.scrollY: e.layerY < heightLine ? topx = coords.y + (i * ((heightLine - e.layerY) / 6.8)) + window.scrollY : null;

        e.layerX > widthLine ? leftx = coords.x - (i * ((e.layerX - widthLine) / 10)) : e.layerX == widthLine ? 
        leftx = coords.x : e.layerX < widthLine ? leftx = coords.x + (i * ((widthLine - e.layerX) / 10)) : null;

        opacity = 1 - (i * 0.22);
        zIndex = i * -1;

        d.style.top = `${topx}px`;
        d.style.left = `${leftx}px`;
        d.style.zIndex = `${zIndex}`;
        d.style.filter = "blur(.2rem)";
        d.style.opacity = `${opacity}`;
        i++
    })
}
function setBtnCopysPosition(copys,t1,top,left,filtr,opacity,t2){
    copys.forEach( d => {
        d.style.transition = `${t1}`;
        setTimeout(() => {
            d.style.top = `${top} + ${window.scrollY}`;
            d.style.left = `${left}`;
            setTimeout(() => {
                d.style.filter = `${filtr}`;
                d.style.opacity = `${opacity}`;
                setTimeout(() => {
                    d.style.transition = `${t2}`;
                }, 300);
            }, 300);
        }, 200);
    })
}




// main_intro animation 

let main_intro = document.querySelector(".main_intro");
let main_introCoords = 0;
let main_intro_hover = false;
let atan = 0;
let introLX = 0;
let introLY = 0;

main_intro.addEventListener('mousedown' ,(e) => {
    main_introCoords = document.querySelector(".main_intro").getBoundingClientRect();
    main_intro.style.touchAction = "none";
    main_intro_hover = true;
    introLX = e.pageX - (main_introCoords.width / 2) - main_introCoords.left;
    introLY = e.pageY - main_introCoords.top - (main_introCoords.height / 2);
})
main_intro.addEventListener("mousemove", (e) => {
    main_intro_hover ?  main_introRotate(e) : null;
})
main_intro.addEventListener('mouseleave', (e) => {
    main_intro_hover = false;
})
main_intro.addEventListener('mouseup', (e) => {
    main_intro_hover = false;
})

main_intro.addEventListener('touchstart' ,(e) => {
    main_introCoords = document.querySelector(".main_intro").getBoundingClientRect();
    main_intro.style.touchAction = "none";
    main_intro_hover = true;
    introLX = e.targetTouches[0].pageX - (main_introCoords.width / 2) - main_introCoords.left;
    introLY = e.targetTouches[0].pageY - main_introCoords.top - (main_introCoords.height / 2);
})
main_intro.addEventListener("touchmove", (e) => {
    main_intro_hover ?  main_introRotate(e) : null;
})
main_intro.addEventListener('touchcancel', (e) => {
    main_intro_hover = false;
})
main_intro.addEventListener('touchend', (e) => {
    main_intro_hover = false;
})
// main_introRotate();

function main_introRotate(e){
    let atanPromise = new Promise( resolve => {
        resolve(atanC(e))
    })
    atanPromise.then(result => {
        atan += result;
        document.querySelector(".main_intro").style.transform = `rotate(${(atan / Math.PI )* 180}deg)`
    })
}
function atanC(e){
    let pos = posC(e)
    return (Math.atan2(pos[1],pos[0]) - Math.atan2(pos[3],pos[2]));
}
function posC(e){
    let x;let y;
    if(e.targetTouches){
        x = e.targetTouches[0].pageX - (main_introCoords.width / 2) - main_introCoords.left;
        y = e.targetTouches[0].pageY - main_introCoords.top - (main_introCoords.height / 2);;
    }else{
        x = e.pageX - (main_introCoords.width / 2) - main_introCoords.left;
        y = e.pageY - main_introCoords.top - (main_introCoords.height / 2);;
    }
    let r = [x,y,introLX,introLY];
    introLX = x;
    introLY = y;
    return r;
}





// curtain remove

window.addEventListener("load", (e) => {
    let curtain = new Promise ( resolve => {
        if(document.readyState){
            setMainAnimation(1500);
            setHeaderAnimation()
            setManageAnimation()
            setCommentsAnimation()
            resolve(document.readyState)
        }
    })
    curtain.then(result => {
        setTimeout(() => {
            document.querySelector('.curtain').style.opacity = "0";
            document.querySelector('.curtain').style.zIndex = "-1000000000";
            document.querySelector(".body").style.overflow = "visible"
        }, 500);
    })
    
})

// header animation

function setHeaderAnimation(){
    let header_logo = document.querySelector(".header_logo");
    let nav_p = document.querySelectorAll(".nav_p");
    let header_btn = document.querySelector('.header_btn');
    let headerHumb = document.querySelector('.header_humb');

    let hide  = new Promise( resolve => {
        resolve(hideHeader(header_logo,nav_p,header_btn,headerHumb))
    })
    hide.then(result => {
        setTimeout(() => {
            showHeader(header_logo,nav_p,header_btn,headerHumb)
        }, 800);
    })
}

function hideHeader(header_logo,nav_p,header_btn,headerHumb){
    let transition = new Promise( resolve => {
        header_logo.style.transition = "0s"
        nav_p.forEach(p => {
            p.style.transition = "0s"
        })
        header_btn.style.transition = "0s"
        headerHumb.style.transition = "0s"
        resolve(header_btn)
    })
    transition.then(result => {
        setTimeout(() => {
            header_logo.style.transform = "translateY(-50vw)";
            nav_p.forEach(p => {
                p.style.transform = "translateY(-50vw)";
            })
            header_btn.style.transform = "translateY(-50vw)";
            headerHumb.style.transform = "translateY(-50vw)";
        }, 50);
    })
}

function showHeader(header_logo,nav_p,header_btn,headerHumb){
    header_btn.style.transition = ".5s"
    header_logo.style.transition = ".5s"
    nav_p.forEach(p => {
        p.style.transition = ".5s";
    })
    headerHumb.style.transition = ".5s";

    setTimeout(() => {
        header_logo.style.transform = "translateY(0vw)";
        setTimeout(() => {
            nav_p.forEach( (p,b) => setTimeout(() => {
                p.style.transform = "translateY(0vw)";
                setTimeout(() => {
                    p.style.transition = "0s"
                }, 50);
            }, (80 * (b + 1))))
            setTimeout(() => {
                header_btn.style.transform = "translateY(0vw)";
                headerHumb.style.transform = "translateY(0vw";
                setTimeout(() => {
                    header_btn.style.transition = "0s";
                    headerHumb.style.transition = "0s"
                }, 50);
            }, 500);
        }, 50);
    }, 100);

    setTimeout(() => {
        header_logo.style.transition = "0s"
    }, 200);
}



// main animation 

function setMainAnimation(b){
    let main_left = document.querySelector(".main_left");
    let main_right = document.querySelector(".main_right");
    let MLH = document.querySelector(".MLH");
    let MLP = document.querySelector(".MLP");
    let MLB = document.querySelector(".main_btn");
    let MRI = document.querySelector(".main_intro");

    let main = new Promise(resolve => {
        resolve(hideMain(main_left,main_right,MLH,MLP,MLB,MRI))
    })
    main.then(result => {
        setTimeout(() => {
            showMain(main_left,main_right,MLH,MLP,MLB,MRI);
        }, b);
    })
}
function hideMain(main_left,main_right,MLH,MLP,MLB,MRI){
    MLH.style.transition = "0s";
    MLP.style.transition = "0s";
    MLB.style.transition = "0s";
    MRI.style.transition = "0s";

        main_left.style.overflow = "hidden";
        main_right.style.overflow = "hidden";
    
        MLH.style.transform = "translateX(100vw)";
        MLP.style.transform = "translateX(100vw)";
        MLB.style.transform = "translateX(100vw)";
    
        MRI.style.left = "100vw";
        MRI.style.transform = "rotate(180deg)"
}

function showMain(main_left,main_right,MLH,MLP,MLB,MRI){
    MLH.style.transition = ".5s";
    MLP.style.transition = ".5s";
    MLB.style.transition = ".5s";
    MRI.style.transition = ".5s";

    setTimeout(() => {
        MLH.style.transform = "translateX(00vw)";
        setTimeout(() => {
            MLP.style.transform = "translateX(0vw)";
            MRI.style.left = "0";
            setTimeout(() => {
                MRI.style.transform = "rotate(0deg)";
                MLB.style.transform = "translateX(0vw)";
                setTimeout(() => {
                    main_left.style.overflow = "visible";
                    main_right.style.overflow = "visible";
                }, 400);
                setTimeout(() => {
                    MLH.style.transition = "0s";
                    MLP.style.transition = "0s";
                    MLB.style.transition = "0s";
                    MRI.style.transition = "0s";
                }, 200);
            }, 20);
        }, 60);
    }, 100);

}


// manage animation

function setManageAnimation(){

    let manage = document.querySelector('.manage')
    let manage_left = document.querySelector(".manage_left");
    let manage_right = document.querySelector(".manage_right")
    let MGLH = document.querySelector(".MGLH");
    let MGLP = document.querySelector('.MGLP') 
    let MGRI = document.querySelectorAll(".manage_item");

    let manageAnimation = new Promise(resolve => {
        resolve(hideManage(manage_left,manage_right,MGLH,MGLP,MGRI))
    })
    manageAnimation.then(result => {
        if(window.innerWidth > 950){
            if((window.scrollY + window.innerHeight) > (manage.offsetTop  - (manage_right.getBoundingClientRect().height / 3))){
                if((window.scrollY + window.innerHeight) > (manage.offsetTop + (manage_right.getBoundingClientRect().height))){
                    setMainAnimation(1200)
                    setTimeout(() => {
                        showManage(manage_left,manage_right,MGLH,MGLP,MGRI);
                    }, 1000);
                }else {
                    setMainAnimation(1800)
                    setTimeout(() => {
                        showManage(manage_left,manage_right,MGLH,MGLP,MGRI);
                    }, 1800);
                }
            }
        }else if(window.innerWidth < 950){
            if(window.scrollY > (manage.offsetTop - (manage_left.getBoundingClientRect().height * 2.5))){
                setTimeout(() => {
                    showManageLeft(manage_left,manage_right,MGLH,MGLP,MGRI);
                    setMainAnimation(00)
                }, 700);
            }
            if(window.scrollY > (manage_right.offsetTop + (manage_right.getBoundingClientRect().height / 1.5))){
                setTimeout(() => {
                    showManageRight(manage_left,manage_right,MGLH,MGLP,MGRI);
                    setMainAnimation(00)
                }, 900);
            }
        }
        window.addEventListener("scroll", (e) => {
            if(window.innerWidth > 950){
                if((window.scrollY + window.innerHeight) > (manage.offsetTop + (manage_left.getBoundingClientRect().height / 1.40))){
                    setTimeout(() => {
                        showManage(manage_left,manage_right,MGLH,MGLP,MGRI)
                    }, 100);
                }
            }else if(window.innerWidth < 950){
                if(window.scrollY > (manage.offsetTop - (manage_left.getBoundingClientRect().height * 2))){
                    setTimeout(() => {
                        showManageLeft(manage_left,manage_right,MGLH,MGLP,MGRI)
                    }, 100);
                }
                if(window.scrollY > (manage_right.offsetTop + (manage_right.getBoundingClientRect().height * 1))){
                    setTimeout(() => {
                        showManageRight(manage_left,manage_right,MGLH,MGLP,MGRI)
                    }, 100);
                }
            }
        })
    })

}
function hideManage(manage_left,manage_right,MGLH,MGLP,MGRI){
    manage_left.style.overflow  = "hidden";
    manage_right.style.overflow = "hidden";

    MGLH.style.transform = "translateY(-100vw)";
    MGLP.style.transform = "translateX(-100vw)";
    MGLP.style.transition = ".5s";
    MGLH.style.transition = ".5s";

    MGRI.forEach( M => {
        M.style.transform = "translateY(300vh)";
        M.style.transition = ".5s";
    })
}
function showManage(manage_left,manage_right,MGLH,MGLP,MGRI){
    MGLH.style.transform = "translateY(0vw)";
    MGLP.style.transform = "translateX(0vw)";

    MGRI.forEach( (M,b) => {
        setTimeout(() => {
            M.style.transform = "translateY(0vh)";
            setTimeout(() => {
                M.style.transition = "0s";
            }, 500);
        }, (150 * b));
    })
    setTimeout(() => {
        MGLP.style.transition = "0s";
        MGLH.style.transition = "0s";
        manage_left.style.overflow  = "visible";
        manage_right.style.overflow = "visible";
    }, 600);
}
function showManageLeft(manage_left,manage_right,MGLH,MGLP,MGRI){
    MGLH.style.transform = "translateY(0vw)";
    MGLP.style.transform = "translateX(0vw)";
    setTimeout(() => {
        MGLP.style.transition = "0s";
        MGLH.style.transition = "0s";
        manage_left.style.overflow  = "visible";
    }, 600);
}
function showManageRight(manage_left,manage_right,MGLH,MGLP,MGRI){
    MGRI.forEach( (M,b) => {
        setTimeout(() => {
            M.style.transform = "translateY(0vh)";
            setTimeout(() => {
                M.style.transition = "0s";
            }, 500);
        }, (150 * b));
    })
    setTimeout(() => {
        manage_right.style.overflow = "visible";
    }, 600);
}


//  comments animation

function setCommentsAnimation(){

    let comments = document.querySelector(".comments");
    let commentsHeader = document.querySelector(".comments_header");
    let commentsItems = document.querySelectorAll(".comments_item");
    let commentsBtn  = document.querySelector(".comments_btn");
    let commentsPositions = document.querySelector(".comments_slider_positions")

    let commentsHide = new Promise(resolve => {
        resolve(hideComments(comments,commentsHeader,commentsItems,commentsBtn,commentsPositions));
    })
    commentsHide.then(result => {
        if(window.scrollY > (comments.offsetTop - (commentsHeader.getBoundingClientRect().height * 16))){
            setTimeout(() => {
                showComments(comments,commentsHeader,commentsItems,commentsBtn,commentsPositions);
            }, 1500);
        }
        window.addEventListener('scroll', (e) => {
            if(window.scrollY > (comments.offsetTop - (commentsHeader.getBoundingClientRect().height * 13))){
                setTimeout(() => {
                    showComments(comments,commentsHeader,commentsItems,commentsBtn,commentsPositions);
                }, 200);
            }
        })
    })
}

function hideComments(comments,commentsHeader,commentsItems,commentsBtn,commentsPositions){

        commentsHeader.style.transition = "0s";
        commentsItems.forEach( I => I.style.transition = "0s");
        commentsBtn.style.transition = "0s"
        commentsPositions.style.transition = "0s";
        commentsHeader.style.transform = "translateX(-150vw)";
        commentsItems.forEach( I => {
            I.style.transform = "translateX(-300vw)";
        })
        commentsBtn.style.transform = "translateX(-150vw)";
        commentsPositions.style.transform = "translateX(-150vw)";
}

function showComments(comments,commentsHeader,commentsItems,commentsBtn,commentsPositions){
    let setTransition = new Promise( resolve => {
        commentsHeader.style.transition = ".5s";
        commentsItems.forEach( I => I.style.transition = ".5s");
        commentsBtn.style.transition = ".5s";
        commentsPositions.style.transition = ".5s";
        resolve(commentsBtn)
    })
    setTransition.then(result => {
        setTimeout(() => {
            commentsHeader.style.transform = "translateX(0vw)";
            setTimeout(() => {
                commentsHeader.style.transition = "0s";
            }, 400);
            setTimeout(() => {
                commentsItems.forEach( (I,b) => {
                    setTimeout(() => {
                        I.style.transform = "translateX(0vw)";
                        setTimeout(() => {
                            I.style.transition = "0s"
                        }, 100);
                    }, (120 * b));
                })
                setTimeout(() => {
                    commentsBtn.style.transform = "translateX(0vw)";
                    commentsPositions.style.transform = "translateX(0vw)";
                    setTimeout(() => {
                        commentsBtn.style.transition = "0s";
                        commentsPositions.style.transition = "0s";
                    }, 400);
                }, 120);
            }, 50);
        }, 50);
    })
}