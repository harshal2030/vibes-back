// Copyright (c) 2023-present Vibes, Inc. All Rights Reserved.
import {View, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Keyboard} from 'react-native';

import BackButton from '@assets/images/back_button.svg';
import Button from '@components/button';
import Chip from '@components/chip';
import Text from '@components/text';
import TextArea from '@components/textarea';
import {INTERESTS} from '@constants/profile';
import {useField} from '@hooks/form';
import {hexToRgb} from '@utils/colors';

interface Props {
    onBackButtonPress: () => void;
    onComplete: (data: {
        about: string;
        interests: {[id: string]: boolean};
    }) => void;
}

const aboutValidator = (about: string) => {
    if (about.trim().length < 10) {
        return "It's your best shot. You can do better";
    }

    return null;
};

const validateInterests = (interests: {[id: string]: boolean}) => {
    if (Object.values(interests).filter((value) => value).length < 5) {
        return 'Please select at least 5 interests';
    }

    return null;
};

const About = ({onBackButtonPress, onComplete}: Props) => {
    const {
        value: interests, vanillaChange: setInterests,
        error: interestError, runValidator: runInterestValidator,
    } = useField<{[id: string]: boolean}>({}, validateInterests);
    const {
        onChangeText, value: about,
        error: aboutError, runValidator: runAboutValidator,
    } = useField('', aboutValidator);

    const onContinue = () => {
        const aboutValidate = runAboutValidator();
        const interestValidate = runInterestValidator();

        if (aboutValidate || interestValidate) {
            return;
        }

        Keyboard.dismiss();
        onComplete({
            about,
            interests,
        });
    };

    return (
        <ScrollView
            keyboardShouldPersistTaps='always'
            nestedScrollEnabled={true}
        >
            <View style={styles.root}>
                <View style={styles.headingContainer}>
                    <TouchableOpacity onPress={onBackButtonPress}>
                        <BackButton
                            width={25}
                            height={17}
                        />
                    </TouchableOpacity>
                    <Text style={styles.heading}>About Me</Text>
                    <View/>
                </View>

                {aboutError ? (
                    <Text
                        type='error'
                    >{aboutError}</Text>
                ) : (
                    <Text
                        style={styles.subheading}
                    >Tell us about yourself</Text>
                )}

                <TextArea
                    placeholder="Tell about yourself. It's your best shot"
                    onChangeText={onChangeText}
                    error={aboutError}
                    defaultValue={about}
                />

                <Text style={styles.heading}>My Interests</Text>
                <View style={styles.interestContainer}>
                    {INTERESTS.map((interest) => {
                        return (
                            <Chip
                                label={interest}
                                key={interest}
                                selected={interests[interest] || false}
                                onPress={() => {
                                    setInterests((prev) => ({
                                        ...prev,
                                        [interest]: !prev[interest],
                                    }));
                                }}
                            />
                        );
                    })}
                </View>

                <Button
                    text='Continue'
                    containerStyle={styles.button}
                    onPress={onContinue}
                />
                {interestError ? (
                    <Text type='error'>{interestError}</Text>
                ) : null}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
        width: Dimensions.get('window').width,
        padding: 20,
        alignItems: 'center',
    },
    heading: {
        fontSize: 40,
        textAlign: 'center',
        fontFamily: 'Belleza-Regular',
    },
    headingContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    subheading: {
        fontSize: 13,
        textAlign: 'center',
        color: hexToRgb('#333333', 0.9),
    },
    button: {
        marginTop: 25,
    },
    interestContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        rowGap: 5,
        columnGap: 5,
    },
});

export default About;
