/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Form
        :submit-title="submitTitle"
        :proceed-title="proceedTitle"
        :is-submitting="isSubmitting"
        :is-proceeding="isProceeding"
        :errors="errors"
        @proceed="onProceed"
        @submit="onSubmit">
        <template #body>
            <FormSection>
                <TranslationSelect
                    :value="segments"
                    :multiselect="true"
                    label="From segmentation rules"
                    :disabled="!isAllowedToUpdate"
                    :error-messages="errors[segmentsFieldKey]"
                    :options="segmentOptions"
                    @input="onSegmentChange" />
            </FormSection>
        </template>
    </Form>
</template>

<script>
import formActionsMixin from '@Core/mixins/form/formActionsMixin';
import formFeedbackMixin from '@Core/mixins/form/formFeedbackMixin';
import PRIVILEGES from '@Segments/config/privileges';
import Form from '@UI/components/Form/Form';
import FormSection from '@UI/components/Form/Section/FormSection';
import TranslationSelect from '@UI/components/Select/TranslationSelect';

export default {
    name: 'AddProductsFromSegmentForm',
    components: {
        Form,
        FormSection,
        TranslationSelect,
    },
    mixins: [
        formActionsMixin,
        formFeedbackMixin,
    ],
    props: {
        errors: {
            type: Object,
            default: () => ({}),
        },
        segments: {
            type: Array,
            default: () => [],
        },
        segmentOptions: {
            type: Array,
            default: () => [],
        },
    },
    computed: {
        segmentsFieldKey() {
            return 'segments';
        },
        isAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.SEGMENT.update,
            ]);
        },
    },
    methods: {
        onSegmentChange(value) {
            this.$emit('input', value);
        },
    },
};
</script>
