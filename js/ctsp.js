function open_login() {
    document.querySelector('.prd-info-content .left').style.position = 'static';
}

function close_login() {
    document.getElementsByClassName('prd-info-content .left')[0].position = 'sticky';
}

document.getElementById('open-login').addEventListener('click', open_login);

document.getElementsByClassName('close-button')[0].addEventListener('click', close_login);
