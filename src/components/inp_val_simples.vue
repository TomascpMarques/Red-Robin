<template>
  <div class="main-wrap1">
    <div class="cont">
      <button @click="emmitDel()">apagar</button>
      <span class="titl">{{ nome }}</span>
      <div class="decor"></div>
      <input
        type="text"
        name="inp"
        :placeholder="plcholder || 'Edit me!'"
        @input="sendValue()"
        v-model="conteudoInp"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "inpValSimples",
  props: ["titulo", "plcholder", "id", "cmpname"],
  data() {
    return {
      nome: this.titulo,
      conteudoInp: "",
    };
  },
  methods: {
    sendValue(event) {
      this.$emit("conteudo", { cont: this.conteudoInp, key: this.nome });
    },
    emmitDel() {
      this.conteudoInp = "";
      this.$emit("delete", {
        name: this.cmpname,
        id: this.id,
        key: this.titulo,
      });
    },
  },
};
</script>

<style scoped>
.cont {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  place-items: center;
  gap: 0.3rem;
  margin-left: 0.3rem;
  max-height: -webkit-min-content;
  max-height: -moz-min-content;
  max-height: min-content;
  align-items: baseline;
  flex-wrap: wrap;
  word-wrap: break-word;
  word-break: break-all;
}

button {
  border: none;
  font-family: "Roboto";
  font-size: 0.9rem;
  letter-spacing: 0.5px;
  font-weight: bold;
  color: lightgray;
  transition: 0.3s all ease-in-out;
  padding: 0;
  margin: 0;
  height: fit-content;
}

button:hover {
  cursor: pointer;
  color: gray;
}

.main-wrap1 {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: flex-start;
  place-items: center;
  gap: 0.3rem;
  border: 2px solid gainsboro;
  margin: 0.1rem;
  box-shadow: 6px 6px 6px 0px gainsboro;
  border-radius: 7px;
  padding: 0.7rem 0.3rem;
  width: 90%;
  height: min-content;
}

.decor {
  padding: 0;
  margin: 0;
  border: 5px solid var(--blue);
  background-color: var(--blue);
  border-radius: 100px;
  margin-right: 0.1rem;
  margin-left: 0.3rem;
}

.cont span {
  font-size: 1rem;
  letter-spacing: 0.6px;
  font-family: "Roboto";
  font-kerning: auto;
  width: fit-content;
  font-weight: bold;
  word-wrap: break-word;
  -webkit-hyphens: auto; /* iOS 4.2+ */
  -moz-hyphens: auto; /* Firefox 5+ */
  -ms-hyphens: auto; /* IE 10+ */
  hyphens: auto;
}

.main-wrap1 input {
  border: none;
  outline: none;
  font-size: 1rem;
  font-family: "Roboto";
  color: #252525;
  transition: 1s all cubic-bezier(0.23, 1, 0.32, 1);
}

input:focus::placeholder {
  transform: translatey(-105%);
}

input::placeholder {
  font-family: "Roboto";
  color: gray;
  letter-spacing: 1px;
  transition: 1s all cubic-bezier(0.23, 1, 0.32, 1);
}
</style>
