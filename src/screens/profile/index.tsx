// Copyright (c) 2023-present Vibes, Inc. All Rights Reserved.
import {View, Text, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import {type NavigationFunctionComponent, Navigation} from 'react-native-navigation';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import Button from '@components/button';
import Chip from '@components/chip';
import ProfileSection from '@components/profile_section';
import TextArea from '@components/textarea';
import {ERROR_COLOR, PLACEHOLDER_COLOR, PRIMARY_COLOR, TEXT_INPUT_COLOR} from '@constants/colors';
import {ROOT_API_URL} from '@constants/config';
import {useStore} from '@global/store';
import {calculateAge} from '@utils/date';

import ProfileImage from './profile_image';
import Section from './section';

const Profile: NavigationFunctionComponent = ({componentId}) => {
    const {profile, signOut} = useStore((state) => ({
        profile: state.profile,
        signOut: state.signOut,
    }));

    const goBack = () => {
        Navigation.pop(componentId);
    };

    const renderImages = () => {
        if (!profile?.images) {
            return null;
        }

        const image1 = profile.images[0] ? {uri: `${ROOT_API_URL}/profile/${profile.images[0]}`} : null;
        const image2 = profile.images[1] ? {uri: `${ROOT_API_URL}/profile/${profile.images[1]}`} : null;
        const image3 = profile.images[2] ? {uri: `${ROOT_API_URL}/profile/${profile.images[2]}`} : null;
        const image4 = profile.images[3] ? {uri: `${ROOT_API_URL}/profile/${profile.images[3]}`} : null;

        return (
            <View style={{marginTop: 5}}>
                <View style={styles.gridImageContainer}>
                    <ProfileImage
                        src={image1}
                        style={{borderTopLeftRadius: 15}}
                    />

                    <ProfileImage
                        src={image2}
                        style={{borderTopRightRadius: 15}}
                    />
                </View>

                <View style={styles.gridImageContainer}>
                    <ProfileImage
                        src={image3}
                        style={{borderBottomLeftRadius: 15}}
                    />

                    <ProfileImage
                        src={image4}
                        style={{borderBottomRightRadius: 15}}
                    />
                </View>
            </View>
        );
    };

    if (!profile) {
        return (
            <Text>loading...</Text>
        );
    }

    return (
        <View style={styles.root}>
            <View style={styles.header}>
                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={goBack}
                >
                    <MaterialIcon
                        name='arrow-left'
                        size={25}
                        color={PRIMARY_COLOR}
                        style={styles.backButton}
                    />
                </TouchableOpacity>
                <Text style={styles.headerText}>Profile</Text>
                <View/>
            </View>

            <ScrollView contentContainerStyle={{paddingBottom: 30}}>
                <Text style={styles.nameText}>{profile?.name || ''}</Text>

                {renderImages()}

                <ProfileSection
                    title='About Me'
                    style={styles.profileSection}
                >
                    <TextArea
                        defaultValue={profile?.about || ''}
                        style={{height: 150}}
                    />
                </ProfileSection>

                <ProfileSection
                    title='Interests'
                    style={styles.profileSection}
                    touchable={true}
                >
                    <Section contentContainerStyle={styles.interestContainer}>
                        {profile?.interests?.map((interest) => (
                            <Chip
                                key={interest}
                                label={interest}
                                selected={false}
                                disabled={true}
                            />
                        ))}
                    </Section>
                </ProfileSection>

                <ProfileSection
                    title='Drinking Habits'
                    style={styles.profileSection}
                    touchable={true}
                >
                    <Section contentContainerStyle={styles.interestContainer}>
                        <Chip
                            label={profile?.drinks || ''}
                            selected={false}
                            disabled={true}
                        />
                    </Section>
                </ProfileSection>

                <ProfileSection
                    title='Smoking Habits'
                    style={styles.profileSection}
                    touchable={true}
                >
                    <Section contentContainerStyle={styles.interestContainer}>
                        <Chip
                            label={profile?.smokes || ''}
                            selected={false}
                            disabled={true}
                        />
                    </Section>
                </ProfileSection>

                <ProfileSection
                    title='More About me'
                    titleStyle={styles.profileSection}
                    style={{borderBottomWidth: 0}}
                >
                    <Section
                        rootStyle={styles.subSection}
                        showIcon={false}
                    >
                        <Text style={styles.title}>Gender</Text>
                        <Text style={styles.subTitle}>{profile?.gender}</Text>
                    </Section>

                    <Section
                        rootStyle={styles.subSection}
                        showIcon={false}
                    >
                        <Text style={styles.title}>Age</Text>
                        <Text style={styles.subTitle}>{calculateAge(new Date(profile!.dob!))}</Text>
                    </Section>

                    <Section
                        rootStyle={styles.subSection}
                        touchable={true}
                    >
                        <Text style={styles.title}>Faith</Text>
                        <Text style={styles.subTitle}>{profile?.faith}</Text>
                    </Section>

                    <Section
                        rootStyle={styles.subSection}
                        touchable={true}
                    >
                        <Text style={styles.title}>Height</Text>
                        <Text style={styles.subTitle}>--</Text>
                    </Section>

                    <Section
                        rootStyle={styles.subSection}
                        touchable={true}
                    >
                        <Text style={styles.title}>Lives in</Text>
                        <Text style={styles.subTitle}>{profile?.city}</Text>
                    </Section>
                </ProfileSection>

                <ProfileSection
                    title='Danger Zone'
                    titleStyle={StyleSheet.flatten([styles.profileSection, {paddingBottom: 0}])}
                    style={{borderBottomWidth: 0}}
                >
                    <Button
                        text='Sign Out'
                        style={styles.dangerButtons}
                        textStyle={styles.dangerText}
                        onPress={signOut}
                    />
                    <View style={{height: 1, width: '100%', backgroundColor: PLACEHOLDER_COLOR}}/>
                    <Button
                        text='Delete Account'
                        style={styles.dangerButtons}
                        textStyle={styles.dangerText}
                    />
                </ProfileSection>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    header: {
        height: 65,
        backgroundColor: 'white',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',

        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1.5,
        },
        shadowOpacity: 0.5,
        shadowRadius: 3.84,
        elevation: 1.5,
    },
    backButton: {
        marginLeft: 10,
    },
    headerText: {
        fontFamily: 'Roboto-Regular',
        fontSize: 18,
        fontWeight: '500',
        textAlign: 'center',
        marginLeft: -30,
    },
    nameText: {
        fontSize: 50,
        fontFamily: 'Belleza-Regular',
        textAlign: 'center',
        color: PRIMARY_COLOR,
    },
    profileSection: {
        marginTop: 15,
        paddingHorizontal: 20,
        paddingBottom: 10,
    },
    subSection: {
        paddingHorizontal: 20,
        paddingBottom: 10,
        marginTop: 5,
        borderBottomWidth: 1,
        borderColor: PLACEHOLDER_COLOR,
    },
    title: {
        fontFamily: 'Roboto-Regular',
        fontWeight: '500',
        fontSize: 18,
    },
    subTitle: {
        fontFamily: 'Roboto-Light',
        fontSize: 14,
        color: TEXT_INPUT_COLOR,
    },
    gridImageContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    interestContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        rowGap: 5,
        columnGap: 5,
    },
    dangerButtons: {
        backgroundColor: 'transparent',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginVertical: 20,
        paddingHorizontal: 20,
    },
    dangerText: {
        color: ERROR_COLOR,
        textAlign: 'left',
        fontFamily: 'Roboto-Regular',
        fontSize: 18,
    },
});

Profile.options = {
    topBar: {
        visible: false,
    },
};

export default Profile;
