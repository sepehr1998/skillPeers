<template>
    <div style="overflow-x: hidden !important;" data-proslinks-homepage>
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css">
        <header-nav-bar></header-nav-bar>
<!--        <header id="header" class="header">-->
<!--            <div class="header-content"></div>-->
<!--        </header>-->

        <div class="row mb-7">


            <div class="col-xl-2"></div>
            <div class="col-xl-8 profile-body-container ml-2 mr-2">
                <div class="row mt-2">
                    <div class="col-md-3 order-2 order-md-1">
                        <div class="card mb-2">
                            <div class="card-header p-3">
                                <h5 class="mb-0">Address</h5>
                            </div>

                            <div class="card-body pt-0 pt-md-4">
                                <div>
                                    <div>
                                        <span class="field-title">{{cityLable}}:</span>
                                    </div>
                                    <span class="field-value">{{getCityName()}}</span>
                                </div>
                                <hr class="my-3"/>
                                <div>
                                    <div>
                                        <span class="field-title">Country:</span>
                                    </div>
                                    <span class="field-value">{{getCountryName()}}</span>
                                </div>
                            </div>
                        </div>


                      <div class="card mb-2">
                        <div class="card-header p-3">
                          <h5 class="mb-0">Languages</h5>
                        </div>

                        <div class="card-body pt-0 pt-md-4">
                          <el-tag class="mt-1 mr-1 skill-badge" size="mini" type="info"
                                  :key="language.id" v-for="language in languages">
                            {{language.name}}
                          </el-tag>
                        </div>
                      </div>


                        <div class="card">
                            <div class="card-header p-3">
                                <h5 class="mb-0">Contact Info.</h5>
                            </div>

                            <div class="card-body pt-0 pt-md-4">
                                <div>
                                    <div>
                                        <span class="field-title">Tel:</span>
                                    </div>
                                    <span
                                            class="field-value"
                                    >{{ (user.mobile && user.mobile.length>0)?user.mobile: '---' }}</span>
                                </div>
                                <hr class="my-3"/>
                                <div>
                                    <div>
                                        <span class="field-title">Email:</span>
                                    </div>
                                    <span class="field-value">{{ user.email }}</span>
                                  <span v-if="user.emailConfirmed === true">
                                  <div style="color: green">
                                    <i class="fas fa-award">
                                    </i>
                                       Email Verified
                                    </div>
                                    </span>
                                </div>

                                <div v-if="profile.linkedin && profile.linkedin.length>0">
                                    <hr class="my-3"/>
                                    <div>
                                        <span class="field-title">Linkedin:</span>
                                    </div>
                                    <span class="field-value">
                                        <span v-if="ValidURL(profile.linkedin)">
                                            <a :href="profile.linkedin" target="_blank">{{ getLinkedInView() }}</a>
                                        </span>
                                        <span v-else>
                                            <a :href="'//' + profile.linkedin"
                                               target="_blank">{{ profile.linkedin }}</a>
                                        </span>


                                    </span>
                                </div>

                                <div v-if="profile.webSite && profile.webSite.length>0">
                                    <hr class="my-3"/>
                                    <div>
                                        <span class="field-title">Website:</span>
                                    </div>
                                    <span class="field-value">

                                        <span v-if="ValidURL(profile.webSite)">
                                            <a :href="profile.webSite" target="_blank">{{getWebSiteView()}}</a>
                                        </span>
                                        <span v-else>
                                            <a :href="'//' + profile.webSite" target="_blank">{{ profile.webSite }}</a>
                                        </span>

                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 mid-profile-container p-md-0 order-1 order-md-2">

                        <div class="panel profile-cover mb-0">
                            <div class=" bg--img" data-overlay="0.3">
                                <img
                                        :src="getUserBackground()"
                                        alt="Image placeholder"
                                        class="card-img-top"/>
                            </div>
                        </div>

                        <div class="profile-cover__img">
                            <img v-if="(this.profile.image && this.profile.image.length > 0)" :src="getUserImage()"
                                 alt/>
                            <div v-else class="profile-user-image_svg" v-html="identicon"/>
                            <h3 class="h3">{{ user.firstName }}</h3>
                          <div>
                            <span>{{getCountryName()}}, </span>
                            <span>{{getCityName()}}</span>
                          </div>

                            <!-- <span v-if="getAge() && getAge()>0" class="h4">I am {{getAge()}} years old.</span> -->
                            <div class="mt-2">
                              <div v-if="$store.getters.user.id.toString()!==userId.toString()">
                                <el-button type="primary" icon="el-icon-s-promotion" @click="showSendMessageModal">Text
                                  Me
                                </el-button>
                              </div>
                              <div v-else>
                                <el-button type="primary" @click="go2Profile()">Edit Profile
                                </el-button>
                              </div>

                            </div>
                        </div>


                        <div class="card mid-profile-first-card px-sm-7 px-md-3 px-xlg-2">
                            <div class="row">
                                <div class="col-xl-1"></div>
                                <div class="col-xl-10">
                                    <div
                                    >
                                        <pre class="w-100 text-justifyt mb-5">
                                            {{ (profile && profile.bio && profile.bio.length>0)?profile.bio:
                                            " Sorry There is no info about me." }}
                                        </pre>
                                    </div>







                                    <hr class="my-3"/>
                                </div>

