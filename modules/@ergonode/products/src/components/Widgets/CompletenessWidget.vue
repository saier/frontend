/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Widget
        title="Completeness"
        :is-placeholder-visible="!isPrefetchingData && progressListDatasets.length === 0">
        <template #body>
            <Preloader v-if="isPrefetchingData" />
            <ProgressList
                v-else
                :datasets="progressListDatasets"
                :labels="progressListLabels"
                :max-value="maxValue" />
        </template>
    </Widget>
</template>

<script>
import {
    getCompletenessCount,
} from '@Dashboard/services';
import {
    GREEN,
    RED,
    YELLOW,
} from '@UI/assets/scss/_js-variables/colors.scss';
import Preloader from '@UI/components/Preloader/Preloader';
import ProgressList from '@UI/components/ProgressList/ProgressList';
import Widget from '@UI/components/Widget/Widget';

export default {
    name: 'CompletenessWidget',
    components: {
        Widget,
        ProgressList,
        Preloader,
    },
    async fetch() {
        const completenessCount = await getCompletenessCount({
            $axios: this.$axios,
        });

        const progressListDatasets = [];
        const progressListLabels = [];

        completenessCount.forEach((product) => {
            const {
                value,
                label,
            } = product;

            const color = [
                RED,
                YELLOW,
                GREEN,
            ][Math.floor(value / 40)];

            progressListDatasets.push({
                color,
                label,
                value,
            });
            progressListLabels.push(`${value}%`);
        });

        this.progressListDatasets = progressListDatasets;
        this.progressListLabels = progressListLabels;
        this.isPrefetchingData = false;
    },
    data() {
        return {
            progressListDatasets: [],
            progressListLabels: [],
            maxValue: 100,
            colors: {},
            isPrefetchingData: true,
        };
    },
};
</script>
