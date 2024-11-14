// Copyright (c) 2023-present Vibes, Inc. All Rights Reserved.
import {ImageBackground, TouchableOpacity, type ViewStyle} from 'react-native';
import {type ImageOrVideo} from 'react-native-image-crop-picker';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import Colors from '@constants/colors';

interface Props {
    image?: ImageOrVideo | null;
    imageStyle?: ViewStyle;
    style?: ViewStyle;
    onPlusPress?: () => void;
    onCrossPress?: () => void;
}

const ImageBox = ({image, style, imageStyle, onPlusPress, onCrossPress}: Props) => {
    if (image) {
        return (
            <ImageBackground
                source={{uri: image.path}}
                style={imageStyle || style}
                resizeMode='contain'
            >
                <MaterialIcon
                    name='close-circle'
                    size={25}
                    color={Colors.PLACEHOLDER_COLOR}
                    onPress={onCrossPress}
                />
            </ImageBackground>
        );
    }

    return (
        <TouchableOpacity
            style={style}
            onPress={onPlusPress}
        >
            <MaterialIcon
                name='plus-circle'
                size={25}
                color={Colors.PLACEHOLDER_COLOR}
            />
        </TouchableOpacity>
    );
};

export default ImageBox;
