<template>
    <div style="overflow-x: hidden !important;" data-proslinks-homepage>
        <!--Header-->
        <header-nav-bar></header-nav-bar>
        <header id="header" class="header">
            <div class="header-content"></div>
        </header>
        <!--Header-->


        <!--Body-->
        <div class="container mt-5 mb-5 pt-4 pb-4">
          <p ><strong><span>PROFESSIONAL LINKS, LLC</span></strong></p>
          <p ><strong><span>Disclaimers</span></strong></p>
          <p ><strong><span>Revised as of January 15, 2021</span></strong></p>
          <p ><strong><span>Information Only</span></strong></p>
          <p ><span style='font-family:"Lato",sans-serif;color:black;'>The information contained in this website is provided for informational purposes only.. The transmission and receipt of information contained on this Web site, in whole or in part, or communication with PROFESSIONAL LINKS, LLC via the Internet or email through this website does not constitute or create a fiduciary relationship between us and any recipient. You should not send us any confidential information in response to this webpage. &nbsp;The material on this website may not reflect the most current developments. The content and interpretation of the topics addressed herein is subject to revision. We disclaim all liability in respect to actions taken or not taken based on any or all the contents of this site to the fullest extent permitted by law. The information in this website should not be viewed as an offer to perform services in any jurisdiction other than those in which PROFESSIONAL LINKS, LLC is licensed to practice. No past results serve in any way as a guarantee of future results.</span></p>
          <p ><span style='font-family:"Lato",sans-serif;color:black;'>THE INFORMATION ON THIS SITE IS PROVIDED ON AN &quot;AS IS,&quot; &quot;AS AVAILABLE&quot; BASIS. YOU AGREE THAT USE OF THIS SITE IS AT YOUR SOLE RISK. PROFESSIONAL LINKS, LLC DISCLAIMS ALL WARRANTIES OF ANY KIND, INCLUDING BUT NOT LIMITED TO ANY EXPRESS WARRANTIES, STATUTORY WARRANTIES, AND ANY IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. TO THE EXTENT YOUR JURISDICTION DOES NOT ALLOW LIMITATIONS ON WARRANTIES, THIS LIMITATION MAY NOT APPLY TO YOU. YOUR SOLE AND EXCLUSIVE REMEDY RELATING TO YOUR USE OF THE SITE SHALL BE TO DISCONTINUE USING THE SITE.</span></p>
          <p ><strong><span>Testimonials</span></strong></p>
          <p ><span>Testimonials found on this website are actual client reviews of PROFESSIONAL LINKS, LLC. We appreciate our clients and their willingness to share their experiences. Please keep in mind that the success of any matter depends on the unique circumstances of each case: we cannot guarantee particular results for future clients based on successes we have achieved in past matters.</span></p>




        </div>
        <!--Body-->


        <home-footer/>
    </div>
</template>
<script>
    import HeaderNavBar from "../home/components/header/header-nav-bar";
    import HomeFooter from "../home/components/footer";

    export default {
        name: "Disclaimers",
        props: {
            userId: {},
        },
        components: {
            HeaderNavBar,
            HomeFooter,
        },
    };
</script>
<style lang="scss" scoped>
    div[data-proslinks-homepage] .navbar-custom.fixed-top {
        padding: 0.5rem 1.5rem 0.5rem 2rem !important;
        background-color: #5f4dee !important;
        -webkit-box-shadow: 0 0.0625rem 0.375rem 0 rgba(0, 0, 0, 0.1) !important;
        box-shadow: 0 0.0625rem 0.375rem 0 rgba(0, 0, 0, 0.1) !important;
    }

    div[data-proslinks-homepage] .header {
        background-color: #5f4dee;
    }

    div[data-proslinks-homepage] .header .header-content {
        padding-top: 0 !important;
        padding-bottom: 4rem !important;
        text-align: center;
    }

</style>
