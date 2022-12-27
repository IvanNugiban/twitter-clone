import React, {useRef, useState} from 'react';
import DocumentTitle from "react-document-title";
import PageHeader from "../ui/molecules/PageHeader";
import H3Title from "../ui/atoms/Typography/H3Title";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import useWindowDimensions from "../hooks/useWindowDemensions";
import FallbackSuspense from "../ui/atoms/FallbackSuspense";
import {useMutation, useQuery} from "@apollo/client";
import {GET_FOllOWING_AND_FOLLOWERS_AMOUNT} from "../graphql/queries/following";
import UserStore from "../store/UserStore";
import {observer} from "mobx-react-lite";
import CenteredLoader from "../ui/atoms/CenteredLoader";
import HomeTweets from "../ui/molecules/HomeTweets";
import Alert from "../ui/atoms/Alert";
import {useTheme} from "styled-components";
import Popover from "../ui/molecules/Popover";
import HomeOptions from "../ui/atoms/HomeOptions";
import TransparentElement from "../ui/atoms/TransparentElement";
import {CREATE_TWEET} from "../graphql/mutations/tweets";
import TweetService from "../services/tweetService";
import ProfileTweetsStore from "../store/ProfileTweetsStore";
import Loader from "../ui/atoms/Loader";

const TweetCreator = React.lazy(() => import("../ui/organism/TweetCreator"))

const HomePage = observer(() => {

    const {width} = useWindowDimensions();
    const {data, loading, error} = useQuery(GET_FOllOWING_AND_FOLLOWERS_AMOUNT, {
        variables: {pseudonym: UserStore.pseudonym}
    });
    const {colors} = useTheme();
    const [isHomeOptionsActive, setHomeOptionsState] = useState(false);
    const optionsRef = useRef(null);
    const [sortTypeInformation, setSortTypeInformation] = useState<undefined | string>(undefined)
    const transparentElementRef = useRef<HTMLDivElement>(null)
    const [createTweet, {loading: tweetCreateLoading, error: tweetCreateError}] = useMutation(CREATE_TWEET)
    

    return (
        <React.Fragment>
            <PageHeader content={<H3Title>Home</H3Title>}
                        options={<React.Fragment>
                            <button ref={optionsRef} onClick={() => setHomeOptionsState(true)}><FontAwesomeIcon
                                color={colors.black}
                                fontSize="1.2rem" icon={solid("sliders")}/></button>
                            <Popover parentRef={optionsRef}
                                     top={document.documentElement.style.fontSize > "16px" ? 290 : 260} left={-250}
                                     maxWidth="300px" arrowPosition="top"
                                     isActive={isHomeOptionsActive} closePopover={() => setHomeOptionsState(false)}
                                     body={<HomeOptions closeOptions={(sortType) => {
                                         setSortTypeInformation(sortType === "latest" ? "You’re seeing latest Tweets as they happen" : "You’re back Home, seeing top Tweets first");
                                         setTimeout(() => setSortTypeInformation(undefined), 3000)
                                         setHomeOptionsState(false)
                                     }}/>}/>
                        </React.Fragment>}/>
            <DocumentTitle title="Home / Twitter"/>
            {width > 500 && <FallbackSuspense><TweetCreator successText="Tweet created!"
                                                            callback={async (tweetText, media, gif) => {
                                                                const result = await TweetService.createTweet(createTweet, {
                                                                    text: tweetText,
                                                                    media,
                                                                    gif
                                                                });
                                                                if (result) ProfileTweetsStore.reset();
                                                                return result;
                                                            }} buttonText="Tweet" inputPlaceholder="What's happening?"/></FallbackSuspense>}
            {loading ? <CenteredLoader/> : <HomeTweets transparentElementRef={transparentElementRef}
                                                       followingAmount={data.getFollowingData.followingAmount}/>}
            {error && <Alert text={error.message} interval={3000}/>}
            {sortTypeInformation && <Alert text={sortTypeInformation} interval={3000}/>}
            <TransparentElement ref={transparentElementRef}/>
            {tweetCreateLoading && <Loader/>}
            {tweetCreateError && <Alert text={tweetCreateError.message} interval={3000}/>}
        </React.Fragment>
    );
});

export default HomePage;