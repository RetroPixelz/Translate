import { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  //api 
  const API = "https://api.mymemory.translated.net/get";

  const [translate, setTranslate] = useState('');
  const [translated, setTranslated] = useState('');
  const [lang, setLang] = useState('');
  const [toLang, setToLang] = useState('');

  // Labguage labels here
  const languageOptions = [
    { value: 'af', label: 'Afrikaans' },
    { value: 'sq', label: 'Albanian' },
    { value: 'am', label: 'Amharic' },
    { value: 'ar', label: 'Arabic' },
    { value: 'hy', label: 'Armenian' },
    { value: 'az', label: 'Azerbaijani' },
    { value: 'eu', label: 'Basque' },
    { value: 'be', label: 'Belarusian' },
    { value: 'bn', label: 'Bengali' },
    { value: 'bs', label: 'Bosnian' },
    { value: 'bg', label: 'Bulgarian' },
    { value: 'ca', label: 'Catalan' },
    { value: 'ceb', label: 'Cebuano' },
    { value: 'ny', label: 'Chichewa' },
    { value: 'zh', label: 'Chinese (Simplified)' },
    { value: 'zh-TW', label: 'Chinese (Traditional)' },
    { value: 'hr', label: 'Croatian' },
    { value: 'cs', label: 'Czech' },
    { value: 'da', label: 'Danish' },
    { value: 'nl', label: 'Dutch' },
    { value: 'en', label: 'English' },
    { value: 'eo', label: 'Esperanto' },
    { value: 'et', label: 'Estonian' },
    { value: 'tl', label: 'Filipino' },
    { value: 'fi', label: 'Finnish' },
    { value: 'fr', label: 'French' },
    { value: 'fy', label: 'Frisian' },
    { value: 'gl', label: 'Galician' },
    { value: 'ka', label: 'Georgian' },
    { value: 'de', label: 'German' },
  ];

 
// language change
  const translateOptionChange = (event) => {
    setLang(event.target.value);
  }

  //language change
  const translatedOptionChange = (event) => {
    setToLang(event.target.value);
  }

  const translateText = async () => {
    try {
      const response = await axios.get(API, {
        params: {
          q: translate,
          langpair: `${lang}|${toLang}`,
        },
      });

      if (response.data && response.data.responseData) {
        const translated = response.data.responseData.translatedText;
        setTranslated(translated);
      } else {
        setTranslated('Translation not found');
      }
    } catch (error) {
      console.error('Error translating text:', error);
      setTranslated('An error occurred');
    }
  };

  return (
    <div className="App">
      
      <header className="App-header">
      <img src="robot.png" alt="" className='logo'/>
        <div className='mainTranslatorBox'>
          <div className='translator'>
            <div className='toTranslate'>
            <p>Enter your text here:</p>
              <select className='labels' value={lang} onChange={translateOptionChange}>
                {languageOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              
              <input
                className='textInput'
                type="text"
                placeholder="Enter text to translate"
                value={translate}
                onChange={(e) => setTranslate(e.target.value)}
              />
            </div>
            <div className='translated'>
              <h2>Translated:</h2>
              <select className='labels' value={toLang} onChange={translatedOptionChange}>
                {languageOptions.map((option) => (
                  <option key={option.value} value={option.value} >
                    {option.label}
                  </option>
                ))}
              </select>
              <p>{translated}</p>
            </div>
            
          </div>
          <div className='ImageHere'>
            <img className='App-logo' src="robot.png" alt=""/>

          </div>
        </div>
        <button className='btn' onClick={translateText}>Translate</button>
      </header>
    </div>
  );
}

export default App;
