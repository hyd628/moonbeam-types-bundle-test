import { typesBundlePre900 } from 'moonbeam-types-bundle';
import { ApiPromise, WsProvider } from '@polkadot/api';

// This script will listen to all MOVRs transfers (Substrate & Ethereum)

const main = async () => {
  // Define the provider
  const wsProvider = new WsProvider('wss://wss.api.moonbase.moonbeam.network');

  // Create the provider using Moonbeam types
  const polkadotApi = await ApiPromise.create({
    provider: wsProvider,
    typesBundle: typesBundlePre900 as any,
    /*types: {
      EthTransaction: 'LegacyTransaction',
      DispatchErrorModule: 'DispatchErrorModuleU8',
    },*/
  });

  // returns SignedBlock
  // returns Hash
  // testing blocks: 6601
  const testingBlock = 6601;
  const blockHash = await polkadotApi.rpc.chain.getBlockHash(testingBlock);
  console.log(blockHash.toString());
  // returns SignedBlock
  const signedBlock = await polkadotApi.rpc.chain.getBlock(blockHash.toString());
  console.log(signedBlock);

  //const apiAt = await polkadotApi.at(signedBlock.block.header.hash);
  //const allRecords = await apiAt.query.system.events();

  await polkadotApi.disconnect();
};

main();
