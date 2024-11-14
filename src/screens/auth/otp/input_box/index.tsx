// Copyright (c) 2023-present Vibes, Inc. All Rights Reserved.
import {useState, forwardRef, type RefObject} from 'react';
import {TextInput, StyleSheet, type TextInputProps, type NativeSyntheticEvent, type TextInputFocusEventData} from 'react-native';

import Colors from '@constants/colors';

const InputBox = (props: TextInputProps, ref: RefObject<TextInput>) => {
    const [focus, setFocus] = useState(false);

    let borderColor: string = Colors.PLACEHOLDER_COLOR;

    if (focus) {
        borderColor = Colors.PRIMARY_COLOR;
    } else if (props.value) {
        borderColor = Colors.PRIMARY_COLOR;
    } else {
        borderColor = Colors.PLACEHOLDER_COLOR;
    }

    const onFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        setFocus(true);
        props.onFocus?.(e);
    };

    const onBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        setFocus(false);
        props.onBlur?.(e);
    };

    return (
        <TextInput
            onFocus={onFocus}
            onBlur={onBlur}
            ref={ref}
            {...props}
            style={[styles.inputBox, {borderColor}]}
        />
    );
};

const styles = StyleSheet.create({
    inputBox: {
        fontSize: 32,
        fontFamily: 'Belleza-Regular',
        color: Colors.TEXT_INPUT_COLOR,
        borderBottomWidth: 1,
        textAlign: 'center',
        width: 30,
    },
});

export default forwardRef<TextInput, TextInputProps>(InputBox);
