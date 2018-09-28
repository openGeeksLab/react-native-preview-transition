import React, { Component } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Animated,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import PreviewTransition, { values } from 'react-native-preview-transition';
import data from './mockData';


export default class App extends Component {
  state = {
    data,
  }

  onPressLikeButton = (index) => {
    const myData = [...this.state.data];
    myData[index].liked = !myData[index].liked;

    this.setState({ data: myData });
  }

  renderBottomBar = (cardData, index, animationValue) => {
    return (
      <Animated.View
        style={[
          styles.bottomBarAnimatedContainer,
          {
            height: animationValue.interpolate({ inputRange: values.inputRange, outputRange: [0, 80] }),
            opacity: animationValue.interpolate({ inputRange: values.inputRange, outputRange: [0, 1] }),
          }
        ]}
      >
        <View style={styles.bottomLeftSide}>
            <View style={[
              styles.buttonContainer,
              styles.leftButton,
            ]}>
              <TouchableOpacity>
                <View style={styles.buttonContainer}>
                  <Icon
                    size={30}
                    color={'white'}
                    name={'comment'}
                  />
                </View>
              </TouchableOpacity>
            </View>
        </View>
        <View style={styles.bottomRightSide}>
          <TouchableOpacity
            style={styles.rightButton}
            onPress={() => this.onPressLikeButton(index)}
          >
            <View style={styles.buttonContainer}>
              <Icon
                size={30}
                name={'heart'}
                color={cardData.liked ? 'rgba(230, 60, 30, 1)' : 'white'}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.rightButton}>
            <View style={styles.buttonContainer}>
              <Icon
                size={30}
                color={'white'}
                name={'arrow-down'}
              />
            </View>
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <PreviewTransition
          data={this.state.data}

          renderBottomBar={this.renderBottomBar}

          cardHeaderHeight={70}
          animationDuration={500}
          backgroundColor={'#333'}
          cardDividerColor={'rgb(255, 255, 255)'}
          titleTextStyle={styles.cardTitleCustomStyle}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  cardTitleCustomStyle: {
    fontFamily: 'Playfair Display',
  },
  buttonContainer: {
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  rightButton: {
    marginRight: 10,
  },
  leftButton: {
    marginLeft: 10,
  },
  bottomBarAnimatedContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: '100%',
    bottom: 0,
    flexDirection: 'row',
  },
  bottomLeftSide: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  bottomRightSide: {
    flexDirection: 'row'
  },
});
