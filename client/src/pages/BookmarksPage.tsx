import React, {useEffect, useRef, useState} from 'react';
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";
import {useMutation, useQuery} from "@apollo/client";
import UserStore from "../store/UserStore";
import useInfinityScroll from "../hooks/useInfinityScroll";
import SubTitle from "../ui/atoms/Typography/SubTitle";
import Paragraph from "../ui/atoms/Typography/Paragraph";
import Button from "../ui/atoms/Button";
import CenteredLoader from "../ui/atoms/CenteredLoader";
import {ITweet} from "../types/interfaces/ITweet";
import Tweet from "../ui/organism/Tweet";
import TransparentElement from "../ui/atoms/TransparentElement";
import BookmarksStore from "../store/BookmarksStore";
import styled, {useTheme} from "styled-components";
import {GET_BOOKMARKS} from "../graphql/queries/tweets";
import PageHeader from "../ui/molecules/PageHeader";
import H3Title from "../ui/atoms/Typography/H3Title";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import Popover from "../ui/molecules/Popover";
import H6Title from "../ui/atoms/Typography/H6Title";
import PopUp from "../ui/molecules/PopUp";
import DocumentTitle from "react-document-title";
import {CLEAR_ALL_BOOKMARKS} from "../graphql/mutations/bookmarks";
import bookmarksImage from "../assets/bookmarks.png";

const NoBookmarksMessage = styled.div`
  margin: 20px auto;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  width: 300px;
`

const ClearAllBookmarks = styled(H6Title)`
  color: ${({theme}) => theme.colors.danger_red};
  text-align: center;
  cursor: pointer;
`

const BookmarksDeletionPopUp = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
  padding: 40px 20px 20px 10px;
`

const BookmarksPage = observer(() => {

    const {data, loading, error} = useQuery(GET_BOOKMARKS, {
        variables: {
            ProfileTweetsData: {
                limit: BookmarksStore.limit,
                initialLimit: BookmarksStore.initialLimit,
                userPseudonym: UserStore.pseudonym
            }
        }
    })

    const [clearAllBookmarks, {loading: clearingBookmarksLoading, client}] = useMutation(CLEAR_ALL_BOOKMARKS);


    const navigate = useNavigate();
    const transparentElementRef = useRef(null);
    const {colors} = useTheme();
    const [isDeletionActive, setDeletionState] = useState(false);
    const [isDeletionPopUpActive, setDeletionPopUpState] = useState(false);
    const ellipsisRef = useRef(null);

    useEffect(() => {
        if (!data?.getBookmarks?.tweets) return;
        BookmarksStore.setBookmarks(data.getBookmarks.tweets);
    }, [data])

    useInfinityScroll(data?.getBookmarks?.hasMore, BookmarksStore.limit, BookmarksStore.initialLimit, () => {
        BookmarksStore.increaseLimit();
    }, loading, transparentElementRef.current, [BookmarksStore.bookmarks, BookmarksStore.limit])

    return (
        <React.Fragment>
            <DocumentTitle title="Bookmarks / Twitter"/>
            {(loading || clearingBookmarksLoading) && <CenteredLoader/>}
            <PageHeader options={BookmarksStore.bookmarks.length > 0 && <React.Fragment>
                <button onClick={() => setDeletionState(true)}>
                    <FontAwesomeIcon ref={ellipsisRef} color={colors.black}
                                     icon={solid("ellipsis")}/>
                </button>
                <Popover parentRef={ellipsisRef} width="200px" left={-170} top={100} arrowPosition="top"
                         isActive={isDeletionActive} closePopover={() => setDeletionState(false)}
                         body={<span onClick={() => {
                             setDeletionState(false);
                             setDeletionPopUpState(true);
                         }}><ClearAllBookmarks>Clear all bookmarks</ClearAllBookmarks></span>}/>
            </React.Fragment>} subTitle={`@${UserStore.pseudonym}`} content={<H3Title>Bookmarks</H3Title>}/>
            {error || !data?.getBookmarks?.tweets && !loading ? <NoBookmarksMessage>
                <img src={bookmarksImage} alt="Bookmarks"/>
                <SubTitle>Save Tweets for later</SubTitle>
                <Paragraph>Don’t let the good ones fly away! Bookmark Tweets to easily find them again in the
                    future.</Paragraph>
            </NoBookmarksMessage> : BookmarksStore.bookmarks.map((tweet: ITweet) => <Tweet key={tweet.id}
                                                                                           onClick={() => navigate(`/${tweet.userRef}/status/${tweet.id}`)} {...tweet} />)}
            <TransparentElement ref={transparentElementRef}/>
            {isDeletionPopUpActive &&
                <PopUp withPadding={false} height="280px" width="320px" closePopUp={() => setDeletionPopUpState(false)}><BookmarksDeletionPopUp>
                    <H3Title>Clear all Bookmarks?</H3Title>
                    <Paragraph>This can’t be undone and you’ll remove all Tweets you’ve added to your
                        Bookmarks. </Paragraph>
                    <Button onClick={() => {
                        setDeletionPopUpState(false);
                        BookmarksStore.reset();
                        clearAllBookmarks();
                        client.resetStore();
                    }} type="danger">Clear</Button>
                    <Button onClick={() => setDeletionPopUpState(false)}>Cancel</Button>
                </BookmarksDeletionPopUp></PopUp>}
        </React.Fragment>
    );
});

export default BookmarksPage;