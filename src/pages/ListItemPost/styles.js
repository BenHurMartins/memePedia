import {StyleSheet} from 'react-native';
import {Dimensions} from '../../constants/';

export default StyleSheet.create({
  item: {
    width: Dimensions.deviceWidth,
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.deviceWidth90,
  },
  image: {
    width: Dimensions.deviceWidth80,
    height: Dimensions.deviceWidth80,
    borderWidth: 10,
    borderColor: 'white',
  },
});