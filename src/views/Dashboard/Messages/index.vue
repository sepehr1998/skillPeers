<template>
    <div class="main-view-container ">
        <base-header
                class="header pb-8 pt-5 pt-lg-1 d-flex align-items-center"
                style="min-height: 100px; background-size: cover; background-position: center top;"
        >
            <!-- Mask -->
            <span class="mask bg-gradient-primary opacity-8"></span>
        </base-header>


        <div class="container-fluid">
            <el-tabs class="m-1" v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="Inbox" name="first">

                    <div v-if="!recievedMessages.length && !pageLoading"
                         class="empty-inbox pt-2 pb-2 d-flex justify-content-center">
                        <div class="empty-inbox_content d-flex justify-content-center">
                            <div>
                                <img
                                        class="empty-inbox_image"
                                        src="@/assets/other/emptyInbox1.png"
                                        alt="emptyInbox"
                                        width="50%"
                                />

                                <h3 class="text-center mt-2">Nothing in Inbox</h3>
                                <h6 class="text-center">You do not have any messages in the inbox</h6>
                            </div>
                        </div>
                    </div>

                    <div v-if="recievedMessages.length">
                        <div v-if="showRecievedMessageDetails" class=" m-4 p-2 bg-white">
                            <div class="row">
                                <div class="avatar" @click="go2UserProfile(selectedMessage.sender.id)">
                                    {{getAvatar(selectedMessage.sender.firstName)}}
                                </div>
                                <span class="detail-sender ml-1 mt-auto mb-auto">
                                        {{selectedMessage.sender.firstName}}  {{selectedMessage.sender.lastName}}
                                    </span>
                            </div>

                            <p class="row detail-title">{{selectedMessage.message}}</p>

                            <p class="row detail-date">{{getDate(selectedMessage.created)}}</p>

                            <div class="text-center row pb-0">

                                <base-button
                                        type="primary"
                                        class=" float-left modal-btn"
                                        @click="reply">
                                    Reply
                                </base-button>

                                <base-button
                                        type="primary"
                                        class="float-right modal-btn"
                                        @click="backToList"
                                >
                                    Back
                                </base-button>
                            </div>
                        </div>


                        <div v-if="!showRecievedMessageDetails" class="row">
                            <ul id="messages-list">
                                <div v-for="message in recievedMessages" :key="message.id">
                                    <li class="selected" v-bind:class="{ 'unreed-message': !message.read }">
                                        <div class="left-col">
                                            <div class="row">
                                                <div class="avatar" @click="go2UserProfile(message.sender.id)">
                                                    {{getAvatar(message.sender.firstName)}}
                                                </div>
                                                <span class="sender mt-auto mb-auto">
                                        {{message.sender.firstName}}  {{message.sender.lastName}}
                                    </span>
                                            </div>
                                        </div>
                                        <div class="right-col">
                                            <!--<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"-->
                                            <!--fill="none"-->
                                            <!--stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"-->
                                            <!--class="svg replaced-svg">-->
                                            <!--<polygon-->
                                            <!--points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>-->
                                            <!--</svg>-->

                                            <div class="row mb-1">
                                                <h4 class="text-left bread-text-preview">{{message.message}}</h4>
                                            </div>

                                            <div class="row">
                                                <div class="recieved col col-md-6 col-sm-6 col-xs-12 mb-0"
                                                     style="float: left">
                                                    {{getDate(message.created)}}
                                                </div>
                                                <div
                                                        class="recieved col col-md-6 col-sm-6 col-xs-12 mb-0 show-details"
                                                        @click="showDetails(message,true)">
                                                    Show
                                                    Details
                                                </div>
                                            </div>
                                            <!--<p class="bread-text-preview">Lorem ipsum dolor sit amet,</p>-->

                                        </div>
                                    </li>
                                </div>
                            </ul>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="Sent" name="second">
                    <div v-if="!sentMessages.length && !pageLoading"
                         class="empty-inbox pt-2 pb-2 d-flex justify-content-center">
                        <div class="empty-inbox_content d-flex justify-content-center">
                            <div>
                                <img
                                        class="empty-inbox_image"
                                        src="@/assets/other/emptyInbox1.png"
                                        alt="emptyInbox"
                                        width="50%"
                                />

                                <h3 class="text-center mt-2">No Sent Message Found</h3>
                                <h6 class="text-center">You do not have any messages in the outbox</h6>
                            </div>
                        </div>
                    </div>

                    <div v-if="sentMessages.length">
                        <div v-if="showSendMessageDetails" class=" m-4 p-2 bg-white">
                            <div class="row">
                                <div class="avatar" @click="go2UserProfile(selectedMessage.receiver.id)">
                                    {{getAvatar(selectedMessage.receiver.firstName)}}
                                </div>
                                <span class="detail-sender ml-1 mt-auto mb-auto">
                                        {{selectedMessage.receiver.firstName}}  {{selectedMessage.receiver.lastName}}
                                    </span>
                            </div>

                            <p class="row detail-title">{{selectedMessage.message}}</p>

                            <p class="row detail-date">
                                {{getDate(selectedMessage.created)}}
                                <span class="ml-1" v-bind:class="{ 'deliver-blue':selectedMessage.read }">
                                    <i class="fa fa-check" aria-hidden="true"></i>
                                    <i class="fa fa-check" aria-hidden="true"></i>
                                </span>
                            </p>

                            <div class="text-center row pb-0">

                                <base-button
                                        type="primary"
                                        class="float-right modal-btn"
                                        @click="backToList"
                                >
                                    Back
                                </base-button>
                            </div>
                        </div>


                        <div v-if="!showSendMessageDetails" class="row">
                            <ul id="emails-list">
                                <div v-for="message in sentMessages" :key="message.id">
                                    <li class="selected">
                                        <div class="left-col">
                                            <div class="row">
                                                <div class="avatar" @click="go2UserProfile(message.receiver.id)">
                                                    {{getAvatar(message.receiver.firstName)}}
                                                </div>
                                                <span class="sender mt-auto mb-auto">
                                        {{message.receiver.firstName}}  {{message.receiver.lastName}}
                                    </span>
                                            </div>
                                        </div>
                                        <div class="right-col">

                                            <div class="row mb-1">
                                                <h4 class="text-left bread-text-preview">{{message.message}}</h4>
                                            </div>

                                            <div class="row">
                                                <div class="recieved col col-md-6 col-sm-6 col-xs-12 mb-0"
                                                     style="float: left">
                                                    {{getDate(message.created)}}
                                                    <span class="ml-1" v-bind:class="{ 'deliver-blue':message.read }">
                                                        <i class="fa fa-check" aria-hidden="true"></i>
                                                        <i class="fa fa-check" aria-hidden="true"></i>
                                                    </span>
                                                </div>
                                                <div
                                                        class="recieved col col-md-6 col-sm-6 col-xs-12 mb-0 show-details"
                                                        @click="showDetails(message,false)">
                                                    Show
                                                    Details
                                                </div>
                                            </div>
                                            <!--<p class="bread-text-preview">Lorem ipsum dolor sit amet,</p>-->

                                        </div>
                                    </li>
                                </div>
                            </ul>
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>


        <send-message-modal :receiverId="receiverUserId" :senderId="$store.getters.user.id"></send-message-modal>
    </div>
