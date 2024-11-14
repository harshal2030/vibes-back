// Copyright (c) 2023-present Vibes, Inc. All Rights Reserved.
import {useRef} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {Navigation, type NavigationFunctionComponent} from 'react-native-navigation';
import Animated from 'react-native-reanimated';

import Slide1 from '@assets/images/slide-1.svg';
import Slide2 from '@assets/images/slide-2.svg';
import Slide3 from '@assets/images/slide-3.svg';
import Text from '@components/text';
import Colors from '@constants/colors';
import Screens from '@constants/screens';

import Slide from './slide';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        backgroundColor: Colors.SECONDARY_COLOR,
    },
    title: {
        fontSize: 55,
        fontFamily: 'Belleza-Regular',
        lineHeight: 60,
    },
    highlightText: {
        color: Colors.PRIMARY_COLOR,
        fontFamily: 'Belleza-Regular',
    },
});

const slides = [
    {
        title: (
            <View>
                <Text style={styles.title}>
                    Find <Text style={styles.highlightText}>Love</Text>
                </Text>
                <Text style={styles.title}>without</Text>
                <Text style={styles.title}>Judgement</Text>
            </View>
        ),
        description:
      'Our app is designed for blind dating, where you can connect with others purely based on personality and interests.',
        image: <Slide1 width='99.99%'/>,
    },
    {
        title: (
            <View>
                <Text style={[styles.title, styles.highlightText]}>Anonymous</Text>
                <Text style={styles.title}>Chatting</Text>
            </View>
        ),
        description: 'Communicate safely and anonymously with in-app Chat Feature.',
        image: <Slide2 height='52%'/>,
    },
    {
        title: (
            <View>
                <Text style={[styles.title, styles.highlightText]}>Personality</Text>
                <Text style={styles.title}>matching</Text>
            </View>
        ),
        description:
      'Our app matches you with others based on Personality traits and Interests.',
        image: <Slide3 height='55%'/>,
    },
];

const Welcome: NavigationFunctionComponent = ({componentId}) => {
    const scroll = useRef<Animated.ScrollView>(null);

    const onSlideButtonPress = (index: number) => {
        if (index === slides.length - 1) {
            Navigation.push(componentId, {
                component: {
                    name: Screens.LOGIN,
                },
            });
        } else {
            scroll.current?.scrollTo({
                x: width * (index + 1),
                animated: true,
            });
        }
    };

    return (
        <View style={styles.rootContainer}>
            <Animated.ScrollView
                horizontal={true}
                ref={scroll}
                snapToInterval={width}
                snapToAlignment='end'
                showsHorizontalScrollIndicator={false}
                bounces={false}
                scrollEventThrottle={16}
                scrollEnabled={false}
                decelerationRate='fast'
            >
                {slides.map((slide, index) => {
                    const buttonText =
            index === slides.length - 1 ? 'Catch a vibe' : 'Next';

                    return (
                        <Slide
                            key={index}
                            title={slide.title}
                            description={slide.description}
                            image={slide.image}
                            buttonText={buttonText}
                            onPress={() => onSlideButtonPress(index)}
                        />
                    );
                })}
            </Animated.ScrollView>
        </View>
    );
};

Welcome.options = {
    topBar: {
        visible: false,
    },
};

export default Welcome;
