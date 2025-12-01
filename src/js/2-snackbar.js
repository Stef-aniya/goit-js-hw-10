import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const delay = Number(form.elements.delay.value);
    const state = form.elements.state.value;

    if (!Number.isFinite(delay) || delay < 0) {
        iziToast.error({
            title: 'Error',
            message: 'Please enter a valid delay',
            position: 'topRight',
            timeout: 3000
        });
        return;
    }

    const shouldResolve = state === 'fulfilled';

    createPromise(delay, shouldResolve)
        .then(value => {
            iziToast.success({
                title: 'Success',
                message: `✅ Fulfilled promise in ${value}ms`,
                position: 'topRight',
                timeout: 3500
            });
        })
        .catch(value => {
            iziToast.error({
                title: 'Error',
                message: `❌ Rejected promise in ${value}ms`,
                position: 'topRight',
                timeout: 3500
            });
        });

    form.reset();
});


function createPromise(delay, isPositive) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (isPositive) {
                resolve(delay);
            } else {
                reject(delay);
            }
        }, delay);
    });
}