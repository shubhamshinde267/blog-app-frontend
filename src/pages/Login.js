import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import Base from "../components/Base";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { loginUser } from "../services/user-service";
import { doLogin } from "../auth";
import { useNavigate } from "react-router-dom";
import userContext from "../context/userContext";

const Login = () => {
    const userContextData = useContext(userContext);
    const navigate = useNavigate();
    const [loginDetail,setLoginDetail]=useState({
        username:"",
        password:"",
    })

    const handleChange=(event,field)=>{
        let actualValue = event.target.value;
        setLoginDetail({
            ...loginDetail,
            [field]: actualValue,
        })
    }

    const handleReset=()=>{
        setLoginDetail({
            username:"",
            password:"",
        })
    }

    const handleFormSubmit=(event)=>{
        event.preventDefault();
        console.log(loginDetail);

        //Validation
        if(loginDetail.username=='' || loginDetail.password=='')
        {
            toast.error("Username and Password must be provided!!")
            return;
        }

        //Submit the data to the server to generate the token
        loginUser(loginDetail)
            .then((data) => {
                console.log("User Login:");
                console.log(data);

                //Save the data to localstorage
                doLogin(data,() => {
                    console.log("Login details saved to localstorage");
                    userContextData.setUser({
                        data: data.user,
                        login:true
                    });
                    //Redirect to the User dashboard page
                    navigate("/user/dashboard");

                });
                toast.success("Login Success");
            }).catch((error) => {
            console.log(error);
            if(error.response.status == 400 || error.response.status ==404)
            {
                toast.error(error.response.data.message);
            }
            else{
                toast.error("Something went wrong on server!!");
            }
            
        });

    }



  return (
    <Base>
      <Container>
        <Row className="mt-4">
            <Col sm={{size:6,offset:3}}>
                <Card color="dark" inverse>
                    <CardHeader>
                        <h3>Login here !!!</h3>
                    </CardHeader>

                    <CardBody>
                        <Form onSubmit={handleFormSubmit}>
                            {/*Email Field*/}
                            <FormGroup>
                                <Label for="email">
                                    Enter Email
                                </Label>
                                <Input
                                type="email"
                                placeholder="Enter Email here..."
                                id="email"
                                value={loginDetail.username}
                                onChange={(e)=>handleChange(e,'username')}
                                />
                            </FormGroup>

                            {/*Password Field*/}
                            <FormGroup>
                                <Label for="password">
                                    Enter Password
                                </Label>
                                <Input
                                type="password"
                                placeholder="Enter Password here..."
                                id="password"
                                value={loginDetail.password}
                                onChange={(e)=>handleChange(e,'password')}
                                />
                            </FormGroup>

                            <Container className="text-center">
                                <Button outline color="success">Login</Button>
                                <Button onClick={handleReset} outline type="reset" color="warning" className="ms-2">Reset</Button>
                            </Container>
                        </Form>
                    </CardBody>
                </Card>
            </Col>
        </Row>
      </Container>
    </Base>
  );
};

export default Login;
