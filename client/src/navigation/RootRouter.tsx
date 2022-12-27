import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {observer} from "mobx-react-lite";
import UserStore from "../store/UserStore";
import LogoLoader from "../ui/atoms/LogoLoader";
import FallbackSuspense from "../ui/atoms/FallbackSuspense";
import FollowingInfoPage from "../pages/FollowingInfoPage";
import AnotherUserStore from "../store/AnotherUserStore";

const WelcomePage = React.lazy(() => import("../pages/WelcomePage"))
const HomePage = React.lazy(() => import("../pages/HomePage"))
const ProfilePage = React.lazy(() => import('../pages/ProfilePage'))
const UserPage = React.lazy(() => import("../pages/UserPage"))
const PageInDev = React.lazy(() => import("../pages/PageInDev"))
const TweetPage = React.lazy(() => import("../pages/TweetPage"))
const ProfileTweetsPage = React.lazy(() => import("../pages/ProfileTweetsPage"))
const RetweetsPage = React.lazy(() => import("../pages/ProfileRetweetsPage"));
const ProfileTweetsWithMedia = React.lazy(() => import("../pages/ProfileTweetsWithMedia"))
const ProfileLikedTweets = React.lazy(() => import("../pages/ProfileLikedTweetsPage"));
const BookmarksPage = React.lazy(() => import("../pages/BookmarksPage"));
const PasswordResetPage = React.lazy(() => import("../pages/PasswordResetPage"))
const CommentPage = React.lazy(() => import("../pages/CommentPage"));
const ExplorePage = React.lazy(() => import("../pages/ExplorePage"));
const SearchPage = React.lazy(() => import("../pages/SearchPage"));

const RootRouter = observer(() => {

    if (UserStore.isLoggedIn === undefined) return <LogoLoader/>

    return (
        <Routes>
            {UserStore.isLoggedIn ? <React.Fragment>
                <Route path="/" element={<Navigate to="/home"/>}/>
                <Route element={<FallbackSuspense><HomePage/></FallbackSuspense>} path="/home"/>
                <Route element={<FallbackSuspense><ExplorePage/></FallbackSuspense>} path="/explore"/>
                <Route element={<FallbackSuspense><SearchPage/></FallbackSuspense>} path="/search/tweets"/>
                <Route element={<FallbackSuspense><SearchPage/></FallbackSuspense>} path="/search/users"/>
                <Route element={<FallbackSuspense><BookmarksPage/></FallbackSuspense>} path="/bookmarks"/>
                <Route element={<FallbackSuspense><ProfilePage/></FallbackSuspense>} path={`/${UserStore.pseudonym}`}>
                    <Route path={`/${UserStore.pseudonym}`}
                           element={<FallbackSuspense><ProfileTweetsPage/></FallbackSuspense>}/>
                    <Route path={`/${UserStore.pseudonym}/retweets`}
                           element={<FallbackSuspense><RetweetsPage/></FallbackSuspense>}/>
                    <Route path={`/${UserStore.pseudonym}/media`}
                           element={<FallbackSuspense><ProfileTweetsWithMedia/></FallbackSuspense>}/>
                    <Route path={`/${UserStore.pseudonym}/likes`}
                           element={<FallbackSuspense><ProfileLikedTweets/></FallbackSuspense>}/>
                </Route>
                <Route path={`/${UserStore.pseudonym}/following`}
                       element={<FallbackSuspense><FollowingInfoPage pseudonym={UserStore.pseudonym}
                                                                     username={UserStore.username}/></FallbackSuspense>}/>
                <Route path={`/${UserStore.pseudonym}/followers`}
                       element={<FallbackSuspense><FollowingInfoPage pseudonym={UserStore.pseudonym}
                                                                     username={UserStore.username}/></FallbackSuspense>}/>
                <Route path={`/${UserStore.pseudonym}/status/:id`}
                       element={<FallbackSuspense><TweetPage/></FallbackSuspense>}/>
                <Route path={`/${UserStore.pseudonym}/comment/:id`}
                       element={<FallbackSuspense><CommentPage/></FallbackSuspense>}/>
                <Route path={`/${UserStore.pseudonym}/*`}
                       element={<Navigate to={`/${UserStore.pseudonym}`}/>}/>
                <Route path="/settings" element={<FallbackSuspense><PageInDev/></FallbackSuspense>}/>
                <Route path="/notifications" element={<FallbackSuspense><PageInDev/></FallbackSuspense>}/>
                <Route path="/messages" element={<FallbackSuspense><PageInDev/></FallbackSuspense>}/>
                {AnotherUserStore.anotherUserPseudonym && AnotherUserStore.anotherUserUsername && <React.Fragment>
                    <Route path={`/${AnotherUserStore.anotherUserPseudonym}`}
                           element={<FallbackSuspense><UserPage/></FallbackSuspense>}>
                        <Route path={`/${AnotherUserStore.anotherUserPseudonym}`}
                               element={<FallbackSuspense><ProfileTweetsPage/></FallbackSuspense>}/>
                        <Route path={`/${AnotherUserStore.anotherUserPseudonym}/retweets`}
                               element={<FallbackSuspense><RetweetsPage/></FallbackSuspense>}/>
                        <Route path={`/${AnotherUserStore.anotherUserPseudonym}/media`}
                               element={<FallbackSuspense><ProfileTweetsWithMedia/></FallbackSuspense>}/>
                        <Route path={`/${AnotherUserStore.anotherUserPseudonym}/likes`}
                               element={<FallbackSuspense><ProfileLikedTweets/></FallbackSuspense>}/>
                    </Route>
                    <Route path={`/${AnotherUserStore.anotherUserPseudonym}/status/:id`}
                           element={<FallbackSuspense><TweetPage/></FallbackSuspense>}/>
                    <Route path={`/${AnotherUserStore.anotherUserPseudonym}/comment/:id`}
                           element={<FallbackSuspense><CommentPage/></FallbackSuspense>}/>
                    <Route path={`/${AnotherUserStore.anotherUserPseudonym}/following`}
                           element={<FallbackSuspense><FollowingInfoPage
                               pseudonym={AnotherUserStore.anotherUserPseudonym}
                               username={AnotherUserStore.anotherUserUsername}/></FallbackSuspense>}/>
                    <Route path={`/${AnotherUserStore.anotherUserPseudonym}/followers`}
                           element={<FallbackSuspense><FollowingInfoPage
                               pseudonym={AnotherUserStore.anotherUserPseudonym}
                               username={AnotherUserStore.anotherUserUsername}/></FallbackSuspense>}/>
                    <Route path={`/${AnotherUserStore.anotherUserPseudonym}/*`}
                           element={<Navigate to={`/${AnotherUserStore.anotherUserPseudonym}`}/>}/>
                </React.Fragment>}
                <Route path="*" element={<FallbackSuspense><UserPage/></FallbackSuspense>}/>
            </React.Fragment> : <React.Fragment>
                <Route path="/" element={<FallbackSuspense><WelcomePage/></FallbackSuspense>}/>
                <Route path="password_reset" element={<FallbackSuspense><PasswordResetPage/></FallbackSuspense>}/>
                <Route path="*" element={<Navigate to="/" replace/>}/>
            </React.Fragment>
            }
        </Routes>
    );
});

export default RootRouter;