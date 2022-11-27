<template>
    <nav
            class="navbar navbar-vertical fixed-left navbar-expand-md navbar-light bg-white"
            id="sidenav-main"
    >
        <div class="container-fluid" >
            <!--Toggler-->
            <navbar-toggle-button @click.native="showSidebar">
                <span class="navbar-toggler-icon"></span>
            </navbar-toggle-button>
            <router-link class="navbar-brand" to="/home">
                <img :src="logo" class="navbar-brand-img" alt="..."/>
            </router-link>
            <slot name="mobile-right">
                <ul class="nav align-items-center d-md-none">
                    <!--<base-dropdown class="nav-item" position="right">-->
                    <!--<a-->
                    <!--slot="title"-->
                    <!--class="nav-link nav-link-icon"-->
                    <!--href="#"-->
                    <!--role="button"-->
                    <!--data-toggle="dropdown"-->
                    <!--aria-haspopup="true"-->
                    <!--aria-expanded="false"-->
                    <!--&gt;-->
                    <!--<i class="ni ni-bell-55"></i>-->
                    <!--</a>-->

                    <!--<a class="dropdown-item" href="#">Action</a>-->
                    <!--<a class="dropdown-item" href="#">Another action</a>-->
                    <!--<div class="dropdown-divider"></div>-->
                    <!--<a class="dropdown-item" href="#">Something else here</a>-->
                    <!--</base-dropdown>-->
                    <base-dropdown class="nav-item" position="right">
                        <a slot="title" class="nav-link" href="#" role="button">
                            <div class="media align-items-center">
                <span class="avatar avatar-sm rounded-circle">
                  <img
                          v-if="$store.getters.userImage"
                          alt="User Image"
                          :src="$store.getters.userImage"
                          width="40px"
                          height="40px"
                  />
                    <div v-else  class="profile-image_svg" v-html="identicon" />
              <!--<img v-else alt="User Image" src="@/assets/no_avatar/0.png"/>-->
                    <div v-if="unReedMessageCount>0" class="circlething__badge font-small badge_color">
                     {{unReedMessageCount}}
                    </div>
                </span>
                            </div>
                        </a>

                        <div class=" dropdown-header noti-title">
                            <h6 class="text-overflow m-0">Welcome!</h6>
                        </div>
                        <router-link to="/profile" class="dropdown-item">
                            <i class="ni ni-single-02"></i>
                            <span>Edit Profile</span>
                        </router-link>
                        <!--<router-link to="/profile" class="dropdown-item">-->
                        <!--<i class="ni ni-settings-gear-65"></i>-->
                        <!--<span>Settings</span>-->
                        <!--</router-link>-->
                        <!--<router-link to="/profile" class="dropdown-item">-->
                        <!--<i class="ni ni-calendar-grid-58"></i>-->
                        <!--<span>Activity</span>-->
                        <!--</router-link>-->
                        <!--<router-link to="/profile" class="dropdown-item">-->
                        <!--<i class="ni ni-support-16"></i>-->
                        <!--<span>Support</span>-->
                        <!--</router-link>-->
                        <router-link to="/messages" class="dropdown-item">
                            <i class="ni ni-chat-round text-dark"></i>
                            <span>Messages</span>
                            <mdb-badge v-if="unReedMessageCount>0" class="ml-1 badge_color" pill>
                                <span class="text-white">{{unReedMessageCount}}</span>
                            </mdb-badge>
                        </router-link>
                        <div class="dropdown-divider"></div>
                        <div class="dropdown-item cursor-pointer" @click="logout">
                            <i class="ni ni-user-run"></i>
                            <span>Logout</span>
                        </div>
                    </base-dropdown>
                </ul>
            </slot>
            <slot></slot>
            <div
                    v-show="$sidebar.showSidebar"
                    class="navbar-collapse collapse show"
                    id="sidenav-collapse-main"
            >
                <div class="navbar-collapse-header d-md-none">
                    <div class="row">
                        <div class="col-6 collapse-brand">
                            <router-link to="/">
                                <img :src="logo"/>
                            </router-link>
                        </div>
                        <div class="col-6 collapse-close">
                            <navbar-toggle-button
                                    @click.native="closeSidebar"
                            ></navbar-toggle-button>
                        </div>
                    </div>
                </div>

                <ul class="navbar-nav">
                    <slot name="links"></slot>
                </ul>
                <!--Divider-->
                <!--<hr class="my-3" />-->
                <!--Heading-->
                <!--<h6 class="navbar-heading text-muted">Documentation</h6>-->
                <!--Navigation-->
                <!--<ul class="navbar-nav mb-md-3">-->
                <!--<sidebar-item-->
                <!--:link="{-->
                <!--name: 'How to use',-->
                <!--icon: 'ni ni-spaceship ',-->
                <!--path: '/how-to-use',-->
                <!--}"-->
                <!--/>-->

                <!--<sidebar-item-->
                <!--:link="{-->
                <!--name: 'Foundation',-->
                <!--icon: 'ni ni-atom',-->
                <!--path: '/foundation',-->
                <!--}"-->
                <!--/>-->

                <!--<sidebar-item-->
                <!--:link="{-->
                <!--name: 'About US',-->
                <!--icon: 'ni ni-support-16',-->
                <!--path: '/about-us',-->
                <!--}"-->
                <!--/>-->
                <!--</ul>-->
            </div>
        </div>
    </nav>
</template>
<script>
    import NavbarToggleButton from "@/components/NavbarToggleButton";
    import {mdbBadge} from 'mdbvue';
    import jd from 'jdenticon';

    export default {
        name: "sidebar",
        components: {
            NavbarToggleButton,
            mdbBadge
        },
        data() {
            return {
                unReedMessageCount: 0,
            };
        },
        props: {
            logo: {
                type: String,
                default: require("@/assets/home_images" + "/SP1.png"),
                description: "Sidebar app logo",
            },
            autoClose: {
                type: Boolean,
                default: true,
                description:
                    "Whether sidebar should autoclose on mobile when clicking an item",
            },
        },
        provide() {
            return {
                autoClose: this.autoClose,
            };
        },
        methods: {
            closeSidebar() {
                this.$sidebar.displaySidebar(false);
            },
            showSidebar() {
                this.$sidebar.displaySidebar(true);
            },
            logout() {
                console.log("Logging OUt");
                this.$store
                    .dispatch("user/logout")
                    .then(() => {
                        console.log("success");
                        this.$router.push("/registration/account/login")
                    })
                    .catch(err => {
                        console.warn("logout failed", err);
                    });
            },
        },
        beforeDestroy() {
            if (this.$sidebar.showSidebar) {
                this.$sidebar.showSidebar = false;
            }
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
        computed: {
            identicon() {
                let config = {};
                config.backColor = '#f6f6f6';
                let svg =jd.toSvg(this.$store.getters.user.id, 40,config);
                return svg;
            },
        },
    };
</script>

<style lang="scss" scoped>
    .badge_color {
        background-color: #ff414d;
    }
</style>

<style lang="scss" scoped>
    .badge_color {
        background-color: #ff414d;
    }

    .circlething__badge {
        position: absolute;
        color: white;
        top: 0;
        margin-left: 30px;
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
