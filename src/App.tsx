import { FormEvent, useEffect, useState } from 'react';
import './App.css';
import { getAwsAnswerSummaries, getUserInfo } from './services/stackoverflow';

import { StackOverflowAnswerSummary, StackOverflowUserInfo } from './entities/stackoverflow';
import { UserProfile } from './components/userProfile';
import { TopNavigation } from './components/topNavigation';
import { Disclaimer } from './components/disclaimer';
import { AnswerList } from './components/answers';

const DEFAULT_USER_ID = 6485881 // Maurice


function App() {

  const [stackOverflowUserId, setStackOverflowUserId] = useState<number>(DEFAULT_USER_ID)

  const [stackOverflowUserInfo, setStackOverflowUserInfo] = useState<StackOverflowUserInfo | null>(null)
  const [stackOverflowAnswerSummaries, setStackOverflowAnswerSummaries] = useState<StackOverflowAnswerSummary[]>([])

  useEffect(
    () => {
      getUserInfo(stackOverflowUserId).then(setStackOverflowUserInfo)
      getAwsAnswerSummaries(stackOverflowUserId).then((summaries) => {
        setStackOverflowAnswerSummaries(summaries)
      })
    }, [stackOverflowUserId]
  )

  useEffect(
    () => {
      console.log(stackOverflowUserId)
    }, [stackOverflowUserId]
  )

  function searchInputHandler(event: FormEvent<HTMLInputElement>) {
    const target = event.target as typeof event.target & { value: string }
    const textValue: string = target.value.trim()
    const numberValue: number = Number(textValue)
    if (!isNaN(numberValue)) {
      setStackOverflowUserId(numberValue)
    }

  }

  return (
    <div>
      <TopNavigation searchInputHandler={searchInputHandler}></TopNavigation>
      <main className='d-flex mx-auto w100 wmx12'>
        <div className="d-grid mt16 g16">
          <div className="d-grid  grid__2 g16">
            <div className='grid--item'>
              <UserProfile userInfo={stackOverflowUserInfo}></UserProfile>
            </div>

            <div className='grid--item'>
              <Disclaimer></Disclaimer>
            </div>

          </div>
          <div className=''>
            <AnswerList answerSummaries={stackOverflowAnswerSummaries}></AnswerList>
          </div>

        </div>
      </main >
    </div >
  );
}

export default App;
