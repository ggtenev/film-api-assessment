# film-api-assessment


OMDB API consuming app

This is a small pretty ugly looking React Native app that consumes the https://www.omdbapi.com/ API and utilizes local storage.

Local variables are save in the .env file
The app is built with Expo and uses the stadard packages that Expo SDK 44 provides. For local storage was used 'expo-sqlite' and for deep linking - 'expo-linking'.
An attempt to use TypeScript is also there but probably not very successful as I've never used it before in any of my previos commecial projects.

In order to test the Deep Linking functionality you should run the app with expo with the standard 'expo start' command and in the terminal use 'npx uri-scheme open exp://127.0.0.1:19000/--/film?id=tt0266697 --android'
For more information please visit: https://reactnavigation.org/docs/deep-linking/  and https://docs.expo.dev/guides/linking/#universaldeep-links-without-a-custom-scheme

No tests were written.

Redux was used to state management

Enjoy!






