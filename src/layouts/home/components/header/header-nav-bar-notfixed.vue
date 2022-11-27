<template>
    <!-- Navigation -->
    <nav
            class="navbar navbar-expand navbar-dark navbar-custom"
            :class="collapseNav ? 'top-nav-collapse' : ''"
            ref="home-navbar"
            style="background-color: #5f4dee"
    >
        <div class="container mt-2">
            <!-- Text Logo - Use this if you don't have a graphic logo -->
            <!-- <a class="navbar-brand logo-text page-scroll" href="index.html">Tivo</a> -->

            <!-- Image Logo -->
            <div class="row w-100 h-100 mr-0 ml-0">
                <div class="logo-container pr-0 pl-0" :class="getHeaderLogoContainerClass">
                    <router-link class="navbar-brand logo-image cursor-pointer" to="/home">
                        <img class="d-none d-sm-inline" src="@/assets/home_images/SP1.png" alt="SkillPeers"/>
                        <img
                                class="d-block d-sm-none"
                                src="@/assets/home_images/SP1.png"
                                alt="SkillPeers"
                        />
                    </router-link>
                </div>
                <div class="mx-auto pr-0 pl-0" :class="getHeaderSearchContainerClass">
                    <search-bar></search-bar>
                </div>
                <div class="text-right my-auto pr-2 pl-0" :class="getHeaderButtonsContainerClass">
                    <div v-if="!$store.getters.userLogedIn">
                        <div class="d-none d-lg-block">
              <span class="nav-item cursor-pointer" @click="goToLogIn">
                <a class="btn-outline-sm">LOG IN</a>
              </span>
                            <span class="nav-item cursor-pointer" @click="goToSignUp">
                <a class="btn-outline-sm">SIGN UP</a>
              </span>
                        </div>

                        <div class="d-lg-none">
                            <el-dropdown trigger="click" @command="handleHambergerMenuClick">
                <span class="el-dropdown-link">
                  <i class="fas fa-bars fa-2x cursor-pointer haber-menu"></i>
                </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item command="login" icon="fas fa-sign-in-alt mr-2">Log IN
                                    </el-dropdown-item>
                                    <el-dropdown-item command="signup" icon="fas fa-key mr-2">SIGN UP</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </div>
                    </div>

                    <div v-if="!$store.getters.userConfirmed && $store.getters.userLogedIn">
                        <div class="d-none d-lg-block">
              <span class="nav-item cursor-pointer" @click="go2ConfirmEmail()">
                <a class="btn-outline-sm">Confirm Email</a>
              </span>
                            <span class="nav-item cursor-pointer" @click="logout">
                <a class="btn-outline-sm cursor-pointer">Log Out</a>
              </span>
                        </div>

                        <div class="d-lg-none">
                            <el-dropdown trigger="click" @command="handleHambergerMenuClick">
                <span class="el-dropdown-link">
                  <i class="fas fa-bars fa-2x cursor-pointer haber-menu"></i>
                </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item
                                            command="confirm"
                                            icon="fas fa-clipboard-check mr-2"
                                    >Confirm Email
                                    </el-dropdown-item>
                                    <el-dropdown-item command="logout" icon="fas fa-sign-out-alt mr-2">Log Out
                                    </el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </div>
                    </div>

                    <div v-if="$store.getters.userConfirmed">
                        <base-dropdown class="nav-link pr-0 home-menu-dropdown-user">
                            <div class="media align-items-center" slot="title">
                <span class="avatar avatar-sm rounded-circle cursor-pointer">
                  <img
                          v-if="$store.getters.userImage"
                          alt="User Image"
                          :src="$store.getters.userImage"
                          width="40px"
                          height="40px"
                  />
                    <div v-else  class="profile-image_svg" v-html="identicon" />
                  <!--<img v-else alt="User Image" src="@/assets/no_avatar/0.png"/>-->

                    <div v-if="unReedMessageCount>0"  class="circlething__badge font-small badge_color">
                     {{unReedMessageCount}}
                    </div>

                </span>
                                <div class="media-body ml-2 d-none d-lg-block">
                  <span class="mb-0 text-sm font-weight-bold header-user-name">
                    {{
                    $store.getters.viewName || "Unkown"
                    }}
                  </span>
                                </div>
                            </div>

                            <template>
                                <div class="dropdown-header noti-title">
                                    <h6 class="text-overflow m-0">Welcome {{ $store.getters.userFirstName }}</h6>
                                </div>

                                <router-link to="/profile" class="dropdown-item navbar-menu-item">
                                    <i class="ni ni-single-02"></i>
                                    <span>Edit Profile</span>
                                </router-link>

                                <router-link to="/messages" class="dropdown-item navbar-menu-item">
                                    <i class="ni ni-chat-round"></i>
                                    <span>Messages</span>
                                    <mdb-badge v-if="unReedMessageCount>0" class="ml-1 badge_color" pill>
                                        <span class="text-white">{{unReedMessageCount}}</span>
                                    </mdb-badge>
                                </router-link>

                                <div class="dropdown-divider"></div>

                                <li class="dropdown-item cursor-pointer" @click="logout">
                                    <i class="ni ni-user-run"></i>
                                    <span>Logout</span>
                                </li>
                            </template>
                        </base-dropdown>
                    </div>
                </div>
            </div>
        </div>
        <!-- end of container -->
    </nav>
    <!-- end of navbar -->
    <!-- end of navigation -->
