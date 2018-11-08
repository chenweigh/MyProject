import { createStackNavigator } from 'react-navigation';
import Home from './Home/Home.js'
import UMengHome from './Home/UMengHome.js';
import RongCloudHome from './Home/RongCloudHome.js';
const Root = createStackNavigator({
    Home: {screen: Home},
    UMengHome:{screen:UMengHome},
    RongCloudHome:{screen:RongCloudHome},
});

export default Root;