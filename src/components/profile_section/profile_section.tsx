// Copyright (c) 2023-present Vibes, Inc. All Rights Reserved.
import {View, Text, StyleSheet, TouchableOpacity, type ViewStyle, type TextStyle} from 'react-native';

import {PLACEHOLDER_COLOR, PRIMARY_COLOR} from '@constants/colors';

import type {ElementType} from 'react';

interface Props {
    title: string;
    children: React.ReactNode;
    style?: ViewStyle;
    titleStyle?: TextStyle;
    touchable?: boolean;
    onPress?: () => void;
}

const ProfileSection = ({title, children, style, titleStyle, onPress, touchable = false}: Props) => {
    const Root = (touchable ? TouchableOpacity : View) as ElementType;

    return (
        <Root
            style={[styles.root, style]}
            onPress={onPress}
            activeOpacity={touchable ? 0.8 : 1}
        >
            <Text style={[styles.title, titleStyle]}>{title}</Text>

            {children}
        </Root>
    );
};

const styles = StyleSheet.create({
    root: {
        borderBottomWidth: 0.5,
        borderBottomColor: PLACEHOLDER_COLOR,
    },
    title: {
        fontFamily: 'Roboto-Medium',
        fontSize: 24,
        color: PRIMARY_COLOR,
        marginBottom: 10,
    },
});

export default ProfileSection;
