import React from 'react'
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import { useSelector } from 'react-redux'

function FriendsCard() {
    const user = useSelector(state => state.authReducer.userData)

  return (
    <div>
        {user.friends.length!=0 && <Card>
        <Card.Body>
            <Card.Title>Friends</Card.Title>
            <Table>
            <tbody>
            <tr>
                <td>sam</td>
                <td>Unfriend</td>
            </tr>
            </tbody>
            </Table>
        </Card.Body>
        </Card>}
    </div>
  )
}

export default FriendsCard