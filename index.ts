import { createWalletClient, http } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { base } from 'viem/chains';

const SUPER_TOKEN_FACTORY_ADDRESS = '0xe20B9a24E958f6c65e89d1469e7f78D32f17Ec3F'; 

const factoryAbi = [
  {
    inputs: [
      { name: 'underlyingToken', type: 'address' },
      { name: 'upgradabilityByV1Provider', type: 'uint8' },
      { name: 'name', type: 'string' },
      { name: 'symbol', type: 'string' }
    ],
    name: 'createERC20Wrapper',
    outputs: [{ name: 'superToken', type: 'address' }],
    stateMutability: 'nonpayable',
    type: 'function'
  }
] as const;

interface DeployInput {
  underlyingTokenAddress: `0x${string}`;
  tokenName: string;
  tokenSymbol: string;
}

export async function deploySuperTokenWrapper(input: DeployInput) {
  const account = privateKeyToAccount((process.env.AGENT_PRIVATE_KEY || '0x...') as `0x${string}`);
  
  const walletClient = createWalletClient({
    account,
    chain: base,
    transport: http()
  });

  try {
    const txHash = await walletClient.writeContract({
      address: SUPER_TOKEN_FACTORY_ADDRESS,
      abi: factoryAbi,
      functionName: 'createERC20Wrapper',
      args: [
        input.underlyingTokenAddress,
        1, 
        input.tokenName,
        input.tokenSymbol
      ]
    });

    return {
      success: true,
      transactionHash: txHash,
      message: `Successfully initiated Super Token wrapper deployment for ${input.tokenSymbol}!`
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Deployment transaction failed.'
    };
  }
}
