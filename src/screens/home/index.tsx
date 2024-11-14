// Copyright (c) 2023-present Vibes, Inc. All Rights Reserved.
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {View, Text, StyleSheet} from 'react-native';
import {type NavigationFunctionComponent, Navigation} from 'react-native-navigation';

import NotificationBell from '@assets/images/notification-bell.svg';
import SettingsIcon from '@assets/images/settings.svg';
import {PRIMARY_COLOR} from '@constants/colors';
import Screens from '@constants/screens';

const Tabs = createBottomTabNavigator();

interface Props {
    componentId: string;
}

const Test = ({componentId}: Props) => {
    const goToProfile = () => {
        Navigation.push(componentId, {
            component: {
                name: Screens.PROFILE,
            },
        });
    };

    return (
        <View style={styles.root}>
            <View style={styles.header}>
                <NotificationBell/>
                <Text style={styles.heading}>Vibes</Text>
                <SettingsIcon onPress={goToProfile}/>
            </View>
        </View>
    );
};

const Home: NavigationFunctionComponent = ({componentId}) => {
    const TestCom = () => <Test componentId={componentId}/>;
    const Like = () => (<View>
        <Text>Like</Text>
    </View>);

    return (
        <NavigationContainer>
            <Tabs.Navigator initialRouteName='Home'>
                <Tabs.Screen
                    name='Home'
                    component={TestCom}
                />
                <Tabs.Screen
                    name='Like'
                    component={Like}
                />
            </Tabs.Navigator>
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
        padding: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    heading: {
        textAlign: 'center',
        fontFamily: 'GreatVibes-Regular',
        fontSize: 48,
        color: PRIMARY_COLOR,
    },
});

Home.options = {
    topBar: {
        visible: false,
    },
};

export default Home;
