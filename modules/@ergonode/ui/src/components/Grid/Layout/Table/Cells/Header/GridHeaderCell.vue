/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridTableCell
        :row="rowIndex"
        :column="columnIndex"
        :locked="true">
        <div
            :class="classes"
            @mouseenter="onMouseEnter"
            @mouseleave="onMouseLeave">
            <GridTitleHeaderCell
                :title="title"
                :hint="hint" />
            <div
                v-show="isActionsVisible"
                :class="headerActionsClasses">
                <IconArrowSort
                    :order="sortingOrder"
                    :fill-color="graphiteLightColor"
                    @click.native="onClickSort" />
                <ActionIconButton
                    v-if="deletable"
                    :theme="secondaryPlainTheme"
                    :size="tinySize"
                    :options="contextualMenuItems"
                    @focus="onSelectFocus"
                    @input="onSelectOption">
                    <template #icon="{ color }">
                        <IconDots :fill-color="color" />
                    </template>
                </ActionIconButton>
            </div>
        </div>
    </GridTableCell>
</template>

<script>
import {
    SORTING_ORDER,
} from '@Core/defaults/icons';
import {
    SIZE,
    THEME,
} from '@Core/defaults/theme';
import {
    isObject,
} from '@Core/models/objectWrapper';
import {
    GRAPHITE_LIGHT,
} from '@UI/assets/scss/_js-variables/colors.scss';
import ActionIconButton from '@UI/components/ActionIconButton/ActionIconButton';
import GridTableCell from '@UI/components/Grid/Layout/Table/Cells/GridTableCell';
import GridTitleHeaderCell from '@UI/components/Grid/Layout/Table/Cells/Header/GridTitleHeaderCell';
import IconArrowSort from '@UI/components/Icons/Arrows/IconArrowSort';
import IconDots from '@UI/components/Icons/Others/IconDots';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'GridHeaderCell',
    components: {
        GridTableCell,
        GridTitleHeaderCell,
        ActionIconButton,
        IconArrowSort,
        IconDots,
    },
    props: {
        /**
         * The label is a text caption or description for the component
         */
        label: {
            type: String,
            default: 'Header',
        },
        /**
         * Unique column identifier
         */
        columnId: {
            type: [
                String,
                Number,
            ],
            required: true,
        },
        /**
         * Data about order of sorted column
         */
        sortedColumn: {
            type: Object,
            required: true,
        },
        /**
         * Column index of given component at the loop
         */
        columnIndex: {
            type: Number,
            required: true,
        },
        /**
         * Row index of given component at the loop
         */
        rowIndex: {
            type: Number,
            required: true,
        },
        /**
         * Determines whether column is deletable or not
         */
        deletable: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            isMenuSelected: false,
            isHovered: false,
        };
    },
    computed: {
        ...mapState('draggable', [
            'isElementDragging',
            'draggedElement',
        ]),
        classes() {
            return [
                'grid-header-cell',
                {
                    'grid-header-cell--exists': this.isColumnExist,
                },
            ];
        },
        headerActionsClasses() {
            return [
                'grid-header-cell-actions',
                {
                    'grid-header-cell-actions--focused': this.isMenuSelected,
                },
            ];
        },
        contextualMenuItems() {
            return [
                'Remove',
            ];
        },
        tinySize() {
            return SIZE.TINY;
        },
        secondaryPlainTheme() {
            return THEME.SECONDARY_PLAIN;
        },
        graphiteLightColor() {
            return GRAPHITE_LIGHT;
        },
        isColumnExist() {
            return (isObject(this.draggedElement) && this.draggedElement.id === this.columnId)
                || this.draggedElement === this.columnId;
        },
        isSorted() {
            return this.sortedColumn.index === this.columnId;
        },
        sortingOrder() {
            if (!this.isSorted) return null;

            return this.sortedColumn.orderState;
        },
        isActionsVisible() {
            return !this.isColumnExist
                && (this.isSorted || this.isMenuSelected || this.isHovered);
        },
        title() {
            const [
                code,
                languageCode,
            ] = this.columnId.split(':');
            const title = this.label || `#${code}`;
            const languageTitle = languageCode ? languageCode.toUpperCase() : '';

            return `${title} ${languageTitle}`;
        },
        hint() {
            const [
                code,
                languageCode,
            ] = this.columnId.split(':');

            return this.label ? `${code} ${languageCode}` : null;
        },
    },
    methods: {
        ...mapActions('list', [
            'setDisabledElement',
        ]),
        onClickSort() {
            let orderState = SORTING_ORDER.ASC;
            if (this.isSorted) {
                if (this.sortedColumn.orderState === SORTING_ORDER.ASC) {
                    orderState = SORTING_ORDER.DESC;
                }
                if (this.sortedColumn.orderState === SORTING_ORDER.DESC) {
                    orderState = SORTING_ORDER.ASC;
                }
            }

            this.$emit('sort', {
                index: this.columnId,
                orderState,
            });
        },
        onSelectFocus(isFocused) {
            if (!isFocused) {
                this.isHovered = false;
            }

            this.isMenuSelected = isFocused;
        },
        onSelectOption(option) {
            switch (option) {
            case 'Remove': {
                this.$emit('remove', this.columnIndex);
                break;
            }
            default: break;
            }
        },
        onMouseEnter() {
            this.isHovered = true;
        },
        onMouseLeave() {
            this.isHovered = false;
        },
    },
};
</script>

<style lang="scss" scoped>
    .grid-header-cell {
        position: relative;
        display: flex;
        flex: 1 1 auto;
        justify-content: space-between;
        align-items: center;
        height: 100%;
        user-select: none;
        pointer-events: auto;
        cursor: grab;

        &--exists {
            background-color: $GREEN;
            box-shadow: $ELEVATOR_HOLE;

            span {
                color: $WHITE;
            }
        }
    }

    .grid-header-cell-actions {
        display: flex;
        align-items: center;
        cursor: pointer;
    }
</style>
