import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from '../css/components/code';

const cx = classNames.bind(styles);


class CodeBttns extends React.Component {
  render() {
    return (
      <div className={cx('code-buttons')}>
        <button type="button" id="areaBttn" className={cx('code-button')} onClick={this.props.addText}>
          Insert TextArea
        </button>
        <input type="submit" id="submitBttn" className={cx('code-button')} value="Submit" />
        <button type="button" id="mirrorBttn" className={cx('code-button')} onClick={this.props.addCode}>
          Insert Code Mirror
        </button>
      </div>
    );
  }
}

CodeBttns.propTypes = {
  addText: PropTypes.func.isRequired,
  addCode: PropTypes.func.isRequired,
};

export default CodeBttns;
