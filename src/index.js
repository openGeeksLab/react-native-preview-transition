import React, { Component } from 'react';
import {
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Platform,
  Animated,
  Image,
  Text,
  View,
} from 'react-native';

import styles from './styles';

import { cardHeigth, cardWidth } from './values';

export default class App extends Component {
  static defaultProps = {
    data: [],
  }

  constructor() {
    super();
    this.state = {
      currentIndex: null,
      animationValue: new Animated.Value(0),
    };
    this.cardRef = [];
  }

  configureOpenStyle = () => {
    const { animationValue, currentViewInfo } = this.state;
    /*
      currentViewInfo: {
        fx, fy, width, height, px, py,
      }
    */
    return {
      height: animationValue.interpoalte({
        inputRange: [0, 1],
        outputRange: []
      }),
      width: '',

    }
    /*
      0.0

      300 - height of card

      height
    */

  }

  closeCard = () => {
    const { currentIndex } = this.state;
    if (currentIndex !== null) {
      this.setState({ currentIndex: null });
    }
  }

  openCard = (index) => {
    const { data } = this.props;
    const cardReference = this.cardRef[`card-ref-${index}`];
    if (cardReference && cardReference.measure && index !== undefined) {
      const currentCardData = data[index];
      if (currentCardData) {
        cardReference.measure((fx, fy, width, height, px, py) => {
          this.setState({
            currentIndex: index,
            currentViewInfo: {
              fx, fy, width, height, px, py,
            },
          });
        });
      }
    }
  }

  onOpenCard = (screenIndex) => {
    this.openCard(screenIndex);
  }

  // animationStart = () => {
  //
  // }

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
        style={{ flex: 1, backgroundColor: 'red' }}
      />
    );
  }

  renderCards = () => {
    const { data } = this.props;
    return data.map((item, index) => this.renderCardView(item, index));
  }

  renderCardView = (itemData, itemIndex) => {
    return (
      <TouchableOpacity onPress={() => this.onOpenCard(itemIndex)}>
        <View
          style={[
            styles.cardContainer,
            {
              height: cardHeigth,
              width: cardWidth,
            },
          ]}
          key={`card-view-${itemIndex}`}
          ref={(viewRef) => {
            this.cardRef[`card-ref-${itemIndex}`] = viewRef;
          }}
        >
          {this.renderImage(itemData.img)}
          {this.renderCardTitle(itemData, itemIndex)}
        </View>
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
            color: 'white',
          }}
        >
          {itemData.title}
        </Text>
      </View>
    );
  }

  renderFullCard = () => {
    const { data } = this.props;
    const { currentIndex, currentViewInfo } = this.state;
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
              backgroundColor: 'black',
            }}
          >
            <TouchableOpacity onPress={this.closeCard}>
              <View>
                <Image
                  // resizeMode={'contain'}
                  source={currentCardData.img}
                  style={{
                    position: 'absolute',
                    top: py,
                    left: px,
                    width: width,
                    height: height,
                  }}
                />
              </View>
            </TouchableOpacity>
            {/* <View>
            </View> */}
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
          {this.renderFullCard(currentIndex)}
        </ScrollView>
      </View>
    );
  }
}
