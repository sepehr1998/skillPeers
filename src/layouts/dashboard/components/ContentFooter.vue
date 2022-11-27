<template>
    <footer class="footer px-4 pb-2 pt-3">
        <div class="row align-items-center justify-content-lg-between">
            <div class="col-lg-6">
                <div class="copyright text-center text-lg-left text-muted">
                    © 2020-2021
                    <a>PROFESSIONAL LINKS, LLC, All rights reserved.</a>
                </div>
            </div>
            <div class="col-lg-6">
                <ul class="nav nav-footer justify-content-center justify-content-lg-end cursor-pointer">
                    <li class="nav-item">
                        <a @click="go2Terms" class="nav-link" target="_blank">Terms and Conditions</a>
                    </li>
                  <li class="nav-item">
                    <a @click="go2Policy" class="nav-link" target="_blank">Privacy Policy</a>
                  </li>
                  <li class="nav-item">
                    <a @click="go2Disclaimer" class="nav-link" target="_blank">Disclaimers</a>
                  </li>
                </ul>
            </div>


          <div class="row px-4 align-items-center justify-content-lg-between">
              <div class="copyright text-center text-lg-left text-muted">
                  <p style="font-size: xx-small;">
                    Testimonials found on this website are actual client reviews of Professional Links. Prospective clients may not obtain the same or similar results. The information contained in this website is intended for general informational purposes only.
                  </p>
              </div> <!-- enf of row -->
            </div> <!-- end of container -->


        </div>
      <cookie-law theme="royal" cookieOptions="cookieOptions">
        <div slot="message">
          This website uses cookies to ensure you get the best experience on our website. <router-link to="policy">Learn More</router-link>
        </div>
      </cookie-law>
        <under-construction-modal></under-construction-modal>
    </footer>
</template>
<script>
    import UnderConstructionModal from "@/components/UnderConstructionModal";
    import CookieLaw from 'vue-cookie-law'

    export default {
        components: {
            UnderConstructionModal,
            CookieLaw
        },
        data() {
            return {
                year: new Date().getFullYear()
            };
        },
        methods: {
            showConstructionModal() {
                this.$store.dispatch("underConstructionModal/showModal");
            },
            go2Terms(){
              this.$router.push({
                name: "terms",
              });
            },
          go2Policy(){
            this.$router.push({
              name: "policy",
            });
          },
          go2Disclaimer(){
            this.$router.push({
              name: "disclaimers",
            });
          }
        }
    };
</script>
<style lang="scss" scoped>
    .cursor-pointer {
        cursor: pointer !important;
    }




    .footer {
        position: fixed;
        left: 0;
        bottom: 0;
        right: 0;
        padding-left: 30px;
        padding-right: 30px;
        background: #f3f7fd;
        height: 80px;
        z-index: 151;
        padding-bottom: 10px;
    }

    .container-fluid {
        margin-bottom: 150px !important;
    }


    @media (min-width: 768px) {
        .footer {
            margin-left: 250px;
            width: calc(100% - 250px);
        }
    }

    @media (max-width: 768px) {
        .footer {
            height: 80px;
        }
    }


</style>
