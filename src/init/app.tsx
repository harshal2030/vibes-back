// Copyright (c) 2023-present Vibes, Inc. All Rights Reserved.

import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import {Navigation} from 'react-native-navigation';
import SplashScreen from 'react-native-splash-screen';

import {supabase} from '@client/supabase';
import SCREENS from '@constants/screens';
import {useStore} from '@global/store';
import Welcome from '@screens/welcome';

export const start = () => {
    Navigation.registerComponent(SCREENS.WELCOME, () => Welcome);
    Navigation.registerComponent(SCREENS.OVERLAY, () => require('@components/overlay').default);

    Navigation.events().registerAppLaunchedListener(async () => {
        try {
            const session = await supabase.auth.getSession();
            await useStore.getState().setSession(session.data.session);

            SplashScreen.hide();
        } catch (e) {
            SplashScreen.hide();
            Navigation.setRoot({
                root: {
                    stack: {
                        children: [
                            {
                                component: {
                                    name: SCREENS.WELCOME,
                                },
                            },
                        ],
                    },
                },
            });
        }
    });
};

Navigation.setLazyComponentRegistrator((componentName) => {
    switch (componentName) {
        case SCREENS.LOGIN: {
            Navigation.registerComponent(
                componentName,
                () => require('@screens/auth/login').default,
            );
            break;
        }
        case SCREENS.OTP: {
            Navigation.registerComponent(
                componentName,
                () => gestureHandlerRootHOC(require('@screens/auth/otp').default),
                () => require('@screens/auth/otp').default,
            );
            break;
        }
        case SCREENS.CREATE_PROFILE: {
            Navigation.registerComponent(
                componentName,
                () => gestureHandlerRootHOC(require('@screens/create_profile').default),
                () => require('@screens/create_profile').default,
            );
            break;
        }
        case SCREENS.GENDER_OVERLAY: {
            Navigation.registerComponent(componentName, () => require('@screens/create_profile/introduce/gender_overlay').default);
            break;
        }
        case SCREENS.PROFILE: {
            Navigation.registerComponent(
                componentName,
                () => gestureHandlerRootHOC(require('@screens/profile').default),
                () => require('@screens/profile').default,
            );
            break;
        }
        case SCREENS.HOME: {
            Navigation.registerComponent(
                componentName,
                () => gestureHandlerRootHOC(require('@screens/home').default),
                () => require('@screens/home').default,
            );
            break;
        }
        default: {
            throw new Error(`Cannot register component ${componentName}`);
        }
    }
});
