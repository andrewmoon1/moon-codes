import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import TextArea from '../components/TextArea';
import Title from '../components/Title';
import CodeBttns from '../components/CodeBttns';
import { typingText, typingCode, typingTitle, newArea, submitCode, saveText, saveCode } from '../actions/codes';
import styles from '../css/components/code';

const cx = classNames.bind(styles);

const CodeMirror = require('react-codemirror');


class Code extends React.Component {
  constructor(props) {
    super(props);
    this.cmOptions = {
      lineNumbers: true,
      mode: 'javascript',
    };
    this.mirrors = {};
    this.saveCode = this.saveCode.bind(this);
  }


  saveCode(className, focused) {
    const { saveText } = this.props;
    if (!focused) {
      const mirror = this.mirrors[className];
      const value = mirror.getCodeMirror().getValue();
      saveText(value, className);
    }

    return undefined;
  }

  render() {
    const { typingText, typingCode, typingTitle, areas, newArea, submitCode, saveText, saveCode } = this.props;
    const mapAreas = [];
    let count = 0;
    areas.map((area) => {
      if (area === 'textArea') {
        const textCount = `text-${count}`;
        mapAreas.push(
          <TextArea
            key={count}
            onEntryChange={typingText}
            save={saveText}
            count={textCount} />,
        );
      } else if (area === 'codeMirror') {
        const mirrorCount = `mirror-${count}`;
        mapAreas.push(
          <div
            key={count}
            className={cx('mirror-container')}>
            <CodeMirror
              options={this.cmOptions}
              className={mirrorCount}
              defaultValue={'Enter Your Code'}
              onChange={typingCode}
              ref={instance => this.mirrors[mirrorCount] = instance}
              onFocusChange={this.saveCode.bind(this, mirrorCount)}
            />
          </div>
        );
      }
      count += 1;
      return undefined;
    });
    return (
      <form
        className={cx('code-input')}
        onSubmit={this.props.submit}
        >
        <Title
          onEntryChange={typingTitle} />
        {mapAreas}
        <CodeBttns
          newArea={newArea}
          submit={submitCode}
          />
      </form>
    );
  }
}

Code.propTypes = {
  typingText: PropTypes.func.isRequired,
  areas: PropTypes.arrayOf(PropTypes.string).isRequired,
  // documentation: PropTypes.objectOf(PropTypes.string).isRequired,
  // addCode: PropTypes.func.isRequired,
  // submit: PropTypes.func.isRequired,
  // addText: PropTypes.func.isRequired,
};

Code.defaultProps = {
  areas: ['textArea', 'codeMirror'],
};

function mapStateToProps(state) {
  return {
    areas: state.code.areas
  };
}

export default connect(mapStateToProps, { typingText, typingCode, typingTitle, newArea, submitCode, saveText, saveCode })(Code);
