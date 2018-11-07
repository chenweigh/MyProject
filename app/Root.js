import { createStackNavigator } from 'react-navigation';
import Home from './Home/Home.js'
import UMengHome from './Home/UMengHome.js';

const Root = createStackNavigator({
    Home: {screen: Home},
    UMengHome:{screen:UMengHome},
});

export default Root;