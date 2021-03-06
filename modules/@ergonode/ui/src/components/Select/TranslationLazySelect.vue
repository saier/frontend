/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <LazySelect
        :value="localValue"
        :fixed-content="fixedContent"
        :dismissible="dismissible"
        :type="type"
        :alignment="alignment"
        :size="size"
        :label="label"
        :placeholder="placeholder"
        :error-messages="errorMessages"
        :hint="hint"
        :required="required"
        :autofocus="autofocus"
        :disabled="disabled"
        :clearable="clearable"
        :multiselect="multiselect"
        :searchable="searchable"
        :fetch-options-request="fetchOptionsRequest"
        :data-cy="dataCy"
        @focus="onFocus"
        @search="onSearch"
        @input="onValueChange"
        @fetched-options="onFetchedOptions">
        <template #prepend>
            <slot name="prepend" />
        </template>
        <template #value>
            <span v-text="parsedValue" />
        </template>
        <template #details>
            <slot name="details" />
        </template>
        <template #option="{ option, isSelected }">
            <slot
                name="option"
                :option="option"
                :selected="isSelected">
                <ListElementAction
                    v-if="multiselect"
                    :size="size">
                    <CheckBox :value="isSelected" />
                </ListElementAction>
                <ListElementDescription>
                    <ListElementTitle
                        :size="size"
                        :hint="option.hint"
                        :title="option.value || `#${option.key}`" />
                </ListElementDescription>
            </slot>
        </template>
    </LazySelect>
</template>

<script>
import {
    ALIGNMENT,
    INPUT_TYPE,
    SIZE,
} from '@Core/defaults/theme';
import CheckBox from '@UI/components/CheckBox/CheckBox';
import ListElementAction from '@UI/components/List/ListElementAction';
import ListElementDescription from '@UI/components/List/ListElementDescription';
import ListElementTitle from '@UI/components/List/ListElementTitle';
import LazySelect from '@UI/components/Select/LazySelect';

export default {
    name: 'TranslationLazySelect',
    components: {
        LazySelect,
        ListElementDescription,
        ListElementTitle,
        ListElementAction,
        CheckBox,
    },
    props: {
        /**
         * Component value
         */
        value: {
            type: [
                Array,
                String,
                Number,
                Object,
            ],
            default: '',
        },
        /**
         * The size of the component
         */
        size: {
            type: String,
            default: SIZE.REGULAR,
            validator: value => [
                SIZE.SMALL,
                SIZE.REGULAR,
            ].indexOf(value) !== -1,
        },
        /**
         * Alignment of selected value, might be centered or from left
         */
        alignment: {
            type: String,
            default: ALIGNMENT.LEFT,
            validator: value => Object.values(ALIGNMENT).indexOf(value) !== -1,
        },
        /**
         * Determines style of component based on type
         */
        type: {
            type: String,
            default: INPUT_TYPE.SOLID,
            validator: value => Object.values(INPUT_TYPE).indexOf(value) !== -1,
        },
        /**
         * The flag which tells if the dropdown has fixed content to it's parent width
         */
        fixedContent: {
            type: Boolean,
            default: true,
        },
        /**
         * The dismissible flag is telling if we can toggle between active an inactive state
         */
        dismissible: {
            type: Boolean,
            default: true,
        },
        /**
         * The label is a text caption or description for the component
         */
        label: {
            type: String,
            default: null,
        },
        /**
         * The placeholder is a helper text for the component
         */
        placeholder: {
            type: String,
            default: null,
        },
        /**
         * The error messages are messages which comes from validation process
         */
        errorMessages: {
            type: String,
            default: '',
        },
        /**
         *  The hint is a tip for the component
         */
        hint: {
            type: String,
            default: '',
        },
        /**
         * Determines if the given component is required
         */
        required: {
            type: Boolean,
            default: false,
        },
        /**
         * Determines if component should be focused as it's initialised
         */
        autofocus: {
            type: Boolean,
            default: false,
        },
        /**
         * Determinate if the component is disabled
         */
        disabled: {
            type: Boolean,
            default: false,
        },
        /**
         * Determines if the selected value is clearable
         */
        clearable: {
            type: Boolean,
            default: false,
        },
        /**
         * Determines if the component is multiple choice
         */
        multiselect: {
            type: Boolean,
            default: false,
        },
        /**
         * Determines if the component has possibility of search for value
         */
        searchable: {
            type: Boolean,
            default: false,
        },
        /**
         * Unique identifier of option key
         */
        optionKey: {
            type: String,
            default: 'id',
        },
        /**
         * Declaration of options request
         */
        fetchOptionsRequest: {
            type: Function,
            required: true,
        },
        /**
         * Unique identifier for cypress
         */
        dataCy: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            localValue: null,
        };
    },
    computed: {
        parsedValue() {
            if (!this.localValue) return null;
            if (Array.isArray(this.localValue)) {
                return this.localValue.map(val => val.value || `#${val.key}`).join(', ');
            }

            return this.localValue.value || this.localValue.key;
        },
    },
    methods: {
        onSearch(value) {
            this.$emit('search', value);
        },
        onFocus(isFocused) {
            this.$emit('focus', isFocused);
        },
        onValueChange(value) {
            this.localValue = value;

            this.$emit('input', Array.isArray(value)
                ? value.map(option => option[this.optionKey])
                : value[this.optionKey]);
        },
        onFetchedOptions(options) {
            if (Array.isArray(this.value) && this.value.length) {
                this.localValue = options.filter(
                    option => this.value.some(
                        key => option[this.optionKey] === key,
                    ),
                );
            } else {
                this.localValue = options.find(option => option[this.optionKey] === this.value);
            }
        },
    },
};
</script>
