/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        :class="classes"
        :style="placeholderStyles">
        <div class="placeholder__description">
            <span
                class="placeholder__title"
                v-text="title" />
            <span
                class="placeholder__subtitle"
                v-text="subtitle" />
        </div>
        <div class="placeholder__action">
            <slot name="action" />
        </div>
    </div>
</template>

<script>
import {
    LAYOUT_ORIENTATION,
} from '@Core/defaults/layout';
import {
    WHITESMOKE,
} from '@UI/assets/scss/_js-variables/colors.scss';

export default {
    name: 'Placeholder',
    props: {
        /**
         * Determines position of body components; vertical / horizontal
         */
        layoutOrientation: {
            type: String,
            default: LAYOUT_ORIENTATION.VERTICAL,
            validator: value => Object.values(LAYOUT_ORIENTATION).indexOf(value) !== -1,
        },
        /**
         * The title of the component
         */
        title: {
            type: String,
            default: 'Nothing to see here',
        },
        /**
         * The subtitle of the component
         */
        subtitle: {
            type: String,
            default: 'There are no records in the system.',
        },
        /**
         * The url to background image of placeholder
         */
        bgUrl: {
            type: String,
            required: true,
        },
        /**
         * Color of background
         */
        color: {
            type: String,
            default: WHITESMOKE,
            validator: value => /^#([A-Fa-f0-9]{6})$/.test(value),
        },
    },
    computed: {
        classes() {
            return [
                'placeholder',
                `placeholder--${this.layoutOrientation}`,
            ];
        },
        placeholderStyles() {
            if (!this.bgUrl) {
                return {
                    backgroundColor: this.color,
                };
            }

            return {
                background: `${this.color} url(${this.bgUrl}) no-repeat right bottom`,
            };
        },
    },
};
</script>

<style lang="scss" scoped>
    .placeholder {
        flex: 1;
        box-sizing: border-box;
        background-color: $WHITESMOKE;
        color: $GRAPHITE_DARK;
        overflow: auto;

        &--vertical-layout {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 64px 0 0;
        }

        &--horizontal-layout {
            padding: 40px 40px 0;
        }

        &__title {
            font: $FONT_MEDIUM_24_32;
        }

        &__subtitle {
            font: $FONT_MEDIUM_12_16;
        }

        &__description {
            display: grid;
            grid-template-columns: 240px;
            grid-auto-flow: row;
            row-gap: 8px;
        }

        &__action {
            margin-top: 16px;
        }
    }
</style>
