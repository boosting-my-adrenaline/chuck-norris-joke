import React from 'react'
import styled from 'styled-components'

const SFUITextBold = require('../fonts/SFUIText-Bold.ttf')

interface IProps {
  id: string
  value: string
  onClick: () => void
}

const Container = styled.div`
  min-height: 200px;
  text-align: justify;
  text-align: justify;
  overflow: hidden;
  color: white
`

const Span = styled.span`
 @import url("https://fonts.googleapis.com/css2?family=Pangolin&display=swap");

 font-family: Pangolin;
  color: white;
  font-weight: 700;
`

export const Joke: React.FC<IProps> = ({ id, value, onClick }) => {
  const text = value.split(` `).map((el, i) => {
    if (el.includes(`Norri`) || el.includes(`Chuck`)) {
      return (
        <Span key={el + i}>
          {el} {` `}
        </Span>
      )
    } else return el + ` `
  })

  return (
    <Container key={id} onClick={onClick}>
      {text}
    </Container>
  )
}
