import React, { useEffect, useState } from 'react'
import { Button, Card, CardBody, CardFooter, Col, Container, Row, Table } from "reactstrap";
import { getCurrentUserDetail, isLoggedIn } from '../auth';

const ViewUserProfile=({user})=> {

    const [currentUser,setCurrentUser] = useState(null);
    const [login,setLogin] = useState(false);

    useEffect(()=>{
        setCurrentUser(getCurrentUserDetail());
        setLogin(isLoggedIn());
    },[]);

  return (
    <Card className="mt-2 border-0 rounded-0 shadow-sm">
    <CardBody>
      <h3 className="text-uppercase">User Information</h3>

      <Container className="text-center">
        <img style={{maxWidth:'200px',maxHeight:'200px'}} src={user.image ? user.image: 'https://th.bing.com/th/id/OIP.nho1DqmBw4CS2pKYDRzs4gHaFj?pid=ImgDet&w=132&h=99&c=7&dpr=1.6'} alt="User Profile Picture" className="img-fluid rounded-circle" />
      </Container>
      <Table responsive striped hover bordered={true} className="text-center mt-5">
        <tbody>
          <tr>
            <td>
              USER ID
            </td>
            <td>
              {user.id}
            </td>
          </tr>
          <tr>
            <td>
              USER NAME
            </td>
            <td>
              {user.name}
            </td>
          </tr>
          <tr>
            <td>
              USER EMAIL
            </td>
            <td>
              {user.email}
            </td>
          </tr>
          <tr>
            <td>
              ABOUT
            </td>
            <td>
              {user.about}
            </td>
          </tr>
          <tr>
            <td>ROLE</td>
            <td>{user.roles.map((role)=>{
              return (
                <div key={role.id}>{role.name}</div>
              )
            })}</td>
          </tr>
        </tbody>
      </Table>
      {currentUser ? (currentUser.id==user.id)?(
        <CardFooter className='text-center'>
            <Button color='warning'>Update Profile</Button>
        </CardFooter>
      ):'':''
      }
    </CardBody>
  </Card>
  )
}

export default ViewUserProfile