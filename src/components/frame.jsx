import React from 'react';

const Frame = ({ list }) => {
  const getClass = (value) => {
    switch (value) {
      case 0: return 'cell';
      case 1: return 'cell current';
      default: return 'cell done';
    }
  };

  return (
    <div className="frame">
      <div className="array">
        {list.map((element, index) => (
          <div
            className={getClass(element.classType)}
            key={index}
            style={{ height: `${4 * element.key}px` }}
            value={element.key}
          />
        ))}
      </div>
    </div>
  );
};

export default Frame;
