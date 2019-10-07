/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export const Pages = {
    Login: () => import('~/pages/index').then((m) => m.default || m),
    Dashboard: () => import('~/pages/dashboard/index').then((m) => m.default || m),
    Profile: () => import('~/pages/profile/index').then((m) => m.default || m),
    Settings: () => import('~/pages/settings/index').then((m) => m.default || m),
    Channels: () => import('~/pages/channels/index').then((m) => m.default || m),
    Placeholder: () => import('~/pages/placeholder/index').then((m) => m.default || m),
    Categories: () => import('~/pages/categories/index').then((m) => m.default || m),
    CategoryNew: () => import('~/pages/categories/new/index').then((m) => m.default || m),
    CategoryEdit: () => import('~/pages/categories/edit/_id').then((m) => m.default || m),
    CategoryTrees: () => import('~/pages/category-trees/index').then((m) => m.default || m),
    CategoryTreesNew: () => import('~/pages/category-trees/new/index').then((m) => m.default || m),
    CategoryTreesEdit: () => import('~/pages/category-trees/edit/_id').then((m) => m.default || m),
    Products: () => import('~/pages/products/index').then((m) => m.default || m),
    ProductNew: () => import('~/pages/products/new/index').then((m) => m.default || m),
    ProductEdit: () => import('~/pages/products/edit/_id').then((m) => m.default || m),
    Templates: () => import('~/pages/templates/index').then((m) => m.default || m),
    TemplateNew: () => import('~/pages/templates/new/index').then((m) => m.default || m),
    TemplateEdit: () => import('~/pages/templates/edit/_id').then((m) => m.default || m),
    Attributes: () => import('~/pages/attributes/index').then((m) => m.default || m),
    AttributeNew: () => import('~/pages/attributes/new/index').then((m) => m.default || m),
    AttributeEdit: () => import('~/pages/attributes/edit/_id').then((m) => m.default || m),
    Users: () => import('~/pages/users/index').then((m) => m.default || m),
    UserNew: () => import('~/pages/users/_user/index').then((m) => m.default || m),
    UserEdit: () => import('~/pages/users/_user/_id').then((m) => m.default || m),
    UsersRolesNew: () => import('~/pages/users/_role/index').then((m) => m.default || m),
    UsersRolesEdit: () => import('~/pages/users/_role/_id').then((m) => m.default || m),
    Workflow: () => import('~/pages/workflow/index').then((m) => m.default || m),
    ProductStatusNew: () => import('~/pages/workflow/_status/index').then((m) => m.default || m),
    ProductStatusEdit: () => import('~/pages/workflow/_status/_id').then((m) => m.default || m),
    TransitionNew: () => import('~/pages/workflow/_transition/index').then((m) => m.default || m),
    TransitionEdit: () => import('~/pages/workflow/_transition/_id').then((m) => m.default || m),
    Segments: () => import('~/pages/segments/index').then((m) => m.default || m),
    SegmentNew: () => import('~/pages/segments/_segment/index').then((m) => m.default || m),
    SegmentEdit: () => import('~/pages/segments/_segment/_id').then((m) => m.default || m),
    ConditionSetNew: () => import('~/pages/segments/_condition-set/index').then((m) => m.default || m),
    ConditionSetEdit: () => import('~/pages/segments/_condition-set/_id').then((m) => m.default || m),
};

