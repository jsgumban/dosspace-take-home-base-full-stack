import { Shipment } from './WorkspaceDetails'
import DosspaceApi from "../api";

interface Props {
  workspaceId: string
  buildShipmentId: string
  shipment: Shipment
  onUpdateWorkspace: () => Promise<void>
}


// View that shows shipment's details
export default function ShipmentRow({ workspaceId, buildShipmentId, shipment, onUpdateWorkspace }: Props) {
  const td = {
    borderBottom: '1px solid #eee',
    padding: '8px',
  }

  // Function that handles deleting of shipment
  async function handleDelete() {
    await DosspaceApi.deleteShipment(workspaceId, buildShipmentId, shipment.id)
    await onUpdateWorkspace()
  }

  return (
    <tr>
      <td style={td}>{shipment.description}</td>
      <td style={td}>{shipment.orderNumber}</td>
      <td style={td}>${shipment.cost?.toLocaleString()}</td>
      <td style={td}>
        <button onClick={handleDelete}>Delete</button>
      </td>
    </tr>
  )
}
