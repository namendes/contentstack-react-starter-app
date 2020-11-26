/* eslint-disable import/no-anonymous-default-export */
const contentstack = require("contentstack")
console.log(process.env);
const Stack = contentstack.Stack({
  api_key: process.env.REACT_APP_APIKEY,
  delivery_token: process.env.REACT_APP_DELIVERY_TOKEN,
  environment: process.env.REACT_APP_ENVIRONMENT,
  region: process.env.REACT_APP_REGION ? process.env.REACT_APP_REGION : "us",
})
console.log(Stack);
export default {
  getEntryWithRef(ctUid, ref, locale) {
    return new Promise((resolve, reject) => {
      Stack.ContentType(ctUid)
        .Query()
        .language(locale)
        .includeReference(ref)
        .includeOwner()
        .toJSON()
        .find()
        .then(
          (result) => {
            console.log(result);
            resolve(result)
          },
          (error) => {
            reject(error)
          }
        )
    })
  },
  getEntry(ctUid, locale) {
    return new Promise((resolve, reject) => {
      Stack.ContentType(ctUid)
        .Query()
        .language(locale)
        .includeOwner()
        .toJSON()
        .find()
        .then(
          (result) => {
            resolve(result)
          },
          (error) => {
            reject(error)
          }
        )
    })
  },
  getSpecificEntry(ctUid, entryUrl, locale) {
    return new Promise((resolve, reject) => {
      const blogQuery = Stack.ContentType(ctUid)
        .Query()
        // .language(locale)
        .includeOwner()
        .toJSON()
      const data = blogQuery.where("url", `${entryUrl}`).find()
      data.then(
        (result) => {
          resolve(result[0])
        },
        (error) => {
          reject(error)
        }
      )
    })
  },
  getSpecificEntryWihtRef(ctUid, entryUrl, ref, locale) {
    return new Promise((resolve, reject) => {
      const blogQuery = Stack.ContentType(ctUid)
        .Query()
        .language(locale)
        .includeReference(ref)
        .includeOwner()
        .toJSON()
      const data = blogQuery.where("url", `${entryUrl}`).find()
      data.then(
        (result) => {
          resolve(result[0])
        },
        (error) => {
          reject(error)
        }
      )
    })
  },
}
