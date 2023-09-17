# Curso de Front-end com Vue
### Instalações necessárias do Node Js
Nesse repositória faremos a construção de uma aplicação com Vue 3 então vamos começar!

## Preparando o ambiente

### Criando Projeto Vue
    npm create vite@latest

Configurações escolhidas: 
- Project name: AulaVue
- Package name: AulaVue
- Select a framework: Vue
- Select a variant: JavaScript

Agora rode os seguintes comandos:

    cd AulaVue
    npm install
    npm run dev
Estrutura de pasta Criada: 

![image](https://github.com/IgorRSousa/Aula_Vue/assets/106490786/c41b311f-dc27-48d3-8e7a-86b0a48d2c04)


### Instalando e configurando os pacotes necessários

#### Vue-Router

    npm install vue-router

Agora dentro de `src` crie uma pasta routes: `/src/routes`, e dentro dela cria um arquivo `index.js`.

No `/src/routes/index.js` cole o seguinte codigo:

    import { createRouter, createWebHistory } from 'vue-router'

    const About = { template: '<div>About</div>' }
    
    const routes = [
        // Modelo de Rota
        // { path: '/', name: "Home", component: () => import('../views/home.vue')}, 
    ]
    const router = createRouter({
        history: createWebHistory(),
        routes,
    })
    
    export default router;

Agora no `src/main.js` import as rotas:

    import router from './routes'

E mande o App usa-lo:

    createApp(App).use(router).mount('#app')

### esLint

    npm install eslint -D
    npx eslint --init
Apos a instalação aparecera um arquivo `.eslintrc.cjs` na Raiz do projeto, na linha 9, troque `"plugin:vue/vue3-essential"` por `"plugin:vue/vue3-recommended"`

![image](https://github.com/IgorRSousa/Aula_Vue/assets/106490786/fd12b78a-5b8d-42f9-8aa5-36ad6154d9d5)

### TailWindCss

    npm install -D tailwindcss postcss autoprefixer
    npx tailwindcss init -p

Um arquivo `tailwind.config.js`será criado na raiz do projeto nele coloque o seguinte codigo: 

    /** @type {import('tailwindcss').Config} */
    export default {
      content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
      ],
      theme: {
        extend: {},
      },
      plugins: [],
    }
Em `src/style.css` Apague tudo e cole: 
    
    @tailwind base;
    @tailwind components;
    @tailwind utilities;

### Flow bite

    npm install flowbite

Adicione `require('flowbite/plugin')` nos plugins e `"./node_modules/flowbite/**/*.js"` no content do `TailWindCss`, vai ficar assim:
    
    /** @type {import('tailwindcss').Config} */
    export default {
      content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
        "./node_modules/flowbite/**/*.js",
      ],
      theme: {
        extend: {},
      },
      plugins: [
        require('flowbite/plugin'),
      ],
      darkMode: 'class',
    }
