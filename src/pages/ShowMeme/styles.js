import {StyleSheet} from 'react-native';
import {Dimensions, Typography, Colors} from '../../constants/';

export default StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: Colors.background,
  },
  containerScrollView: {
    width: Dimensions.deviceWidth,
    alignItems: 'center',
  },
  image: {
    width: Dimensions.deviceWidth80,
    height: Dimensions.deviceWidth80,
    borderWidth: 10,
    borderColor: 'white',
  },
  likesBar: {
    flexDirection: 'row',
    width: Dimensions.deviceWidth,
    height: Dimensions.deviceWidth10,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  commentView: {
    backgroundColor: Colors.background,
    width: Dimensions.deviceWidth,
    paddingVertical: 15,
    paddingHorizontal: 25,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  commentText: {
    color: Typography.lightTextColor,
    fontSize: Typography.smallFontSize,
  },
  userNameText: {
    color: Typography.lightTextColor,
    fontSize: Typography.smallFontSize,
    fontWeight: 'bold',
  },
  divider: {
    backgroundColor: Colors.white,
    width: Dimensions.deviceWidth40,
    marginLeft: Dimensions.deviceWidth10,
  },
  inputContainer: {
    width: Dimensions.deviceWidth80,
    borderBottomWidth: 0,
    borderBottomColor: Colors.black,
  },
  textInput: {
    color: Typography.darkTextColor,
    fontSize: Typography.smallFontSize,
  },
  labelInput: {
    color: Colors.black,
  },
  viewInputContainer: {
    width: Dimensions.deviceWidth,
    height: 80,
    padding: 10,
    borderRadius: 38,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  floatingButton: {
    width: 78,
    height: 78,
    backgroundColor: Colors.white,
    borderRadius: Dimensions.deviceWidth10,
    borderWidth: 1,
    borderColor: Colors.black,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 2,
    right: 1,
    bottom: 1,
  },
  avatarStyle: {
    borderWidth: 1,
    borderColor: Colors.white,
  },
});
