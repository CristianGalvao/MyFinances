let inactivityTimeout;
const INACTIVITY_LIMIT = 20 * 1000; 

function resetInactivityTimer() {
    clearTimeout(inactivityTimeout);
    inactivityTimeout = setTimeout(() => {
        alert("Sua sessão expirou devido à inatividade.");
        window.location.reload();
    }, INACTIVITY_LIMIT);
}

document.addEventListener('mousemove', resetInactivityTimer);
document.addEventListener('keydown', resetInactivityTimer);

resetInactivityTimer();


setInterval(() => {
    fetch('/home', { method: 'GET' })
        .then(response => {
            if (response.status === 401) { 
                alert("Sua sessão expirou. Redirecionando para o login...");
                window.location.href = '/login';
            }
        })
        .catch(error => {
            console.error("Erro ao verificar a sessão:", error);
        });
}, 5000);





document.getElementById('open_btn').addEventListener('click', function () {
    var sidebar = document.getElementById('sidebar');
    var openBtnIcon = document.getElementById('open_btn_icon');
    
    sidebar.classList.toggle('open-sidebar');
    
    if (sidebar.classList.contains('open-sidebar')) {
        openBtnIcon.classList.remove('bi-arrow-right-short');
        openBtnIcon.classList.add('bi-arrow-left-short');
    } else {
        openBtnIcon.classList.remove('bi-arrow-left-short');
        openBtnIcon.classList.add('bi-arrow-right-short');
    }
});


function loadPage(page) {
    var menu = document.querySelectorAll(".side-item");
    menu.forEach((item) => {
        item.classList.remove('active');
    });
    document.querySelector(`[onclick="loadPage('${page}')"]`).classList.add('active'); ado

    var content = document.getElementById('main-content');
    
    var filePath = '';

    switch(page) {
        case 'home':
            filePath = '/pages/home/home_user.html'; 
            break;
        case 'dashboard':
            filePath = '/pages/home/dashboard.html';
            break;
        case 'objetivos':
            filePath = '/pages/objetivos.html';
            break;
        case 'meus-recursos':
            filePath = '/pages/meus-recursos.html';
            break;
        case 'investimentos':
            filePath = '/pages/investimentos.html';
            break;
        case 'gastos-mensais':
            filePath = '/pages/gastos-mensais.html';
            break;
        case 'perfil':
            filePath = '/pages/perfil.html';
            break;
    }

    fetch(filePath)
        .then(response => {
            console.log('Resposta de fetch:', response); 
            if (!response.ok) {
                throw new Error('Falha ao carregar o conteúdo');
            }
            return response.text();
        })
        .then(data => {
            content.innerHTML = data; 
        })
        .catch(error => {
            console.error('Erro ao carregar o conteúdo externo:', error);
            content.innerHTML = '<h2>Erro ao carregar a página</h2><p>Houve um problema ao tentar carregar o conteúdo.</p>';
        });
}


window.addEventListener('DOMContentLoaded', () => {
    loadPage('home');
});


