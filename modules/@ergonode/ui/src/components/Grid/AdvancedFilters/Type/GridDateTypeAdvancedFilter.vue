/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridAdvancedFilter
        :index="index"
        :value="filterValue"
        :hint="hint"
        :title="title"
        :filter-id="filter.id"
        @remove="onRemove"
        @swap="onSwap"
        @apply="onApplyValue">
        <template #body>
            <GridAdvancedFilterDateContent
                :value="localValue"
                :format="parameters"
                @input="onValueChange" />
        </template>
        <template #footer="{ onApply }">
            <SelectDropdownApplyFooter
                @apply="onApply"
                @clear="onClear" />
        </template>
    </GridAdvancedFilter>
</template>

<script>
import {
    FILTER_OPERATOR,
} from '@Core/defaults/operators';
import GridAdvancedFilterDateContent from '@UI/components/Grid/AdvancedFilters/Content/GridAdvancedFilterDateContent';
import GridAdvancedFilter from '@UI/components/Grid/AdvancedFilters/GridAdvancedFilter';
import SelectDropdownApplyFooter from '@UI/components/Select/DropDown/Footers/SelectDropdownApplyFooter';
import {
    DEFAULT_FORMAT,
} from '@UI/models/calendar';
import {
    format as formatDate,
    parse as parseDate,
} from 'date-fns';

export default {
    name: 'GridDateTypeAdvancedFilter',
    components: {
        GridAdvancedFilter,
        GridAdvancedFilterDateContent,
        SelectDropdownApplyFooter,
    },
    props: {
        /**
         * Index of given component at the loop
         */
        index: {
            type: Number,
            required: true,
        },
        /**
         * Filter data model
         */
        filter: {
            type: Object,
            required: true,
        },
        /**
         * Component value
         */
        value: {
            type: Object,
            default: () => ({
                isEmptyRecord: false,
                [FILTER_OPERATOR.GREATER_OR_EQUAL]: null,
                [FILTER_OPERATOR.SMALLER_OR_EQUAL]: null,
            }),
        },
    },
    data() {
        return {
            localValue: {},
        };
    },
    computed: {
        parameters() {
            if (!this.filter.parameters) return '';

            return Object.values(this.filter.parameters).join(', ');
        },
        title() {
            const [
                code,
            ] = this.filter.id.split(':');

            return this.filter.label || `#${code}`;
        },
        hint() {
            const [
                code,
                languageCode,
            ] = this.filter.id.split(':');

            return this.filter.label ? `${code} ${languageCode}` : null;
        },
        filterValue() {
            if (this.localValue.isEmptyRecord) return 'Empty records';

            return [
                this.localValue[FILTER_OPERATOR.GREATER_OR_EQUAL],
                this.localValue[FILTER_OPERATOR.SMALLER_OR_EQUAL],
            ].filter(value => value)
                .map(value => formatDate(value, this.parameters))
                .join(' - ');
        },
    },
    watch: {
        value: {
            immediate: true,
            handler() {
                const fromDate = this.value[FILTER_OPERATOR.GREATER_OR_EQUAL]
                    ? parseDate(
                        this.value[FILTER_OPERATOR.GREATER_OR_EQUAL],
                        DEFAULT_FORMAT,
                        new Date(),
                    )
                    : null;
                const toDate = this.value[FILTER_OPERATOR.SMALLER_OR_EQUAL]
                    ? parseDate(
                        this.value[FILTER_OPERATOR.SMALLER_OR_EQUAL],
                        DEFAULT_FORMAT,
                        new Date(),
                    )
                    : null;

                this.localValue = {
                    ...this.value,
                    [FILTER_OPERATOR.GREATER_OR_EQUAL]: fromDate,
                    [FILTER_OPERATOR.SMALLER_OR_EQUAL]: toDate,
                };
            },
        },
    },
    methods: {
        onValueChange({
            from, to,
        }) {
            const value = {
                [FILTER_OPERATOR.GREATER_OR_EQUAL]: null,
                [FILTER_OPERATOR.SMALLER_OR_EQUAL]: null,
            };

            if (from) {
                value[FILTER_OPERATOR.GREATER_OR_EQUAL] = from;
            }

            if (to) {
                value[FILTER_OPERATOR.SMALLER_OR_EQUAL] = to;
            }

            this.localValue = {
                ...this.localValue,
                ...value,
            };
        },
        onRemove(index) {
            this.$emit('remove', index);
        },
        onSwap(payload) {
            this.$emit('swap', payload);
        },
        onClear() {
            this.localValue = {
                isEmptyRecord: false,
                [FILTER_OPERATOR.GREATER_OR_EQUAL]: null,
                [FILTER_OPERATOR.SMALLER_OR_EQUAL]: null,
            };
        },
        onApplyValue() {
            const filterValue = {
                ...this.localValue,
            };

            if (filterValue[FILTER_OPERATOR.GREATER_OR_EQUAL]) {
                const fromValue = formatDate(
                    filterValue[FILTER_OPERATOR.GREATER_OR_EQUAL],
                    DEFAULT_FORMAT,
                );

                filterValue[FILTER_OPERATOR.GREATER_OR_EQUAL] = fromValue;
            }

            if (filterValue[FILTER_OPERATOR.SMALLER_OR_EQUAL]) {
                const toValue = formatDate(
                    filterValue[FILTER_OPERATOR.SMALLER_OR_EQUAL],
                    DEFAULT_FORMAT,
                );

                filterValue[FILTER_OPERATOR.SMALLER_OR_EQUAL] = toValue;
            }

            if (JSON.stringify(this.value) !== JSON.stringify(this.localValue)) {
                this.$emit('apply', {
                    key: this.filter.id,
                    value: filterValue,
                });
            }
        },
    },
};
</script>
