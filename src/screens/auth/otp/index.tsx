// Copyright (c) 2023-present Vibes, Inc. All Rights Reserved.
import Clipboard from '@react-native-clipboard/clipboard';
import {useState, useRef, createRef, useCallback, type RefObject} from 'react';
import {View, StyleSheet, TextInput, type TextInputKeyPressEventData, type NativeSyntheticEvent} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Navigation, type NavigationFunctionComponent} from 'react-native-navigation';

import {supabase} from '@client/supabase';
import Button from '@components/button';
import Text from '@components/text';
import Colors from '@constants/colors';
import Screens from '@constants/screens';
import {useStore} from '@global/store';
import {sendOTP} from '@utils/auth';
import {hexToRgb} from '@utils/colors';

import InputBox from './input_box';

interface Props {
    email: string;
}

const OTP: NavigationFunctionComponent<Props> = ({email}) => {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const setSession = useStore((state) => state.setSession);

    const inputRefs = useRef<Array<RefObject<TextInput>>>([]);

    inputRefs.current = otp.map((_, i) => inputRefs.current[i] ?? createRef());

    const onChangeText = useCallback(async (text: string, index: number) => {
        if (text.length === 1) {
            const otpCopy = [...otp];
            otpCopy[index] = text;
            setOtp(otpCopy);

            if (index + 1 < otp.length) {
                inputRefs.current[index + 1].current?.focus();
            }
        }

        if (text.length > 5) {
            const clipboardOtp = await Clipboard.getString();

            if (clipboardOtp === text) {
                setOtp(clipboardOtp.substring(0, 6).split(''));
                inputRefs.current[otp.length - 1].current?.focus();
            }
        }
    }, [otp]);

    const login = useCallback(async () => {
        const otpString = otp.join('');

        if (otpString.length !== 6) {
            Navigation.showOverlay({
                component: {
                    name: Screens.OVERLAY,
                    passProps: {
                        message: 'Please enter a valid OTP',
                        type: 'danger',
                    },
                },
            });
            return;
        }

        const {data, error} = await supabase.auth.verifyOtp({email, token: otpString, type: 'email'});

        if (error) {
            Navigation.showOverlay({
                component: {
                    name: Screens.OVERLAY,
                    passProps: {
                        message: error.message,
                        type: 'danger',
                    },
                },
            });
            return;
        }

        await setSession(data.session);
    }, [email, otp]);

    const onKeyPress = useCallback(({nativeEvent}: NativeSyntheticEvent<TextInputKeyPressEventData>, index: number) => {
        if (nativeEvent.key === 'Backspace') {
            const otpCopy = [...otp];
            if (otpCopy[index]) {
                otpCopy[index] = '';
                setOtp(otpCopy);
            }

            if (index - 1 >= 0) {
                inputRefs.current[index - 1].current?.focus();
            }
        }
    }, [otp]);

    const resendOTP = async () => {
        try {
            await sendOTP(email);
        } catch (e) {
            // lets see
        }
    };

    return (
        <View style={styles.root}>
            <Text style={styles.heading}>Please enter a magical code to verify</Text>
            <View style={styles.otpContainer}>
                {otp.map((value, index) => {
                    return (
                        <InputBox
                            // eslint-disable-next-line react/no-array-index-key
                            key={index}
                            value={value}
                            onKeyPress={(e) => onKeyPress(e, index)}
                            ref={inputRefs.current[index]}
                            selectionColor={Colors.PRIMARY_COLOR}
                            onChangeText={(text) => onChangeText(text, index)}
                        />
                    );
                })}
            </View>

            <Button
                text='Log in'
                containerStyle={styles.button}
                onPress={login}
            />
            <TouchableOpacity
                style={styles.resendContainer}
                onPress={resendOTP}
            >
                <Text style={styles.resendText}>Resend OTP</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
    },
    heading: {
        fontSize: 37,
        marginTop: -30,
        textAlign: 'center',
        fontFamily: 'Belleza-Regular',
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 30,
        marginTop: 30,
    },
    button: {
        marginTop: 25,
    },
    resendText: {
        color: hexToRgb('#333333', 0.7),
        fontSize: 12,
    },
    resendContainer: {
        marginTop: 15,
    },
});

OTP.options = {
    topBar: {
        visible: false,
    },
};

export default OTP;
