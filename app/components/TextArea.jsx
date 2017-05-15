import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from '../css/components/textarea';

const cx = classNames.bind(styles);

export default class TextArea extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.saveCode = this.saveCode.bind(this);
  }


  onChange(event) {
    const { onEntryChange } = this.props;
    onEntryChange(event.target.value, event.target);
  }

  saveCode(event) {
    const { save, count } = this.props;
    save(event.target.value, count);
  }

  render() {
    return (
      <div className={cx('text-area-container')}>
        <textarea
          className={cx('textarea')}
          placeholder="Enter Description Here"
          onChange={this.onEntryChange}
          onBlur={this.saveCode} />
      </div>
    );
  }
}

TextArea.propTypes = {
  onEntryChange: PropTypes.func.isRequired
};
