// Copyright (c) 2023-present Vibes, Inc. All Rights Reserved.
import {View, StyleSheet, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import {type NavigationFunctionComponent, Navigation} from 'react-native-navigation';

import Text from '@components/text';
import Colors from '@constants/colors';
import {hexToRgb} from '@utils/colors';

const OPTIONS = [
    'Male',
    'Female',
    'Other',
];

interface Props {
    onSelect: (option: string) => void;
}

const GenderOverlay: NavigationFunctionComponent<Props> = ({componentId, onSelect}) => {
    const closeOverlay = () => {
        Navigation.dismissOverlay(componentId);
    };

    const onOptionSelect = (option: string) => {
        onSelect(option);
        closeOverlay();
    };

    return (
        <TouchableWithoutFeedback onPress={closeOverlay}>
            <View style={styles.root}>
                <View style={styles.modalContainer}>
                    <Text style={styles.heading}>Select Your Gender</Text>
                    {OPTIONS.map((option) => (
                        <TouchableOpacity
                            key={option}
                            style={styles.optionContainer}
                            onPress={() => onOptionSelect(option)}
                        >
                            <Text style={styles.optionText}>{option}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: hexToRgb(Colors.PLACEHOLDER_COLOR, 0.6),
    },
    modalContainer: {
        borderWidth: 1,
        borderColor: Colors.PRIMARY_COLOR,
        borderRadius: 10,
        backgroundColor: Colors.SECONDARY_COLOR,
        shadowColor: Colors.TERTIARY_COLOR,
        paddingBottom: 15,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginTop: -20,
    },
    heading: {
        paddingHorizontal: 20,
        fontSize: 24,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: Colors.PRIMARY_COLOR,
    },
    optionContainer: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: hexToRgb(Colors.PLACEHOLDER_COLOR, 0.2),
        marginVertical: 10,
        borderWidth: 0.2,
        borderColor: Colors.PRIMARY_COLOR,
        alignItems: 'center',
        borderRadius: 3,
        marginHorizontal: 30,
    },
    optionText: {
        fontSize: 15,
    },
});

export default GenderOverlay;
