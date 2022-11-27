<template>
  <div>
    <modal :show.sync="showModal" body-classes="p-0" modal-classes="modal-dialog-centered modal-xm">
      <card
        type="secondary"
        shadow
        header-classes="bg-white pb-5"
        body-classes="px-lg-5 py-lg-5"
        class="border-0"
      >
        <template>
          <form role="form">
            <base-input
              alternative
              class="mb-3"
              placeholder="Enter code"
              addon-left-icon="fas fa-tags"
              v-model="confirmCode"
            ></base-input>
            <div class="text-center row">
              <div class="col-6">
                <base-button
                  type="primary"
                  class="my-4"
                  :disabled="sendingCode || confirmingCode"
                  @click="sendCode()"
                >
                  <i class="fas fa-circle-notch fa-spin" v-if="sendingCode"></i>
                  Send Code
                </base-button>
              </div>
              <div class="col-6">
                <base-button
                  type="primary"
                  class="my-4 float-left"
                  :disabled="sendingCode || confirmingCode"
                  @click="checkCode()"
                >
                  <i class="fas fa-circle-notch fa-spin" v-if="confirmingCode"></i>
                  Confirm
                </base-button>
              </div>
              <div v-if="showMessage" class="row">
                <el-alert :title="message" :type="messageType" show-icon></el-alert>
              </div>
            </div>
          </form>
        </template>
      </card>
    </modal>
  </div>
</template>
<script>
export default {
  name: "EmailConfirmedModal",
  data: function () {
    return {
      showModal: false,
      sendingCode: false,
      confirmingCode: false,

      loading: false,
      confirmCode: "",
      message: "",
      messageType: "",
      showMessage: false,
    };
  },
  methods: {
    sendCode() {
      this.resetStates();
      this.sendingCode = true;
      this.$store
        .dispatch("user/sendEmailOtp", this.$store.getters.userEmail)
        .then(() => {
          this.messageType = "success";
          this.message = "Please check your email for confirm code.";
          this.showMessage = true;
          this.sendingCode = false;
        })
        .catch((err) => {
          console.warn(err);
          this.messageType = "error";
          this.message = err.errorMessage;
          this.showMessage = true;
          this.sendingCode = false;
        });
    },
    checkCode() {
      this.resetStates();
      if (!this.confirmCode || this.confirmingCode.length <= 0) {
        this.message = "Confirm code is empty";
        this.messageType = "error";
        this.showMessage = true;
        return;
      }
      console.log("Confirm code :", this.confirmCode);
      this.confirmingCode = true;
      this.$store
        .dispatch("user/confirmEmail", this.confirmCode)
        .then(() => {
          this.$store
            .dispatch("user/getInfo")
            .then(() => {
              this.confirmingCode = false;
              this.message = "Successfully confirmed";
              this.messageType == "success";
              this.showMessage = true;
              setTimeout(() => {
                this.resetStates();
                this.showModal = false;
              }, 200);
            })
            .catch((err) => {
              console.log("Failed to getinfo data", err);
              this.confirmingCode = false;
              this.messageType = "error";
              this.message = "Unable to get User info. please restart page;";
              this.showMessage = true;
            });
        })
        .catch((err) => {
          console.log("failed code registration", err);
          this.confirmingCode = false;
          this.messageType = "error";
          this.message = err.errorMessage;
          this.showMessage = true;
        });
    },
    resetStates() {
      this.sendingCode = false;
      this.confirmingCode = false;
      this.message = "";
      this.messageType = "";
      this.showMessage = false;
    },
  },
  watch: {
    showModal: function (val) {
      if (val) this.$store.dispatch("emailConfirmModal/showModal");
      else this.$store.dispatch("emailConfirmModal/hideModal");
    },
  },
  mounted() {
    this.$store.watch(
      (state) => state.emailConfirmModal.showModal,
      (value) => (this.showModal = value)
    );
  },
  destroyed() {
    this.showModal = false;
  },
};
</script>
<style lang="scss" scoped>
.errorMessage {
  color: #ff0033;
}
.successMessage {
  color: #2ecc89;
}
</style>
