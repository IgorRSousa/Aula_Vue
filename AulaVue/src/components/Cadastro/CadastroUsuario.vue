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