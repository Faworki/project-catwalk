import React from 'react';
import CharacteristicsScale from './CharacteristicScale';

const labelDict = {
  'Size': ['Too small', 'Perfect', 'Too large'],
  'Width': ['Too narrow', 'Perfect', 'Too wide'],
  'Comfort': ['Poor', 'Perfect'],
  'Quality': ['Poor', 'Perfect'],
  'Length': ['Runs short', 'Perfect', 'Runs long'],
  'Fit': ['Runs tight', 'Perfect', 'Runs loose']
};

const CharacteristicsBreakdown = ({characteristics}) => {
  return (
    <section className="char-breakdown">
      {Object.entries(characteristics).map(([name, data]) => {
        return (
          <CharacteristicsScale
            name={name}
            valuePercent={Math.trunc(parseFloat(data.value) / 5 * 100)}
            labels={labelDict[name]}
            key={data.id}
          />
        );
      })}
    </section>
  );
};

export default CharacteristicsBreakdown;
