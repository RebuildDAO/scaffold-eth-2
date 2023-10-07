import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package
import 'leaflet-defaulticon-compatibility';

type Proposal = {
  id: number;
  name: string;
  description: string;
  location: string;
  url: string;
  fundingGoal: number;
  fundsRaised: number;
};

type MapComponentProps = {
  proposals?: Proposal[];
};

const MapComponent: React.FC<MapComponentProps> = ({ proposals }) => {
  const position = [41.890 as number, 12.49 as number]; // default latitude and longitude

  const markers = proposals?.map(proposal => {
    const [lat, lng] = proposal.location.split(",").map(Number);
    return {
      id: proposal.id,
      latitude: lat,
      longitude: lng,
      name: proposal.name,
      description: proposal.description,
      url: proposal.url,
    };
  }) ?? [];

  return (
    <MapContainer center={position} zoom={13} style={{ width: "100%", height: "400px" }}>
      {markers.map(marker => (
        <Marker key={marker.id} position={[marker.latitude, marker.longitude]}>
          <Popup>
            <h1>{marker.name}</h1>
            <p>{marker.description}</p>
            <img src={marker.url} alt="proposal image" />
          </Popup>
        </Marker>
      ))}

      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
    </MapContainer>
  );
};

export default MapComponent;
