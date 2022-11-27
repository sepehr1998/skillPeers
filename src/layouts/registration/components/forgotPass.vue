<template>
  <div class="container pt-1" :class="emaileIsSet?'wide':''">
    <div class="form-container">
      <div class="forgot-header">
        <router-link class="navbar-brand logo-image cursor-pointer" to="/home" replace>
          <img src="@/assets/home_images/logo-sm-white.png" alt="SkillPeers" />
        </router-link>
        <h1 class="float-left text-white">Reset Password</h1>
        <p>You can reset your password by email address</p>
      </div>

      <div class="forgot-body">
        <div class="grey-text w-100">
          <base-input
            v-if="!emaileIsSet"
            alternative
            label="Email"
            type="email"
            placeholder="Email"
            input-classes="form-control-alternative"
            v-model="email"
            @focus="inputFocused"
            @keyup.enter="enterClicked"
          />

          <template v-if="emaileIsSet">
            <base-input
              alternative
              label="Confirm Code*"
              type="Number"
              placeholder="confirm code"
              input-classes="form-control-alternative"
              v-model="confirmCode"
              @focus="inputFocused"
              @keyup.enter="enterClicked"
            />

            <!-- password -->

            <div class="form-group has-label">
              <label class="form-control-label">
                Password
                <span>*</span>
              </label>
              <div class="input-group input-group-alternative form-control-alternative">
                <input
                  placeholder="Password"
                  ref="password"
                  class="form-control"
                  :type="showPassword?'text':'password'"
                  v-model="password"
                  @focus="inputFocused"
                  @keyup.enter="enterClicked"
                />
                <div
                  @click="togglePasswordShow('password')"
                  class="pass-toggler input-group-append"
                >
                  <span class="input-group-text">
                    <i :class="passTogglerIcon"></i>
                  </span>
                </div>
              </div>
              <small :class="strengthColor">{{passStrength}}</small>
            </div>

            <!-- Confirm password -->

            <div class="form-group has-label">
              <label class="form-control-label">
                Re-password
                <span>*</span>
              </label>
              <div class="input-group input-group-alternative form-control-alternative">
                <input
                  placeholder="Confirm Your password"
                  class="form-control"
                  :type="showPassword?'text':'password'"
                  ref="confirm-password"
                  v-model="confirmPassword"
                  @focus="inputFocused"
                  @keyup.enter="enterClicked"
                />
                <div
                  @click="togglePasswordShow('confirm-password')"
                  class="pass-toggler input-group-append"
                >
                  <span class="input-group-text">
                    <i :class="passTogglerIcon"></i>
                  </span>
                </div>
              </div>
            </div>
          </template>
        </div>

        <div class="my-3" v-if="showMessage">
          <el-alert :title="message" :type="messageType" show-icon @close="closeError()"></el-alert>
        </div>

        <div class="d-flex justify-content-center">
          <button
            v-if="!emaileIsSet"
            class="mx-2"
            :disabled="sendingCode || changingPassword"
            @click="reSendCode()"
          >
            <i class="fas fa-circle-notch fa-spin" v-if="sendingCode"></i>
            Send
          </button>
          <button
            v-if="emaileIsSet"
            class="mx-2"
            :disabled="sendingCode || changingPassword"
            @click="back()"
          >Back</button>
          <button
            v-if="emaileIsSet"
            class="mx-2"
            :disabled="sendingCode || changingPassword"
            @click="resetPass()"
          >
            <i class="fas fa-circle-notch fa-spin" v-if="changingPassword"></i>
            Confirm
          </button>
        </div>
        <br />
        <br />
      </div>
    </div>
  </div>
</template>
<script>
import { validateEmail } from "@/utils";
import { checkPwdStrength, getStrengthError } from "@/utils/passChecker";

