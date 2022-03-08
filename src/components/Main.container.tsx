import React, { useEffect, useState } from 'react'
import { useActions } from '../hooks/useAction'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { Joke } from './Joke'
import styled from 'styled-components'
import { useDidMountEffect } from '../hooks/useDidMountEffect'
import { useWindowSize } from '../hooks/useDimensions'
import useElementSize from '../hooks/useElementSize'

interface IProps {
  width: number
  height: number
}

interface WrapperProps {
  width: number
  height: number
}

interface MainTableProps {
  isMobile: boolean
  height: number
}

interface ButtonProps {
  active: boolean
}

const Container = styled.div<WrapperProps>`
  width: ${(p) => p.width}px;
  max-width: ${(p) => p.width}px;
  height: 100%;
  min-height: ${(p) => p.height}px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 0;
  box-sizing: content-box;
`

const MainTable = styled.div<MainTableProps>`
  max-width: 500px;
  box-sizing: content-box;
  min-height: ${(p) => (p.isMobile ? p.height - 200 + `px` : ``)};
  padding: ${(p) => (p.isMobile ? `130px 6px 10px` : `50px`)};
  width: 80%;
  display: flex;
  justify-content: ${(p) => (p.isMobile ? `space-between` : `center`)};
  flex-flow: column wrap;
  gap: 20px;
  border-radius: 10px;
  // border: ${(p) => (p.isMobile ? `` : `1px solid #009efa`)};
  background-color: ${(p) => (p.isMobile ? `` : `rgb(12 74 110)`)};
  box-shadow: ${(p) =>
    p.isMobile ? `` : `2px 16px 20px 5px rgb(12, 64, 95, 0.7)`};
`

const ButtonsBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const Buttons = styled.div`
  width: 100%;
  display: flex;
  justify-content: evenly;
  gap: 10px;
`

const Button = styled.button<ButtonProps>`
  width: 50%;
  border-radius: 8px;
  padding: 0.75rem 0.2rem;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 16px;
  font-family: 'Gotham';
  src: url(${'../fonts/Gotham.otf'}) format('otf');
  border: ${(p) =>
    p.active ? ` 1px solid rgba(255,255,255,0.9)` : `1px solid transparent`};
  background-color: ${(p) =>
    p.active ? `rgba(0, 0, 0, 0.55)` : `rgba(0, 0, 0, 0.35)`};
  color: white;
  &:hover {
    background-color: rgba(0, 0, 0, 0.75);
  }

  &:active {
    transform: scale(0.97);
  }
`

const FavouriteButton = styled.button<ButtonProps>`
  width: 100%;
  border: ${(p) =>
    p.active ? ` 1px solid rgba(255,255,255,0.9)` : `1px solid transparent`};

  color: rgba(255, 255, 255, 1);
  border-radius: 8px;
  padding: 0.75rem 0.2rem;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 16px;
  transition: 0.175s ease-in-out;
  background-color: ${(p) =>
    p.active ? `rgba(0, 0, 0, 0.55)` : `rgba(0, 0, 0, 0.35)`};
  &:hover {
    background-color: rgba(0, 0, 0, 0.75);
  }

  &:active {
    transform: scale(0.97);
  }
`

export const MainContainer: React.FC<IProps> = ({ width, height }) => {
  const { joke, loading, errorMessage, favourites } = useTypedSelector(
    (state) => state
  )
  const {
    fetchJokesStart: loadJoke,
    addJokeToFavourites,
    removeJokeFromFavourites,
  } = useActions()

  const { width: windowWidth } = useWindowSize()

  const [autoLoad, setAutoLoad] = useState(false)

  const handleAutoLoad = () => setAutoLoad((prev) => !prev)

  const handleLoad = () => {
    setAutoLoad(false)
    loadJoke()
  }
  const isFavourite = favourites.filter((el) => el.id === joke.id).length > 0

  const handleClick = () => {
    if (!isFavourite) {
      addJokeToFavourites(joke.id)
    } else {
      removeJokeFromFavourites(joke.id)
    }
  }

  useDidMountEffect(() => {
    if (!autoLoad) {
      return
    }
    loadJoke()

    let id = setInterval(() => {
      loadJoke()
    }, 3000)

    return () => {
      clearTimeout(id)
    }
  }, [autoLoad])

  const [parentRef, { height: parentHeight }] = useElementSize()

  return (
    <Container width={width} height={height} ref={parentRef}>
      <MainTable isMobile={windowWidth <= 600} height={parentHeight}>
        {<Joke id={joke.id} value={joke.value} onClick={() => {}} />}
        <ButtonsBlock>
          <FavouriteButton active={isFavourite} onClick={handleClick}>
            To Favourites
          </FavouriteButton>

          <Buttons>
            <Button active={autoLoad} onMouseDown={handleAutoLoad}>
              Auto Slide
            </Button>
            <Button active={loading && !autoLoad} onMouseDown={handleLoad}>
              Get Another
            </Button>
          </Buttons>
        </ButtonsBlock>
      </MainTable>
    </Container>
  )
}
