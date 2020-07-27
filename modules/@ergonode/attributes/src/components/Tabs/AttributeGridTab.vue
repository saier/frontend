/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ResponsiveCenteredViewTemplate>
        <template #content>
            <Grid
                :is-editable="$hasAccess(['ATTRIBUTE_UPDATE'])"
                :columns="columns"
                :data-count="filtered"
                :rows="rows"
                :is-prefetching-data="isPrefetchingData"
                :is-basic-filter="true"
                :is-border="true"
                @editRow="onEditRow"
                @deleteRow="onRemoveRow"
                @fetchData="getGridData" />
        </template>
    </ResponsiveCenteredViewTemplate>
</template>

<script>
import ResponsiveCenteredViewTemplate from '@Core/components/Layout/Templates/ResponsiveCenteredViewTemplate';
import gridFetchDataMixin from '@Core/mixins/grid/gridFetchDataMixin';

export default {
    name: 'AttributeGridTab',
    components: {
        ResponsiveCenteredViewTemplate,
    },
    mixins: [
        gridFetchDataMixin({
            path: 'attributes',
        }),
    ],
    methods: {
        onEditRow(args) {
            const lastIndex = args.length - 1;

            this.$router.push({
                name: 'attribute-id-general',
                params: {
                    id: args[lastIndex],
                },
            });
        },
    },
};
</script>