import React, { Component } from 'react';
import {
  TouchableOpacity,
  ScrollView,
  Animated,
  Easing,
  Image,
  Text,
  View,
} from 'react-native';

import styles from './styles';

import {
  cardWidth,
  inputRange,
  cardHeigth,
  screenHeight,
  fullCardHeightInterpolation,
} from './values';

class App extends Component {
  static defaultProps = {
    data: [],
    titleTextStyle: {},
    renderBottomBar: () => {},


    cardHeaderHeight: 70,
    animationDuration: 500,
    backgroundColor: '#333',
    cardDividerColor: 'rgb(255, 255, 255)',
  }

  constructor() {
    super();
    this.state = {
      currentIndex: null,
      currentViewInfo: {},
      animationValue: new Animated.Value(0),
    };
    this.cardRef = [];
    this.animationGoing = false;
  }

  startOpenAnimation = () => {
    const { animationValue } = this.state;
    const { animationDuration } = this.props;
    if (!this.animationGoing) {
      this.animationGoing = true;
      Animated.timing(
        animationValue,
        {
          toValue: 1,
          duration: animationDuration,
        },
      ).start(() => {
        this.animationGoing = false;
        this.forceUpdate();
      });
    }
  }

  startCloseAnimation = (callback) => {
    const { animationValue } = this.state;
    const { animationDuration } = this.props;
    if (!this.animationGoing) {
      this.animationGoing = true;
      Animated.timing(
        animationValue,
        {
          toValue: 0,
          easing: Easing.ease,
          duration: animationDuration,
        },
      ).start(() => {
        this.animationGoing = false;
        if (callback) callback();
      });
    }
  }

  closeCard = () => {
    const { currentIndex } = this.state;
    if (currentIndex !== null) {
      this.startCloseAnimation(() => this.setState({
        currentIndex: null,
        currentViewInfo: {},
      }));
    }
  }

  openCard = (index) => {
    const { data } = this.props;
    const cardReference = this.cardRef[`card-ref-${index}`];
    if (cardReference && cardReference.measure && index !== undefined) {
      const currentCardData = data[index];
      if (currentCardData) {
        cardReference.measure((fx, fy, width, height, px, py) => {
          this.setState(
            {
              currentIndex: index,
              currentViewInfo: {
                width,
                height,
                px,
                py,
              },
            },
            this.startOpenAnimation,
          );
        });
      }
    }
  }

  onOpenCard = (screenIndex) => {
    this.openCard(screenIndex);
  }

  renderImage = (source) => {
    if (source) {
      return (
        <Image
          source={source}
          resezeMode={'center'}
          style={styles.cardContainer}
        />
      );
    }
    return (<View style={styles.noImageCardStyle} />);
  }

  renderCards = () => {
    const { data } = this.props;
    return data.map((item, index) => this.renderCardView(item, index));
  }

  renderCardView = (itemData, itemIndex) => {
    const { cardDividerColor } = this.props;
    return (
      <TouchableOpacity
        activeOpacity={1}
        key={`card-view-${itemIndex}`}
        onPress={() => this.onOpenCard(itemIndex)}
      >
        <View
          style={styles.cardContainer}
          ref={(viewRef) => { this.cardRef[`card-ref-${itemIndex}`] = viewRef; }}
        >
          {this.renderImage(itemData.img)}
          {this.renderCardTitle(itemData, itemIndex)}
        </View>
        <View style={[
          styles.cardDivider, { backgroundColor: cardDividerColor }]} />
      </TouchableOpacity>
    );
  }

  renderCardTitle = (itemData, itemIndex) => {
    const { titleTextStyle } = this.props;
    return (
      <View style={styles.closedCardTitleContainer}>
        <Text style={[styles.titleText, titleTextStyle]}>
          {itemData.title}
        </Text>
      </View>
    );
  }

  renderBottomBar = (cardData, animationValue) => {
    const { renderBottomBar } = this.props;
    return renderBottomBar(cardData, animationValue);
  }

  renderHeaderBar = (cardData, viewMeasureInfo) => {
    const { animationValue } = this.state;
    const { height, width } = viewMeasureInfo;
    const { cardHeaderHeight, titleTextStyle } = this.props;
    return (
      <Animated.View
        style={[
          styles.fullCardTitleContainer,
          {
            width,
            height: animationValue.interpolate({ inputRange, outputRange: [height, cardHeaderHeight] }),
          },
        ]}
      >
        <Text style={[styles.titleText, titleTextStyle]}>
          {cardData.title}
        </Text>
      </Animated.View>
    );
  }

  renderFullCard = () => {
    const { data } = this.props;
    const {
      currentIndex,
      animationValue,
      currentViewInfo,
    } = this.state;

    if (currentIndex !== undefined) {
      const currentCardData = data[currentIndex];
      if (currentCardData) {
        const {
          width,
          height,
          px,
          py,
        } = currentViewInfo;

        return (
          <View style={styles.fullCardRootContainer}>
            <Animated.View
              style={[
                styles.fullCardAnimatedContainer,
                {
                  width,
                  left: px,
                  height: animationValue.interpolate(fullCardHeightInterpolation),
                  top: animationValue.interpolate({ inputRange, outputRange: [py, 0] }),
                },
              ]}
            >
              <TouchableOpacity
                activeOpacity={1}
                onPress={this.closeCard}
                style={styles.fullCardTouchableView}
              >
                <View style={styles.fullCardContentContainer}>
                  <Animated.Image
                    source={currentCardData.img}
                    style={[
                      styles.fullCardImage,
                      {
                        width,
                        height: animationValue.interpolate({ inputRange, outputRange: [height, screenHeight] }),
                      },
                    ]}
                  />
                  {this.renderHeaderBar(currentCardData, currentViewInfo)}
                  {this.renderBottomBar(currentCardData, animationValue)}
                </View>
              </TouchableOpacity>
            </Animated.View>
          </View>
        );
      }
    }
    return null;
  }

  render() {
    const { currentIndex } = this.state;
    const { backgroundColor } = this.props;
    return (
      <View style={[styles.container, { backgroundColor }]}>
        <ScrollView
          orientation='vertical'
          style={styles.cardScrollBackgroundcolor}
        >
          {this.renderCards()}
        </ScrollView>
        {this.renderFullCard(currentIndex)}
      </View>
    );
  }
}

export default App;
export const values = { cardWidth, inputRange, cardHeigth };
