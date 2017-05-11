import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import TextArea from '../components/TextArea';
import { createTopic, typing, typingText, incrementCount,
  decrementCount, destroyTopic } from '../actions/topics';
import styles from '../css/components/code';

  const cx = classNames.bind(styles);

// const CodeMirror = require('react-codemirror');

// require('codemirror/lib/codemirror.css');


class Code extends React.Component {
  constructor(props) {
    super(props);
    this.cmOptions = {
      lineNumbers: true,
    };
  }

  render() {
    const {newTopic, topics, typing, typingText, createTopic, destroyTopic, incrementCount, decrementCount } = this.props;
    const areas = [];
    let count = 0;
    console.log('--props----', typingText)
    this.props.docAreas.map((area) => {
      count += 1;
      if (area === 'textArea') {
        areas.push(
          <TextArea
            onEntryChange={typingText} />,
        );
      } else if (area === 'codeMirror') {
        areas.push(
          // <CodeMirror
          //   key={count}
          //   options={this.cmOptions}
          //   defaultValue={this.props.documentation['code-0']}
          // />,
        );
      }
    });
    return (
      <form className={cx('code-input')} onSubmit={this.props.submit}>
        {areas}
      </form>
    );
  }
}
// <CodeBttns
//   addCode={this.props.addCode}
//   submit={this.props.submit}
//   addText={this.props.addText}
//   />

Code.propTypes = {
  typingText: PropTypes.func.isRequired,
  docAreas: PropTypes.arrayOf(PropTypes.string),
  // documentation: PropTypes.objectOf(PropTypes.string).isRequired,
  // addCode: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  // addText: PropTypes.func.isRequired,
};

Code.defaultProps = {
  docAreas: ['textArea', 'codeMirror'],
};


export default Code;
