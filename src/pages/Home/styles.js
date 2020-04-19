import {StyleSheet} from 'react-native';
import {Colors, Dimensions, Typography} from '../../constants';

export default StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: Colors.background,
  },
  divider: {
    width: Dimensions.deviceWidth,
    borderColor: Colors.white,
  },
});
