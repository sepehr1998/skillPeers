<template>
    <div class="card card-profile shadow px-2 pb-2 h-100" @click="go2UserProfile()">


        <img v-if="cardData.background"
             :src="getBackground(cardData.background)"
             height="105px"
             alt="Image placeholder"
             class="card-img-top"
        />
        <img v-else
             :src="'/gradiants/' + ((cardData.id * cardData.id) % 20) + '.png'"
             height="105px"
             alt="Image placeholder"
             class="card-img-top"
        />


        <div class="row justify-content-center">
            <div class="col-lg-3 order-lg-2">
                <div class="card-profile-image">
                    <a>

                        <div v-if="this.$store.getters.userLogedIn">
                          <div v-if="cardData.status === 'ONLINE'">

                          <img
                                    v-if="(cardData.image && cardData.image.length > 0)"
                                    :src="getImage(cardData.image)"
                                    :class="[ $store.getters.userLogedIn ? '' : 'blurry-image' ]"
                                    class="profile-circle" width="100px" height="100px"/>
                                    <div v-else class="profile-image_svg_online" v-html="identicon"/>
                          </div>
                          <div v-else-if="cardData.status == null || cardData.status === 'OFFLINE'">

                            <img
                                v-if="(cardData.image && cardData.image.length > 0)"
                                :src="getImage(cardData.image)"
                                :class="[ $store.getters.userLogedIn ? '' : 'blurry-image' ]"
                                class="rounded-circle" width="100px" height="100px"/>
                            <div v-else class="profile-image_svg" v-html="identicon"/>
                          </div>
                          <div v-else class="profile-image_svg" v-html="identicon"/>
                        </div>


                        <img
                                v-else
                                :src="getImage(cardData.image)"
                                :class="[ $store.getters.userLogedIn ? '' : 'blurry-image' ]"
                                class="rounded-circle" width="100px" height="100px"/>
                    </a>
                </div>
            </div>
        </div>
        <div class="card-body pt-0 pt-md-4 mt-5">
            <div class="text-center">
                <h3 v-if="$store.getters.userLogedIn">{{ cardData.firstName }}</h3>
                <h3 v-else class="blurry-text">Skill Peers User</h3>
                <div class="h5 font-weight-300">
                    <i class="ni location_pin mr-2"></i>
                    {{ getCityName(cardData) }},
                    {{ getCountryName(cardData) }}
                </div>


                <div class="row">
                    <div class="col-6 text-left card-body_text p-0">Total Rating</div>
                    <div class="col-6 h5">
                        ({{cardData.rateCount}})
                    </div>
                </div>

                <div class="row">
                    <div class="col-6 text-left card-body_text p-0">Technical Skill</div>
                    <div class="col-6">
                        <star-rating v-bind:rating="cardData.technicalRateAvg"
                                     v-bind:increment="0.5"
                                     v-bind:max-rating="5"
                                     v-bind:show-rating="false"
                                     v-bind:rounded-corners="true"
                                     v-bind:read-only="true"
                                     v-bind:star-size="19">
                        </star-rating>
                    </div>
                </div>

                <div class="row">
                    <div class="col-6 text-left card-body_text p-0">On Time</div>
                    <div class="col-6">
                        <star-rating v-bind:rating="cardData.timeRateAvg"
                                     v-bind:increment="0.5"
                                     v-bind:max-rating="5"
                                     v-bind:show-rating="false"
                                     v-bind:rounded-corners="true"
                                     v-bind:read-only="true"
                                     v-bind:star-size="19">
                        </star-rating>
                    </div>
                </div>

                <div class="row">
                    <div class="col-6 text-left card-body_text p-0">Communication Skill</div>
                    <div class="col-6">
                        <star-rating v-bind:rating="cardData.communicationRateAvg"
                                     v-bind:increment="0.2"
                                     v-bind:max-rating="5"
                                     v-bind:show-rating="false"
                                     v-bind:rounded-corners="true"
                                     v-bind:read-only="true"
                                     v-bind:borderWidth="0"
                                     v-bind:star-size="19">
                        </star-rating>
                    </div>
                </div>


                <div class="row card-body_text mt-1 card-body_line">
                    <!--<i class="fa fa-certificate fa-2 mr-1"></i>-->
                    <!--{{ getExperiments(cardData) }}-->

                    <!--<el-badge :value="skill.percent" :key="skill.id" v-for="skill in getExperiments(cardData)"-->
                    <!--class="item mt-2 ml-3 p-0 badge_content" size="small" type="primary">-->
                    <!--<el-button class="p-1" size="mini">{{skill.name}}</el-button>-->
                    <!--</el-badge>-->


                    <!--<span class="badge badge-light p-1 mt-1 mr-1 p-1 font-weight-bold font-weight-black"-->
                    <!--:key="skill.id" v-for="skill in getExperiments(cardData)">-->
                    <!--{{skill.name}}({{skill.percent}} years)-->
                    <!--</span>-->

                    <!--<el-button class="p-1 mt-1 skill-bage" size="mini"-->
                    <!--:key="skill.id" v-for="skill in getExperiments(cardData)">-->
                    <!--{{skill.name}}({{skill.percent}} years)-->
                    <!--</el-button>-->

                    <el-tag class="mt-1 mr-1 skill-bage" size="mini" type="info"
                            :key="skill.id" v-for="skill in getExperiments(cardData)">
                        {{skill.name}}({{skill.percent}} years)
                    </el-tag>


                </div>
                <!--<div class="card-body_text">-->
                <!--<i class="fa fa-graduation-cap fa-2 mr-1"></i>-->
                <!--{{ getEducation(cardData) }}-->
                <!--</div>-->
            </div>
        </div>
        <div class="p-2 card-footer white black-text mt-3">
      <span class="float-left font-weight-bold">
        <strong v-if="calcPrice() != null">{{ calcPrice()}}</strong>
        <badge v-else rounded type="warning" size="md">Unknown Salary</badge>
      </span>

