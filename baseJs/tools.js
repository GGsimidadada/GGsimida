
//获取元素ID
function $id(elemID) {
    return document.getElementById(elemID)
}



//动画函数          元素ID     目标值（对象)  速度
function animation(DOMElement, target, speed) {
    var elem = DOMElement, step, current, goal, unit, k, toggle;
    var o = {};
    for (k in target) {
        o[k] = false;
    }
    runAnimation();
    function runAnimation () {
        if (elem.timer) clearTimeout(elem.timer);
        //动画函数开关，所有目标达成后退出
        toggle = true;
        for (k in o) {
            if (o[k] === false) {
                toggle = false;
                break;
            }
        }
        if (toggle) {
            o = null;
            return true;
        }
        for (k in target) {
            if (o[k] === true) continue;
            //获取元素当前的css样式
            current = getStyle(elem, null)[k].match(/^[0-9]+(\.[0-9]+)?/g)[0] - 0;
            goal = target[k].match(/^[0-9]+(\.[0-9]+)?/g)[0] - 0;
            if (current === goal) {
                o[k] = true;
                continue;
            }
            if (typeof target[k] === "string") {
                unit = target[k].match(/[a-z]+|\%/g);
            }
            if (k === "opacity") {
                current *= 100;
                goal *= 100;
            } else {
                current === null ? current = 0 : current;
            }
            if (goal - current > 0) step = Math.ceil((goal - current) / 10);
            if (goal - current < 0) step = Math.floor((goal - current) / 10);
            current += step;
            if (k === "opacity") {
                elem.style[k] = current / 100;
            }
            else {
                elem.style[k] = current + unit;
            }
        }
        elem.timer = setTimeout(function () {
            runAnimation();
        }, speed)
    }
}

//获取css样式
function getStyle(elem, pseudo) {
    //非IE
    if (document.defaultView.getComputedStyle) {
        return document.defaultView.getComputedStyle(elem, pseudo)
    } else {
        //IE
        return elem.currentStyle;
    }
}

//全屏滚动
function fullScroll() {
    var startScrollTop = document.body.scrollTop;
    var bodyHeight = document.getElementById("page-1").clientHeight;
    var index = 1;
    window.onscroll = function () {
        var currentScrollTop = document.body.scrollTop;
        if (currentScrollTop - startScrollTop > 0) {
            animation(document.body, {"scrollTop" : bodyHeight}, 500)
        }
        if (currentScrollTop - startScrollTop < 0) {
        
        }
    };
}
