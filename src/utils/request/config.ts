export const CONTENT_TYPES = {
  FORM: 'application/x-www-form-urlencoded',
  JSON: 'application/json',
  UPLOAD: 'multipart/form-data',
  DOWNLOAD: 'application/octet-stream'
}

export const common = {
  timeout: 20000,
  withCredentials: false
}
export const form = {
  headers: {
    'Content-Type': CONTENT_TYPES.FORM
  }
}

export const json = {
  headers: {
    'Content-Type': CONTENT_TYPES.JSON
  }
}
