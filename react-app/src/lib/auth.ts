import { EthereumAuthProvider } from '@ceramicnetwork/blockchain-utils-linking'
import { DIDSession } from 'did-session'
import { atom, useAtom } from 'jotai'
import { useCallback, useEffect } from 'react'

import { compose } from './graphql'

export type AuthStatus = 'pending' | 'loading' | 'failed'
export type AuthState = { status: 'done'; id: string } | { status: AuthStatus }

const authAtom = atom<AuthState>({ status: 'pending' })

const resources = ["kjzl6hvfrbw6c6iz705zvkkcrf3mhvk3lc13z1vnxq18mwmkon8y6bidicggvbc", "kjzl6hvfrbw6c9165gygecqama77d0t4283s5uzsrcj6wtldhqd9w7e4gofts9e"]

export function useAuth() {
  const [state, setState] = useAtom(authAtom)

  useEffect(() => {
    window.ethereum.on('accountsChanged', () => {
      localStorage.removeItem('didsession')
      setState({ status: 'pending' })
      console.log('metamask changed accounts')
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

        const loadSession = async (authProvider: EthereumAuthProvider, resources: Array<string>): Promise<DIDSession> => {
          let session
          const sessionStr = localStorage.getItem('didsession')

          if (sessionStr) {
            session = await DIDSession.fromSession(sessionStr)
          }

          if (!session || (session.hasSession && session.isExpired)) {
            session = await DIDSession.authorize(authProvider, { resources: resources })
            localStorage.setItem('didsession', session.serialize())
          }

          return session
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

  return [state, authenticate]
}
