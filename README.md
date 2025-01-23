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

# How to deploy this project on the github pages

1. Config the vite.config.ts to match the repository name
```ts
export default defineConfig({
  plugins: [react()],
  base: '/confere-nf-react/',     //My repository name ->  https://github.com/Leandrohee/confere-nf-react
});
```

2. Install dependencies gh-pages
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