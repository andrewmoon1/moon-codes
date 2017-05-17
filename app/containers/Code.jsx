import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import Markdown from './Markdown';
import TextArea from '../components/TextArea';
import Title from '../components/Title';
import CodeBttns from '../components/CodeBttns';
import { typingTitle, newArea, submitCode, saveText } from '../actions/codes';
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
    const mirror = this.mirrors[className];
    const value = mirror.getCodeMirror().getValue();

    saveText(value, className);

    return undefined;
  }

  buildAreas() {
    const mapAreas = [];
    const { areas, saveText } = this.props;
    let count = 0;
    areas.map((area) => {
      if (area === 'textArea') {
        const textCount = `text-${count}`;
        mapAreas.push(
          <TextArea
            key={count}
            save={saveText}
            count={textCount} />,
        );

        if (count > 1) {
          // renders markdown with each new area
          setTimeout(() => {
            saveText('Enter Description Here', textCount);
          }, 0);
        }
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
              onChange={this.saveCode.bind(this, mirrorCount)}
              ref={instance => this.mirrors[mirrorCount] = instance}
            />
          </div>
        );

        if (count > 1) {
          // renders markdown with each new area
          setTimeout(() => {
            this.saveCode(mirrorCount, 'Enter Your Code');
          }, 0);
        }
      }
      count += 1;
      return undefined;
    });

    return mapAreas;
  }

  render() {
    const { typingTitle, newArea, submitCode } = this.props;
    const mapAreas = this.buildAreas();

    return (
      <div className={cx('codes-container')}>
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
        <Markdown />
      </div>
    );
  }
}

Code.propTypes = {
  areas: PropTypes.arrayOf(PropTypes.string).isRequired,
  typingTitle: PropTypes.func.isRequired,
  newArea: PropTypes.func.isRequired,
  submitCode: PropTypes.func.isRequired,
  saveText: PropTypes.func.isRequired,
  // submit: PropTypes.func.isRequired,
};

Code.defaultProps = {
  areas: ['textArea', 'codeMirror'],
};

function mapStateToProps(state) {
  return {
    areas: state.code.areas
  };
}

export default connect(mapStateToProps, { typingTitle, newArea, submitCode, saveText })(Code);
