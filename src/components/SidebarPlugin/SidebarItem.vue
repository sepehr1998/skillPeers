<template>
    <li class="nav-item">
        <router-link
                :to="link.path"
                @click.native="linkClick"
                class="nav-link"
                :target="link.target"
                :href="link.path">
            <template>
                <i :class="link.icon"></i>
                <span class="nav-link-text">{{ link.name }}</span>
                <!--<mdb-badge v-if="badge" color="badge-primary" pill>{{badge}}</mdb-badge>-->
            </template>
        </router-link>
    </li>
</template>
<script>
    // import {mdbBadge} from 'mdbvue';

    export default {
        name: 'sidebar-item',
        components: {
            // mdbBadge
        },
        props: {
            link: {
                type: Object,
                default: () => {
                    return {
                        name: '',
                        path: '',
                        children: []
                    };
                },
                description:
                    'Sidebar link. Can contain name, path, icon and other attributes. See examples for more info'
            },
            badge: {}
        },
        inject: {
            autoClose: {
                default: true
            }
        },
        data() {
            return {
                children: [],
                collapsed: true
            };
        },
        methods: {
            linkClick() {
                if (
                    this.autoClose &&
                    this.$sidebar &&
                    this.$sidebar.showSidebar === true
                ) {
                    this.$sidebar.displaySidebar(false);
                }
            }
        }
    };
</script>


<style lang="scss">
    .badge-primary {
        margin-left: 10px;
        color: #fff !important;
        background-color: #007bff !important;
    }
</style>