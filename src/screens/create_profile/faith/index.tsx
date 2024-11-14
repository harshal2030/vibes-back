// Copyright (c) 2023-present Vibes, Inc. All Rights Reserved.
import {useState} from 'react';
import {View, StyleSheet, Dimensions, TouchableOpacity, ScrollView} from 'react-native';

import BackButton from '@assets/images/back_button.svg';
import Option from '@components/option';
import Text from '@components/text';
import {FAITH_OPTIONS} from '@constants/profile';

interface Props {
    onBackButtonPress: () => void;
    onComplete: (data: {faith: string}) => void;
}

const Faith = ({onBackButtonPress, onComplete}: Props) => {
    const [selected, setSelected] = useState<string | null>(null);

    const onOptionPress = (option: string) => {
        setSelected(option);
        setTimeout(() => onComplete({faith: option}), 10);
    };

    return (
        <ScrollView contentContainerStyle={styles.root}>
            <TouchableOpacity
                style={styles.backButton}
                onPress={onBackButtonPress}
            >
                <BackButton
                    width={25}
                    height={17}
                />
            </TouchableOpacity>

            <View style={styles.contentContainer}>
                <Text style={styles.heading}>Select your faith</Text>
            </View>

            {FAITH_OPTIONS.map((option) => (
                <Option
                    key={option}
                    label={option}
                    selected={selected === option}
                    onPress={() => onOptionPress(option)}
                />
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
        width: Dimensions.get('window').width,
        padding: 20,
    },
    backButton: {
        marginTop: 10,
    },
    contentContainer: {
        width: '100%',
        justifyContent: 'center',
    },
    heading: {
        fontSize: 45,
        textAlign: 'center',
        fontFamily: 'Belleza-Regular',
        marginTop: 10,
    },
});

export default Faith;
