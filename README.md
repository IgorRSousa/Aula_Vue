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

### Vue-Router

    npm install vue-router

Agora dentro de `src` crie uma pasta routes: `/src/routes`, e dentro dela cria um arquivo `index.js`.

No `/src/routes/index.js` cole o seguinte código:

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

Agora no `src/main.js` importe as rotas:

    import router from './routes'

E mande o App usá-lo:

    createApp(App).use(router).mount('#app')

### esLint

    npm install eslint -D
    npx eslint --init
Após a instalação aparecera um arquivo `.eslintrc.cjs` na Raiz do projeto, na linha 9, troque `"plugin:vue/vue3-essential"` por `"plugin:vue/vue3-recommended"`

![image](https://github.com/IgorRSousa/Aula_Vue/assets/106490786/fd12b78a-5b8d-42f9-8aa5-36ad6154d9d5)

### TailWindCss

    npm install -D tailwindcss postcss autoprefixer
    npx tailwindcss init -p

Um arquivo `tailwind.config.js` será criado na raiz do projeto nele coloque o seguinte código: 

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

### Flowbite

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

#### Obs.: Necessarios intaciar o plugin no arquivo `App.vue` do projeto. 
      import { onMounted } from 'vue'
      import { initFlowbite } from 'flowbite'
      
      // initialize components based on data attribute selectors
      onMounted(() => {
          initFlowbite();
      })

### Extensões utilizadas no VSCode

- Vue VSCode Snippets
- Vue Language Features
- Tailwind CSS Extension Pack

## Criando as telas e componentes

Para começar vamos criar uma pasta `views` dentro de `src`

![image](https://github.com/IgorRSousa/Aula_Vue/assets/106490786/0d545beb-b246-42b6-843e-00c5f9e9797d)

E agora vamos limpar tudo que vem por padrão no Vue: 
- `src/components/HelloWorld.vue`, Delete;
- `src/App.vue` fica assim:

        <script>
        import { onMounted } from 'vue'
        import { initFlowbite } from 'flowbite'
        
        // initialize components based on data attribute selectors
        onMounted(() => {
            initFlowbite();
        })
        
        export default {
          components: {}
        }
        </script>
        
        <template>
          <RouterView />
        </template>
        
        <style ></style>

Certo vamos começas a criar as telas e Componentes

Em `src/components/` crie `NavBar/index.vue` e cole: 

    <script>
    export default {
        data() {
            return {
                navOn: "block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500",
                navOff: "block py-2 pl-3 pr-4 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent",
            }
        },
    }
    </script>
    
    <template>
        <nav class="bg-gray-600 border-gray-200 dark:bg-gray-900">
            <div class="flex flex-wrap items-center justify-between max-w-screen-xl p-4 mx-auto">
                <a href="/" class="flex items-center">
                    <img src="https://flowbite.com/docs/images/logo.svg" class="h-8 mr-3" alt="Flowbite Logo" />
                    <span class="self-center text-2xl font-semibold text-white whitespace-nowrap dark:text-white">Empresa</span>
                </a>
                <button data-collapse-toggle="navbar-default" type="button"
                    class="inline-flex items-center justify-center w-10 h-10 p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                    aria-controls="navbar-default" aria-expanded="false">
                    <span class="sr-only">Open main menu</span>
                    <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M1 1h15M1 7h15M1 13h15" />
                    </svg>
                </button>
                <div class="hidden w-full md:block md:w-auto" id="navbar-default">
                    <ul
                        class="flex flex-col p-4 mt-4 font-medium bg-gray-600 border border-gray-600 rounded-lg md:p-0 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-gray-600 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li>
                            <a href="/" :class="this.$route.path === '/' ? navOn : navOff">Home</a>
                        </li>
                        <li>
                            <a href="cadastro" :class="this.$route.path === '/cadastro' ? navOn : navOff">Cadastro</a>
                        </li>
                        <li>
                            <a href="listar" :class="this.$route.path === '/listar' ? navOn : navOff" >Listar</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </template>
    
    <style></style>

Com a Navbar criada basta importa-la no `src/App.vue`, declara-la e chamar na tela, ficando assim:
    
    <script>
    import navBar from './components/NavBar/index.vue'; // <-- Import
    import { onMounted } from 'vue'
    import { initFlowbite } from 'flowbite'
    
    onMounted(() => {
      initFlowbite();
    })
    
    export default {
      components: { navBar } // <-- Declare
    }
    </script>
    
    <template>
      <navBar /> <!--Chame -->
      <RouterView />
    </template>
    
    <style ></style>
