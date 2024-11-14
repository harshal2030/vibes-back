// Copyright (c) 2023-present Vibes, Inc. All Rights Reserved.
import {useCallback} from 'react';
import {View, StyleSheet} from 'react-native';
import {Navigation, type NavigationFunctionComponent} from 'react-native-navigation';

import Button from '@components/button';
import Input from '@components/input';
import Text from '@components/text';
import Colors from '@constants/colors';
import Regex from '@constants/regex';
import Screens from '@constants/screens';
import {useField} from '@hooks/form';
import {sendOTP} from '@utils/auth';

const emailValidator = (value: string) => {
    if (!Regex.EMAIL_REGEX.test(value)) {
        return 'Please enter a valid email address';
    }

    return null;
};

const Login: NavigationFunctionComponent = ({componentId}) => {
    const {value: email, onChangeText, error, runValidator} = useField('', emailValidator);

    const onLogin = useCallback(async () => {
        try {
            runValidator();

            if (error) {
                return;
            }

            Navigation.push(componentId, {
                component: {
                    name: Screens.OTP,
                    passProps: {
                        email,
                    },
                },
            });

            await sendOTP(email);
        } catch (e) {
            Navigation.showOverlay({
                component: {
                    name: Screens.OVERLAY,
                    passProps: {
                        message: 'Something went wrong',
                    },
                },
            });
        }
    }, [email]);

    return (
        <View style={styles.root}>
            <Text style={styles.heading}>Enter your email to get into the</Text>
            <Text style={styles.vibes}>Vibes</Text>
            <Input
                placeholder='Email address'
                icon={{name: 'account-circle-outline', size: 22}}
                containerStyle={styles.input}
                defaultValue={email}
                onChangeText={onChangeText}
                autoCapitalize='none'
            />
            <Button
                text='Continue'
                onPress={onLogin}
                containerStyle={styles.button}
            />
        </View>
    );
};

Login.options = {
    topBar: {
        visible: false,
    },
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: Colors.SECONDARY_COLOR,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    heading: {
        fontSize: 40,
        textAlign: 'center',
        fontFamily: 'Belleza-Regular',
    },
    vibes: {
        fontSize: 55,
        marginTop: -5,
        color: Colors.PRIMARY_COLOR,
        textAlign: 'center',
        fontFamily: 'GreatVibes-Regular',
    },
    button: {
        marginTop: 25,
    },
    input: {
        marginTop: -5,
        marginHorizontal: 20,
    },
});

export default Login;
