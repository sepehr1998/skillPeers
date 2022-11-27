<template>
  <div class="container" :class="containerCls">
    <div class="form-container sign-up-container">
      <div class="reg-form-container">
        <div class="row">
          <h1 class="float-left">Sign Up</h1>
        </div>
        <div class="grey-text w-100">
          <div>
            <base-input
              alternative
              label="Username"
              placeholder="Username"
              input-classes="form-control-alternative"
              v-model="userName"
              @focus="inputFocused"
              required
            />

            <base-input
              alternative
              label="Email"
              placeholder="example@gmail.com"
              input-classes="form-control-alternative"
              v-model="email"
              @focus="inputFocused"
              required
            />

            <!-- Sign up password -->

            <div class="form-group has-label">
              <label class="form-control-label">
                Password
                <span>*</span>
              </label>
              <div class="input-group input-group-alternative form-control-alternative">
                <input
                  placeholder="Password"
                  ref="singup-password"
                  class="form-control"
                  :type="showPassword ? 'text' : 'password'"
                  v-model="password"
                  @focus="inputFocused"
                />
                <div
                  @click="togglePasswordShow('singup-password')"
                  class="pass-toggler input-group-append"
                >
                  <span class="input-group-text">
                    <i :class="passTogglerIcon"></i>
                  </span>
                </div>
              </div>
            </div>

            <!-- Confirm sign up password -->

            <div class="form-group has-label">
              <label class="form-control-label">
                Re-password
                <span>*</span>
              </label>
              <div class="input-group input-group-alternative form-control-alternative">
                <input
                  placeholder="Confirm Your password"
                  class="form-control"
                  :type="showPassword ? 'text' : 'password'"
                  ref="singup-confirm-password"
                  v-model="confirmPassword"
                  @focus="inputFocused"
                />
                <div
                  @click="togglePasswordShow('singup-confirm-password')"
                  class="pass-toggler input-group-append"
                >
                  <span class="input-group-text">
                    <i :class="passTogglerIcon"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div
            class="error-message-container blink_animation mb-3"
            :class="showErrorMessage ? '' : 'd-none'"
          >* {{ errorMessage }}</div>
        </div>
        <div>
          <button type="button" @click="signUpUser()">
            <i class="fas fa-circle-notch fa-spin" v-if="loading"></i>
            Sign Up
          </button>
        </div>
        <br />
      </div>
    </div>
    <div class="form-container sign-in-container">
      <div class="reg-form-container">
        <h1>Log in</h1>
        <div class="grey-text w-100">
          <base-input
            alternative
            label="Email or Username *"
            placeholder="example@gmail.com"
            input-classes="form-control-alternative"
            v-model="email"
            @focus="inputFocused"
          />

          <!-- sign in password -->

          <div class="form-group has-label">
            <label class="form-control-label">
              password
              <span>*</span>
            </label>
            <div class="input-group input-group-alternative form-control-alternative">
              <input
                placeholder="Your password"
                class="form-control"
                ref="login-password"
                :type="showPassword ? 'text' : 'password'"
                v-model="password"
                @focus="inputFocused"
              />
              <div
                @click="togglePasswordShow('login-password')"
                class="pass-toggler input-group-append"
              >
                <span class="input-group-text">
                  <i :class="passTogglerIcon"></i>
                </span>
              </div>
            </div>
          </div>
          <div class="w-100 mb-4">
            <base-checkbox class="mb-3" v-model="remember">Remember Me</base-checkbox>
          </div>

          <div class="w-100 text-center mb-3">
            <a class="forget-pass-link" @click="go2ForgotPass">Forgot your password?</a>
          </div>
          <div
            class="error-message-container blink_animation mb-3"
            :class="showErrorMessage ? '' : 'd-none'"
          >* {{ errorMessage }}</div>
        </div>

        <button @click="loginUser()">
          <i class="fas fa-circle-notch fa-spin" v-if="loading"></i>
          Log in
        </button>
        <br />
      </div>
    </div>
    <div class="overlay-container">
      <div class="overlay">
        <div class="overlay-panel overlay-left">
          <router-link class="navbar-brand logo-image cursor-pointer" to="/home" replace>
            <img src="@/assets/home_images/logo-sm-white.png" alt="SkillPeers" />
          </router-link>
          <h1 class="text-white">Welcome Back!</h1>
          <p>To keep connected with us please login with your personal info</p>
          <button class="ghost" @click="changeFormMode('login')">Sign In</button>
        </div>
        <div class="overlay-panel overlay-right">
          <router-link class="navbar-brand logo-image cursor-pointer" to="/home" replace>
            <img src="@/assets/home_images/logo-sm-white.png" alt="SkillPeers" />
          </router-link>
          <h1 class="text-white">Hello, Friend!</h1>
          <p>Enter your personal details and start journey with us</p>
          <button class="ghost" @click="changeFormMode('signup')">Sign Up</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { validateEmail } from "@/utils";
