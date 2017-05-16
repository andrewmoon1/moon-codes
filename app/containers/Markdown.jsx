import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import ReactMarkdown from 'react-markdown';
import TextArea from '../components/TextArea';
import Title from '../components/Title';
import CodeBttns from '../components/CodeBttns';
import { typingTitle, newArea, submitCode, saveText } from '../actions/codes';
import styles from '../css/components/code';

const cx = classNames.bind(styles);
const CodeMirror = require('react-codemirror');


class MarkdownContainer extends React.Component {
  // constructor(props) {
  //   super(props);
  //
  // }

  // componentWillReceiveProps(nextProps) {
  // }

  render() {
    const { areas } = this.props;
    const markdowns = [];
    let count = 0;

    Object.keys(areas).map((md) => {
      let template = '';
      const position = parseInt(md.split('-', md.indexOf('-') + 1)[1], 10);
      if (md.includes('mirror')) {
        template = template.concat(
          '```js \n' +
          areas[md] +
          '\n' +
          '``` \n' +
          '----- \n'
        );
      } else if (md.includes('text')) {
        template = template.concat('\n' + areas[md] + '\n \n ---');
      }

      markdowns[position] =
        (<ReactMarkdown
          key={count}
          source={template} />);

      count += 1;
    });
    return (
      <div
        className={cx('markdown-container')}
        >
        {markdowns}
      </div>
    );
  }
}

MarkdownContainer.propTypes = {
  areas: PropTypes.objectOf(PropTypes.string).isRequired,
};

MarkdownContainer.defaultProps = {
  areas: {
    'text-0': '### Enter Text Here',
    'code-0': '### Enter Code Here'
  },
};

function mapStateToProps(state) {
  return {
    areas: state.code.savedAreas
  };
}

export default connect(mapStateToProps, { typingTitle, newArea, submitCode, saveText })(MarkdownContainer);
