import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

const MapComponent: React.FC = (proposals: any) => {
  const position = [51.505 as number, -0.09 as number]; // default latitude and longitude

  const NFTS = [
    {
      id: "1",
      latitude: 51.505 as number,
      longitude: -0.09 as number,
      name: "NFT 1",
      // ... other NFT attributes
    },
    // ... more NFTs
  ];

  return (
    <MapContainer center={position} zoom={13} style={{ width: "100%", height: "400px" }}>
      {NFTS.map(nft => (
        <Marker key={nft.id} position={[nft.latitude, nft.longitude]}>
          <Popup>
            {nft.name} {/* Or render any other NFT info you want here */}
          </Popup>
        </Marker>
      ))}

      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {/* Markers for NFTs can be rendered here */}
    </MapContainer>
  );
};

export default MapComponent;