<!--                                <div v-if="experiments && experiments.length>0" class="row w-100 mt-3">-->
<!--                                    <div class="col-3"></div>-->
<!--                                    <div class="col-6">-->
<!--                                        <div class="w-100 text-center mb-5">-->
<!--                                            <span class="h4">My Experiences</span>-->
<!--                                        </div>-->
<!--                                        <div class="m-auto">-->
<!--                                            <simple-time-line-->
<!--                                                    :items="experiments"-->
<!--                                                    :contentField="'workplace'"-->
<!--                                                    :startDateField="'start'"-->
<!--                                                    :endDateField="'end'"-->
<!--                                            ></simple-time-line>-->
<!--                                        </div>-->

<!--                                        <hr class="my-3"/>-->
<!--                                    </div>-->
<!--                                    <div class="col-3"></div>-->
<!--                                </div>-->

<!--                                <div v-if="educations && educations.length>0" class="row w-100 mt-3">-->
<!--                                    <div class="col-3"></div>-->
<!--                                    <div class="col-6">-->
<!--                                        <div class="w-100 text-center mb-5">-->
<!--                                            <span class="h4">My Education</span>-->
<!--                                        </div>-->
<!--                                        <div class="m-auto">-->
<!--                                            <simple-time-line-->
<!--                                                    :items="educations"-->
<!--                                                    :contentField="'university'"-->
<!--                                                    :startDateField="'entering'"-->
<!--                                                    :endDateField="'departure'"-->
<!--                                            ></simple-time-line>-->
<!--                                        </div>-->
<!--                                    </div>-->
<!--                                    <div class="col-3"></div>-->
<!--                                </div>-->
                                <div class="col-xl-1"></div>
                            </div>
                        </div>

                      <div class="card mt-2">
                        <div class="card-header">
                          <h5 class="h3 mb-0">Work Samples</h5>
                        </div>

                        <div class="card-body" v-if="profile.workSample1 && profile.workSample1.length>0 || profile.workSample2 && profile.workSample2.length>0">
                          <div class="row justify-content-center">
                            <div class="mb-2 card-work-sample-image">
                              <div v-if="!profile.workSample1 || !profile.workSample1.length>0">
                                <CoolLightBox
                                    :items="[profile.workSample2 && {src: getWorkSample2Image()}]"
                                    :index="index"
                                    loop
                                    @close="index = null">
                                </CoolLightBox>
                              </div>
                              <div v-if="!profile.workSample2 || !profile.workSample2.length>0">
                                <CoolLightBox
                                    :items="[profile.workSample1 && {src: getWorkSample1Image()}]"
                                    :index="index"
                                    loop
                                    @close="index = null">
                                </CoolLightBox>
                              </div>
                              <div v-if="profile.workSample1 && profile.workSample1.length>0 && profile.workSample2 && profile.workSample2.length>0">
                                <CoolLightBox
                                    :items="[profile.workSample2 && {src: getWorkSample2Image()},profile.workSample1 && {src: getWorkSample1Image()}]"
                                    :index="index"
                                    loop
                                    @close="index = null">
                                </CoolLightBox>
                              </div>

                              <a>

                              <img v-if="profile.workSample2 && profile.workSample2.length>0"
                                   :src="getWorkSample2Image()"
                                   class="card-img-top work-sample-image z-index-100 cursor-pointer"
                                   width="355px"
                                   height="200px"
                                   alt
                                   @click="setIndex(0)"/>

                              </a>
                            </div>


                            <div class="card-work-sample-image">
                              <a>
                            <div v-if="!profile.workSample2 || !profile.workSample2.length>0">
                              <img v-if="profile.workSample1 && profile.workSample1.length>0"
                                   :src="getWorkSample1Image()"
                                   class="card-img-top work-sample-image z-index-100 cursor-pointer"
                                   width="710px"
                                   height="400px"
                                   alt
                                   @click="setIndex(0)"/>
                            </div>
                                <div v-if="profile.workSample2 && profile.workSample2.length>0">
                                  <img v-if="profile.workSample1 && profile.workSample1.length>0"
                                       :src="getWorkSample1Image()"
                                       class="card-img-top work-sample-image z-index-100 cursor-pointer"
                                       width="710px"
                                       height="400px"
                                       alt
                                       @click="setIndex(1)"/>
                                </div>

                              </a>
                            </div>

                          </div>
                        </div>
                        <div class="card-body" v-else>
                          <p>
                            Nothing to show
                          </p>
                        </div>
                      </div>


                    </div>
                  <div>

                  </div>
                    <div class="col-md-3 order-2 order-md-3">



                        <!--Show User Review-->
                        <div class="card">
                            <div class="card-header">
                                <h5 class="h3 mb-0">Review
                                    <i v-if="$store.getters.user.id.toString()!==userId.toString()"
                                       @click="addNewRating"
                                       class="fas fa-plus-circle float-right rate-add-btn"
                                    ></i>
                                </h5>
                            </div>


                            <div class="card-body">

                                <div v-if="loadingRates">
                                    <div class="mb-3">
                                        <div class=" text-center card-body_text p-0 font-small">
                                        <span class="m-0 h5">
                                                        Total Rating
                                                    <small class="ml-1">({{totalReview}})</small>
                                                    </span>
                                        </div>
                                    </div>


                                    <div class="mb-3" v-for="rate in rates" :key="rate.title">
                                        <div class=" text-center card-body_text p-0 font-small">{{rate.title}}</div>
                                        <div class="star-container">
                                            <star-rating v-bind:rating="rate.value"
                                                         v-bind:increment="0.2"
                                                         v-bind:max-rating="5"
                                                         v-bind:show-rating="false"
                                                         v-bind:rounded-corners="true"
                                                         v-bind:read-only="true"
                                                         v-bind:borderWidth="0"
                                                         v-bind:star-size="20">
                                            </star-rating>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <!--Show User Review-->


                        <!--Show User Review-->
                        <div class="card">
                            <div class="card-header">
                                <h5 class="h3 mb-0">Skills</h5>
                            </div>


                            <div class="card-body_text card-body_line m-1">
                                <el-tag class="mt-1 mr-1 skill-badge" size="mini" type="info"
                                        :key="skill.id" v-for="skill in skills">
                                    {{skill.name}}({{skill.percent}} years)
                                </el-tag>


                            </div>
                        </div>
                        <!--Show User Review-->


                        <!--<skill-card :skills="skills"></skill-card>-->


                        <div class="mt-3">
                            <hourly-rates :items="getUserHourlyRates()"></hourly-rates>
                        </div>
                    </div>

                </div>
            </div>
            <div class="col-xl-2"></div>
        </div>

        <!--Test-->

        <!--<home-body/>-->
      <div @onclick="showSendMessageModal">
        <fab :actions="fabActions"
            :main-icon="mainIcon"
            :position="position"
            :bg-color="bgColor"
             @newMessage="newMessage"
             @inbox="inbox"
        ></fab>
      </div>

        <home-footer/>
        <send-message-modal :receiverId="userId" :senderId="$store.getters.user.id"></send-message-modal>

        <review-modal
                @cancel="go2AddNewRatingModal = false"
                :userId="userId"
                @addRating="addRating"
                :showModal="go2AddNewRatingModal">
        </review-modal>
    </div>
