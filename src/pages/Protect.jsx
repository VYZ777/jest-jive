import { Table } from './Table'
import { ProtectedRoute } from '../components/Often Used/table/protection/ProtectedRoute'

export const Protect = () => {
  return (
    <>
      <ProtectedRoute>
        <Table />
      </ProtectedRoute>
    </>
  )
}
