<template>
  <div class="main-view-container">
    <base-header
      class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
      style="min-height: 100px; background-size: cover; background-position: center top;"
    >
      <!-- Mask -->
      <span class="mask bg-gradient-primary opacity-8"></span>
    </base-header>

    <div class="container-fluid mt--7 mb-7">
      <div class="row">
        <div class="col"></div>
        <div class="col">
          <div class="card">
            <div class="card-header">
              <h5 class="h3 mb-0">Change Password</h5>
            </div>

            <div class="card-body">
              <div class="form-group has-label">
                <label class="form-control-label">
                  Current Password
                  <span>*</span>
                </label>
                <div class="input-group input-group-alternative form-control-alternative">
                  <input
                    placeholder="Current Password"
                    class="form-control"
                    :type="showPassword ? 'text' : 'password'"
                    ref="current-password"
                    v-model="currentPassword"
                    @focus="inputFocused"
                    @keyup.enter="enterClicked"
                  />
                  <div
                    @click="togglePasswordShow('current-password')"
                    class="pass-toggler input-group-append"
                  >
                    <span class="input-group-text">
                      <i :class="passTogglerIcon"></i>
                    </span>
                  </div>
                </div>
              </div>

              <div class="form-group has-label">
                <label class="form-control-label">
                  New Password
                  <span>*</span>
                </label>
                <div class="input-group input-group-alternative form-control-alternative">
                  <input
                    placeholder="New Password"
                    class="form-control"
                    :type="showPassword ? 'text' : 'password'"
                    ref="new-password"
                    v-model="newPassword"
                    @focus="inputFocused"
                    @keyup.enter="enterClicked"
                  />
                  <div
                    @click="togglePasswordShow('new-password')"
                    class="pass-toggler input-group-append"
                  >
                    <span class="input-group-text">
                      <i :class="passTogglerIcon"></i>
                    </span>
                  </div>
                </div>
                <small :class="strengthColor">{{passStrength}}</small>
              </div>

              <div class="form-group has-label">
                <label class="form-control-label">
                  Confirm New Password
                  <span>*</span>
                </label>
                <div class="input-group input-group-alternative form-control-alternative">
                  <input
                    placeholder="Confirm Your new password"
                    class="form-control"
                    :type="showPassword ? 'text' : 'password'"
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
              <div class="form-group">
                <base-button type="success" :disabled="saving" @click="changePassword()">
                  <i v-if="saving" class="fas fa-circle-notch fa-spin m-auto"></i>
                  Save
                </base-button>
              </div>
              <div v-if="showMessage">
                <el-alert :title="message" :type="messageType" show-icon @close="closeError()"></el-alert>
              </div>
            </div>
          </div>
        </div>
        <div class="col"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { checkPwdStrength, getStrengthError } from "@/utils/passChecker";

export default {
  name: "ChangePassword",
  data: function () {
    return {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      showPassword: false,
      message: "",
      showMessage: false,
      messageType: "",
      saving: false,
      // ----
      strengthColor: "",
      passStrength: "",
    };
  },
  methods: {
    enterClicked() {
      this.changePassword();
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
    changePassword() {
      if (this.validateForm()) {
        this.saving = true;
        this.$store
          .dispatch("user/changePassword", {
            currentPassword: this.currentPassword,
            newPassword: this.newPassword,
            newPasswordConfirm: this.confirmPassword,
          })
          .then(() => {
            this.saving = false;
            this.message = "Successfully changed.";
            this.messageType = "success";
            this.showMessage = true;
          })
          .catch((err) => {
            console.warn("Failed changing password: ", err);
            if (err.error != undefined) this.message = err.error;
            else this.message = err.errorMessage;
            this.messageType = "error";
            this.showMessage = true;
            this.saving = false;
          });
      }
    },
    validateForm() {
      if (!this.currentPassword || this.currentPassword.length <= 0) {
        this.message = "Password is empty";
        this.showMessage = true;
        this.messageType = "error";
        return false;
      } else if (!this.newPassword || this.newPassword.length <= 0) {
        this.message = "New Password is empty";
        this.showMessage = true;
        this.messageType = "error";
        return false;
      } else if (this.passStrength == "Weak") {
        this.messageType = "error";
        this.message = getStrengthError(this.newPassword);
        this.showMessage = true;
        return;
      } else if (this.newPassword != this.confirmPassword) {
        this.message = "Confirmed password not match!";
        this.showMessage = true;
        this.messageType = "error";
        return false;
      }
      return true;
    },
  },
  computed: {
    passTogglerIcon() {
      return this.showPassword ? " fa fas fa-eye-slash" : " fa fas fa-eye";
    },
  },
  watch: {
    newPassword: function (val) {
      if (!val || val.trim().length <= 0) {
        this.passStrength = "";
        this.strengthColor = "";
        return;
      }
      let strength = checkPwdStrength(this.newPassword.trim());
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
.under-construction-image {
  z-index: 10;
}
.main-view-container {
  min-height: calc(100vh - 55px);
  margin-bottom: 80px;
}

.pass-toggler {
  cursor: pointer;
}

.errorMessage {
  color: #ff0033;
}
.successMessage {
  color: #2ecc89;
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
</style>
