import React, { Component } from 'react';
import RatingBreakdown from './reviewWidget/RatingBreakdown';
import ReviewList from './reviewWidget/ReviewList';
import axios from 'axios';

let dummyData = [
  {
      'review_id': 91791,
      'rating': 1,
      'summary': 'Dolores delectus id quia numquam et perspiciatis optio qui.',
      'recommend': false,
      'response': null,
      'body': 'Ut doloribus rerum voluptatem dolore voluptatem doloremque. Sed porro sed rerum. Fuga id blanditiis dolores esse laudantium.',
      'date': '2021-01-09T00:00:00.000Z',
      'reviewer_name': 'Vida0',
      'helpfulness': 3,
      'photos': [
          {
              'id': 67848,
              'url': 'https://images.unsplash.com/photo-1519722417352-7d6959729417?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80'
          },
          {
              'id': 67849,
              'url': 'https://images.unsplash.com/photo-1517278322228-3fe7a86cf6f0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1567&q=80'
          },
          {
              'id': 67850,
              'url': 'https://images.unsplash.com/photo-1519862170344-6cd5e49cb996?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80'
          }
      ]
  },
  {
      'review_id': 91792,
      'rating': 1,
      'summary': 'Nihil consequatur quam dolore consequuntur rerum.',
      'recommend': false,
      'response': null,
      'body': 'Est sint nam similique ut iusto vero ut. Minus architecto unde qui. Incidunt dolorem ducimus et commodi quam enim. Numquam suscipit quia maiores ex. Quam accusamus saepe autem quisquam qui est vero impedit officia.',
      'date': '2020-10-31T00:00:00.000Z',
      'reviewer_name': 'Christina14',
      'helpfulness': 15,
      'photos': [
          {
              'id': 67845,
              'url': 'https://images.unsplash.com/photo-1553830591-2f39e38a013c?ixlib=rb-1.2.1&auto=format&fit=crop&w=2760&q=80'
          },
          {
              'id': 67846,
              'url': 'https://images.unsplash.com/photo-1542702942-161ceb2e3d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80'
          },
          {
              'id': 67847,
              'url': 'https://images.unsplash.com/photo-1553830591-d8632a99e6ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=1511&q=80'
          }
      ]
  },
  {
      'review_id': 91794,
      'rating': 4,
      'summary': 'Eum consectetur et nihil id.',
      'recommend': true,
      'response': null,
      'body': 'Et illo et voluptatem iure expedita rerum at voluptas. Possimus pariatur iure rerum consequuntur earum illo ut. Qui est quod voluptatibus expedita quidem voluptatum.',
      'date': '2020-09-16T00:00:00.000Z',
      'reviewer_name': 'Rhett_Terry35',
      'helpfulness': 25,
      'photos': [
          {
              'id': 67840,
              'url': 'https://images.unsplash.com/photo-1519862170344-6cd5e49cb996?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80'
          },
          {
              'id': 67841,
              'url': 'https://images.unsplash.com/photo-1520904549193-5ab0027b3fa6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80'
          },
          {
              'id': 67842,
              'url': 'https://images.unsplash.com/photo-1544376664-80b17f09d399?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1525&q=80'
          }
      ]
  },
  {
      'review_id': 91793,
      'rating': 3,
      'summary': 'Quis unde maxime ut voluptas perspiciatis et ex exercitationem.',
      'recommend': true,
      'response': null,
      'body': 'Ut omnis consequatur. Provident dolorem at est harum beatae natus omnis in est. Aliquam est iste neque magni. Temporibus debitis ex sed perspiciatis tempora voluptatem minima quasi dolores.',
      'date': '2020-08-20T00:00:00.000Z',
      'reviewer_name': 'Abby.Batz68',
      'helpfulness': 9,
      'photos': [
          {
              'id': 67843,
              'url': 'https://images.unsplash.com/photo-1517278322228-3fe7a86cf6f0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1567&q=80'
          },
          {
              'id': 67844,
              'url': 'https://images.unsplash.com/photo-1486025402772-bc179c8dfb0e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80'
          }
      ]
  },
  {
      'review_id': 91790,
      'rating': 4,
      'summary': 'Quis voluptatibus sed et.',
      'recommend': true,
      'response': null,
      'body': 'Aut iusto quos excepturi nobis saepe exercitationem illo et veritatis. Atque dolores deserunt repudiandae. Placeat commodi perspiciatis consequuntur in. Minus et et. Aut error est accusamus corporis quo. Quae qui reprehenderit et nisi omnis illo neque cum.',
      'date': '2020-04-02T00:00:00.000Z',
      'reviewer_name': 'Nelda76',
      'helpfulness': 13,
      'photos': [
          {
              'id': 67851,
              'url': 'https://images.unsplash.com/photo-1546367791-e7447b431084?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80'
          },
          {
              'id': 67852,
              'url': 'https://images.unsplash.com/photo-1520904549193-5ab0027b3fa6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80'
          }
      ]
  }
];

export class ReviewsWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredReviews: dummyData,
      productReviews: dummyData,
      page: 1,
      numToDisplay: 2,
      sortOrder: 'relevant',
    };
  }

  getReviews() {

  }

  filterReviews() {

  }

  render() {
    return (
      <div className="reviews-widget">
        <h3>{'Ratings & Reviews'}</h3>
        <div className="reviews-container">
          <RatingBreakdown
            reviewMetaData={this.props.reviewMetaData}
            reviewAverage={this.props.reviewAverage}
            reviewCount={this.props.reviewCount}
          />
          <ReviewList
            reviews={this.state.filteredReviews}
            reviewCount={this.props.reviewCount}
            numToDisplay={this.state.numToDisplay}
          />
        </div>
      </div>
    );
  }
}

export default ReviewsWidget;
