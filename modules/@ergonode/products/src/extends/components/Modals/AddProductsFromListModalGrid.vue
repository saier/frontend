/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ModalGrid
        title="Add products from list"
        @close="onClose">
        <template #body>
            <Grid
                :columns="columns"
                :data-count="filtered"
                :rows="rows"
                :drafts="drafts"
                :filters="filterValues"
                :collection-cell-binding="collectionCellBinding"
                :extended-columns="extendedColumns"
                :extended-data-cells="extendedDataCells"
                :extended-data-filter-cells="extendedDataFilterCells"
                :extended-data-edit-cells="extendedDataEditCells"
                :extended-edit-filter-cells="extendedDataEditFilterCells"
                :is-prefetching-data="isPrefetchingData"
                :is-collection-layout="true"
                :is-editable="true"
                :is-header-visible="true"
                :is-basic-filter="true"
                @cell-value="onCellValueChange"
                @fetch-data="onFetchData"
                @remove-all-filter="onRemoveAllFilters"
                @filter="onFilterChange">
                <template #actionsHeader>
                    <slot name="actionsHeader" />
                </template>
                <template #appendFooter>
                    <Button
                        title="SAVE CHANGES"
                        @click.native="onSubmit">
                        <template
                            v-if="isSubmitting"
                            #prepend="{ color }">
                            <IconSpinner :fill-color="color" />
                        </template>
                    </Button>
                </template>
            </Grid>
        </template>
    </ModalGrid>
</template>

<script>
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import {
    DEFAULT_GRID_FETCH_PARAMS,
} from '@Core/defaults/grid';
import scopeErrorsMixin from '@Core/mixins/feedback/scopeErrorsMixin';
import extendedGridComponentsMixin from '@Core/mixins/grid/extendedGridComponentsMixin';
import gridDraftMixin from '@Core/mixins/grid/gridDraftMixin';
import {
    getGridData,
} from '@Core/services/grid/getGridData.service';
import Button from '@UI/components/Button/Button';
import Grid from '@UI/components/Grid/Grid';
import IconSpinner from '@UI/components/Icons/Feedback/IconSpinner';
import ModalGrid from '@UI/components/Modal/ModalGrid';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'AddProductsFromListModalGrid',
    components: {
        ModalGrid,
        Grid,
        Button,
        IconSpinner,
    },
    mixins: [
        gridDraftMixin,
        extendedGridComponentsMixin,
        scopeErrorsMixin,
    ],
    async fetch() {
        await this.onFetchData();

        this.isPrefetchingData = false;
    },
    data() {
        return {
            columns: [],
            rows: [],
            filtered: 0,
            filterValues: {},
            isPrefetchingData: true,
            skus: {},
            isSubmitting: false,
        };
    },
    computed: {
        ...mapState('product', [
            'id',
        ]),
        collectionCellBinding() {
            return {
                imageColumn: 'default_image',
                descriptionColumn: 'default_label',
                type: 'PRODUCT_ATTACH',
                additionalColumns: [
                    'attached',
                ],
            };
        },
    },
    methods: {
        ...mapActions('feedback', [
            'onScopeValueChange',
            'markChangeValuesAsSaved',
        ]),
        ...mapActions('product', [
            'addBySku',
            'removeProductChildren',
        ]),
        onFilterChange(filters) {
            this.filterValues = filters;

            this.onFetchData({
                ...this.localParams,
                filter: this.filterValues,
            });
        },
        onRemoveAllFilters() {
            this.filterValues = {};

            this.onFetchData({
                ...this.localParams,
                filter: {},
            });
        },
        async onFetchData(params = DEFAULT_GRID_FETCH_PARAMS) {
            const {
                columns,
                rows,
                filtered,
            } = await getGridData({
                $route: this.$route,
                $cookies: this.$cookies,
                $axios: this.$axios,
                path: `products/${this.id}/children-and-available-products`,
                params: {
                    ...params,
                    extended: true,
                },
            });

            this.columns = columns.map((column) => {
                if (column.id === 'attached') {
                    return {
                        ...column,
                        filter: {
                            type: 'SELECT',
                            options: {
                                false: {
                                    label: 'Not attached',
                                },
                                true: {
                                    label: 'Attached',
                                },
                            },
                        },
                    };
                }

                return {
                    ...column,
                    editable: false,
                };
            });
            this.rows = rows.map(({
                // eslint-disable-next-line no-unused-vars
                _links, ...rest
            }) => ({
                ...rest,
            }));
            this.filtered = filtered;
        },
        onClose() {
            this.removeScopeErrors(this.scope);

            this.$emit('close');
        },
        async onSubmit() {
            this.isSubmitting = true;

            const requests = [];
            const skusKeys = Object.keys(this.skus);
            const skus = [];

            skusKeys.forEach((key) => {
                const {
                    sku,
                    value,
                } = this.skus[key];

                if (value) {
                    skus.push(sku);
                } else {
                    requests.push(this.removeProductChildren({
                        childrenId: key,
                        skus: sku,
                    }));
                }
            });

            if (skus.length) {
                requests.push(this.addBySku({
                    skus,
                }));
            }

            await Promise.all(requests);

            skusKeys.forEach((key) => {
                const rowIndex = this.rows.findIndex(({
                    id,
                }) => id.value === key);

                if (rowIndex !== -1) {
                    this.rows[rowIndex].attached.value = this.skus[key].value;
                }
            });

            this.setDrafts();
            this.skus = {};

            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: 'Products attachment have been updated',
            });

            this.isSubmitting = false;

            if (skusKeys.length) {
                this.$emit('submitted');
            }

            this.markChangeValuesAsSaved(this.scope);
        },
        onCellValueChange(cellValues) {
            const drafts = {};

            cellValues.forEach(({
                rowId, columnId, value,
            }) => {
                drafts[`${rowId}/${columnId}`] = value;

                const row = this.rows.find(({
                    id,
                }) => rowId === id.value);

                this.skus[rowId] = {
                    sku: row.sku.value,
                    value,
                };
            });

            this.setDrafts({
                ...this.drafts,
                ...drafts,
            });

            this.onScopeValueChange({
                scope: this.scope,
                fieldKey: 'variantProducts',
                value: drafts,
            });
        },
    },
};
</script>
