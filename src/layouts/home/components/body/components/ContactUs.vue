<template>
    <!-- Contact Us Section -->
    <section class="section basic-3 pb-6" >

        <!-- Container Starts -->
        <div class="container">

            <!-- Start Row -->
            <div class="row">

                <div class="col-lg-12">
                    <div class="contact-text section-header text-center  mt-4">
                            <h2 class="section-title" style="padding-bottom: 3rem">Contact Us</h2>
                    </div>
                </div>
            </div>
            <!-- End Row -->
            <!-- Start Row -->
            <div class="row">
                <!-- Start Col -->
                <div class="col-lg-6 col-md-12">
                    <form id="contactForm" style="background-color: rgba(0, 0, 0, 0.5); border-radius: 10px; padding: 10px">
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
                <!-- Start Col -->
                <div class="col-lg-1"></div>
                <!-- End Col -->
                <!-- Start Col -->
<!--                <div class="col-lg-4 col-md-12">-->
<!--                    <div class="contact-img">-->
<!--                        <img-->
<!--                                src="@/assets/home_images/contact_us.jpg"-->
<!--                                class="img-fluid"-->
<!--                                alt=""-->
<!--                        />-->
<!--                    </div>-->
<!--                </div>-->
                <!-- End Col -->
                <!-- Start Col -->
                <div class="col-lg-1"></div>
                <!-- End Col -->
            </div>
            <!-- End Row -->
        </div>
    </section>
    <!-- Contact Us Section End -->
</template>

<script>


    export default {
        components: {},
        props: {},
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
        watch: {},
        mounted() {

        },
        destroyed() {
        },
    };
</script>

<style>
 .section{
   background-image: url(../../../../../assets/contact_us.jpg);
   background-size: cover;
 }
</style>