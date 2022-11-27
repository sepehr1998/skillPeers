<template>
    <modal
            :show.sync="activeModal"
            @close="closeModal"
            body-classes="p-0"
            modal-classes="modal-dialog-centered modal-sm"
    >
        <div>
            <card
                    type="secondary"
                    shadow
                    header-classes="bg-white pb-5"
                    body-classes="px-lg-5 "
                    class="border-0"
            >
                <div class="text-center text-muted mb-4">Rate User</div>

                <!--<star-rating-->
                <!--:grade="technicalRating"-->
                <!--:maxStars="5"-->
                <!--@updateValue="updateTechnicalReview"-->
                <!--:label="technicalLable"/>-->

                <!--<star-rating-->
                <!--:grade="timeRating"-->
                <!--:maxStars="5"-->
                <!--@updateValue="updateTimeReview"-->
                <!--:label="timeLable"/>-->

                <!--<star-rating-->
                <!--:grade="communicationRating"-->
                <!--:maxStars="5"-->
                <!--@updateValue="updateCommunicationReview"-->
                <!--:label="communicationLable"/>-->

                <div>Technical Skills:</div>
                <div class="star-container">
                    <star-rating v-bind:rating="technicalRating"
                                 v-bind:increment="0.5"
                                 v-bind:max-rating="5"
                                 v-bind:show-rating="false"
                                 v-bind:rounded-corners="true"
                                 @rating-selected="updateTechnicalReview"
                                 v-bind:star-size="34">
                    </star-rating>
                </div>


                <div class="mt-3">On Time:</div>
                <div class="star-container">
                    <star-rating v-bind:rating="timeRating"
                                 v-bind:increment="0.5"
                                 v-bind:max-rating="5"
                                 v-bind:show-rating="false"
                                 v-bind:rounded-corners="true"
                                 @rating-selected="updateTimeReview"
                                 v-bind:star-size="34">
                    </star-rating>
                </div>


                <div class="mt-3">Communication Skill:</div>
                <div class="star-container">
                    <star-rating v-bind:rating="communicationRating"
                                 v-bind:increment="0.5"
                                 v-bind:max-rating="5"
                                 v-bind:show-rating="false"
                                 v-bind:rounded-corners="true"
                                 @rating-selected="updateCommunicationReview"
                                 v-bind:star-size="34">
                    </star-rating>
                </div>


                <div v-if="showError" class="h2 mt-3 error">{{errorMessage}}</div>

                <div class="text-center mt-2">
                    <base-button type="success" @click="addClicked" class="my-4">
                        <i v-if="addingRate" class="fas fa-circle-notch fa-spin"></i>
                        Rate
                    </base-button>
                    <base-button @click="closeModal" type="danger" class="my-4">Cancel</base-button>
                </div>

            </card>
        </div>
    </modal>
</template>
<script>
    import StarRating from 'vue-star-rating'

    export default {
        name: "ReviewModal",
        components: {
            StarRating,
        },
        props: {
            showModal: {
                type: Boolean,
                default: false,
            },
            userId: {},
        },
        data: function () {
            return {
                showError: false,
                errorMessage: "",
                activeModal: false,
                technicalRating: 0,
                timeRating: 0,
                communicationRating: 0,
                addingRate: false,
            };
        },
        methods: {
            setRating: function (rating) {
                this.rating = rating;
            },
            closeError() {
                this.showError = false;
                console.log("Close error message");
            },
            resetVals() {
                this.showError = false;
                this.addingRate = false;
                this.timeRating = 0;
                this.technicalRating = 0;
                this.communicationRating = 0;
            },
            closeModal() {
                this.resetVals();
                this.$emit("cancel");
            },
            updateTimeReview(newValue) {
                this.timeRating = newValue;
            },
            updateTechnicalReview(newValue) {
                this.technicalRating = newValue;
            },
            updateCommunicationReview(newValue) {
                this.communicationRating = newValue;
            },
            addClicked() {
                this.showError = false;
                this.addingRate = true;


                let technicalParams = {};
                technicalParams.userId = this.userId;
                technicalParams.rateType = "TECHNICAL";
                technicalParams.rate = this.technicalRating * 2;


                let timeParams = {};
                timeParams.userId = this.userId;
                timeParams.rateType = "TIME";
                timeParams.rate = this.timeRating * 2;


                let communicationParams = {};
                communicationParams.userId = this.userId;
                communicationParams.rateType = "COMMUNICATION";
                communicationParams.rate = this.communicationRating * 2;

                this.$store
                    .dispatch("rate/addRate", technicalParams)
                    .then((res) => {
                        console.log("add technical rate result", res);
                        this.$store
                            .dispatch("rate/addRate", timeParams)
                            .then((res) => {
                                console.log("add time rate result", res);
                                this.$store
                                    .dispatch("rate/addRate", communicationParams)
                                    .then((res) => {
                                        console.log("add communication rate result", res);

                                        this.$message({
                                            message: "successfully saved",
                                            type: "success",
                                        });
                                        this.$emit("addRating");
                                        this.closeModal();
                                    })
                                    .catch((err) => {
                                        this.showError = true;
                                        this.errorMessage = err.errorMessage;
                                        console.warn(this.errorMessage, err);
                                        this.addingRate = false;
                                    });
                            })
                            .catch((err) => {
                                this.showError = true;
                                this.errorMessage = err.errorMessage;
                                console.warn(this.errorMessage, err);
                                this.addingRate = false;
                            });
                    })
                    .catch((err) => {
                        this.showError = true;
                        this.errorMessage = err.errorMessage;
                        console.warn(this.errorMessage, err);
                        this.addingRate = false;
                    });

            },
        },
        watch: {
            showModal: function (newVal) {
                this.showError = false;
                this.activeModal = newVal;
            },
        },
    };
</script>
<style lang="scss" scoped>
    .custom-flat-pickr[readonly]:not(:disabled) {
        background-color: #fff !important;
    }

    .error {
        color: #f5365c;
    }

    .star-container {
        display: flex;
        flex-direction: column;
        width: 100%;
        justify-content: center;
        align-items: center; /*NEW*/
    }

    /*div{*/
    /*display: inline !important;*/
    /*}*/

    .vue-star-rating {
        display: inline !important;
    }
</style>
