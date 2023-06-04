const time_el = document.querySelector('.watch .time');
const start_btn = document.getElementById('Start');
const stop_btn = document.getElementById('Stop');
const reset_btn = document.getElementById('Reset');
 
let seconds=0;
 let interval = null;

 start_btn.addEventListener('click',Start);
 stop_btn.addEventListener('click',Stop);
 reset_btn.addEventListener('click',Reset);

function timer () {
    seconds++;

    let hrs = Math.floor(seconds/3600);
    let mins= Math.floor((seconds-hrs*3600)/60);
    let secs = seconds%60;

    
    if(secs<10) secs='0'+secs;
    if(mins<10) mins='0'+mins;
    if(hrs<10) hrs='0'+hrs;

    time_el.innerText = `${hrs}:${mins}:${secs}`;
}
function Start (){
    if(interval){
        return
    }
    interval=setInterval(timer,1000);
}
function Stop (){
    clearInterval(interval);
    interval=null;
}
function Reset (){
    Stop();
    seconds=0;
    time_el.innerText = '00:00:00';
}
class Timer {
    constructor(root){
        root.innerHTML=Timer.getHTML();
        this.el ={
            minutes: root.querySelector(".timer__part--minutes"),
            seconds: root.querySelector(".timer__part--seconds"),
            control: root.querySelector(".timer__btn--control"),
            reset: root.querySelector(".timer__btn--reset")
        };
        this.interval=null;
        this.remainingSeconds=0;
        
        this.updateInterfaceControls();
        this.el.control.addEventListener('click',() => {
           if(this.interval===null){
            this.start();
           }
           else{
            this.stop();
           }
        });
        this.el.reset.addEventListener('click',() => {
          const inputMinutes=prompt("Enter no of Minutes:");
          if(inputMinutes<60){
            this.stop();
            this.remainingSeconds=inputMinutes*60;
            this.updateInterfaceTime();
          }
        });
    }
    updateInterfaceTime(){
        const minutes = Math.floor(this.remainingSeconds/60);
        const seconds= this.remainingSeconds %60;

      this.el.minutes.textContent=minutes.toString().padStart(2,"0");
      this.el.seconds.textContent=seconds.toString().padStart(2,"0");
    }
    updateInterfaceControls(){
        if(this.interval===null){
            this.el.control.innerHTML=`<span class="material-icons">play_arrow</span>`;
            this.el.control.classList.add("timer__btn--start");
            this.el.control.classList.remove("timer__btn--stop");
        }
        else{
            this.el.control.innerHTML=`<span class="material-icons">pause</span>`;
            this.el.control.classList.add("timer__btn--stop");
            this.el.control.classList.remove("timer__btn--start");
        }
    }
    start() {
        if(this.remainingSeconds===0){
            return ;

        }
        this.interval=setInterval(()=>{
            this.remainingSeconds--;
            this.updateInterfaceTime();
            if(this.remainingSeconds===0){
                this.stop();
            }

        },1000);
        this.updateInterfaceControls();
    }
    stop(){
        clearInterval(this.interval);
        this.interval=null;
        this.updateInterfaceControls();
    }
    static getHTML(){
        return `
          <span class="timer__part timer__part--minutes">00</span>
          <span class="timer__part">:</span>
          <span class="timer__part timer__part--seconds">00</span>
          <button type="button" class="timer__btn timer__btn--control timer__btn--start">
          <span class="material-icons">play_arrow</span>
          </button>
          <button type="button" class="timer__btn timer__btn--reset">
          <span class="material-icons">timer</span>
          </button>
          `;
    }
}
new Timer(
    document.querySelector(".timer")
);


