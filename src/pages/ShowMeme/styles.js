import {StyleSheet} from 'react-native';
import {Dimensions} from '../../constants/';

export default StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  image: {
    width: Dimensions.deviceWidth80,
    height: Dimensions.deviceWidth80,
    borderWidth: 10,
    borderColor: 'white',
  },
});
