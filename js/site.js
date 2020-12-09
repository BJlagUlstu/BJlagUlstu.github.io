function checkPassword(passwordOne, passwordTwo) {
    if (passwordOne == passwordTwo && passwordOne != '' && passwordTwo != '') {
        return true;
    } else {
        return false;
    }
}

function checkEmptyField(login, name, passwordOne, passwordTwo) {
    if (login == '' || name == '' || passwordOne == '' || passwordTwo == '') {
        return false;
    } else {
        return true;
    }
}

function isCyrillic(str) {
    return /[а-я]/i.test(str);
}

function complete() {

    var inputForm = document.forms.input;
    var login = inputForm.elements.inputEmail.value;
    var name = inputForm.elements.inputName.value;
    var passwordOne = inputForm.elements.inputPasswordOne.value;
    var passwordTwo = inputForm.elements.inputPasswordTwo.value;

    var output = "Login: " + login +
        "\nname: " + name +
        "\npassword: " + passwordOne;

    if(isCyrillic(login)) {
        Swal.fire({
            icon: 'warning',
            title: 'Warning!',
            text: 'В email не должны присутствовать символы кириллицы'
        });
        return;
    } else if(isCyrillic(name)) {
        Swal.fire({
            icon: 'warning',
            title: 'Warning!',
            text: 'В имени не должны присутствовать символы кириллицы'
        });
        return;
    } else if(isCyrillic(passwordOne)) {
        Swal.fire({
            icon: 'warning',
            title: 'Warning!',
            text: 'В пароле не должны присутствовать символы кириллицы'
        });
        return;
    } 

    if (checkEmptyField(login, name, passwordOne, passwordTwo)) {
        if (isValidEmailAddress(login)) {
            if (checkPassword(passwordOne, passwordTwo)) {
                if (passwordOne.length < 8) {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Warning!',
                        text: 'Пароль слишком короткий'
                    });
                } else {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Регистрация успешно выполнена!',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            } else {
                Swal.fire({
                    icon: 'warning',
                    title: 'Warning!',
                    text: 'Пароли не совпадают'
                });
            }
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Warning!',
                text: 'Пожалуйста, введите почту правильно,\nНапример: name@example.com'
            });
        }
    } else {
        Swal.fire({
            icon: 'warning',
            title: 'Warning!',
            text: 'Пожалуйста, заполните пустные поля'
        });
    }
    event.preventDefault();
}

function isValidEmailAddress(emailAddress) {
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    return pattern.test(emailAddress);
}

$(document).ready(function() {

    var form = document.forms.input;
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        complete();
        new FormData(form);
    });

    form.addEventListener("formdata", event => {
        const data = event.formData;
        const entries = [...data.entries()];
        console.log(entries);
        const values = [...data.values()];
        console.log(values);
    });
});