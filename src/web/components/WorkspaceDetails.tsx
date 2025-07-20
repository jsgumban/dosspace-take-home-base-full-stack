import BuildShipmentSection from './BuildShipmentSection'
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import DosspaceApi from "../api";

export interface Shipment {
  id: string
  description: string
  orderNumber: string
  cost: number
}

export interface ShipmentTable {
  id: string
  buildNumber: string
  shipments: Shipment[]
}

export interface DetailWorkspace {
  id: string
  title: string
  buildShipments: ShipmentTable[]
}

type WorkspaceDetailsParams = {
  workspaceId: string
}

/** Detail view of individual workspace */
export default function WorkspaceDetails() {
  const { workspaceId } = useParams() as WorkspaceDetailsParams
  const [workspace, setWorkspace] = useState<DetailWorkspace | null>(null)

  async function fetchWorkspace() {
    const res = await DosspaceApi.getWorkspace(workspaceId)
    setWorkspace(res)
  }

  useEffect(() => {
    fetchWorkspace()
  }, [workspaceId])

  // Function that handles adding of new workspace's build shipment
  async function handleAddBuild() {
    const buildNumber = prompt('Enter new build number') || ''
    const updated = await DosspaceApi.addBuildShipment(workspaceId, buildNumber)
    setWorkspace(updated)
  }

  // Function that handles deleting of workspace's build shipment
  async function handleDeleteBuild(buildShipmentId: string) {
    const updated = await DosspaceApi.deleteBuildShipment(workspaceId, buildShipmentId)
    setWorkspace(updated)
  }

  return (
    <div style={{ padding: '1rem' }}>
      <h1>{workspace?.title}</h1>

      <h2>
        Build Shipments &nbsp;
        <button onClick={handleAddBuild}>Add Build Shipment</button>
      </h2>

      {workspace?.buildShipments.map((table) => (
        <BuildShipmentSection
          key={table.id}
          table={table}
          workspaceId={workspaceId}
          onUpdateWorkspace={fetchWorkspace}
          onDeleteBuild={handleDeleteBuild}
        />
      ))}
    </div>
  )
}
