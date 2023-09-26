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

Adicione `require('flowbite/plugin')` nos plugins e `"./node_modules/flowbite/**/*.js"` no content do `tailwind.config.js`, vai ficar assim:
    
    /** @type {import('tailwindcss').Config} */
    export default {
      content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
        "./node_modules/flowbite/**/*.js", // <--
      ],
      theme: {
        extend: {},
      },
      plugins: [
        require('flowbite/plugin'), // <--
      ],
      darkMode: 'class',
    }

#### Obs.: Necessários instanciar o plugin no arquivo `App.vue` do projeto. 
      import { onMounted } from 'vue'
      import { initFlowbite } from 'flowbite'
      
      // initialize components based on data attribute selectors
      onMounted(() => {
          initFlowbite();
      })

### Axios

    npm install --save axios vue-axios

Faça o Import. das bibliotecas no arquivo `src/main.js`: 

    import { createApp } from 'vue'
    import './style.css'
    import App from './App.vue'
    import router from './routes'
    import * as Vue from 'vue' // <--
    import axios from 'axios' // <--
    import VueAxios from 'vue-axios' // <--
    
    createApp(App).use(router).use(VueAxios, axios).mount('#app') // <--


### Extensões utilizadas no VSCode

- Vue VSCode Snippets
- Vue Language Features
- Tailwind CSS Extension Pack

## Criando as telas e componentes

Antes de começar vamos limpar tudo que vem por padrão no Vue: 

- `src/components/HelloWorld.vue`, Delete;
- `src/App.vue` fica assim a princípio:

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

#### Garanta que seu `main.js` estará assim: 

    import { createApp } from 'vue'
    import './style.css'
    import App from './App.vue'
    import router from './routes'
    import * as Vue from 'vue'
    import axios from 'axios'
    import VueAxios from 'vue-axios'
    
    createApp(App).use(router).use(VueAxios, axios).mount('#app')


#### Para começar vamos criar uma pasta `views` dentro de `src`

