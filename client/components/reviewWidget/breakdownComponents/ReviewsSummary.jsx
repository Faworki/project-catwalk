import React from 'react';
import StarAverage from '../../shared/StarAverage.jsx';

const calcPercentRecommended = (recommended) => {
  let recomend = parseInt(recommended.true);
  let total = recomend + parseInt(recommended.false);
  return Math.trunc(recomend / total * 100) + '%';
};

const ReviewsSummary = ({reviewAverage, recommended, reviewCount}) => {
  let percentRecommend;
  if (recommended) {
    let percent = calcPercentRecommended(recommended);
    percentRecommend = (<p>{percent} of reviews recommend this product</p>);
  }

  return (
    <section className="review-summary">
      <article>
        <h2 id="review-average">{parseFloat(reviewAverage).toFixed(1)}</h2>
        <div>
        <StarAverage reviewAverage={reviewAverage}/>
        <p>Based on {reviewCount} reviews</p>
        </div>
      </article>
      <article>
      {recommended ? percentRecommend : null}
      </article>
    </section>
  );
};

export default ReviewsSummary;
