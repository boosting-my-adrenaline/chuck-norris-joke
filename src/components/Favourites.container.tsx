import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useActions } from '../hooks/useAction'
import { useDidMountEffect } from '../hooks/useDidMountEffect'
import useElementSize from '../hooks/useElementSize'
import useLocalStorage from '../hooks/useLocalStorage'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { Joke } from '../redux/types'

interface IProps {
  width: number
}
interface ContainerProps {
  width: number
}

interface GridProps {
  width: number
  isJustTwo: boolean
}

const Container = styled.div<ContainerProps>`
  width: ${(p) => p.width}px;
  max-width: ${(p) => p.width}px;
  min-height: 100%;
  box-sizing: border-box;
  padding: ${(p) => (p.width >= 600 ? `40px` : `15px`)};
`
const GridContainer = styled.div<GridProps>`
  // max-width: ${(p) => p.width - 40}px;
  display: grid;
  grid-template-columns: ${(p) =>
    p.width >= 1300
      ? 'repeat(3, 1fr )'
      : p.width >= 800
      ? 'repeat(2, 1fr)'
      : 'repeat(1, 1fr)'};
  gird-template-rows: max-content;
  gap: 20px;
  box-sizing: border-box;
`

const GridElement = styled.div`
  width: 100%;
  box-sizing: border-box;
  border-radius: 6px;
  padding: 10px 10px 10px 15px;
  display: grid;
  grid-template-columns: 1fr min-content;
  grid: 10px;
  text-align: justify;
  background-color: rgba(0, 0, 0, 0.35);
  color: rgba(255, 255, 255, 1);
`
const GridEmptyElement = styled.div`
  width: 100%;
  box-sizing: border-box;
  border-radius: 6px;
`

const FavouriteButton = styled.button`
  width: 44px;
  height: 44px;
  border-radius: 50px;
  margin-left: 10px;
  border: none;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  whitespace: normal;
  cursor: pointer;
  outline: none;
  background-color: rgb(248 113 113);
  transition: 0.2s ease-in-out;
  &:hover {
    background-color: whitesmoke;
  }
`
const ButtonContainer = styled.div`
  width: 100%;
  padding: 15px 0px 20px;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-end;
`

const EraseButton = styled.button`
  background-color: rgba(0, 0, 0, 0.35);
  color: rgba(255, 255, 255, 1);
  border-radius: 8px;
  padding: 0.75rem 2rem;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 16px;
  outline: none;
  box-sizing: border-box;
  border: none;
  transition: 0.2s ease-in-out;

  &:hover {
    background-color: rgba(0, 0, 0, 0.75);
  }

  &:active {
    transform: scale(0.95);
  }
`
const Div = styled.div`
  width: 100%;
  padding: 20px 5px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  color: white;
`

export const FavouritesContainer: React.FC<IProps> = ({ width }) => {
  const { favourites } = useTypedSelector((state) => state)
  const [favStorage, setFavStorage] = useLocalStorage<Joke[]>(`favourites`, [])

  useDidMountEffect(() => {
    setFavStorage((prev) => [...prev, ...favourites])
  }, [favourites])

  const { removeJokeFromFavourites, eraseFavourites } = useActions()

  // const [parentRef, { height: parentHeight, width: parentWidth }] = useElementSize()

  return (
    <Container width={width}>
      {favourites.length === 0 ? (
        <Div>No favourite jokes yet </Div>
      ) : (
        <>
          <ButtonContainer>
            <EraseButton
              onClick={() => {
                eraseFavourites()
                setFavStorage([])
              }}
            >
              Erase All - fav: {favStorage.length}
            </EraseButton>
          </ButtonContainer>
          <GridContainer width={width} isJustTwo={favourites.length === 2}>
            {[1].includes(favourites.length) && width >= 1300 && (
              <GridEmptyElement />
            )}
            {favourites.map((el) => (
              <GridElement key={el.id}>
                {el.value}
                <FavouriteButton
                  onClick={() => removeJokeFromFavourites(el.id)}
                >
                  <svg height={36} width={36} viewBox="0 0 512 512">
                    <path
                      stroke={`rgb(239 68 68)`}
                      fill={`#eee`}
                      d="M340.8 98.4c50.7 0 91.9 41.3 91.9 92.3 0 26.2-10.9 49.8-28.3 66.6L256 407.1 105 254.6c-15.8-16.6-25.6-39.1-25.6-63.9 0-51 41.1-92.3 91.9-92.3 38.2 0 70.9 23.4 84.8 56.8 13.7-33.3 46.5-56.8 84.7-56.8m0-15.4C307 83 276 98.8 256 124.8c-20-26-51-41.8-84.8-41.8C112.1 83 64 131.3 64 190.7c0 27.9 10.6 54.4 29.9 74.6L245.1 418l10.9 11 10.9-11 148.3-149.8c21-20.3 32.8-47.9 32.8-77.5C448 131.3 399.9 83 340.8 83z"
                    />
                  </svg>
                </FavouriteButton>
              </GridElement>
            ))}
          </GridContainer>
        </>
      )}
    </Container>
  )
}
