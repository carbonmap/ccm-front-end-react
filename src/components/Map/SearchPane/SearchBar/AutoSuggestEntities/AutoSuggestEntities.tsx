import { IonIcon } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import Autosuggest from 'react-autosuggest';
import { arrowBack, searchOutline, close } from 'ionicons/icons';

interface PageProps {
  isOpen: boolean;
  isSearching: boolean;
  inputVal: string;
  handleSearchSelect: Function;
  setIsSearching: (isSearching: boolean) => void;
  handleMenuClose: Function;
  setInputVal: (inputVal: string) => void;
  setAutoSuggestions: any;
}

const AutoSuggestEntities: React.FC<PageProps> = (props) => {
    const [suggestions, setSuggestions] = useState<any>('');
    const [searchIcon, setSearchIcon] = useState(searchOutline);
    const [entityList, setEntityList] = useState<any>();

    const getSuggestions = (value:any) => {
      const inputValue = value.trim().toLowerCase();
      const inputLength = inputValue.length;
    
      const punctuationless = inputValue.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").replace(/\s+/g, " ");
    
      const filter = inputLength === 0 ? [] : entityList.entities.filter((entity:any) => {
        const strippedName = entity.name.toLowerCase().replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ");


        
        if(strippedName.startsWith("the")) {
          if(punctuationless.startsWith("the")) {
            if(strippedName.slice(0, inputLength) == punctuationless) {
              return entity;
            } else if(entity.name.toLowerCase().slice(3, inputLength) === inputValue) {
              return entity;
            }
          } else {
            if(strippedName.substring(4, (4 + inputLength)) === punctuationless) {
              return entity;
            } else if(entity.name.toLowerCase().substring(4, (4 + inputLength)) === inputValue) {
              return entity;
            } else {
                if(strippedName.slice(0, inputLength) == punctuationless) {
                return entity;
              } else if(entity.name.toLowerCase().slice(0, inputLength) === inputValue) {
                return entity;
              }
            }
          }
        } else {
          if(strippedName.slice(0, inputLength) == punctuationless) {
            return entity;
          } else if(entity.name.toLowerCase().slice(0, inputLength) === inputValue) {
            return entity;
          } else {
            const splitWordArr = punctuationless.split(" ");
            const splitEntityString = strippedName.split(" ");
            for(let i = 0; i < splitWordArr.length; i++) {
                const checkWords = splitEntityString.includes(splitWordArr[i]);
                if(checkWords) {
                  return entity;
                }
            }
          }
        }
      });

    
      return filter;
    };
    
    const getSuggestionValue = (suggestion:any) => suggestion.name;
    
    const renderSuggestion = (suggestion:any) => (
      <div style={{ display: 'none' }}>
        {suggestion.name}
      </div>
    );

    const onChange = (event:any) => {
      if(event.target.value) {
        props.setInputVal(event.target.value);
      } else {
        props.setInputVal("")
      }
    };

    const onSuggestionsFetchRequested = ({ value }:any) => {
        props.setAutoSuggestions(getSuggestions(value));
    };

    const onSuggestionsClearRequested = () => {
        props.setAutoSuggestions([]);
    };

    const inputProps = {
      placeholder: 'Search',
      value: props.inputVal,
      onChange: onChange,
    };

    const handleInputFocus = async() => {
      props.setIsSearching(true);

      const response = await fetch('https://raw.githubusercontent.com/aldjonz/ccm-json/main/entities.json');
      const data = await response.json();
      setEntityList(data);
    };

    const renderInputComponent = (inputProps:any) => (
      <div className="search-bar-container" >
          <IonIcon 
            icon={searchIcon} 
            onClick={props.isSearching ? () => props.setIsSearching(false) : () => props.handleMenuClose()} 
            style={{ fontSize: 24, cursor: 'pointer' }} 
          />
          <input 
              {...inputProps} 
              className="search-bar"
              style={{ outline: 'none', border: 'none' }}
              onFocus={() => handleInputFocus()}
          />
          <IonIcon 
            icon={close} 
            onClick={() => props.setInputVal("")} 
            style={{ fontSize: 24, opacity: props.inputVal !== "" ? 1 : 0, cursor: 'pointer' }} 
          />
      </div>
    );

    useEffect(() => {
      if(props.isOpen || props.isSearching) {
        setSearchIcon(arrowBack);
      } else {
        setSearchIcon(searchOutline);
      }
    }, [props.isOpen, props.isSearching])

    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        renderInputComponent={renderInputComponent}
      />
    );
};

export default AutoSuggestEntities;