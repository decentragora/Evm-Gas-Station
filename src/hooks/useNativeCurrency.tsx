import React, { useState, useEffect } from "react";
import { ChainlinkPriceOracle } from "@/contracts";
import { clients } from "@/provider/providers";

const GnosisAPIKey = process.env.NEXT_PUBLIC_GNOSIS_API_KEY || "";
const MoonbeamAPIKey = process.env.NEXT_PUBLIC_MOONBEAM_API_KEY || "";

export function useNativeCurrency(client: string) {
  const MainnetPriceOracleAddress   = "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419";
  const PolygonPriceOracleAddress   = "0x7bAC85A8a13A4BcD8abb3eB7d6b4d632c5a57676";
  const AvalanchePriceOracleAddress = "0xff3eeb22b5e3de6e705b44749c2559d704923fd7";
  const MetisPriceOracleAddress     = "0xd4a5bb03b5d66d9bf81507379302ac2c2dfdfa6d";
  const BNBPriceOracleAddress       = "0x14e613ac84a31f709eadbdf89c6cc390fdc9540a";
  const FileCoinPriceOracleAddress  = "0x66f61fee824c1df059bcccc5f21ca39e083eefdf";
  const CeloPriceOracleAddress      = "0x0568fd19986748ceff3301e55c0eb1e729e0ab7e";

  const [price, setPrice] = useState<number | null>(null);

  const fetchPrice = async () => {
    try {
      let newPrice;
      if (
        client === "homestead" ||
        client === "arbitrum" ||
        client === "optimism" ||
        client === "base" ||
        client === "linea" ||
        client === "scroll" ||
        client === "zkSync" 
      ) {
        const data = await clients.homestead.readContract({
          address: MainnetPriceOracleAddress,
          abi: ChainlinkPriceOracle,
          functionName: "latestRoundData",
        });
        const unit256Price = data[1];
        newPrice = Number(unit256Price) / Number(10 ** 8);
      } else if (client === "matic") {
        const data = await clients.homestead.readContract({
          address: PolygonPriceOracleAddress,
          abi: ChainlinkPriceOracle,
          functionName: "latestRoundData",
        });
        const unit256Price = data[1];
        newPrice = Number(unit256Price) / Number(10 ** 8);
      } else if (client === "avalanche") {
        const data = await clients.homestead.readContract({
          address: AvalanchePriceOracleAddress,
          abi: ChainlinkPriceOracle,
          functionName: "latestRoundData",
        });
        const unit256Price = data[1];
        newPrice = Number(unit256Price) / Number(10 ** 8);
      } else if (client === "metis") {
        const data = await clients.metis.readContract({
          address: MetisPriceOracleAddress,
          abi: ChainlinkPriceOracle,
          functionName: "latestRoundData",
        });
        const unit256Price = data[1];
        newPrice = Number(unit256Price) / Number(10 ** 8);
      } else if (client === "bsc") {
        const data = await clients.homestead.readContract({
          address: BNBPriceOracleAddress,
          abi: ChainlinkPriceOracle,
          functionName: "latestRoundData",
        });
        const unit256Price = data[1];
        newPrice = Number(unit256Price) / Number(10 ** 8);
      } else if (client === "filecoin") {
        const data = await clients.optimism.readContract({
          address: FileCoinPriceOracleAddress,
          abi: ChainlinkPriceOracle,
          functionName: "latestRoundData",
        });
        const unit256Price = data[1];
        newPrice = Number(unit256Price) / Number(10 ** 8);
      } else if (client === "gnosis") {
        const data = await fetch(
          `https://api.gnosisscan.io/api?module=stats&action=ethprice&apikey=${GnosisAPIKey}`
        ).then((res) => res.json());
        newPrice = Number(data.result.ethusd);
      } else if (client === "celo") {
        const data = await clients.celo.readContract({
          address: CeloPriceOracleAddress,
          abi: ChainlinkPriceOracle,
          functionName: "latestRoundData",
        });
        const unit256Price = data[1];
        newPrice = Number(unit256Price) / Number(10 ** 8);
      
      } else if (client === "moonbeam") {
        const data = await fetch(
          `https://api-moonbeam.moonscan.io/api?module=stats&action=ethprice&apikey=${MoonbeamAPIKey}`
        ).then((res) => res.json());
        newPrice = Number(data.result.ethusd);
      } else {
        console.error("client not supported");
        return;
      }
      setPrice(newPrice);
    } catch (error) {
      console.error("Error fetching price:", error);
    }
  };

  useEffect(() => {
    // Fetch the initial price
    fetchPrice();

    // Refresh the price every 5 minutes (adjust the interval as needed)
    const refreshInterval = setInterval(() => {
      fetchPrice();
    }, 1 * 60 * 1000); // 5 minutes in milliseconds

    return () => {
      // Clear the refresh interval when the component unmounts
      clearInterval(refreshInterval);
    };
  }, [client]);

  return price;
}