export default {
  name: "Account",
  props: {
    regType: {
      type: String
    }
  },
  data: function() {
    return {
      loading: false,
      errorMessage: "",
      showErrorMessage: false,
      formMode: "signup",
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
      registrationCode: "",
      showPassword: false,
      redirect: "",
      remember: false
    };
  },
  computed: {
    containerCls() {
      let cls =
        this.formMode == "signup" ? "right-panel-active" : "left-panel-active";
      return cls;
    },
    passTogglerIcon() {
      return this.showPassword ? " fa fas fa-eye-slash" : " fa fas fa-eye";
    }
  },
  watch: {
    regType: function(newVal) {
      console.log("RegType Changed", newVal);
      this.formMode = newVal;
    },
    $route: {
      handler: function(route) {
        const query = route.query;
        if (query) {
          this.redirect = query.redirect;
        }
      },
      immediate: true
    }
  },
  methods: {
    changeFormMode(mode) {
      this.formMode = mode;
      this.showPassword = false;
      this.resetFields();
    },
    resetFields() {
      this.loading = false;
      this.errorMessage = "";
      this.showErrorMessage = false;
      this.userName = "";
      this.email = "";
      this.password = "";
      this.confirmPassword = "";
      this.registrationCode = "";
    },
    signUpUser() {
      this.loading = true;
      console.log("Signing up user");
      if (this.validateSignUpForm()) {
        console.log("Ok");
        this.$store
          .dispatch("user/regist", {
            password: this.password,
            passwordConfirm: this.confirmPassword,
            uniqueId: "admin",
            user: {
              email: this.email
            },
            userName: this.userName.trim()
          })
          .then(() => {
            this.handleSignupRedirection();
            this.showErrorMessage = false;
            this.loading = false;
          })
          .catch(err => {
            console.log(err);
            this.loading = false;
            this.errorMessage = "Some thing gose wrong!";
            this.showErrorMessage = true;
          });
      } else {
        console.log("Failed");
        this.showErrorMessage = true;
        this.loading = false;
      }
    },
    loginUser() {
      this.loading = true;
      console.log("Logging in user");
      if (this.validateLogInForm()) {
        this.$store
          .dispatch("user/login", {
            username: this.email,
            password: this.password,
            uniqueId: "admin",
            rememberUser: this.remember
          })
          .then(() => {
            this.redirectToRequestedPage();
            this.loading = false;
          })
          .catch(err => {
            console.log(err);
            this.loading = false;
            this.errorMessage = "Some thing gose wrong!";
            this.showErrorMessage = true;
          });
      } else {
        this.loading = false;
        this.showErrorMessage = true;
      }
    },
    validateSignUpForm() {
      if (!this.userName || !this.userName.length) {
        this.errorMessage = "Username is empty";
        return false;
      } else if (!this.email || this.email.length <= 0) {
        this.errorMessage = "Email is empty";
        return false;
      } else if (!validateEmail(this.email)) {
        this.errorMessage = "Wrong email address";
        return false;
      } else if (!this.password || this.password.length <= 0) {
        this.errorMessage = "Password is empty";
        return false;
      } else if (
        !this.confirmPassword ||
        this.confirmPassword != this.password
      ) {
        this.errorMessage = "Confirmed password not matched";
        return false;
      }
      return true;
    },
    validateLogInForm() {
      if (!this.email || this.email.length <= 0) {
        this.errorMessage = "Email (or Username) is empty";
        return false;
      } else if (!this.password || this.password.length <= 0) {
        this.errorMessage = "Password is empty";
        return false;
      }
      return true;
    },
    inputFocused() {
      console.log("Focused");
      this.errorMessage = "";
      this.showErrorMessage = false;
    },
    togglePasswordShow(ref) {
      this.showPassword = !this.showPassword;

      this.$nextTick(() => {
        const elm = this.$refs[ref];
        if (elm) elm.focus();
      });
    },
    redirectToRequestedPage() {
      this.$router.replace({ path: this.redirect || "/" });
    },
    handleSignupRedirection() {
      let mainPath = "/registration/confirm";
      if (this.redirect) {
        this.$router.replace(`${mainPath}?redirect=${this.redirect || ""}`);
      } else {
        this.$router.replace(`${mainPath}`);
      }
    },
    go2ForgotPass() {
      this.$router.push("/registration/forgot-password");
    }
  },
  mounted() {
    console.log("registration Mounted");
    this.formMode = this.regType || "login";
  }
};
</script>
<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Montserrat:400,800");

