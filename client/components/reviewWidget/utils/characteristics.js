const CHAR_RATINGS = {
  Size: [
    'A size too small',
    '1/2 a size too small',
    'Perfect',
    '1/2 a size too big',
    'Too large',
  ],
  Width: [
    'Too narrow',
    'Slightly narrow',
    'Perfect',
    'Slightly wide',
    'Too wide',
  ],
  Comfort: [
    'Uncomfortable',
    'Slightly uncomfortable',
    'Ok',
    'Comfortable',
    'Perfect',
  ],
  Quality: [
    'Poor',
    'Below average',
    'What I expected',
    'Pretty Great',
    'Perfect',
  ],
  Length: [
    'Runs short',
    'Runs slightly short',
    'Perfect',
    'Runs slightly long',
    'Runs long',
  ],
  Fit: [
    'Runs tight',
    'Runs slightly tight',
    'Perfect',
    'Runs slightly loose',
    'Runs loose',
  ],
};

const LABEL_DICT = {
  'Size': ['Too small', 'Perfect', 'Too large'],
  'Width': ['Too narrow', 'Perfect', 'Too wide'],
  'Comfort': ['Poor', 'Perfect'],
  'Quality': ['Poor', 'Perfect'],
  'Length': ['Runs short', 'Perfect', 'Runs long'],
  'Fit': ['Runs tight', 'Perfect', 'Runs loose']
};

module.exports = {
  CHAR_RATINGS,
  LABEL_DICT
};