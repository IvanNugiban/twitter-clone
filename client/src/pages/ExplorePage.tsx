import React, {useRef, useState} from 'react';
import TrendingNow from "../ui/molecules/TrendingNow";
import DocumentTitle from "react-document-title";
import PageHeader from "../ui/molecules/PageHeader";
import SearchInput from "../ui/atoms/SearchInput";
import SearchPopover from "../ui/molecules/SearchPopover";
import ExploreTweets from "../ui/molecules/ExploreTweets";
import TransparentElement from "../ui/atoms/TransparentElement";

const ExplorePage = () => {

    const [searchText, setSearchText] = useState("");
    const [isPopoverActive, setPopoverActivity] = useState(false);
    const searchInputRef = useRef(null);

    const transparentElementRef = useRef(null);

    return (
        <React.Fragment>
            <DocumentTitle title="Explore / Twitter"/>
            <PageHeader content={<div><SearchInput ref={searchInputRef} onFocus={() => setPopoverActivity(true)} placeholder="Search Twitter" value={searchText} onChange={(e) => setSearchText(e.target.value)} setValue={setSearchText}/>
                <SearchPopover text={searchText} inputRef={searchInputRef} active={isPopoverActive}
                               closePopover={(e) => {
                                   if (e?.target === searchInputRef.current) return;
                                   setPopoverActivity(false)
                               }}/>
            </div>}/>
            <TrendingNow withBackground={false}/>
            <ExploreTweets transparentElementRef={transparentElementRef}/>
            <TransparentElement ref={transparentElementRef}/>
        </React.Fragment>
    );
};

export default ExplorePage;