<!--            <span class="ml-auto mr-auto">-->
<!--                   <i class="fas fa-shopping-cart" @click="go2Messages()"></i>-->
<!--         </span>-->

            <span class="float-right">
              <a>
              <span class="a">
               <span v-if="cardData.status === 'ONLINE'" class="a" style="color:#409EFF;">
                 <i class="fas fa-user-clock">
                </i>
               </span>
                <span v-if="cardData.status === 'OFFLINE'" class="a">
                <i class="fas fa-user-clock">
                </i>
                </span>
                <span v-if="cardData.status == null" class="a">
                  <i class="fas fa-user-clock">
                </i>
                </span>
               <span v-if="cardData.status === 'ONLINE'" class="a" style="color:#409EFF;">
                  Online
               </span>
                <span v-if="cardData.status === 'OFFLINE'" class="a">
                  {{ cardData.lastSeenTime}}
                </span>
                <span v-if="cardData.status == null" class="a">
                  Long Time Ago
                </span>
<!--              <i class="grey-text ml-3 fas fa-handshake card-footer-icon"></i>-->
              </span>
              </a>

        <!--<a>-->
                <!--<span>-->
                <!--<i class="grey-text ml-3 fas fa-handshake card-footer-icon"></i>-->
                <!--</span> </a-->
                <!--&gt;-->
<!--        <a>-->
<!--          <span>-->
<!--            <i class="grey-text ml-3 fas fa-share-alt card-footer-icon"></i>-->
<!--          </span>-->
<!--        </a>-->
                <!--<a class="active">-->
                <!--<span class="active">-->
                <!--<i class="ml-3  fas fa-thumbs-up  grey-text card-footer-icon"></i>-->
                <!--</span>-->
                <!--</a>-->
<!--        <a>-->
<!--          <span class="active">-->
<!--            <i-->
<!--                    @click="go2UserProfile()"-->
<!--                    class="fas fa-eye ml-3 card-footer-icon text-info view-user-profile-button"-->
<!--            ></i>-->
<!--          </span>-->
<!--        </a>-->
      </span>
        </div>
    </div>
