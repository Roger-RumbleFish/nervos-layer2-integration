import { AddressTranslator } from '../src/address';

describe('AddressTranslator', () => {
    test('ethAddressToCkbAddress() correctly transforms ethereum address to portal wallet address locked by ethereum key on Nervos Layer 1 testnet', async () => {
        const translator = new AddressTranslator();
        await translator.init('testnet');
        
        const ethAddress = '0x018332E7b64E01246BfC981C75f8f5A5B18115F0';
    
        const portalWalletLayer1CkbAddress = translator.ethAddressToCkbAddress(ethAddress);
    
        expect(portalWalletLayer1CkbAddress).toBe('ckt1q3uljza4azfdsrwjzdpea6442yfqadqhv7yzfu5zknlmtusm45hpuqgpsvew0djwqyjxhlycr36l3ad9kxq3tuqqlmmcjj');
    });

    test('getLayer2DepositAddress() throws friendly error when init() has not been called', async () => {
        const translator = new AddressTranslator();

        const ethAddress = '0x018332E7b64E01246BfC981C75f8f5A5B18115F0';

        try {
            await translator.getLayer2DepositAddress(ethAddress)
            expect(true).toBe(false);
        } catch (e: any) {
            expect(e.message).toBe('<AddressTranslator>._provider.config is empty. Did you call <AddressTranslator>.init() function?');
        }
    });

    test('getLayer2DepositAddress() correctly calculates Layer 2 deposit address secured by Omni Lock on Layer 1', async () => {
        const translator = new AddressTranslator();
        await translator.init('testnet');

        const ethAddress = '0xD173313A51f8fc37BcF67569b463abd89d81844f';

        const omniLockLayer2DepositAddress = await translator.getLayer2DepositAddress(ethAddress);
    
        expect(omniLockLayer2DepositAddress).toBe('ckt1q3g8qjuyaj6vfvftg0r6evnqmhtfzuwzrdxqhg2l83rfklg58ah3suprt8487pe4tzfpadgd3sw806f0wcxglpjkhhjfjhexhztrutwc4yqqqqq5qqqqqdqqqqqf6qqqqzjsqqqqhy0z4ehvactg6n9kyh7pjuyd3lkwcmfjt3ymfpwe00tghn5s483xjqqqqqgqqqqqxqqqqqp3qqqqqp6jr5923enw73q7hscjqnvxhv3leqlfahzccxwmkxcwhejrxmkqqy6qqqqqwq34n6nlqu643ys7k5xcc8rhayhhvry0settmeyetunt39379hvdzue38fgl3lphhnm826d5vw4a38vps38czwsfqqqqqqxqqgqqqqqzy48xe');
    });

    test('getConnectedWalletAddress() returns correct Ethereum address when private key wallet is used', async () => {
        const translator = new AddressTranslator();
        await translator.init('testnet');

        const ETH_ADDRESS = '0xd173313a51f8fc37bcf67569b463abd89d81844f';
        const PRIVATE_KEY = '0xd9066ff9f753a1898709b568119055660a77d9aae4d7a4ad677b8fb3d2a571e5';

        await translator.connectWallet(PRIVATE_KEY);

        expect(translator.getConnectedWalletAddress()).toBe(ETH_ADDRESS);
    });
});
