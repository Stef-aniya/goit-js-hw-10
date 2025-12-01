import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const refs = {
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
    btn:document.querySelector('button[data-start]'),
    input: document.querySelector('#datetime-picker'),
}
    refs.btn.disabled = true;

    let userSelectedDate = null;

    flatpickr(refs.input, {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const click = selectedDates[0] || null;
        userSelectedDate = click;

        if (!click) {
        refs.btn.disabled = true;
        return;
        }

        const now = Date.now();


        if (click.getTime() <= now) {
        iziToast.error({
            title: 'Error',
            message: 'Please choose a date in the future',
            position: 'topRight',
            timeout: 3000
        });
        userSelectedDate = null;
        refs.btn.disabled = true;
        return;
        }


        refs.btn.disabled = false;
    }
    });


const timer = {

    intervalId:null,
    isActive: false, 

    start(){
        if(this.isActive)return;

        if (!userSelectedDate) {
                iziToast.error({
                    title: 'Error',
                    message: 'Please choose a date',
                    position: 'topRight',
                    timeout: 2500,
                });
                return;
                }


        const targetTime = userSelectedDate.getTime()

        refs.input.disabled = true;
        refs.btn.disabled = true;

        this.isActive = true

        tick();

        this.intervalId = setInterval(tick,1000)

        
        const self = this;

        function tick(){
            const currentTime = new Date()
            const diff = targetTime  - currentTime

            if (diff <= 0) {
                clearInterval(self.intervalId);
                self.intervalId = null;
                self.isActive = false;

                updateTimerDisplay({    
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0,
        });

            refs.input.disabled = false;

                iziToast.success({
                    title: 'Done',
                    message: 'Countdown finished',
                    position: 'topRight',
                    timeout: 2000
                });

                return;
        }

            const time = convertMs(diff);                       
            updateTimerDisplay(time);
        }
    }
}


            refs.btn.addEventListener('click',()=>{
                timer.start()
            })

        function updateTimerDisplay({ days, hours, minutes, seconds }) {
        refs.days.textContent = String(days).padStart(2, "0");   
        refs.hours.textContent = String(hours).padStart(2, "0");
        refs.minutes.textContent = String(minutes).padStart(2, "0");
        refs.seconds.textContent = String(seconds).padStart(2, "0");
        }










        function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
    }