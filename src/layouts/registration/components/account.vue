<template>
    <div class="container" :class="containerCls">
        <form class="form-container sign-up-container scroll">
          <div class="wrapper">
            <a @click="goBack" href="#" class="close-button">
              <div class="in">
                <div class="close-button-block"></div>
                <div class="close-button-block"></div>
              </div>
              <div class="out">
                <div class="close-button-block"></div>
                <div class="close-button-block"></div>
              </div>
            </a>
          </div>
            <div class="reg-form-container">
                <div class="row mt-0">
                    <h1 class="float-left mt-1 pt-1">Sign Up</h1>
                </div>
                <div class="grey-text w-100">
                    <div class=" mb-0 pb-0">

                        <base-input
                                alternative
                                label="Username (It can be your email address)"
                                placeholder="Username"
                                input-classes="form-control-alternative"
                                v-model="userName"
                                class="base-input_style"
                                @focus="inputFocused"
                                @keyup.enter="enterClicked"
                                required
                        />

                        <base-input
                                alternative
                                label="Email"
                                placeholder="example@gmail.com"
                                input-classes="form-control-alternative"
                                v-model="email"
                                class="base-input_style"
                                @focus="inputFocused"
                                @keyup.enter="enterClicked"
                                required
                        />

                        <!-- Sign up password -->

                        <div class="form-group has-label base-input_style">
                            <label class="form-control-label">
                                Password
                                <span class="required-star">*</span>
                            </label>
                            <div class="input-group input-group-alternative form-control-alternative">
                                <input
                                        placeholder="Password"
                                        ref="singup-password"
                                        class="form-control"
                                        :type="showPassword ? 'text' : 'password'"
                                        v-model="password"
                                        @focus="inputFocused"
                                        @keyup.enter="enterClicked"
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
                            <small :class="strengthColor">{{passStrength}}</small>
                        </div>

                        <!-- Confirm sign up password -->

                        <div class="form-group has-label base-input_style">
                            <label class="form-control-label">
                                Re-password
                                <span class="required-star">*</span>
                            </label>
                            <div class="input-group input-group-alternative form-control-alternative">
                                <input
                                        placeholder="Confirm Your password"
                                        class="form-control"
                                        :type="showPassword ? 'text' : 'password'"
                                        ref="singup-confirm-password"
                                        v-model="confirmPassword"
                                        @focus="inputFocused"
                                        @keyup.enter="enterClicked"
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


                        <!--<div class="w-100 mb-4" @click="(go2TermAndConditions)">-->
                        <!--<base-checkbox class="mb-3" v-model="termAndCondition">-->
                        <!--I agree to these  <a href="#/terms" target="_blank">Terms and Conditions.</a>-->
                        <!--</base-checkbox>-->
                        <!--</div>-->

                        <!--<div class="w-100 mb-4" >-->
                        <!--<base-checkbox class="mb-3" v-model="termAndCondition">-->
                        <!--I agree to these  <a class="terms" @click="go2TermAndConditions">Terms and Conditions.</a>-->
                        <!--</base-checkbox>-->
                        <!--</div>-->

                        <div class="w-100 mb-2">
                            <base-checkbox class="mb-1" v-model="termAndCondition">
                                I agree to these
                                <router-link :to="{ name: 'terms'}" target="_blank" class="links-color">
                                Terms and Conditions.
                                </router-link>
                            </base-checkbox>
                        </div>

                    </div>
                    <div class="w-100 text-center mb-3 d-block d-sm-none">
                        <a class="forget-pass-link links-color" @click="changeFormMode('login')">Already have an account?</a>
                    </div>
                    <!--
                    <div
                      class="error-message-container blink_animation mb-3"
                      :class="showErrorMessage ? '' : 'd-none'"
                    >* {{ errorMessage }}</div>-->

                    <div class="error-message-container mb-3" v-if="showErrorMessage">
                        <el-alert :title="errorMessage" type="error" show-icon @close="closeError()"></el-alert>
                    </div>
                </div>
                <div>
                    <button type="button" style="margin-bottom: 1rem" :disabled='isSignupEnabled' @click="signUpUser()">
                        <i class="fas fa-circle-notch fa-spin" v-if="loading"></i>
                        Sign Up
                    </button>
                </div>
                <br/>
            </div>
        </form>
        <form class="form-container sign-in-container scroll">
          <div class="wrapper">
            <a @click="goBack" href="#" class="close-button">
              <div class="in">
                <div class="close-button-block"></div>
                <div class="close-button-block"></div>
              </div>
              <div class="out">
                <div class="close-button-block"></div>
                <div class="close-button-block"></div>
              </div>
            </a>
          </div>
            <div class="reg-form-container">
                <h1>Log in</h1>
                <div class="grey-text w-100">
                    <base-input
                            alternative
                            label="Email or Username"
                            placeholder="Email or Username"
                            input-classes="form-control-alternative"
                            v-model="email"
                            @focus="inputFocused"
                            @keyup.enter="enterClicked"
                            required=""
                    />

                    <!-- sign in password -->

                    <div class="form-group has-label">
                        <label class="form-control-label">
                            password
                            <span class="required-star">*</span>
                        </label>
                        <div class="input-group input-group-alternative form-control-alternative">
                            <input
                                    placeholder="Your password"
                                    class="form-control"
                                    ref="login-password"
                                    :type="showPassword ? 'text' : 'password'"
                                    v-model="password"
                                    @focus="inputFocused"
                                    @keyup.enter="enterClicked"
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
                        <a class="forget-pass-link links-color"  @click="go2ForgotPass">Forgot your password?</a>
                    </div>

                    <div class="w-100 text-center mb-3 d-block d-sm-none">
                        <a class="forget-pass-link links-color" @click="changeFormMode('signup')">Create New Account</a>
                    </div>
                    <!-- <div
                      class="error-message-container blink_animation mb-3"
                      :class="showErrorMessage ? '' : 'd-none'"
                    >* {{ errorMessage }}</div>-->

                    <div class="error-message-container mb-3" v-if="showErrorMessage">
                        <el-alert :title="errorMessage" type="error" show-icon @close="closeError()"></el-alert>
                    </div>
                </div>

                <button type="button" @click="loginUser()">
                    <i class="fas fa-circle-notch fa-spin" v-if="loading"></i>
                    Log in
                </button>
                <br/>
            </div>
        </form>
        <div class="d-none d-sm-block overlay-container">
            <div class="overlay">
                <div class="overlay-panel overlay-left">
                    <router-link class="navbar-brand logo-image cursor-pointer" to="/home" replace>
                        <img src="@/assets/home_images/SP1.png" alt="SkillPeers"/>
                    </router-link>
                    <h1 class="text-white">Welcome Back!</h1>
                    <p>To keep connected with us please login with your personal info</p>
                    <button class="ghost" @click="changeFormMode('login')">Sign In</button>
                </div>
                <div class="overlay-panel overlay-right">
                    <router-link class="navbar-brand logo-image cursor-pointer" to="/home" replace>
                        <img style="margin-top: 8rem" src="@/assets/home_images/SP1.png" alt="SkillPeers"/>
                    </router-link>
                    <h1 class="text-white" style="padding-bottom: 2rem">Hello, Friends!</h1>
                    <p>BUY and SELL your skills at Skill Peers</p>
                  <div class="login-info">
                  <div style="float: left;" >Registration is</div>
                    <div class="free-text">free</div>
                    <div style="float: left;">and easy</div>
                  </div>
                  <button class="ghost" style="margin-top: 2rem" @click="changeFormMode('signup')">Sign Up</button>
                  <div style="font-size: 0.8rem; margin-top: 5rem">
                    Join the club of professionals and freelancers
                  </div>
            </div>
            </div>
        </div>

        <under-construction-modal></under-construction-modal>
    </div>
