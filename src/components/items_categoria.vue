<template>
  <div class="main-wrap">
    <div class="title">
      <div
        @click="showBody = !showBody"
        v-bind:class="[showBody ? 'decor-down' : 'decor-up']"
      ></div>
      <h2 class="black">{{ categoria }}</h2>
      <span>{{ items.length }} items</span>
    </div>
    <br />
    <div class="body" v-if="showBody">
      <div v-for="item in items" :key="item">
        <test :titulo="item.body.nome">
          <div class="list">
            <ul v-for="(prop, key) in item" :key="prop">
              <li>
                <b>{{ key }}</b>
                <div class="point"></div>
                <div class="inner-content" v-if="verifPropIsOBJ(prop)">
                  <div v-for="(item, key) in prop" :key="item">
                    <ul class="inner-list">
                      <li v-if="!verifPropIsOBJ(item)">
                        <span class="key">{{ key }}:</span> {{ item }}
                      </li>
                      <li v-if="verifPropIsOBJ(item)">
                        <section class="listing">
                          <span class="list-tilte-pre">{{ key }}</span>
                          <div v-html="contentTohtml(item)"></div>
                        </section>
                      </li>
                    </ul>
                  </div>
                </div>
                <span v-if="!verifPropIsOBJ(prop)">{{ prop }}</span>
              </li>
            </ul>
          </div>
        </test>
      </div>
    </div>
  </div>
</template>

<script>
import test from "./content_box.vue";

export default {
  name: "itemsCategoria",
  components: {
    test,
  },
  props: ["categoria", "items"],
  data() {
    return {
      showBody: false,
      registos: {},
      content: "<h2>Lorem ipsum<h2/>",
    };
  },
  methods: {
    contentTohtml(obj) {
      try {
        this.run(obj, "");
      } catch (except) {
        return except;
      }
    },
    run(x, template) {
      if (x === null) {
        template += "\n</div>";
        throw template;
      }
      Object.keys(x).forEach((key) => {
        template += '<div class="list-item">\n';
        template += '<span class="list-key-title">\n';
        template += `${key}: \n`;
        template += "</span>\n";
        console.log(typeof x[key], ":>", key);
        if (typeof x[key] === "object") {
          return this.run(x[key], template);
        } else {
          template += '<span class="list-key-value">\n';
          template += `${x[key]}\n`;
          template += "</span>\n";
        }
        template += "\n</div>";
      });
      template += "\n</div>";
      return this.run(null, template);
    },
    verifPropIsOBJ(prop) {
      return typeof prop === "object";
    },
    setUpRegistos() {
      this.items.forEach((registo) => {
        console.log("->", registo);
        this.registos[registo._id] = registo;
      });
    },
  },
  created() {
    this.setUpRegistos();
  },
};
</script>

<style scoped>
.point {
  width: 7px;
  height: 7px;
  border-top: 2px solid salmon;
  border-right: 2px solid salmon;
  transform: rotatez(45deg);
}

.key {
  font-family: consolas;
  font-weight: bold;
  letter-spacing: 0.1px;
}

.list {
  padding-right: 1rem;
  max-height: 32vh;
  overflow-y: auto;
  transition: 0.3s all ease-in-out;
  min-width: 25vw;
}

.list::-webkit-scrollbar {
  width: 7px;
  transition: 0.3s all ease-in-out;
  border-radius: 100px;
}
/* Track */
.list::-webkit-scrollbar-track {
  background-color: gainsboro;
  border-radius: 100px;
}
/* Handle */
.list::-webkit-scrollbar-thumb {
  background-color: lightgray;
  margin-top: 10px;
}

.list ul {
  list-style: none;
  padding: 0.1rem;
  margin: 0.3rem;
  margin-bottom: 0.4rem;
}

ul li {
  display: flex;
  flex-direction: row;
  gap: 0.3rem;
  place-items: center;
  justify-content: flex-start;
  align-items: baseline;
  padding: 0.2rem;
}

.main-wrap {
  display: flex;
  flex-direction: column;
  justify-content: left;
  margin-bottom: 0.8rem;
  margin-left: 1rem;
}

.title {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: center;
  place-items: center;
  align-items: center;
  gap: 0.5rem;
  background-color: white;
  border-left: 7px solid var(--orange);
  color: #202020;
  padding: 0.55rem 0.3rem;
  border-radius: 6px;
  box-shadow: 0px 6px 4px 0px gainsboro;
  z-index: 5;
}

.title span {
  margin-top: 0.3rem;
  cursor: default;
  color: lightgray;
  font-weight: bold;
}

.decor-up {
  z-index: 3;
  margin-left: 0.4rem;
  margin-right: 0.3rem;
  width: 0.7rem;
  height: 0.7rem;
  border-top: 3px solid lightgray;
  border-right: 3px solid lightgray;
  border-color: #c3c3c3;
  transform: rotateZ(45deg);
  transition: 0.25s all ease-in-out;
  -webkit-transform-origin: 50% 50%;
}

.decor-down {
  z-index: 3;
  margin-left: 0.4rem;
  margin-right: 0.3rem;
  width: 0.7rem;
  height: 0.7rem;
  border-top: 3px solid lightgray;
  border-right: 3px solid lightgray;
  border-color: #c3c3c3;
  transform: rotateZ(135deg);
  transition: 0.25s all ease-in-out;
  -webkit-transform-origin: 50% 50%;
}

.decor-down:hover {
  border-color: var(--blue);
  cursor: pointer;
}

.decor-up:hover {
  border-color: var(--blue);
  cursor: pointer;
}

h2 {
  padding: 0;
  margin: 0;
  letter-spacing: 0.6px;
  cursor: default;
}

.body {
  padding: 0.2rem 0.1rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.5rem 0.2rem;
  margin-left: 6px;
}

.black {
  color: #303030;
  letter-spacing: 0px;
}

.black::after {
  content: " estado";
  color: darkgray;
  font-size: 1.1rem;
  letter-spacing: 0.25px;
}

.listing {
  display: flex;
  flex-direction: column;
  justify-content: left;
  gap: 0.2rem;

  border-radius: 6px;
}

.listing div {
  padding: 0.4rem 0.3rem;
}

.listing p {
  padding: 0;
  margin: 0;
}

.list-item {
  display: flex;
  flex-basis: auto;
  flex-direction: row;
  place-items: center;
  justify-content: flex-start;
  align-items: baseline;
}

.list-key-title {
  color: var(--blue);
}

.list-tilte-pre {
  font-weight: bold;
  padding: 0.2rem 0.4rem;
  border-bottom: 1px solid gainsboro;
}

.list-tilte-pre::after {
  content: " estrutura";
  font-size: 0.8rem;
  font-weight: normal;
  color: darkgray;
}

.inner-list {
  border: 2px solid gainsboro;
  border-radius: 5px;
}
</style>
