


# Projeto Siga
O projeto Siga surgiu com o intuito de aprender mais sobre template engine, jQuery, Node.js e MongoDB. Então, apliquei alguns conceitos que aprendi durante os cursos na Alura.

Esse projeto foi concebido para ser um sistema de cadastro. Nele, existe um dashboard simples, uma tela de login para o cadastro de usuários, locais de atendimento, chamados, ativos e hardware que compõe os ativos. Tudo é bastante básico, sendo utilizado apenas para aplicar conceitos de programação.
 
## Instalação

Para instalar e usar o programa desse repositório, siga as etapas a seguir:

1- clone o repositório usando o comando git clone seguido da URL do repositório:
```bash
   https://github.com/D-S-MELO/SigaApp.git
```
Ou se desejar faça o dowload do projeto direto pelo gitHub e coloque em uma pasta da sua escolha

2- Certifique-se de ter o Node.js instalado em seu sistema. Você pode baixar a versão mais recente do Node.js em https://nodejs.org/en/download/ e seguir as instruções de instalação adequadas para o seu sistema operacional.

3- Com o Node.js devidamente instalado, abra o terminal ou prompt de comando e navegue até o diretório do projeto onde o arquivo package.json está localizado. Use o comando cd para navegar pelos diretórios. Por exemplo:

```bash
 cd /caminho para diretorio do projeto
```
4 - Uma vez dentro do diretório do projeto, execute o seguinte comando para instalar as dependências listadas no arquivo package.json:

```bash
 npm install
```
# Criando Base de Dados
5- Após a instalação de todas as dependências do projeto, é necessário criar uma base de dados. Siga os passos abaixo:

5.1- Acesse o site do MongoDB Compass https://www.mongodb.com/products/tools/compass e faça login ou crie uma conta, caso ainda não tenha uma.

5.2- Crie um cluster gratuito e uma base de dados com o nome de sua preferência, juntamente com uma coleção chamada "usuarios".

5.3- Com o auxílio do terminal da collection, utilize o seguinte comando para adicionar um novo usuário:

```bash
{"_id":{"$oid":"651f455dd49f81d5e32a408f"},"email":"adm@adm.com","senha":"$2a$10$aSUli.N4UiEhCGnulsXQhePvhSbTuXS0QxIdYAJT0UlUfaVrYAEoa"}
```
5.4 Agora criaremos um arquivo na raiz do projeto chamado .env onde iremos configurar os dados de conexão com a base.

```bash
HOSTNAME= localhost
PORT= a porta da sua escolha, se quiser deixe padrão 3000
PASSWORD = senha utilizada na criação do cluster mongodb
USER = usuario definido na criação do cluster mongodb
MONGODB_URI = dentro do seu cluster na opção connect, opção compass, copiar a string de conexão e colar aqui
```

# Como Executar

Para executar o programa basta abrir um terminal na raiz do projeto, na sua IDE de desenvolvimento e executar o comando abaixo:

```bash
 npm run dev
```

Abra o seu navegador de escolha e digite a URL:

Atenção no console da sua IDE irá aparecer a url montada, mais se desejar deixar o padrão...
```bash
 http://localhost:3000/
```
