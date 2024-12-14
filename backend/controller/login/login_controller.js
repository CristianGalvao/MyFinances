const express = require('express');
const router = express.Router();
const path = require('path');
const session = require('express-session');
const database = require("../../database/create_table_user")
const bcrypt = require('bcryptjs');


router.use(express.json());
router.use(express.static(path.join(__dirname, '../public')));  // Ajuste o caminho conforme necessário

router.use(session({
    secret: 'SEGREDOMAXIMO',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 15 * 60 * 1000 
    }
}));

router.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, '../../../public/pages/login.html'));
});

router.post('/login', (req, res) => {

    const { email, password } = req.body;

    const sql = `SELECT email, password FROM Usuario WHERE email = ? `;

    database.query(sql, [email], (error, results) => {
        if (error) {
            return res.status(500).json({ message: "Erro ao consultar o banco de dados", error });
        }

        if (results.length > 0) {
            const user = results[0];
            bcrypt.compare(password, user.password, (error, isMatch) => {

                if (error) {
                    return res.status(500).json({ message: "Erro ao comparar senhas", err });
                }

                if (isMatch) {
                    req.session.user = { email: user.email };
                    res.status(200).json({ message: "Login Com Sucesso" });
                } else {
                    res.status(400).json({ message: "Senha incorreta" });
                }
            })

        } else {
            return res.status(404).json({ message: "Usuário Não Encontrado." });
        }
    });
});

function checkAuth(req, res, next) {
    if (req.session.user) {
        return next();
    } else {
        return res.redirect('/login');
    }
}


router.get("/home", checkAuth,(req, res) => {
    res.sendFile(path.join(__dirname, '../../../public/pages/home/home.html'));
});


module.exports = router;
