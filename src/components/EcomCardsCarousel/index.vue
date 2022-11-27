<template>
  <mdb-container>
    <section
      v-if="items && items.length > 0"
      class="text-center my-5 animated  fadeInUp"
    >
      <h4 class="my-4 h2 card-title">
        Top Users
      </h4>
      <vue-slick-carousel
        v-bind="settings"
        class="carousel-container"
      >
        <div
          v-for="(itm, idx) in items"
          :key="idx"
          class="px-3 no-outline-focus"
        >
          <ecom-card :card-data="itm" />
        </div>
      </vue-slick-carousel>
    </section>
  </mdb-container>
</template>

<script>
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
import { mdbContainer } from "mdbvue";
import EcomCard from "@/components/EcomCard";

export default {
  name: "EcomCardsCarousel",
  components: {
    mdbContainer,
    VueSlickCarousel,
    EcomCard,
  },
  directives: {
    // animateOnScroll,
  },
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  data: function() {
    return {
      settings: {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 0,
        focusOnSelect: false,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      },
    };
  },
  computed: {},
};
</script>

<style lang="scss" scoped>
.row-equal {
  ::v-deep > div[class*="col-"] {
    display: flex;
    flex: 1 0 auto;
  }
  ::v-deep {
    .card {
      width: 100%;
    }
  }
  &.active,
  &.next,
  &.prev {
    display: flex;
  }
}

::v-deep .slick-arrow {
  &::before {
    color: #2342a4;
  }
}

::v-deep li.slick-active {
  button {
    &::before {
      font-size: 10px;
      color: #2342a4;
    }
  }
}

::v-deep div.slick-slide {
  & > div {
    &:focus {
      outline: none;
    }
  }
}
::v-deep div.slick-track {
  &:focus {
    outline: none;
  }
}
.no-outline-focus {
  &:focus {
    outline: none;
  }
}
</style>
