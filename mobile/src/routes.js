import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import Main from "./pages/Main";
import Profile from "./pages/Profile";

const Routes = createAppContainer(
    createStackNavigator({
        Main: {
            screen: Main,
            navigationOptions: {
                title: 'DevRadar'
            }
        },
        Profile: {
            screen: Profile,
            navigationOptions: {
                title: 'Perfil no Github'
            }
        },
    }, {
        defaultNavigationOptions: {
            headerTintColor: '#fff',
            headerTransparent: true,
            headerTitleAlign: 'center',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
            headerTitleContainerStyle: {
                width: '90%',
                alignSelf: 'center',
                alignItems: 'center',
                paddingVertical: 6,
                backgroundColor: "#7d40e7",
                borderRadius: 10,
                elevation:30,
                shadowOffset: { width: 20, height: 20 },
                shadowOpacity: 0.25,
            },
            headerStyle: {
                backgroundColor: '#7d40e7',
            },
            headerBackTitleVisible: false,
            headerLeftContainerStyle: {
                elevation: 31,
                marginLeft: '5%',
            }
        }
    })
);

export default Routes;