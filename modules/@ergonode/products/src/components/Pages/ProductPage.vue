/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Page>
        <TitleBar
            :title="title"
            :is-read-only="isReadOnly">
            <template #prependHeader>
                <NavigationBackFab />
            </template>
            <template #mainAction>
                <template
                    v-for="(actionItem, index) in extendedMainAction">
                    <Component
                        :is="actionItem.component"
                        :key="index"
                        v-bind="bindingProps(actionItem)" />
                </template>
                <Button
                    :theme="secondaryTheme"
                    :size="smallSize"
                    title="REMOVE PRODUCT"
                    :disabled="!isAllowedToDelete"
                    @click.native="onRemove">
                    <template #prepend="{ color }">
                        <IconDelete :fill-color="color" />
                    </template>
                </Button>
            </template>
        </TitleBar>
        <HorizontalRoutingTabBar
            v-if="asyncTabs"
            :items="asyncTabs"
            :change-values="changeValues"
            :errors="errors" />
    </Page>
</template>
<script>
import {
    SIZE,
} from '@Core/defaults/theme';
import editPageMixin from '@Core/mixins/page/editPageMixin';
import {
    getNestedTabRoutes,
} from '@Core/models/navigation/tabs';
import {
    getKeyByValue,
} from '@Core/models/objectWrapper';
import PRIVILEGES from '@Products/config/privileges';
import {
    mapState,
} from 'vuex';

export default {
    name: 'ProductPage',
    mixins: [
        editPageMixin,
    ],
    data() {
        return {
            asyncTabs: null,
        };
    },
    computed: {
        ...mapState('product', [
            'type',
        ]),
        ...mapState('dictionaries', [
            'productTypes',
        ]),
        extendedMainAction() {
            return this.$getExtendedComponents('@Products/components/Pages/ProductPage/mainAction');
        },
        smallSize() {
            return SIZE.SMALL;
        },
        isAllowedToDelete() {
            return this.$hasAccess([
                PRIVILEGES.PRODUCT.delete,
            ]);
        },
        isReadOnly() {
            return this.$isReadOnly(PRIVILEGES.PRODUCT.namespace);
        },
    },
    watch: {
        $route: {
            immediate: true,
            async handler() {
                const tmpTabs = getNestedTabRoutes({
                    hasAccess: this.$hasAccess,
                    routes: this.$router.options.routes,
                    route: this.$route,
                });
                const type = getKeyByValue(this.productTypes, this.type);
                const tabs = await this.$extendMethods('@Core/pages/tabs', {
                    $this: this,
                    type,
                    tabs: tmpTabs,
                });

                this.asyncTabs = tabs.length ? Array.from(new Set([].concat(...tabs))) : tmpTabs;
            },
        },
    },
    methods: {
        bindingProps({
            props = {},
        }) {
            return {
                privileges: PRIVILEGES.PRODUCT,
                ...props,
            };
        },
    },
};
</script>
