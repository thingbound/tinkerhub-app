import { AppRegistry } from 'react-native';
import App from './shared/app';

// Make sure that the icons are included
import icons from 'react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf';
const reactNativeVectorIconsRequiredStyles = '@font-face { src:url(' + icons + ');font-family: "Material Design Icons"; }'
const style = document.createElement('style');
style.type = 'text/css';
if (style.styleSheet){
    style.styleSheet.cssText = reactNativeVectorIconsRequiredStyles;
} else {
    style.appendChild(document.createTextNode(reactNativeVectorIconsRequiredStyles));
}
document.head.appendChild(style);

AppRegistry.registerComponent('Tinkerhub', () => App);

AppRegistry.runApplication('Tinkerhub', {
    rootTag: document.getElementById('react-root')
});
