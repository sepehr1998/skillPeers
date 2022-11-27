<template>
  <div class="dropdown-container">
    <div
      class="dropdown-toggler-container"
      @click="toggleDropdown()"
    >
      <slot name="dropdown-button" />
    </div>
    <input
      ref="dropdown-check-box"
      type="checkbox"
      class="dropdown-check-box"
      hidden
    >

    <div class="dropdown-menu-list">
      <span
        v-for="(itm, idx) in items"
        :key="idx"
        @click="handleItemClicked(itm.click)"
      >{{ itm.title }}</span>
    </div>
  </div>
</template>
<script>
import { isFunction } from "@/utils";
export default {
  name: "DropDown",
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  mounted() {
    document.addEventListener("click", this.close);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.close);
  },
  methods: {
    toggleDropdown() {
      console.log("is active --> ", this.$refs["dropdown-check-box"].checked);
      this.$refs["dropdown-check-box"].checked = !this.$refs[
        "dropdown-check-box"
      ].checked;
    },
    close(e) {
      if (!this.$el.contains(e.target)) {
        this.$refs["dropdown-check-box"].checked = false;
      }
    },
    handleItemClicked(fn) {
      if (fn && isFunction(fn)) {
        fn();
        this.$refs["dropdown-check-box"].checked = false;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.dropdown-toggler-container {
  cursor: pointer;
}
.dropdown-menu-list {
  display: none;
  flex-direction: column;
  border-radius: 4px;
  margin-top: 8px;
  width: 160px;
  padding: 10px;
  box-shadow: 0 0 5px -1px rgba(0, 0, 0, 0.3);
  background: #fafafa;
  transform-origin: top left;
  position: absolute;
  right: 5px;
}

.dropdown-menu-list span {
  padding: 10px;
  flex-grow: 1;
  width: 100%;
  box-sizing: border-box;
  text-align: center;
  cursor: pointer;
  transition: background 0.3s ease;
}

.dropdown-menu-list span:last-child {
  border: none;
}

.dropdown-menu-list span:hover {
  background: #eee;
}

.dropdown-check-box:checked + .dropdown-menu-list {
  display: flex;
  // animation: openDropDown 0.4s ease;
}

@keyframes openDropDown {
  // from { transform: rotateX(50deg); }
  // to { transform: rotateX(0deg); }
}
</style>
