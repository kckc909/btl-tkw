if (localStorage.getItem('loggedIn') === 'true') {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser.permission == 0) {
        document.querySelector('.user-name').innerHTML = currentUser.name;
        document.querySelector('.user-profile').innerHTML = currentUser.account;
    } else {
        cuspage_clicked();
    }
} else {
    cuspage_clicked();
}

function cuspage_clicked() {
    window.open('/html/index.html', '_self');
}

document.querySelector('.main .sidebar .menu .nav .cus-page').addEventListener('click', cuspage_clicked);