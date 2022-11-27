<template>
  <modal
    :show.sync="activeModal"
    @close="closeModal"
    body-classes="p-0"
    modal-classes="modal-dialog-centered modal-sm"
  >
    <div v-if="loading">
      <div class="loading-container">
        <i class="fas fa-circle-notch fa-spin fa-5x m-auto"></i>
      </div>
    </div>
    <div v-else>
      <card
        type="secondary"
        shadow
        header-classes="bg-white pb-5"
        body-classes="px-lg-5 py-lg-5"
        class="border-0"
      >
        <div class="text-center text-muted mb-4">
          Select new Skill
        </div>
        <form role="form">
          <div class="form-group mb-3 has-label">
            <label class="form-control-label">
              Select Skill
            </label>
            <select
              class="form-control"
              id="skillModalList"
              ref="skill-selector"
            >
              <option v-for="itm in skilListForShow" :key="itm.id">{{
                itm.name
              }}</option>
            </select>
          </div>

          <base-input
            alternative
            class="mb-3"
            label="Percentage"
            placeholder="75%      (UnderConstruction)"
            disabled
          >
          </base-input>
          <div v-if="showError">
            <span type="danger">Failed adding skill</span>
          </div>
          <div class="text-center">
            <base-button type="success" @click="addClicked" class="my-4">
              <i v-if="addingSkill" class="fas fa-circle-notch fa-spin"></i>
              Add
            </base-button>
            <base-button @click="closeModal" type="danger" class="my-4">
              Cancel
            </base-button>
          </div>
        </form>
      </card>
    </div>
  </modal>
</template>
<script>
export default {
  name: "AddSkillsModal",
  components: {},
  props: {
    showModal: {
      type: Boolean,
      default: false,
    },
    outSkills: {
      type: Array,
      default: function() {
        return [];
      },
    },
  },
  data: function() {
    return {
      showError: false,
      addingSkill: false,
      loading: false,
      activeModal: false,
      allSkills: [],
      skilListForShow: [],
    };
  },
  methods: {
    getAllFilteredSkills() {
      this.loading = true;
      this.$store
        .dispatch("skill/getAllSkills")
        .then((result) => {
          this.allSkills = result;
          console.log("skill result: ", this.allSkills);
          this.skilListForShow = this.filterSkills();
          console.log("filtered skill result: ", this.skilListForShow);
          this.loading = false;
        })
        .catch((err) => {
          console.warn("Failed to load skills", err);
          this.loading = false;
        });
    },
    filterSkills() {
      console.log("filtering skill");
      let res = [];
      for (let itm of this.allSkills) {
        if (!this.isFiltered(itm)) res.push(itm);
      }
      return res;
    },
    isFiltered(skill) {
      for (let itm of this.outSkills) {
        if (itm.id == skill.id) return true;
      }
      return false;
    },
    closeModal() {
      this.showError = false;
      this.$emit("cancel");
    },
    addClicked() {
      this.addingSkill = true;
      this.showError = false;
      let idx = this.$refs["skill-selector"].selectedIndex;
      let skill = this.skilListForShow[idx];

      this.$store
        .dispatch("user/addSkill", skill.id)
        .then(() => {
          console.log("successfully saved");
          this.addingSkill = false;
          this.$emit("addSkill", skill);
        })
        .catch((err) => {
          console.warn("Failed saving edited profile", err);
          this.addingSkill = false;
        });
    },
  },
  mounted() {
    this.getAllFilteredSkills();
  },
  watch: {
    showModal: function(newVal) {
      this.showError = false;
      this.activeModal = newVal;
      this.getAllFilteredSkills();
    },
  },
};
</script>
<style lang="scss" scoped>
.loading-container {
  width: 400px;
  height: 400px;

  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
