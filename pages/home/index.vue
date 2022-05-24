<template>
  <main
    class="
      w-screen
      h-auto
      min-h-screen
      flex flex-column
      align-items-center
      justify-content-start
    "
  >
    <section
      class="
        banner
        w-screen
        flex flex-row
        align-items-center
        justify-content-center
      "
    >
      <div
        class="
          banner-info
          flex flex-row
          align-items-center
          justify-content-center
        "
      >
        <div
          class="
            info-content
            flex flex-column
            align-items-start
            justify-content-center
          "
        >
          <img class="fadeClass" :src="banner.logo" alt="Movie Logo" />
          <div
            class="
              fadeClass
              rating
              flex flex-row
              align-items-center
              justify-content-start
            "
          >
            <i class="m-1 w-auto pi pi-star-fill"></i>
            <i class="m-1 w-auto pi pi-star-fill"></i>
            <i class="m-1 w-auto pi pi-star-fill"></i>
            <i class="m-1 w-auto pi pi-star-fill"></i>
            <i class="m-1 w-auto pi pi-star-fill"></i>
            <span>2016 2 temporadas</span>
          </div>
          <p class="fadeClass" v-if="banner.description">
            {{ banner.description }}
          </p>
        </div>
      </div>

      <img class="logoManflix fadeClass" src="manflix.png" alt="Logo" />

      <div class="banner-image">
        <img
          v-show="banner.image"
          class="fadeClass"
          :src="banner.image"
          alt="Movie Image"
        />
      </div>
    </section>

    <section
      class="
        movies
        w-screen
        h-auto
        flex flex-column
        align-items-start
        justify-content-center
      "
    >
     
      <!-- LISTAGEM CATEGORIA AÇÃO -->
      <h3 class="ml-3">Ação</h3>
      <div class="movies-category">
        <section
          v-for="index in noSection"
          :key="index"
          :id="'section' + index"
        >
          <a :href="'#section' + (index - 1 <= 0 ? noSection : index - 1)">
            <div class="arrowContainer">&#8592;</div>
          </a>
          <div
            v-for="subIndex in noItems"
            :key="subIndex"
            class="item"
            @click="
              () => {
                banner.image =
                  $store.state.BASE_URL +
                  movies[2].movies[(index - 1) * noItems + (subIndex - 1)]
                    .banner;

                banner.logo =
                  $store.state.BASE_URL +
                  movies[2].movies[(index - 1) * noItems + (subIndex - 1)].logo;

                banner.description =
                  movies[2].movies[
                    (index - 1) * noItems + (subIndex - 1)
                  ].descricao;
              }
            "
          > 
            <!-- <button class="fav">Favorito</button> -->
            <img
              v-if="movies[2] !== undefined"
              :src="
                $store.state.BASE_URL +
                movies[2].movies[(index - 1) * noItems + (subIndex - 1)].foto
              "
            />
          </div>

          <a :href="'#section' + (index + 1 > noSection ? 1 : index + 1)">
            <div class="arrowContainer">&#8594;</div>
          </a>
        </section>
      </div>
    </section>
  </main>
</template>

<script>
export default {
  name: "home",
  //middleware: 'auth', //proteger essa tela somente para usuario logado
  data() {
    return {
      banner: {
        image:
          "https://files.tecnoblog.net/wp-content/uploads/2022/02/demolidor-edited.jpeg",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Daredevil_Logo.svg/1280px-Daredevil_Logo.svg.png",
        description:
          "Matt Murdock foi vítima de um acidente que o deixou cego quando adolescente, mas que também o dotou de superpoderes sensoriais.",
      },
      movies: [],
      categories: [],
      noSection: 2,
      noItems: 4,
    };
  },
  methods: {
    getCategories: async function () {
      await this.$axios
        .get(this.$store.state.BASE_URL + "/categoria")
        .then((response) => {
          console.log("categories:", response.data);
          this.categories = response.data;
        })
        .catch((error) => {
          console.log("categories ERRO!", error);
        });
    },
    getMovie: async function () {
      this.categories.map((category) => {
        this.$axios
          .get(this.$store.state.BASE_URL + "/filmes?categoria=" + category.id)
          .then((response) => {
            console.log(response.data);
            this.movies.push({
              category: category,
              movies: response.data,
            });
            console.log("this.movies", this.movies);
          })
          .catch((error) => {
            console.log(error);
          });
      });
    },
  },

  async created() {
    await Promise.all([this.getCategories()]);
    this.getMovie();
  },
};
</script>

<style lang="scss" scoped>
$height-banner: 52vh;
$width-banner-image: 55vw;

main {
  background-color: var(--background-banner);
  color: var(--placeholder-field-color);

  .banner {
    height: $height-banner;
    background-color: var(--background-banner);

    .logoManflix {
      position: absolute;
      top: 10px;
      right: 50vw;
      width: 105px;
      height: 65px;
      z-index: 100;
    }

    .banner-info {
      height: 100%;
      width: calc(100vw - $width-banner-image);

      .info-content {
        //  background-color: green;
        width: 80%;
        height: 80%;
        img {
          width: 150px;
          height: 80px;
        }
        i {
          color: var(--background-btn-color);
        }
      }
    }
    .banner-image {
      height: 100%;
      width: $width-banner-image;
      img {
        width: 100%;
        height: 100%;
        -webkit-mask-image: linear-gradient(
          to right,
          transparent 0%,
          black 11%
        );
        mask-image: linear-gradient(to right, transparent 0%, black 11%);
      }
    }
  }

  .movies {
    $itemGrow: 1.2;
    $duration: 250ms;

    min-height: calc(100vh - $height-banner);
    // background-color: yellow;
    scroll-behavior: smooth;

    .movies-category {
      display: grid;
      grid-template-columns: repeat(3, 100%);
      overflow: hidden;
      scroll-behavior: smooth;

      section {
        width: 100%;
        position: relative;
        display: grid;
        grid-template-columns: repeat(4, auto);
        margin: 20px 0;

        .item {
          cursor: pointer;
          padding: 0 2px;
          transition: $duration all;
          &:hover {
            margin: 0 40px;
            transform: scale($itemGrow);
          }

          img {
            height: 330px;
            /* max-width: 300px; */
          }
        }

        a {
          position: absolute;
          color: white;
          text-decoration: none;
          font-size: 5rem;
          background-color: black;
          width: 80px;
          height: 330px;
          padding: 20px;
          text-align: center;
          z-index: 1;

          &:nth-of-type(1) {
            top: 0;
            bottom: 0;
            left: 0;
            background: linear-gradient(
              -90deg,
              rgba(0, 0, 0, 0) 0%,
              rgba(0, 0, 0, 1) 100%
            );
          }
          &:nth-of-type(2) {
            top: 0;
            bottom: 0;
            right: 0;
            background: linear-gradient(
              90deg,
              rgba(0, 0, 0, 0) 0%,
              rgba(0, 0, 0, 1) 100%
            );
          }

          .arrowContainer {
            /* background-color: red; */
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }
        }
      }
    }
  }
}

.fadeClass {
  animation: fadeIn 6s;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.fav{
  /* position: absolute; */
  bottom: 20px;
  /* bottom: 0;
  right: 0;
  left: 0; */
  width: 50px;
  height: 50px;
}
</style>
