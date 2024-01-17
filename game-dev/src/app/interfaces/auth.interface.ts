export interface SignInReqI {
    login: string;
    password: string;
}

export interface UserReqI {
    hasError: boolean,
    error: string,
    total: number,
    data: UserInfoI[],
}

export interface UserSingleI {
    userId: number,
    userName: string,
    userAvatar: string,
    userRole: string
}

export interface UserInfoI {
   userInfo: UserSingleI,
   tokens: {
    token: string,
    refreshToken: string,
   }
}