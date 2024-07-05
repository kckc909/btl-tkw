// {sdt, mk, tên, quyền = 0 | 1}
// 0 = admin; 1 = customer

const regexpPhoneNumber = new RegExp('^\\d{10}$');
var found = false;
var opened = false;

if (localStorage.getItem('currentUser') === null) {
	localStorage.setItem('currentUser', '');
}
if (localStorage.getItem('loggedIn') == null) {
	localStorage.setItem('loggedIn', false);
}

function getAllAccount() {
	var arrAccounts = JSON.parse(localStorage.getItem('lstAccount')) || [];
	if (!arrAccounts.length) {
		var account = {
			account: '0934206983',
			password: '1',
			name: 'admin',
			permission: '0'
		};
		arrAccounts.push(account);
		localStorage.setItem('lstAccount', JSON.stringify(arrAccounts))
	}
	return arrAccounts;
}

function existAccount(account) {
	var arr = getAllAccount();
	for (let i = 0; i < arr.length; i++) {
		var ele = arr[i];
		if (account === ele.account) {
			localStorage.setItem('currentUser', JSON.stringify(ele));
			return true;
		}
	};
	return false;
}

function btnTiepTucClicked() {
	var account = document.getElementById('loginUser').value;
	// Nếu sdt đúng định dạng -> kiểm tra tồn tại
	if (regexpPhoneNumber.test(account)) {
		if (existAccount(account)) {
			document.getElementsByClassName('default-password')[0].style.visibility = 'hidden';
			found = true;
			document.getElementById('name').innerHTML = JSON.parse(localStorage.getItem('currentUser')).name;
		} else {
			found = false;
			document.getElementsByClassName('default-password')[0].style.visibility = 'visible';
			document.getElementById('name').innerHTML = 'khách hàng mới';
		}
		document.querySelector('.login-box#tai-khoan').style.display = 'none';
		document.querySelector('.login-box#mat-khau').style.display = 'block';
	} else {
		document.getElementById('error-message').innerHTML = 'Số điện thoại không đúng';
	}
}

function btnQuayLaiClicked() {
	document.getElementById('loginPassword').value = '';
	document.getElementById('error-message').innerHTML = '';
	document.getElementById('error-message-password').innerHTML = '';
	document.querySelector('.login-box#mat-khau').style.display = 'none';
	document.querySelector('.login-box#tai-khoan').style.display = 'block';
}

function btnDangNhapClicked() {
	var password = document.getElementById('loginPassword').value;
	if (!found) {
		var acc = {
			account: document.getElementById('loginUser').value,
			password: '123',
			name: 'khách hàng mới',
			permission: '1'
		}
		var arrAccounts = getAllAccount();
		arrAccounts.push(acc);
		localStorage.setItem('lstAccount', JSON.stringify(arrAccounts));
		localStorage.setItem('currentUser', JSON.stringify(acc));
	}
	var currentUser = JSON.parse(localStorage.getItem('currentUser'));
	if (currentUser.password === password) {
		document.getElementById('error-message-password').innerHTML = '';
		// thay đổi thành trạng thái đã đăng nhập
		localStorage.setItem('loggedIn', true);
		closeLogin();
		alert("Đăng nhập thành công! Chào mừng " + currentUser.name);
		UserloggedIn();
	} else {
		document.getElementById('error-message-password').innerHTML = 'Mặt khẩu không chính xác';
	}
}

function disableScroll() {
	const html_tag = document.getElementById('html-tag');
	html_tag.className = 'disable-scroll';
}

function ableScroll() {
	const html_tag = document.getElementById('html-tag');
	html_tag.className = 'able-scroll';
}

function openLogin() {
	let la = document.getElementById('login-area');
	la.style.visibility = 'visible';
	disableScroll();
}


function closeLogin() {
	let la = document.getElementById('login-area');
	la.style.visibility = 'hidden';
	btnQuayLaiClicked();
	ableScroll();
}

function UserloggedIn() {
	var loggedIn = localStorage.getItem('loggedIn');
	if (loggedIn === 'true') {
		var currentUser = JSON.parse(localStorage.getItem('currentUser'))
		document.querySelector('#open-login').style.display = 'none';
		document.querySelector('#btn-loggedIn').style.display = 'block';
		document.querySelector('#btn-loggedIn span').innerHTML = currentUser.name;
		if (currentUser.permission == 0) {
			document.getElementById('admin-nav').style.display = 'block';
		} else {
			document.getElementById('admin-nav').style.display = 'none';
		}
	} else {
		document.querySelector('#open-login').style.display = 'block';
		document.querySelector('#btn-loggedIn').style.display = 'none';
		document.querySelector('#btn-loggedIn span').innerHTML = 'Tài khoản';
	}
}

function btn_loggedIn_clicked() {
	if (opened) {
		document.querySelector('.level2').style.display = 'none';
		opened = false;
	} else {
		document.querySelector('.level2').style.display = 'block';
		opened = true;
	}
}

// addEventListener

document.getElementById('open-login').addEventListener('click', openLogin);

var closeBtns = document.getElementsByClassName('close-button');
for (let i = 0; i < closeBtns.length; i++) {
	closeBtns[i].addEventListener('click', closeLogin);
}

document.getElementById('btn-tiep-tuc').addEventListener('click', btnTiepTucClicked);

document.getElementById('btn-quay-lai').addEventListener('click', btnQuayLaiClicked);

document.getElementById('btn-dang-nhap').addEventListener('click', btnDangNhapClicked);

document.getElementById('btn-loggedIn').addEventListener('click', btn_loggedIn_clicked);

document.getElementById('btn-dang-xuat').addEventListener('click', function () {
	localStorage.setItem('loggedIn', false);
	localStorage.setItem('currentUser', '');
	document.getElementById('loginUser').value = '';
	document.getElementById('loginPassword').value = '';
	document.querySelector('.level2').style.display = 'none';
	document.querySelector('#btn-loggedIn').style.display = 'none';
	document.getElementById('open-login').style.display = 'block';
	btnQuayLaiClicked();
});

document.getElementById('admin-nav').addEventListener('click', function() {
	window.open('/html/QuanLy_index.html', '_self')
});

UserloggedIn();
