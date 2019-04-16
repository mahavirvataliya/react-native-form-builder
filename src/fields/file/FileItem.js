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
  SwipeRow,
  Button,
  CardItem
} from 'native-base';
import ViewerService from '@infobizzs/rn-form-builder/src/services/Viewer';
import FilePickerService from '@infobizzs/rn-form-builder/src/services/FilePicker';
import ShareService from '@infobizzs/rn-form-builder/src/services/ShareService';
import FileList from '@infobizzs/rn-form-builder/src/fields/file/FileList';


const isIOS = Platform.OS === 'ios';
const deviceWidth = Dimensions.get('window').width;

export default class FileItem extends Component {
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

  onAttachPress = async () => {
    const { imageOnly, multiple, mediaType } = this.props;
    const imagesX = await FilePickerService.pickFile(imageOnly, multiple, mediaType);
    imagesX.forEach(image => {
      image.isLocal = true;
    });
    this.setState({
      images: imagesX,
    })

    if(this.state.images.length) {
      this.props.updateValue(this.props.attributes.name, this.state.images[0]);
    }
   }

   deleteRow = (image) => {
    let data = this.state.images;
    data = data.filter((item) => item.path !== image.path)
    this.setState({ images: [] })
    this.props.updateValue(this.props.attributes.name, []);
    console.log(data);

    this.props.updateValue(this.props.attributes.name);

  }

  renderDefaultImageList = () => {
    const { theme, attributes, ErrorComponent } = this.props;
    const images = [];

    if(this.state.images.length) return null;

    if (attributes && attributes.value) {
      const { value } = attributes;
      if(value && value.thumb_url) {
        const image = {
          thumbURL: value.thumb_url,
          name: value.name,
          fileURL: value.file_url
        }
        images.push(image);
      }
    }
    
    return (
       <FileList files={images} theme={theme} onDeleteFile={(file) => this.deleteRow(file)} />
    );
  }

  renderLocalImageList = () => {
    const { theme } = this.props;
    return (
      <FileList files={this.state.images} theme={theme} onDeleteFile={(file) => this.deleteRow(file)}/>
    );
  }

  render() {
    const { theme, attributes, ErrorComponent } = this.props;
    const selectedText = this.state.images.length || attributes.value ? 'Change' : 'Attach';
    return (
      <View style={{ marginLeft: 2 }}>
        <ListItem icon onPress={() => this.onAttachPress()}>
          <Body>
            <Text style={{ color: theme.inputColor, paddingLeft: isIOS ? 0 : 3  }}>{attributes.label}</Text>
          </Body>
          <Right>
            <View style={{ width: deviceWidth / 2, alignItems: 'flex-end' }}>
              <Text numberOfLines={1} ellipSizeMode="tail" style={{ color: theme.inputColor }}>{selectedText}</Text>
            </View>
            <Icon name="ios-arrow-forward" />
          </Right>
        </ListItem>
        {this.renderDefaultImageList()}
        {this.renderLocalImageList()}
        <View style={{ paddingHorizontal: 15 }}>
          <ErrorComponent {...{ attributes, theme }} />
        </View>
      </View>
    );
  }
}