var stage = 0;
var imgPos = {};

function matrixToArray(str) {
  return str.match(/(-?[0-9\.]+)/g);
}

document.getElementById("startBtn").addEventListener("click",
    function(){
        var bg = document.getElementById("bg");
        var fg = document.getElementById("fg");
        var btn = document.getElementById("startBtn");
        if(stage===0){
            bg.src = "../DressDownGame/img/room.png";
            bg.style.zIndex = "0";
            btn.innerHTML = "Done!"
            stage = 1;
        } else {
            bg.src = "../DressDownGame/img/bathroom.png";
            fg.style.display = "block";
            btn.style.display = "none";
            Array.from(document.querySelectorAll(".draggable")).forEach(
                img => {
                    var transform = matrixToArray(img.style.transform);
                    if(transform != null && (transform[1]>70 || transform[1]<-70)){
                        img.style.display = "none";
                    }
                  }
                );
        }
    });

window.onload = function() {
    Array.from(document.querySelectorAll(".draggable img")).forEach(
        img => {
            img.style.width = img.width * .4 + "px";
          }
    )
}

// target elements with the "draggable" class
interact('.draggable')
    .draggable({
        onmove: function(event) {
            const target = event.target;

            const dataX = target.getAttribute('data-x');
            const dataY = target.getAttribute('data-y');
            const initialX = parseFloat(dataX) || 0;
            const initialY = parseFloat(dataY) || 0;

            const deltaX = event.dx;
            const deltaY = event.dy;

            const newX = initialX + deltaX;
            const newY = initialY + deltaY;

            target
                .style
                .transform = `translate3d(${newX}px, ${newY}px, 0px)`;

            target.setAttribute('data-x', newX);
            target.setAttribute('data-y', newY);
            imgPos[target] = newX;
        }
    });

