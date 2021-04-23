import React from 'react';

class ActionButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <img
        src='https://duce5lj2f2sxj.cloudfront.net/icon/premium/png-256/1620154.png?Expires=1619049600&Signature=SoXmoqr~8y-ptEGqE0zNngg29SUZLXKydSTMp1ek4uUEBrmFejZyxxfhtJ104deeQL~Zx1O3YWrdhAasAlx0MTg5H76~F~49N6l-nCGWNiqgD9GRSWEiANW4URDyFTObOdolRkJwDq~bdKkT94Ta6ggJCnKT6IspWiFJ1ekFLlOknzuYbA5lvEIs7JCEni-VTrDESMWTue4svP-gf9W8Z8NV9RfF~BvmMb1hibCgcSAiXWHULySYoJ--xN8UVcYoMBOq0W4zW2SN0ouKj7jSKKSJ6vc9yNmSc4QsfjidMWG4ZEidq56ON2bnhcuIzQbHpZWol80HNqHG5rVr3bghmw__&Key-Pair-Id=APKAIONEDRCDZGBCR6PA'
         onClick={()=>{
          this.props.buttonCallback(this.props.productId);
          this.props.buttonCallback2(this.props.index);
          }}
          width='25px'
          height='25px'
          />
      </div>
    );
  }
}

export default ActionButton;
