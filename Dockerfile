# Usa uma imagem do node como base. Nesse caso a 18
FROM node:18.19.1

# Define o diretório
WORKDIR /app

# Copia o package.json e package-lock.json para o diretório
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante dos arquivos para o diretório
COPY . .

RUN npm run build

# Expõe a porta 3000
EXPOSE 3000

# Com o app rodando na porta 3000, roda o comando pra iniciar
CMD ["npm", "start"]
