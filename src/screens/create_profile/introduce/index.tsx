// Copyright (c) 2023-present Vibes, Inc. All Rights Reserved.
import {useState, useCallback} from 'react';
import {StyleSheet, Alert, Linking, Dimensions, ScrollView} from 'react-native';
import {promptForEnableLocationIfNeeded} from 'react-native-android-location-enabler';
import DatePicker from 'react-native-date-picker';
import {Navigation} from 'react-native-navigation';
import {check, PERMISSIONS, RESULTS} from 'react-native-permissions';

import Button from '@components/button';
import Input from '@components/input';
import Text from '@components/text';
import Screens from '@constants/screens';
import {useField} from '@hooks/form';
import {getCityFromLatLong, getLatLong} from '@utils/location';

const INITIAL_DOB = new Date(2000, 0, 1);
const WIDTH = Dimensions.get('window').width;

type Location = {lat: number; long: number; city: string};

const validateName = (name: string) => {
    if (name.trim().length < 1) {
        return 'Please enter your name';
    }

    return null;
};

const validateDob = (dob: Date | null) => {
    if (!dob) {
        return 'Please select your date of birth';
    }

    return null;
};

const validateGender = (gender: string) => {
    if (!['Male', 'Female', 'Other'].includes(gender)) {
        return 'Please select your gender';
    }

    return null;
};

const validateLocation = (location: Location) => {
    if (!location) {
        return 'We need location to show you nearby people';
    }

    return null;
};

interface Props {
    onComplete: (data: {
        name: string;
        dob: Date;
        gender: string;
        location: Location;
    }) => void;
}

const Introduce = ({onComplete}: Props) => {
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [loading, setLoading] = useState(false);

    const {value: dob, onChangeText: setDob, error: dobError, runValidator: runDateValidator} = useField<Date | null>(null, validateDob);
    const {value: name, onChangeText: setName, error: nameError, runValidator: runNameValidator} = useField('', validateName);
    const {value: gender, onChangeText: setGender, error: genderError, runValidator: runGenderValidator} = useField('', validateGender);
    const {value: location, onChangeText: setLocation, error: locationError, setError: setLocationError, runValidator: runLocationValidator} = useField<Location | null>(null, validateLocation);

    const showGenderOverlay = useCallback(() => {
        Navigation.showOverlay({
            component: {
                name: Screens.GENDER_OVERLAY,
                passProps: {
                    onSelect: setGender,
                },
            },
        });
    }, []);

    const getLocation = useCallback(async () => {
        const locationPermission = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

        if (locationPermission === RESULTS.DENIED) {
            Alert.alert(
                'Location Permission',
                'Please enable location permission to continue',
                [
                    {
                        text: 'Open Settings',
                        onPress: () => Linking.openSettings(),
                    },
                ],
            );
        }

        try {
            setLoading(true);
            await promptForEnableLocationIfNeeded();
            setLocationError(null);

            const {latitude, longitude} = await getLatLong();
            const city = await getCityFromLatLong(latitude!, longitude!);
            setLoading(false);

            if (!city) {
                throw new Error();
            }

            setLocation({
                lat: latitude!,
                long: longitude!,
                city,
            });
        } catch (e) {
            setLocationError('Unable to fetch location. Please try again later');
        }
    }, []);

    const runValidators = () => {
        const errors = [];

        const nameValidate = runNameValidator();
        const dobValidate = runDateValidator();
        const genderValidate = runGenderValidator();
        const locationValidate = runLocationValidator();

        if (nameValidate) {
            errors.push(nameValidate);
        }
        if (dobValidate) {
            errors.push(dobValidate);
        }
        if (genderValidate) {
            errors.push(genderValidate);
        }
        if (locationValidate) {
            errors.push(locationValidate);
        }

        return errors;
    };

    const onContinue = useCallback(() => {
        const errors = runValidators();

        if (errors.length > 0) {
            return;
        }

        onComplete({
            name,
            gender,
            dob: dob!,
            location: location!,
        });
    }, [nameError, dobError, genderError, locationError, name, dob, gender, location]);

    return (
        <ScrollView contentContainerStyle={styles.root}>
            <Text style={styles.heading}>Introduce Yourself</Text>
            <Input
                placeholder='Enter your name'
                icon={{name: 'account-circle-outline', size: 22}}
                message="You can't change name later"
                defaultValue={name}
                onChangeText={setName}
                error={nameError}
            />
            <Input
                placeholder='Date of birth'
                icon={{name: 'calendar-month-outline', size: 20}}
                message="You can't change date of birth later"
                touchable={true}
                error={dobError}
                defaultValue={dob?.toDateString() || ''}
                onPress={() => setShowDatePicker(true)}
            />
            <Input
                placeholder='Gender'
                icon={{name: 'gender-male-female', size: 22}}
                touchable={true}
                defaultValue={gender}
                error={genderError}
                onPress={showGenderOverlay}
            />
            <Input
                placeholder='Location'
                icon={{name: 'map-marker-outline', size: 22}}
                defaultValue={location?.city || ''}
                loading={loading}
                touchable={true}
                onPress={getLocation}
                error={locationError}
            />
            <Button
                text='Continue'
                onPress={onContinue}
                disabled={loading}
            />
            <DatePicker
                modal={true}
                open={showDatePicker}
                maximumDate={new Date()}
                minimumDate={new Date(1900, 0, 1)}
                mode='date'
                date={dob || INITIAL_DOB}
                onConfirm={(date) => {
                    setDob(date);
                    setShowDatePicker(false);
                }}
                onCancel={() => setShowDatePicker(false)}
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 30,
        paddingHorizontal: 20,
        rowGap: 15,
        width: WIDTH,
    },
    heading: {
        fontSize: 40,
        textAlign: 'center',
        fontFamily: 'Belleza-Regular',
        marginTop: 70,
    },
});

export default Introduce;
