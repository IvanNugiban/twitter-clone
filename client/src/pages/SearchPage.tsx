import React, {useEffect, useRef, useState} from 'react';
import DocumentTitle from "react-document-title";
import SearchInput from "../ui/atoms/SearchInput";
import SearchPopover from "../ui/molecules/SearchPopover";
import {useLocation, useNavigate, useSearchParams} from "react-router-dom"
import ProfileNavbar from "../ui/molecules/ProfileNavbar";
import TransparentElement from "../ui/atoms/TransparentElement";
import SearchPageTweets from "../ui/molecules/SearchPageTweets";
import SearchPageUsers from "../ui/molecules/SearchPageUsers";
import Alert from "../ui/atoms/Alert";
import styled from "styled-components";
import H5Title from "../ui/atoms/Typography/H5Title";
import SearchStore from "../store/SearchStore";
import PageHeader from "../ui/molecules/PageHeader";

const ErrorMessage = styled(H5Title)`
  text-align: center;
  margin-top: 30px;
`



const SearchPage = () => {

    const [searchParams] = useSearchParams()
    const searchRequest = searchParams.get("q");
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState(searchRequest || "");
    const [isPopoverActive, setPopoverActivity] = useState(false);
    const searchInputRef = useRef(null);
    const transparentElementRef = useRef(null);
    const {pathname} = useLocation();
    const [searchQueryErrorState, setSearchQueryErrorState] = useState(false);


    useEffect(() => {
        SearchStore.reset();
        setSearchQueryErrorState(false);
        if (!searchRequest || searchRequest === "") {
            setSearchQueryErrorState(true);
        }
    }, [searchRequest])


    return (
        <React.Fragment>
            <DocumentTitle title="Explore / Twitter"/>
            <PageHeader
                content={<div><SearchInput onKeyUp={(e) => {
                    if (e.key === "Enter") {
                        navigate(`/search/tweets?q=${searchText}`)
                        setPopoverActivity(false);
                    }
                }
                }
                                           ref={searchInputRef}
                                           onFocus={() => setPopoverActivity(true)}
                                           placeholder="Search Twitter" value={searchText}
                                           onChange={(e) => setSearchText(e.target.value)}
                                           setValue={setSearchText}/>
                    <SearchPopover text={searchText} inputRef={searchInputRef} active={isPopoverActive}
                                   closePopover={(e) => {
                                       if (e?.target === searchInputRef.current) return;
                                       setPopoverActivity(false)
                                   }}/>
                </div>}/>
            <ProfileNavbar items={[{
                text: "Tweets",
                pathname: `/search/tweets?q=${searchRequest}`,
                isActive: pathname.startsWith("/search/tweets")
            }, {
                text: "People",
                pathname: `/search/users?q=${searchRequest}`,
                isActive: pathname.startsWith("/search/users")
            }]}/>
            {searchQueryErrorState ?
                <ErrorMessage>Something went wrong</ErrorMessage> : pathname.startsWith("/search/tweets") ?
                    <SearchPageTweets request={searchRequest!} transparentElementRef={transparentElementRef}/> :
                    <SearchPageUsers request={searchRequest!} transparentElementRef={transparentElementRef}/>}
            <TransparentElement ref={transparentElementRef}/>
            {searchQueryErrorState && <Alert text="This is an invalid search query. Please try a different one."
                                             interval={3000}/>}
        </React.Fragment>
    );
};

export default SearchPage;