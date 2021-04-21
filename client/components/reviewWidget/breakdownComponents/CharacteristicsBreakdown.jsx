import React from 'react';
import CharacteristicsScale from './CharacteristicScale.jsx';
import { LABEL_DICT } from '../utils/characteristics.js';

const CharacteristicsBreakdown = ({characteristics}) => {
  return (
    <section className="char-breakdown">
      {Object.entries(characteristics).map(([name, data]) => {
        return (
          <CharacteristicsScale
            name={name}
            valuePercent={Math.trunc(parseFloat(data.value) / 5 * 100)}
            labels={LABEL_DICT[name]}
            key={data.id}
          />
        );
      })}
    </section>
  );
};

export default CharacteristicsBreakdown;
