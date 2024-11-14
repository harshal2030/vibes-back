// Copyright (c) 2023-present Vibes, Inc. All Rights Reserved.
import {TouchableOpacity, StyleSheet} from 'react-native';

import Text from '@components/text';
import Colors from '@constants/colors';

interface Props {
    label: string;
    onPress: () => void;
    selected?: boolean;
}

const Option = ({label, onPress, selected = false}: Props) => {
    const backgroundColor = selected ? Colors.PRIMARY_COLOR : 'rgba(217, 217, 217, 0.3)';
    const textColor = selected ? Colors.SECONDARY_COLOR : Colors.TERTIARY_COLOR;

    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.container, {backgroundColor}]}
        >
            <Text style={[styles.text, {color: textColor}]}>{label}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 60,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 15,
    },
    text: {
        fontSize: 24,
    },
});

export default Option;
