import { FormEvent } from "react"

export const TopNavigation = (props: { searchInputHandler(event: FormEvent<HTMLInputElement>): void }) => {
    return <header className='s-topbar'>
        <div className='s-topbar--container'>
            <span className='s-topbar--logo fs-title'>AWS @ StackOverflow | Community Impact</span>
            <form className='s-topbar--searchbar' autoComplete='off'>
                <div className='s-topbar--searchbar--input-group wmx50'>
                    <input
                        type="text"
                        className='s-input s-input__search'
                        placeholder="Input User Id, e.g. 6485881"
                        pattern='^\d*$'
                        onInputCapture={props.searchInputHandler}
                    ></input>
                    <svg className='svg-icon iconSearch s-input-icon s-input-icon__search'>
                        <path d="m18 16.5-5.14-5.18h-.35a7 7 0 1 0-1.19 1.19v.35L16.5 18l1.5-1.5ZM12 7A5 5 0 1 1 2 7a5 5 0 0 1 10 0Z"></path>
                    </svg>
                </div>
            </form>
        </div>
    </header>
}
