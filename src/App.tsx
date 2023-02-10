import React, { FormEvent, useEffect, useState } from 'react';
import './App.css';
import { getUserInfo } from './services/stackoverflow';

import '@stackoverflow/stacks'
import { StackOverflowUserInfo } from './entities/stackoverflow';
import { UserProfile } from './components/userProfile';



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

  function onInputCapture(event: FormEvent<HTMLInputElement>) {
    const target = event.target as typeof event.target & { value: string }
    const textValue: string = target.value.trim()
    const numberValue: number = Number(textValue)
    if (!isNaN(numberValue)) {
      setStackOverflowUserId(numberValue)
    }

  }

  return (
    <div>
      <header className='s-topbar'>
        <div className='s-topbar--container'>
          <span className='s-topbar--logo fs-title'>AWS @ StackOverflow | Community Impact</span>
          <form className='s-topbar--searchbar' autoComplete='off'>
            <div className='s-topbar--searchbar--input-group wmx50'>
              <input
                type="text"
                className='s-input s-input__search'
                placeholder="Input User Id, e.g. 6485881"
                pattern='^\d*$'
                onInputCapture={onInputCapture}
              ></input>
              <svg className='svg-icon iconSearch s-input-icon s-input-icon__search'>
                <path d="m18 16.5-5.14-5.18h-.35a7 7 0 1 0-1.19 1.19v.35L16.5 18l1.5-1.5ZM12 7A5 5 0 1 1 2 7a5 5 0 0 1 10 0Z"></path>
              </svg>
            </div>
          </form>
        </div>
      </header>
      <main className='d-flex mx-auto w100 wmx12'>
        <div className="d-grid mt16 g16">
          <div className="d-grid  grid__2 g16">
            <div className='grid--item'>
              <UserProfile userInfo={stackOverflowUserInfo}></UserProfile>
            </div>

            <div className='grid--item'>
              <p>
                <strong>Disclaimer:</strong>
                <ul>
                  <li>This is a community project that is neither affiliated with AWS nor StackOverflow</li>
                  <li>It uses the public <a href="https://api.stackexchange.com/">StackExchange API</a> to display data and link to StackOverflow.</li>
                </ul>
              </p>
            </div>

          </div>

        </div>
      </main >
    </div >
  );
}

export default App;