</template>
<script>
    import {getServerAddress} from "@/utils";
    import StarRating from "@/components/StarRating";
    import jd from 'jdenticon';

    export default {
        name: "UserCard",
        components: {
            StarRating,
        },

        props: {
            cardData: {
                type: Object,
                required: true,
            },
            cardClass: {
                type: String,
            },
        },
        methods: {
            getImage(img) {
                if (img && img.length > 0 && this.$store.getters.userLogedIn) {
                    return getServerAddress() + "/files/" + img;
                } else {
                    return require("@/assets/home_images/SP1.png");
                }
            },
            getBackground(img) {
                if (img && img.length > 0 && this.$store.getters.userLogedIn) {
                    return getServerAddress() + "/files/" + img;
                } else {
                    return require("@/assets/profile-bg.jpg");
                }
            },
            go2UserProfile() {
                this.$router.push({
                    name: "userprofile",
                    params: {userId: this.cardData.id},
                });
            },
          go2Messages() {
            this.$router.push({
              name: "messages",
              params: {userId: this.cardData.id},
            });
          },
            getCityName(cardData) {
                return cardData.cityName ? cardData.cityName : "Unknown City";
            },
            getCountryName(cardData) {
                let country = cardData.country ? cardData.country : {};
                return country.name ? country.name : "Unknown Country";
            },
            getEducation(cardData) {
                let edu = cardData.educations;
                if (edu && edu.length > 0) {
                    return edu[0].university;
                }
                return "";
            },
            getExperiments(cardData) {
                // if (cardData.experiments && cardData.experiments.length > 0) {
                //   let expDays = cardData.experiments.reduce((accumulator, currentItm) => {
                //     const start = new Date(currentItm.start);
                //     const end = new Date(currentItm.end);
                //
                //     const diffTime = Math.abs(end - start);
                //     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                //     return accumulator + diffDays;
                //   }, 0);
                //   let expYears = Math.ceil(expDays / 365);
                //   expYears =
                //     expYears > 1
                //       ? `${expYears} years of experiences.`
                //       : "1 year of experience";
                //   return expYears;
                // }
                // return "";

                if (cardData.skills && cardData.skills.length > 0) {
                    //cardData.skills.sort((a, b) => b.percent - a.percent);

                    let userSkills = cardData.skills.slice().sort((a, b) => b.percent - a.percent);
                    return userSkills;
                }
                return [];
            },
            calcPrice() {
                //f.log("price", this.cardData.priceAvg);
                if (this.cardData.priceAvg && this.cardData.priceAvg >= 0) {
                    return `$${this.cardData.priceAvg} / Hr`;
                }
                return undefined;
            },
            roundNum(num) {
                return Math.round((num + Number.EPSILON) * 10) / 10
            }
        },
        computed: {
            sortedSkills(cardData) {
                if (cardData.skills && cardData.skills.length > 0) {
                    //cardData.skills.sort((a, b) => b.percent - a.percent);

                    let userSkills = cardData.skills.slice().sort((a, b) => b.percent - a.percent);

                    let ordered = [];

                    userSkills.forEach((skill) => {
                        ordered.push(skill.name + "(" + skill.percent + " years)");
                    });

                    return ordered.toString();
                }
                return [];
            },
            identicon() {
                let config = {};
                config.backColor = '#f6f6f6';
                let svg = jd.toSvg(this.cardData.id, 100, config);
                return svg;
            },
        }
    };
</script>

<style lang="scss" scoped>

span.a {
  display: inline; /* the default for span */
}

.profile-circle{
  border-color: green;
  border-weight: 5px;
  border-style: solid;
  border-radius: 50px;
}

    .card-body_text {
        font-size: 0.8125rem;
    }

    .blurry-text {
        color: transparent;
        text-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
        text-decoration: line-through;
    }

    .blurry-image {
        filter: blur(5px);
        -webkit-filter: blur(5px);
        -moz-filter: blur(5px);
        -o-filter: blur(5px);
        -ms-filter: blur(5px);
    }

    .skill-bage {
        font-size: 0.9rem;
        color: black !important;
    }

    .el-button {
        background: #efefef;
        padding: 8px 15px;
        font-size: 0.7rem;
    }

    .rating-star {
        color: #f3cb06;
        width: 14px;
        height: 14px;
        margin-left: 5px;
    }

    .grey-text {
        color: #9e9e9e !important;
    }

    .card-footer-icon {
        cursor: pointer;
    }

    .view-user-profile-button {
        cursor: pointer;
        &:hover {
            transform: scale(1.1);
        }
    }

    .card {
        cursor: pointer;
    }

    .card-body_line {
        /*overflow: hidden;*/
        /*text-overflow: ellipsis;*/
        /*white-space: nowrap;*/
        /*display: block;*/
        /*width: 100%;*/
        /*min-width: 1px;*/
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2; /* number of lines to show */
        -webkit-box-orient: vertical;
    }

    ::v-deep .profile-image_svg > svg {
        background: #e8e8e8;
        width: 100px;
        height: 100px;
        border-radius: 100%;
        border: 4px solid #fff;
        position: absolute;
        transform: translate(-50%, -50%);
        vertical-align: middle;
        left: 50%;
        z-index: 100;
    }
    ::v-deep .profile-image_svg_online > svg {
      background: #e8e8e8;
      width: 100px;
      height: 100px;
      border-color: green;
      border-weight: 5px;
      border-style: solid;
      border-radius: 50px;
      position: absolute;
      transform: translate(-50%, -50%);
      vertical-align: middle;
      left: 50%;
      z-index: 100;
    }
</style>
