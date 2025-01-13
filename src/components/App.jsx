import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { useState } from 'react';
import '../styles.css';

export const App = () => {
  const [inputValue, setInputValue] = useState(null);

  const onSubmit = inputValue => {
    setInputValue(inputValue);
  };

  return (
    <div className="App">
      <Searchbar onSubmit={onSubmit} />
      <ImageGallery inputValue={inputValue} />
    </div>
  );
};
