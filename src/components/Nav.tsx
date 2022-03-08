import React from 'react'
import styled from 'styled-components'
import { CurrentSection } from '../App'
import { useWindowSize } from '../hooks/useDimensions'
const chuck = require('../fonts/chuck.ttf')

interface NavProps {
  currentSection: CurrentSection
  handleNav: (section: CurrentSection) => void
}

interface NavBorderProps {
  width: number
  isFavourites: boolean
}

interface ContainerProps {
  width: number
}

interface NavTitle {
  active: boolean
}

const NavigationWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  align-items: center;
  padding-top: 5px;
`

const Navigation = styled.nav<ContainerProps>`
  max-width: 1000px;
  width: 100%;
  height: 50px;
  display: flex;
  box-sizing: border-box;
`

const NavBorder = styled.div<NavBorderProps>`
  position: absolute;
  max-width: 1000px;
  width: ${(p) => p.width}px;
  height: 50px;
  display: flex;
  transform: rotateY(${(p) => (p.isFavourites ? 180 : 0)}deg);
  transition: 0.5s ease-in-out;
`
// width: ${(p) => p.width}px;

const NavBorderElement1 = styled.div<NavBorderProps>`
  background-color: transparent;
  height: 50px;
  width: ${(p) => p.width / 2}px;
  min-width: 100px;
`
// transition: 0.5s ease-in-out;

const NavBorderElement2 = styled.div<NavBorderProps>`
  background-color: rgba(0, 0, 0, 0.35);
  height: 50px;
  width: ${(p) => p.width / 2}px;

  min-width: 100px;
  cursor: pointer;
  border-radius: 10px;
`
// transition: 0.5s ease-in-out;

const NavTitle1 = styled.div<NavTitle>`
  cursor: ${(p) => (p.active ? `` : `pointer`)};
  color: rgba(255, 255, 255, 1);
  height: 50px;
  width: 50%;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-grow: 1;
  font-family: chuck;
  src: url(${chuck}) format('ttf');
`

const NavTitle2 = styled.div<NavTitle>`
  color: rgba(255, 255, 255, 1);

  cursor: ${(p) => (p.active ? `` : `pointer`)};
  height: 50px;
  width: 50%;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-grow: 1;
  font-family: chuck;
  src: url(${chuck}) format('ttf');
`

export const Nav: React.FC<NavProps> = ({ currentSection, handleNav }) => {
  const { width: windowWidth } = useWindowSize()

  const containerWidth = windowWidth > 1680 ? 1680 : windowWidth
  return (
    <NavigationWrapper>
      <Navigation width={containerWidth}>
        <NavBorder
          isFavourites={currentSection === `favourites`}
          width={containerWidth}
        >
          <NavBorderElement1
            isFavourites={currentSection === `favourites`}
            width={containerWidth}
          ></NavBorderElement1>
          <NavBorderElement2
            isFavourites={currentSection === `favourites`}
            width={containerWidth}
          ></NavBorderElement2>
        </NavBorder>
        <NavTitle1
          active={currentSection !== `favourites`}
          onClick={() => handleNav(`main`)}
        >
          Main
        </NavTitle1>
        <NavTitle2
          active={currentSection !== `main`}
          onClick={() => handleNav(`favourites`)}
        >
          Favourites
        </NavTitle2>
      </Navigation>
    </NavigationWrapper>
  )
}
