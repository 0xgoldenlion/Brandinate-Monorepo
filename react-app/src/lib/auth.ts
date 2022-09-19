// import { randomBytes } from '@stablelib/random'
// import { Ed25519Provider } from 'key-did-provider-ed25519'
// import { getResolver } from 'key-did-resolver'
// import { fromString, toString } from 'uint8arrays'
// import { DID } from 'dids'
import { EthereumAuthProvider } from '@ceramicnetwork/blockchain-utils-linking'
import { DIDSession } from 'did-session'
import { atom, useAtom } from 'jotai'
import { useCallback, useEffect } from 'react'

import { compose } from './graphql'

export type AuthStatus = 'pending' | 'loading' | 'failed'
export type AuthState = { status: 'done'; id: string } | { status: AuthStatus }

const authAtom = atom<AuthState>({ status: 'pending' })

const resources = ["kjzl6hvfrbw6c6iz705zvkkcrf3mhvk3lc13z1vnxq18mwmkon8y6bidicggvbc", "kjzl6hvfrbw6c9165gygecqama77d0t4283s5uzsrcj6wtldhqd9w7e4gofts9e"]
// const resolver = getResolver()

// export function randomSeed(): string {
//   return toString(randomBytes(32), 'base16')
// }

export function useAuth() {
  const [state, setState] = useAtom(authAtom)
  
  useEffect(() => {
    window.ethereum.on('accountsChanged', (accounts) => {
      // If user has locked/logout from MetaMask, this resets the accounts array to empty
      if (!accounts.length) {
        // logic to handle what happens once MetaMask is locked
        localStorage.removeItem('didsession')
        setState({ status: 'pending' })
        console.log('disconnected from metamask')
      }
    });
  }, [])

  const authenticate = useCallback(
    async () => {
      if (state.status === 'loading') {
        return
      }
      setState({ status: 'loading' })
      try {
        const ethProvider = window.ethereum
        const addresses = await ethProvider.enable()
        const authProvider = new EthereumAuthProvider(ethProvider, addresses[0])
        console.log('authProvider:', authProvider);

        const loadSession = async(authProvider: EthereumAuthProvider, resources: Array<string>):Promise<DIDSession> => {
          //IF WE USE THIS SNIPPET WE NEED TO CLEAN LOCAL STORAGE BEFORE CONNECTING AGAIN
          //WITH ANOTHER ACCOUNT. IF NOT WE'RE GONNA USE THE SAME SESSION NO MATTER WHICH
          //ACCOUNT WE'RE USING.

          let session
          // get a serialized session from local storage
          const sessionStr = localStorage.getItem('didsession')
          console.log('sessionStr:', sessionStr);
        
          if (sessionStr) {
            session = await DIDSession.fromSession(sessionStr)
          }
        
          if (!session || (session.hasSession && session.isExpired)) {
            session = await DIDSession.authorize(authProvider, { resources: resources})
            // store the serialized session in local storage
            localStorage.setItem('didsession', session.serialize())
          }
        
          return session

          // return await DIDSession.authorize(authProvider, { resources: resources})
        }

        const session = await loadSession(authProvider, compose.resources)

        const did = session.did
        await did.authenticate()

        compose.setDID(did)

        setState({ status: 'done', id: did.id })
      } catch (err) {
        console.warn('Authentication error', err)
        setState({ status: 'failed' })
      }
    },
    [state.status, setState]
  )

  // const reset = useCallback(() => {
  //   compose.setDID(new DID({ resolver }))
  //   setState({ status: 'pending' })
  // }, [setState])

  return [state, authenticate]
  // return [state, authenticate, reset]
}
