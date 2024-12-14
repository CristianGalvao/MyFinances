const form = document.getElementById("login");
const email = document.getElementById("email");
const password = document.getElementById("password");


form.addEventListener('submit', (event) => {

    if (!sessionStorage.getItem('user')) {
        window.location.href = '/login';
    }
    

    event.preventDefault();
    if (password.value !== '') {
        fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email.value,  
                password: password.value
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log("Resposta da API:", data);
            if (data.message === "Login Com Sucesso") {
                window.location.href = '/home';
            }
        })
        .catch(error => {
            alert("Erro ao fazer login: " + error);
        });
    } else {
        alert("Senha vazia");
    }
});
