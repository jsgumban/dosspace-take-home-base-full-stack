import { Shipment, ShipmentTable } from './WorkspaceDetails'
import ShipmentRow from './ShipmentRow'
import DosspaceApi from "../api";

interface Props {
  table: ShipmentTable
  workspaceId: string
  onUpdateWorkspace: () => Promise<void>
  onDeleteBuild: (buildShipmentId: string) => void
}


// View of build shipment's shipments table
export default function BuildShipmentSection({ table, workspaceId, onUpdateWorkspace, onDeleteBuild }: Props) {
  const th = {
    borderBottom: '1px solid #ccc',
    textAlign: 'left' as const,
    padding: '8px',
  }

  // Function that handles adding new build shipment's shipment
  async function handleAddShipment() {
    const description = prompt('Enter shipment description') || ''
    const orderNumber = prompt('Enter order number') || ''
    const cost = parseFloat(prompt('Enter cost') || '0')

    await DosspaceApi.addShipment(workspaceId, table.id, description, orderNumber, cost)
    await onUpdateWorkspace()
  }

  return (
    <div key={table.id} style={{ marginBottom: "5em"}}>
      <h3>
        Build Number: {table.buildNumber || '—'} &nbsp;
        <button onClick={() => onDeleteBuild(table.id)}>Delete</button>
      </h3>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1rem' }}>
        <thead>
        <tr>
          <th style={th}>Description</th>
          <th style={th}>Order Number</th>
          <th style={th}>Cost</th>
          <th style={th}>Actions</th>
        </tr>
        </thead>
        <tbody>
        {table.shipments.map((shipment: any) => (
          <ShipmentRow
            key={shipment.id}
            workspaceId={workspaceId}
            buildShipmentId={table.id}
            shipment={shipment}
            onUpdateWorkspace={onUpdateWorkspace}
          />
        ))}
        </tbody>
      </table>

      <button onClick={handleAddShipment}>Add Shipment</button>
    </div>
  )
}
