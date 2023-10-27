
export function useCurrencyLink(selectedClient: string) {
  const ethNativeCurrencyLink = "https://www.coingecko.com/coins/ethereum"
  const maticNativeCurrencyLink = "https://www.coingecko.com/en/coins/polygon"
  const avalancheNativeCurrencyLink = "https://www.coingecko.com/coins/avalanche"
  const metisNativeCurrencyLink = "https://www.coingecko.com/coins/metis-token"
  const bscNativeCurrencyLink = "https://www.coingecko.com/coins/binancecoin"
  const filecoinNativeCurrencyLink = "https://www.coingecko.com/coins/filecoin"
  const fantomNativeCurrencyLink = "https://www.coingecko.com/coins/fantom"
  const celoNativeCurrencyLink = "https://www.coingecko.com/coins/celo"
  const moonbeamNativeCurrencyLink = "https://www.coingecko.com/coins/moonbeam"
  const gnosisNativeCurrencyLink = "https://www.coingecko.com/en/coins/xdai"

  const nativeCurrencyLinks = {
    homestead: ethNativeCurrencyLink,
    matic: maticNativeCurrencyLink,
    optimism: ethNativeCurrencyLink,
    arbitrum: ethNativeCurrencyLink,
    base: ethNativeCurrencyLink,
    linea: ethNativeCurrencyLink,
    scroll: ethNativeCurrencyLink,
    zkSync: ethNativeCurrencyLink,
    avalanche: avalancheNativeCurrencyLink,
    metis: metisNativeCurrencyLink,
    bsc: bscNativeCurrencyLink,
    filecoin: filecoinNativeCurrencyLink,
    fantom: fantomNativeCurrencyLink,
    celo: celoNativeCurrencyLink,
    moonbeam: moonbeamNativeCurrencyLink,
    gnosis: gnosisNativeCurrencyLink
  }

  return nativeCurrencyLinks[selectedClient as keyof typeof nativeCurrencyLinks];
}