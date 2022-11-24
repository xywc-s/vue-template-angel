export const ContentTypes = {
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
    'Content-Type': ContentTypes.FORM
  }
}

export const json = {
  headers: {
    'Content-Type': ContentTypes.JSON
  }
}
