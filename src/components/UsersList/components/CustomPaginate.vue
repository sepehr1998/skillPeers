<template>
    <div>
        <ul v-if="pageCount>0" class="pagination" :style="ulStyles">

            <li class="page-item first" :class="{'disabled': currentPageNumber === 1}" :style="liStyles">
                <a class="page-link" @click="setPage(1)" :style="aStyles"><i class="fa fa-fast-backward"
                                                                             aria-hidden="true"></i></a>
            </li>
            <li class="page-item previous" :class="{'disabled': currentPageNumber === 1}" :style="liStyles">
                <a class="page-link" @click="setPage(currentPageNumber - 1)" :style="aStyles"><i
                        class="fa fa-step-backward" aria-hidden="true"></i></a>
            </li>


            <li v-for="page in pager.pages" :key="page" class="page-item page-number"
                :class="{'active': pager.currentPage === page}" :style="liStyles">
                <a class="page-link" @click="setPage(page)" :style="aStyles">{{page}}</a>
            </li>


            <li class="page-item next" :class="{'disabled': currentPageNumber === pageCount}" :style="liStyles">
                <a class="page-link" @click="setPage(currentPageNumber + 1)" :style="aStyles"><i
                        class="fa fa-step-forward" aria-hidden="true"></i></a>
            </li>
            <li class="page-item last" :class="{'disabled': currentPageNumber === pageCount}" :style="liStyles">
                <a class="page-link" @click="setPage(pageCount)" :style="aStyles"><i class="fa fa-fast-forward"
                                                                                     aria-hidden="true"></i></a>
            </li>
        </ul>

    </div>


</template>

<script>
    import paginate from 'jw-paginate';

    const defaultLabels = {
        first: '<<',
        last: '>>',
        previous: '<',
        next: '>'
    };

    const defaultStyles = {
        ul: {
            margin: 0,
            padding: 0,
            display: 'inline-block'
        },
        li: {
            listStyle: 'none',
            display: 'inline',
            textAlign: 'center'
        },
        a: {
            cursor: 'pointer',
            margin: 'auto',
            float: 'left'
        }
    };

    export default {
        name: "CustomPaginate",
        props: {
            initialPage: {
                type: Number,
                default: 1
            },
            pageSize: {
                type: Number,
                default: 10
            },
            pageCount: {
                type: Number,
                default: 10
            },
            currentPageNumber: {
                type: Number,
                default: 1
            },
            maxPages: {
                type: Number,
                default: 6
            },
            labels: {
                type: Object,
                default: () => defaultLabels
            },
            styles: {
                type: Object
            },
            disableDefaultStyles: {
                type: Boolean,
                default: false
            },

        },
        data() {
            return {
                pager: {},
                ulStyles: {},
                liStyles: {},
                aStyles: {},
            }
        },
        created() {
            if (!this.$listeners.changePage) {
                throw 'Missing required event listener: "changePage"';
            }

            // set default styles unless disabled
            if (!this.disableDefaultStyles) {
                this.ulStyles = defaultStyles.ul;
                this.liStyles = defaultStyles.li;
                this.aStyles = defaultStyles.a;
            }

            // merge custom styles with default styles
            if (this.styles) {
                this.ulStyles = {...this.ulStyles, ...this.styles.ul};
                this.liStyles = {...this.liStyles, ...this.styles.li};
                this.aStyles = {...this.aStyles, ...this.styles.a};
            }

            console.log("=====", this.initialPage);

            // set to initial page
            this.setPage(this.initialPage);
        },
        methods: {
            setPage(page) {
                console.log("current page number", page);

                // emit change page event to parent component
                this.$emit('changePage', page);


                const {pageSize, maxPages} = this;

                // get new pager object for specified page
                const pager = paginate(this.pageCount * this.pageSize, page, pageSize, maxPages);

                // update pager
                this.pager = pager;
            },

        },
        watch: {
            pageCount: function (newVal) {
                 console.log("New page count:", newVal);
                this.setPage(this.currentPageNumber);
            },
            currentPageNumber: function (newVal) {
                 console.log("New page num:", newVal);
                this.setPage(newVal);
            }
        },
        computed: {},
    }
</script>

<style lang="scss" scoped>
    /*ul{*/
    /*margin: 0;*/
    /*padding: 0;*/
    /*display: inline-block;*/
    /*}*/

    /*li{*/
    /*list-style: none;*/
    /*display: inline;*/
    /*text-align: center;*/
    /*}*/

    /*a{*/
    /*cursor: pointer;*/
    /*margin: auto;*/
    /*float: left;*/
    /*}*/

    a{
        margin-left: 2px !important;
        margin-right: 2px !important;
    }

    .page-item.active{
        color: #ffffff !important;
    }

</style>