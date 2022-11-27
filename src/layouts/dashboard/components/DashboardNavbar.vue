<template>
    <base-nav class="navbar-top navbar-dark" id="navbar-main" :show-toggle-button="false" expand>
        <form class="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
            <div class="form-group mb-0">
                <!--<base-input-->
                <!--placeholder="Search"-->
                <!--class="input-group-alternative"-->
                <!--alternative=""-->
                <!--addon-right-icon="fas fa-search"-->
                <!--&gt;-->
                <!--</base-input>-->
            </div>
        </form>
        <ul class="navbar-nav align-items-center d-none d-md-flex">
            <li class="nav-item dropdown">
                <base-dropdown class="nav-link pr-0">
                    <div class="media align-items-center" slot="title">
            <span class="avatar avatar-sm rounded-circle">
              <img v-if="$store.getters.userImage" alt="User Image" :src="$store.getters.userImage"
                   width="40px"
                   height="40px"/>
                <div v-else  class="profile-image_svg" v-html="identicon" />
              <!--<img v-else alt="User Image" src="@/assets/no_avatar/0.png"/>-->
                <div v-if="unReedMessageCount>0"  class="circlething__badge font-small badge_color">
                     {{unReedMessageCount}}
                    </div>
            </span>
                        <div class="media-body ml-2 d-none d-lg-block">
              <span class="mb-0 text-sm font-weight-bold">
                {{
                $store.getters.viewName || "No Name"
                }}
              </span>
                        </div>
                    </div>

                    <template>
                        <div class="dropdown-header noti-title">
                            <h6 class="text-overflow m-0">Welcome!</h6>
                        </div>
                        <router-link to="/profile" class="dropdown-item">
                            <i class="ni ni-single-02"></i>
                            <span>Edit Profile</span>
                        </router-link>
                        <router-link to="/messages" class="dropdown-item">
                            <i class="ni ni-chat-round text-dark"></i>
                            <span>Messages</span>
                            <mdb-badge v-if="unReedMessageCount>0" class="ml-1 badge_color" pill>
                                <span class="text-white">{{unReedMessageCount}}</span>
                            </mdb-badge>
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
                        <div class="dropdown-divider"></div>

                        <div class="dropdown-item cursor-pointer" @click="logout">
                            <i class="ni ni-user-run"></i>
                            <span>Logout</span>
                        </div>

                        <!--<li class="dropdown-item" @click="logout">-->
                        <!--<i class="ni ni-user-run"></i>-->
                        <!--<span>Logout</span>-->
                        <!--</li>-->
                    </template>
                </base-dropdown>
            </li>
        </ul>
    </base-nav>
</template>
<script>
    import {mdbBadge} from 'mdbvue';
    import jd from 'jdenticon';

    export default {
        components: {
            mdbBadge
        },
        data() {
            return {
                activeNotifications: false,
                showMenu: false,
                searchQuery: "",
                collapseNav: false,
                unReedMessageCount: 0,
            };
        },
        methods: {
            toggleSidebar() {
                this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
            },
            hideSidebar() {
                this.$sidebar.displaySidebar(false);
            },
            toggleMenu() {
                this.showMenu = !this.showMenu;
            },
            logout() {
                console.log("Logging OUt");
                this.$store
                    .dispatch("user/logout")
                    .then(() => {
                        console.log("success");
                        this.$router.push("/registration/account/login");
                    })
                    .catch(err => {
                        console.warn("logout failed", err);
                    });
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
    .cursor-pointer {
        cursor: pointer;
    }

    .badge_color{
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
        z-index: 101;
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
