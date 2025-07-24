
var signinInputName = document.querySelector("#signinInputName");
var signinInputEmail = document.querySelector("#signinInputEmail");
var signinInputPassword = document.querySelector("#signinInputPassword");
var signinButton = document.querySelector("#signinButton");
signinEmailRegExp = /^[a-z0-9.-]{3,50}@[a-z0-9.-]{1,20}\.[a-z]{2,5}$/;
signinPasswordRegExp = /^[A-Za-z0-9]{4,15}$/;
var users = [];
if (localStorage.getItem("users")) {
    users = JSON.parse(localStorage.getItem("users"));
}
signinButton.addEventListener("click", login);

function login() {
    if (NotTypingInput() && vaildInputsLive(signinInputEmail, signinEmailRegExp) && vaildInputsLive(signinInputPassword, signinPasswordRegExp) && isValid()) {
        for (var i = 0; i < users.length; i++) {
            if (signinInputEmail.value == users[i].email && signinInputPassword.value == users[i].password) {
                localStorage.setItem("name", users[i].name)
                Toastify({
                    text: "Account is Logged",
                    duration: 3000
                }).showToast();
                setTimeout(() => {
                    window.location.replace("./home.html");
                }, 900);
                break;
            }
        }

    } else {
        clearInputs();
        Toastify({
            text: "You Have A Problem In Your Email Or Password",
            duration: 3000
        }).showToast();

    }
}
function NotTypingInput() {
    if (signinInputEmail.value == "" || signinInputPassword.value == "") {
        document.querySelector("#alertText").classList.add("d-block");
        document.querySelector("#alertText").classList.remove("d-none");
        return false;
    } else {
        document.querySelector("#alertText").classList.remove("d-block");
        document.querySelector("#alertText").classList.add("d-none");
        return true
    }
}
function vaildInputsLive(element, regexp) {
    if (regexp.test(element.value.trim())) {
        element.classList.add("is-valid");
        element.classList.remove("is-invalid");
        return true;
    } else {
        element.classList.remove("is-vaild");
        element.classList.add("is-invalid");
        return false;
    }
}
signinInputEmail.addEventListener("input", function () {
    vaildInputsLive(signinInputEmail, signinEmailRegExp);
});
signinInputPassword.addEventListener("input", function () {
    vaildInputsLive(signinInputPassword, signinPasswordRegExp);
});
function clearInputs() {
    signinInputEmail.value = "";
    signinInputPassword.value = "";
    signinInputEmail.classList.remove("is-valid");
    signinInputPassword.classList.remove("is-valid");
}
function isValid() {
    let isCorrect = true;
    if (signinEmailRegExp.test(signinInputEmail.value.trim())) {
        signinInputEmail.classList.add("is-valid");

    } else {
        signinInputEmail.classList.add("is-invalid");
        signinInputEmail.classList.remove("is-valid");
        isCorrect = false;
    }
    if (signinPasswordRegExp.test(signinInputPassword.value.trim())) {
        signinInputPassword.classList.add("is-valid");


    } else {
        signinInputPassword.classList.add("is-invalid");
        signinInputPassword.classList.remove("is-valid");
        isCorrect = false;
    }
    return isCorrect;
}