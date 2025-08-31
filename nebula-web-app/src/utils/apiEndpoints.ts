export const apiEndpoints = {
    FETCH_FILES: 'files/my',
    GET_CREDITS:  `users/credits`,
    TOGGLE_PUBLIC: (id:string) => `files/${id}/toggle-public`,
    DOWNLOAD_FILE: (id:string) => `files/download/${id}`,
    DELETE_FILE: (id:string) => `files/${id}`,
    UPLOAD_FILE: 'files/upload',
    VERIFY_PAYMENT: 'payments/verify-payment',
    CREATE_CHECKOUT: 'payments/create-checkout',
    GET_TRANSACTIONS: 'transactions/my-transactions',
    PUBLIC_FILE_VIEW: (id: string) => `files/public/${id}`,
}