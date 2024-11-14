// Copyright (c) 2023-present Vibes, Inc. All Rights Reserved.
import {Text as RNText, StyleSheet, type TextProps} from 'react-native';

import colors from '@constants/colors';

interface Props extends TextProps {
    type?: 'error' | 'normal';
}

const Text = ({style, type, ...props}: Props) => {
    let textStyle = styles.text;

    if (type === 'error') {
        textStyle = styles.error;
    }

    return (
        <RNText
            style={[textStyle, style]}
            {...props}
        />
    );
};

const styles = StyleSheet.create({
    text: {
        fontFamily: 'Roboto-Regular',
    },
    error: {
        color: colors.ERROR_COLOR,
        fontFamily: 'Roboto-Light',
    },
});

export default Text;
