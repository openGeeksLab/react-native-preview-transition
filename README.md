<p align="left">
  <a href="https://www.opengeekslab.com">
    <img
      src="https://raw.githubusercontent.com/openGeeksLab/docs/master/header_github_Preview-transition.png"
      width="100%"
      title="openGeeksLab"
    />
  </a>
</p>
<a rel="nofollow" href="http://developer.apple.com">
  <img
    alt="iOS"
    src="https://img.shields.io/badge/platform-iOS-brightgreen.svg" style="max-width:100%;"
  />
</a>
<a rel="nofollow" href="https://www.android.com">
  <img
    src="https://img.shields.io/badge/platform-Android-brightgreen.svg"
    alt="Android"
    data-canonical-src="https://img.shields.io/badge/platform-Android-brightgreen.svg"
    style="max-width:100%;"
  />
</a>
<a href="https://github.com/openGeeksLab/react-native-expanding-collection-view">
  <img
    src="https://img.shields.io/badge/npm-compatible-green.svg"
    alt="npm compatible"
    data-canonical-src="https://img.shields.io/badge/npm-compatible-green.svg" style="max-width:100%;"
  />
</a>
<a href="http://twitter.com/openGeeksLab" rel="nofollow">
  <img
    src="https://img.shields.io/badge/Twitter-@openGeeksLab-blue.svg"
    alt="Twitter"
    data-canonical-src="https://img.shields.io/badge/Twitter-@openGeeksLab-blue.svg?style=flat"
    style="max-width:100%;"
  />
</a>
<a href="http://facebook.com/openGeeksLab/">
  <img
    src="https://img.shields.io/badge/facebook-us-blue.svg"
    alt="Facebook"
    data-canonical-src="https://img.shields.io/badge/facebook-us-blue.svg"
    style="max-width:100%;"
  />
</a>
<a href="https://medium.com/@openGeeksLab">
  <img
    src="https://img.shields.io/badge/Medium-story-brightgreen.svg"
    alt="Medium"
    data-canonical-src="https://img.shields.io/badge/Medium-story-brightgreen.svg"
    style="max-width:100%;"
  />
</a>

<img
  src="https://github.com/openGeeksLab/docs/blob/master/preview-transition.gif" data-canonical-src="https://github.com/openGeeksLab/docs/blob/master/preview-transition.gif"
  width="50%"
  height="50%"
  style="max-width:100%;"
/>

# react-native-preview-transition

# About
Our company provides custom UI design and development solutions for mobile applications and websites.

Need a team to create a project?

This project is developed and maintained by <a href="https://www.openGeeksLab.com">openGeeksLab LLC.</a>

<a href="mailto:info@opengeekslab.com?subject=Project%20inquiry%20from%20Github">
  <img src="https://raw.githubusercontent.com/openGeeksLab/docs/master/contact_our_team.png" width="25%" height="25%" style="max-width:100%;">
</a>


## Requirements
- React Native 0.50+
- iOS 9.0+
- Android 4.2+

## Installation
Just run:
- npm i --save react-native-preview-transition

## Basic usage
The Library needs to pass a data property that contains an array of objects with the img and title fields.
img - is the picture which needs to display.
title - is the name displayed in the header.
For more detailed library work settings, you can transfer next properties: renderBottomBar, cardHeaderHeight, animationDuration, backgroundColor, cardDividerColor, titleTextStyle.

```renderBottomBar``` - is the function that returns a component that will be displayed at the bottom of the window  
```cardHeaderHeight``` - is the height of the opened card's header  
```animationDuration``` - is the speed of the animation, opening, and closing of the card  
```backgroundColor``` - is the color of the background of the list of cards  
```cardDividerColor``` - is the color of the divider between the cards  
```titleTextStyle``` - is the style of the header text  
```titleContainerColor``` - is the color of the container that contains the name  

The full project using the library is located <a href="https://github.com/openGeeksLab/react-native-preview-transition/tree/develop/example">here</a>.

```javascript
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import PreviewTransition from 'react-native-preview-transition';

import IMAGE_BERTHE from './res/img/berthe_morisot.jpg';
import IMAGE_CLAUDE from './res/img/ClaudeMonet.jpg';
import IMAGE_EDGAR from './res/img/EdgarDegas.jpg';
import IMAGE_EDOUARD from './res/img/ÉdouardManet.jpg';
import IMAGE_PAUL from './res/img/PaulCézanne.jpg';

const data = [
  {
    title: 'Berthe Morisot',
    liked: false,
    img: IMAGE_BERTHE,
  },
  {
    title: 'Claude Monet',
    img: IMAGE_CLAUDE,
  },
  {
    title: 'Edgar Degas',
    liked: false,
    img: IMAGE_EDGAR,
  },
  {
    title: 'Édouard Manet',
    liked: false,
    img: IMAGE_EDOUARD,
  },
  {
    title: 'Paul Cézanne',
    liked: false,
    img: IMAGE_PAUL,
  },
];

export default class App extends Component {
  state = {
    data,
  }

  render() {
    return (
      <View style={styles.container}>
        <PreviewTransition
          data={this.state.data}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
```


# Contact us if interested
<a href="https://opengeekslab.com/contact-us/">
<img src="https://raw.githubusercontent.com/openGeeksLab/docs/master/contact_our_team.png" width="25%" height="25%" style="max-width:100%;"></a>

# Licence
Expanding is released under the MIT license.
