<template>
  <mdb-card
    :class="cardClass"
    class="ecom-cards mb-3"
  >
    <mdb-view
      hover
      cascade
    >
      <a href="#!">
        <mdb-card-image
          :src="cardData.image"
          alt="Card image cap"
        />
      </a>
    </mdb-view>
    <mdb-card-body
      class="text-center"
      cascade
    >
      <a
        href
        class="grey-text"
      >
        <h5>{{ cardData.type }}</h5>
      </a>
      <mdb-card-title>
        <strong>
          <a href="#">{{ cardData.title }}</a>
        </strong>
      </mdb-card-title>

      <ul class="rating">
        <li
          v-for="i in [1, 2, 3, 4, 5]"
          :key="i"
        >
          <mdb-icon
            v-if="cardData.stars >= i"
            icon="star"
          />
          <mdb-icon
            v-if="cardData.stars < i"
            far
            icon="star"
          />
        </li>
      </ul>
      <mdb-card-text>
        {{
          truncateText(cardData.comment, this.commentTruncateLength)
        }}
      </mdb-card-text>
    </mdb-card-body>
    <mdb-card-footer
      color="white"
      text-color="black"
      class="px-2"
    >
      <span class="float-left font-weight-bold">
        <strong>{{ cardData.price }}&nbsp;$</strong>
      </span>
      <span class="float-right">
        <a>
          <mdb-tooltip
            trigger="hover"
            :options="{ placement: 'top' }"
          >
            <div class="tooltip">Add to cart</div>
            <mdb-icon
              slot="reference"
              icon="handshake"
              class="grey-text ml-3"
            />
          </mdb-tooltip>
        </a>
        <a>
          <mdb-tooltip
            trigger="hover"
            :options="{ placement: 'top' }"
          >
            <div class="tooltip">Share</div>
            <mdb-icon
              slot="reference"
              icon="share-alt"
              class="grey-text ml-3"
            />
          </mdb-tooltip>
        </a>
        <a class="active">
          <mdb-tooltip
            trigger="hover"
            class="active"
            :options="{ placement: 'top' }"
          >
            <div class="tooltip">Added to watchlist</div>
            <mdb-icon
              slot="reference"
              icon="thumbs-up"
              class="ml-3"
              :class="cardData.liked ? 'green-text' : 'grey-text'"
            />
          </mdb-tooltip>
        </a>
      </span>
    </mdb-card-footer>
  </mdb-card>
</template>

<script>
import {
  mdbCard,
  mdbCardImage,
  mdbCardBody,
  mdbCardTitle,
  mdbCardText,
  mdbCardFooter,
  mdbTooltip,
  mdbView,
  mdbIcon,
} from "mdbvue";
export default {
  name: "EcomCard",
  components: {
    mdbCard,
    mdbCardImage,
    mdbCardBody,
    mdbCardTitle,
    mdbCardText,
    mdbCardFooter,
    mdbTooltip,
    mdbView,
    mdbIcon,
  },
  props: {
    cardData: {
      type: Object,
      required: true,
    },
    cardClass: {
      type: String,
    },
  },
  data: function() {
    return {
      commentTruncateLength: 300,
    };
  },
  methods: {
    truncateText(text, maxLength) {
      let subStr = text.substring(0, maxLength);
      return subStr + "...";
    },
  },
};
</script>

<style lang="scss" scoped>
.ecom-cards {
  height: 500px;
  overflow: hidden;
}
.rating {
  padding: 0;
  color: #ffa000;
  list-style-type: none;
  li {
    display: inline-block;
  }
}
</style>