</template>
<script>
    import {getServerAddress} from "@/utils";
    import HeaderNavBar from "../home/components/header/header-nav-bar-notfixed";
    import HomeFooter from "../home/components/footer";
    import SendMessageModal from "@/components/SendMessageModal";
    import {calcAge} from "@/utils";
    // import SimpleTimeLine from "@/components/SimpleTimeLine";
    import HourlyRates from "@/components/HourlyRates";
    import ReviewModal from "@/components/ReviewModal";
    import StarRating from "@/components/StarRating";
    import jd from 'jdenticon';
    import fab from 'vue-fab';
    import CoolLightBox from 'vue-cool-lightbox';
    import 'vue-cool-lightbox/dist/vue-cool-lightbox.min.css'
    export default {
        name: "UserProfile",
        props: {
            userId: {},
        },
        data: function () {
            return {
              items: [
                {
                  src: 'https://cosmos-images2.imgix.net/file/spina/photo/20565/191010_nature.jpg',
            },
            {
              src: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/nature-quotes-1557340276.jpg',
                },
           ],
               index: null,
              showLightBox: false,
              imgs: '',
              visible: false,
              bgColor: '#f8c526',
              position: 'bottom-right',
              mainIcon: 'chat',
              fabActions: [
                {
                  name: 'newMessage',
                  icon: 'add'
                },
                {
                  name: 'inbox',
                  icon: 'archive'
                },
              ],

              media: {
                type: 'image',
                thumb: 'http://samadisepehr.ir/wp-content/uploads/2021/09/AirQualityLaptop.png',
                src: 'http://samadisepehr.ir/wp-content/uploads/2021/09/AirQualityLaptop.png',
              },



                user: {},
                profile: {},
                skills: [],
                languages: [],
                educations: [],
                experiments: [],
                hourRates: [],
                rates: [],
                cityLable: "City",
                progressTypes: ["warning", "success", "danger", "info"],
                go2AddNewRatingModal: false,
                totalReview: 0,
                loadingRates: true,
            };
        },
        components: {
            HeaderNavBar,
            HomeFooter,
            SendMessageModal,
            // SimpleTimeLine,
            HourlyRates,
            ReviewModal,
            StarRating,
            fab,
            CoolLightBox
        },
        methods: {
          openGallery(index) {
            this.$refs.lightbox.showImage(index);
          },


          setIndex(index) {
            this.index = index
          },
          newMessage(){
            this.$store.dispatch("sendMessageModal/showModal");
            },
          inbox(){
            this.$router.push('/messages')
          },

            getAge() {
                console.log("birthdate: ", calcAge(this.profile.birthDate));
                if (this.profile.birthDate) return calcAge(this.profile.birthDate);
                return "-";
            },
            getUserImage() {
                if (this.profile.image && this.profile.image.length > 0) {
                    return getServerAddress() + "/files/" + this.profile.image;
                } else {
                    return require("@/assets/no_avatar/" + 0 + ".png");
                }
            },
          getWorkSample1Image() {
            if (this.profile.workSample1 && this.profile.workSample1.length > 0) {
              return getServerAddress() + "/files/" + this.profile.workSample1;
            } else {
              return null;
            }
          },
          getWorkSample2Image() {
            if (this.profile.workSample2 && this.profile.workSample2.length > 0) {
              return getServerAddress() + "/files/" + this.profile.workSample2;
            } else {
              return null;
            }
          },
            getUserBackground() {
                if (this.profile.background && this.profile.background.length > 0) {
                    return getServerAddress() + "/files/" + this.profile.background;
                } else {
                    return require("@/assets/profile-bg.jpg");
                }
            },
            loadData(id) {
                this.$store
                    .dispatch("search/searchUserById", id)
                    .then((result) => {
                        console.log("retrive user by id: ", result);
                        this.user = result.user;
                        this.profile = result.profile;
                        this.skills = result.skills;
                        this.educations = result.educations;
                        this.languages = result.user.languages;

                        this.experiments = result.experiments;


                        this.experiments.sort(function (a, b) {
                            var aEndDate = new Date(a.end);
                            var bEndDate = new Date(b.end);

                            return aEndDate.getTime() - bEndDate.getTime();
                        });


                        this.hourRates = result.hourRates;
                    })
                    .catch((err) => {
                        console.warn("Failed Loading user profile", err);
                    });

                this.getUserRate();
            },
            showSendMessageModal() {
                this.$store.dispatch("sendMessageModal/showModal");
            },
            addNewRating() {
                this.go2AddNewRatingModal = true;
            },
            addRating(newRating) {
                console.log("new Rating", newRating);
                this.getUserRate();

            },
            getUserRate() {
                this.loadingRates = false;
                this.$store
                    .dispatch("rate/searchRateByID", this.userId)
                    .then((result) => {
                        console.log("retrive rate by id: ", result);


                        this.rates = [];
                        this.totalReview = 0;

                        result.forEach((item) => {
                            if (item) {
                                this.totalReview = item.count;

                                let rate = {};

                                if (item.type === "TECHNICAL") {
                                    rate.title = "Technical Skill";
                                    rate.value = this.roundNum(item.avg / 2);

                                } else if (item.type === "TIME") {
                                    rate.title = "On Time";
                                    rate.value = this.roundNum(item.avg / 2);
                                } else if (item.type === "COMMUNICATION") {
                                    rate.title = "Communication Skill";
                                    rate.value = this.roundNum(item.avg / 2);
                                }

                                this.rates.push(rate);
                            }
                        });

                        console.log("final rates", this.rates);
                        this.loadingRates = true;

                    })
                    .catch((err) => {
                        console.warn("Failed Loading user rate", err);
                    });
            },
            getCityName() {
                return this.profile.cityName ? this.profile.cityName : "Unknown City";
            },
            getCountryName() {
                let country = this.profile.country ? this.profile.country : {};

                if (country.name === "United States") {
                    this.cityLable = "City";
                }

                return country.name ? country.name : "Unknown Country";
            },
            getEducation() {
                let edu = this.educations;
                if (edu && edu.length > 0) {
                    return edu[0].university;
                }
                return "";
            },
            getFullAddress() {
                return this.profile &&
                this.profile.address &&
                this.profile.address.length > 0
                    ? this.profile.address
                    : "Full address not available";
            },
          go2Profile() {
            return this.$router.push("/profile");
          },
            getExperiments() {
                let exp = this.experiments;
                if (exp && exp.length > 0) {
                    return exp[0].workplace;
                }
                return "";
            },
            getUserHourlyRates() {
                return this.hourRates;
            },
            getLinkedinAddress(linkedinId) {
                return "https://www.linkedin.com/in/" + linkedinId + "/";
            },
            ValidURL(str) {
                var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
                if (!regex.test(str)) {
                    return false;
                } else {
                    return true;
                }
            },
            getLinkedInView() {
                // if (this.user.firstName && this.user.lastName) {
                //     return (this.user.firstName + " " + this.user.lastName);
                // }
                return this.profile.linkedin;
            },
            getWebSiteView() {
                // if (this.user.firstName && this.user.lastName) {
                //     return (this.user.firstName + " " + this.user.lastName);
                // }
                return this.profile.webSite;
            },
            roundNum(num) {
                return Math.round((num + Number.EPSILON) * 10) / 10
            },
            deleteWS1(){
              this.$store
                  .dispatch("user/updateUserProfile", {
                    workSample1: " ",
                  })
                  .then(() => {
                    console.warn("successfully saved");
                    this.model.workSample1 = this.$store.getters.userWorkSample1;

                    this.profileWS1ChangeMode = false;
                    this.loadingUserWS1 = false;
                    this.$message({
                      message: "successfully saved",
                      type: "success",
                    });
                  })
                  .catch((err) => {
                    console.warn("Failed saving edited profile", err);
                    this.model.workSample1 =
                        getServerAddress() + "/files/" + this.$store.getters.userWorkSample1;
                    this.profileWS1ChangeMode = false;
                    this.loadingUserWS1 = false;
                    this.$message({
                      message: err.errorMessage,
                      type: "error",
                    });
                  });
            },

          deleteWS2(){
            this.$store
                .dispatch("user/updateUserProfile", {
                  workSample2: " ",
                })
                .then(() => {
                  console.warn("successfully saved");
                  this.model.workSample2 = this.$store.getters.userWorkSample2;

                  this.profileWS2ChangeMode = false;
                  this.loadingUserWS2 = false;
                  this.$message({
                    message: "successfully saved",
                    type: "success",
                  });
                })
                .catch((err) => {
                  console.warn("Failed saving edited profile", err);
                  this.model.workSample2 =
                      getServerAddress() + "/files/" + this.$store.getters.userWorkSample2;
                  this.profileWS2ChangeMode = false;
                  this.loadingUserWS2 = false;
                  this.$message({
                    message: err.errorMessage,
                    type: "error",
                  });
                });
          }
        },
        computed: {
            identicon() {
                let config = {};
                config.backColor = '#f6f6f6';
                let svg = jd.toSvg(this.userId, 120, config);
                return svg;
            },
            backIdenticon() {
                let config = {};
                config.backColor = '#f6f6f6';
                let svg = jd.toSvg(this.user.email, 300, config);
                return svg;
            },
        },
        mounted() {
            console.log(this.userId);
            this.loadData(this.userId);
        },
        watch: {
            userId: (newVal) => {
                console.log("newVal", newVal);
                this.loadData(newVal);
            },
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

    .user-profile_body {
        margin: 0 auto;
        float: none;
        margin-bottom: 10px;
    }

    /*Test*/
    /* Profile_page */
    .profile-cover {
        position: relative;
        z-index: 5;
    }

    .text-justify {
        text-align: justify;
    }

    pre {
        text-align: justify;
        white-space: pre-line;
        word-wrap: break-word;
        font-family: inherit;
        padding: 0 20px;
    }

    .rate-add-btn {
        margin-top: 5px;
        &[disabled] {
            transform: scale(0.9);
            pointer-events: none;
            color: #909fb0;
        }
        &:not([disabled]) {
            color: #2dce89;
            cursor: pointer !important;
            &:hover {
                transform: scale(1.2);
            }
        }
    }

    .panel {
        margin-bottom: 30px;
        color: #696969;
        background-color: #fff;
        border-radius: 5px;
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.08);
    }

    .rating-star {
        color: #f3cb06;
        width: 14px;
        height: 14px;
        margin-left: 5px;
    }

    .card-body_text {
        font-size: 0.8125rem;
    }

    .profile-cover__action {
        display: -ms-flexbox;
        display: -webkit-box;
        display: flex;
        padding: 120px 30px 10px 153px;
        border-radius: 5px 5px 0 0;
        -ms-flex-wrap: wrap;
        flex-wrap: wrap;
        -ms-flex-pack: end;
        -webkit-box-pack: end;
        justify-content: flex-end;
        overflow: hidden;
        background: url(https://bootdey.com/img/Content/bg1.jpg) no-repeat;
        background-size: cover;
    }

    .profile-cover__action > .btn {
        margin-left: 10px;
        margin-bottom: 10px;
    }

    .profile-cover__img {
        position: relative;
        margin-top: -65px;
        text-align: center;
        z-index: 10;
    }

    .profile-cover__img > img {
        width: 120px;
        height: 120px;
        border: 5px solid #fff;
        border-radius: 100%;
    }

    .profile-cover__img > svg {
        background: #e8e8e8;
        width: 120px;
        height: 120px;
        border-radius: 100%;
        border: 2px solid #fff;
    }

    ::v-deep .profile-user-image_svg > svg {
        background: #e8e8e8;
        width: 120px;
        height: 120px;
        border-radius: 100%;
        border: 2px solid #fff;
    }

    ::v-deep .profile-image_svg > svg {
        background: #e8e8e8;
        width: 40px;
        height: 40px;
        border-radius: 100%;
        border: 2px solid #fff;
    }

    user-image {
        width: 120px;
        height: 120px;
        border: 5px solid #fff;
        border-radius: 100%;
        background: white;
    }

    .profile-cover__img > .h3 {
        color: #393939;
        font-size: 20px;
        line-height: 30px;
    }

    .profile-cover__img > img + .h3 {
        margin-top: 6px;
    }

    .profile-cover__info .nav {
        margin-right: 28px;
        padding: 15px 0 10px 170px;
        color: #999;
        font-size: 16px;
        line-height: 26px;
        font-weight: 300;
        text-align: center;
        text-transform: uppercase;
        -ms-flex-pack: end;
        -webkit-box-pack: end;
        justify-content: flex-end;
    }

    .profile-cover__info .nav li {
        margin-top: 13px;
        margin-bottom: 13px;
    }

    .profile-cover__info .nav li:not(:first-child) {
        margin-left: 30px;
        padding-left: 30px;
        border-left: 1px solid #eee;
    }

    .profile-cover__info .nav strong {
        display: block;
        margin-bottom: 10px;
        color: #e16123;
        font-size: 34px;
    }

    @media (min-width: 481px) {
        .profile-cover__action > .btn {
            min-width: 125px;
        }

        .profile-cover__action > .btn > span {
            display: inline-block;
        }
    }

    @media (max-width: 600px) {
        .profile-cover__info .nav {
            display: block;
            margin: 90px auto 0;
            padding-left: 30px;
            padding-right: 30px;
        }

        .profile-cover__info .nav li:not(:first-child) {
            margin-top: 8px;
            margin-left: 0;
            padding-top: 18px;
            padding-left: 0;
            border-top: 1px solid #eee;
            border-left-width: 0;
        }
    }

    .star-container {
        display: flex;
        flex-direction: column;
        width: 100%;
        justify-content: center;
        align-items: center; /*NEW*/
    }

    .panel {
        color: #696969;
        background-color: #fff;
        border-radius: 5px;
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.08);
    }

    .panel-heading {
        color: #393939;
        padding: 10px 20px;
        border-width: 0;
        border-radius: 0;
    }

    .panel-heading:after,
    .panel-heading:before {
        content: " ";
        display: table;
    }

    .panel-heading:after {
        clear: both;
    }

    .panel-title {
        float: left;
        margin-top: 3px;
        margin-bottom: 3px;
        font-size: 14px;
        line-height: 24px;
        font-weight: 700;
        text-transform: uppercase;
    }

    .panel-title select {
        border-width: 0;
        background-color: transparent;
        text-transform: uppercase;
    }

    .panel-title select option {
        text-transform: capitalize;
    }

    .panel-title .select2 {
        display: block;
        min-width: 200px;
    }

    .panel-title .select2-selection {
        height: auto;
        padding: 0;
        background-color: transparent;
        border-width: 0;
        border-radius: 0;
        overflow: hidden;
        white-space: nowrap;
    }

    .no-outlines .panel-title .select2-selection {
        outline: 0;
    }

    .panel-title .select2-selection .select2-selection__rendered {
        float: left;
        margin-right: 8px;
        padding: 0;
        line-height: inherit;
    }

    .panel-title .select2-selection .select2-selection__arrow {
        float: left;
        display: block;
        position: relative;
        top: auto;
        right: auto;
        width: auto;
        height: auto;
    }

    .panel-title .select2-selection .select2-selection__arrow:before {
        content: "\f107";
        font-family: "Font Awesome\ 5 Free";
        font-weight: 700;
    }

    .panel-title .select2-container--open .select2-selection__arrow:before {
        content: "\f106";
    }

    .panel-heading .dropdown {
        float: right;
    }

    .panel-heading .dropdown .dropdown-toggle {
        margin: -10px -20px;
        padding: 10px 20px;
        color: #999;
        border-width: 0;
        font-size: 14px;
        line-height: 30px;
        cursor: pointer;
    }

    .panel-heading .dropdown .dropdown-toggle:after,
    .toolbar__nav > li > a > span {
        display: none;
    }

    .panel-heading .dropdown-menu {
        top: 30px !important;
        left: auto !important;
        right: -20px;
        margin: 0;
        padding: 10px 0;
        border-width: 0;
        border-radius: 4px 0 0 4px;
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.08);
        -webkit-transform: none !important;
        transform: none !important;
        z-index: 1001;
    }

    .panel-heading .dropdown-menu a {
        padding: 5px 15px;
        color: #999;
        font-size: 13px;
        line-height: 23px;
    }

    .panel-heading .dropdown-menu a:hover {
        color: #e16123;
    }

    .panel-heading .dropdown-menu i {
        min-width: 15px;
        margin-right: 6px;
        font-size: 11px;
        text-align: center;
    }

    .panel-subtitle {
        margin: 20px 0;
    }

    .panel-subtitle:first-child {
        margin-top: 0;
    }

    .panel-subtitle .h5 {
        color: #999;
        font-weight: 600;
    }

    .panel-subtitle .h5 small {
        color: #777;
    }

    .panel-body {
        padding: 20px;
    }

    .panel-content,
    .panel-social {
        position: relative;
        border-radius: 0 0 4px 4px;
    }

    .panel-content {
        border-top: 1px solid #eee;
        padding: 31px 20px 33px;
    }

    .panel-about table {
        width: 100%;
        word-break: break-word;
    }

    .panel-about table tr + tr td,
    .panel-about table tr + tr th {
        padding-top: 8px;
    }

    .panel-about table th {
        min-width: 120px;
        color: #2bb3c0;
        font-weight: 400;
        vertical-align: top;
    }

    .panel-about table th > i {
        min-width: 14px;
        margin-right: 8px;
        text-align: center;
    }

    .panel-social {
        padding: 0 20px 33px;
        z-index: 0;
    }

    .panel-heading + .panel-social {
        padding-top: 21px;
        border-top: 1px solid #eee;
    }

    .panel-social > .nav {
        -ms-flex-pack: center;
        -webkit-box-pack: center;
        justify-content: center;
    }

    .panel-social > .nav > li:not(:last-child) {
        margin-right: 20px;
    }

    .panel-social > .nav > li > a {
        color: #ccc;
    }

    .panel-activity__status > .actions {
        display: -ms-flexbox;
        display: -webkit-box;
        display: flex;
        padding: 10px 20px;
        background-color: #ebebea;
        border-style: solid;
        border-width: 0 1px 1px;
        border-color: #ccc;
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
    }

    .btn-link {
        display: inline-block;
        color: inherit;
        font-weight: inherit;
        cursor: pointer;
        background-color: transparent;
    }

    button.btn-link {
        border-width: 0;
    }

    .panel-activity__status > .actions > .btn-group > .btn-link:not(:last-child) {
        margin-right: 25px;
    }

    .panel-activity__status > .actions > .btn-group > .btn-link {
        padding-left: 0;
        padding-right: 0;
        color: #9c9c9c;
    }

    .btn-info {
        background-color: #2bb3c0;
        border: none;
    }

    .btn-group,
    .btn-group-vertical {
        position: relative;
        display: -ms-inline-flexbox;
        display: inline-flex;
        vertical-align: middle;
    }

    .panel-activity__status > .actions > .btn-group {
        -ms-flex: 1;
        -webkit-box-flex: 1;
        flex: 1;
        font-size: 16px;
    }

    .panel-activity__list {
        margin: 60px 0 0;
        padding: 0;
        list-style: none;
    }

    .panel-activity__list,
    .panel-activity__list > li {
        position: relative;
        z-index: 0;
    }

    .panel-activity__list:before {
        content: " ";
        display: none;
        position: absolute;
        top: 20px;
        left: 35px;
        bottom: 0;
        border-left: 2px solid #ebebea;
    }

    .activity__list__icon {
        display: none;
        position: absolute;
        top: 2px;
        left: 0;
        min-width: 30px;
        color: #fff;
        background-color: #2bb3c0;
        border-radius: 50%;
        line-height: 30px;
        text-align: center;
    }

    .panel-activity__list,
    .panel-activity__list > li {
        position: relative;
        z-index: 0;
    }

    .activity__list__header {
        position: relative;
        min-height: 35px;
        padding-top: 4px;
        padding-left: 45px;
        color: #999;
        z-index: 0;
    }

    .activity__list__body {
        padding-top: 13px;
        padding-left: 43px;
    }

    .entry-content .gallery {
        margin: 0;
        list-style: none;
        padding: 0;
    }

    .entry-content .gallery,
    .m-error {
        display: -ms-flexbox;
        display: flex;
        -ms-flex-wrap: wrap;
        flex-wrap: wrap;
    }

    .entry-content .gallery > li {
        padding-right: 20px;
        -ms-flex-preferred-size: 0;
        flex-basis: 0;
        -ms-flex-positive: 1;
        flex-grow: 1;
        max-width: 100%;
    }

    .gallery > li img {
        max-width: 100%;
        height: auto;
    }

    .entry-content blockquote:last-child,
    p:last-child,
    table:last-child,
    ul:last-child {
        margin-bottom: 0;
    }

    .entry-content blockquote:last-child,
    p:last-child,
    table:last-child,
    ul:last-child {
        margin-bottom: 0;
    }

    .entry-content blockquote p:before {
        content: "\f10d";
        color: #999;
        margin-right: 12px;
        font-family: "FontAwesome";
        font-size: 24px;
        font-weight: 900;
    }

    .activity__list__header img {
        position: absolute;
        top: 0;
        left: 0;
        max-width: 35px;
        border-radius: 50%;
    }

    .activity__list__header a {
        color: #222;
        font-weight: 600;
    }

    .activity__list__footer {
        display: -ms-flexbox;
        display: -webkit-box;
        display: flex;
        margin-top: 23px;
        margin-left: 43px;
        padding: 13px 8px 0;
        color: #999;
        border-top: 1px dotted #ccc;
    }

    .activity__list__footer a {
        color: inherit;
    }

    .activity__list__footer a + a {
        margin-left: 15px;
    }

    .activity__list__footer i {
        margin-right: 8px;
    }

    .activity__list__footer a:hover {
        color: #222;
    }

    .activity__list__footer span {
        margin-left: auto;
    }

    .panel-activity__list > li + li {
        margin-top: 51px;
    }

    .weather--panel {
        padding: 24px 20px 36px;
        border-radius: 5px;
        text-align: center;
    }

    .weather--title {
        font-size: 18px;
        line-height: 28px;
        font-weight: 600;
    }

    .weather--title .fa {
        margin-right: 5px;
        font-size: 30px;
        line-height: 40px;
    }

    .weather--info {
        margin-top: 14px;
        font-size: 46px;
        line-height: 56px;
    }

    .weather--info .wi {
        margin-right: 10px;
    }

    .bg-blue {
        background-color: #2bb3c0;
    }

    .bg-orange {
        background-color: #e16123;
    }

    .todo--panel .list-group,
    .user--list > li,
    .user--list > li > a {
        position: relative;
        z-index: 0;
    }

    .hero-height {
        max-height: 314px;
    }

    .hero-height .mCSB_scrollTools .mCSB_dragger .mCSB_dragger_bar {
        background: rgb(233, 236, 238);
    }

    .todo--panel .list-group {
        margin-bottom: 0;
        padding-top: 23px;
        padding-bottom: 25px;
    }

    .todo--panel .list-group:before {
        content: " ";
        position: absolute;
        top: 0;
        left: 20px;
        right: 20px;
        border-top: 1px solid #eee;
    }

    .todo--panel .list-group-item {
        margin-top: 27px;
        padding: 0;
        border-width: 0;
    }

    li.list-group-item:first-child {
        margin-top: 0;
    }

    .todo--label {
        padding-left: 20px;
        padding-right: 30px;
        color: #696969;
        font-weight: 400;
    }

    .todo--input {
        display: none;
    }

    .todo--text {
        display: block;
        position: relative;
        padding-left: 39px;
        -webkit-transition: color 0.25s;
        transition: color 0.25s;
        cursor: pointer;
        z-index: 0;
    }

    .todo--input:checked + .todo--text {
        color: #999;
        text-decoration: line-through;
    }
    .cursor-pointer {
           cursor: pointer;
         }

    .todo--text:after,
    .todo--text:before {
        position: absolute;
        top: 50%;
        left: 0;
        margin-top: -10px;
        width: 20px;
        height: 20px;
        border-radius: 2px;
    }

    .todo--text:before {
        border: 1px solid #ccc;
        content: " ";
    }

    .todo--text:after {
        content: "\f00c";
        color: #fff;
        background-color: #009378;
        font-family: "FontAwesome";
        font-size: 11px;
        line-height: 21px;
        font-weight: 700;
        text-align: center;
        opacity: 0;
        -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
        -webkit-transform: scale(0.3);
        transform: scale(0.3);
        -webkit-transition: opacity 0.25s linear, -webkit-transform 0.25s linear;
        transition: opacity 0.25s linear, transform 0.25s linear;
        transition: opacity 0.25s linear, transform 0.25s linear,
        -webkit-transform 0.25s linear;
    }

    .todo--input:checked + .todo--text:after {
        opacity: 1;
        -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";
        -webkit-transform: scale(1);
        transform: scale(1);
    }

    .todo--remove {
        position: absolute;
        top: 50%;
        right: 20px;
        margin-top: -15px;
        color: #999;
        font-size: 18px;
        line-height: 28px;
    }

    .todo--panel .input-group {
        border-top: 1px solid #eee;
    }

    .todo--panel .form-control {
        height: auto;
        padding: 13px 20px 14px;
        border-width: 0;
    }

    .todo--panel .btn-link {
        padding: 12px 16px;
        color: #ccc;
        font-size: 28px;
        border-width: 0;
        text-decoration: none;
    }

    .feeds-panel {
        margin: 20px 20px 0;
        padding-top: 17px;
        padding-bottom: 23px;
        border-top: 1px solid #ebebea;
    }

    .feeds-panel li {
        position: relative;
        width: 100%;
        min-height: 20px;
        padding-left: 40px;
        z-index: 0;
    }

    .feeds-panel li a {
        color: #e16123;
    }

    .feeds-panel li + li {
        margin-top: 12px;
    }

    .bg-red {
        background-color: #ff4040;
    }

    .bg-green {
        background-color: #009378;
    }

    .comments-panel > ul > li:after,
    .comments-panel > ul > li:before,
    .feeds-panel li:after,
    .feeds-panel li:before {
        content: " ";
        display: table;
    }

    .comments-panel > ul > li:after,
    .feeds-panel li:after {
        clear: both;
    }

    .feeds-panel .time {
        float: right;
        margin-left: 5px;
        color: #ccc;
        font-style: italic;
    }

    .feeds-panel .fa {
        position: absolute;
        top: 0;
        left: 0;
        min-width: 30px;
        border-radius: 2px;
        font-size: 12px;
        line-height: 30px;
        text-align: center;
    }

    .feeds-panel .text {
        color: #696969;
        line-height: 26px;
    }

    .profile-body-container {
        z-index: 1;
    }

    .mid-profile-container {
    }

    .field-value {
        padding-left: 20px;
    }

    .field-title {
        font-weight: bold;
    }

    .mid-profile-first-card {
        padding-top: 220px;
        margin-top: -220px;

    }

    .work-sample-image {
      max-width: 300px;
      max-height: 170px;
    }


    .upload-work-sample-image {
      position: absolute;
      /*48 is the size of loading*/
      left: calc(50%);
      top: calc(0%);
      z-index: 150;
      opacity: 0.8;
      color: #666666;
      font-size: 1em;
      padding: 4px;
      border-radius: 100%;
      background: white;
      border: 1px solid #000;
    }
    .upload-work-sample-image:hover {
      transform: scale(1.1);
    }


    .skill-badge{
      font-size: 0.9rem;
      color: black !important;
    }
    .card-work-sample-image {
      position: relative;

      img {
        border-radius: .25rem;
        position: relative;
        transition:  all .2s ease-in-out;
        &:hover {
          transform: scale(1.03);
        }
      }
    }
    .upload-work-sample-image {
      position: absolute;
      /*48 is the size of loading*/
      left: calc(0%);
      top: calc(0%);
      z-index: 150;
      opacity: 0.8;
      color: #ff0000;
      font-size: 1em;
      padding: 4px;
      border-radius: 100%;
      background: white;
      border: 1px solid #000;
    }
</style>
