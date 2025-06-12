const kombImg = document.querySelector('.komb');

const jump = () => {
    kombImg.classList.add('jump');

    setTimeout(() => {
        kombImg.classList.remove('jump');
    }, 500)

}

document.addEventListener('keydown', jump);