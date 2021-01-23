import React from 'react';
import Styles from './Styles.jsx';
import axios from 'axios';

class StyleSelector extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedStyle: ''
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.selectedStyle !== prevProps.selectedStyle) {
      const newStyle = this.props.styles.filter((style) => {
        return style.style_id === parseInt(this.props.selectedStyle);
      });
      this.setState({
        selectedStyle: newStyle[0].name
      });
    }
  }

  render () {
    return (
      <div className="style-selector">
        <span><small><b>STYLE &gt;</b></small></span>{' '}<span>{this.state.selectedStyle}</span>
        <div className="styles-container">
          {this.props.styles.map((style) => {
            return (<Styles
              key={style.style_id}
              styleId={style.style_id}
              thumbnail={style.photos[0].thumbnail_url}
              clickedStyleHandler={this.props.clickedStyleHandler}
            />);
          })}
        </div>
      </div>
    );
  }
}

export default StyleSelector;