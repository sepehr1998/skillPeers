<template>
    <div data-proslinks-homepage>
        <header-nav-bar></header-nav-bar>
        <header data-v-cb8900d0="" id="header" class="header">
            <div data-v-cb8900d0="" class="header-content"></div>
        </header>

        <users-list :type="type" :like="like"></users-list>

        <home-footer></home-footer>
    </div>
</template>
<script>
    import HomeFooter from "@/layouts/home/components/footer";
    import HeaderNavBar from "@/layouts/home/components/header/header-nav-bar";
    import UsersList from "@/components/UsersList";

    export default {
        components: {
            HeaderNavBar,
            HomeFooter,
            UsersList
        },
        props: {
            type: {
                type: String,
                default: "",
            },
            like: {
                type: String,
                default: "",
            },
        },
        data: function () {
            return {
                currentPage: 0,
                wattingForData: false,
                users: [],
            };
        },
        methods: {
            loadData() {
                if (this.type == "name") {
                    this.searchByName({
                        firstName: this.like ? this.like : "",
                        page: this.currentPage,
                    });
                } else if (this.type == "skill") {
                    this.searchBySkills({
                        name: this.like ? this.like : "",
                    });
                } else if (!this.type && !this.like) {
                    console.log("Loading all data");
                    this.searchByName({
                        page: this.currentPage,
                    });
                } else {
                    console.log("redirecting");
                    // this.$router.push("/users");
                }
            },
            searchBySkills(params) {
                this.wattingForData = true;
                this.$store
                    .dispatch("search/searchSkills", params)
                    .then((res) => {
                        let data = res | [];
                        let skillIds = data.map((s) => s.id);
                        this.searchByName({
                            skillIds,
                        });
                    })
                    .catch((err) => {
                        console.warn("failed searching for skils", err);
                        this.wattingForData = false;
                    });
            },
            searchByName(params) {
                this.wattingForData = true;
                this.$store
                    .dispatch("search/searchUsers", params)
                    .then((res) => {
                        console.log("Results of searchUsers", res);
                        this.users = res;
                        this.wattingForData = false;
                    })
                    .catch((err) => {
                        console.warn("Faild loading search data by name", err);
                        this.wattingForData = false;
                    });
            },
        },
        mounted() {
            console.log("New Type:", this.type);
            console.log("New Like:", this.like);
            this.loadData();
        },
        watch: {
            type: (newVal) => {
                console.log("New Type:", newVal);
                this.loadData();
            },
            like: (newVal) => {
                console.log("New Like:", newVal);
                this.loadData();
            },
        },
        computed: {
            hasQueryResult() {
                return (this.wattingForData === false && this.users !== undefined && this.users.length > 0);
            }
        }
    };
</script>
<style lang="scss" scoped>
    .waitting-container {
        width: 100%;
        height: 500px;

        display: flex;
        justify-content: center;
        align-items: center;
    }

    .cards-container {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        align-items: flex-start;
        align-content: stretch;
    }

    .user-card-data {
        width: 300px;
        margin: 10px;
    }

    div[data-proslinks-homepage] .navbar-custom.fixed-top {
        padding: 0.5rem 1.5rem 0.5rem 2rem !important;
        background-color: #3d79b0 !important;
        -webkit-box-shadow: 0 0.0625rem 0.375rem 0 rgba(0, 0, 0, 0.1) !important;
        box-shadow: 0 0.0625rem 0.375rem 0 rgba(0, 0, 0, 0.1) !important;
    }

    div[data-proslinks-homepage] .header {
        background-color: #3d79b0;
    }

    div[data-proslinks-homepage] .header .header-content {
        padding-top: 0 !important;
        padding-bottom: 4rem !important;
        text-align: center;
    }
</style>
