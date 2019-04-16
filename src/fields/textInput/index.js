import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View, Item, Input, Icon, ListItem, Text } from 'native-base';
import { Platform } from 'react-native';
import { getKeyboardType } from '../../utils/methods';

const isIOS = Platform.OS === 'ios';
export default class TextInputField extends Component {
  static propTypes = {
    attributes: PropTypes.object,
    theme: PropTypes.object,
    updateValue: PropTypes.func,
    onSummitTextInput: PropTypes.func,
    ErrorComponent: PropTypes.func,
  }
  handleChange(text) {
    this.props.updateValue(this.props.attributes.name, text);
  }

  getHeight = () => {
    const { attributes } = this.props;
    const inputProps = attributes.props;

    if(!inputProps && !isIOS) {
      return 40;
    }

    return inputProps && inputProps.multiline && (Platform.OS === 'ios' ? undefined : 40);
  }
  render() {
    const { theme, attributes, ErrorComponent } = this.props;
    const inputProps = attributes.props;
    const keyboardType = getKeyboardType(attributes.type);
    return (
      <ListItem style={{ borderBottomWidth: 0, paddingVertical: 0, paddingBottom: 0, paddingTop: 0, margin: 0 }}>
        <View style={{ flex: 1 }}>
          <View>
            <Item error={theme.changeTextInputColorOnError ? attributes.error : null}>
              { attributes.icon &&
              <Icon style={{color:theme.textInputIconColor}} name={attributes.icon} />
                }
              <Input
                style={{
                  height: this.getHeight(),
                  paddingTop: isIOS ? 12 : 0,
                  paddingBottom: isIOS ? 12 : 0,
                  color: theme.inputColor
                }}
                maxHeight={150}
                ref={(c) => { this.textInput = c; }}
                underlineColorAndroid="transparent"
                numberOfLines={3}
                secureTextEntry={attributes.secureTextEntry || attributes.type === 'password'}
                placeholder={attributes.label}
                blurOnSubmit={false}
                onSubmitEditing={() => this.props.onSummitTextInput(this.props.attributes.name)}
                placeholderTextColor={theme.inputColorPlaceholder}
                editable={attributes.editable}
                value={attributes.value && attributes.value.toString()}
                keyboardType={keyboardType}
                onChangeText={text => this.handleChange(text)}
                {...inputProps}
              />
              { theme.textInputErrorIcon && attributes.error ?
                <Icon name={theme.textInputErrorIcon} /> : null}
            </Item>
          </View>
          <ErrorComponent {...{ attributes, theme }} />
        </View>
      </ListItem>
    );
  }
}
