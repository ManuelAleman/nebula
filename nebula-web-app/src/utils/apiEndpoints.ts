export const apiEndpoints = {
    FETCH_FILES: 'files/my',
    GET_CREDITS:  `users/credits`,
    TOGGLE_PUBLIC: (id:string) => `files/${id}/toggle-public`,
    DOWNLOAD_FILE: (id:string) => `files/download/${id}`,
    DELETE_FILE: (id:string) => `files/${id}`,
    UPLOAD_FILE: 'files/upload'
}