import axios from 'axios'
import { DetailWorkspace } from './components/WorkspaceDetails'

const BASE_URL = 'http://localhost:8080'

/** The API for the app, for querying, creating and updating workspaces */
class DosspaceApi {
  /** Returns the ID and title of every existing workspace */
  static async getWorkspaces() {
    try {
      const req = await axios.get(BASE_URL)
      const { workspaces } = req.data
      return workspaces
    } catch (err) {
      throw new Error('Unable to fetch workspaces')
    }
  }

  /** Returns the details about the given workspace ID */
  static async getWorkspace(workspaceId: string): Promise<DetailWorkspace> {
    try {
      const req = await axios.get(`${BASE_URL}/${workspaceId}`)
      const { workspace } = req.data
      return workspace
    } catch (err) {
      throw new Error('Unable to fetch workspace')
    }
  }


  static async addBuildShipment(workspaceId: string, buildNumber: string): Promise<DetailWorkspace> {
    const { data } = await axios.post(`${BASE_URL}/workspaces/${workspaceId}/build-shipments`, {
      buildNumber,
    })
    return data
  }

  static async deleteBuildShipment(workspaceId: string, buildShipmentId: string): Promise<DetailWorkspace> {
    const { data } = await axios.delete(
      `${BASE_URL}/workspaces/${workspaceId}/build-shipments/${buildShipmentId}`
    )
    return data
  }


  static async addShipment(
    workspaceId: string,
    buildShipmentId: string,
    description: string,
    orderNumber: string,
    cost: number
  ): Promise<DetailWorkspace> {
    const { data } = await axios.post(
      `${BASE_URL}/workspaces/${workspaceId}/build-shipments/${buildShipmentId}/shipments`,
      { description, orderNumber, cost }
    )
    return data
  }


  static async deleteShipment(
    workspaceId: string,
    buildShipmentId: string,
    shipmentId: string
  ): Promise<DetailWorkspace> {
    const { data } = await axios.delete(
      `${BASE_URL}/workspaces/${workspaceId}/build-shipments/${buildShipmentId}/shipments/${shipmentId}`
    )
    return data
  }

}



export default DosspaceApi
