/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ModalForm
        title="Add products from segment"
        @close="onClose">
        <template #body>
            <AddProductsFromSegmentForm
                :segment-options="segmentOptions"
                :segments="segments"
                submit-title="ADD TO PRODUCT"
                proceed-title="CANCEL"
                :is-submitting="isAdding"
                :errors="scopeErrors"
                @submit="onSubmit"
                @proceed="onClose"
                @input="onFormValueChange" />
        </template>
    </ModalForm>
</template>

<script>
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import {
    THEME,
} from '@Core/defaults/theme';
import scopeErrorsMixin from '@Core/mixins/feedback/scopeErrorsMixin';
import AddProductsFromSegmentForm from '@Segments/components/Forms/AddProductsFromSegmentForm';
import ModalForm from '@UI/components/Modal/ModalForm';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'AddProductsFromSegmentModalForm',
    components: {
        AddProductsFromSegmentForm,
        ModalForm,
    },
    mixins: [
        scopeErrorsMixin,
    ],
    data() {
        return {
            segmentOptions: [],
            segments: [],
            isAdding: false,
        };
    },
    computed: {
        secondaryTheme() {
            return THEME.SECONDARY;
        },
    },
    async created() {
        this.segmentOptions = await this.getSegmentOptions();
    },
    methods: {
        ...mapActions('segment', [
            'getSegmentOptions',
        ]),
        ...mapActions('product', [
            'addBySegment',
        ]),
        onFormValueChange(value) {
            this.segments = value;
        },
        onClose() {
            this.removeScopeErrors(this.scope);
            this.$emit('close');
        },
        onSubmit() {
            if (this.isAdding) {
                return;
            }
            this.isAdding = true;

            this.removeScopeErrors(this.scope);
            this.addBySegment({
                scope: this.scope,
                segments: this.segments,
                onSuccess: this.onSubmitSuccess,
                onError: this.onAddError,
            });
        },
        onSubmitSuccess() {
            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: 'Products have been added to product group',
            });

            this.isAdding = false;

            this.$emit('submitted');
        },
        onAddError(errors) {
            this.onError(errors);

            this.isAdding = false;
        },
    },
};
</script>
