import {StyleSheet} from 'react-native';
import {Dimensions, Colors, Typography} from '../../constants';

export default StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
    backgroundColor: Colors.background,
  },
  avatar: {
    width: Dimensions.deviceWidth30,
    height: Dimensions.deviceWidth30,
    borderRadius: Dimensions.deviceWidth15,
  },
  userInfoView: {
    width: Dimensions.deviceWidth,
    height: Dimensions.deviceWidth40,
    flexDirection: 'row',
    alignItems: 'center',
  },
  userNameText: {
    width: Dimensions.deviceWidth60,
    color: Colors.textColor,
    fontSize: Typography.bigFontSize,
    marginLeft: 10,
  },
  divider: {
    width: Dimensions.deviceWidth,
    borderColor: Colors.white,
  },
  text: {
    fontSize: Typography.mediumFontSize,
    color: Colors.textColor,
    margin: 15,
  },
});
