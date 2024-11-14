// Copyright (c) 2023-present Vibes, Inc. All Rights Reserved.
import Screens from './screens';

export const WELCOME_STACK = {
    root: {
        stack: {
            children: [
                {
                    component: {
                        name: Screens.WELCOME,
                    },
                },
            ],
        },
    },
};

export const CREATE_PROFILE_STACK = {
    root: {
        stack: {
            children: [
                {
                    component: {
                        name: Screens.CREATE_PROFILE,
                    },
                },
            ],
        },
    },
};

export const HOME_STACK = {
    root: {
        stack: {
            children: [
                {
                    component: {
                        name: Screens.HOME,
                    },
                },
            ],
        },
    },
};

export default {
    WELCOME_STACK,
    CREATE_PROFILE_STACK,
    HOME_STACK,
} as const;
