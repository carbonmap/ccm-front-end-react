import React, { useState, useEffect } from 'react';
import { IonContent, IonIcon } from '@ionic/react';
import SearchBar from './SearchBar';
import SideMenu from './SideMenu';
import { RootState } from '../../redux/reducers';
import { useSelector } from 'react-redux';
import MobileDrawer from './SideMenu/MenuComponents/EntityDetails/MobileDrawer/MobileDrawer';

interface PageProps {
    featuredEntities: {id: string, name: string, emissions: string[]}[]
    slug: string
}

const SearchPane: React.FC<PageProps> = (props) => {
    const [isSearching, setIsSearching] = useState<boolean>(false);
    const [inputVal, setInputVal] = useState<string>('');
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const isMobile = useSelector( (state: RootState) => state.isMobile);
    const selectedLocation = useSelector((state: RootState) => state.selectedLocation);

    const mobileMenuTabStyle = (
        isOpen ? 'translateY(-54vh) translateX(50%)' : 'translateY(-18vh) translateX(50%)'
    );
    const desktopMenuTabStyle = (
        isOpen ? 'translateX(-24vw)' : 'translateX(0)'
    );

    const openMenu = () => {
        setIsSearching(false);
        setIsOpen(true);
    };
    const closeMenu = () => {
        setIsOpen(false); 
    };

    useEffect(() => {
        if(props.slug) {
            // console.log(props.slug)
            const entityID = props.featuredEntities.find((entity) => entity.id === props.slug)
            // for(let i = 0; i < props.featuredEntities.length; i++) {
                
            // }
        }
    }, [props.slug])

    return (
        <div className="ion-align-self-end menu-container" style={{ backgroundColor: isOpen && !isMobile ? '#fff' : 'transparent' }}>
            <SearchBar 
                inputVal={inputVal} 
                setInputVal={setInputVal} 
                setIsSearching={setIsSearching} 
                isSearching={isSearching} 
                featuredEntities={props.featuredEntities}
                selectedLocation={selectedLocation}
                openMenu={openMenu}
            />
            {isMobile ?
                <>
                    {selectedLocation ?
                        <MobileDrawer 
                            isOpen={isOpen}
                            closeMenu={closeMenu}
                            isSearching={isSearching}
                            isMobile={isMobile}
                            selectedLocation={selectedLocation}
                        />
                    :
                        null
                    }
                </>
            :
                <>
                    {selectedLocation ?
                        <SideMenu 
                            featuredEntities={props.featuredEntities}
                            isOpen={isOpen}
                            selectedLocation={selectedLocation}
                            isSearching={isSearching}
                            closeMenu={closeMenu}
                        />
                    :
                        null
                    }
                </>
            }
        </div>
    );
};

export default SearchPane;