import { faCircleXmark, faMagnifyingGlass, faSpinner } from "@fortawesome/free-solid-svg-icons";
import HeadlessTippy from '@tippyjs/react/headless';
import classNames from "classnames/bind";
import { useState, useEffect, useRef } from "react";
import AccountItem from "~/components/AccounteItem";
import { Wrapper as PopperWrapper } from '~/components/Popper';
import styles from './Search.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Search() {
    const [searchValue, setSearchValue] = useState('');
    const inputSearch = useRef();
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(true);
    const [loading, setLoading] = useState(false)

    const handleClear = () => {
        setSearchValue('');
        setSearchResult([])
        inputSearch.current.focus()
    }

    const handleHideResult = () => {
        setShowResult(false)
    }

    const cx = classNames.bind(styles);

    useEffect(() => {
        if (searchValue.trim() === '') {
            setSearchResult([])
            return;
        }

        setLoading(true);

        fetch(`https://tiktok.fullstack.edu.vn/api/users/search?q=${encodeURIComponent(searchValue)}&type=less`)
            .then(data => data.json())
            .then(res => {
                setSearchResult(res.data)
                setLoading(false)
            })
            .catch(
                setLoading(false)
            )


    }, [searchValue])

    return (
        <HeadlessTippy
            interactive
            visible={showResult && searchResult.length > 0}
            render={attrs => (
                <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                    <PopperWrapper>
                        <h4 className={cx('search-title')}>
                            Account
                        </h4>
                        {searchResult.map(result => <AccountItem key={result.id} data={result} />)}

                    </PopperWrapper>
                </div>
            )}

            onClickOutside={handleHideResult}

        >
            <div className={cx('search')}>
                <input
                    ref={inputSearch}
                    type="text"
                    placeholder="Search accounts and videos"
                    spellCheck={false}
                    value={searchValue}
                    onChange={e => setSearchValue(e.target.value)}
                    onFocus={() => setShowResult(true)}
                />

                {!!searchValue && !loading && (
                    <button
                        className={cx('clear')}
                        onClick={handleClear}
                    >
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </button>
                )}
                {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}
                <button className={cx('search-btn')}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
            </div>
        </HeadlessTippy>
    );
}

export default Search;