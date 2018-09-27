import React, { Component } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Animated,
  Easing,
  Image,
  Text,
  View,
} from 'react-native';

import styles from './styles';

import { cardHeigth, cardWidth, screenHeight } from './values';

export default class App extends Component {
  static defaultProps = {
    data: [],
  }

  constructor() {
    super();
    this.state = {
      currentIndex: null,
      currentViewInfo: {},
      animationValue: new Animated.Value(0),
    };
    this.cardRef = [];
  }

  startOpenAnimation = () => {
    const { animationValue } = this.state;

    Animated.timing(
      animationValue,
      {
        toValue: 1,
        duration: 500, //  friction: 10, velocity: 3,
      },
    ).start();
  }

  startCloseAnimation = (callback) => {
    const { animationValue } = this.state;
    Animated.timing(
      animationValue,
      {
        toValue: 0,
        duration: 500,
        easing: Easing.ease,
      },
    ).start(() => {
      if (callback) callback();
    });
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
                fx,
                fy,
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
          resezeMode={'center'}
          source={source}
          style={{
            height: cardHeigth,
            width: cardWidth,
          }}
        />
      );
    }
    return (
      <View
        style={{ flex: 1, backgroundColor: 'black' }}
      />
    );
  }

  renderCards = () => {
    const { data } = this.props;
    return data.map((item, index) => this.renderCardView(item, index));
  }

  renderCardView = (itemData, itemIndex) => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        key={`card-view-${itemIndex}`}
        onPress={() => this.onOpenCard(itemIndex)}
      >
        <View
          style={[
            styles.cardContainer,
            {
              height: cardHeigth,
              width: cardWidth,
            },
          ]}
          ref={(viewRef) => {
            this.cardRef[`card-ref-${itemIndex}`] = viewRef;
          }}
        >
          {this.renderImage(itemData.img)}
          {this.renderCardTitle(itemData, itemIndex)}
        </View>
        <View
          style={{
            height: StyleSheet.hairlineWidth,
            width: '100%',
            backgroundColor: 'white',
          }}
        />
      </TouchableOpacity>
    );
  }

  renderCardTitle = (itemData, itemIndex) => {
    return (
      <View
        style={{
          position: 'absolute',
          height: '100%',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}
      >
        <Text
          style={{
             color: 'white', fontSize: 36, fontFamily: 'Playfair Display',
          }}
        >
          {itemData.title}
        </Text>
      </View>
    );
  }

  renderFullCard = () => {
    const { data } = this.props;
    const { animationValue, currentIndex, currentViewInfo } = this.state;
    if (currentIndex !== undefined) {
      const currentCardData = data[currentIndex];
      if (currentCardData) {
        const { fx, fy, width, height, px, py } = currentViewInfo;

        return (
          // Контейнер раскрытой карточки.
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: '100%',
              width: '100%',
              // backgroundColor: 'black',
            }}
          >
            <TouchableOpacity
              activeOpacity={1}
              onPress={this.closeCard}
            >
              <View style={{ flex: 1 }}>
                <Animated.Image
                  // resizeMode={'contain'}
                  source={currentCardData.img}
                  style={[
                    {
                      position: 'absolute',
                      left: px,
                      width: width,
                      // top: py,
                      // height: height,
                      height: animationValue.interpolate({
                        inputRange: [0, 1],
                        outputRange: [height, screenHeight],
                      }),
                      // height: 200,
                      top: animationValue.interpolate({
                        inputRange: [0, 1],
                        outputRange: [py, 0],
                      }),
                    },
                    // this.state.cardStyle,
                  ]}
                />
                <Animated.View
                  style={{
                    position: 'absolute',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    height: animationValue.interpolate({
                      inputRange: [0, 1],
                      outputRange: [height, 70],
                    }),
                    width: width,
                    top: animationValue.interpolate({
                      inputRange: [0, 1],
                      outputRange: [py, 0],
                    }),
                  }}
                >
                  <Text
                    style={{
                      color: 'white', fontSize: 36, fontFamily: 'Playfair Display',
                    }}
                  >
                    {currentCardData.title}
                  </Text>
                </Animated.View>
              </View>
            </TouchableOpacity>
          </View>
        );
      }
    }
    return null;
  }

  render() {
    const { currentIndex } = this.state;

    return (
      <View style={styles.container}>
        <ScrollView
          orientation='vertical'
        >
          {this.renderCards()}
        </ScrollView>
        {this.renderFullCard(currentIndex)}
      </View>
    );
  }
}
