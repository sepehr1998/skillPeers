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
                <div class="text-center text-muted mb-4">Create New Rate</div>
                <form role="form">
                    <div class="form-group mb-3 has-label">
                        <div class="row">

                            <base-input
                                    class="mr-auto ml-auto w-100"
                                    alternative
                                    label="Hourly Rate in ($)"
                                    placeholder="salary"
                                    input-classes="form-control-alternative"
                                    v-model="salary"
                                    @keyup.enter="enterClicked"
                                    type="Number"
                            />

                        </div>

                        <div v-if="showError" class="row">
                            <el-alert :title="errorMessage" type="error" show-icon @close="closeError()"></el-alert>
                        </div>
                        <div class="text-center">
                            <base-button type="success" @click="addClicked" class="my-4">
                                <i v-if="addingNewRate" class="fas fa-circle-notch fa-spin"></i>
                                Add
                            </base-button>
                            <base-button @click="closeModal" type="danger" class="my-4">Cancel</base-button>
                        </div>
                    </div>
                </form>
            </card>
        </div>
    </modal>
</template>
<script>
    export default {
        name: "AddNewHourRateModal",
        props: {
            showModal: {
                type: Boolean,
                default: false,
            },
        },
        data: function () {
            return {
                showError: false,
                errorMessage: "",
                addingNewRate: false,
                activeModal: false,

                minVal: 1,
                maxVal: 1,
                salary: undefined,
            };
        },
        methods: {
            enterClicked() {
                this.addClicked();
            },
            closeError() {
                this.showError = false;
                console.log("Close error message");
            },
            resetVals() {
                this.minVal = 1;
                this.maxVal = 1;
                this.salary = undefined;
            },
            closeModal() {
                this.showError = false;
                this.resetVals();
                this.$emit("cancel");
            },
            addClicked() {
                this.showError = false;
                this.minVal = parseInt(this.minVal);
                this.maxVal = parseInt(this.maxVal);
                this.salary = parseFloat(this.salary);

                if (this.validateForm()) {
                    this.addingNewRate = true;

                    let newHourRate = {
                        amount: this.salary,
                        currency: "$",
                        fromHour: this.minVal,
                        toHour: this.maxVal,
                    };

                    console.log("New Updating elment: ", newHourRate);

                    this.$store
                        .dispatch("user/addHourlyRate", newHourRate)
                        .then(() => {
                            console.log("successfully saved");
                            this.$message({
                                message: "successfully saved",
                                type: "success",
                            });
                            this.addingNewRate = false;
                            this.$emit("addHoureRate", newHourRate);
                            this.resetVals();
                        })
                        .catch((err) => {
                            console.warn("Failed adding new Houre rate", err);
                            this.errorMessage = err.errorMessage;
                            this.showError = true;
                            this.addingNewRate = false;
                        });
                }
            },
            validateForm() {
                if (!this.minVal || this.minVal < 0) {
                    this.errorMessage = "Min should be greater than 0";
                    this.showError = true;
                    return false;
                } else if (!this.maxVal) {
                    this.errorMessage = "Min should be greater than 0";
                    this.showError = true;
                    return false;
                } else if (this.minVal > this.maxVal) {
                    console.log("Min is Larger than max", {
                        min: this.minVal,
                        max: this.maxVal,
                    });
                    this.errorMessage = "Min should be less than Max value. ";
                    this.showError = true;
                    return false;
                } else if (this.maxVal > 24) {
                    this.errorMessage = "Max should be less than 24";
                    this.showError = true;
                    return false;
                }

                if (!this.salary || this.salary < 0) {
                    this.errorMessage = "Salary should be more than 0.";
                    this.showError = true;
                    return false;
                }

                return true;
            },
            inputFocused() {
                this.errorMessage = "";
                this.showError = false;
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

