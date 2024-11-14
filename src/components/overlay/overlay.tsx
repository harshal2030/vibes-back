// Copyright (c) 2023-present Vibes, Inc. All Rights Reserved.
import {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {type NavigationFunctionComponent, Navigation} from 'react-native-navigation';
import Animated, {useSharedValue, useAnimatedStyle, withTiming, runOnJS} from 'react-native-reanimated';

import Text from '@components/text';
import colors from '@constants/colors';

interface Props {
    message: string;
    type?: 'danger' | 'success';
    autoDismiss?: boolean;
}

const Overlay: NavigationFunctionComponent<Props> = ({
    componentId, message, type, autoDismiss = true,
}) => {
    const backgroundColor = type === 'danger' ? '#E33B5D' : '#d4edda';
    const bottom = useSharedValue(-60);

    const closeOverlay = () => {
        Navigation.dismissOverlay(componentId);
    };

    const showAndClose = () => {
        bottom.value = withTiming(-60, {duration: 100}, (finished) => {
            if (finished) {
                runOnJS(closeOverlay)();
            }
        });
    };

    useEffect(() => {
        bottom.value = withTiming(0, {duration: 100});
        let timer: NodeJS.Timeout | null;

        if (autoDismiss) {
            timer = setTimeout(showAndClose, 3000);
        }

        return () => {
            if (timer) {
                clearTimeout(timer);
            }
        };
    }, []);

    const style = useAnimatedStyle(() => {
        return {
            bottom: bottom.value,
        };
    });

    return (
        <Animated.View
            style={[styles.root, style]}
        >
            <View style={[styles.toast, {backgroundColor}]}>
                <Text
                    style={styles.text}
                    numberOfLines={2}
                >{message}</Text>
            </View>
        </Animated.View>
    );
};

Overlay.options = {
    layout: {
        componentBackgroundColor: 'transparent',
    },
    overlay: {
        interceptTouchOutside: false,
    },
};

const styles = StyleSheet.create({
    root: {
        position: 'absolute',
        flexDirection: 'column-reverse',
        bottom: 0,
        width: '100%',
    },
    toast: {
        paddingVertical: 12,
        paddingHorizontal: 10,
        marginHorizontal: 10,
        borderRadius: 2,
        elevation: 1,
        marginBottom: 10,
    },
    text: {
        color: colors.SECONDARY_COLOR,
        fontSize: 16,
    },
});

export default Overlay;
