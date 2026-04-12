import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native';
import { colors } from './src/theme/colors';

// Screens
import LandingScreen from './src/screens/LandingScreen';
import CreateLetterScreen from './src/screens/CreateLetterScreen';
import LetterLockedScreen from './src/screens/LetterLockedScreen';
import LetterOpenedScreen from './src/screens/LetterOpenedScreen';
import DashboardScreen from './src/screens/DashboardScreen';

const Stack = createStackNavigator();

// Screen options for consistent navigation styling
const screenOptions = {
  headerStyle: {
    backgroundColor: colors.background,
  },
  headerTintColor: colors.textPrimary,
  headerTitleStyle: {
    fontWeight: '500',
    fontSize: 18,
  },
  headerShadowVisible: false,
  cardStyle: {
    backgroundColor: colors.background,
  },
};

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={colors.background}
      />
      <Stack.Navigator
        initialRouteName="Landing"
        screenOptions={screenOptions}
      >
        {/* Landing / Home Screen */}
        <Stack.Screen
          name="Landing"
          component={LandingScreen}
          options={{
            title: 'OpenWhen Letters',
            headerShown: false,
          }}
        />

        {/* Create Letter Screen */}
        <Stack.Screen
          name="CreateLetter"
          component={CreateLetterScreen}
          options={{
            title: 'New Letter',
          }}
        />

        {/* Letter Locked Screen */}
        <Stack.Screen
          name="LetterLocked"
          component={LetterLockedScreen}
          options={{
            title: 'Letter Locked',
          }}
        />

        {/* Letter Opened Screen */}
        <Stack.Screen
          name="LetterOpened"
          component={LetterOpenedScreen}
          options={{
            title: 'Your Letter',
            headerShown: false,
          }}
        />

        {/* Dashboard Screen */}
        <Stack.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{
            title: 'Dashboard',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
