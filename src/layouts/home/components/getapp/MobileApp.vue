<template>
  <!-- Footer -->
  <mdb-footer class="footer text-style font-small">

    <!--App Store and Google Play Links-->
    <div id="footer_app_store" style="max-width: 100%">
      <div class="app-store-box">
        <div class="app-store-box_container">
          <div style="margin-bottom: 2rem">
            <h2 class="title text-center">Get the App!</h2>
            <span class="body text-center">Join millions of loyal customers using the Skill Peers mobile app, the simplest way to find skills</span>
          </div>
          <div>
            <ul class="list-inline justify-content-center">
              <li class="mr-1">
                <div class="cursor-pointer" @click="showConstructionModal">
                  <div class="google-play"></div>
                </div>
              </li>
              <li class="ml-0">
                <div class="cursor-pointer" @click="showConstructionModal">
                  <div class="app-store"></div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
<!--      <div class="app-store-image">-->
<!--      </div>-->

      <!-- Container Starts -->
      <div class="container" style="max-width: 40%">

        <!-- Start Row -->
<!--        <div class="row">-->

<!--          <div class="col-lg-12">-->
<!--            <div class="contact-text section-header text-center  mt-4">-->
<!--              <h2 class="section-title" style="padding-bottom: 3rem">Contact Us</h2>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
        <!-- End Row -->
        <!-- Start Row -->
        <div class="row" style="margin-top: 1rem">
          <!-- Start Col -->
          <div class="col">
            <form id="contactForm">
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <input
                        type="text"
                        class="form-control"
                        id="name"
                        name="name"
                        v-model="senderName"
                        placeholder="Name"
                        @focus="inputFocused"
                        data-error="Please enter your name"
                    />
                    <div class="help-block with-errors"></div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <input
                        type="text"
                        placeholder="Subject"
                        id="msg_subject"
                        class="form-control"
                        name="msg_subject"
                        v-model="subject"
                        @focus="inputFocused"
                        required
                        data-error="Please enter your subject"
                    />
                    <div class="help-block with-errors"></div>
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="form-group">
                    <input
                        type="email"
                        class="form-control"
                        id="email"
                        name="email"
                        placeholder="Email"
                        required
                        v-model="senderEmail"
                        @focus="inputFocused"
                        data-error="Please enter your Email"
                    />
                    <div class="help-block with-errors"></div>
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="form-group">
                                <textarea
                                    class="form-control"
                                    id="message"
                                    name="message"
                                    placeholder="Write Message"
                                    rows="4"
                                    data-error="Write your message"
                                    required
                                    v-model="message"
                                    @focus="inputFocused"
                                ></textarea>
                  </div>


                  <div v-if="!showSuccessMessage" class="row mr-0 ml-0">
                    <div class="col-md-4 pl-0">
                      <div class="submit-button">
                        <div class="btn btn-common"
                             @click="sendMessage">
                          Submit
                          <i v-if="sendingMessage" class="fas fa-circle-notch fa-spin"></i>
                        </div>
                      </div>
                    </div>

                    <div class="col-md-8 pr-0 pl-0">
                      <div v-if="showErrorMessage" class="mt-1">
                        <el-alert :title="errorMessage" type="error" show-icon
                                  @close="closeError()"></el-alert>
                      </div>
                    </div>
                  </div>

                  <div v-if="showSuccessMessage" class="row">
                    <el-alert :title="successMessage" type="success" show-icon
                              @close="closeError()"></el-alert>
                  </div>


                </div>
              </div>
            </form>
          </div>
          <!-- End Col -->
        </div>
        <!-- End Row -->
      </div>
    </div>
    <!--App Store and Google Play Links-->

    <!--Social Media Links-->
    <div class="row form">
      <div class="col-lg-12">
        <div class="icon-container">
                        <span class="fa-stack">
                            <a @click="goToFacebook">
                                <i class="fas fa-circle fa-stack-2x" style="color: #3b5998;"></i>
                                <i class="fab fa-facebook-f fa-stack-1x"></i>
                            </a>
                        </span>
<!--          <span class="fa-stack">-->
<!--                            <a @click="showConstructionModal">-->
<!--                                <i class="fas fa-circle fa-stack-2x" style="color: #00acee"></i>-->
<!--                                <i class="fab fa-twitter fa-stack-1x"></i>-->
<!--                            </a>-->
<!--                        </span>-->
<!--          <span class="fa-stack">-->
<!--                            <a @click="showConstructionModal">-->
<!--                                <i class="fas fa-circle fa-stack-2x" style="color: #c8232c;"></i>-->
<!--                                <i class="fab fa-pinterest-p fa-stack-1x"></i>-->
<!--                            </a>-->
<!--                        </span>-->
          <span class="fa-stack">
                            <a @click="goToInstagram">
                                <i class="fas fa-circle fa-stack-2x" style="color: #833ab4;"></i>
                                <i class="fab fa-instagram fa-stack-1x"></i>
                            </a>
                        </span>
          <span class="fa-stack">
                            <a @click="goToLinkedin">
                                <i class="fas fa-circle fa-stack-2x linkedin" style="color: #2867b2;"></i>
                                <i class="fab fa-linkedin-in fa-stack-1x"></i>
                            </a>
                        </span>
        </div> <!-- end of col -->
      </div> <!-- end of col -->
    </div>
    <!--Social Links-->


  </mdb-footer>
  <!-- Footer -->
</template>

<!--MainFooter-->

<script>
import {mdbFooter} from 'mdbvue';

