-- Criando a tabela de Usuário se não existir
CREATE TABLE IF NOT EXISTS Usuario (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Criando a tabela de Objetivos se não existir
CREATE TABLE IF NOT EXISTS Objetivo (
    id_objetivo INT AUTO_INCREMENT PRIMARY KEY,  -- Corrigido para AUTO_INCREMENT
    id_usuario INT,
    nome VARCHAR(100),
    valor_estimado DECIMAL(10, 2),
    data_prevista DATE,
    status VARCHAR(50),
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario)
);

-- Criando a tabela de Recursos se não existir
CREATE TABLE IF NOT EXISTS Recurso (
    id_recurso INT AUTO_INCREMENT PRIMARY KEY,  -- Corrigido para AUTO_INCREMENT
    id_usuario INT,
    tipo VARCHAR(50),
    valor DECIMAL(10, 2),
    data DATE,
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario)
);

-- Criando a tabela de Investimentos se não existir
CREATE TABLE IF NOT EXISTS Investimento (
    id_investimento INT AUTO_INCREMENT PRIMARY KEY,  -- Corrigido para AUTO_INCREMENT
    id_usuario INT,
    nome_investimento VARCHAR(100),
    valor_investido DECIMAL(10, 2),
    data_investimento DATE,
    rentabilidade DECIMAL(5, 2),
    tipo_investimento VARCHAR(50),
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario)
);

-- Criando a tabela de Gastos Mensais se não existir
CREATE TABLE IF NOT EXISTS Gasto (
    id_gasto INT AUTO_INCREMENT PRIMARY KEY,  -- Corrigido para AUTO_INCREMENT
    id_usuario INT,
    categoria VARCHAR(50),
    descricao VARCHAR(255),
    valor DECIMAL(10, 2),
    data DATE,
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario)
);

-- Criando a tabela de Perfil se não existir
CREATE TABLE IF NOT EXISTS Perfil (
    id_perfil INT AUTO_INCREMENT PRIMARY KEY,  -- Corrigido para AUTO_INCREMENT
    id_usuario INT,
    foto_perfil VARCHAR(255),
    descricao TEXT,
    preferencias_financeiras TEXT,
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario)
);
