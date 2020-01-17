import React, { useEffect, useState } from 'react';
import { StyleSheet, StatusBar, Image, View, Text, TextInput, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';

import api from '../services/api'

import mapStyle from './utils/mapStyle';

function Main({ navigation }) {
    const [devs, setDevs] = useState([]);
    const [currentRegion, setCurrentRegion] = useState(null);

    useEffect(() => {
        async function loadInitialPosition() {
            const { granted } = await requestPermissionsAsync();
            
            if (granted) {
                const { coords } = await getCurrentPositionAsync({
                    enableHighAccuracy: true,
                });
                const { latitude, longitude } = coords;
    
                setCurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.04,
                    longitudeDelta: 0.04,
                })
            }
        }

        loadInitialPosition();
    }, []);

    async function loadDevs() {
        const { latitude, longitude } = currentRegion;

        const response = await api.get('/search', {
            params: {
                latitude,
                longitude,
                techs: 'ReactJS'
            }
        });

        setDevs(response.data.devs);
    }

    function handleRegionChanged(region) {
        setCurrentRegion(region);
    }

    if (!currentRegion) {
        return null;
    }

    return (
        <>
            <StatusBar barStyle="dark-content" />
            <MapView 
                onRegionChangeComplete={handleRegionChanged} 
                initialRegion={currentRegion} 
                customMapStyle={mapStyle} 
                style={styles.map}
            >
                {devs.map(dev => (
                    <Marker 
                        key={dev._id}
                        style={styles.marker} 
                        coordinate={{ 
                            latitude: dev.location.coordinates[1], 
                            longitude: dev.location.coordinates[0],
                        }}
                    >
                        <Image 
                            style={styles.avatar} 
                            source={{ 
                                uri: dev.avatar_url 
                            }} 
                        />
                        <Callout onPress={() => {
                            navigation.navigate('Profile', { github_username: dev.github_username })
                            }}>
                            <View style={styles.callout}>
                                <Text style={styles.devName}>{dev.name}</Text>
                                <Text style={styles.devBio}>{dev.bio}</Text>
                                <Text style={styles.devTechs }>{dev.techs.join(', ')}</Text>
                            </View>
                        </Callout>
                    </Marker>
                ))}
            </MapView>
            <View style={styles.searchForm}>
                <TextInput 
                    style={styles.searchInput} 
                    placeholder={'Buscar devs por techs...'}
                    placeholderTextColor={'#999'}
                    autoCapitalize='words' 
                    autoCorrect={false}
                />

                <TouchableOpacity onPress={loadDevs} style={styles.loadButton}>
                    <MaterialIcons name="my-location" size={20} color='#fff' />
                </TouchableOpacity>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    map: {
        width: '100%',
        height: '105%',
    },

    marker: {
        elevation:30,
        shadowOffset: { width: 20, height: 20 },
        shadowOpacity: 0.25,
    },

    avatar: {
        width: 54,
        height: 54,
        borderRadius: 60,
        borderWidth: 2,
        borderColor: '#fff'
    },

    callout: {
        width: 300,
    },

    devName: {
        fontWeight: 'bold',
        fontSize: 16,
    },

    devBio: {
        color: '#666',
        marginTop: 5,
    },

    devTechs: {
        marginTop: 5,
    },

    searchForm: {
        position: 'absolute',
        bottom: 10,
        left: '5%',
        right: '5%',
        flexDirection: 'row',
    },

    searchInput: {
        flex: 1,
        height: 45,
        backgroundColor: '#fff',
        color: '#333',
        borderRadius: 10,
        paddingHorizontal: 20,
        fontSize: 16,
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowOffset: {
            width: 4,
            height: 4,
        },
        elevation: 30,
    },

    loadButton: {
        width: 45,
        height: 45,
        backgroundColor: '#8e3dff',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15,
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowOffset: {
            width: 4,
            height: 4,
        },
        elevation: 30,
    }
})

export default Main;