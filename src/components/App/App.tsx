import { useState } from 'react'
import CafeInfo from '../CafeInfo/CafeInfo'
import css from './App.module.css'
import type Votes from 'types/votes';
import type { VoteType } from 'types/votes';
import VoteOptions from '../VoteOptions/VoteOptions'
import VoteStats from '../VoteStats/VoteStats';
import Notification from '../Notification/Notification';

export default function App() {
  const [votes, setVotes] = useState<Votes>({ good: 0, neutral: 0, bad: 0})

  function handleVote(type: VoteType) {
    setVotes({
      ...votes,
      [type]: votes[type] + 1
    })
  }

  function resetVotes() {
    setVotes({good: 0, neutral: 0, bad: 0})
  }

  const totalVotes = votes.good + votes.neutral + votes.bad
  const positiveRate = totalVotes
  ? Math.round((votes.good / totalVotes) * 100)
  : 0

  const canReset = totalVotes > 0;

  return (
    <>
      <div className={css.app}>
         <CafeInfo />
         <VoteOptions onVote={handleVote} onReset={resetVotes} canReset={canReset}/>
         { totalVotes === 0 ? <Notification/> : <VoteStats votes={votes} totalVotes={totalVotes} positiveRate={positiveRate}/> }
      </div>
    </>
  )
}
