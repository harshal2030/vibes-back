// Copyright (c) 2023-present Vibes, Inc. All Rights Reserved.
import {View, Image, StyleSheet, type ImageSourcePropType, type ImageStyle} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import {PLACEHOLDER_COLOR, TEXT_INPUT_COLOR} from '@constants/colors';

interface Props {
    src?: ImageSourcePropType | null;
    style?: ImageStyle;
}

const ProfileImage = ({src, style}: Props) => {
    if (!src) {
        return (
            <View style={[styles.baseImage, styles.view, style]}>
                <MaterialIcon
                    name='plus-circle'
                    size={25}
                    color={TEXT_INPUT_COLOR}
                />
            </View>
        );
    }

    return (
        <Image
            source={src}
            style={[styles.baseImage, style]}
        />
    );
};

const styles = StyleSheet.create({
    baseImage: {
        width: 150,
        height: 150,
        margin: 3,
    },
    view: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: PLACEHOLDER_COLOR,
    },
});

export default ProfileImage;
