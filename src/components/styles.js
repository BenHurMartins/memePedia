import {StyleSheet} from 'react-native';

import {Dimensions, Typography, Colors} from '../constants';

export default StyleSheet.create({
  container: {
    width: Dimensions.deviceWidth,
    height: Dimensions.deviceWidth30,
  },
  uploadContentButton: {
    width: Dimensions.deviceWidth15,
    height: Dimensions.deviceWidth15,
    backgroundColor: Colors.white,
    borderRadius: Dimensions.deviceWidth10,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
  textButton: {
    fontSize: Typography.smallFontSize,
    color: Typography.darkTextColor,
  },
  floatingButton: {
    width: Dimensions.deviceWidth15,
    height: Dimensions.deviceWidth15,
    backgroundColor: Colors.white,
    borderRadius: Dimensions.deviceWidth10,
    borderWidth: 1,
    borderColor: Colors.black,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 2,
    right: 10,
    bottom: 10,
  },
});
