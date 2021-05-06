import { useContext, useEffect, useState } from 'react';

import { Button } from './components/Button';
import { MovieCard } from './components/MovieCard';

import { SideBar } from './components/SideBar';
// import { Content } from './components/Content';


import './styles/global.scss';


import './styles/content.scss';
import { GlobalContext, GlobalPovider } from './context/GlobalContext';
import { Content } from './components/Content';






export function App() {
 return (
    <GlobalPovider>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
        <SideBar/>
        <Content/>
    </div>

    </GlobalPovider>
    
  )
}