export default {
  name: 'MobileFooter',
  components: {
    mdbFooter,
    // mdbContainer,
    // mdbRow,
    // mdbCol
  },
  data: function () {
    return {
      sendingMessage: false,
      errorMessage: "",
      showErrorMessage: false,
      showSuccessMessage: false,
      successMessage: "Your message sent successfully",
      message: "",
      senderEmail: "",
      subject: "",
      senderName: "",


    };
  },

  methods: {
    goToLinkedin(){
      window.open("https://www.linkedin.com/company/proslinks", "_blank");
    },
    goToFacebook(){
      window.open("https://www.facebook.com/skillpeers/", "_blank");
    },
    goToInstagram(){
      window.open("https://instagram.com/p/CaU73rZJTJe/?utm_medium=copy_link", "_blank");
    },
    showConstructionModal() {
      this.$store.dispatch("underConstructionModal/showModal");
    },
    sendMessage() {
      this.showErrorMessage = false;
      this.errorMessage = "";

      if (!this.subject.trim()) {
        console.log(this.subject);
        this.showErrorMessage = true;
        this.errorMessage = "subject can not be empty";
        return;
      }


      if (!this.senderEmail.trim()) {
        this.showErrorMessage = true;
        this.errorMessage = "email can not be empty";
        return;
      }

      if (!this.isValidEmail(this.senderEmail.trim())) {
        this.showErrorMessage = true;
        this.errorMessage = "Please enter a valid email";
        return;
      }

      if (!this.message.trim()) {
        this.showErrorMessage = true;
        this.errorMessage = "message can not be empty";
        return;
      }

      this.sendingMessage = true;

      let params = {};
      params.senderEmail = this.senderEmail.trim();
      params.subject = this.subject.trim();
      params.message = this.message.trim();


      this.$store
          .dispatch("contactus/sendMessage", params)
          .then((res) => {
            console.log("send message result", res);
            this.sendingMessage = false;
            this.showSuccessMessage = true;


            //rest values
            this.message = "";
            this.senderEmail = "";
            this.subject = "";
            this.senderName = "";
          })
          .catch((err) => {
            this.showErrorMessage = true;
            this.errorMessage = "Failed to send message";
            console.warn("failed to get users count", err);
            this.sendingMessage = false;
          });
    },
    closeError() {
      this.showErrorMessage = false;
      this.showSuccessMessage = false;
      console.log("Close error message");
    },
    isValidEmail(email) {
      if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
        return true;
      }
      return false;
    },
    inputFocused() {
      this.errorMessage = "";
      this.showErrorMessage = false;
      this.showSuccessMessage = false;
    },

  },
}
</script>

<style lang="scss" scoped>

div[data-proslinks-homepage] .footer {
  background: inherit !important;
}
.fa-stack {
  cursor: pointer;
}
.footer {
  font-family: inherit;
  color: #4a4a4a;
  font-size: 16px;
  line-height: 24px;
}

#footer {

}

#footer a, img {
  border: none;
  outline: 0;
}

#footer_app_store {
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  height: 340px;
}

#footer_app_store .app-store-box {
  background-image: url('../../../../../src/assets/home_images/get_app.jpg');
  -webkit-flex: 1;
  -ms-flex: 1;
  flex: 1;
}

#footer_app_store .app-store-box_container {
  margin: 50px auto 0;
  /*padding: 20px;*/
  max-width: 500px;
}

#footer_app_store .title {
  font-size: 40px;
  line-height: 48px;
  color: #ffffff;
  margin-bottom: 0.5rem;
  font-weight: 400;
  display: block;
}

#footer_app_store .body {
  font-size: 18px;
  line-height: 24px;
  color: #ffffff;
  font-weight: 400;
  display: block;
}

#footer_app_store ul {
  padding: 0;
  margin: 0;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  list-style: none;
}

#footer_app_store .google-play {
  width: 141px;
  height: 42px;
  background-image: url("../../../../../src/assets/google-play.png");
  background-size: 141px 42px;
  background-repeat: no-repeat;

}

#footer_app_store .app-store {
  width: 141px;
  height: 42px;
  background-image: url("../../../../../src/assets/app-store.png");
  background-size: 141px 42px;
  background-repeat: no-repeat;
}

#footer_app_store .app-store-image {
  position: relative;
  background-position: 50% 50% !important;
  background-repeat: no-repeat !important;
  overflow: hidden;
  background-size: cover;
  width: 633px;
  height: 340px;
  max-width: 40%;
  background-color: white;
  background-image: url("../../../../../src/assets/home_images/get_app.jpg");
}

/*Tablet and Mobile*/
@media only screen and (max-width: 768px) {
  #footer_app_store .app-store-image {
    display: none;
  }
}

#footer_search {
  color: #4a4a4a;
}

#footer_search li {
  text-align: left;
}

#footer_search .title {
  font-size: 40px;
  line-height: 48px;
  text-align: center;
  margin-bottom: 0.5rem;
  font-weight: 700;
  display: block;
  padding: 2rem !important;
  color: #4a4a4a;
  font-family: inherit;
}

#footer_search a {
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  display: -moz-inline-box;
  display: -ms-inline-flexbox;
  display: -webkit-inline-flex;
  display: inline-flex;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-align-items: center;
  align-items: center;
  cursor: pointer;
  outline: none;
  border: none;
  border-radius: 0.25rem;
  -webkit-appearance: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  display: -moz-inline-box;
  display: -ms-inline-flexbox;
  display: -webkit-inline-flex;
  display: inline-flex;
  font-weight: 700;
  background-color: transparent;
  color: #00ab80;
  padding: 4px 12px;
  font-size: 16px;
  line-height: 26px;
  outline: 0;
  text-decoration: none;
  text-align: left;
}

#footer_search span {
  font-weight: 400;
  color: #4a4a4a;
  display: inline-block;
}

.cursor-pointer {
  cursor: pointer;
}
.submit-button{
  max-width: 1rem;
}
</style>
