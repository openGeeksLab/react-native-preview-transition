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
    animation: new Animated.Value(0),
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
      <TouchableOpacity>
        <View
          style={[
            styles.cardContainer,
            {
              height: cardHeigth,
              width: cardWidth,
            },
          ]}
          key={`card-view-${itemIndex}`}
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

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          orientation='vertical'
        >
          {this.renderCards()}
        </ScrollView>
      </View>
    );
  }
}
