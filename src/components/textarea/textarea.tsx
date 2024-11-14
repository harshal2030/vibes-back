// Copyright (c) 2023-present Vibes, Inc. All Rights Reserved.
import {useState} from 'react';
import {TextInput, StyleSheet, type TextInputProps, type NativeSyntheticEvent, type TextInputFocusEventData} from 'react-native';

import Colors from '@constants/colors';

interface Props extends TextInputProps {
    error?: string | null;
}

const TextArea = ({error, ...textInputProps}: Props) => {
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

    return (
        <TextInput
            {...textInputProps}
            style={[styles.textArea, {borderColor}, textInputProps.style]}
            selectionColor={Colors.PRIMARY_COLOR}
            multiline={true}
            onFocus={handleFocus}
            onBlur={handlerBlur}
            placeholderTextColor={error ? Colors.ERROR_COLOR : Colors.PLACEHOLDER_COLOR}
        />
    );
};

const styles = StyleSheet.create({
    textArea: {
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        textAlignVertical: 'top',
        width: '100%',
        fontSize: 18,
        color: Colors.TEXT_INPUT_COLOR,
        height: 200,
    },
});

export default TextArea;
