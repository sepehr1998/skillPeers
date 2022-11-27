<template>
    <div class="footer-container">

            <div>
                <!--Waved Section-->
                <svg class="footer-frame" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg"
                     preserveAspectRatio="none"
                     viewBox="0 0 1920 79">
                    <title>footer-frame</title>
                    <path class="cls-2"
                          d="M0,72.427C143,12.138,255.5,4.577,328.644,7.943c147.721,6.8,183.881,60.242,320.83,53.737,143-6.793,167.826-68.128,293-60.9,109.095,6.3,115.68,54.364,225.251,57.319,113.58,3.064,138.8-47.711,251.189-41.8,104.012,5.474,109.713,50.4,197.369,46.572,89.549-3.91,124.375-52.563,227.622-50.155A338.646,338.646,0,0,1,1920,23.467V79.75H0V72.427Z"
                          transform="translate(0 -0.188)"></path>
                </svg>
                <!-- End Of Waved Section-->

                <div class="footer">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-4">
                                <div class="footer-col first">
                                    <h4>About SkillPeers</h4>
                                    <p class="p-small">We are here to help you sell/buy skills </p>
                                </div>
                            </div> <!-- end of col -->
                            <div class="col-md-4">
                                <div class="footer-col middle">
                                    <h4>Important Links</h4>
                                    <ul class="list-unstyled li-space-lg p-small">
                                        <li class="media">
                                            <i class="fas fa-square"></i>

                                            <div class="media-body">Read our
                                                 <router-link :to="{ name: 'terms'}" target="_blank" class="white" style="display: inline-block">Terms and Conditions
                                                </router-link> , 
												<router-link :to="{ name: 'policy'}" target="_blank" class="white" style="display: inline-block">Privacy
                                                    Policy , 
                                                </router-link>
												<router-link :to="{ name: 'disclaimers'}" target="_blank" class="white" style="display: inline-block">
                                                    Disclaimers
                                                </router-link></div>
                                        </li>
                                    </ul>
                                </div>
                            </div> <!-- end of col -->
                            <div class="col-md-4">
                                <div class="footer-col last">
                                    <h4>Contact</h4>
                                    <ul class="list-unstyled li-space-lg p-small">
                                        <li class="media">
                                            <i class="fas fa-map-marker-alt"></i>
                                            <div class="media-body">Aliso Viejo, California</div>
                                        </li>
                                        <li class="media">
                                            <i class="fas fa-envelope"></i>
                                            <div class="media-body white">
                                              <a class="white" href="mailto:info@skillpeers.com">
                                                info@skillpeers.com
                                              </a>
                                            </div>
                                        </li>
                                        <li class="media">
                                            <i class="fas fa-globe"></i>
                                            <div class="media-body">
                                                <a class="white" href="http://www.skillpeers.com" target="_blank">www.skillpeers.com</a>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div> <!-- end of col -->
                        </div> <!-- end of row -->
                    </div> <!-- end of container -->
                </div>

                <!-- Copyright -->
              <div class="copyright">
                <div class="container">
                  <div class="row">
                    <div class="col-lg-12">
                      <p style="font-size: xx-small; color: white">
                        Testimonials found on this website are actual client reviews of Professional Links. Prospective clients may not obtain the same or similar results. The information contained in this website is intended for general informational purposes only.

                      </p>
                    </div> <!-- end of col -->
                  </div> <!-- enf of row -->
                </div> <!-- end of container -->
              </div>



              <div class="copyright">
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-12">
                                <p class="p-small">
                                  © 2020 - 2021 PROFESSIONAL LINKS, LLC, All rights reserved.
                                </p>
                            </div> <!-- end of col -->
                        </div> <!-- enf of row -->
                    </div> <!-- end of container -->
                </div>
                <!-- End Of Copyright -->

            </div>
      <cookie-law theme="royal" cookieOptions="cookieOptions">
        <div slot="message">
          This website uses cookies to ensure you get the best experience on our website. <router-link to="policy">Learn More</router-link>
        </div>
      </cookie-law>
        <under-construction-modal></under-construction-modal>
        <under-construction-modal2></under-construction-modal2>
    </div>
</template>

<!--MainFooter-->
<script>
    import UnderConstructionModal from "@/components/UnderConstructionModal";
    import UnderConstructionModal2 from "@/components/UnderConstructionModal2";
    import CookieLaw from 'vue-cookie-law';
    import { setCookie } from 'tiny-cookie';
    setCookie('stringSuffixs', 'Thirty seconds later', { expires: '30s' });
    export default {
        name: "HomeFooter",
        components: {
             UnderConstructionModal,
             UnderConstructionModal2,
            CookieLaw
        },
        methods: {
            showConstructionModal() {
                this.$store.dispatch("underConstructionModal/showModal");
            },
          goToLinkedin(){
            window.open("https://www.linkedin.com/company/proslinks", "_blank");
          },
          goToInstagram(){
            window.open("https://www.instagram.com/p/CTH05eCHl43/?utm_medium=copy_link", "_blank");
          },
            go2TermAndConditions() {
                console.log("terms clicked");
                this.$router.push({
                    name: "terms",
                });
            },
        },
    };
</script>

<style lang="scss" scoped>
    .footer {
        padding-top: 0 !important;
        margin-top: 0 !important;
    }

    .footer-container {
        background: #ffffff;
    }

    .footer a {
        text-decoration: underline !important;
        cursor: pointer;
    }

    .fa-stack {
        cursor: pointer;
    }
    .fa-stacklinkedin {
      cursor: pointer;
    }

    .fa-globe {
        margin-left: 0 !important;
        margin-right: 0 !important;
    }

    .form {
        margin-top: 1rem;
        padding-top: 3rem !important;
        padding-bottom: 2rem !important;
        width: 100% !important;
    }

    .form .icon-container {
        text-align: center;
    }



    a.white {
        color: #fff !important;
    }

    .cls-2 {
        fill: #5f4dee;
    }

    .cls-2 {
        fill: #5f4dee;
    }


</style>
