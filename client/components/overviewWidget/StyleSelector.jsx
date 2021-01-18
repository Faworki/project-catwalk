import React from 'react';
import Styles from './Styles.jsx';
import axios from 'axios';

class StyleSelector extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      product: null,
      styles: [],
      selectedStyle: ''
    };
  }

  componentDidMount() {}

  componentDidUpdate(prevProps) {
    if (this.props.product !== prevProps.product) {
      axios.get(`/api/fec2/hrnyc/products/${this.props.product.id}/styles`)
        .then(({data}) => {
          this.setState({
            product: this.props.product,
            styles: data.results,
            selectedStyle: data.results[0].name
          });
        })
        .catch((err) => {
          console.error(err);
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
          />);
        })}
      </div>
    );
  }
}

export default StyleSelector;