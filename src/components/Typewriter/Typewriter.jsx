import { useState, useEffect } from 'react';

const Typewriter = ({ delay, children, setDone }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < children.length) {
      const timeout = setTimeout(() => {
        setCurrentText((prevText) => prevText + children[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, delay);

      return () => clearTimeout(timeout);
    } else {
      setDone(true);
    }
  }, [currentIndex, delay, children]);

  return <span>{currentText}</span>;
};

export default Typewriter;
