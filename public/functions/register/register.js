const form = document.getElementById('registerForm');
const password = document.getElementById('password');
const password_8_characters = document.getElementById("password_8_characters");
const confirmPassword = document.getElementById('confirmPassword');
const confirmPasswordTopassword = document.getElementById("confirmPasswordTopassword");


function verifyPasswordLength() {
    password.addEventListener('input', () => {
        if (password.value.length < 8 && password.value !== '') {
            password_8_characters.style.display = "block";
        } else {
            password_8_characters.style.display = "none";
        }
    });
}


function verifyConfirmPassword() {
    confirmPassword.addEventListener('input', () => {
        if (confirmPassword.value !== password.value && confirmPassword.value !== '') {
            confirmPasswordTopassword.style.display = "block";
        } else {
            confirmPasswordTopassword.style.display = "none";
        }
    });
}


verifyConfirmPassword();
verifyPasswordLength();


form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (password.value.length < 8) {
        alert("A senha deve ter pelo menos 8 caracteres.");
        return; 
    }

    if (confirmPassword.value !== password.value) {
        alert("As senhas não coincidem.");
        return;
    }

    const name = document.getElementById('name').value;
    const last_name = document.getElementById('last_name').value;
    const email = document.getElementById('email').value;
    const passwordValue = document.getElementById('password').value;
    const confirmPasswordValue = document.getElementById('confirmPassword').value;

    fetch("/addUser", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: name,
            last_name: last_name,
            email: email,
            password: passwordValue,
            confirmPassword: confirmPasswordValue
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log("Resposta da API:", data);
        alert(data.message);
        if (data.message === "Usuário cadastrado com sucesso!") {
            form.reset();
            window.location.href = "/login";
        }
    })
    .catch(error => {
        console.error("Erro ao cadastrar usuário:", error);
        alert("Erro ao cadastrar usuário.");
    });
});
