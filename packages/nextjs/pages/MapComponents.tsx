import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const MapComponent: React.FC = () => {
  const position = [51.505, -0.09]; // default latitude and longitude

  const NFTS = [
    {
      id: '1',
      latitude: 51.505,
      longitude: -0.09,
      name: 'NFT 1'
      // ... other NFT attributes
    },
    // ... more NFTs
  ];


  return (
    <MapContainer center={position} zoom={13} style={{ width: '100%', height: '400px' }}>
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

