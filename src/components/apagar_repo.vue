<template>
  <div class="repo">
    <div class="titulo" @click="show = !show">
      <!-- <img src="../assets/files.svg" alt="" /> -->
      <span class="decor"></span>
      <h4>Apagar Um Repositório</h4>
    </div>
    <div class="body" v-if="show">
      <h3>Apagar Repositório</h3>
      <inputCombo
        :input_tit="'Nome do Repositorio'"
        :place="'Nome do Repositório'"
        :tipo="'text'"
        :estado="msg"
        :erro="msg"
        v-model="nomeRepo"
        @input="msg = ''"
      />
      <button @click="apagarRepo()">Apagar Repo</button>
    </div>
  </div>
</template>

<script>
import * as api from "../api/apiCalls.js";
import * as apiServices from "../api/apiServices.js";
import store from "../store/index.js";

import inputCombo from "../components/input_combo.vue";
import router from "../router/index.js";
export default {
  name: "delRepo",
  components: {
    inputCombo,
  },
  data() {
    return {
      show: false,
      nomeRepo: "",
      tema: "",
      msg: "",
    };
  },
  store: store,
  router: router,
  methods: {
    apagarRepo() {
      if (!this.nomeRepo.length) {
        console.log("O nome do repo não deve ser null");
        this.nomeRepo = "Prenche isto aqui sff";
        return null;
      }
      var repo = {
        nome: this.nomeRepo,
      };
      console.log(repo);
      api
        .callEndPoint(apiServices.hosts.documentacao, {
          name: "DropRepositorio",
          params: [
            repo,
            this.$store.state.usr_token ? this.$store.state.usr_token : "",
          ],
        })
        .then((obj) => {
          if (obj.DropRepositorio[0].ok === true) {
            router.go();
          }
          if (obj.DropRepositorio[0].erro !== null) {
            console.log("Erro: ", obj.DropRepositorio[0].erro);
            this.msg = obj.DropRepositorio[0].erro;
          }
        });
    },
  },
};
</script>

<style scoped>
button {
  margin: 0.4rem 0.2rem;
  font-family: "Roboto";
  font-size: 1rem;
  font-weight: bold;
  background-color: gainsboro;
  border-radius: 5px;
  border: none;
  letter-spacing: 1px;
  padding: 0.4rem 0.7rem;
  transition: 0.3s all ease-in,
    0.83s padding cubic-bezier(0.76, 0.2, 0.07, 1.07);
}

button:hover {
  background-color: blueviolet;
  color: white;
  cursor: pointer;
  padding: 0.4rem 24%;
  border-radius: 3px;
}

.body {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  place-items: center;
  justify-content: left;
  text-align: left;
}

h3 {
  margin: 0;
  margin-top: 1rem;
  padding: 0;
}

.repo {
  display: flex;
  flex-direction: column;
  place-items: center;
  background-color: var(--white);
  border-radius: 7px;
  border-left: 10px solid lightgray;
  box-shadow: 8px 8px 18px 0px #dfdfdf;
  transition: 0.33s all ease-in-out, 0.2s translateY ease-in-out;
  margin: auto;
  padding: 0.6rem 0.5rem;
}

.repo:hover {
  box-shadow: 8px 8px 18px 0px #d1d1d1;
  transform: translateX(5px);
}

.repo:hover h4 {
  color: darkgrey;
  text-decoration: underline;
  text-decoration-thickness: 2px;
  text-decoration-color: lightgray;
}

.repo:hover .decor {
  border-color: darkgrey;
}

.titulo {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
  place-items: center;
  gap: 0.7rem;
  margin-right: 0.5rem;
  width: fit-content;
  transition: 0.2s all ease-in;
}

.titulo:hover {
  color: blueviolet;
  cursor: pointer;
}
.titulo:hover h4 {
  cursor: pointer;
}

.decor {
  border: 2px dashed lightgray;
  width: 0.8rem;
  height: 0.8rem;
  transform: rotateZ(-45deg);
  transition: 0.3s all ease-in-out;
}

h2 {
  padding: 0;
  margin: 0;
  color: gray;
}

.titulo img {
  width: 2rem;
}

h4 {
  margin: 0;
  padding: 0;
  font-family: consolas;
  font-weight: 600;
  color: gainsboro;
  font-style: italic;
  text-decoration: underline;
  text-decoration-thickness: 2px;
  text-decoration-color: transparent;
  transition: 0.4s all ease-in-out;
}
</style>
