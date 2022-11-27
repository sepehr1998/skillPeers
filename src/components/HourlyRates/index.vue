<template>
    <div class="card">
        <div class="card-header">
            <h5 class="h3 mb-0">Hourly Rate</h5>
        </div>

        <div class="card-body">
            <template v-if="items && items.length>0">
                <div class="row mb-3 pl-3" v-for="(itm, idx) in items" :key="idx">
                    <div class="col-3 p-0">{{itm.amount}} $</div>
                    <div class="col-7"></div>
                    <div @click="showConstructionModal" class="col-2 p-0 buy-button">
                        <i class="fas fa-shopping-cart text-info"></i>
                    </div>
                </div>
            </template>

      <template v-else>
        <div class="w-100 text-center">
          <span>No hour rate to show</span>
        </div>
      </template>
    </div>
    <disclaimer></disclaimer>
  </div>
</template>
<script>
    import Disclaimer from "@/components/Disclaimer";

    export default {
        name: "HourlyRate",
        components: {
            Disclaimer,
        },
        props: {
            items: Array
        },
        data: function () {
            return {
            };
        },
        methods: {
            showConstructionModal() {
                this.$store.dispatch("disclaimer/showModal");
            }
        }
    };
</script>
<style lang="scss" scoped>
    .buy-button {
        cursor: pointer;
    }
</style>