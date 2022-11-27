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
        <div class="text-center text-muted mb-4">Select new Skill</div>
        <form role="form">
          <div class="form-group mb-3 has-label">
            <div>
              <label class="form-control-label">Select Skill</label>
            </div>

            <el-autocomplete
              class="inline-input w-100"
              v-model="selectedSkill"
              :fetch-suggestions="filterSelection"
              placeholder="Your skill"
              @select="handleSelect"
              @focus="inputFocused"
            >
              <i class="el-icon-edit el-input__icon" slot="suffix"></i>
              <template slot-scope="{ item }">
                <div class="value">{{ item.name }}</div>
              </template>
            </el-autocomplete>

            <!-- <select class="form-control" id="skillModalList" ref="skill-selector">
              <option v-for="itm in skilListForShow" :key="itm.id">
                {{
                itm.name
                }}
              </option>
            </select>-->
          </div>

          <base-input
            label="Years of Experiences"
            alternative
            class="mb-3"
            v-model="percent"
            type="number"
            min="1"
            max="30"
            @keyup.enter="enterClicked"
          ></base-input>
          <div v-if="showError" class="row">
            <el-alert :title="errorMessage" type="error" show-icon @close="closeError()"></el-alert>
          </div>
          <div class="text-center">
            <base-button type="success" @click="addClicked" class="my-4">
              <i v-if="addingSkill" class="fas fa-circle-notch fa-spin"></i>
              Add
            </base-button>
            <base-button @click="closeModal" type="danger" class="my-4">Cancel</base-button>
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
      default: function () {
        return [];
      },
    },
  },
  data: function () {
    return {
      showError: false,
      errorMessage: "",
      addingSkill: false,
      loading: false,
      activeModal: false,
      allSkills: [],
      skilListForShow: [],
      selectedSkill: "",
      percent: 1,
    };
  },
  methods: {
    enterClicked() {
      this.addClicked();
    },
    closeError() {
      this.showError = false;
      console.log("Close error message");
    },
    getAllFilteredSkills() {
      this.loading = true;
      this.$store
        .dispatch("skill/getAllSkills")
        .then((result) => {
          this.allSkills = result;
          this.skilListForShow = this.filterSkills();
          console.log("filtered skill result: ", this.skilListForShow);
          this.loading = false;
        })
        .catch((err) => {
          console.warn("Failed to load skills", err);
          this.$message({
            message: "Failed loading skills",
            type: "error",
          });
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
        if (itm.skillId == skill.skillId) return true;
      }
      return false;
    },
    closeModal() {
      this.showError = false;
      this.selectedSkill = "";
      this.percent = 1;
      this.$emit("cancel");
    },
    addClicked() {
      this.showError = false;
      if (!this.selectedSkill || this.selectedSkill.trim().length <= 0) {
        this.showError = true;
        this.errorMessage = "Please select a skill";
        return;
      }
      if (this.percent > 30) {
        this.showError = true;
        this.errorMessage = "years should be less(equal) than 30";
        return;
      }
      if (this.percent < 1) {
        this.showError = true;
        this.errorMessage = "years should be greater(equal) than 1";
        return;
      }
      let selectedOrigIdx = this.findSkillInOrigList(this.selectedSkill);
      let selectedShowIdx = this.findSkillInFilteredList(this.selectedSkill);
      console.log("selectedOrigIdx", selectedOrigIdx);
      console.log("selectedShowIdx", selectedShowIdx);
      if (selectedShowIdx >= 0) {
        this.showError = true;
        this.errorMessage = "selected skill already exist!";
        return;
      }
      if (selectedOrigIdx < 0) {
        this.addingSkill = true;
        this.showError = false;
        this.$store
          .dispatch("skill/createSkill", {
            name: this.selectedSkill,
          })
          .then((res) => {
            console.log("new Skill successfully created", res);
            this.updateSkillsOfProfile(res);
          })
          .catch((err) => {
            console.warn("Failed creating new Skill", err);
            this.$message({
              message: "Failed creating new Skill",
              type: "error",
            });
            this.showError = true;
            this.errorMessage = "Failed creating new Skill";
          });
      } else {
        this.updateSkillsOfProfile(this.allSkills[selectedOrigIdx]);
      }
    },
    updateSkillsOfProfile(skill) {
      this.addingSkill = true;
      this.showError = false;
      console.log("Try to Update profile with skill: ", skill);
      console.log("Try to Update profile with skill ID: ", skill.skillId);
      this.$store
        .dispatch("user/addSkill", {
          skillId: skill.skillId,
          percent: this.percent,
        })
        .then(() => {
          console.log("successfully saved");
          this.addingSkill = false;
          this.$message({
            message: "successfully saved",
            type: "success",
          });
          this.$emit("addSkill", skill);
          this.selectedSkill = "";
          this.percent = 1;
        })
        .catch((err) => {
          console.warn("Failed saving edited profile", err);
          this.showError = true;
          this.errorMessage = err.errorMessage;
          this.addingSkill = false;
        });
    },
    findSkillInOrigList(skillName) {
      for (let idx in this.allSkills) {
        let skill = this.allSkills[idx];
        if (skill.name.trim().toLowerCase() == skillName.trim().toLowerCase())
          return idx;
      }
      return -1;
    },
    findSkillInFilteredList(skillName) {
      for (let idx in this.outSkills) {
        let skill = this.outSkills[idx];
        if (skill.name.trim().toLowerCase() == skillName.trim().toLowerCase())
          return idx;
      }
      return -1;
    },
    filterSelection(queryString, cb) {
      let results = queryString
        ? this.skilListForShow.filter(this.createFilter(queryString))
        : this.skilListForShow;
      cb(results);
    },
    createFilter(queryString) {
      return (itm) => {
        return itm.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0;
      };
    },
    handleSelect(itm) {
      this.selectedSkill = itm.name;
    },
    inputFocused() {
      this.errorMessage = "";
      this.showError = false;
    },
  },
  mounted() {
    this.getAllFilteredSkills();
  },
  watch: {
    showModal: function (newVal) {
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