</template>


<script>
    import SendMessageModal from "@/components/SendMessageModal";

    export default {
        name: "Messages",
        components: {
            SendMessageModal,
        },
        data: function () {
            return {
                showConstructionModal: false,
                recievedMessages: [],
                sentMessages: [],
                selectedMessage: {},
                showRecievedMessageDetails: false,
                showSendMessageDetails: false,
                receiverUserId: {},
                pageLoading: true,
                activeName: 'first'
            };
        },
        watch: {},
        methods: {
            showMessage(msgId) {
                console.log(msgId);
            },
            getDate(inputDate) {
                var date = new Date(inputDate);
                var dateString = date.getDate()  + "-" + (date.getMonth()+1) + "-" + date.getFullYear() + " " +
                    date.getHours() + ":" + date.getMinutes()+ ":" + date.getSeconds();

                return dateString;
            },
            go2UserProfile(userId) {
                this.$router.push({
                    name: "userprofile",
                    params: {userId: userId},
                });
            },
            getAvatar(firstName) {
                return firstName.charAt(0).toUpperCase();
            },
            showDetails(message,recievedMessage=false) {
                this.selectedMessage = message;
                if(recievedMessage) {
                    this.showRecievedMessageDetails = true;
                    this.showSendMessageDetails = false;
                    message.read = true;

                    this.$store
                        .dispatch("message/getMessageByID", message.id)
                        .then((result) => {
                            console.log("retrive message by id: ", result);
                        })
                        .catch((err) => {
                            console.warn("Failed Loading user profile", err);
                        });
                }else {
                    this.showSendMessageDetails = true;
                    this.showRecievedMessageDetails = false;
                }
            },
            backToList() {
                this.selectedMessage = undefined;
                this.showRecievedMessageDetails = false;
                this.showSendMessageDetails = false;
            },
            reply() {
                this.receiverUserId = this.selectedMessage.sender.id;
                this.$store.dispatch("sendMessageModal/showModal");

            },
            handleClick(tab, event) {
                console.log(tab, event);
            }
        },
        mounted() {
            let recieveParams = {};
            recieveParams.receiverId = this.$store.getters.user.id;
            recieveParams.page = 1;
            recieveParams.size = 300;

            let sentParams = {};
            sentParams.senderId = this.$store.getters.user.id;
            sentParams.page = 1;
            sentParams.size = 300;

            this.$store
                .dispatch("message/getMessages", recieveParams)
                .then((res) => {
                    console.log("recieved Messages", res);
                    this.recievedMessages = res;
                    this.pageLoading = false;

                })
                .catch((err) => {
                    console.warn("failed to get recieved Messages", err);
                    this.pageLoading = false;
                });


            this.$store
                .dispatch("message/getMessages", sentParams)
                .then((res) => {
                    console.log("sent Messages", res);
                    this.sentMessages = res;
                    this.pageLoading = false;

                })
                .catch((err) => {
                    console.warn("failed to get sent Messages", err);
                    this.pageLoading = false;
                });
        },
    };
