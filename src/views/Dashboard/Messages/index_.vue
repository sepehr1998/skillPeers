<template>
    <div class="main-view-container ">
        <base-header
                class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
                style="min-height: 100px; background-size: cover; background-position: center top;"
        >
            <!-- Mask -->
            <span class="mask bg-gradient-primary opacity-8"></span>
        </base-header>

        <div class="container-fluid">
            <inbox>
                <inbox-list>
                    <message-item class="unread">
                        <input class="checkbox" type="checkbox" />
                        <header>
                            <div class="sender-info">
                                <span class="subject">Welcome to UK Casino!</span>
                                <span class="from">Casino Management</span>
                            </div>
                            <span class="time">2 days ago</span>
                        </header>
                        <main>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum id metus lacus.</p>
                        </main>
                    </message-item>
                    <message-item class="unread">
                        <input class="checkbox" type="checkbox" />
                        <header>
                            <div class="sender-info">
                                <span class="subject">Welcome to UK Casino!</span>
                                <span class="from">Casino Management</span>
                            </div>
                            <span class="time">2 days ago</span>
                        </header>
                        <main>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum id metus lacus.</p>
                        </main>
                    </message-item>
                    <message-item class="unread">
                        <input class="checkbox" type="checkbox" />
                        <header>
                            <div class="sender-info">
                                <span class="subject">Welcome to UK Casino!</span>
                                <span class="from">Casino Management</span>
                            </div>
                            <span class="time">2 days ago</span>
                        </header>
                        <main>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum id metus lacus.</p>
                        </main>
                    </message-item>
                    <message-item class="">
                        <input class="checkbox" type="checkbox" />
                        <header>
                            <div class="sender-info">
                                <span class="subject">Welcome to UK Casino!</span>
                                <span class="from">Casino Management</span>
                            </div>
                            <span class="time">2 days ago</span>
                        </header>
                        <main>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum id metus lacus.</p>
                        </main>
                    </message-item>
                    <message-item class="unread">
                        <input class="checkbox" type="checkbox" />
                        <header>
                            <div class="sender-info">
                                <span class="subject">Welcome to UK Casino!</span>
                                <span class="from">Casino Management</span>
                            </div>
                            <span class="time">2 days ago</span>
                        </header>
                        <main>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum id metus lacus.</p>
                        </main>
                    </message-item>
                </inbox-list>
            </inbox>


            </div>
        </div>
</template>


<script>

    export default {
        name: "Messages",
        components: {},
        data: function () {
            return {
                showConstructionModal: false,
                messages:[],
            };
        },
        watch: {
            showConstructionModal: function (val) {
                if (val) this.$store.dispatch("underConstructionModal/showModal");
                else this.$store.dispatch("underConstructionModal/hideModal");
            },
        },
        methods: {
            showMessage(msgId) {
                console.log(msgId);
            },
            go2UserProfile(userId) {
                this.$router.push({
                    name: "userprofile",
                    params: {userId: userId},
                });
            },
        },
        mounted() {
            let params = {};
            // params.receiverId = this.$store.getters.user.id;
            params.senderId = this.$store.getters.user.id;

            this.$store
                .dispatch("message/getMessages", params)
                .then((res) => {
                    console.log("messages", res);
                    this.messages =res;

                })
                .catch((err) => {
                    console.warn("failed to get messages", err);
                });
        },
    };
</script>

<style lang="scss" scoped>

    * {
        box-sizing: border-box;
    }

    $color-1: #001E33;
    $color-2: #7e93a4;
    $color-8: #c8e3f5;

    body {
        height: 100vh;
        display: flex;
        width: 100%;
        font-family: "Avenir Next", "Avenir", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    }

    inbox {
        margin: auto;
    }

    inbox-list {
        display: flex;
        width: 500px;
        flex-direction: column;
    }

    message-item {
        width: 100%;
        padding: 1rem;
        margin-bottom: 0.5rem;
        cursor: pointer;
        position: relative;
        opacity: 0.4;

        &.unread {
            background: lighten($color-8, 8%);
            opacity: 0.8;

            &:hover {
                opacity: 1;
            }

            .subject {
                font-weight: 600;
            }
        }

        &:last-child {
            margin-bottom: 0;
        }

        .checkbox {
            position: absolute;
            top: 1.2rem;
        }

        header,
        main {
            margin-left: 2rem;
        }

        header {
            display: flex;
            justify-content: space-between;
            font-size: 1rem;
            color: $color-1;
        }

        .sender-info {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
        }

        .subject {

        }

        .from {
            font-size: 0.8rem;
        }

        .time {
            font-weight: normal;
            font-size: 0.8rem;
        }

        main {
            p {
                width: 100%;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                font-size: 0.8rem;
                color: $color-2;
                margin-bottom: 0;
            }
        }
    }


</style>
