import { Joke } from '../redux/types'
export const getRandomStartingJoke = () => {
  const jokes: Joke[] = [
    {
      id: `ebb41b5c-620f-459c-85cd-f87809afd454`,
      value: `Despite whatever Gene Simmons says, Chuck Norris IS Doctor Love.`,
    },
    {
      id: `61d2e455-4508-4ac8-bb04-7d68b65d143f`,
      value: `I used to question Chuck Norris like you but then I took a roundhouse kick to the face.`,
    },
    {
      id: `d966f93c-56c9-4fb3-b5ae-7a9d5f1d0d3b`,
      value: `Chuck Norris has a cameo in Armageddon, The day after tomorrow, 2012, and war of the worlds... as the same role.`,
    },
    {
      id: `dff06baf-0729-4c27-9d54-32d5c1280b37`,
      value: `If Chuck Norris were a country, his two main exports would be pain and death.`,
    },
    {
      id: `68dd098b-61fa-40a4-bcae-0bd3fd5ff209`,
      value: `Robin Hood was partially based on Chuck Norris, in that Norris would rob from the rich. But Robin Hood never roundhouse-kicked the poor. Or the rich, for that matter.`,
    },
    {
      id: `6a387314-08af-4a46-9b1f-07511baa00d4`,
      value: `Chuck Norris writes documents with unintentionally blank pages.`,
    },
    {
      id: `e68dc82b-9868-452d-a38b-aa13c3718810`,
      value: `Chuck Norris is the Chuck Norris of every sport. Except gay sports. Tom Cruise is the Tom Cruise of those.`,
    },
    {
      id: `aa1e9951-b30f-4df1-9668-c8da92054748
      abdef54b-4884-41ca-9766-0a511f648f1e`,
      value: `Ouija Boards have recently been re-designed to have 'CHUCK NORRIS' written in the center.`,
    },
  ]
  return jokes[Math.floor(Math.random() * jokes.length)]
}
