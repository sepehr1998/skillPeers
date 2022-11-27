<template>
    <div>
        <modal
                :show.sync="showModal"
                body-classes="p-0"
                modal-classes="modal-dialog-centered modal-xm"
        >
            <card
                    type="secondary"
                    shadow
                    header-classes="bg-white p-0"
                    body-classes=" p-0"
                    class="border-0"
            >

                <div class="card-header p-0 text-center">
                    <div class="card-title p-2 m-0">
                        <h3 class="text-white">Send Message</h3>
                    </div>
                </div>
                <div class="card-body">
                    <template>
                        <form role="form">
                            <mdb-input outline type="textarea" v-model="message" :rows="5"/>

                            <div class="text-center row">
                                <div class="col-6">
                                    <base-button
                                            type="primary"
                                            class="my-4 float-left modal-btn"
                                            @click="hideModal">
                                        Cancel
                                    </base-button>
                                </div>
                                <div class="col-6">
                                    <base-button
                                            type="primary"
                                            class="my-4 float-right modal-btn"
                                            :disabled="sendingMessage || confirmingCode"
                                            @click="sendMessage()"
                                    >
                                        <i class="fas fa-circle-notch fa-spin" v-if="sendingMessage"></i>
                                        Send
                                    </base-button>
                                </div>

                                <div v-if="showErrorMessage">
                <span class="errorMessage">
                  {{ errorMessage }}
                </span>
                                </div>
                            </div>
                        </form>
                    </template>
                </div>


            </card>
        </modal>
    </div>
</template>
<script>

    import {mdbInput} from 'mdbvue';

    export default {
        name: "SendMessageModal",
        components: {
            mdbInput
        },
        props: {
            receiverId: {},
            senderId: {},
        },
        data: function () {
            return {
                showModal: false,
                sendingMessage: false,
                confirmingCode: false,
                message: "",
                loading: false,
                errorMessage: "",
                showErrorMessage: false,
            };
        },
        methods: {
            sendMessage() {
                this.showErrorMessage = false;
                this.errorMessage = "";

                if (!this.message.trim()) {
                    this.showErrorMessage = true;
                    this.errorMessage = "message can not be empty";
                    return;
                }

                this.sendingMessage = true;

                let params = {};
                params.receiverId = this.receiverId;
                params.senderId = this.senderId;
                params.message = this.message;

                console.log("message test",params);

                this.$store
                    .dispatch("message/sendNewMessage", params)
                    .then((res) => {
                        console.log("send message result",res);
                        this.hideModal();
                        this.$message({
                          message: "successfully sent",
                          type: "success",
                         });
                        //this.$notify.success({message: 'Hi! I am success message.', position:'top right', timeOut: 5000});

                    })
                    .catch((err) => {
                        this.showErrorMessage = true;
                        this.errorMessage = "message can not be empty";
                        console.warn("failed to send message", err);
                        this.sendingMessage = false;
                    });


            },
            hideModal() {
                this.showErrorMessage = false;
                this.errorMessage = "";
                this.message = "";
                this.sendingMessage = false;

                this.$store.dispatch("sendMessageModal/hideModal");
            }
        },
        watch: {
            showModal: function (val) {
                console.log("in message modal", val);
                if (val) this.$store.dispatch("sendMessageModal/showModal");
                else this.$store.dispatch("sendMessageModal/hideModal");
            },
        },
        mounted() {
            this.$store.watch(
                (state) => state.sendMessageModal.showModal,
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

    .card-title {
        width: 100%;
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
    }

    .pr-lg-5, .px-lg-5 {
        padding-top: 0 !important;
    }

    .errorMessage {
        color: #ff0033;
    }

    .modal-btn {
        width: 120px;
        font-size: 1.1em;
        padding-left: 10px !important;
        padding-right: 10px !important;
    }

</style>
