import React from 'react';
import StarAverage from '../shared/StarAverage.jsx';
import ActionButton from './ActionButton.jsx';

class AddButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div className="menu-item add-button">
          <h4>Like this product?</h4>
          <a href>
            <h4
              style={{textDecoration: "underline"}}
              onClick={()=>{
                this.props.addToOutfit();
                this.props.getImage(this.props.productImage[0].photos[0].thumbnail_url);
              }}
            >
                Click to add it to your outift!
            </h4>
          </a>
          <button
            className="outfit-button"
            onClick={()=>{
              this.props.addToOutfit();
              this.props.getImage(this.props.productImage[0].photos[0].thumbnail_url);
            }}
          >
            <svg width="200px" height="250px" viewBox="0 0 485.946 485.946">
              <path d="M338.122,282.09l-40.543-117.134c-5.155-14.855-4.077-31.148,2.944-45.195l24.297-48.609
                c3.32-6.629,3.543-14.363,0.634-21.168c-2.927-6.801-8.698-11.957-15.759-14.109l-22.809-6.961
                c-7.656-2.34-12.875-9.395-12.875-17.383C274.011,5.156,268.851,0,262.48,0h-39.027c-6.375,0-11.547,5.156-11.547,11.547
                c0,7.988-5.219,15.027-12.859,17.367l-22.797,6.961c-7.086,2.152-12.844,7.309-15.754,14.109
                c-2.926,6.805-2.703,14.555,0.602,21.168l24.313,48.609c7.023,14.047,8.082,30.34,2.957,45.195L147.809,282.09v0.021l0,0
                c0.031,7.336,34.152,13.414,78.969,14.612v150.672c-30.184,2.074-52.645,9.763-52.645,18.97c0,10.819,30.813,19.582,68.84,19.582
                c38.012,0,68.844-8.763,68.844-19.582c0-9.207-22.492-16.896-52.645-18.97V296.723c44.797-1.198,78.934-7.276,78.965-14.612l0,0
                L338.122,282.09z"/>
            </svg>
          </button>
          <h4>See your outfit here!</h4>
          <StarAverage reviewAverage={5} />
          <ActionButton
            buttonCallback={this.props.buttonCallback}
          />
        </div>
    );
  }
}

export default AddButton;