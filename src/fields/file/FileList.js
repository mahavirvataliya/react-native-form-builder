import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Dimensions, Image, Share, FlatList, Platform } from 'react-native';
import {
  View,
  Text,
  Container,
  Header,
  Content,
  ListItem,
  List,
  CheckBox,
  Left,
  Right,
  Icon,
  Body,
  Title,
  Thumbnail,
  Button,
  CardItem
} from 'native-base';
import ViewerService from '@infobizzs/rn-form-builder/src/services/Viewer';
import ShareService from '@infobizzs/rn-form-builder/src/services/ShareService';


export default class FileList extends Component {
  static propTypes = {
    attributes: PropTypes.object,
    updateValue: PropTypes.func,
    theme: PropTypes.object,
    ErrorComponent: PropTypes.func,
  }
  constructor(props) {
    super(props);
    this.state = {
      basic: true,
      images: [],
    };
  }

  onViewPress = (image) => {

    if (image.isLocal) {
      ViewerService.viewLocalFile(image);
      return;
    }
    ViewerService.viewFile(image);
  }


  onSharePress = async (image) => {

    if (image.isLocal) {
      ShareService.shareLocalFile(image);
    }
    ShareService.shareFile(image);
  }

   deleteRow(file) {

    if(this.props.onDeleteFile) {
      this.props.onDeleteFile(file);
    }
  }

  render() {
    const { files, theme } = this.props;

    return (
      <FlatList
        data={files}
        scrollEnabled={false}
        keyExtractor={(item, index) => String(item) + index.toString()}
        renderItem={({ item }) => <ListItem thumbnail onPress={() => this.onViewPress(item)} >
          <CardItem style={{ paddingTop: 0, paddingBottom: 0, paddingRight: 0, paddingLeft: 0 }}>
            <Left>
                {
                  item.thumbURL || item.isImage
                  ? (<Thumbnail square source={{ uri: item.thumbURL || item.path  }} resizeMode="contain" />)
                  : (<Icon name="document" />)
                }
                
                <Body>
                  <Text style={{ color: theme.inputColor }}>{item.name}</Text>
                </Body>
            </Left>
            <Right>
              <Button icon transparent danger style={{ paddingRight: 20 }} onPress={() => this.deleteRow(item)}>
                <Icon name="trash" />
              </Button>
            </Right>
          </CardItem>
        </ListItem>
              }
          />
    );
  }
}