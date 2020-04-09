import {Dimensions} from 'react-native';

export const deviceWidth = Dimensions.get('window').width;
export const deviceHeight = Dimensions.get('window').height;

export const deviceWidth5 = Dimensions.get('window').width / 20;
export const deviceWidth7 = (Dimensions.get('window').width / 100) * 7;
export const deviceWidth10 = Dimensions.get('window').width / 10;
export const deviceWidth15 = (Dimensions.get('window').width / 100) * 15;
export const deviceWidth20 = Dimensions.get('window').width / 5;
export const deviceWidth30 = (Dimensions.get('window').width / 10) * 3;
export const deviceWidth40 = (Dimensions.get('window').width / 10) * 4;
export const deviceWidth50 = Dimensions.get('window').width / 2;
export const deviceWidth60 = deviceWidth30 * 2;
export const deviceWidth70 = deviceWidth30 + deviceWidth40;
export const deviceWidth80 = deviceWidth40 * 2;
export const deviceWidth90 = deviceWidth40 + deviceWidth50;
