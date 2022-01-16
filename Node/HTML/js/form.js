/* eslint-disable no-undef */
const Inputs = document.querySelectorAll('.in');
const Sub_Btn = document.querySelector('#submit');

Sub_Btn.addEventListener('click',() => {
    Inputs.forEach((input) => {
        const value = input.value;
        console.log(value);
        if(value === '') {
            window.alert('Inputs are Empty!!');
        }else {
            console.log('ok');
        }
    })
})