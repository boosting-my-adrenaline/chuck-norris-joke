import React, { useState } from 'react'
import styled from 'styled-components'
import { FavouritesContainer } from './components/Favourites.container'
import { MainContainer } from './components/Main.container'
import { Nav } from './components/Nav'
import { useDidMountEffect } from './hooks/useDidMountEffect'
import { useWindowSize } from './hooks/useDimensions'
import useLocalStorage from './hooks/useLocalStorage'
import { Joke } from './redux/types'
const bg = require('./static/bg.png')

const Gotham = require('./fonts/Gotham.otf')

export type CurrentSection = `main` | `favourites`

interface ContainerProps {
  width: number
}

interface SectionsContainerProps {
  width: number
  height: number
  isFavourites: boolean
}
interface WrapperProps {
  width: number
  height: number
}

const Wrapper = styled.div<WrapperProps>`
  width: ${(p) => p.width}px;
  height: ${(p) => p.height}px;
  background-image: url(${bg});
  box-sizing: border-box;
  background-position: top;
  background-size: cover;
`

const Container = styled.div<ContainerProps>`
  @import url('https://fonts.googleapis.com/css?family=Montserrat');

  min-height: 100vh;
  max-width: 1680px;
  width: ${(p) => p.width}px;
  margin: 0 auto;
  padding: 0;
  overflow: hidden;
  font-family: Monserat;
  src: url(${Gotham}) format('otf');
  font-size: 20px;
`

const SectionsContainer = styled.div<SectionsContainerProps>`
  width: ${(p) => p.width * 2}px;
  transform: translateX(${(p) => (p.isFavourites ? -50 : 0)}%);
  transition: 0.5s ease-in-out;
  display: flex;
  min-height: ${(p) => p.height}px;
  height: ${(p) => (p.isFavourites ? `100%` : p.height)}px;
`

const App: React.FC = () => {
  const [currentSection, setCurrentSection] = useState<CurrentSection>(`main`)

  const { width: windowWidth, height: windowHeight } = useWindowSize()

  const containerWidth = windowWidth > 1680 ? 1680 : windowWidth
  const containerHeight = windowHeight - 100

  const handleNav = (section: CurrentSection) => {
    try {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth',
      })
    } catch (error) {
      window.scrollTo(0, 0)
    }
    setCurrentSection(section)
  }

  // const [favourites, setFavourites] = useLocalStorage<Joke[]>(
  //   `favourites-jokes`,
  //   []
  // )
  // const [test, setTest] = useState(0)

  return (
    <Wrapper width={windowWidth} height={windowHeight}>
      <Container width={containerWidth}>
        <Nav currentSection={currentSection} handleNav={handleNav} />
        <SectionsContainer
          width={containerWidth}
          height={containerHeight}
          isFavourites={currentSection === `favourites`}
        >
          <MainContainer width={containerWidth} height={containerHeight} />
          <FavouritesContainer width={containerWidth} />
        </SectionsContainer>
      </Container>
    </Wrapper>
  )
}

export default App