export const Tabs = {
    AttributeBaseTab: () => import('~/components/Card/Tabs/AttributeBaseTab').then((m) => m.default || m),
    AttributeTranslationsTab: () => import('~/components/Card/Tabs/AttributeTranslationsTab').then((m) => m.default || m),
    TemplateDesignerBaseTab: () => import('~/components/Card/Tabs/TemplateDesignerBaseTab').then((m) => m.default || m),
    TemplateDesignerTab: () => import('~/components/Card/Tabs/TemplateDesignerTab').then((m) => m.default || m),
    UserBaseTab: () => import('~/components/Card/Tabs/UserBaseTab').then((m) => m.default || m),
    UserAvatarTab: () => import('~/components/Card/Tabs/UserAvatarTab').then((m) => m.default || m),
    UserRolesBaseTab: () => import('~/components/Card/Tabs/UserRolesBaseTab').then((m) => m.default || m),
    UserRolesPrivilegeTab: () => import('~/components/Card/Tabs/UserRolesPrivilegeTab').then((m) => m.default || m),
    CategoryBaseTab: () => import('~/components/Card/Tabs/CategoryBaseTab').then((m) => m.default || m),
    CategoryTranslationsTab: () => import('~/components/Card/Tabs/CategoryTranslationsTab').then((m) => m.default || m),
    CategoryTreeBaseTab: () => import('~/components/Card/Tabs/CategoryTreeBaseTab').then((m) => m.default || m),
    CategoryTreeTranslationsTab: () => import('~/components/Card/Tabs/CategoryTreeTranslationsTab').then((m) => m.default || m),
    CategoryTreeDesignTab: () => import('~/components/Card/Tabs/CategoryTreeDesignTab').then((m) => m.default || m),
    ProductBaseTab: () => import('~/components/Card/Tabs/ProductBaseTab').then((m) => m.default || m),
    ProductTemplateTab: () => import('~/components/Card/Tabs/ProductTemplateTab').then((m) => m.default || m),
    ProductStatusBaseTab: () => import('~/components/Card/Tabs/ProductStatusBaseTab').then((m) => m.default || m),
    ProductStatusTranslationsTab: () => import('~/components/Card/Tabs/ProductStatusTranslationsTab').then((m) => m.default || m),
    TransitionBaseTab: () => import('~/components/Card/Tabs/TransitionBaseTab').then((m) => m.default || m),
    TransitionTranslationsTab: () => import('~/components/Card/Tabs/TransitionTranslationsTab').then((m) => m.default || m),
    SegmentsBaseTab: () => import('~/components/Card/Tabs/SegmentsBaseTab').then((m) => m.default || m),
    SegmentsTranslationsTab: () => import('~/components/Card/Tabs/SegmentsTranslationsTab').then((m) => m.default || m),
    ConditionSetBaseTab: () => import('~/components/Card/Tabs/ConditionSetBaseTab').then((m) => m.default || m),
    ConditionSetTranslationsTab: () => import('~/components/Card/Tabs/ConditionSetTranslationsTab').then((m) => m.default || m),
    ConditionSetDesignTab: () => import('~/components/Card/Tabs/ConditionSetDesignTab').then((m) => m.default || m),
    LanguageSettingsTab: () => import('~/components/Card/Tabs/LanguageSettingsTab').then((m) => m.default || m),
};

export const GridTabs = {
    ProductStatusGridTab: () => import('~/components/Card/Grid/ProductStatusGridTab').then((m) => m.default || m),
    TransitionsGridTab: () => import('~/components/Card/Grid/TransitionsGridTab').then((m) => m.default || m),
    ProductGridTab: () => import('~/components/Card/Grid/ProductGridTab').then((m) => m.default || m),
    CategoryGridTab: () => import('~/components/Card/Grid/CategoryGridTab').then((m) => m.default || m),
    CategoryTreesGridTab: () => import('~/components/Card/Grid/CategoryTreesGridTab').then((m) => m.default || m),
    AttributeGridTab: () => import('~/components/Card/Grid/AttributeGridTab').then((m) => m.default || m),
    RolesGridTab: () => import('~/components/Card/Grid/RolesGridTab').then((m) => m.default || m),
    UsersGridTab: () => import('~/components/Card/Grid/UsersGridTab').then((m) => m.default || m),
    UserActivityLogsGridTab: () => import('~/components/Card/Grid/UserActivityLogsGridTab').then((m) => m.default || m),
    UsersActivityLogsGridTab: () => import('~/components/Card/Grid/UsersActivityLogsGridTab').then((m) => m.default || m),
    SegmentsGridTab: () => import('~/components/Card/Grid/SegmentsGridTab').then((m) => m.default || m),
    ConditionSetsGridTab: () => import('~/components/Card/Grid/ConditionSetsGridTab').then((m) => m.default || m),
};
