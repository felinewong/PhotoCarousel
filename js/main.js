
window.onload = function () {
    var container = document.getElementById('container');
    var list = document.getElementById('list');
    var imgs = list.getElementsByTagName('img');
    var buttons = document.getElementById('buttons').getElementsByTagName('span');
    var prev = document.getElementById('prev');
    var next = document.getElementById('next');
    var index = 1;
    var len = imgs.length;
    var animated = false;  //是否在切换中
    var timer;
    var firstImg = imgs[0].cloneNode(false);
    var lastImg  = imgs[imgs.length-1].cloneNode(false);

    //在第一张图片前插入最后一个图片
    //在最后一张图片前面插入第一张图片
    list.appendChild(firstImg);
    list.insertBefore(lastImg, imgs[0]);

    function showButton() {
        for(var i=0; i<buttons.length; i++){
            if(buttons[i].className == 'on'){
                buttons[i].className = '';
                break;
            }
        }
        buttons[index -1 ].className = "on";
    }

    next.onclick = function () {
        if(animated) {
            return;
        }
        if(index === len){
            index =1;
        }
        else
        {
            index += 1;
        }
        
        showButton();
        animate(-600);
    }
    prev.onclick = function () {
        if(animated) {
            return;
        }
        if(index === 1){
            index =len;
        }
        else
        {
            index -= 1;
        }
        
        showButton();
        animate(600);
    }
    for(var i=0; i<buttons.length; i++){
        buttons[i].onclick = function(){
            if(this.className == 'on'){
                return;
            }
            if(animated)
            return;
            var myIndex = parseInt(this.getAttribute('index'));
            var offset = -600 * (myIndex - index );
            animate(offset);
            index = myIndex;
            showButton();
            //debugger;
        }
    }



    function animate(offset){
        animated  = true;
        var newLeft = parseInt(list.style.left) + offset;
        var time = config.timeChange; //位移总时间
        var interval = 10;//位移间隔时间
        var speed = offset/(time/interval); //每次位移量

        function go() {
            if( (speed<0 && parseInt(list.style.left) > newLeft) ||  (speed>0 && parseInt(list.style.left) < newLeft)) {
                list.style.left = parseInt(list.style.left) + speed + 'px';
                setTimeout(go, interval);
            } else {
                animated = false
                list.style.left = newLeft + 'px'; 
                if(newLeft > -600) {
                  list.style.left = -3000 + 'px';
                 }
                if(newLeft < -3000) {
                    list.style.left = -600 + 'px';
                 }
           }
        }
        go();
     }

     function play() {
         timer = setInterval(function(){
             next.onclick();
         },config.timeInterval);
     }
        
    function stop() {
         clearInterval(timer);
     }

     container.onmouseover = stop;
     container.onmouseout = play;
     play();

}