</script>

<style lang="scss" scoped>

    .deliver-blue {
        color: #53afff;
    }

    .unreed-message {
        background: #d6e0f0;
        /*background: rgba(242,245,245,0.8);*/
        /*box-shadow: 0 14px 28px rgba(255,255,255,0.90), 0 10px 10px rgba(255,255,255,0.90);*/
    }

    .main-view-container {
        min-height: calc(100vh - 55px);
        margin-bottom: 80px;
    }

    .empty-inbox {
        width: 100%;
        min-height: 450px;
        background: inherit;
        margin: auto;
    }

    .empty-inbox_content {
        margin: auto;
        width: 100%;
    }

    .empty-inbox_image {
        margin: auto;
        width: 200px;
        height: 200px;
        vertical-align: middle;
        horiz-align: center;
        text-align: center;
    }

    ol, ul {
        list-style: none;
        padding-left: 0;
        width: 100%;
        overflow: hidden;
    }

    li {
        background: white;
        cursor: pointer;
        border-bottom: 1px solid #e6e6e6;
        padding: 5px 20px;
        -webkit-transition: background 0.25s ease;
        -moz-transition: background 0.25s ease;
        -ms-transition: background 0.25s ease;
        -o-transition: background 0.25s ease;
        transition: background 0.25s ease;
        height: 100%;
        width: 100%;
        margin-top: 10px;
        cursor: inherit;
    }

    .row {
        padding: 0px 0px;
        margin-right: 0 !important;
        margin-left: 0 !important;
    }

    .selected {
        height: 100%;
    }

    div.left-col {
        /*width: 30px;*/
    }

    div.avatar {
        background: #b6daf2;
        color: #3498db;
        border-radius: 30px;
        height: 30px;
        width: 30px;
        cursor: pointer;
    }

    .tooltip {
        position: relative;
    }

    div.left-col .svg {
        margin: 5px auto 0;
        width: 100%;
        cursor: pointer;
        height: 16px;
    }

    li {
        height: 100%;
    }

    /*li > div {*/
    /*float: left;*/
    /*height: 100%;*/
    /*}*/

    .right-col {
        height: 100%;
    }

    div.right-col {
        padding: 10px;
        position: relative;
    }

    div.right-col .svg {
        position: absolute;
        right: 0;
        top: 0;
        cursor: pointer;
        height: 16px;
        width: 16px;
    }

    .sender {
        font-size: 14px;
        font-weight: 600;
        margin-left: 10px;
    }

    div.right-col h4 {
        font-weight: 600;
        font-size: 18px;
        line-height: 1.2;
        margin: 8px 0;
        width: calc(100% - 70px);
    }

    .right-col .bread-text-preview {
        font-size: 13px;
        width: calc(100% - 70px);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    div.right-col p {
        color: #999999;
    }

    .recieved {
        font-size: 12px;
        font-weight: 600;
        text-align: center;
    }

    .emails-list {
        height: 100%;
        margin-right: auto;
        margin-left: auto;
    }

    .show-details {
        text-decoration: underline;
        cursor: pointer;
        color: #5f4dee;
    }

    .detail-date {
        color: #999999;
        font-size: 14px;
        font-weight: 600;
        text-align: right !important;
        width: 100%;
        display: block;
    }

    .detail-sender {
        color: #999999;
        font-size: 14px;
        font-weight: 600;
    }

    .detail-title {
        font-size: 28px;
        font-weight: 600;
        margin: 20px 10px;
    }

    .detail-content {

    }

    .actions {
        margin-top: 20px;
        padding-left: 40px;
    }

    button.primary {
        background: #3498db;
        color: white;
    }

</style>
