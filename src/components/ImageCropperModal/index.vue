<template>
    <modal
            :show.sync="activeModal"
            @close="closeModal"
            v-bind:no-close-on-backdrop="true"
            body-classes="p-0"
            modal-classes="modal-dialog-centered modal-sm"
    >
        <div>
            <card
                    type="secondary"
                    shadow
                    header-classes="bg-white pb-5"
                    body-classes="px-lg-5"
                    class="border-0 p-0"
            >
                <div class="text-center text-muted mb-4">Image Cropper</div>


                <cropper
                        classname="cropper"
                        :src="img"
                        :stencilProps="aspectRatio"
                        @change="change"
                ></cropper>


                <div class="text-center pt-0 pb-0 mt-0">
                    <base-button @click="saveChanges" type="success" class="mt-3 mb-1">Select</base-button>
                    <base-button @click="closeModal" type="danger" class="mt-3 mb-1">Cancel</base-button>
                </div>


            </card>
        </div>


    </modal>
</template>
<script>
    import {Cropper} from 'vue-advanced-cropper';

    export default {
        name: "ImageCropperModal",
        components: {
            Cropper
        },
        props: {
            showModal: {
                type: Boolean,
                default: false,
            },
            img: {
                type: String,
                default: null,
            },
            aspectRatio: {
                type: Object,
                default: function () {
                    return {
                        aspectRatio: 12 / 12
                    }
                },
            }

        },
        data: function () {
            return {
                showError: false,
                errorMessage: "",
                activeModal: false,
                userAvatar: undefined,
                croppedImg: undefined
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
            closeModal() {
                this.showError = false;
                this.$emit("cancel");
            },
            saveChanges() {
                console.log("cropped image uploading",this.croppedImg);
                this.$emit("loadCroppedImage", this.croppedImg);
            },
            change({coordinates, canvas}) {
                console.log(coordinates, canvas);
                if (canvas) {
                    //var dataURL = canvas.toDataURL();
                    var dataURL2 =  canvas.toDataURL("image/jpeg",0.8);
                    this.croppedImg = this.dataURLtoFile(dataURL2, "tempfile.jpeg");
                }


            },
            dataURLtoFile(dataurl, filename) {
                var arr = dataurl.split(','),
                    mime = arr[0].match(/:(.*?);/)[1],
                    bstr = atob(arr[1]),
                    n = bstr.length,
                    u8arr = new Uint8Array(n);

                while (n--) {
                    u8arr[n] = bstr.charCodeAt(n);
                }

                return new File([u8arr], filename, {type: mime});
            }
        },
        watch: {
            showModal: function (newVal) {
                this.showError = false;
                this.activeModal = newVal;
            },
        },
        mounted() {
        }

    };
</script>
<style lang="scss" scoped>
    .custom-flat-pickr[readonly]:not(:disabled) {
        background-color: #fff !important;
    }

    .cropper {
        /*height: 400px;*/
        /*background: #DDD;*/
    }

</style>
