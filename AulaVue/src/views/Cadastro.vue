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