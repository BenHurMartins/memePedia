import {StyleSheet} from 'react-native';

import {Dimensions, Typography, Colors} from '../constants';

export default StyleSheet.create({
  container: {
    width: Dimensions.deviceWidth,
    height: Dimensions.deviceWidth30,
  },
  uploadContentButton: {
    width: Dimensions.deviceWidth20,
    height: Dimensions.deviceWidth20,
    backgroundColor: Colors.white,
    borderRadius: Dimensions.deviceWidth10,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
  textButton: {
    fontSize: Typography.mediumFontSize,
    color: Typography.darkTextColor,
  },
});
