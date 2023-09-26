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
            console.log(this.listaProdutos)
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