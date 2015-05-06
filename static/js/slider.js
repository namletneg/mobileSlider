/**
 * Created by f on 2015/5/5.
 */
function Slider(){
    this.wrap = document.getElementById('wrapPage');
    this.scaleW = window.innerWidth;
    this.idx = 0;
    this.slide();
}
Slider.prototype = {
    constructor: Slider,
    slide: function(){
        var self = this,
            scale = self.scaleW,
            wrap = self.wrap,
            item = wrap.querySelectorAll('.page'),
            i, len, m,
            handlerStart = function(event){
                self.startX = event.targetTouches[0].pageX;
                self.offsetX = 0;
                self.startTime = new Date();
            },
            handlerMove = function(event){
                event.preventDefault();
                self.moveX = event.targetTouches[0].pageX;
                self.offsetX = self.moveX - self.startX;

                for(i = self.idx - 1, m = i + 3; i < m; i++){
                    item[i] && (item[i].style.transform = 'translate3d(' + (scale * (i - self.idx) + self.offsetX) + 'px, 0, 0)') &&
                    ((item[i].style.webkitTransform = 'translate3d(' + (scale * (i - self.idx) + self.offsetX) + 'px, 0, 0)')) &&
                    (item[i].style.transition = 'none');
                }
            },
            handlerUp = function(){
                var boundary = scale / 3,
                    endTime = new Date(),
                    distance = endTime.getTime() - self.startTime.getTime();    //时间间隔

                if(distance >= 800){
                    if(self.offsetX > boundary){
                        self.go(-1);   //退一页
                    } else if(self.offsetX < -boundary){
                        self.go(1);    //进一页
                    } else{
                        self.go(0);   //停留本页
                    }
                } else{
                    //优化，
                    //快操作，考虑到用户快速滑动，滑动距离 小于 boundary
                    if(self.offsetX > 50){
                        self.go(-1);   //退一页
                    } else if(self.offsetX < -50){
                        self.go(1);    //进一页
                    } else{
                        self.go(0);   //停留本页
                    }
                }
            };

        for(i = 0, len = item.length; i < len; i++){
            item[i].style.MozTransform = 'translate3d(' + i * scale + 'px, 0, 0)';
            item[i].style.webkitTransform = 'translate3d(' + i * scale + 'px, 0, 0)';
            item[i].style.transform = 'translate3d(' + i * scale + 'px, 0, 0)';
        }
        wrap.addEventListener('touchstart', handlerStart);
        wrap.addEventListener('touchmove', handlerMove);
        wrap.addEventListener('touchend', handlerUp)

    },
    go: function(n){
        var self = this,
            scale = self.scaleW,
            wrap = self.wrap,
            item = wrap.querySelectorAll('.page'),
            len = item.length,
            nIdx = self.idx + n;

        //判断 nIdx 超出范围
        if(nIdx >= len){
            nIdx = len - 1;
        } else if(nIdx < 0){
            nIdx = 0;
        }
        self.idx = nIdx;
        item[self.idx] && (item[self.idx].style.transform = 'translate3d(0, 0, 0)') &&
        (item[self.idx].style.webkitTransform = 'translate3d(0, 0, 0)') &&
        (item[self.idx].style.transition = 'transform .3s linear 0s') &&
        (item[self.idx].style.webkitTransition = '-webkit-transform .3s linear 0s');

        item[self.idx - 1] && (item[self.idx - 1].style.transform = 'translate3d(' + (-scale) + 'px, 0, 0)') &&
        (item[self.idx - 1].style.webkitTransform = 'translate3d(' + (-scale) + 'px, 0, 0)') &&
        (item[self.idx - 1].style.transition = 'transform .3s linear 0s') &&
        (item[self.idx - 1].style.webkitTransition = '-webkit-transform .3s linear 0s');

        item[self.idx + 1] && (item[self.idx + 1].style.transform = 'translate3d(' + scale + 'px, 0, 0)') &&
        (item[self.idx + 1].style.webkitTransform = 'translate3d(' + scale + 'px, 0, 0)') &&
        (item[self.idx + 1].style.transition = 'transform .3s linear 0s') &&
        (item[self.idx + 1].style.webkitTransition = '-webkit-transform .3s linear 0s');
    }
};
new Slider();

