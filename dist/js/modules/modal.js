function openModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden'; //не дает скроллить страницу при открытии модального окна

        console.log(modalTimerId);
        if (modalTimerId) {
            clearInterval(modalTimerId);
        }
    
    }

    function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
    }

function modal(triggerSelector, modalSelector, modalTimerId) {

    const modal = document.querySelector(modalSelector),
    modalTrigger = document.querySelectorAll(triggerSelector);
    
    modalTrigger.forEach(btn => {
        btn.addEventListener('click', () => {
            openModal(modalSelector, modalTimerId);
        });
    });

    modal.addEventListener('click', (e) => {  //закрытие модального окна при нажатии на фон
    if (e.target === modal || e.target.getAttribute('data-close') == '') {
        closeModal(modalSelector);
    }
    });

    document.addEventListener('keydown', (e) => { // закрытие модального окна на эскейп
    if (e.code === "Escape" && modal.classList.contains('show')) {
        closeModal(modalSelector);
    }
    });

    function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) { //сумма движения по y скроллом и высота клиента равна высоте документа
        openModal(modalSelector, modalTimerId);
        window.removeEventListener('scroll', showModalByScroll); // убирает событие после показа в первый раз
    }
    }

    window.addEventListener('scroll', showModalByScroll);

}

export default modal;
export {closeModal};
export {openModal};