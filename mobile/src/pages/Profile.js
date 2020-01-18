import React from "react";
import { View, StatusBar } from "react-native";
import { WebView } from 'react-native-webview';

function Profile({ navigation }) {
    const github_username = navigation.getParam('github_username');

    return (
        <>
            <StatusBar barStyle="light-content" />
            <View style={{flex: 1, backgroundColor: '#24292e', paddingTop: 85}}>
                < WebView style = {
                    {
                        flex: 1
                    }
                }
                source = {
                    {
                        uri: `https://github.com/${github_username}`
                    }
                }
                />
            </View>
        </>
    );
}

export default Profile;