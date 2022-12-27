
export interface IFollowing {
    followers: string[];
    followersAmount: number;
    following: string[]
    followingAmount: number;
    isUserFollowing: boolean;
    refetch: () => void
}