.main-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
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
}

button:active {
  transform: scale(0.95);
}

button:focus {
  outline: none;
}

button.ghost {
  background-color: transparent;
  border-color: #ffffff;
}

.reg-form-container {
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
}

.container {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  width: 768px;
  max-width: 100%;
  min-height: 600px;
}

.form-container {
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
}

.sign-up-container {
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
}

.container.right-panel-active .sign-up-container {
  transform: translateX(100%);
  opacity: 1;
  z-index: 5;
  animation: show 0.6s;
}

.sign-in-container {
  left: 0;
  width: 50%;
  z-index: 2;
}

.container.right-panel-active .sign-in-container {
  transform: translateX(100%);
}

@keyframes show {
  0%,
  49.99% {
    opacity: 0;
    z-index: 1;
  }

  50%,
  100% {
    opacity: 1;
    z-index: 5;
  }
}

.overlay-container {
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
}

.container.right-panel-active .overlay-container {
  transform: translateX(-100%);
}

.overlay {
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
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.container.right-panel-active .overlay {
  transform: translateX(50%);
}

.overlay-panel {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.overlay-left {
  transform: translateX(-20%);
}

.container.right-panel-active .overlay-left {
  transform: translateX(0);
}

.overlay-right {
  right: 0;
  transform: translateX(0);
}

.container.right-panel-active .overlay-right {
  transform: translateX(20%);
}

.back-button {
  cursor: pointer;
  color: #376cad;
  i {
    font-size: 1.5em;
  }
}

.error-message-container {
  color: #ff0033;
  font-size: 15px;
  font-weight: 700;
}

.blink_animation {
  animation: blinker 2s linear infinite;
}

@keyframes blinker {
  50% {
    opacity: 0;
  }
}

.pass-toggler {
  cursor: pointer;
}
.forget-pass-link {
  font-size: 0.9em;
  color: #5e72e4 !important;
  cursor: pointer;
}

::v-deep .custom-control {
  padding-left: 2rem;
}
::v-deep .custom-control-label {
  &::before {
    left: -2rem !important;
    top: 0;
  }
  &::after {
    left: -2rem !important;
    top: 0;
  }
}

@media (max-width: 575.98px) {
}
</style>
