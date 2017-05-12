import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import TextArea from '../components/TextArea';
import CodeBttns from '../components/CodeBttns';
import { createTopic, typing, typingText, incrementCount,
  decrementCount, destroyTopic } from '../actions/topics';
import styles from '../css/components/code';
import '../css/components/code';

const cx = classNames.bind(styles);

const CodeMirror = require('react-codemirror');


class Code extends React.Component {
  constructor(props) {
    super(props);
    this.cmOptions = {
      lineNumbers: true,
    };
  }

  render() {
    const {typingText, docAreas } = this.props;
    const areas = [];
    let count = 0;
    this.props.docAreas.map((area) => {
      count += 1;
      if (area === 'textArea') {
        areas.push(
          <TextArea
            key={count}
            onEntryChange={typingText} />,
        );
      } else if (area === 'codeMirror') {
        areas.push(
          <div className={cx('mirror-container')}>
            <CodeMirror
              key={count}
              options={this.cmOptions}
              defaultValue={'Enter Your Code'}
            />
          </div>
        );
      }
      return undefined;
    });
    return (
      <form className={cx('code-input')} onSubmit={this.props.submit}>
        {areas}
        <CodeBttns
          addCode={this.props.addCode}
          submit={this.props.submit}
          addText={this.props.addText}
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

export default connect(mapStateToProps, { typingText })(Code);
