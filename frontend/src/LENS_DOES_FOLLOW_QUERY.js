export const LENS_DOES_FOLLOW_QUERY = `
	query DoesFollow($address: EthereumAddress!) {
		doesFollow(request: {
			followInfos: [
				{
					followerAddress: $address,
					profileId: "0x01"
				}
			]
		}) {
			followerAddress
			profileId
			follows
		}
	}
`;