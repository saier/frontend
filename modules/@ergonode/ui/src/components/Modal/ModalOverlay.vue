/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <FadeTransition>
        <div
            v-if="isMounted"
            class="dialog-overlay"
            @mousedown="onMouseDown"
            @mouseup="onMouseUp">
            <slot />
        </div>
    </FadeTransition>
</template>

<script>
import FadeTransition from '@UI/components/Transitions/FadeTransition';

export default {
    name: 'ModalOverlay',
    components: {
        FadeTransition,
    },
    data() {
        return {
            isMounted: false,
            isClosed: {
                mouseUp: false,
                mouseDown: false,
            },
        };
    },
    watch: {
        isClosed: {
            deep: true,
            handler(value) {
                if (value.mouseUp && value.mouseDown) {
                    this.$emit('close');
                }
            },
        },
    },
    mounted() {
        this.isMounted = true;
    },
    methods: {
        onMouseDown(event) {
            if (event.target.classList.contains('dialog-overlay')) {
                this.isClosed.mouseDown = true;
            }
        },
        onMouseUp(event) {
            if (event.target.classList.contains('dialog-overlay')) {
                this.isClosed.mouseUp = true;
            }
        },
    },
};
</script>

<style lang="scss" scoped>
    .dialog-overlay {
        position: fixed;
        top: 0;
        left: 0;
        z-index: $Z_INDEX_MODAL;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        background-color: transparentize($GRAPHITE_COAL, 0.2);
    }
</style>