export default {
  name: "ForgotPassword",
  data: function () {
    return {
      emaileIsSet: false,
      email: "",
      password: "",
      confirmPassword: "",
      confirmCode: "",
      showPassword: false,
      sendingCode: false,
      changingPassword: false,
      showMessage: false,
      messageType: "",
      message: "",
      // ----
      strengthColor: "",
      passStrength: "",
    };
  },
  methods: {
    enterClicked() {
      if (this.emaileIsSet) {
        this.resetPass();
      } else {
        this.reSendCode();
      }
    },
    closeError() {
      this.showMessage = false;
      console.log("Close error message");
    },
    togglePasswordShow(ref) {
      this.showPassword = !this.showPassword;

      this.$nextTick(() => {
        const elm = this.$refs[ref];
        if (elm) elm.focus();
      });
    },
    inputFocused() {
      this.message = "";
      this.showMessage = false;
    },
    reSendCode() {
      this.resetStates();
      if (!this.email && this.email.length <= 0) {
        this.message = "Email field is empty!";
        this.messageType = "error";
        this.showMessage = true;
        return;
      } else if (!validateEmail(this.email)) {
        this.message = "wrong email address!";
        this.messageType = "error";
        this.showMessage = true;
        return;
      }
      this.sendingCode = true;
      this.$store
        .dispatch("user/sendEmailOtp", this.email)
        .then(() => {
          this.messageType = "success";
          this.message = "successfully send the code";
          this.showMessage = true;
          this.sendingCode = false;
          this.emaileIsSet = true;
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
    resetPass() {
      if (!this.email || this.email.length <= 0) {
        this.messageType = "error";
        this.message = "Email is empty!";
        this.showMessage = true;
        return;
      } else if (!validateEmail(this.email)) {
        this.messageType = "error";
        this.message = "wrong email";
        this.showMessage = true;
        return;
      } else if (!this.password || this.password.length <= 0) {
        this.messageType = "error";
        this.message = "password is empty!";
        this.showMessage = true;
        return;
      } else if (this.passStrength == "Weak") {
        this.messageType = "error";
        this.message = getStrengthError(this.password);
        this.showMessage = true;
        return;
      } else if (this.password != this.confirmPassword) {
        this.messageType = "error";
        this.message = "Password and confirmed password not matched!";
        this.showMessage = true;
        return;
      }
      this.changingPassword = true;
      let data = {
        code: this.confirmCode,
        newPassword: this.password,
        newPasswordConfirm: this.confirmPassword,
        username: this.email,
      };
      this.$store
        .dispatch("user/restPassword", data)
        .then(() => {
          this.resetStates();
          this.message = "successfully  reset password.";
          this.messageType = "success";
          this.showMessage = true;
          setTimeout(() => {
            this.$router.replace("/registration");
          }, 300);
        })
        .catch((err) => {
          console.warn("Failed reset pass", err);
          this.resetStates();
          this.message = err.errorMessage;
          this.messageType = "error";
          this.showMessage = true;
        });
    },
    resetStates() {
      this.sendingCode = false;
      this.changingPassword = false;
      this.message = "";
      this.showMessage = false;
    },
    back() {
      this.emaileIsSet = false;
      this.resetStates();
    },
  },
  computed: {
    passTogglerIcon() {
      return this.showPassword ? " fa fas fa-eye-slash" : " fa fas fa-eye";
    },
  },
  watch: {
    password: function (val) {
      if (!val || val.trim().length <= 0) {
        this.passStrength = "";
        this.strengthColor = "";
        return;
      }
      let strength = checkPwdStrength(this.password.trim());
      if (strength == "not-bad") {
        this.strengthColor = "warning";
        this.passStrength = "Medium";
      } else if (strength == "good") {
        this.strengthColor = "success";
        this.passStrength = "Good";
      } else {
        this.strengthColor = "danger";
        this.passStrength = "Weak";
      }
    },
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
  width: 400px;
  max-width: 100%;
  min-height: 400px;

  .forgot-header {
    width: 100%;
    height: 40%;
  }

  .forgot-body {
    position: absolute;
    width: 100%;
    top: 50%;
    left: -15px;
    padding: 5px 40px;
  }
  &.wide {
    width: 600px;
    min-height: 600px;

    .forgot-header {
      width: 100%;
      height: 25%;
    }

    .forgot-body {
      position: absolute;
      width: 100%;
      top: 30%;
      left: -15px;
      padding: 5px 40px;
    }
  }
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

.forgot-header {
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

.forgot-body {
  left: -15px;
  padding: 5px 40px;
}
.errorMessage {
  color: #ff0033;
}
.successMessage {
  color: #2ecc89;
}

::v-deep input::-webkit-outer-spin-button,
::v-deep input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.pass-toggler {
  cursor: pointer;
}

.danger {
  color: #f56c6c;
}
.warning {
  color: #e6a23c;
}
.success {
  color: #67c23a;
}

img {
  height: 2.8rem;
}

@media only screen and (max-width: 600px) {
  img {
    /*// width: 4.4375rem;*/
    height: 2rem;
  }
}
</style>