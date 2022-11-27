<template>
  <modal
    :show.sync="activeModal"
    @close="closeModal"
    body-classes="p-0"
    modal-classes="modal-dialog-centered modal-md"
  >
    <div>
      <card
        type="secondary"
        shadow
        header-classes="bg-white pb-5"
        body-classes="px-lg-5 "
        class="border-0"
      >
        <div class="text-center text-muted mb-4">Add New Education</div>
        <form role="form">
          <div class="form-group mb-3 has-label">
            <div class="row">
              <div class="col-5 p-0">
                <div class="form-group has-label">
                  <label class="form-control-label">start Date</label>
                  <flat-pickr
                    class="form-control form-control-alternative custom-flat-pickr"
                    alternative
                    v-model="start"
                    placeholder="Start Time"
                    @keyup.enter="enterClicked"
                  ></flat-pickr>
                </div>
              </div>
              <div class="col-2 text-center my-auto">-</div>
              <div class="col-5 p-0">
                <div class="form-group has-label">
                  <label class="form-control-label">End Date</label>
                  <flat-pickr
                    class="form-control form-control-alternative custom-flat-pickr"
                    alternative
                    v-model="end"
                    placeholder="End Time"
                    @keyup.enter="enterClicked"
                  ></flat-pickr>
                </div>
              </div>
            </div>
            <div class="row">
              <base-input
                class="w-100"
                alternative
                label="Description"
                placeholder="Description"
                input-classes="form-control-alternative"
                @keyup.enter="enterClicked"
                v-model="university"
                type="text"
              />
            </div>

            <div v-if="showError" class="row">
              <el-alert :title="errorMessage" type="error" show-icon @close="closeError()"></el-alert>
            </div>
            <div class="row">
              <base-button type="success" @click="addClicked" class="my-4">
                <i v-if="addingNewEducation" class="fas fa-circle-notch fa-spin"></i>
                Add
              </base-button>
              <base-button @click="closeModal" type="danger" class="my-4">Cancel</base-button>
            </div>
          </div>
        </form>
      </card>
    </div>
  </modal>
</template>
<script>
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
export default {
  name: "AddNewEducationModal",
  components: {
    flatPickr,
  },
  props: {
    showModal: {
      type: Boolean,
      default: false,
    },
  },
  data: function () {
    return {
      showError: false,
      errorMessage: "",
      addingNewEducation: false,
      activeModal: false,

      end: null,
      start: null,
      university: "",
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
    resetVals() {
      this.end = null;
      this.start = null;
      this.university = "";
    },
    closeModal() {
      this.showError = false;
      this.resetVals();
      this.$emit("cancel");
    },
    addClicked() {
      this.showError = false;
      if (this.validateForm()) {
        this.addingNewEducation = true;

        let newEducation = {
          departure: this.end + "T14:09:53.162Z",
          entering: this.start + "T14:09:53.162Z",
          university: this.university,
        };

        console.log("New Updating Education: ", newEducation);

        this.$store
          .dispatch("user/addEducation", newEducation)
          .then(() => {
            console.log("successfully saved");
            this.addingNewEducation = false;
            this.$message({
              message: "successfully saved",
              type: "success",
            });
            this.$emit("addEducation", newEducation);
            this.resetVals();
          })
          .catch((err) => {
            console.warn("Failed adding new Education", err);
            this.errorMessage = err.errorMessage;
            this.showError = true;
            this.addingNewEducation = false;
          });
      }
    },
    validateForm() {
      if (!this.start) {
        this.errorMessage = "Start time should be set.";
        this.showError = true;
        return false;
      } else if (new Date(this.start) > new Date(this.end)) {
        this.errorMessage = "Start date should be greater than end date! ";
        this.showError = true;
        return false;
      }

      if (!this.university || this.university.trim().length <= 0) {
        this.errorMessage = "Description can not be empty!";
        this.showError = true;
        return false;
      }

      return true;
    },
    inputFocused() {
      this.errorMessage = "";
      this.showError = false;
    },
  },
  watch: {
    showModal: function (newVal) {
      this.showError = false;
      this.activeModal = newVal;
    },
  },
};
</script>
<style lang="scss" scoped>
.custom-flat-pickr[readonly]:not(:disabled) {
  background-color: #fff !important;
}
</style>
