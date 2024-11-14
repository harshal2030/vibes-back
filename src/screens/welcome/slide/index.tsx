// Copyright (c) 2023-present Vibes, Inc. All Rights Reserved.
import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';

import Button from '@components/button';
import Text from '@components/text';

interface SlideProps {
  title: React.ReactNode;
  description: string;
  image: React.JSX.Element;
  onPress: () => void;
  buttonText: string;
}

const {width, height} = Dimensions.get('window');

const Slide = ({
    title,
    description,
    image,
    buttonText,
    onPress,
}: SlideProps) => {
    return (
        <View style={styles.root}>
            {title}
            <Text style={styles.description}>{description}</Text>
            {image}

            <View style={styles.buttonContainer}>
                <Button
                    text={buttonText}
                    onPress={onPress}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
        padding: 20,
        width,
        height: height - 40,
        justifyContent: 'space-between',
    },
    description: {
        fontSize: 21,
        fontFamily: 'PlayfairDisplay-Regular',
    },
    buttonContainer: {
        width: '100%',
        alignItems: 'center',
    },
});

export default Slide;
