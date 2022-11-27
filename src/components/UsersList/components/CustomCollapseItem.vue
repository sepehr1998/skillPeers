<template>
    <div class="el-collapse-item"
         :class="{'is-active': isActive, 'is-disabled': disabled }">
        <div
                role="tab"
                class="border-0"
                :aria-expanded="isActive"
                :aria-controls="`el-collapse-content-${id}`"
                :aria-describedby="`el-collapse-content-${id}`"
        >
            <div
                    class="el-collapse-item__header border-0"
                    @click="handleHeaderClick"
                    role="button"
                    :id="`el-collapse-head-${id}`"
                    :tabindex="disabled ? undefined : 0"
                    @keyup.space.enter.stop="handleEnterClick"
                    :class="{
          'focusing': focusing,
          'is-active': isActive
        }"
                    @focus="handleFocus"
                    @blur="focusing = false"
            >
                <slot name="title">{{title}}</slot>
                <i
                        class="el-collapse-item__arrow el-icon-arrow-right"
                        :class="{'is-active': isActive}">
                </i>
            </div>
        </div>
        <el-collapse-transition>
            <div
                    class="el-collapse-item__wrap border-0"
                    v-show="isActive"
                    role="tabpanel"
                    :aria-hidden="!isActive"
                    :aria-labelledby="`el-collapse-head-${id}`"
                    :id="`el-collapse-content-${id}`"
            >
                <div class="el-collapse-item__content pb-0">
                    <slot></slot>
                </div>
            </div>
        </el-collapse-transition>
    </div>
</template>
<script>
    import ElCollapseTransition from 'element-ui/src/transitions/collapse-transition';
    import Emitter from 'element-ui/src/mixins/emitter';
    import {generateId} from 'element-ui/src/utils/util';

    export default {
        name: 'CustomCollapseItem',

        componentName: 'CustomCollapseItem',

        mixins: [Emitter],

        components: {ElCollapseTransition},

        data() {
            return {
                contentWrapStyle: {
                    height: 'auto',
                    display: 'block'
                },
                contentHeight: 0,
                focusing: false,
                isClick: false,
                id: generateId()
            };
        },

        inject: ['collapse'],

        props: {
            title: String,
            name: {
                type: [String, Number],
                default() {
                    return this._uid;
                }
            },
            disabled: Boolean
        },

        computed: {
            isActive() {
                return this.collapse.activeNames.indexOf(this.name) > -1;
            }
        },

        methods: {
            handleFocus() {
                setTimeout(() => {
                    if (!this.isClick) {
                        this.focusing = true;
                    } else {
                        this.isClick = false;
                    }
                }, 50);
            },
            handleHeaderClick() {
                if (this.disabled) return;
                this.dispatch('ElCollapse', 'item-click', this);
                this.focusing = false;
                this.isClick = true;
            },
            handleEnterClick() {
                this.dispatch('ElCollapse', 'item-click', this);
            }
        }
    };
</script>
<style lang="scss" scoped>
    .el-collapse-item{
        background: #FFF;
    }
</style>