# Start the vite project

```ts
npm create vite@latest .        //Create the project 
yarn install                    //Install the dependencias
```

Create the engine on package.json

```json
"engines": {
  "node": "20.x"
},
```

Instalar dependencias

```bash
yarn install
```

# How to deploy this project on the github pages

1. Config the vite.config.ts to match the repository name
```ts
export default defineConfig({
  plugins: [react()],
  base: '/confere-nf-react/',     //My repository name ->  https://github.com/Leandrohee/confere-nf-react
});
```

2. Install dependencies gh-pages to generate a branch named **gh-pages**
```ts
yarn add gh-pages -D
``` 

3. Update package.json to automate the deploy
```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "deploy": "vite build && gh-pages -d dist"
}
```

4. Run build and them run deploy to create statics files
```bash
npm run build
npm run deploy
```

4. Configurar o git

```bash
git init
git add .
git commit -m "My first commit"
git branch -M main
git remote add origin https://github.com/Leandrohee/portfolio.git
git push -u origin main
```

5. Configure gitpages

Go to your repository on GitHub.
Navigate to Settings > Pages.
Under Source, select the gh-pages branch.
Save the settings.

https://leandrohee.github.io/confere-nf-react/


# Tecnologias usadadas

1. pdfjs-div -> Para ler os pdf. Tive que usar a versão "3.7.107" pq era a unica que tinha um cdn para workers que funcionava.

2. 


# Trocar dados dos fornecedores

Para trocar os dados dos fornecedores é só ir na pasta ./utils/Fornecedores/index.ts

Utilizar a formatacao descrita no arquivo

# Acrescentar e retirar linhas

Para organizar as linhas ir no arquivo ./Context/linhas/linhas.tsx e configurar a variável **titulosLinhas**