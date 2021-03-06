/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Comment>
        <template #header>
            <span
                class="comment-header"
                v-text="isEdit ? 'Edit comment' : 'Add new comment'" />
        </template>
        <template #body>
            <TextArea
                :value="content"
                label="Comment"
                resize="none"
                :required="true"
                height="128px"
                :error-messages="errors.content"
                @input="setCommentValue" />
        </template>
        <template #footer>
            <Button
                :size="smallSize"
                :title="`${isEdit ? 'SAVE' : 'ADD'} COMMENT`"
                @click.native="saveComment">
                <template
                    v-if="isSubmitting"
                    #append="{ color }">
                    <IconSpinner :fill-color="color" />
                </template>
            </Button>
            <Button
                :theme="secondaryTheme"
                :size="smallSize"
                title="CANCEL"
                @click.native="closeComment" />
        </template>
    </Comment>
</template>
<script>
import Comment from '@Comments/components/Comments/Comment';
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import {
    SIZE,
    THEME,
} from '@Core/defaults/theme';
import Button from '@UI/components/Button/Button';
import IconSpinner from '@UI/components/Icons/Feedback/IconSpinner';
import TextArea from '@UI/components/TextArea/TextArea';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'CommentEdit',
    components: {
        Comment,
        Button,
        TextArea,
        IconSpinner,
    },
    props: {
        scope: {
            type: String,
            default: '',
        },
        errors: {
            type: Object,
            default: () => ({}),
        },
        commentValue: {
            type: String,
            default: '',
        },
        commentId: {
            type: String,
            default: null,
        },
        isEdit: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            content: this.commentValue,
            isSubmitting: false,
        };
    },
    computed: {
        secondaryTheme() {
            return THEME.SECONDARY;
        },
        smallSize() {
            return SIZE.SMALL;
        },
    },
    methods: {
        ...mapActions('comment', [
            'createComment',
            'updateComment',
        ]),
        ...mapActions('feedback', [
            'onError',
            'removeScopeErrors',
        ]),
        saveComment() {
            if (this.isSubmitting) {
                return;
            }
            this.isSubmitting = true;

            this.removeScopeErrors(this.scope);

            if (this.isEdit && this.commentId) {
                this.updateComment({
                    id: this.commentId,
                    scope: this.scope,
                    content: this.content,
                    onSuccess: this.onUpdateSuccess,
                    onError: this.onUpdateError,
                });
            } else {
                this.createComment({
                    scope: this.scope,
                    content: this.content,
                    onSuccess: this.onUpdateSuccess,
                    onError: this.onUpdateError,
                });
            }
        },
        onUpdateSuccess() {
            this.isSubmitting = false;

            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: `Comment ${this.isEdit ? 'edited' : 'created'}`,
            });
            this.$emit('close');
        },
        onUpdateError(errors) {
            this.onError(errors);

            this.isSubmitting = false;
        },
        closeComment() {
            this.$emit('close');
        },
        setCommentValue(value) {
            this.content = value;
        },
    },
};
</script>

<style lang="scss" scoped>
    .comment-header {
        font: $FONT_MEDIUM_16_24;
    }
</style>
