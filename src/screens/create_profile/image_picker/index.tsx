// Copyright (c) 2023-present Vibes, Inc. All Rights Reserved.
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import {useCallback, useMemo, useRef, useState} from 'react';
import {View, StyleSheet, Dimensions, Alert, Linking} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import ImageCropPicker, {type Image} from 'react-native-image-crop-picker';
import {PERMISSIONS} from 'react-native-permissions';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import BackButton from '@assets/images/back_button.svg';
import Button from '@components/button';
import Text from '@components/text';
import Colors from '@constants/colors';
import {hexToRgb} from '@utils/colors';
import {canUsePermission} from '@utils/permission';

import ImageBox from './image_box';

const WIDTH = Dimensions.get('window').width;

interface Props {
    onBackButtonPress: () => void;
    onComplete: (data: {images: Image[]}) => void;
}

const ImagePicker = ({onBackButtonPress, onComplete}: Props) => {
    const [images, setImages] = useState<Array<Image | null>>([null, null, null]);
    const [error, setError] = useState<string | null>(null);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const snapPoints = useMemo(() => [150], []);

    const bottomSheetRef = useRef<BottomSheet>(null);

    const openBottomSheet = useCallback((index: number) => {
        setCurrentIndex(index);
        bottomSheetRef.current?.snapToIndex(0);
    }, []);

    const onPermissionDeniedOrBlocked = () => {
        Alert.alert(
            'Permission Required',
            'We need permission to access your gallery to upload photos',
            [
                {
                    text: 'Open Settings',
                    onPress: () => {
                        Linking.openSettings();
                    },
                },
            ],
            {cancelable: false},
        );
    };

    const openGallery = useCallback(async () => {
        try {
            bottomSheetRef.current?.close();
            const permission = await canUsePermission(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES, onPermissionDeniedOrBlocked);

            if (!permission) {
                return;
            }

            const result = await ImageCropPicker.openPicker({
                mediaType: 'photo',
                cropperActiveWidgetColor: Colors.PRIMARY_COLOR,
                cropping: true,
                includeBase64: true,
            });

            const tempImages = [...images];
            tempImages[currentIndex] = result;
            setImages(tempImages);
        } catch (e) {
            // thinking
        }
    }, [currentIndex, images]);

    const openCamera = useCallback(async () => {
        try {
            bottomSheetRef.current?.close();
            const permission = await canUsePermission(PERMISSIONS.ANDROID.CAMERA, onPermissionDeniedOrBlocked);

            if (!permission) {
                return;
            }
            const result = await ImageCropPicker.openCamera({
                mediaType: 'photo',
                cropping: true,
                useFrontCamera: true,
                cropperActiveWidgetColor: Colors.PRIMARY_COLOR,
            });

            const tempImages = [...images];
            tempImages[currentIndex] = result;
            setImages(tempImages);
        } catch (e) {
            // thinking
        }
    }, [currentIndex, images]);

    const removeImage = useCallback((index: number) => {
        const tempImages = [...images];
        tempImages[index] = null;
        setImages(tempImages);
    }, [images]);

    const onContinue = useCallback(() => {
        if (images.filter((image) => image !== null).length < 2) {
            setError('Please upload at least 2 photos');
            return;
        }

        setError(null);

        onComplete({
            images: images.filter((image) => image !== null) as Image[],
        });
    }, [images]);

    return (
        <View style={styles.root}>
            <TouchableOpacity onPress={onBackButtonPress}>
                <BackButton
                    width={25}
                    height={17}
                />
            </TouchableOpacity>
            <View style={styles.contentContainer}>
                <Text style={styles.heading}>Upload your photos</Text>
                <Text style={styles.subheading}>Upload at least 2 photos</Text>

                <View style={styles.imageBoxContainer}>
                    <ImageBox
                        style={styles.imageBoxMain}
                        imageStyle={StyleSheet.flatten([styles.imageBoxMain, {justifyContent: 'flex-start', alignItems: 'flex-start'}])}
                        image={images[0]}
                        onPlusPress={() => openBottomSheet(0)}
                        onCrossPress={() => removeImage(0)}
                    />

                    <View style={styles.secondaryImageBoxContainer}>
                        <ImageBox
                            style={imageBoxSecondaryFirst}
                            imageStyle={StyleSheet.flatten([imageBoxSecondaryFirst, {justifyContent: 'flex-start', alignItems: 'flex-end'}])}
                            image={images[1]}
                            onPlusPress={() => openBottomSheet(1)}
                            onCrossPress={() => removeImage(1)}
                        />
                        <ImageBox
                            style={imageBoxSecondarySecond}
                            imageStyle={StyleSheet.flatten([imageBoxSecondarySecond, {justifyContent: 'flex-start', alignItems: 'flex-end'}])}
                            image={images[2]}
                            onPlusPress={() => openBottomSheet(2)}
                            onCrossPress={() => removeImage(2)}
                        />
                    </View>
                </View>

                <Button
                    text='Continue'
                    containerStyle={styles.buttonStyle}
                    onPress={onContinue}
                />
                {error ? (
                    <Text type='error'>{error}</Text>
                ) : null}
            </View>

            <BottomSheet
                index={-1}
                snapPoints={snapPoints}
                ref={bottomSheetRef}
                enablePanDownToClose={true}
                style={styles.bottomSheet}
            >
                <BottomSheetView>
                    <TouchableOpacity
                        style={styles.bottomSheetOptionContainer}
                        onPress={openGallery}
                    >
                        <MaterialIcon
                            name='image'
                            size={24}
                        />
                        <Text style={styles.bottomSheetOptionText}> Pick from gallery</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.bottomSheetOptionContainer}
                        onPress={openCamera}
                    >
                        <MaterialIcon
                            name='camera'
                            size={24}
                        />
                        <Text style={styles.bottomSheetOptionText}> Take a photo</Text>
                    </TouchableOpacity>
                </BottomSheetView>
            </BottomSheet>
        </View>
    );
};

ImagePicker.options = {
    topBar: {
        visible: false,
    },
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
        width: WIDTH,
        padding: 20,
    },
    contentContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    subheading: {
        fontSize: 16,
        textAlign: 'center',
        color: hexToRgb('#333333', 0.9),
        marginTop: 20,
    },
    heading: {
        fontSize: 40,
        textAlign: 'center',
        fontFamily: 'Belleza-Regular',
    },
    imageBoxContainer: {
        marginTop: 20,
        height: '65%',
        columnGap: 10,
        flexDirection: 'row',
    },
    secondaryImageBoxContainer: {
        flex: 1,
        rowGap: 5,
    },
    imageBoxSecondaryBase: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.PLACEHOLDER_COLOR,
    },
    imageBoxMain: {
        flex: 1,
        borderTopLeftRadius: 12,
        borderBottomLeftRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.PLACEHOLDER_COLOR,
    },
    bottomSheet: {
        borderWidth: 1,
        borderColor: Colors.PLACEHOLDER_COLOR,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },
    bottomSheetOptionContainer: {
        height: 50,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
    },
    bottomSheetOptionText: {
        fontSize: 18,
        color: Colors.TERTIARY_COLOR,
        fontFamily: 'Roboto-Medium',
    },
    buttonStyle: {
        marginTop: 20,
    },
});

const imageBoxSecondaryFirst = StyleSheet.flatten([styles.imageBoxSecondaryBase, {borderTopRightRadius: 12}]);
const imageBoxSecondarySecond = StyleSheet.flatten([styles.imageBoxSecondaryBase, {borderBottomRightRadius: 12}]);

export default ImagePicker;
