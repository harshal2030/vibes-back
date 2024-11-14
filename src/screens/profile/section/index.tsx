// Copyright (c) 2023-present Vibes, Inc. All Rights Reserved.
import {type ElementType} from 'react';
import {View, StyleSheet, TouchableOpacity, type ViewStyle} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import {PLACEHOLDER_COLOR} from '@constants/colors';

interface Props {
    children: React.ReactNode;
    rootStyle?: ViewStyle;
    contentContainerStyle?: ViewStyle;
    showIcon?: boolean;
    touchable?: boolean;
    onPress?: () => void;
}

const Section = ({
    children, contentContainerStyle, rootStyle, onPress, touchable = false, showIcon = true,
}: Props) => {
    const Root = (touchable ? TouchableOpacity : View) as ElementType;

    return (
        <Root
            style={[styles.root, rootStyle]}
            activeOpacity={0.5}
            onPress={onPress}
        >
            <View style={[styles.contentContainer, contentContainerStyle]}>
                {children}
            </View>
            <View style={styles.iconContainer}>
                {showIcon ? (
                    <MaterialIcon
                        name='chevron-right-box-outline'
                        size={23}
                        color={PLACEHOLDER_COLOR}
                        style={{marginRight: 10}}
                    />
                ) : null}
            </View>
        </Root>
    );
};

const styles = StyleSheet.create({
    root: {
        flexDirection: 'row',
    },
    iconContainer: {
        justifyContent: 'flex-end',
        width: '10%',
        alignItems: 'flex-end',
    },
    contentContainer: {
        width: '90%',
    },
});

export default Section;
