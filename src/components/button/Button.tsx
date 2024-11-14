// Copyright (c) 2023-present Vibes, Inc. All Rights Reserved.
import {
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    type TouchableOpacityProps,
    type TextStyle,
    type ViewStyle,
} from 'react-native';

import Text from '@components/text';
import Colors from '@constants/colors';

interface ButtonProps extends TouchableOpacityProps {
  text: string;
  textStyle?: TextStyle;
  containerStyle?: ViewStyle;
  loading?: boolean;
  disabled?: boolean;
}

const Button = ({text, textStyle, loading = false, disabled = false, ...props}: ButtonProps) => {
    const backgroundColor = (loading || disabled) ? Colors.LOADING_BACKGROUND_COLOR : Colors.PRIMARY_COLOR;
    const textColor = (loading || disabled) ? Colors.LOADING_TEXT_COLOR : Colors.SECONDARY_COLOR;

    return (
        <TouchableOpacity
            style={[styles.button, {backgroundColor}, props.containerStyle]}
            activeOpacity={0.5}
            disabled={loading || disabled}
            {...props}
        >
            {loading ? (
                <ActivityIndicator
                    size='small'
                    color={Colors.LOADING_TEXT_COLOR}
                />) : null}
            <Text style={[styles.text, {color: textColor}, textStyle]}>{text}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        paddingHorizontal: 50,
        paddingVertical: 12,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
    },
    text: {
        textAlign: 'center',
        fontFamily: 'Roboto-Medium',
        fontSize: 17,
    },
});

export default Button;
