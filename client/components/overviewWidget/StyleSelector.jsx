import React from 'react';
import Styles from './Styles.jsx';
import axios from 'axios';

class StyleSelector extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      styles: [],
      selectedStyle: ''
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.product !== prevProps.product) {
      axios.get(`/api/fec2/hrnyc/products/${this.props.product.id}/styles`)
        .then(({data}) => {
          this.setState({
            styles: data.results,
            selectedStyle: data.results[0].name
          });
        })
        .catch((err) => {
          console.error(err);
        });
    }

    if (this.props.selectedStyle !== prevProps.selectedStyle) {
      const newStyle = this.state.styles.filter((style) => {
        return style.style_id === parseInt(this.props.selectedStyle);
      });
      this.setState({
        selectedStyle: newStyle[0].name
      });
    }
  }

  render () {
    return (
      <div>
        <span><small>STYLE &gt; </small></span><span>{this.state.selectedStyle}</span><br />
        {this.state.styles.map((style) => {
          return (<Styles
            key={style.style_id}
            styleId={style.style_id}
            thumbnail={style.photos[0].thumbnail_url}
            clickedStyleHandler={this.props.clickedStyleHandler}
          />);
        })}
      </div>
    );
  }
}

export default StyleSelector;