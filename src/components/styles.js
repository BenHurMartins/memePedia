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
  reactionBar: {
    flexDirection: 'row',
    width: Dimensions.deviceWidth,
    height: Dimensions.deviceWidth15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reaction: {
    flexDirection: 'row',
    width: Dimensions.deviceWidth30,
    height: Dimensions.deviceWidth10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reactionText: {
    color: Typography.lightTextColor,
    fontSize: Typography.smallFontSize,
    marginLeft: 20,
  },
  item: {
    width: Dimensions.deviceWidth,
    justifyContent: 'center',
    alignItems: 'center',
    // height: Dimensions.deviceWidth90,
  },
  image: {
    width: Dimensions.deviceWidth80,
    // height: Dimensions.deviceWidth80,
    // minWidth: Dimensions.deviceWidth80,
    // minHeight: Dimensions.deviceWidth80,

    // width: undefined,
    // height: undefined,
    borderWidth: 10,
    // borderColor: 'white',
  },
});
