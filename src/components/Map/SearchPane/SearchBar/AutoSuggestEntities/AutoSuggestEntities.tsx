import { IonIcon } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import Autosuggest from 'react-autosuggest';
import { arrowBack, searchOutline, close } from 'ionicons/icons';
import { useHistory } from 'react-router';
import { modalController } from "@ionic/core";
import { useSelector } from "react-redux";
import { RootState } from "src/redux/reducers";

interface PageProps {
  isOpen: boolean;
  isSearching: boolean;
  inputVal: string;
  handleSearchSelect: Function;
  setIsSearching: (isSearching: boolean) => void;
  handleMenuClose: Function;
  setInputVal: (inputVal: string) => void;
  setAutoSuggestions: any;
  entitiesByBusinessType: object[];
}

const AutoSuggestEntities: React.FC<PageProps> = (props) => {
  const [searchIcon, setSearchIcon] = useState(searchOutline);
  const [entityList, setEntityList] = useState<any>();
  const isMobile = useSelector((state: RootState) => state.isMobile);

  const history = useHistory();

  const getSuggestions = (value: any) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    let matchedArr: any = [];

    const punctuationless = inputValue
      .replace(/[.,#!$%&;:{}=\-_`~()]/g, "")
      .replace(/\s+/g, " ");

    const filter =
      inputLength === 0
        ? []
        : entityList.filter((entity: any) => {
            let filteredEntity;
            const strippedName = entity.name
              .toLowerCase()
              .replace(/[^\w\s]|_/g, "")
              .replace(/\s+/g, " ");

            if (punctuationless === strippedName.slice(0, inputLength)) {
              matchedArr.push(entity);
            } else {
              if (strippedName.startsWith("the")) {
                if (punctuationless.startsWith("the")) {
                  if (strippedName.slice(0, inputLength) === punctuationless) {
                    filteredEntity = entity;
                  }
                } else {
                  if (
                    strippedName.substring(4, 4 + inputLength) ===
                    punctuationless
                  ) {
                    filteredEntity = entity;
                  }
                }
              } else {
                if (strippedName.slice(0, inputLength) === punctuationless) {
                  filteredEntity = entity;
                } else if (
                  entity.name.toLowerCase().slice(0, inputLength) === inputValue
                ) {
                  filteredEntity = entity;
                } else {
                  const splitWordArr = punctuationless.split(" ");
                  const splitEntityString = strippedName.split(" ");
                  for (let i = 0; i < splitWordArr.length; i++) {
                    for (let x = 0; x < splitEntityString.length; x++) {
                      if (
                        splitEntityString[x].slice(
                          0,
                          splitWordArr[i].length
                        ) === splitWordArr[i]
                      ) {
                        filteredEntity = entity;
                      }
                    }
                  }
                }
              }
            }
            return filteredEntity;
          });

    filter.sort((a: any, b: any) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });

    matchedArr.sort((a: any, b: any) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });

    return [...matchedArr, ...filter];
  };

  const getSuggestionValue = (suggestion: any) => suggestion.name;

  const renderSuggestion = (suggestion: any) => (
    <div style={{ display: "none" }}>{suggestion.name}</div>
  );

  const onChange = (event: any) => {
    if (event.target.value) {
      props.setInputVal(event.target.value);
    } else {
      props.setInputVal("");
      props.setAutoSuggestions([]);
    }
  };

  const onSuggestionsFetchRequested = ({ value }: any) => {
    props.setAutoSuggestions(getSuggestions(value));
  };

  const inputProps = {
    placeholder: "Search",
    value: props.inputVal,
    onChange: onChange,
  };

  const handleInputFocus = async () => {
    props.setIsSearching(true);

    const response = await fetch(
      `${process.env.REACT_APP_DATABASE_URL}/entities.json`
    );
    const data = await response.json();

    setEntityList(data.entities);
  };

  const handleIconClick = async () => {
    if (props.isSearching) {
      props.setIsSearching(false);
    } else {
      if (isMobile) {
        await modalController.dismiss({ dismissed: true });
      }
      if (props.entitiesByBusinessType.length > 0) {
        history.goBack();
      } else {
        props.handleMenuClose();
      }
    }
  };

  const renderInputComponent = (inputProps: any) => (
    <div className="search-bar-container">
      <IonIcon
        icon={searchIcon}
        onClick={() => handleIconClick()}
        style={{ fontSize: 24, cursor: "pointer" }}
      />
      <input
        {...inputProps}
        className="search-bar"
        style={{ outline: "none", border: "none" }}
        onFocus={() => handleInputFocus()}
      />
      <IonIcon
        icon={close}
        onClick={() => props.setInputVal("")}
        style={{
          fontSize: 24,
          opacity: props.inputVal !== "" ? 1 : 0,
          cursor: "pointer",
        }}
      />
    </div>
  );

  useEffect(() => {
    if (props.isOpen || props.isSearching) {
      setSearchIcon(arrowBack);
    } else {
      setSearchIcon(searchOutline);
    }
  }, [props.isOpen, props.isSearching]);

  return (
    <Autosuggest
      suggestions={[]}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
      renderInputComponent={renderInputComponent}
    />
  );
};;;

export default AutoSuggestEntities;