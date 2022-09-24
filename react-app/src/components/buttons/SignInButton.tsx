import { useState, useEffect} from 'react'
import { useSignMessage, useConnect } from 'wagmi'
import { SiweMessage } from 'siwe'
import { useAuth } from '@/lib/auth'
import { useRouter } from 'next/router'

export function SignInButton({
    onSuccess,
    onError,
    children
  }: {
    onSuccess: (args: { address: string }) => void
    onError: (args: { error: Error }) => void
    children: React.ReactNode
  }) {
    const [siweState, setSiweState] = useState<{
      loading?: boolean
      nonce?: string
    }>({})
    const [state, authenticate] = useAuth();
    const { connectAsync, connectors, error, isLoading, pendingConnector } = useConnect()

    const Router = useRouter();
    const { from } = Router.query;
  
    const fetchNonce = async () => {
      try {
        const nonceRes = await fetch('/api/nonce')
        const nonce = await nonceRes.text()
        setSiweState((x) => ({ ...x, nonce }))
      } catch (error) {
        setSiweState((x) => ({ ...x, error: error as Error }))
      }
    }
  
    // Pre-fetch random nonce when button is rendered
    // to ensure deep linking works for WalletConnect
    // users on iOS when signing the SIWE message
    useEffect(() => {
      fetchNonce()
    }, [])
  
    const { signMessageAsync } = useSignMessage()
  
    const signIn = async () => {
      try {
        const { account: address, chain } = await connectAsync({ connector: connectors[0] })
        // @ts-ignore
        const authCeramic = await authenticate();
        const chainId = chain?.id
        if (!address || !chainId) return
  
        setSiweState((x) => ({ ...x, loading: true }))
        // Create SIWE message with pre-fetched nonce and sign with wallet
        const message = new SiweMessage({
          domain: window.location.host,
          address,
          statement: 'Welcome to BRANDINATE! Please sign up.',
          uri: window.location.origin,
          version: '1',
          chainId,
          nonce: siweState.nonce,
        })
        const signature = await signMessageAsync({
          message: message.prepareMessage(),
        })
  
        // Verify signature
        const verifyRes = await fetch('/api/verify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message, signature }),
        })
        if (!verifyRes.ok) throw new Error('Error verifying message')
  
        setSiweState((x) => ({ ...x, loading: false }))
        onSuccess({ address })
      } catch (error) {
        setSiweState((x) => ({ ...x, loading: false, nonce: undefined }))
        onError({ error: error as Error })
        fetchNonce()
      }
    }

    useEffect(() => {
      // @ts-ignore
      if (state.status === 'done') {
        // @ts-ignore
        from ? Router.replace(from) : Router.push('/catalog');
      }
      // @ts-ignore
    }, [state.status]);
  
    return (
      <button 
        disabled={!siweState.nonce || siweState.loading} 
        onClick={signIn}
      >
        {children}
      </button>
    )
  }