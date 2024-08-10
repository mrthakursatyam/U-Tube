export const API_KEY = 'AIzaSyA3sfkFJ3IDQ3n9-E1stkr2K56kuf5BZeA'
export const CLIENT_ID = '779892767507-ocb3d0e0f1c2dm4s7139jqg9beooi0g4.apps.googleusercontent.com'
export const Converter = (viewCount) => {
    return (
    viewCount >= 1_000_000_000 ? (viewCount / 1_000_000_000).toFixed(1) + 'b' :
    viewCount >= 1_000_000 ? (viewCount / 1_000_000).toFixed(1) + 'm' :
    viewCount >= 1_000 ? (viewCount / 1_000).toFixed(1) + 'k' :
    viewCount)
}