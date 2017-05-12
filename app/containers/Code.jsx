import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import TextArea from '../components/TextArea';
import CodeBttns from '../components/CodeBttns';
import { typingText, newArea, submitCode } from '../actions/codes';
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
  }

  render() {
    const {typingText, newArea } = this.props;
    console.log(this.props)
    const areas = [];
    let count = 0;
    this.props.docAreas.map((area) => {
      if (area === 'textArea') {
        areas.push(
          <TextArea
            key={count}
            onEntryChange={typingText} />,
        );
      } else if (area === 'codeMirror') {
        areas.push(
          <div key={count} className={cx('mirror-container')}>
            <CodeMirror
              options={this.cmOptions}
              defaultValue={'Enter Your Code'}
              onChange={typingText}
            />
          </div>
        );
      }
      count += 1;
      return undefined;
    });
    return (
      <form className={cx('code-input')} onSubmit={this.props.submit}>
        {areas}
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
  docAreas: PropTypes.arrayOf(PropTypes.string),
  // documentation: PropTypes.objectOf(PropTypes.string).isRequired,
  // addCode: PropTypes.func.isRequired,
  // submit: PropTypes.func.isRequired,
  // addText: PropTypes.func.isRequired,
};

Code.defaultProps = {
  docAreas: ['textArea', 'codeMirror'],
};

function mapStateToProps(state) {
  return {
    topics: state.topic.topics,
    newTopic: state.topic.newTopic
  };
}

export default connect(mapStateToProps, { typingText, newArea })(Code);
