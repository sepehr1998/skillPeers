<template>
    <div>
        <modal
                :show.sync="showConstructionModal"
                body-classes="p-0"
                modal-classes="modal-dialog-centered modal-xm"
                v-bind:no-close-on-backdrop="false">

            <under-construction></under-construction>

            <!--<card-->
                    <!--type="secondary"-->
                    <!--shadow-->
                    <!--header-classes="bg-white pb-5"-->
                    <!--body-classes="px-lg-5 py-lg-5"-->
                    <!--class="border-0">-->
                <!--<template>-->
                    <!--<form role="form">-->
                        <!--<img-->
                                <!--src="@/assets/underconstruction/website-under-construction.png"-->
                                <!--class="img-fluid"-->
                                <!--alt="Responsive image"-->
                        <!--/>-->
                    <!--</form>-->
                <!--</template>-->
            <!--</card>-->
        </modal>
    </div>
</template>
<script>
    import UnderConstruction from "./components/UnderConstruction";

    export default {
        name: "UnderConstructionModal",
        components: {
            UnderConstruction,
        },
        data: function () {
            return {
                showConstructionModal: false
            };
        },
        watch: {
            showConstructionModal: function (val) {
                if (val) this.$store.dispatch("underConstructionModal/showModal");
                else this.$store.dispatch("underConstructionModal/hideModal");
            },
        },
        mounted() {
            this.$store.watch(
                (state) => state.underConstructionModal.showConstructionModal,
                (value) => (this.showConstructionModal = value)
            );
        },
        destroyed() {
            this.showConstructionModal = false;
        },
    };
</script>
<style lang="scss">
    .errorMessage {
        color: #ff0033;
    }

    .successMessage {
        color: #2ecc89;
    }
</style>
