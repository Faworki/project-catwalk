import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#app');

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

class Comparison extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Modal
          style={customStyles}
          isOpen={this.props.isOpen}
          contentLabel='Minimal Modal Example'
        >
          <ul className='comparison'>
            Current Product
            {this.props.product.features.map(feature=>{
              return <li key={feature.feature}>
                {feature.feature}: {feature.value}
                </li>;
            })}
          </ul>
          <ul className='comparison'>
            Comparing To:

          </ul>
          <button onClick={this.props.showModal}>
            Close
          </button>
        </Modal>
      </div>
    );
  }
}

export default Comparison;