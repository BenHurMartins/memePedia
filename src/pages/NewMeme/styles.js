import {StyleSheet} from 'react-native';
import {Dimensions, Colors, Typography} from '../../constants';

export default StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
    backgroundColor: Colors.background,
    paddingVertical: 40,
  },
  containerScrollView: {
    alignItems: 'center',
    width: Dimensions.deviceWidth,
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
    width: Dimensions.deviceWidth90,
    height: 80,
    padding: 10,
    borderRadius: 38,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
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
  uploadContentImageView: {
    width: Dimensions.deviceWidth30,
    height: Dimensions.deviceWidth30,
    borderRadius: Dimensions.deviceWidth30 / 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textButton: {
    fontSize: Typography.mediumFontSize,
    color: Typography.darkTextColor,
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.blackTranslucid,
  },
  textProgress: {
    fontSize: Typography.smallFontSize,
    color: Typography.lightTextColor,
  },
});
