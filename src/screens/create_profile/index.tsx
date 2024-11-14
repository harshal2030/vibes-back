// Copyright (c) 2023-present Vibes, Inc. All Rights Reserved.
import axios, {AxiosError} from 'axios';
import {useState, useRef} from 'react';
import {View, Dimensions, StyleSheet, ScrollView} from 'react-native';
import {type Image} from 'react-native-image-crop-picker';
import {type NavigationFunctionComponent, Navigation} from 'react-native-navigation';
import Animated, {useSharedValue, useAnimatedStyle, withDelay, withTiming} from 'react-native-reanimated';

import {supabase} from '@client/supabase';
import COLORS from '@constants/colors';
import {ROOT_API_URL} from '@constants/config';
import SCREENS from '@constants/screens';
import {useStore} from '@global/store';

import About from './about';
import Drinking from './drinking';
import Faith from './faith';
import ImagePicker from './image_picker';
import Introduce from './introduce';
import Smoke from './smoke';

const STEPS_COUNT = 5;
const WIDTH = Dimensions.get('window').width;

interface ProfileStateData {
    name: string;
    dob: Date;
    gender: string;
    location: {
        city: string;
        lat: number;
        long: number;
    };
    images: Image[];
    about: string;
    interests: {[id: string]: boolean};
    smoke: string;
    drink: string;
    faith: string;
}

const CreateProfile: NavigationFunctionComponent = ({componentId}) => {
    const [data, setData] = useState<Partial<ProfileStateData>>({});
    const progress = useSharedValue(0);

    const scroll = useRef<ScrollView>(null);

    const session = useStore((state) => state.session);

    const progressStyle = useAnimatedStyle(() => {
        return {
            width: (WIDTH / STEPS_COUNT) * progress.value,
        };
    });

    const onComplete = async (partialData: Partial<ProfileStateData>): Promise<void> => {
        const temp = {...data, ...partialData};
        if (progress.value <= STEPS_COUNT) {
            setData(temp);

            scroll.current?.scrollTo({
                x: WIDTH * (progress.value + 1),
                animated: true,
            });

            progress.value = withDelay(70, withTiming(progress.value + 1));
        }

        if (progress.value >= STEPS_COUNT) {
            try {
                const imageBody = new FormData();

                const profileData = {
                    user_id: session!.user.id,
                    name: temp.name,
                    gender: temp.gender,
                    dob: temp.dob?.toISOString(),
                    city: temp.location?.city,
                    coords: temp.location ? `POINT(${temp.location.long} ${temp.location.lat})` : null,
                    drinks: temp.drink,
                    smokes: temp.smoke,
                    faith: temp.faith,
                    about: temp.about,
                    interests: Object.keys(temp.interests || {}).filter((key) => temp.interests![key]),
                };

                const res = await supabase.from('profiles').insert(profileData).returns();

                if (res.error) {
                    Navigation.showOverlay({
                        component: {
                            name: SCREENS.OVERLAY,
                            passProps: {
                                message: res.error.message,
                                type: 'danger',
                            },
                        },
                    });
                    return;
                }

                temp.images!.forEach((image) => {
                    imageBody.append('images', {
                        uri: image.path,
                        name: image.filename || 'image.jpg',
                        type: image.mime,
                    });
                });

                const imagRes = await axios.post<{files: string[]}>(
                    `${ROOT_API_URL}/profile/profile-image`,
                    imageBody,
                    {
                        headers: {
                            authorization: `Bearer ${session?.access_token}`,
                            'Content-Type': 'multipart/form-data',
                        },
                    },
                );

                if (imagRes.status !== 200) {
                    Navigation.showOverlay({
                        component: {
                            name: SCREENS.OVERLAY,
                            passProps: {
                                message: 'Failed to upload images, you can always upload them later from your profile',
                                type: 'danger',
                            },
                        },
                    });
                }

                Navigation.setStackRoot(componentId, {
                    component: {
                        name: SCREENS.PROFILE,
                    },
                });
            } catch (e) {
                if (e instanceof AxiosError) {
                    Navigation.showOverlay({
                        component: {
                            name: SCREENS.OVERLAY,
                            passProps: {
                                message: 'Failed to upload images, you can always upload them later from your profile',
                                type: 'danger',
                            },
                        },
                    });
                }
            }
        }
    };

    const goBack = () => {
        scroll.current?.scrollTo({
            x: WIDTH * (progress.value - 1),
            animated: true,
        });

        progress.value = withDelay(70, withTiming(progress.value - 1));
    };

    return (
        <View style={styles.root}>
            <ScrollView
                horizontal={true}
                ref={scroll}
                snapToInterval={WIDTH}
                snapToAlignment='end'
                showsHorizontalScrollIndicator={false}
                keyboardShouldPersistTaps='always'
                bounces={false}
                scrollEventThrottle={16}
                scrollEnabled={false}
                nestedScrollEnabled={true}
                decelerationRate='fast'
            >
                <Introduce onComplete={onComplete}/>

                <ImagePicker
                    onBackButtonPress={goBack}
                    onComplete={onComplete}
                />
                <About
                    onBackButtonPress={goBack}
                    onComplete={onComplete}
                />
                <Drinking
                    onBackButtonPress={goBack}
                    onComplete={onComplete}
                />
                <Smoke
                    onBackButtonPress={goBack}
                    onComplete={onComplete}
                />
                <Faith
                    onBackButtonPress={goBack}
                    onComplete={onComplete}
                />
            </ScrollView>

            <View style={{width: WIDTH, backgroundColor: COLORS.PLACEHOLDER_COLOR}}>
                <Animated.View style={[{backgroundColor: COLORS.PRIMARY_COLOR, height: 7}, progressStyle]}/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
});

CreateProfile.options = {
    topBar: {
        visible: false,
    },
};

export default CreateProfile;
