// Copyright (c) 2023-present Vibes, Inc. All Rights Reserved.

import {useState, type ElementType} from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    type TextInputProps,
    type NativeSyntheticEvent,
    type TextInputFocusEventData,
    type ViewStyle,
} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import Text from '@components/text/Text';
import Colors from '@constants/colors';
import {hexToRgb} from '@utils/colors';

import type {IconProps} from 'react-native-vector-icons/Icon';

interface Props extends TextInputProps {
  icon?: IconProps;
  containerStyle?: ViewStyle;
  error?: string | null;
  message?: string | null;
  touchable?: boolean;
  onPress?: () => void;
  loading?: boolean;
}

const Input = ({icon, containerStyle, error, message, touchable = false, loading = false, onPress, ...textInputProps}: Props) => {
    const [isFocused, setIsFocused] = useState(false);

    let borderColor: string;

    if (error) {
        borderColor = Colors.ERROR_COLOR;
    } else if (isFocused) {
        borderColor = Colors.PRIMARY_COLOR;
    } else {
        borderColor = 'rgba(0, 0, 0, 0.25)';
    }

    const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        setIsFocused(true);
        textInputProps.onFocus?.(e);
    };

    const handlerBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        setIsFocused(false);
        textInputProps.onBlur?.(e);
    };

    const InputContainer = (touchable ? TouchableOpacity : View) as ElementType;

    let LeftComponent: Element | null = null;

    if (loading) {
        LeftComponent = (
            <ActivityIndicator
                size='small'
                style={styles.iconContainer}
                color={Colors.LOADING_TEXT_COLOR}
            />
        );
    } else if (icon) {
        LeftComponent = (
            <MaterialIcon
                style={[styles.iconContainer]}
                color={borderColor}
                {...icon}
            />
        );
    }

    return (
        <View>
            <InputContainer
                style={[styles.container, containerStyle, {borderColor}]}
                activeOpacity={0.25}
                onPress={onPress}
            >
                {LeftComponent}
                <TextInput
                    {...textInputProps}
                    style={styles.input}
                    selectionColor={Colors.PRIMARY_COLOR}
                    onFocus={handleFocus}
                    onBlur={handlerBlur}
                    editable={!touchable}
                    placeholderTextColor={error ? Colors.ERROR_COLOR : Colors.PLACEHOLDER_COLOR}
                />
            </InputContainer>
            {(message || error) ? (
                <Text
                    style={[
                        styles.message,
                        {color: error ? hexToRgb(Colors.ERROR_COLOR, 0.75) : Colors.TEXT_INPUT_COLOR},
                    ]}
                >
                    {error || message}
                </Text>
            ) : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderWidth: 2,
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 50,
        paddingHorizontal: 5,
        paddingVertical: 6,
        height: 60,
        width: '100%',
    },
    input: {
        flex: 1,
        fontSize: 18,
        color: Colors.TEXT_INPUT_COLOR,
    },
    iconContainer: {
        marginLeft: 20,
        marginRight: 5,
    },
    message: {
        marginLeft: 30,
        marginTop: 2,
        fontFamily: 'Roboto-Light',
        fontSize: 10,
    },
});

export default Input;
