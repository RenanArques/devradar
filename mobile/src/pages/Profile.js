import React from "react";
import { View, StatusBar } from "react-native";
import { WebView } from 'react-native-webview';

function Profile() {
    return (
        <>
            <StatusBar barStyle="light-content" />
            <View style={{flex: 1, backgroundColor: '#24292e', paddingTop: 85}}>
                <WebView style={{flex: 1}} source={{ uri: 'https://github.com/renanarques' }} />
            </View>
        </>
    );
}

export default Profile;