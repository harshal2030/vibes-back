// Copyright (c) 2023-present Vibes, Inc. All Rights Reserved.
import {type FC, type ElementType} from 'react';
import {TouchableOpacity, StyleSheet, View} from 'react-native';

import Text from '@components/text';
import Colors from '@constants/colors';

interface Props {
    label: string;
    selected: boolean;
    disabled?: boolean;
    onPress?: () => void;
}

/**
 * A reusable chip component that displays a label and can be pressed.
 *
 * @param {string} label - The text to display on the chip.
 * @param {boolean} selected - Whether the chip is currently selected.
 * @param {boolean} disabled - Whether the chip is disabled.
 * @param {function} onPress - An optional callback function to call when the chip is pressed.
 * @return {JSX.Element} The chip component.
 */
/** */
const Chip: FC<Props> = ({label, selected, disabled = false, onPress}) => {
    const backgroundColor = selected ? Colors.PRIMARY_COLOR : Colors.SECONDARY_COLOR;
    const borderColor = selected ? Colors.PRIMARY_COLOR : Colors.PLACEHOLDER_COLOR;
    const textColor = selected ? Colors.SECONDARY_COLOR : Colors.TERTIARY_COLOR;

    const handlePress = () => {
        if (!disabled) {
            onPress?.();
        }
    };

    const Root = (disabled ? View : TouchableOpacity) as ElementType;

    return (
        <Root
            style={[styles.container, {backgroundColor, borderColor}]}
            activeOpacity={disabled ? 1 : 0.5}
            onPress={handlePress}
        >
            <Text style={[styles.textStyle, {color: textColor}]}>{label}</Text>
        </Root>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 20,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    textStyle: {
        fontSize: 15,
    },
});

export default Chip;
