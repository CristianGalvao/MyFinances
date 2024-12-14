const express = require('express');
const router = express.Router();
const path = require('path');
const database = require("../../database/create_table_user");
const bcrypt = require('bcryptjs');

router.use(express.json());
router.use(express.static(path.join(__dirname, '../../../public')));

router.get("/register", (req, res) => {
    res.sendFile(path.join(__dirname, '../../../public/pages/register.html'));
});

router.post("/addUser", (req, res) => {

    const { name, last_name, email, password, confirmPassword } = req.body;

    if (password.length < 8) {
        return res.status(400).json({ message: "A senha deve ter pelo menos 8 caracteres." });
    }

    if (confirmPassword !== password) {
        return res.status(400).json({ message: "As senhas não coincidem." });
    }

    const verify_email_sql = `SELECT email FROM Usuario WHERE email = ?;`;

    database.query(verify_email_sql, [email], async (error, results) => {

        if (error) {
            return res.status(500).json({ message: "Erro ao verificar e-mail. Tente novamente." });
        }

        if (results.length > 0) {
            return res.status(400).json({ message: "E-mail já cadastrado." });
        }

        const hash = await bcrypt.hash(password, 10);

        const sql = `INSERT INTO Usuario (name, last_name, email, password) VALUES (?, ?, ?, ?);`;

        database.query(sql, [name, last_name, email, hash], (error, results) => {
            if (error) {
                console.error("Erro ao inserir usuário:", error);
                return res.status(500).json({ message: "Erro ao cadastrar usuário.", error });
            }

            res.status(200).json({ message: "Usuário cadastrado com sucesso!" });
            
        });
    });
});

module.exports = router;
