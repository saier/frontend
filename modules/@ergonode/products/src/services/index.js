/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

export const get = ({
    $axios,
    id,
}) => $axios.$get(`products/${id}`);

export const getDraft = ({
    $axios,
    id,
    languageCode,
}) => $axios.$get(`${languageCode}/products/${id}/draft`, {
    withLanguage: false,
});

export const getWorkflow = ({
    $axios,
    id,
    languageCode,
}) => $axios.$get(`products/${id}/workflow/${languageCode}`);

export const getCollections = ({
    $axios,
    id,
}) => $axios.$get(`products/${id}/collections`);

export const getTemplate = ({
    $axios,
    id,
    languageCode,
}) => $axios.$get(`${languageCode}/products/${id}/template`, {
    withLanguage: false,
});

export const getCompleteness = ({
    $axios,
    id,
    languageCode,
}) => $axios.$get(`${languageCode}/products/${id}/draft/completeness`, {
    withLanguage: false,
});

export const update = ({
    $axios,
    id,
    data,
}) => $axios.$put(`products/${id}`, data);

export const updateDraftValue = ({
    $axios,
    id,
    attributeId,
    languageCode,
    data,
}) => $axios.$put(`${languageCode}/products/${id}/draft/${attributeId}/value`, data, {
    withLanguage: false,
});

export const applyDraft = ({
    $axios,
    id,
}) => $axios.$put(`products/${id}/draft/persist`, {});

export const create = ({
    $axios,
    data,
}) => $axios.$post('products', data);

export const remove = ({
    $axios,
    id,
}) => $axios.$delete(`products/${id}`);

export const removeChildren = ({
    $axios,
    id,
    childrenId,
    data,
}) => $axios.$delete(`products/${id}/children/${childrenId}`, data);

export const removeDraftValue = ({
    $axios,
    id,
    languageCode,
    attributeId,
}) => $axios.$delete(`${languageCode}/products/${id}/draft/${attributeId}/value`, {
    withLanguage: false,
});

export const addBySku = ({
    $axios,
    id,
    data,
}) => $axios.$post(`products/${id}/children/add-from-skus`, data);

export const addBySegment = ({
    $axios,
    id,
    data,
}) => $axios.$post(`products/${id}/children/add-from-segments`, data);
