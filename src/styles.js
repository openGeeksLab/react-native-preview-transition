import { StyleSheet } from 'react-native';

import { cardHeigth, cardWidth, screenHeight } from './values';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  cardContainer: {
    height: cardHeigth,
    width: cardWidth,
  },
  cardDivider: {
    height: StyleSheet.hairlineWidth,
    width: '100%',
    backgroundColor: 'white',
  },
  titleText: {
    fontSize: 36,
    color: 'rgb(230, 230, 230)',
    fontFamily: 'Playfair Display',
  },
});

export default styles;
