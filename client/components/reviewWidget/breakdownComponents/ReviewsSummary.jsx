import React from 'react';
import StarAverage from '../../shared/StarAverage.jsx';

const calcPercentRecommended = (recommended) => {
  let recomend = parseInt(recommended.true);
  let total = recomend + parseInt(recommended.false);
  return recomend / total * 100 + '%';
};

const ReviewsSummary = ({reviewAverage, recommended, reviewCount}) => {
  let percentRecommend;
  if (recommended) {
    let percent = calcPercentRecommended(recommended);
    percentRecommend = (<p>{percent} of reviewers recommend this product</p>);
  }
  console.log('Review Average: ', reviewAverage);


  return (
    <section>
      <article>
        <h2 className="review-average">{parseFloat(reviewAverage).toFixed(1)}</h2>
        <StarAverage reviewAverage={reviewAverage}/>
        <p>Based on {reviewCount} reviews</p>
      </article>
      <article>
      {recommended ? percentRecommend : null}
      </article>
    </section>
  );
};

export default ReviewsSummary;
