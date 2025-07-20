import { all, findOne, insert, update } from './db/db'
import { Workspace } from './types'
import { v4 as uuidv4 } from 'uuid'

/** Returns a list of all workspaces in the database */
export function getWorkspaces(dbString: string): Workspace[] {
  return all(dbString, 'workspaces')
}

/** Returns a single workspace from the database */
export function getWorkspace(dbString: string, id: string): Workspace {
  return findOne(dbString, 'workspaces', id)
}

/** Create a workspace in the database */
export function createWorkspace(dbString: string): Workspace {
  const workspace: Workspace = {
    id: uuidv4(),
    title: '',
    buildShipments: [
      {
        id: uuidv4(),
        buildNumber: '',
        // Initialize the workspace with a single empty build shipment
        shipments: [{ id: uuidv4(), description: '', orderNumber: '', cost: 0 }],
      },
    ],
  }
  insert(dbString, 'workspaces', workspace)
  return workspace
}

/** Update a workspace in the database */
export function updateWorkspace(dbString: string, workspace: Workspace): Workspace {
  update(dbString, 'workspaces', workspace.id, workspace)
  return findOne(dbString, 'workspaces', workspace.id)
}


/** Adds a build shipment in a workspace in the database */
/** Returns the updated workspace */
export function addBuildShipment(dbString: string, workspaceId: string, buildNumber: string): Workspace {
  const workspace = getWorkspace(dbString, workspaceId)

  const newBuildShipment = {
    id: uuidv4(),
    buildNumber,
    shipments: [],
  }

  workspace.buildShipments.push(newBuildShipment)
  return updateWorkspace(dbString, workspace)
}

/** Delete a build shipment in a workspace in the database */
/** Returns the updated workspace */
export function deleteBuildShipment(
  dbString: string,
  workspaceId: string,
  buildShipmentId: string
): Workspace {
  const workspace = getWorkspace(dbString, workspaceId)

  workspace.buildShipments = workspace.buildShipments.filter((b) => b.id !== buildShipmentId)
  return updateWorkspace(dbString, workspace)
}

/** Add shipment in workspace's build shipment in the database */
/** Returns the updated workspace */
export function addShipment(
  dbString: string,
  workspaceId: string,
  buildShipmentId: string,
  shipment: {
    description: string
    orderNumber: string
    cost: number
  }
): Workspace {
  const workspace = getWorkspace(dbString, workspaceId)

  const build = workspace.buildShipments.find((b) => b.id === buildShipmentId)
  if (!build) throw new Error('Build shipment not found')

  build.shipments.push({
    id: uuidv4(),
    ...shipment,
  })

  return updateWorkspace(dbString, workspace)
}

/** Delete shipment in workspace's build shipment in the database */
/** Returns the updated workspace */
export function deleteShipment(
  dbString: string,
  workspaceId: string,
  buildShipmentId: string,
  shipmentId: string
): Workspace {
  const workspace = getWorkspace(dbString, workspaceId)

  const build = workspace.buildShipments.find((b) => b.id === buildShipmentId)
  if (!build) throw new Error('Build shipment not found')

  build.shipments = build.shipments.filter((s) => s.id !== shipmentId)

  return updateWorkspace(dbString, workspace)
}
