// var ran=document.getElementById("range");
            //     function setvalue(){
            //     oAudio.volume=ran.value/100;
            //     oAudio.muted=false;
            //     }
            var volume=0.5
            var volumeup=document.getElementById("volumeA")
            volumeup.onclick=function(){
           if(volume<1)
            { 
                volume=volume+0.1;
                oAudio.volume=volume;
            }
           else
           {
               alert("It has reached its maximum volume.")
               oAudio.volume=1.0;
           }
            
           }
            var volumedown=document.getElementById("volumeR")
            volumedown.onclick=function(){
            if(volume>0)
            {
            volume=volume-0.1;
            oAudio.volume=volume;
            }
            else
            {
                alert("it has reached its minimum volume.")
                oAudio.volume=0;
            }
            }
              
            var oTotal = document.getElementsByClassName("total_time")[0]
            var oAudio = document.getElementById("audio")
            var musicimg =document.getElementById("musicImg")
            var oPlay = document.getElementById("play")
            var oPause=document.getElementById("pause")
            var oUl = document.getElementById("ul")
            var oLi = oUl.getElementsByTagName("li")
            var oStart = document.getElementById("start_time")
			var oRound = document.getElementById("round")
			var oLoad = document.getElementById("load")
            var oCircle = document.getElementById("circle")
            var num = 0
            var volA=document.getElementById("volume+")
            var volR=document.getElementById("volume-")
            var addVolume=document.getElementById("add")
            var arr = ["music/Depeche Mode - Heaven (Freemasons Mix).mp3", "music/Goldfrapp - Fly Me Away.mp3", "music/Goldfrapp - Number 1.mp3", "music/Hurts - Wonderful Life (Freemasons Mix).mp3","music/The Cranberries - I Cant Be With You.mp3"]
            var imgarr=["art/Depeche Mode - Heaven (Freemasons Mix).jpg","art/Goldfrapp - Fly Me Away.jpg","art/Goldfrapp - Number 1.jpg","art/Hurts - Wonderful Life (Freemasons Mix).jpg","art/The Cranberries - I Cant Be With You.jpg"]
            var musicn=["Depeche Mode - Heaven (Freemasons Mix)","Goldfrapp - Fly Me Away","Goldfrapp - Number 1","Hurts - Wonderful Life (Freemasons Mix)","The Cranberries - I Cant Be With You"]
            oAudio.src = arr[num]
            musicimg.src =imgarr[num]
            var len=arr.length
            var next=document.getElementById("next")
            var oMute=document.getElementById("mute")
            oMute.onclick=function(){
            document.getElementById('audio').muted=!document.getElementById('audio').muted
            }
            
            // function Mutefuction(elem){
            //   elem.muted=true;
            //   elem.pause();
                
            // }

        //    addVolume.addEventListener("click",addAction)
        //    function addAction()
        //    {
        //        for(var i=0.0;;i<1.0){
        //          oAudio.volume=i
        //        }
        //    }
for(var i = 0; i < oLi.length; i++) {
				oLi[i].index = i
				oLi[i].onclick = function() {
					num = this.index
                    oAudio.src = arr[this.index]
                    musicimg.src=imgarr[this.index]
					oAudio.play()
                    musicName.innerHTML = musicn[num];
				}
            }
//click to play 
oPlay.addEventListener("click",playAction)
function playAction(){
    // alert("hello")
    if(oAudio.paused) {
    oAudio.play()
    
} else {
    oAudio.pause()
   
} 
}
// oPlay.onclick = function() {
// if(oAudio.paused) {
//     oAudio.play()
    
// } else {
//     oAudio.pause()
   
// }
// }

// click to pause
oPause.addEventListener("click",pauseAction)
function pauseAction(){
if(oAudio.played){
oAudio.pause();
}
}
// oPause.onclick = function(){
// if(oAudio.played){
// oAudio.pause();
// }
// }

//previous song 
	var btn3 = document.getElementById("prev");
	btn3.onclick = function(){
			num = (num + len -1)%len;
            oAudio.src = arr[num]
			musicName.innerHTML = musicn[num];
            musicimg.src=imgarr[num]
            oAudio.play()
		}
//next song
var btn4=document.getElementById("next")
btn4.onclick =function(){
    num = (num + 1) % len;
    oAudio.src = arr[num]
			musicName.innerHTML = musicn[num];
            musicimg.src=imgarr[num]
            oAudio.play()
}

var a0=0;
if(a0==0){
        oAudio.loop=false;
        oAudio.addEventListener("ended", shufflePlay, false);    
    }
var randomAction=document.getElementById("randomplay")
var playall=document.getElementById("playall")
var loopAction=document.getElementById("loop")
playall.onclick=function(){
    if(a0==0){
            {a0=1;
            oAudio.loop=false;
            oAudio.removeEventListener("ended",shufflePlay,false);
            }
            alert("Sequential Playing");
            oAudio.addEventListener("ended", sequentialPlay, false);
        }
}
randomAction.onclick=function(){
if(a0==1){
    a0=0;
    oAudio.loop=false;
    oAudio.removeEventListener("ended",sequentialPlay,false);
    oAudio.addEventListener("ended", shufflePlay, false);
}

}
loopAction.onclick=function(){
    loopPlay();
    alert("Loop Playing")
}
function shufflePlay(){
    var i=Math.floor(Math.random() * arr.length);
        oAudio.src=arr[i];
        musicName.innerHTML = musicn[i];
        musicimg.src=imgarr[i]
        oAudio.play();
       alert("Shuttle Playing")
}
function sequentialPlay(){
    btn4.onclick();
    alert("Sequential Playing")
}
function loopPlay(){
    oAudio.loop=true;
}

//play songs in musicList 
for(var i = 0; i < oLi.length; i++) {
				oLi[i].index = i
				oLi[i].onclick = function() {
					num = this.index
                    oAudio.src = arr[this.index]
                    musicimg.src=imgarr[this.index]
					oAudio.play()
                    musicName.innerHTML = musicn[num];

				}
            }
    

//get the duration
oAudio.addEventListener("canplay", function() {
				oTotal.innerHTML = getMin(this.duration)
			})
 
oAudio.ontimeupdate = function() {
				var pre = Math.floor(oAudio.currentTime / oAudio.duration * 200)
				oCircle.style.width = pre + "px"
				oStart.innerHTML = getMin(oAudio.currentTime)
				oRound.style.left = oCircle.style.width
			}

//click to change the process 
			oLoad.onclick = function(e) {
				var l = e.clientX - oLoad.offsetLeft
				oAudio.currentTime = (l / 200) * oAudio.duration
			}
//pull the circle to change to process
oRound.onmousedown = function(e) {
				document.onmousemove = function(e) {
					var l = e.clientX - oLoad.offsetLeft
					oAudio.currentTime = (l / 200) * oAudio.duration
 
				}
				document.onmouseup = function() {
					document.onmousedown = null
					document.onmousemove = null
				}
				return false
 
			}

//get the min and s
			function getMin(time) {
				var m = Math.floor(time / 60)
				var s = Math.floor(time % 60)
				if(m <= 9) {
					m = "0" + m
				}
				if(s <= 9) {
					s = "0" + s
				}
				return m + ":" + s
            }
       