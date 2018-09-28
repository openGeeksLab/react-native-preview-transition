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
    this.animationGoing = false;
    this.cardRef = [];
  }

  startOpenAnimation = () => {
    const { animationValue } = this.state;
    if (!this.animationGoing) {
      this.animationGoing = true;
      Animated.timing(
        animationValue,
        {
          toValue: 1,
          duration: 500, // friction: 10, velocity: 3,
        },
      ).start(() => {
        this.forceUpdate();
        this.animationGoing = false;
      });
    }
  }

  startCloseAnimation = (callback) => {
    const { animationValue } = this.state;

    Animated.timing(
      animationValue,
      {
        toValue: 0,
        duration: 500, // friction: 10, velocity: 3,
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
          style={styles.cardContainer}
          ref={(viewRef) => { this.cardRef[`card-ref-${itemIndex}`] = viewRef; }}
        >
          {this.renderImage(itemData.img)}
          {this.renderCardTitle(itemData, itemIndex)}
        </View>
        <View style={styles.cardDivider} />
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
        <Text style={styles.titleText}>
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
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: '100%',
              width: '100%',
            }}
          >
            <Animated.View
              style={{
                position: 'absolute',
                left: px,
                width: width,
                height: animationValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [height, screenHeight],
                }),
                top: animationValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [py, 0],
                }),
              }}
            >
              <TouchableOpacity
                activeOpacity={1}
                style={{ flex: 1 }}
                onPress={this.closeCard}
              >
                <View style={{ flex: 1 }}>
                  <Animated.Image
                    source={currentCardData.img}
                    style={{
                      position: 'absolute',
                      left: 0,
                      width: width,
                      height: animationValue.interpolate({
                        inputRange: [0, 1],
                        outputRange: [height, screenHeight],
                      }),
                      top: 0,
                    }}
                  />
                  <Animated.View
                    style={{
                      position: 'absolute',
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                      height: animationValue.interpolate({
                        inputRange: [0, 1],
                        outputRange: [height, 70],
                      }),
                      width: width,
                      top: 0,
                    }}
                  >
                    <Text style={styles.titleText}>
                      {currentCardData.title}
                    </Text>
                  </Animated.View>
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
