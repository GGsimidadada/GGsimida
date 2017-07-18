/**
 * Created by 37097 on 2017/6/12.

*/
window.onload = function () {
    //轮播图开始
    //制作图片镜面倒影效果
    var img = document.getElementsByClassName("list-3d"), cImg, eImg;
    for (var i=0; i<img.length; i++) {
        eImg = img[i].firstElementChild;
        cImg = eImg.cloneNode(true);
        eImg.parentNode.appendChild(cImg);
        cImg.style.transform = "rotateX(135deg) translateY(40px)";
        cImg.className = "img-container";
        cImg.style.opacity = "0.7";
    }
    
    //样式配置单
    var config = [
        {
            zIndex: 1,
            transform: "rotateY(15deg) translateZ(-100px)",
            left: "-400px"
        },
        {
            zIndex: 2,
            transform: "rotateY(20deg)  translateZ(-50px)",
            left: "-200px"
        },
        {
            zIndex: 3,
            transform: "rotateY(0deg) translateZ(0px)",
            left: "0"
        },
        {
            zIndex: 2,
            transform: "rotateY(-20deg)  translateZ(-50px)",
            left: "200px"
        },
        {
            zIndex: 1,
            transform: "rotateY(-15deg)  translateZ(-100px)",
            left: "400px"
        }
    ];
    //防止点击过快造成图片重叠
    var flag = true;
    //点击更改样式单顺序，重新分配给每个li
    $(".icon-toPrev").click(function () {
        if (flag) {
            flag = false;
            config.unshift(config.pop());
            $(".list li").each(function (i, v) {
                $(v).animate({}, "swing", function () {
                    $(this).css(config[i]);
                    setTimeout(function () {
                        flag = true;
                    }, 500)
                });
            });
        }
    });
    $(".icon-toNext").click(function () {
        if (flag) {
            flag = false;
            config.push(config.shift());
            $(".list li").each(function (i, v) {
                $(v).animate({}, "swing", function () {
                    $(this).css(config[i]);
                    setTimeout(function () {
                        flag = true;
                    }, 500);
                });
            });
        }
    });
};
//轮播图结束

//创建canvas环形百分比动画函数，参数是对象o，属性包含：
function runPieChart(elemID, o) {
    //默认属性
    var c = document.getElementById(elemID);
    var ctx = c.getContext("2d");
    var p = Math.PI;
    var d = {
        //运动环参数
        multiple: 1,
        sAngle: -0.5 * p,
        torusWidth: 20,
        radius: 50,
        torusColor: "#f00",
        timer: 1000,
        value: 100,
        
        //百分比参数
        textAline: "center",
        textBaseLine: "middle",
        textColor: "#000",
        
        //内圆参数
        circleX: c.width / 2,
        circleY: c.height / 2,
        circleColor: "#fff",
        circleTorusColor: "#DDF0ED"
    }, k, num;
    
    for (k in o) {
        d[k] = o[k];
    }
    
    var range = p / 50 * d.multiple;
    var target = d.sAngle + d.value / 50 * Math.PI;
    var eAngle = d.sAngle;
    
    function runAnimation() {
        if (eAngle >= target) {
            return true;
        }
        //先清除画布
        ctx.clearRect(0, 0, c.width, c.height);
        
        //画基础圆环
        (function () {
            ctx.save();
            ctx.beginPath();
            ctx.arc(d.circleX, d.circleY, d.radius, -0.5 * p, 1.5 * p, false);
            ctx.fillStyle = d.circleColor;
            ctx.strokeStyle = d.circleTorusColor;
            ctx.lineWidth = d.torusWidth;
            ctx.stroke();
            ctx.fill();
            ctx.restore();
        })();
        
        //画运动圆环
        (function () {
            ctx.save();
            ctx.beginPath();
            ctx.arc(d.circleX, d.circleY, d.radius, d.sAngle, eAngle + range, false);
            ctx.strokeStyle = "rgb(18%, 40%, "+ (100 - num) +"%)";
            ctx.lineWidth = d.torusWidth + 2;
            ctx.stroke();
            eAngle += range;
            ctx.restore();
        })();
        
        //显示百分比
        (function () {
            ctx.save();
            ctx.beginPath();
            num = Math.floor((eAngle - d.sAngle) / (2 * p) * 100);
            ctx.font = "18px '微软雅黑'";
            ctx.textAlign = d.textAline;
            ctx.textBaseline = d.textBaseLine;
            ctx.fillStyle = "rgb(18%, 40%, "+ (100 - num * 0.33) +"%)";
            ctx.fillText( num + "%", d.circleX, d.circleY);
            ctx.restore();
        })();
        requestAnimationFrame(runAnimation);
    }
    requestAnimationFrame(runAnimation);
}