</template>
<script>
    import {validateEmail} from "@/utils";
    import {checkPwdStrength, getStrengthError} from "@/utils/passChecker";
    import UnderConstructionModal from "@/components/UnderConstructionModal";
    export default {
        name: "Account",
        props: {
            regType: {
                type: String,
            },
        },
        components: {
            UnderConstructionModal,
        },
        data: function () {
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
                remember: false,
                // ----
                strengthColor: "",
                passStrength: "",
                termAndCondition: false,
            };
        },
        computed: {
            containerCls() {
                let cls =
                    this.formMode == "signup" ? "right-panel-active h100" : "left-panel-active";
                return cls;
            },
            passTogglerIcon() {
                return this.showPassword ? " fa fas fa-eye-slash" : " fa fas fa-eye";
            },
            isSignupEnabled() {
                return !this.termAndCondition;
            }
        },
        watch: {
            regType: function (newVal) {
                console.log("RegType Changed", newVal);
                this.formMode = newVal;
            },
            password: function (val) {
                if (this.formMode != "signup") return;
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
            $route: {
                handler: function (route) {
                    const query = route.query;
                    if (query) {
                        this.redirect = query.redirect;
                    }
                },
                immediate: true,
            },
            selectedCountry: function (newVal) {
                console.log("Country new Value: ", newVal);

                let country = this.getCountryByID(newVal);
                if (country !== null) {
                    if (country.name === "United States") {
                        this.cityLable = "State"
                    } else {
                        this.cityLable = "City"
                    }
                }


                this.loadRelatedCities();
            },
        },
        methods: {
            goBack(){
              return this.$router.go(-1);
            },
            enterClicked() {
                if (this.formMode == "login") {
                    this.loginUser();
                } else if (this.formMode == "signup") {
                    this.signUpUser();
                }
            },
            closeError() {
                this.showErrorMessage = false;
                console.log("Close error message");
            },
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
                this.showErrorMessage = false;
                console.log("Signing up user");
                if (this.validateSignUpForm()) {
                    let userFields = {
                        password: this.password,
                        passwordConfirm: this.confirmPassword,
                        uniqueId: "admin",
                        user: {
                            email: this.email,
                            firstName: this.firstName,
                            lastName: this.lastName
                        },
                        profile: {
                            cityId: this.selectedCity,
                            countryId: this.selectedCountry,
                        },
                        userName: this.userName.trim(),
                    };


                    console.log("user fields", userFields);
                    this.$store
                        .dispatch("user/regist", userFields)
                        .then(() => {
                            this.handleSignupRedirection();
                            this.showErrorMessage = false;
                            this.loading = false;
                        })
                        .catch((err) => {
                            console.log(err);
                            this.loading = false;
                            this.errorMessage = err.errorMessage;
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
                this.showErrorMessage = false;
                console.log("Logging in user");
                if (this.validateLogInForm()) {
                    this.$store
                        .dispatch("user/login", {
                            username: this.email,
                            password: this.password,
                            uniqueId: "admin",
                            rememberUser: this.remember,
                        })
                        .then(() => {
                            this.redirectToHomePage();
                            this.loading = false;
                        })
                        .catch((err) => {
                            console.log(err);
                            this.loading = false;
                            this.errorMessage = err.errorMessage;
                            this.showErrorMessage = true;
                        });
                } else {
                    this.loading = false;
                    this.showErrorMessage = true;
                }
            },
            validateSignUpForm() {
                if(!this.termAndCondition){
                    this.errorMessage ="You must agree to our T&Cs(link above)";
                    return false;
                }
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
                } else if (this.passStrength == "Weak") {
                    this.errorMessage = getStrengthError(this.password);
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
                this.$router.replace({path: this.redirect || "/"});
            },
            redirectToHomePage() {
              this.$router.replace({path: "/"});
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
            },
            go2TermAndConditions() {
                this.$router.push({
                    name: "terms",
                });
            },
            showConstructionModal() {
                this.$store.dispatch("underConstructionModal/showModal");
            },
        },
        mounted() {
            console.log("registration Mounted");
            this.formMode = this.regType || "login";
        },
    };
</script>
<style lang="scss" scoped>
    @import url("https://fonts.googleapis.com/css?family=Montserrat:400,800");

    .terms {
        color: #5e72e4 !important;
        text-decoration: none !important;
        background-color: transparent !important;
        cursor: pointer;
    }

    .sign-up-fields_container {
        overflow-y: auto;
    }

    .scroll{
        overflow-y: auto;
    }

    /* Customize website's scrollbar like Mac OS
  Not supports in Firefox and IE */

    /* total width */
    .scrollbar::-webkit-scrollbar {
        background-color: #fff;
        width: 16px
    }

    /* background of the scrollbar except button or resizer */
    .scrollbar::-webkit-scrollbar-track {
        background-color: #fff
    }

    .scrollbar::-webkit-scrollbar-track:hover {
        background-color: #f4f4f4
    }

    /* scrollbar itself */
    .scrollbar::-webkit-scrollbar-thumb {
        background-color: #babac0;
        border-radius: 16px;
        border: 5px solid #fff
    }

    .scrollbar::-webkit-scrollbar-thumb:hover {
        background-color: #a0a0a5;
        border: 4px solid #f4f4f4
    }

    /* set button(top and bottom of the scrollbar) */
    .scrollbar::-webkit-scrollbar-button {
        display: none
    }

    .main-container {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 120vh;
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

    button:disabled,
    button[disabled] {
        border: 1px solid #d3d4d6;
        color: #909399;
        background: #f4f4f5;
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
        padding: 0 30px;
        padding-top: 20px;
        height: 85%;
    }

    .container {
        background-color: #fff;
        border-radius: 10px;
        box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
        position: relative;
        overflow: hidden;
        width: 768px;
        max-width: 100%;
        min-height: 620px;
    }

    .form-container {
        position: absolute;
        top: 0;
        height: 100%;
        transition: all 0.6s ease-in-out;
    }

    .base-input_style {
        margin-right: 1rem !important;
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
        opacity: 0;
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
        cursor: pointer;
    }

    .links-color{
        background: #2342a4;
        color: #2342a4;
        /*background: -webkit-gradient(linear, left top, right top, color-stop(11.3%, #3d79b0), color-stop(91.1%, #2342a4));*/
        /*background: linear-gradient(90deg, #3d79b0 11.3%, #2342a4 91.1%);*/
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
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
        .container {
            // min-height: 100vh;
            font-size: 0.9em;
            top: 0px;
        }

        .sign-up-container {
            left: 0;
            width: 100%;
            opacity: 0;
            z-index: 1;
        }
        .sign-in-container {
            left: 0;
            width: 100%;
            z-index: 2;
        }

        .container.left-panel-active .sign-up-container {
            -webkit-transform: translateX(100%);
            transform: translateX(100%);
            opacity: 1;
            z-index: 5;
            -webkit-animation: show-data-v-b55da80a 0.6s;
            animation: show-data-v-b55da80a 0.6s;
        }

        .container.left-panel-active .sign-in-container {
            -webkit-transform: translateX(0%);
            transform: translateX(0%);
        }

        .container.right-panel-active .sign-up-container {
            -webkit-transform: translateX(0%);
            transform: translateX(0%);
            opacity: 1;
            z-index: 5;
            -webkit-animation: show-data-v-b55da80a 0.6s;
            animation: show-data-v-b55da80a 0.6s;
        }

        .container.right-panel-active .sign-in-container {
            -webkit-transform: translateX(-100%);
            transform: translateX(-100%);
        }
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

    $button-size: 20px;
    $close-width: ($button-size / 10);
    .wrapper {
      width: 10vh;
      height: 10vh;
      display: flex;
      z-index: 10;
      align-items: center;
      justify-content: center;
    }

    .close-button {
      display: block;
      width: $button-size;
      height: $button-size;
      position: relative;
      overflow: hidden;
      > div {
        position: relative;
      }
      &-block {
        width: 20px;
        height: 10px;
        position: relative;
        overflow: hidden;
        &:before,
        &:after {
          content: '';
          position: absolute;
          bottom: 0;
          left: calc(55% - 3px);
          display: block;
          width: 4px;
          height: 25px;
          transform-origin: bottom center;
          background: #3d79b0;
          transition: all ease-out 280ms;
        }
        &:last-of-type {
          transform: rotate(180deg);
        }
      }
      .in {
        .close-button-block {
          &:before {
            transition-delay: 280ms;
            transform: translateX(20px) translateY(-20px) rotate(45deg);
          }
          &:after {
            transition-delay: 280ms;
            transform: translateX(-22px) translateY(-22px) rotate(-45deg);
          }
        }
      }
      .out {
        position: absolute;
        top: 0;
        left: 0;
        .close-button-block {
          &:before {
            transform: translateX(-5px) translateY(5px) rotate(45deg);
          }
          &:after {
            transform: translateX(5px) translateY(5px) rotate(-45deg);
          }
        }
      }
      &:hover {
        .in {
          .close-button-block {
            &:before {
              transform: translateX(-5px) translateY(5px) rotate(45deg);
            }
            &:after {
              transform: translateX(5px) translateY(5px) rotate(-45deg);
            }
          }
        }
        .out {
          .close-button-block {
            &:before {
              transform: translateX(-20px) translateY(20px) rotate(45deg);
            }
            &:after {
              transform: translateX(20px) translateY(20px) rotate(-45deg);
            }
          }
        }
      }
    }

    img {
        height: 7rem;
        padding-bottom: 1rem;
    }
    div.free-text {
      float: left;
      padding-left: 0.3rem;
      padding-right: 0.3rem;
      color: #f8c526;
      font-weight: bold;
    }

     #cbox {
    }
    #cbox div {
      position:relative;
    }
    #cbox div span{
      position:absolute;
      bottom:0;
      right:0;
    }
    .div.login-info{
      text-align: center;
      align-content: center;
    }
    @media only screen and (max-width: 600px) {
        img {
            /*// width: 4.4375rem;*/
            height: 2.8rem;
        }
    }
</style>
