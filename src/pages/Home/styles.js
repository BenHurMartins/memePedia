import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  floatingButton: {
    width: 50,
    height: 50,
    backgroundColor: 'red',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 2,
    right: 10,
    bottom: 10,
  },
  floatingButtonText: {
    color: 'white',
    fontSize: 25,
  },
});
