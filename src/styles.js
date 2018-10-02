import { StyleSheet } from 'react-native';

import { cardHeigth, cardWidth, screenHeight } from './values';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  noImageCardStyle: {
    flex: 1,
    backgroundColor: 'black',
  },
  cardScrollBackgroundcolor: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  cardContainer: {
    height: cardHeigth,
    width: cardWidth,
  },
  cardDivider: {
    height: StyleSheet.hairlineWidth,
    width: '100%',
    backgroundColor: 'rgb(255, 255, 255)',
  },
  titleText: {
    fontSize: 36,
    color: 'rgb(230, 230, 230)',
  },
  closedCardTitleContainer: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  fullCardRootContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
  },
  fullCardAnimatedContainer: {
    position: 'absolute',
  },
  fullCardTouchableView: {
    flex: 1,
  },
  fullCardContentContainer: {
    flex: 1,
  },
  fullCardTitleContainer: {
    top: 0,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  fullCardImage: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
});

export default styles;
