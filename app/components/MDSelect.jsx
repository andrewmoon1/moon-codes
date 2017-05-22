import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import styles from '../css/components/markdown';
import { getDocs, load } from '../actions/codes';


const cx = classNames.bind(styles);


class MDSelect extends React.Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    const { getDocs } = this.props;
    getDocs();
  }

  componentDidUpdate() {
    const { docs } = this.props;
    const select = document.getElementById('mdSelect');
    docs.forEach((doc, index) => {
      const title = JSON.parse(doc.title);
      const option = document.createElement('option');
      option.text = title;
      select.add(option);

      if (index === 0) {
        this.submit(null, title);
      }
    });
  }

  submit(event, title) {
    const { docs, load } = this.props;
    let submission;
    if (event) {
      event.preventDefault();
      submission = event.target.value;
    } else {
      submission = title;
    }

    docs.some((doc) => {
      const title = JSON.parse(doc.title);
      console.log('this is getting called', title, submission);
      if (title === submission) {
        const documentation = JSON.parse(doc.code);
        load(documentation, title);
      }
    });
  }

  render() {
    return (
      <div className={cx('md-select-container')}>
        <select
          id={'mdSelect'}
          onChange={this.submit}
          className={cx('md-select')} />
      </div>
    );
  }
}

MDSelect.propTypes = {
  // newArea: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    docs: state.code.documentation
  };
}

export default connect(mapStateToProps, {getDocs, load})(MDSelect);
