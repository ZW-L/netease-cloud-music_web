// homeStatic
export const homeSinger = state => state.homeStatic.homeSinger
export const homeHoster = state => state.homeStatic.homeHoster

// toplist
export const toIdx = state => state.toplist.toIdx
export const featureRank = state => state.toplist.detail.featureRank
export const globalRank = state => state.toplist.detail.globalRank

// play
export const nowPlay = state => state.play.nowPlay
export const playlist = state => state.play.playlist

// settings
export const isShowAboutSite = state => state.isShowAboutSite

/* export const playMode = state => state.playMode;

export const voice = state => state.voice;

export const isBarLock = state => state.isBarLock; */