![image](https://github.com/IgorRSousa/Aula_Vue/assets/106490786/0d545beb-b246-42b6-843e-00c5f9e9797d)

#### Certo vamos começas a criar os Componentes

##### Em `src/components/` crie `NavBar/index.vue` e cole: 

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
            <div class="flex flex-wrap items-center justify-between max-w-full p-4 mx-auto">
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
                            <a href="usuarios" :class="this.$route.path === '/usuarios' ? navOn : navOff" >Usuarios</a>
                        </li>
                        <li>
                            <a href="produtos" :class="this.$route.path === '/produtos' ? navOn : navOff" >Produtos</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </template>
    
    <style></style>

#### Ainda em `src/components/` crie `Cadastro/CadastroProduto.vue` e `Cadastro/CadastroUsuario.vue` e cole respectivamente: 

CadastroProduto.vue:

    <script>
    import axios from "axios";
    
    export default {
        data() {
            return {
                emailCad: '',
                produto: '',
                preco: '',
    
                emailjaCadastrado: true,
                butaoOn: false,
    
                styleErrorLabel: "block mb-2 text-sm font-medium text-red-700 dark:text-red-500",
                styleNormalLabel: "block mb-2 text-sm font-medium text-gray-900",
    
                styleErrorInput: "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500",
                styleNormalInput: "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
    
                buttonOn: 'text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800',
                buttonOff: 'text-white bg-blue-400 dark:bg-blue-500 cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2.5 text-center',
            }
        },
    
        methods: {
            async Cadastrar() {
                try {
                    const dados = { "nomeProduto": this.produto, "preco": this.preco, "email":this.emailCad }
                    this.Request = await axios.post('http://localhost:8080/product', dados)
                    alert("Produto registrado!")
                    window.location.reload()
                } catch (error) {
                    alert("Falha no cadastro!")
                }
            },
            
            async verificarEmail() {
                this.dados = await axios.get('http://localhost:8080/user')
                const getEmails = this.dados.data.content.map((X) => X.email)
                if (getEmails.includes(this.emailCad)) {
                    this.emailjaCadastrado = true;
                    this.butaoOn = false;
                } else {
                    this.emailjaCadastrado = false
                    this.butaoOn = true;
                }
    
            },
        },
    
        mounted() {
        },
    }
    </script>
    
    <template>
        <div class="mx-auto w-[80%]">
            <form @submit.prevent="this.Cadastrar()">
                <div class="mb-3">
                    <label :class="[!this.emailjaCadastrado ? this.styleErrorLabel : this.styleNormalLabel]">E-mail</label>
                    <input type="email" v-model="this.emailCad" v-on:change="this.verificarEmail()"
                        :class="[!this.emailjaCadastrado ? this.styleErrorInput : this.styleNormalInput]"
                        placeholder="name@gmail.com" required>
                    <p v-if="!this.emailjaCadastrado" class="mt-1 ml-1 text-sm text-red-600 dark:text-red-500"><span
                            class="font-medium">Oh!</span>
                        Email não foi cadastrado.</p>
                </div>
                <div class="mb-3">
                    <label class="block mb-2 text-sm font-medium text-gray-900">Produto</label>
                    <input type="text" v-model="this.produto"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Maquina de Lavar ..." required>
                </div>
                <div class="mb-3">
                    <label class="block mb-2 text-sm font-medium text-gray-900">Preço</label>
                    <input type="number" step="0.01" v-model="this.preco"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="120.00" required>
                </div>
                <button type="submit" :class="[!this.butaoOn ? this.buttonOn : this.buttonOff]"
                    :disabled="this.butaoOn">Enviar</button>
            </form>
        </div>
    </template>
    
    <style></style>
    
CadastroUsuario.vue:

    <script>
    import axios from 'axios';
    
    export default {
        setup() {
            return {}
        },
        data() {
            return {
                email: '',
                senha: '',
                Confirm: '',
                Request: null,
                dados: {},
    
                emailjaCadastrado: false,
                senhasDiferentes: false,
                butaoOn: true,
    
    
                styleErrorLabel: "block mb-2 text-sm font-medium text-red-700 dark:text-red-500",
                styleNormalLabel: "block mb-2 text-sm font-medium text-gray-900",
                styleErrorInput: "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500",
                styleNormalInput: "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
    
                buttonOn: 'text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800',
                buttonOff: 'text-white bg-blue-400 dark:bg-blue-500 cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2.5 text-center',
            }
        },
    
        methods: {
            async Cadastrar() {
                try {
                    const dados = { "email": this.email, "senha": this.senha }
                    this.Request = await axios.post('http://localhost:8080/user', dados)
                    alert("Cadastro concluido")
                    window.location.reload()
                } catch (error) {
                    alert("Falha no cadastro")
                }
            },
            async verificarEmail() {
                this.dados = await axios.get('http://localhost:8080/user')
                const getEmails = this.dados.data.content.map((X) => X.email)
                if (getEmails.includes(this.email)) {
                    this.emailjaCadastrado = true;
                    this.butaoOn = false;
                } else {
                    this.emailjaCadastrado = false
                    this.butaoOn = true;
                }
    
            },
    
            verificarSinhas(){
                if(this.senha === this.Confirm){
                    this.senhasDiferentes = false
                    this.Cadastrar()
                }else{
                    this.senhasDiferentes = true
                }
            }
        },
    
        mounted() {
        },
    }
    </script>
    
    <template>
        <div class="mx-auto w-[80%]">
            <form @submit.prevent="this.verificarSinhas()">
                <div class="mb-3">
                    <label :class="[this.emailjaCadastrado ? this.styleErrorLabel : this.styleNormalLabel]">E-mail</label>
                    <input type="email" v-model="this.email" v-on:change="this.verificarEmail()"
                        :class="[this.emailjaCadastrado ? this.styleErrorInput : this.styleNormalInput]"
                        placeholder="name@gmail.com" required>
                    <p v-if="this.emailjaCadastrado" class="mt-1 ml-1 text-sm text-red-600 dark:text-red-500"><span
                            class="font-medium">Oh!</span>
                        Email já foi cadastrado.</p>
                </div>
                <div class="mb-3">
                    <label class="block mb-2 text-sm font-medium text-gray-900">Senha</label>
                    <input type="password" v-model="this.senha"
                        :class="[this.senhasDiferentes ? this.styleErrorInput : this.styleNormalInput]" placeholder="123456"
                        required>
                </div>
                <div class="mb-3">
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confimar Senha</label>
                    <input type="password" v-model="this.Confirm"
                        :class="[this.senhasDiferentes ? this.styleErrorInput : this.styleNormalInput]" placeholder="123456"
                        required>
                    <p v-if="this.senhasDiferentes" class="mt-1 ml-1 text-sm text-red-600 dark:text-red-500"><span
                            class="font-medium">Oh!</span>
                        Coloque a senhas compatíveis!</p>
                </div>
                <button type="submit" :class="[this.butaoOn ? this.buttonOn : this.buttonOff]"
                    :disabled="!this.butaoOn">Enviar</button>
            </form>
        </div>
    </template>
    
    <style></style>

#### Configurando rotas: 

No arquivo `src/routes/index.js` crie as rotas para as telas: 

    import { createRouter, createWebHistory } from 'vue-router'
    
    const routes = [
        // Modelo de Rota
        { path: '/', name: "Home", component: () => import('../views/Home.vue')},
        { path: '/cadastro', name: "Cadastro", component: () => import('../views/Cadastro.vue')}, 
        { path: '/usuarios', name: "usuarios", component: () => import('../views/ListarUsuarios.vue')}, 
        { path: '/produtos', name: "produtos", component: () => import('../views/ListarProdutos.vue')}, 
    ]
    const router = createRouter({
        history: createWebHistory(),
        routes,
    })
    
    export default router;

#### Instancie a Navbar no `src/App.vue`:

    <script>
    import navBar from './components/NavBar/index.vue'; // <--
    import { onMounted } from 'vue'
    import { initFlowbite } from 'flowbite'
    
    export default {
      setup() {
        onMounted(() => {
          initFlowbite();
        })
        return {}
      },
    
      components: { navBar } // <--
    }
    </script>
    
    <template>
      <navBar /> // <--
      <RouterView />
    </template>
    
    <style ></style>

### Criação das telas

#### Agora na pasta `src/views` crie 4 arquivos: `Home.vue`, `Cadastro.vue`, `ListarProdutos.vue` e `ListarUsuarios.vue`

#### Home.vue:

    <template>
        <div class="w-[80%] mx-auto">
            <h1 class="text-4xl text-center mt-14">Bem-vindo, ao nosso projeto.</h1>
            <p class="mt-10 text-center">Esse é um projeto de apresentação para um início no desenvolvimento web utilizado Back-end(API) e Front-end(Vue).</p>
        </div>
    </template>
    
    <script>
    export default {
        setup() {
            return {}
        }
    }
    </script>
    
    <style></style>

#### Cadastro.vue:

    <script>
    import CadastroUsuario from '../components/Cadastro/CadastroUsuario.vue';
    import CadastroProduto from '../components/Cadastro/CadastroProduto.vue';
    
    export default {
        setup() {
            return {}
        },
    
        components: {
            CadastroUsuario,
            CadastroProduto,
        },
    
        data() {
            return {
                UsuarioOuProduto: false
            }
        },
    }
    </script>
    
    <template>
        <div class="grid grid-cols-7 gap-4 mt-2">
            <h1 class="col-span-3 text-3xl text-end">Usuarios</h1>
            <label class="relative inline-flex items-center m-3 mx-auto cursor-pointer">
                <input v-model="this.UsuarioOuProduto" type="checkbox" class="sr-only peer">
                <div
                    class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600">
                </div>
            </label>
            <h1 class="col-span-3 text-3xl text-start">Produtos</h1>
        </div>
    
        <CadastroUsuario v-if="!this.UsuarioOuProduto" />
        <CadastroProduto v-if="this.UsuarioOuProduto" />
    </template>
    
    <style></style>

#### ListarProdutos.vue:

    <script>
    import axios from 'axios'
    
    export default {
        data() {
            return {
                listaProdutos: [],
                produto: '',
                preco: '',
                email: '',
                idSelecionado: '',
            }
        },
    
        methods: {
            async Consultar() {
                const dados = await axios.get('http://localhost:8080/product')
                this.listaProdutos = dados.data.content
            },
    
            setEdit(produto, preco, email, id) {
                this.produto = produto
                this.preco = preco
                this.email = email
                this.idSelecionado = id
            },
    
            setDelete(id) {
                this.idSelecionado = id
            },
    
            async salvarEdit(id) {
                const dados = { 'nomeProduto': this.produto, 'preco': this.preco, 'email':  this.email}
    
                this.produto = ''
                this.preco = ''
                this.idSelecionado = ''
    
                const resposta = await axios.put('http://localhost:8080/product/' + id, dados)
                this.Consultar()
            },
    
            async delete(id) {
                const resposta = await axios.delete('http://localhost:8080/product/' + id)
                this.Consultar();
            }
        },
        mounted() {
            this.Consultar();
        },
    }
    </script>
    
    <template>
        <!-- Listagem -->
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg mx-auto w-[80%] mt-10">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-50 uppercase bg-[#4B5563] dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            Produto
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Preço
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Responsável
                        </th>
                        <th scope="col" class="px-6 py-3">
                            <span class="sr-only">Editar</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="produto in this.listaProdutos"
                        class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {{ produto.nomeProduto }}
                        </th>
                        <td class="px-6 py-4">
                            {{ produto.preco }}
                        </td>
                        <td class="px-6 py-4">
                            {{ produto.email.email }}
                        </td>
                        <td class="px-6 py-4 text-right">
                            <a href="#" v-on:click="this.setEdit(produto.nomeProduto, produto.preco, produto.email.email, produto.id)"
                                class="mx-2 font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                data-modal-target="staticModal" data-modal-toggle="staticModal">Editar</a>
                            <a href="#" v-on:click="this.setDelete(produto.id)"
                                class="mx-2 font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                data-modal-target="popup-modal" data-modal-toggle="popup-modal">Deletar</a>
                        </td>
                    </tr>
                </tbody>
            </table>
            <!-- Modal editar -->
            <div id="staticModal" tabindex="-1" aria-hidden="true"
                class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div class="relative w-full max-w-2xl max-h-full">
                    <!-- Modal content -->
                    <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <!-- Modal header -->
                        <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                                Modo de Edição
                            </h3>
                            <button type="button"
                                class="inline-flex items-center justify-center w-8 h-8 ml-auto text-sm text-gray-400 bg-transparent rounded-lg hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                                data-modal-hide="staticModal">
                                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                                    viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span class="sr-only">Close modal</span>
                            </button>
                        </div>
                        <!-- Modal body -->
                        <div class="p-6 space-y-6">
                            <div class="">
                                <label class="block mb-2 text-sm font-medium text-gray-900">Produto</label>
                                <input type="text" v-model="this.produto"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="name@gmail.com" required>
                            </div>
                            <div class="">
                                <label class="block mb-2 text-sm font-medium text-gray-900">Preço</label>
                                <input type="text" v-model="this.preco"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="123456" required>
                            </div>
                        </div>
                        <!-- Modal footer -->
                        <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                            <button data-modal-hide="staticModal" type="button" v-on:click="salvarEdit(this.idSelecionado)"
                                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Salvar</button>
                            <button data-modal-hide="staticModal" type="button"
                                class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Modal deletar -->
            <div id="popup-modal" tabindex="-1"
                class="fixed top-0 left-0 right-0 z-50 hidden p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div class="relative w-full max-w-md max-h-full">
                    <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <button type="button"
                            class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            data-modal-hide="popup-modal">
                            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span class="sr-only">Close modal</span>
                        </button>
                        <div class="p-6 text-center">
                            <svg class="w-12 h-12 mx-auto mb-4 text-gray-400 dark:text-gray-200" aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Você tem certeza que deseja
                                deletar esse Produto?</h3>
                            <button data-modal-hide="popup-modal" type="button" v-on:click="this.delete(this.idSelecionado)"
                                class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                                Sim, eu tenho
                            </button>
                            <button data-modal-hide="popup-modal" type="button"
                                class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Não,
                                cancelar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </template>
    
    <style lang="scss" scoped></style>

#### ListarUsuarios.vue:

    <script>
    import axios from 'axios'
    
    export default {
        data() {
            return {
                listaUsuarios: [],
    
                email: '',
                senha: '',
                idSelecionado: '',
    
                emailjaCadastrado: false,
                butaoOn: true,
    
    
                styleErrorLabel: "block mb-2 text-sm font-medium text-red-700 dark:text-red-500",
                styleNormalLabel: "block mb-2 text-sm font-medium text-gray-900",
                styleErrorInput: "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500",
                styleNormalInput: "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
    
                buttonOn: 'text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800',
                buttonOff: 'text-white bg-blue-400 dark:bg-blue-500 cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2.5 text-center',
    
                modalOn: false,
            }
        },
    
        methods: {
            async Consultar() {
                const dados = await axios.get('http://localhost:8080/user')
                this.listaUsuarios = dados.data.content
            },
    
            setEdit(email, senha, id) {
                this.emailjaCadastrado = false
                this.butaoOn = true
                this.email = email
                this.senha = senha
                this.idSelecionado = id
            },
    
            setDelete(id) {
                this.idSelecionado = id
            },
    
            async verificarEmail() {
                this.dados = await axios.get('http://localhost:8080/user')
                const getEmails = this.dados.data.content.map((X) => X.email)
                if (getEmails.includes(this.email)) {
                    this.emailjaCadastrado = true;
                    this.butaoOn = false;
                } else {
                    this.emailjaCadastrado = false
                    this.butaoOn = true;
                }
    
            },
    
            async salvarEdit(id) {
                const dados = { 'email': this.email, 'senha': this.senha }
    
                this.email = ''
                this.senha = ''
                this.idSelecionado = ''
    
                const resposta = await axios.put('http://localhost:8080/user/' + id, dados)
                this.Consultar()
            },
    
            async delete(id) {
                const resposta = await axios.delete('http://localhost:8080/user/' + id)
                this.Consultar();
            }
        },
        mounted() {
            this.Consultar();
        },
    }
    </script>
    
    <template>
        <!-- Listagem -->
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg mx-auto w-[80%] mt-10">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-50 uppercase bg-[#4B5563] dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            E-mail
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Senha
                        </th>
                        <th scope="col" class="px-6 py-3">
                            <span class="sr-only">Editar</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="usuario in this.listaUsuarios"
                        class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {{ usuario.email }}
                        </th>
                        <td class="px-6 py-4">
                            {{ usuario.senha }}
                        </td>
                        <td class="px-6 py-4 text-right">
                            <a href="#" v-on:click="this.setEdit(usuario.email, usuario.senha, usuario.userId)"
                                class="mx-2 font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                data-modal-target="staticModal" data-modal-toggle="staticModal">Editar</a>
                            <a href="#" v-on:click="this.setDelete(usuario.userId)"
                                class="mx-2 font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                data-modal-target="popup-modal" data-modal-toggle="popup-modal">Deletar</a>
                        </td>
                    </tr>
                </tbody>
            </table>
            <!-- Main modal edit -->
            <div id="staticModal" tabindex="-1" aria-hidden="true"
                class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div class="relative w-full max-w-2xl max-h-full">
                    <!-- Modal content -->
                    <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <!-- Modal header -->
                        <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                                Modo de Edição
                            </h3>
                            <button type="button"
                                class="inline-flex items-center justify-center w-8 h-8 ml-auto text-sm text-gray-400 bg-transparent rounded-lg hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                                data-modal-hide="staticModal">
                                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                                    viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span class="sr-only">Close modal</span>
                            </button>
                        </div>
                        <!-- Modal body -->
                        <div class="p-6 space-y-6">
                            <div class="">
                                <label
                                    :class="[this.emailjaCadastrado ? this.styleErrorLabel : this.styleNormalLabel]">E-mail</label>
                                <input type="email" v-model="this.email" v-on:change="this.verificarEmail()"
                                    :class="[this.emailjaCadastrado ? this.styleErrorInput : this.styleNormalInput]"
                                    placeholder="name@gmail.com" required>
                                <p v-if="this.emailjaCadastrado" class="mt-1 ml-1 text-sm text-red-600 dark:text-red-500"><span
                                        class="font-medium">Oh!</span>
                                    Email já foi cadastrado.</p>
                            </div>
                            <div class="">
                                <label class="block mb-2 text-sm font-medium text-gray-900">Senha</label>
                                <input type="text" v-model="this.senha" :class="[this.styleNormalInput]" placeholder="123456"
                                    required>
                            </div>
                        </div>
                        <!-- Modal footer -->
                        <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                            <button data-modal-hide="staticModal" type="button" v-on:click="salvarEdit(this.idSelecionado)"
                                :class="[this.butaoOn ? this.buttonOn : this.buttonOff]"
                                :disabled="!this.butaoOn">Salvar</button>
                            <button data-modal-hide="staticModal" type="button"
                                class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>
    
            <div id="popup-modal" tabindex="-1"
                class="fixed top-0 left-0 right-0 z-50 hidden p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div class="relative w-full max-w-md max-h-full">
                    <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <button type="button"
                            class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            data-modal-hide="popup-modal">
                            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span class="sr-only">Close modal</span>
                        </button>
                        <div class="p-6 text-center">
                            <svg class="w-12 h-12 mx-auto mb-4 text-gray-400 dark:text-gray-200" aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Você tem certeza que deseja
                                deletar esse Produto?</h3>
                            <button data-modal-hide="popup-modal" type="button" v-on:click="this.delete(this.idSelecionado)"
                                class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                                Sim, eu tenho
                            </button>
                            <button data-modal-hide="popup-modal" type="button"
                                class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Não,
                                cancelar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </template>
    
    <style lang="scss" scoped></style>