</template>

<script>
    // import CustomSearchBar from "@/components/CustomSearchBar";
    import SearchBar from "@/components/SearchBar";
    import {mdbBadge} from 'mdbvue';
    import jd from 'jdenticon';

    export default {
        name: "HeaderNavBar",
        components: {
            // CustomSearchBar,
            SearchBar,
            mdbBadge
        },
        data: function () {
            return {
                collapseNav: false,
                unReedMessageCount: 0,
            };
        },
        methods: {
            scrollHandler() {
                //console.log("Scroll fired!", this.$refs["home-navbar"].offsetTop);
                if (window.pageYOffset > 60) {
                    // console.log("Collapsed!");
                    this.collapseNav = true;
                } else {
                    this.collapseNav = false;
                }
            },
            logout() {
                console.log("Logging OUt");
                this.$store
                    .dispatch("user/logout")
                    .then(() => this.$router.replace("/registration"))
                    .catch((err) => console.warn("logout failed", err));
            },
            goToLogIn() {
                // this.$router.push({ name: "registration", params: { regType: "login" } });
                this.$router.push("/registration/account/login");
            },
            goToSignUp() {
                this.$router.push("/registration/account/signup");
            },
            goToHomePage() {
                this.$router.push("home");
            },
            showConfirmedModal() {
                this.$store.dispatch("emailConfirmModal/showModal");
            },
            go2ConfirmEmail() {
                this.$router.push("/registration/confirm");
            },
            handleHambergerMenuClick(cmd) {
                if (cmd == "login") {
                    this.goToLogIn();
                } else if (cmd == "signup") {
                    this.goToSignUp();
                } else if (cmd == "logout") {
                    this.logout();
                } else if (cmd == "confirm") {
                    this.go2ConfirmEmail();
                }
            },
        },
        computed: {
            getHeaderLogoContainerClass() {
                if (!this.$store.getters.userLogedIn) {
                    return "col-xlg-3 col-lg-2 col-md-3 col-sm-3 col-2";
                } else if (
                    !this.$store.getters.userConfirmed &&
                    this.$store.getters.userLogedIn
                ) {
                    return "col-xlg-3 col-lg-2 col-md-3 col-sm-3 col-2";
                }
                return "col-xlg-3 col-lg-3 col-md-3 col-sm-3 col-2 ";
            },
            getHeaderSearchContainerClass() {
                if (!this.$store.getters.userLogedIn) {
                    return "col-xlg-6 col-lg-6 col-md-7 col-sm-7 col-8";
                } else if (
                    !this.$store.getters.userConfirmed &&
                    this.$store.getters.userLogedIn
                ) {
                    return "col-xlg-6 col-lg-6 col-md-7 col-sm-7 col-8";
                }
                return "col-xlg-6 col-lg-6 col-md-6 col-sm-6 col-8";
            },
            getHeaderButtonsContainerClass() {
                if (!this.$store.getters.userLogedIn) {
                    return "col-xlg-3 col-lg-4 col-md-2 col-sm-2 col-2 max-width-350";
                } else if (
                    !this.$store.getters.userConfirmed &&
                    this.$store.getters.userLogedIn
                ) {
                    return "col-xlg-3 col-lg-4 col-md-2 col-sm-2 col-2 max-width-350";
                }
                return "col-xlg-3 col-lg-3 col-md-3 col-sm-3 col-2";
            },
            identicon() {
                let config = {};
                config.backColor = '#f6f6f6';
                let svg =jd.toSvg(this.$store.getters.user.id, 40,config);
                return svg;
            },
        },
        created: function () {
            window.addEventListener("scroll", this.scrollHandler);
        },
        mounted() {
            let params = {};
            params.receiverId = this.$store.getters.user.id;
            params.read = false;

            if (this.$store.getters.userLogedIn) {
                this.$store
                    .dispatch("message/countMessages", params)
                    .then((res) => {
                        this.unReedMessageCount = res;
                    })
                    .catch((err) => {
                        console.warn("failed to get messages count", err);
                    });
            }
        },
    };
</script>

<style lang="scss" scoped>
    .header-button-container {
        text-align: right;
        margin-top: auto;
        margin-bottom: auto;
    }

    .logo-container {
        display: flex;
        align-items: center;

    }

    ::v-deep .dropdown-menu {
        right: 0;
        left: auto;
    }

    ::v-deep h6.text-overflow {
        font-size: 0.625rem !important;
    }

    .cursor-pointer {
        cursor: pointer;
    }

    .navbar-menu-item {
        text-decoration: none !important;
    }

    .max-width-350 {
        max-width: 350px;
    }

    .haber-menu {
        color: white;
    }

    .header-user-name {
        color: #dfe6e9;
    }

    .circlething__badge {
        position: absolute;
        color: white;
        top: 0;
        margin-left:30px ;
        width: 1.2em;
        height: 1.2em;
        background-color: #ff414d;
        font-size: smaller;
        padding: 10px;
        text-align: center;
        align-self: flex-end;
        border-radius: 50%;
        border: 1px solid white;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 101;
    }

    .badge_color{
        background-color: #ff414d;
    }

    ::v-deep .profile-image_svg > svg{
        background: #e8e8e8;
        width: 40px;
        height: 40px;
        border-radius: 100%;
        border: 2px solid #fff;
        position: absolute;
        transform: translate(-50%, -50%);
        vertical-align: middle;
        z-index: 100;
    }

</style>
