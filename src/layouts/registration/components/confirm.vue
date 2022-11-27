<template>
  <div class="container">
    <div class="form-container">
      <div class="confirm-header">
        <router-link class="navbar-brand logo-image cursor-pointer" to="/home" replace>
          <img src="@/assets/home_images/logo-sm-white.png" alt="SkillPeers" />
        </router-link>
        <h1 class="float-left text-white">Email Confirmation</h1>
        <p>Please check your email for the confirmation code</p>
      </div>

      <div class="confirm-body">
        <div class="grey-text w-100">
          <base-input
            alternative
            label="Confirm Code"
            type="Number"
            placeholder="confirm code"
            input-classes="form-control-alternative"
            v-model="confirmCode"
            @focus="inputFocused"
            @keyup.enter="enterClicked"
          />
        </div>

        <div class="row my-3 pl-3">
          <el-alert
            v-if="showMessage"
            :title="message"
            :type="messageType"
            show-icon
            @close="closeError()"
          ></el-alert>
        </div>
        <div class="row pl-2">
          <button
            class="mx-2 px-4"
            :disabled="sendingCode || confirmingCode"
            @click="reSendCode()"
          >
            <i class="fas fa-circle-notch fa-spin" v-if="sendingCode"></i>
            Resend
          </button>
          <button
            class=" mx-2 px-4"
            :disabled="sendingCode || confirmingCode"
            @click="confirm()"
          >
            <i class="fas fa-circle-notch fa-spin" v-if="confirmingCode"></i>
            Confirm
          </button>
        </div>
        <br />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Confirm",
  data: function () {
    return {
      confirmCode: "",
      showMessage: false,
      message: "",
      messageType: "",
      loading: false,
      sendingCode: false,
      confirmingCode: false,
      redirect: "",
    };
  },
  methods: {
    enterClicked() {
      this.confirm();
    },
    closeError() {
      this.showMessage = false;
      console.log("Close error message");
    },
    inputFocused() {
      this.message = "";
      this.showMessage = false;
    },
    reSendCode() {
      this.resetStates();
      console.log("Confirming email: ", this.$store.getters.userEmail);
      this.sendingCode = true;
      this.$store
        .dispatch("user/sendEmailOtp", this.$store.getters.userEmail)
        .then(() => {
          this.messageType = "success";
          this.message = "successfully send the code";
          this.showMessage = true;
          this.sendingCode = false;
        })
        .catch((err) => {
          console.warn(err);
          this.resetStates();
          this.messageType = "error";
          this.message = err.errorMessage;
          this.showMessage = true;
          this.sendingCode = false;
        });
    },
    resetStates() {
      this.sendingCode = false;
      this.confirmingCode = false;
      this.message = "";
      this.showMessage = false;
    },
    confirm() {
      this.resetStates();
      if (!this.confirmCode || this.confirmingCode.length <= 0) {
        this.message = "Confirm code is empty";
        this.messageType = "error";
        this.showMessage = true;
        return;
      }
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
                this.redirectToRequestPage();
              }, 200);
            })
            .catch((err) => {
              console.log("Failed to getinfo data", err);
              this.confirmingCode = false;
              this.messageType = "error";
              this.message = "Unable to get User info. please refresh page;";
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
    redirectToRequestPage() {
      this.$router.push({ path: this.redirect || "/" });
    },
  },
  watch: {
    $route: {
      handler: function (route) {
        const query = route.query;
        if (query) {
          this.redirect = query.redirect;
        }
      },
      immediate: true,
    },
  },
  mounted() {
    this.reSendCode();
  },
};
</script>

<style lang="scss" scoped>
.container {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  width: 450px;
  max-width: 100%;
  min-height: 450px;
}

.form-container {
  position: absolute;
  top: 0;
  height: 100%;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  width: 100%;
}

.confirm-header {
  width: 100%;
  height: 40%;

  background: rgba(35, 66, 164, 1);
  background: -webkit-linear-gradient(
    90deg,
    rgba(61, 121, 176, 1) 11.3%,
    rgba(35, 66, 164, 1) 91.1%
  );
  background: linear-gradient(
    90deg,
    rgba(61, 121, 176, 1) 11.3%,
    rgba(35, 66, 164, 1) 91.1%
  );
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
  color: #ffffff;

  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  flex-direction: column;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  text-align: center;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;

  position: absolute;
  top: 0;
  left: -15px;
}

button {
  border-radius: 20px;
  border: 1px solid rgba(61, 121, 176, 1);
  background-color: rgba(61, 121, 176, 1);
  color: #ffffff;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
  &:focus,
  &:hover {
    background-color: #3d79b0d6;
    outline: none;
    border: 1px solid #3d79b0d6;
  }
}

.confirm-body {
  position: absolute;
  width: 100%;
  top: 50%;
  left: -15px;
  padding: 5px 40px;
}

::v-deep input::-webkit-outer-spin-button,
::v-deep input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.errorMessage {
  color: #ff0033;
}
.successMessage {
  color: #2ecc89;
}
img {
  height: 3.5rem;
}

@media only screen and (max-width: 600px) {
  img {
    /*// width: 4.4375rem;*/
    height: 2.8rem;
  }
}
</style>