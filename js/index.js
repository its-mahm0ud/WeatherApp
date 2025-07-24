
var signinInputName = document.querySelector("#signinInputName");
var signinInputEmail = document.querySelector("#signinInputEmail");
var signinInputPassword = document.querySelector("#signinInputPassword");
var signinButton = document.querySelector("#signinButton");
signinNameRegExp = /^[A-Z][A-Za-z0-9]{3,10}$/;
signinEmailRegExp = /^[a-z0-9.-]{3,50}@[a-z0-9.-]{1,20}\.[a-z]{2,5}$/;
signinPasswordRegExp = /^[A-Za-z0-9]{4,15}$/;
var users = [];
if (localStorage.getItem("users")) {
    users = JSON.parse(localStorage.getItem("users"));
}
function signinUser() {
    if (NotTypingInput() && isValid() && isExit()) {
        var user = {
            name: signinInputName.value,
            email: signinInputEmail.value,
            password: signinInputPassword.value,
        }

        users.push(user);
        localStorage.setItem("users", JSON.stringify(users));

        clearInputs();
        setTimeout(() => {
            window.location.replace("./login.html");
        }, 2100);
    }
}
signinButton.addEventListener("click", signinUser);
function NotTypingInput() {
    if (signinInputName.value == "" || signinInputEmail.value == "" || signinInputPassword.value == "") {
        document.querySelector("#alertText").classList.add("d-block");
        document.querySelector("#alertText").classList.remove("d-none");
        return false;
    } else {
        document.querySelector("#alertText").classList.remove("d-block");
        document.querySelector("#alertText").classList.add("d-none");
        return true
    }
}
function clearInputs() {
    signinInputName.value = "";
    signinInputEmail.value = "";
    signinInputPassword.value = "";
    signinInputName.classList.remove("is-valid");
    signinInputEmail.classList.remove("is-valid");
    signinInputPassword.classList.remove("is-valid");
}
function vaildInputsLive(element, regexp) {
    if (regexp.test(element.value.trim())) {
        element.classList.add("is-valid");
        element.classList.remove("is-invalid");

    } else {
        element.classList.remove("is-valid");
        element.classList.add("is-invalid");
    }
}

signinInputName.addEventListener("input", function () {
    vaildInputsLive(signinInputName, signinNameRegExp);
});
signinInputEmail.addEventListener("input", function () {
    vaildInputsLive(signinInputEmail, signinEmailRegExp);
});
signinInputPassword.addEventListener("input", function () {
    vaildInputsLive(signinInputPassword, signinPasswordRegExp);
});

function isValid() {
    let isCorrect = true;
    if (signinNameRegExp.test(signinInputName.value.trim())) {
        signinInputName.classList.add("is-valid");
    } else {
        signinInputName.classList.add("is-invalid");
        signinInputName.classList.remove("is-valid");
        isCorrect = false;

    }
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
function isExit() {
    for (var i = 0; i < users.length; i++) {
        if (signinInputEmail.value == users[i].email) {
            document.querySelector("#alertText").innerHTML = "This Email Already Created Before";
            document.querySelector("#alertText").classList.add("d-block");
            document.querySelector("#alertText").classList.remove("d-none");
            return false;
        }
    }
    return true;
}
