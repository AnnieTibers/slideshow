//运动框架
    function getStyle(obj,attr) {
            if(window.getComputedStyle) {
                return window.getComputedStyle(obj,null)[attr];
            }else{
                return obj.currentStyle[attr];
            }
        }
    function startMove(obj,data,func) {
        clearInterval(obj.timer);
        var iSpeed,
            iCur,
            name;
        startTime = obj.timer = setInterval(function() {
            var bStop = true;
            for(var attr in data) {
                if(attr === "opacity") {
                    name = attr;
                    iCur = parseFloat(getStyle(obj,attr)) * 100;
                }else {
                    iCur = parseFloat(getStyle(obj,attr))
                }
                iSpeed = (data[attr] - iCur) / 8;

                if(iSpeed > 0) {
                    iSpeed = Math.ceil(iSpeed);
                }else {
                    iSpeed = Math.floor(iSpeed);
                }

                if(attr === "opacity") {
                    obj.style.opacity = (iCur + iSpeed) / 100;
                }else{
                    obj.style[attr] = iCur + iSpeed + "px";
                }
                if(Math.floor(Math.abs(data[attr] - iCur)) != 0) {
                    bStop = false;
                }
            }
            if(bStop) {
                clearInterval(obj.timer);
                if(name === "opacity") {
                    obj.style.opacity = data[name] / 100;
                }
                func();
            }
        },30)
    }


var timer = null;
        var sliderPage = document.getElementsByClassName('sliderPage')[0];
        var moveWidth = sliderPage.children[0].offsetWidth;
        var num = sliderPage.children.length - 1;

        var leftBtn = document.getElementsByClassName('leftBtn')[0];
        var rightBtn = document.getElementsByClassName('rightBtn')[0];
        var oSpanArray = document.getElementsByClassName('sliderIndex')[0].getElementsByTagName('span');
        var key = true;
        var index = 0;

        leftBtn.onclick = function () {
            autoMove('right -> left');
        }
        rightBtn.onclick = function () {
            autoMove('left -> right');
        }

        for(var i = 0; i < oSpanArray.length; i ++) {
            (function (myIndex) {
                oSpanArray[i].onclick = function () {
                    key = false;
                    clearTimeout(timer);
                    index = myIndex;
                    startMove(sliderPage,{left : - index * moveWidth},function () {
                        key = true;
                        timer = setTimeout(autoMove,1500);
                        changeIndex(index);
                    });
                }
            }(i))
        }

        function autoMove(direction) {
            if(key) {
                key = false;

                clearTimeout(timer);
                if(!direction || direction == "left -> right") {
                    index ++;
                    startMove(sliderPage,{left : sliderPage.offsetLeft - moveWidth},function () {
                        if(sliderPage.offsetLeft == - num * moveWidth) {
                            index = 0;
                            sliderPage.style.left = "0px";
                        }
                        timer = setTimeout(autoMove,1500);
                        key = true;
                        changeIndex(index);
                    });
                }else if (direction == "right -> left") {
                    if(sliderPage.offsetLeft == 0) {
                        sliderPage.style.left = - num * moveWidth + "px";
                        index = num;
                    }
                    index --;
                    startMove(sliderPage,{left : sliderPage.offsetLeft + moveWidth},function () {
                        timer = setTimeout(autoMove,1500);
                        key = true;
                        changeIndex(index);                     
                    })               
                }
            }           
        }
        function changeIndex(_index) {
            for(var i = 0; i < oSpanArray.length; i ++) {
                oSpanArray[i].className = "";
            }
            oSpanArray[_index].className = "active";
        }
        timer = setTimeout(autoMove,1500);
