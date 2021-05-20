import React, { useState } from 'react';
import { IonIcon } from '@ionic/react';
import SearchBar from './SearchBar';
import SideMenu from './SideMenu';
import { RootState } from '../../reducers';
import { useSelector } from 'react-redux';

interface PageProps {
    featuredEntities: string[]
}

const SearchPane: React.FC<PageProps> = (props) => {
    const [isSearching, setIsSearching] = useState<boolean>(false);
    const [inputVal, setInputVal] = useState<string>('');
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const isMobile = useSelector( (state: RootState) => state.isMobile);

    const mobileMenuTabStyle = (
        isOpen ? 'translateY(-54vh) translateX(50%)' : 'translateY(-18vh) translateX(50%)'
    );
    const desktopMenuTabStyle = (
        isOpen ? 'translateX(-24vw)' : 'translateX(0)'
    );

    return (
        <div className="ion-align-self-end menu-container" style={{ backgroundColor: isSearching ? '#ccc' : 'transparent' }}>
            <SearchBar 
                inputVal={inputVal} 
                setInputVal={setInputVal} 
                setIsSearching={setIsSearching} 
                isSearching={isSearching} 
                setIsOpen={setIsOpen}
                featuredEntities={props.featuredEntities}
            />
            {
                isSearching ? 
                    null
                :
                    <>
                    {/* <div className="chevron-container" onClick={() => setIsOpen(!isOpen)} style={{ transform: isMobile ? mobileMenuTabStyle : desktopMenuTabStyle }}>
                        <div className="menu-toggle-wrapper" style={{ transform: isMobile ? isOpen ? 'rotate(90deg)' : 'rotate(90deg) rotateY(180deg)' : isOpen ? 'rotateY(0)' : 'rotateY(180deg)' }}>
                        <IonIcon name="chevron-forward" className="toggle-menu-icon"></IonIcon>
                        </div>
                    </div> */}
                        <SideMenu 
                            featuredEntities={props.featuredEntities}
                            isOpen={isOpen}
                        />
                    </>
            }
        </div>
    );
};

export default SearchPane;