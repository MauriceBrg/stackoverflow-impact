import { FormEvent, useEffect, useState } from 'react';
import './App.css';
import { getUserInfo } from './services/stackoverflow';

import { StackOverflowUserInfo } from './entities/stackoverflow';
import { UserProfile } from './components/userProfile';
import { TopNavigation } from './components/topNavigation';
import { Disclaimer } from './components/disclaimer';

const DEFAULT_USER_ID = 6485881 // Maurice


function App() {

  const [stackOverflowUserId, setStackOverflowUserId] = useState<number>(DEFAULT_USER_ID)

  const [stackOverflowUserInfo, setStackOverflowUserInfo] = useState<StackOverflowUserInfo | null>(null)

  useEffect(
    () => {
      getUserInfo(stackOverflowUserId).then(setStackOverflowUserInfo)
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

        </div>
      </main >
    </div >
  );
}

export default App;
