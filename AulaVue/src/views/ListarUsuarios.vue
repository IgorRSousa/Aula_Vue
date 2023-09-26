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